"""Bölüm taslaklarını (bolumler/*.md) NEVÜ SBE makale şablonuna yerleştirir.

Kullanım: python3 sablona_yerlestir.py <birlesik_sablon_klasoru> <cikti.docx>
<birlesik_sablon_klasoru>: şablonun açılmış ve merge_runs.py ile run'ları birleştirilmiş hâli.
Çıktı anonimdir (yazar adı yok). Yazarın dolduracağı yerler sarı vurguludur.
"""
import copy, re, sys, os, shutil, subprocess
from lxml import etree

sys.path.insert(0, os.path.dirname(__file__))
from kaynakca import KAYNAKCA

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
q = lambda t: '{%s}%s' % (W, t)
PROJE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOL = os.path.join(PROJE, 'bolumler')

src, out = sys.argv[1], sys.argv[2]
work = out + '.d'
shutil.rmtree(work, ignore_errors=True)
shutil.copytree(src, work)
doc_path = os.path.join(work, 'word', 'document.xml')
tree = etree.parse(doc_path)
body = tree.getroot().find(q('body'))
kids = list(body)

def txt(e):
    return ''.join(e.itertext())

def find_p(pred, start=0):
    for i in range(start, len(kids)):
        if pred(kids[i]):
            return i
    raise KeyError

# ---- prototipler (şablondaki biçimli paragraflar) ----
i_giris = find_p(lambda e: txt(e).startswith('1. Giriş / Introduction'))
P_H1 = copy.deepcopy(kids[i_giris])
P_BODY = copy.deepcopy(kids[find_p(lambda e: txt(e).startswith('Çalışma, makale şablonu'))])
P_H2 = copy.deepcopy(kids[find_p(lambda e: txt(e).startswith('2.1. İkinci Düzey'))])
P_H3 = copy.deepcopy(kids[find_p(lambda e: txt(e).startswith('2.2.1. Üçüncü Düzey'))])
P_CAP = copy.deepcopy(kids[find_p(lambda e: txt(e).startswith('Şekil 1. Şekil numarası'))])
i_kay = find_p(lambda e: txt(e).startswith('Kaynakça (Başlık'))
P_REF = copy.deepcopy(kids[find_p(lambda e: txt(e).startswith('Cheng, G. H. L.'))])
i_ext = find_p(lambda e: txt(e).startswith('GENİŞLETİLMİŞ ÖZET'))

def proto_rpr(p):
    r = p.find('.//' + q('r'))
    rp = r.find(q('rPr')) if r is not None else None
    return copy.deepcopy(rp) if rp is not None else etree.Element(q('rPr'))

def clear_runs(p):
    for ch in list(p):
        if ch.tag != q('pPr'):
            p.remove(ch)

def add_run(p, text, rpr, bold=None, italic=None, hl=False):
    r = etree.SubElement(p, q('r'))
    rp = copy.deepcopy(rpr)
    for tag, on in (('b', bold), ('i', italic)):
        if on is None:
            continue
        for old in rp.findall(q(tag)) + rp.findall(q(tag + 'Cs')):
            rp.remove(old)
        if on:
            etree.SubElement(rp, q(tag))
    if hl:
        h = etree.SubElement(rp, q('highlight')); h.set(q('val'), 'yellow')
    r.append(rp)
    t = etree.SubElement(r, q('t')); t.text = text
    t.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve')

def para(proto, text, hl=False):
    """**kalın**, *italik*, [[...]] = sarı vurgulu yer tutucu."""
    p = copy.deepcopy(proto)
    rpr = proto_rpr(proto)
    clear_runs(p)
    for tok in re.split(r'(\*\*.+?\*\*|\*.+?\*|\[\[.+?\]\])', text):
        if not tok:
            continue
        if tok.startswith('**'):
            add_run(p, tok[2:-2], rpr, bold=True, hl=hl)
        elif tok.startswith('[['):
            add_run(p, tok[2:-2], rpr, hl=True)
        elif tok.startswith('*'):
            add_run(p, tok[1:-1], rpr, italic=True, hl=hl)
        else:
            add_run(p, tok, rpr, hl=hl)
    return p

def md_blocks(name, h1=None):
    """Markdown dosyasını (seviye, metin) bloklarına çevirir; > notları ve HTML yorumlarını atar."""
    s = open(os.path.join(BOL, name), encoding='utf-8').read()
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S)
    s = re.sub(r'^(#{1,3} .*)$', r'\n\1\n', s, flags=re.M)  # başlık satırları kendi bloğu
    out = []
    for blk in re.split(r'\n\s*\n', s):
        blk = blk.strip()
        if not blk or blk.startswith('>'):
            continue
        if blk.startswith('# '):
            out.append(('h1', h1 or blk[2:].strip()))
        elif blk.startswith('### '):
            out.append(('h3', blk[4:].strip()))
        elif blk.startswith('## '):
            out.append(('h2', blk[3:].strip()))
        else:
            out.append(('p', ' '.join(l.strip() for l in blk.splitlines())))
    return out

def render(blocks):
    m = {'h1': P_H1, 'h2': P_H2, 'h3': P_H3, 'p': P_BODY}
    res = []
    for lvl, t in blocks:
        res.append(para(m[lvl], t))
        if lvl == 'p' and "Şekil 1'de gösterilmektedir" in t:
            res.append(para(P_BODY, '[[ŞEKİL 1 BURAYA: yazar Excel/Word’de çizecek; taslak sekiller/sekil1-kavramsal-model.png]]'))
            res.append(para(P_CAP, '**Şekil 1.** Araştırmanın kavramsal modeli'))
    return res

# ---- gövde: Giriş'ten Kaynakça başlığına kadar değiştir ----
yeni = []
yeni += render(md_blocks('giris-acilis-v1.md', h1='1. Giriş'))
# şablon: Giriş, başlık/özet sayfasını izleyen yeni sayfadan başlar
_ppr = yeni[0].find(q('pPr'))
_pos = max([i + 1 for i, c in enumerate(_ppr) if c.tag in (q('pStyle'), q('keepNext'), q('keepLines'))] or [0])
_ppr.insert(_pos, etree.Element(q('pageBreakBefore')))
yeni += render(md_blocks('literatur-v1.md', h1='2. Kuramsal Çerçeve'))
yeni += render(md_blocks('yontem-v1.md', h1='3. Yöntem'))

# Bulgular / Tartışma: yalnız başlıklar + yazar için sarı yönerge (YZ bu bölümleri yazmaz)
isk = md_blocks('bulgular-tartisma-iskelet.md')
for lvl, t in isk:
    if lvl == 'h1':
        continue
    if lvl == 'h2':
        yeni.append(para(P_H1, t))
    elif lvl == 'h3':
        yeni.append(para(P_H2, t[0].upper() + t[1:] if t else t))
    else:
        for line in re.split(r'\s*- ', ' ' + t):
            line = line.strip()
            if line:
                yeni.append(para(P_BODY, '[[YAZAR YAZACAK – yönerge: ' + line.replace('**', '') + ']]'))

for e in kids[i_giris:i_kay]:
    body.remove(e)
anchor = kids[i_kay]
for e in yeni:
    anchor.addprevious(e)

# ---- Kaynakça ----
kids = list(body)
i_kay = kids.index(anchor)
i_ext = kids.index(next(e for e in kids if txt(e).startswith('GENİŞLETİLMİŞ ÖZET')))
anchor_p = para(anchor, 'Kaynakça')
body.replace(anchor, anchor_p)
for e in kids[i_kay + 1:i_ext]:
    body.remove(e)
ext = next(e for e in body if txt(e).startswith('GENİŞLETİLMİŞ ÖZET'))
for ref in KAYNAKCA:
    ext.addprevious(para(P_REF, ref))
# kaynakçadan sonra Extended Summary yeni sayfada başlar
pb = copy.deepcopy(P_BODY); clear_runs(pb)
r = etree.SubElement(pb, q('r')); br = etree.SubElement(r, q('br')); br.set(q('type'), 'page')
ext.addprevious(pb)

# ---- Öz / Abstract / Extended Summary metinleri (bolumler/ozet-v1.md) ----
_oz = open(os.path.join(BOL, 'ozet-v1.md'), encoding='utf-8').read()
_oz = re.sub(r'<!--.*?-->', '', _oz, flags=re.S)
def _sec(name):
    m = re.search(r'^## ' + re.escape(name) + r'\n(.*?)(?=^## |\Z)', _oz, flags=re.S | re.M)
    return m.group(1)
def _paras(block):
    return [' '.join(l.strip() for l in b.splitlines()) for b in re.split(r'\n\s*\n', block.strip())
            if b.strip() and not b.strip().startswith('**Anahtar') and not b.strip().startswith('**Keywords')]
OZ_TR = _paras(_sec('Öz'))[0]
OZ_EN = _paras(_sec('Abstract'))[0]
EXT = {}
for m in re.finditer(r'^### (.+?)\n(.*?)(?=^### |\Z)', _sec('Extended Summary'), flags=re.S | re.M):
    EXT[m.group(1).strip()] = _paras(m.group(2))

# ---- Genişletilmiş Özet ----
kids = list(body)
i0 = kids.index(ext)
ext_map = {
    'Bu bölümde, çalışmanın hangi temel': 'Purpose',
    'Bu bölümde, araştırmanın hangi yaklaşımla': 'Methodology',
    'Bu bölümde, araştırma kapsamında': 'Findings',
    'Bu bölümde, elde edilen bulgulara': 'Conclusions',
    'Bu bölümde, çalışmanın literatüre': 'Originality and Value',
}
for e in kids[i0 + 1:]:
    t = txt(e)
    if t.startswith('Dergide yayımlanan Türkçe') or t.startswith('An Extended Summary in English'):
        body.remove(e); continue
    for k, sec in ext_map.items():
        if t.startswith(k):
            has_pb = e.find('.//' + q('br') + "[@{%s}type='page']" % W) is not None
            news = [para(e, ptxt) for ptxt in EXT[sec]]
            if has_pb:
                r = etree.SubElement(news[-1], q('r')); b = etree.SubElement(r, q('br')); b.set(q('type'), 'page')
            for n in news:
                e.addprevious(n)
            body.remove(e)

# ---- Başlık sayfası ----
kids = list(body)
def set_text_runs(p, text):
    """Çizim içeren run'ları korur; metin run'larını tek metinle değiştirir; dipnot göndermesini siler."""
    first = True
    for r in list(p.iter(q('r'))):
        if r.find('.//' + q('drawing')) is not None:
            continue
        if r.find(q('footnoteReference')) is not None:
            r.getparent().remove(r); continue
        ts = r.findall(q('t'))
        if not ts:
            continue
        if first:
            ts[0].text = text; first = False
            for extra in ts[1:]:
                r.remove(extra)
        else:
            r.getparent().remove(r)

set_text_runs(kids[1], 'TÜRKİYE–ÇİN İLİŞKİLERİNDE ORTAKLAŞA REKABET: İPEK YOLU TURİZMİ')
set_text_runs(kids[3], 'Coopetition in Türkiye–China Relations: Silk Road Tourism')
for i in (2, 4, 5, 6):  # açıklamalar ve yazar satırları (anonim)
    for r in list(kids[i].iter(q('r'))):
        if r.find('.//' + q('drawing')) is None:
            r.getparent().remove(r)

# Öz/abstract tablosu
tbl = kids[8]
kw_tr = ['Ortaklaşa Rekabet,', 'İpek Yolu Turizmi,', 'Miras Diplomasisi,', 'Türkiye–Çin İlişkileri,', 'Ayrıştırma İlkesi.']
kw_en = ['Coopetition,', 'Silk Road Tourism,', 'Heritage Diplomacy,', 'Türkiye–China Relations,', 'Separation Principle.']
for p in tbl.iter(q('p')):
    t = txt(p)
    m = re.match(r'Anahtar Kelime (\d)', t)
    if m:
        set_text_runs(p, kw_tr[int(m.group(1)) - 1])
    m = re.match(r'Keywords (\d)', t)
    if m:
        set_text_runs(p, kw_en[int(m.group(1)) - 1])
    if t.startswith('Özet, en az 150'):
        np_ = para(p, OZ_TR)
        p.getparent().replace(p, np_)
    elif t.startswith('The abstract should be'):
        np_ = para(p, OZ_EN)
        p.getparent().replace(p, np_)
sdts = list(tbl.iter(q('sdt')))
for s, lab in zip(sdts, ['ÖZ', 'ABSTRACT']):
    for t in s.find(q('sdtContent')).iter(q('t')):
        t.text = ''
    ts = list(s.find(q('sdtContent')).iter(q('t')))
    if ts:
        ts[0].text = lab

# ---- Yazar beyanı tablosu ----
NEDEN_TR = ('literatür taraması ve künye doğrulama, incelenen belgelerin hazırlanması ve Çince metinlerin çevirisi, '
            'kodlama şemasının pilot sınaması, insan kodlayıcılar arasındaki uyuşmazlıkların çözümünde bağımsız üçüncü kodlama, betimsel hesaplamalar ile Giriş, Kuramsal Çerçeve ve Yöntem bölümlerinde taslak ve dil desteği')
NEDEN_EN = ('literature search and reference verification, preparation of the document set and translation of Chinese texts, '
            'pilot testing of the coding scheme, an independent third coding used to resolve disagreements between the human coders, descriptive calculations, and drafting and language support in the Introduction, Theoretical Framework and Method sections')
isaretle = [
    'Yazar, çalışmanın tümüne tek başına', 'The author contributes the study on his/her own',
    'Çalışmada herhangi bir potansiyel çıkar', 'There is no potential conflict of interest',
    'Çalışmada etik dışı bir husus', 'We hereby declare that the study has not unethical',
    'Bu çalışma, etik kurul belgesi gerektiren', 'This study does not require ethics committee',
    'Bu çalışmanın hazırlanması sırasında yazar', 'During the preparation of this study the author',
    'Çalışmada herhangi bir kurum ya da kuruluştan', 'No financial support is taken',
]
btbl = next(e for e in body if e.tag == q('tbl') and txt(e).startswith('YAZARLARIN BEYANI'))
for p in btbl.iter(q('p')):
    t = txt(p).replace('☐', '').strip()
    if any(t.startswith(k) for k in isaretle):
        for tt in p.iter(q('t')):
            if tt.text and '☐' in tt.text:
                tt.text = tt.text.replace('☐', '☒', 1); break
    for tt in p.iter(q('t')):
        if tt.text:
            tt.text = (tt.text.replace('[NEDEN]', NEDEN_TR).replace('[ARAÇ/HİZMET ADI]', 'Claude (Anthropic)')
                       .replace('[NAME OF TOOL / SERVICE]', 'Claude (Anthropic)').replace('[REASON]', NEDEN_EN))

tree.write(doc_path, xml_declaration=True, encoding='UTF-8', standalone=True)
if os.path.exists(out):
    os.remove(out)
subprocess.run(['zip', '-qXr', os.path.abspath(out), '.'], cwd=work, check=True)
shutil.rmtree(work)
print('yazıldı:', out)
