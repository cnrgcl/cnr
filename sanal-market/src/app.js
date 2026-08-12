/* Bereket Market — sanal reyon
   Tek dosyalık 3B mağaza gezintisi: tıkla-yürü navigasyon, dolu raflar,
   instanced ürün yerleşimi ve panelde canlı 3B ürün görünümü. */
(function () {
  'use strict';

  var T = THREE;

  /* ------------------------------------------------------------------ *
   *  Yardımcılar                                                        *
   * ------------------------------------------------------------------ */

  var paraBicim = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function para(n) { return paraBicim.format(n) + ' ₺'; }
  function buyuk(s) { return s.toLocaleUpperCase('tr-TR'); }

  function kis(v, a, b) { return v < a ? a : v > b ? b : v; }

  // Deterministik gürültü — her açılışta aynı raf dizilsin.
  var tohum = 20260812;
  function rast() {
    tohum = (tohum * 1664525 + 1013904223) % 4294967296;
    return tohum / 4294967296;
  }
  function rastArasi(a, b) { return a + (b - a) * rast(); }

  function parlaklik(hex) {
    var c = new T.Color(hex);
    return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  }
  function okunurMurekkep(hex) { return parlaklik(hex) > 0.55 ? '#11201D' : '#FFFFFF'; }

  function tonla(hex, miktar) {
    var c = new T.Color(hex);
    var h = {}; c.getHSL(h);
    c.setHSL(h.h, kis(h.s * (miktar > 0 ? 0.92 : 1.05), 0, 1), kis(h.l + miktar, 0.04, 0.96));
    return '#' + c.getHexString();
  }

  /* ------------------------------------------------------------------ *
   *  Veri — reyonlar ve ürünler                                         *
   * ------------------------------------------------------------------ */

  var KATEGORI = {
    kahvaltilik:  { ad: 'Kahvaltılık', renk: '#C9762B' },
    bakliyat:     { ad: 'Bakliyat & Konserve', renk: '#8C7A3A' },
    atistirmalik: { ad: 'Atıştırmalık', renk: '#9B3A5B' },
    icecek:       { ad: 'İçecek', renk: '#2E6EA6' },
    temizlik:     { ad: 'Temizlik', renk: '#2E8C74' },
    kagit:        { ad: 'Kağıt Ürünleri', renk: '#6A76A8' },
    sut:          { ad: 'Süt Ürünleri', renk: '#3F86B5' },
    manav:        { ad: 'Manav', renk: '#4C8C33' },
    kampanya:     { ad: 'Kampanya Standı', renk: '#C0392B' }
  };

  // tip: kutu | tetra | sise | teneke | kavanoz | poset | meyve
  var URUNLER = [
    // — Kahvaltılık —
    { id:'bal', ad:'Süzme Çiçek Balı', marka:'Balevi', kat:'kahvaltilik', tip:'kavanoz', renk:'#D89B12', fiyat:289.90, gram:'850 g', birim:'kg fiyatı 341,06 ₺', mense:'Muş', raf:'36 ay',
      aciklama:'Yayla çiçeklerinden süzme bal. Kristalleşmesi doğaldır; ılık suda eski kıvamına döner.' },
    { id:'recel', ad:'Vişne Reçeli', marka:'Balevi', kat:'kahvaltilik', tip:'kavanoz', renk:'#9E1F35', fiyat:84.50, gram:'380 g', birim:'kg fiyatı 222,37 ₺', mense:'Afyon', raf:'24 ay',
      aciklama:'Bütün vişne taneleriyle, geleneksel kazan usulü pişirilmiş reçel.' },
    { id:'krema', ad:'Kakaolu Fındık Kreması', marka:'Nutkrem', kat:'kahvaltilik', tip:'kavanoz', renk:'#5A3218', fiyat:149.90, gram:'400 g', birim:'kg fiyatı 374,75 ₺', mense:'Ordu', raf:'12 ay',
      aciklama:'%13 Karadeniz fındığı ile. Palm yağı içermez, buzdolabı gerektirmez.' },
    { id:'gevrek', ad:'Ballı Mısır Gevreği', marka:'Günebak', kat:'kahvaltilik', tip:'kutu', renk:'#E8A317', fiyat:96.75, gram:'450 g', birim:'kg fiyatı 215,00 ₺', mense:'Adana', raf:'10 ay',
      aciklama:'Tam tahıllı, bal kaplamalı gevrek. Sütle ıslandığında çıtırlığını korur.' },
    { id:'cay', ad:'Siyah Çay Harmanı', marka:'Rize Harman', kat:'kahvaltilik', tip:'kutu', renk:'#1E5A3A', fiyat:264.00, gram:'1 kg', birim:'kg fiyatı 264,00 ₺', mense:'Rize', raf:'24 ay',
      aciklama:'İlk sürgün yapraklardan, demi koyu açılan klasik harman.' },
    { id:'zeytin', ad:'Natürel Sızma Zeytinyağı', marka:'Ege Altını', kat:'kahvaltilik', tip:'sise', renk:'#7A8C1E', fiyat:379.90, gram:'1 L', birim:'litre fiyatı 379,90 ₺', mense:'Ayvalık', raf:'18 ay',
      aciklama:'Soğuk sıkım, asitlik oranı %0,4. Işık geçirmeyen koyu cam şişede.' },

    // — Bakliyat & konserve —
    { id:'pirinc', ad:'Baldo Pirinç', marka:'Anadolu Ambar', kat:'bakliyat', tip:'poset', renk:'#B58B4E', fiyat:118.00, gram:'1 kg', birim:'kg fiyatı 118,00 ₺', mense:'Edirne', raf:'24 ay',
      aciklama:'İri taneli, pilavda dağılmayan baldo. Taş ve yabancı madde ayıklanmıştır.' },
    { id:'makarna', ad:'Burgu Makarna', marka:'Değirmen', kat:'bakliyat', tip:'poset', renk:'#D9A441', fiyat:34.90, gram:'500 g', birim:'kg fiyatı 69,80 ₺', mense:'Konya', raf:'36 ay',
      aciklama:'Durum buğdayı irmiğinden. 9 dakikada al dente.' },
    { id:'mercimek', ad:'Kırmızı Mercimek', marka:'Anadolu Ambar', kat:'bakliyat', tip:'poset', renk:'#C4552A', fiyat:89.50, gram:'1 kg', birim:'kg fiyatı 89,50 ₺', mense:'Şanlıurfa', raf:'24 ay',
      aciklama:'Çabuk pişen, çorbada kıvam veren yerli mercimek.' },
    { id:'un', ad:'Buğday Unu', marka:'Değirmen', kat:'bakliyat', tip:'poset', renk:'#C9BFA6', fiyat:96.00, gram:'2 kg', birim:'kg fiyatı 48,00 ₺', mense:'Konya', raf:'12 ay',
      aciklama:'Çok amaçlı, elenmiş beyaz un. Ekmekte ve hamur işinde.' },
    { id:'nohut', ad:'Haşlanmış Nohut', marka:'Bereket Konserve', kat:'bakliyat', tip:'teneke', renk:'#B9862F', fiyat:49.90, gram:'400 g', birim:'kg fiyatı 124,75 ₺', mense:'Mersin', raf:'36 ay',
      aciklama:'Katkısız, tuzu ayarlanmış haşlanmış nohut. Süzüp doğrudan kullanılır.' },
    { id:'ton', ad:'Ton Balığı Zeytinyağlı', marka:'Bereket Konserve', kat:'bakliyat', tip:'teneke', renk:'#20618C', fiyat:129.90, gram:'160 g', birim:'kg fiyatı 811,88 ₺', mense:'İzmir', raf:'48 ay',
      aciklama:'Bütün parça, zeytinyağında. Kolay açılır kapaklı.' },

    // — Atıştırmalık —
    { id:'cikolata', ad:'Bitter Çikolata %70', marka:'Kakao Lab', kat:'atistirmalik', tip:'kutu', renk:'#3B2317', fiyat:59.90, gram:'70 g', birim:'kg fiyatı 855,71 ₺', mense:'İstanbul', raf:'12 ay',
      aciklama:'Tek kaynak kakao, düşük şeker. Kırıldığında net bir çıtırtı verir.' },
    { id:'kraker', ad:'Tuzlu Kraker', marka:'Çıtır', kat:'atistirmalik', tip:'kutu', renk:'#D96E1E', fiyat:42.50, gram:'180 g', birim:'kg fiyatı 236,11 ₺', mense:'Bursa', raf:'9 ay',
      aciklama:'İnce yapraklı, deniz tuzlu kraker. Ayrı ayrı paketlenmiş dört dilim.' },
    { id:'cips', ad:'Klasik Patates Cipsi', marka:'Çıtır', kat:'atistirmalik', tip:'poset', renk:'#E0B21C', fiyat:74.90, gram:'150 g', birim:'kg fiyatı 499,33 ₺', mense:'Niğde', raf:'6 ay',
      aciklama:'Kabuklu dilimlenmiş, ayçiçek yağında kızartılmış. Azot dolgulu paket.' },
    { id:'findik', ad:'Kavrulmuş Fındık İçi', marka:'Karadeniz Kuruyemiş', kat:'atistirmalik', tip:'poset', renk:'#7A4A22', fiyat:189.00, gram:'200 g', birim:'kg fiyatı 945,00 ₺', mense:'Giresun', raf:'8 ay',
      aciklama:'Tombul çeşit, kabuktan yeni çıkmış ve taş fırında kavrulmuş.' },

    // — İçecek —
    { id:'su', ad:'Doğal Kaynak Suyu', marka:'Pınarbaşı', kat:'icecek', tip:'sise', renk:'#2F9BD1', fiyat:39.90, gram:'5 L', birim:'litre fiyatı 7,98 ₺', mense:'Bolu', raf:'12 ay',
      aciklama:'Düşük sodyumlu kaynak suyu. Taşıma kulplu bidon.' },
    { id:'gazoz', ad:'Gazlı İçecek Limon', marka:'Kola Türk', kat:'icecek', tip:'sise', renk:'#C6A21A', fiyat:64.90, gram:'1 L', birim:'litre fiyatı 64,90 ₺', mense:'Isparta', raf:'9 ay',
      aciklama:'Gerçek limon aromalı, kamış şekerli gazoz. Buzlu içilir.' },
    { id:'visne', ad:'Vişne Suyu %100', marka:'Meyvem', kat:'icecek', tip:'tetra', renk:'#8E1B33', fiyat:79.90, gram:'1 L', birim:'litre fiyatı 79,90 ₺', mense:'Amasya', raf:'12 ay',
      aciklama:'Şeker ilavesiz, meyve suyu konsantresinden. Açtıktan sonra buzdolabında.' },
    { id:'ayran', ad:'Yayık Ayranı', marka:'Süthane', kat:'icecek', tip:'sise', renk:'#DDE3E6', fiyat:69.50, gram:'1 L', birim:'litre fiyatı 69,50 ₺', mense:'Kars', raf:'21 gün',
      aciklama:'Tam yağlı yayık ayranı, tuzu düşük. Çalkalayarak servis edin.' },

    // — Temizlik —
    { id:'bulasik', ad:'Bulaşık Deterjanı Limon', marka:'Parlak', kat:'temizlik', tip:'sise', renk:'#3FA96B', fiyat:89.90, gram:'750 ml', birim:'litre fiyatı 119,87 ₺', mense:'Kocaeli', raf:'36 ay',
      aciklama:'Yoğun formül, yağ çözücü. Ellere yumuşak, gliserin içerir.' },
    { id:'camasir', ad:'Çamaşır Suyu', marka:'Parlak', kat:'temizlik', tip:'sise', renk:'#2E7FB8', fiyat:54.90, gram:'1 L', birim:'litre fiyatı 54,90 ₺', mense:'Kocaeli', raf:'12 ay',
      aciklama:'Çocuk kilitli kapak. Asitli ürünlerle karıştırmayın.' },
    { id:'sabun', ad:'Sıvı Sabun Zeytinyağlı', marka:'Parlak', kat:'temizlik', tip:'sise', renk:'#B0C24A', fiyat:74.50, gram:'500 ml', birim:'litre fiyatı 149,00 ₺', mense:'Ayvalık', raf:'30 ay',
      aciklama:'pH dengeli, nemlendirici zeytinyağı içerir. Pompalı şişe.' },

    // — Kağıt —
    { id:'havlu', ad:'Kağıt Havlu 4’lü', marka:'Yumuşak', kat:'kagit', tip:'poset', renk:'#7C8AC4', fiyat:139.00, gram:'4 rulo', birim:'rulo fiyatı 34,75 ₺', mense:'Sakarya', raf:'Sınırsız',
      aciklama:'Çift kat, yüksek emiş. Rulo başına 90 yaprak.' },
    { id:'tuvalet', ad:'Tuvalet Kağıdı 12’li', marka:'Yumuşak', kat:'kagit', tip:'poset', renk:'#5F6FB5', fiyat:229.00, gram:'12 rulo', birim:'rulo fiyatı 19,08 ₺', mense:'Sakarya', raf:'Sınırsız',
      aciklama:'Üç kat, parfümsüz. Suda kolay dağılır.' },
    { id:'pecete', ad:'Kağıt Peçete', marka:'Yumuşak', kat:'kagit', tip:'kutu', renk:'#93A0D4', fiyat:47.90, gram:'100 yaprak', birim:'adet fiyatı 0,48 ₺', mense:'Sakarya', raf:'Sınırsız',
      aciklama:'Klor kullanılmadan ağartılmış, gıdaya temas uygun peçete.' },

    // — Süt ürünleri (soğutucu) —
    { id:'sut', ad:'Tam Yağlı Süt', marka:'Süthane', kat:'sut', tip:'tetra', renk:'#2C6FA8', fiyat:72.00, gram:'1 L', birim:'litre fiyatı 72,00 ₺', mense:'Kars', raf:'4 ay',
      aciklama:'UHT, %3,2 yağlı. Açılmadan oda sıcaklığında saklanabilir.' },
    { id:'peynir', ad:'Beyaz Peynir Tam Yağlı', marka:'Süthane', kat:'sut', tip:'kutu', renk:'#8FB3C9', fiyat:289.00, gram:'600 g', birim:'kg fiyatı 481,67 ₺', mense:'Trakya', raf:'6 ay',
      aciklama:'İnek sütünden, salamurada altı ay olgunlaştırılmış.' },
    { id:'yogurt', ad:'Süzme Yoğurt', marka:'Süthane', kat:'sut', tip:'kavanoz', renk:'#D8E2E8', fiyat:129.90, gram:'1 kg', birim:'kg fiyatı 129,90 ₺', mense:'Kars', raf:'25 gün',
      aciklama:'Kaşık dik durur kıvamda. Katkı ve nişasta içermez.' },
    { id:'tereyagi', ad:'Köy Tereyağı', marka:'Süthane', kat:'sut', tip:'kutu', renk:'#E3C34A', fiyat:214.50, gram:'250 g', birim:'kg fiyatı 858,00 ₺', mense:'Erzincan', raf:'8 ay',
      aciklama:'Yayıktan çıkma, %82 süt yağı. Derin dondurucuda sekiz ay dayanır.' },

    // — Manav —
    { id:'domates', ad:'Salkım Domates', marka:'Manav Reyonu', kat:'manav', tip:'meyve', renk:'#C5382B', fiyat:34.90, gram:'kg', birim:'kg fiyatı 34,90 ₺', mense:'Antalya', raf:'Serin yerde 5 gün',
      aciklama:'Sofralık salkım domates. Buzdolabına koymayın — aroması kaybolur.' },
    { id:'elma', ad:'Amasya Elması', marka:'Manav Reyonu', kat:'manav', tip:'meyve', renk:'#B03A2E', fiyat:44.90, gram:'kg', birim:'kg fiyatı 44,90 ₺', mense:'Amasya', raf:'Serin yerde 3 hafta',
      aciklama:'Sert etli, mayhoş. Kabuğundaki doğal mumsu tabaka korunmuştur.' },
    { id:'limon', ad:'Enterdonat Limon', marka:'Manav Reyonu', kat:'manav', tip:'meyve', renk:'#D9B325', fiyat:59.90, gram:'kg', birim:'kg fiyatı 59,90 ₺', mense:'Mersin', raf:'Serin yerde 2 hafta',
      aciklama:'İnce kabuklu ve sulu. Kabuğu rendelenmeye uygun.' },
    { id:'salatalik', ad:'Çengelköy Salatalık', marka:'Manav Reyonu', kat:'manav', tip:'meyve', renk:'#4E8C3A', fiyat:39.90, gram:'kg', birim:'kg fiyatı 39,90 ₺', mense:'Antalya', raf:'Buzdolabında 6 gün',
      aciklama:'Çekirdeksiz gövde, ince kabuk. Soymadan yenir.' },

    // — Kampanya standı —
    { id:'kahve', ad:'Türk Kahvesi', marka:'Bereket Seçkin', kat:'kampanya', tip:'kutu', renk:'#6B3A1E', fiyat:159.00, gram:'200 g', birim:'kg fiyatı 795,00 ₺', mense:'İzmir', raf:'18 ay',
      aciklama:'Orta kavrulmuş, taze çekilmiş. Vakumlu paket, açınca cezveye hazır.' },
    { id:'seker', ad:'Bayram Şekeri Karışık', marka:'Bereket Seçkin', kat:'kampanya', tip:'poset', renk:'#C2306B', fiyat:112.00, gram:'400 g', birim:'kg fiyatı 280,00 ₺', mense:'Gaziantep', raf:'12 ay',
      aciklama:'Badem, fındık ve nane şekerleri bir arada. Hediyelik kutu seçeneği var.' },
    { id:'kuruyemis', ad:'Karışık Kuruyemiş', marka:'Bereket Seçkin', kat:'kampanya', tip:'poset', renk:'#8A6A2C', fiyat:249.00, gram:'300 g', birim:'kg fiyatı 830,00 ₺', mense:'Gaziantep', raf:'8 ay',
      aciklama:'Antep fıstığı, badem, kaju ve leblebi. Az tuzlu, taze kavrum.' }
  ];

  var URUN_INDEKS = {};
  URUNLER.forEach(function (p) { URUN_INDEKS[p.id] = p; });

  /* ------------------------------------------------------------------ *
   *  Mağaza planı                                                       *
   * ------------------------------------------------------------------ */

  var SINIR = { x: 12, z: 12 };
  var GOZ = 1.62;
  var TAVAN = 3.9;

  var RAFLAR = [
    { id:'A', tip:'gondol', koridor:1, x:-5.2, z:-2,  uzun:10,  en:1.4, yuz:{ eksi:'kahvaltilik', arti:'bakliyat' } },
    { id:'B', tip:'gondol', koridor:2, x:-0.5, z:-2,  uzun:10,  en:1.4, yuz:{ eksi:'atistirmalik', arti:'icecek' } },
    { id:'C', tip:'gondol', koridor:3, x: 5.0, z:-2,  uzun:10,  en:1.4, yuz:{ eksi:'temizlik', arti:'kagit' } },
    { id:'D', tip:'dolap',  x:10.7, z:-2,  uzun:11,  en:0.9, yuz:{ eksi:'sut' } },
    { id:'M', tip:'manav',  x:-9.6, z: 6.0, uzun:5.9, en:3.2 },
    { id:'S', tip:'stand',  x: 2.7, z: 7.4, uzun:2.5, en:2.5 },
    { id:'K', tip:'kasa',   x: 7.6, z: 8.2, uzun:5.0, en:1.1 }
  ];

  var GONDOL_KATLAR = [0.34, 0.79, 1.24, 1.70];
  var DOLAP_KATLAR = [0.42, 0.98, 1.54];

  var engeller = [];
  function engelEkle(x, z, enX, enZ) {
    engeller.push({ x0: x - enX / 2, x1: x + enX / 2, z0: z - enZ / 2, z1: z + enZ / 2 });
  }

  /* ------------------------------------------------------------------ *
   *  Etiket dokuları                                                    *
   * ------------------------------------------------------------------ */

  var dokuOnbellek = {};

  function tuval(w, h) {
    var c = document.createElement('canvas');
    c.width = Math.max(8, Math.round(w));
    c.height = Math.max(8, Math.round(h));
    return c;
  }

  function satirSar(ctx, metin, genislik) {
    var kelimeler = metin.split(' ');
    var satirlar = [], su = '';
    for (var i = 0; i < kelimeler.length; i++) {
      var dene = su ? su + ' ' + kelimeler[i] : kelimeler[i];
      if (ctx.measureText(dene).width > genislik && su) { satirlar.push(su); su = kelimeler[i]; }
      else su = dene;
    }
    if (su) satirlar.push(su);
    return satirlar;
  }

  // Ambalaj yüzü. mod 'on' düz panel, 'sarma' silindire dolanır (iki panel yan yana).
  function etiketCiz(p, mod, oran) {
    var panelEn = mod === 'sarma' ? 340 : 420;
    var h = kis(Math.round(panelEn * oran), 150, 980);
    var w = mod === 'sarma' ? panelEn * 2 : panelEn;
    var c = tuval(w, h);
    var ctx = c.getContext('2d');
    var ana = p.renk;
    var murekkep = okunurMurekkep(ana);

    var grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, tonla(ana, 0.16));
    grad.addColorStop(1, tonla(ana, -0.14));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Kategoriye göre değişen motif — raf tek tip görünmesin.
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = murekkep;
    ctx.strokeStyle = murekkep;
    var kat = p.kat;
    if (kat === 'temizlik' || kat === 'kagit') {
      for (var i = -2; i < 10; i++) {
        ctx.save();
        ctx.translate(i * (w / 7), 0);
        ctx.rotate(-0.3);
        ctx.fillRect(0, -h, w / 22, h * 3);
        ctx.restore();
      }
    } else if (kat === 'icecek' || kat === 'sut') {
      ctx.lineWidth = h * 0.02;
      for (var j = 0; j < 6; j++) {
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.66, h * (0.14 + j * 0.12), 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (kat === 'atistirmalik' || kat === 'kampanya') {
      for (var k = 0; k < 30; k++) {
        ctx.beginPath();
        ctx.arc(rastArasi(0, w), rastArasi(0, h), rastArasi(w * 0.008, w * 0.035), 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.moveTo(0, h * 0.74);
      for (var x = 0; x <= w; x += w / 30) {
        ctx.lineTo(x, h * 0.74 + Math.sin(x / w * 9) * h * 0.045);
      }
      ctx.lineTo(w, h); ctx.lineTo(0, h);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();

    function panelCiz(x0, wp) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Marka şeridi
      ctx.fillStyle = murekkep;
      ctx.globalAlpha = 0.92;
      ctx.fillRect(x0 + wp * 0.08, h * 0.085, wp * 0.84, h * 0.11);
      ctx.globalAlpha = 1;

      ctx.fillStyle = ana;
      var mBoy = Math.min(h * 0.068, wp * 1.55 / Math.max(7, p.marka.length));
      ctx.font = '400 ' + mBoy.toFixed(0) + 'px "Archivo Black", sans-serif';
      if ('letterSpacing' in ctx) ctx.letterSpacing = (mBoy * 0.05).toFixed(1) + 'px';
      ctx.fillText(buyuk(p.marka), x0 + wp / 2, h * 0.142);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

      // Ürün adı
      ctx.fillStyle = murekkep;
      var aBoy = h * 0.105;
      ctx.font = '600 ' + aBoy.toFixed(0) + 'px "IBM Plex Sans", sans-serif';
      var satirlar = satirSar(ctx, p.ad, wp * 0.8);
      var koruma = 0;
      while (satirlar.length > 3 && aBoy > h * 0.045 && koruma++ < 12) {
        aBoy *= 0.86;
        ctx.font = '600 ' + aBoy.toFixed(0) + 'px "IBM Plex Sans", sans-serif';
        satirlar = satirSar(ctx, p.ad, wp * 0.8);
      }
      var y0 = h * 0.5 - (satirlar.length - 1) * aBoy * 0.62;
      satirlar.forEach(function (s, i) {
        ctx.fillText(s, x0 + wp / 2, y0 + i * aBoy * 1.24);
      });

      // Gramaj
      ctx.globalAlpha = 0.86;
      ctx.font = '500 ' + (h * 0.055).toFixed(0) + 'px "IBM Plex Mono", monospace';
      ctx.fillText(buyuk(p.gram), x0 + wp / 2, h * 0.86);
      ctx.globalAlpha = 1;

      ctx.strokeStyle = murekkep;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = Math.max(2, h * 0.007);
      ctx.strokeRect(x0 + wp * 0.05, h * 0.04, wp * 0.9, h * 0.92);
      ctx.globalAlpha = 1;
    }

    if (mod === 'sarma') { panelCiz(0, panelEn); panelCiz(panelEn, panelEn); }
    else panelCiz(0, panelEn);

    var doku = new T.CanvasTexture(c);
    doku.colorSpace = T.SRGBColorSpace;
    doku.anisotropy = 4;
    return doku;
  }

  function etiket(p, mod, oran) {
    var anahtar = p.id + '|' + mod;
    if (!dokuOnbellek[anahtar]) dokuOnbellek[anahtar] = etiketCiz(p, mod, oran);
    return dokuOnbellek[anahtar];
  }

  function zeminDoku(acik) {
    var c = tuval(256, 256);
    var ctx = c.getContext('2d');
    ctx.fillStyle = acik ? '#D5D9D5' : '#1A2120';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = acik ? '#CBD0CB' : '#161D1C';
    ctx.fillRect(4, 4, 248, 248);
    ctx.strokeStyle = acik ? 'rgba(120,132,126,.5)' : 'rgba(150,170,164,.15)';
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, 252, 252);
    for (var i = 0; i < 600; i++) {
      ctx.fillStyle = acik ? 'rgba(255,255,255,.28)' : 'rgba(255,255,255,.04)';
      ctx.fillRect(rastArasi(0, 256), rastArasi(0, 256), 2, 2);
    }
    var d = new T.CanvasTexture(c);
    d.colorSpace = T.SRGBColorSpace;
    d.wrapS = d.wrapT = T.RepeatWrapping;
    d.repeat.set(24, 24);
    d.anisotropy = 8;
    return d;
  }

  // Gondol ucuna asılan koridor posteri: numara + o koridordaki reyonlar
  function ucPosterDoku(no, katlar) {
    var c = tuval(512, 760);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#F4F7F5'; ctx.fillRect(0, 0, 512, 760);
    ctx.fillStyle = '#0F8F8B'; ctx.fillRect(0, 0, 512, 132);

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#F4F7F5';
    ctx.font = '400 46px "Archivo Black", sans-serif';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '10px';
    ctx.fillText('KORİDOR', 256, 68);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

    ctx.fillStyle = '#0C1513';
    ctx.font = '400 250px "Archivo Black", sans-serif';
    ctx.fillText(String(no), 256, 320);

    ctx.strokeStyle = 'rgba(12,21,19,.18)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(80, 470); ctx.lineTo(432, 470); ctx.stroke();

    katlar.forEach(function (kat, i) {
      var boy = 44;
      ctx.fillStyle = '#0C1513';
      ctx.font = '600 ' + boy + 'px "IBM Plex Sans", sans-serif';
      var ad = buyuk(KATEGORI[kat].ad);
      while (ctx.measureText(ad).width > 430 && boy > 22) {
        boy -= 3;
        ctx.font = '600 ' + boy + 'px "IBM Plex Sans", sans-serif';
      }
      ctx.fillText(ad, 256, 546 + i * 88);
      ctx.fillStyle = KATEGORI[kat].renk;
      ctx.fillRect(196, 574 + i * 88, 120, 8);
    });

    var d = new T.CanvasTexture(c);
    d.colorSpace = T.SRGBColorSpace;
    d.anisotropy = 4;
    return d;
  }

  function tabelaDoku(baslik) {
    var c = tuval(1024, 160);
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#F4F7F5';
    ctx.fillRect(0, 0, 1024, 160);
    ctx.fillStyle = '#0F8F8B';
    ctx.fillRect(0, 0, 1024, 12);
    ctx.fillStyle = '#0C1513';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var boy = 78;
    ctx.font = '400 ' + boy + 'px "Archivo Black", sans-serif';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '6px';
    while (ctx.measureText(buyuk(baslik)).width > 940 && boy > 26) {
      boy -= 4;
      ctx.font = '400 ' + boy + 'px "Archivo Black", sans-serif';
    }
    ctx.fillText(buyuk(baslik), 512, 92);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    var d = new T.CanvasTexture(c);
    d.colorSpace = T.SRGBColorSpace;
    d.anisotropy = 4;
    return d;
  }

  /* ------------------------------------------------------------------ *
   *  Ürün gövdeleri                                                     *
   *  Her ürün { parcalar:[{geo,mat}], en, boy, derin } döner.            *
   *  Malzeme dizisi kullanılmaz — her parça tek malzemeli, instanced.    *
   * ------------------------------------------------------------------ */

  var matOnbellek = {};

  function govdeMat(renk, parlak) {
    var a = 'g' + renk + parlak;
    if (!matOnbellek[a]) {
      matOnbellek[a] = new T.MeshStandardMaterial({
        color: new T.Color(renk),
        roughness: parlak ? 0.34 : 0.78,
        metalness: parlak ? 0.14 : 0.02
      });
    }
    return matOnbellek[a];
  }
  function metalMat(renk) {
    var a = 'm' + renk;
    if (!matOnbellek[a]) matOnbellek[a] = new T.MeshStandardMaterial({ color: new T.Color(renk), roughness: 0.32, metalness: 0.85 });
    return matOnbellek[a];
  }
  function camMat(renk, saydam) {
    var a = 'c' + renk + saydam;
    if (!matOnbellek[a]) {
      matOnbellek[a] = new T.MeshStandardMaterial({
        color: new T.Color(renk), roughness: 0.12, metalness: 0,
        transparent: true, opacity: saydam
      });
    }
    return matOnbellek[a];
  }
  function etiketMat(p, mod, oran, cift) {
    var a = 'e' + p.id + mod;
    if (!matOnbellek[a]) {
      matOnbellek[a] = new T.MeshStandardMaterial({
        map: etiket(p, mod, oran),
        roughness: 0.6,
        side: cift ? T.DoubleSide : T.FrontSide
      });
    }
    return matOnbellek[a];
  }

  // Yassı kutuların ön/arka yüzüne yapışan etiket levhası
  function levha(en, boy, z, arka) {
    var g = new T.PlaneGeometry(en, boy);
    if (arka) g.rotateY(Math.PI);
    g.translate(0, boy / 2, arka ? -z : z);
    return g;
  }

  function govdeKutu(p) {
    var en = 0.13, boy = 0.235, derin = 0.062;
    if (p.tip === 'tetra') { en = 0.075; boy = 0.205; derin = 0.075; }
    if (p.id === 'cay') { en = 0.135; boy = 0.20; derin = 0.09; }
    if (p.id === 'gevrek') { en = 0.155; boy = 0.30; derin = 0.075; }
    if (p.id === 'cikolata') { en = 0.09; boy = 0.175; derin = 0.02; }
    if (p.id === 'peynir') { en = 0.13; boy = 0.10; derin = 0.09; }
    if (p.id === 'tereyagi') { en = 0.105; boy = 0.055; derin = 0.055; }
    if (p.id === 'pecete') { en = 0.145; boy = 0.075; derin = 0.115; }
    if (p.id === 'kahve') { en = 0.10; boy = 0.15; derin = 0.045; }

    var kutuGeo = new T.BoxGeometry(en, boy, derin);
    kutuGeo.translate(0, boy / 2, 0);
    var yan = govdeMat(tonla(p.renk, -0.10), false);
    var em = etiketMat(p, 'on', boy / en);

    var parcalar = [
      { geo: kutuGeo, mat: yan },
      { geo: levha(en * 0.995, boy * 0.995, derin / 2 + 0.0012, false), mat: em },
      { geo: levha(en * 0.995, boy * 0.995, derin / 2 + 0.0012, true), mat: em }
    ];

    if (p.tip === 'tetra') {
      var kap = new T.BoxGeometry(en * 0.44, 0.014, derin * 0.44);
      kap.translate(0, boy + 0.007, 0);
      parcalar.push({ geo: kap, mat: govdeMat('#D8DCD8', true) });
    }
    return { parcalar: parcalar, en: en, boy: boy, derin: derin };
  }

  function sisme(x, y, en, boy) {
    var fx = 1 - Math.pow(x / (en / 2), 2);
    var fy = 1 - Math.pow(y / (boy / 2), 2);
    return 1 + 0.85 * Math.max(0, fx) * Math.max(0, fy);
  }

  function govdePoset(p) {
    var en = 0.135, boy = 0.20, derin = 0.055;
    if (p.id === 'cips') { en = 0.145; boy = 0.235; derin = 0.07; }
    if (p.id === 'un') { en = 0.145; boy = 0.225; derin = 0.075; }
    if (p.id === 'havlu') { en = 0.24; boy = 0.24; derin = 0.13; }
    if (p.id === 'tuvalet') { en = 0.30; boy = 0.22; derin = 0.15; }
    if (p.id === 'findik' || p.id === 'seker' || p.id === 'kuruyemis') { en = 0.115; boy = 0.155; derin = 0.05; }

    var geo = new T.BoxGeometry(en, boy, derin, 5, 6, 5);
    var poz = geo.attributes.position;
    var v = new T.Vector3();
    for (var i = 0; i < poz.count; i++) {
      v.fromBufferAttribute(poz, i);
      v.z *= sisme(v.x, v.y, en, boy);
      poz.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    geo.translate(0, boy / 2, 0);

    // Etiket levhası ambalajın şişkinliğini takip etsin
    function sisikLevha(arka) {
      var g = new T.PlaneGeometry(en * 0.99, boy * 0.99, 6, 8);
      var pp = g.attributes.position, vv = new T.Vector3();
      for (var k = 0; k < pp.count; k++) {
        vv.fromBufferAttribute(pp, k);
        pp.setXYZ(k, vv.x, vv.y, derin / 2 * sisme(vv.x, vv.y, en, boy) + 0.0015);
      }
      g.computeVertexNormals();
      if (arka) g.rotateY(Math.PI);
      g.translate(0, boy / 2, 0);
      return g;
    }

    var yan = govdeMat(tonla(p.renk, -0.08), true);
    var em = etiketMat(p, 'on', boy / en);
    var kirma = new T.BoxGeometry(en * 0.96, 0.014, derin * 0.34);
    kirma.translate(0, boy - 0.005, 0);

    return {
      parcalar: [
        { geo: geo, mat: yan },
        { geo: kirma, mat: yan },
        { geo: sisikLevha(false), mat: em },
        { geo: sisikLevha(true), mat: em }
      ],
      en: en, boy: boy, derin: derin * 1.85
    };
  }

  function govdeSise(p) {
    var boy = 0.27, r = 0.038, boyunR = 0.014, kapakRenk = '#D8DCD8';
    if (p.id === 'su') { boy = 0.34; r = 0.075; boyunR = 0.019; }
    if (p.id === 'zeytin') { boy = 0.29; r = 0.042; kapakRenk = '#2F4A18'; }
    if (p.id === 'bulasik' || p.id === 'sabun') { boy = 0.235; r = 0.036; kapakRenk = tonla(p.renk, -0.24); }
    if (p.id === 'camasir') { boy = 0.27; r = 0.05; kapakRenk = '#1F5F8C'; }
    if (p.id === 'ayran') { boy = 0.245; r = 0.045; kapakRenk = '#2C6FA8'; }
    if (p.id === 'gazoz') { boy = 0.30; r = 0.042; kapakRenk = '#C6A21A'; }

    var nokta = [
      new T.Vector2(0.001, 0),
      new T.Vector2(r * 0.86, 0.004),
      new T.Vector2(r, 0.028),
      new T.Vector2(r, boy * 0.60),
      new T.Vector2(r * 0.94, boy * 0.68),
      new T.Vector2(boyunR * 1.6, boy * 0.85),
      new T.Vector2(boyunR, boy * 0.90),
      new T.Vector2(boyunR, boy)
    ];
    var geo = new T.LatheGeometry(nokta, 26);
    var saydam = (p.id === 'su') ? 0.34 : (p.id === 'ayran' ? 0.92 : 0.62);
    var siseMat = camMat(tonla(p.renk, p.id === 'su' ? 0.30 : 0.06), saydam);

    var kap = new T.CylinderGeometry(boyunR * 1.3, boyunR * 1.3, 0.026, 20);
    kap.translate(0, boy + 0.011, 0);

    var etH = boy * 0.40;
    var etGeo = new T.CylinderGeometry(r * 1.014, r * 1.014, etH, 30, 1, true);
    etGeo.translate(0, boy * 0.30, 0);

    return {
      parcalar: [
        { geo: geo, mat: siseMat },
        { geo: kap, mat: govdeMat(kapakRenk, true) },
        { geo: etGeo, mat: etiketMat(p, 'sarma', etH / (Math.PI * r), true) }
      ],
      en: r * 2, boy: boy + 0.03, derin: r * 2
    };
  }

  function govdeTeneke(p) {
    var r = p.id === 'ton' ? 0.043 : 0.038;
    var boy = p.id === 'ton' ? 0.034 : 0.11;
    var govde = new T.CylinderGeometry(r, r, boy, 26, 1, true);
    govde.translate(0, boy / 2, 0);
    var ust = new T.CylinderGeometry(r * 1.05, r * 1.05, boy * 0.10, 26);
    var ustGeo = ust.clone(); ustGeo.translate(0, boy - boy * 0.05, 0);
    var altGeo = ust.clone(); altGeo.translate(0, boy * 0.05, 0);
    var kapak = new T.CircleGeometry(r * 1.05, 26);
    kapak.rotateX(-Math.PI / 2);
    kapak.translate(0, boy + 0.001, 0);

    return {
      parcalar: [
        { geo: govde, mat: etiketMat(p, 'sarma', boy / (Math.PI * r), true) },
        { geo: ustGeo, mat: metalMat('#C9CED2') },
        { geo: altGeo, mat: metalMat('#C9CED2') },
        { geo: kapak, mat: metalMat('#B4B9BD') }
      ],
      en: r * 2.1, boy: boy, derin: r * 2.1
    };
  }

  function govdeKavanoz(p) {
    var r = 0.047, boy = 0.115;
    if (p.id === 'yogurt') { r = 0.062; boy = 0.13; }
    if (p.id === 'krema') { r = 0.043; boy = 0.105; }

    var cam = new T.CylinderGeometry(r, r * 0.95, boy, 24);
    cam.translate(0, boy / 2, 0);
    var ic = new T.CylinderGeometry(r * 0.92, r * 0.88, boy * 0.76, 22);
    ic.translate(0, boy * 0.39, 0);
    var kapak = new T.CylinderGeometry(r * 1.04, r * 1.04, 0.024, 24);
    kapak.translate(0, boy + 0.011, 0);
    var etH = boy * 0.5;
    var etGeo = new T.CylinderGeometry(r * 1.015, r * 1.015, etH, 26, 1, true);
    etGeo.translate(0, boy * 0.40, 0);

    return {
      parcalar: [
        { geo: ic, mat: govdeMat(p.renk, false) },
        { geo: cam, mat: camMat('#E8F0EE', p.id === 'yogurt' ? 0.9 : 0.42) },
        { geo: kapak, mat: govdeMat(p.id === 'yogurt' ? '#2C6FA8' : tonla(p.renk, -0.22), true) },
        { geo: etGeo, mat: etiketMat(p, 'sarma', etH / (Math.PI * r), true) }
      ],
      en: r * 2.1, boy: boy + 0.03, derin: r * 2.1
    };
  }

  function govdeMeyve(p) {
    if (p.id === 'salatalik') {
      var g = new T.CapsuleGeometry(0.026, 0.10, 3, 12);
      g.rotateZ(Math.PI / 2);
      g.translate(0, 0.026, 0);
      return { parcalar: [{ geo: g, mat: govdeMat(p.renk, true) }], en: 0.16, boy: 0.055, derin: 0.055 };
    }
    var r = 0.043;
    var yassilik = p.id === 'limon' ? 1.14 : 0.92;
    var kure = new T.SphereGeometry(r, 14, 10);
    kure.scale(1, yassilik, 1);
    kure.translate(0, r * yassilik, 0);
    var parcalar = [{ geo: kure, mat: govdeMat(p.renk, true) }];
    if (p.id !== 'limon') {
      var sap = new T.CylinderGeometry(0.0035, 0.005, 0.026, 5);
      sap.translate(0, r * yassilik * 2 + 0.008, 0);
      parcalar.push({ geo: sap, mat: govdeMat('#4A5A20', false) });
    }
    return { parcalar: parcalar, en: r * 2.1, boy: r * yassilik * 2.2, derin: r * 2.1 };
  }

  var govdeOnbellek = {};
  function govde(p) {
    if (govdeOnbellek[p.id]) return govdeOnbellek[p.id];
    var g;
    switch (p.tip) {
      case 'sise': g = govdeSise(p); break;
      case 'teneke': g = govdeTeneke(p); break;
      case 'kavanoz': g = govdeKavanoz(p); break;
      case 'poset': g = govdePoset(p); break;
      case 'meyve': g = govdeMeyve(p); break;
      default: g = govdeKutu(p);
    }
    govdeOnbellek[p.id] = g;
    return g;
  }

  function urunGrubu(p) {
    var g = govde(p);
    var grup = new T.Group();
    g.parcalar.forEach(function (par) { grup.add(new T.Mesh(par.geo, par.mat)); });
    grup.userData.olcu = { en: g.en, boy: g.boy, derin: g.derin };
    return grup;
  }

  /* ------------------------------------------------------------------ *
   *  Sahne                                                              *
   * ------------------------------------------------------------------ */

  var PALET = {
    acik: { fon:'#DDE4E1', sis:'#DCE3E0', duvar:'#E7EAE6', tavan:'#F1F3F0',
      ortam:0.95, yon:1.42, yonRenk:'#FFF6E6', lamba:'#FFFFFF', lambaGuc:0.0,
      sisYakin:18, sisUzak:54, poz:1.05, lambaGuclu:1.0, tavanIsik:0.34 },
    koyu: { fon:'#0D1413', sis:'#101817', duvar:'#242C2D', tavan:'#171E1F',
      ortam:0.38, yon:0.30, yonRenk:'#BFD8E8', lamba:'#FFD9A0', lambaGuc:14,
      sisYakin:9, sisUzak:38, poz:1.15, lambaGuclu:1.7, tavanIsik:0.10 }
  };

  var sahne, kamera, ciz, sahneEl;
  var zeminMesh, isikYon, isikOrtam;
  var noktaIsiklari = [];
  var zeminDokuAcik, zeminDokuKoyu;
  var duvarMat, tavanMat, lambaMat, zeminMat;
  var secilebilir = [], bloklar = [];
  var vurguKutu, zeminHalka, hedefHalka;
  var koyuMu = false;
  var toplamNesne = 0;

  function temaKoyuMu() {
    var d = document.documentElement.getAttribute('data-theme');
    if (d === 'dark') return true;
    if (d === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function paletUygula() {
    koyuMu = temaKoyuMu();
    var P = koyuMu ? PALET.koyu : PALET.acik;
    sahne.background = new T.Color(P.fon);
    sahne.fog.color.set(P.sis);
    sahne.fog.near = P.sisYakin;
    sahne.fog.far = P.sisUzak;
    isikOrtam.intensity = P.ortam;
    isikYon.intensity = P.yon;
    isikYon.color.set(P.yonRenk);
    duvarMat.color.set(P.duvar);
    tavanMat.color.set(P.tavan);
    tavanMat.emissive.set(P.tavan);
    tavanMat.emissiveIntensity = P.tavanIsik;
    lambaMat.color.set(P.lamba);
    lambaMat.emissive.set(P.lamba);
    lambaMat.emissiveIntensity = P.lambaGuclu;
    noktaIsiklari.forEach(function (l) { l.intensity = P.lambaGuc; });
    zeminMat.map = koyuMu ? zeminDokuKoyu : zeminDokuAcik;
    zeminMat.needsUpdate = true;
    ciz.toneMappingExposure = P.poz;
  }

  function sahneKur() {
    sahneEl = document.getElementById('sahne');
    sahne = new T.Scene();
    sahne.fog = new T.Fog('#DCE3E0', 18, 54);

    kamera = new T.PerspectiveCamera(64, 1, 0.05, 120);
    kamera.rotation.order = 'YXZ';
    kamera.position.set(0, GOZ, 10.4);

    ciz = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    ciz.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    ciz.shadowMap.enabled = true;
    ciz.shadowMap.type = T.PCFSoftShadowMap;
    ciz.toneMapping = T.ACESFilmicToneMapping;
    sahneEl.appendChild(ciz.domElement);

    isikOrtam = new T.HemisphereLight('#FFFFFF', '#A9B2AE', 0.95);
    sahne.add(isikOrtam);

    isikYon = new T.DirectionalLight('#FFF6E6', 1.5);
    isikYon.position.set(8, 15, 10);
    isikYon.castShadow = true;
    isikYon.shadow.mapSize.set(2048, 2048);
    var sk = isikYon.shadow.camera;
    sk.left = -15; sk.right = 15; sk.top = 15; sk.bottom = -15;
    sk.near = 1; sk.far = 46;
    isikYon.shadow.bias = -0.0007;
    isikYon.shadow.normalBias = 0.02;
    sahne.add(isikYon);
    sahne.add(isikYon.target);

    magazaKur();
    urunleriYerlestir();
    imleclerKur();
    paletUygula();
    boyutla();
  }

  /* ---------- mağaza kabuğu ---------- */

  var rafMat, iskeletMat, sirtMat;

  function magazaKur() {
    zeminDokuAcik = zeminDoku(true);
    zeminDokuKoyu = zeminDoku(false);

    zeminMat = new T.MeshStandardMaterial({ map: zeminDokuAcik, roughness: 0.55, metalness: 0.04 });
    zeminMesh = new T.Mesh(new T.PlaneGeometry(SINIR.x * 2, SINIR.z * 2), zeminMat);
    zeminMesh.rotation.x = -Math.PI / 2;
    zeminMesh.receiveShadow = true;
    sahne.add(zeminMesh);

    duvarMat = new T.MeshStandardMaterial({ color: '#E7EAE6', roughness: 0.92, side: T.DoubleSide });
    tavanMat = new T.MeshStandardMaterial({ color: '#F1F3F0', emissive: '#F1F3F0', emissiveIntensity: 0.34, roughness: 0.95, side: T.DoubleSide });
    lambaMat = new T.MeshStandardMaterial({ color: '#FFFFFF', emissive: '#FFFFFF', emissiveIntensity: 1, roughness: 1 });
    rafMat = new T.MeshStandardMaterial({ color: '#EAEEEB', roughness: 0.68, metalness: 0.08 });
    iskeletMat = new T.MeshStandardMaterial({ color: '#B3BCB8', roughness: 0.5, metalness: 0.35 });
    sirtMat = new T.MeshStandardMaterial({ color: '#DCE1DE', roughness: 0.8, metalness: 0.05 });

    function duvar(w, x, z, dondur) {
      var m = new T.Mesh(new T.PlaneGeometry(w, TAVAN), duvarMat);
      m.position.set(x, TAVAN / 2, z);
      m.rotation.y = dondur;
      m.receiveShadow = true;
      sahne.add(m);
      bloklar.push(m);
    }
    duvar(SINIR.x * 2, 0, -SINIR.z, 0);
    duvar(SINIR.x * 2, 0, SINIR.z, Math.PI);
    duvar(SINIR.z * 2, -SINIR.x, 0, Math.PI / 2);
    duvar(SINIR.z * 2, SINIR.x, 0, -Math.PI / 2);

    var tavan = new T.Mesh(new T.PlaneGeometry(SINIR.x * 2, SINIR.z * 2), tavanMat);
    tavan.rotation.x = Math.PI / 2;
    tavan.position.y = TAVAN;
    sahne.add(tavan);

    for (var i = -2; i <= 2; i++) {
      var bant = new T.Mesh(new T.BoxGeometry(0.34, 0.06, SINIR.z * 1.85), lambaMat);
      bant.position.set(i * 5.4, TAVAN - 0.14, 0);
      sahne.add(bant);
      var l = new T.PointLight('#FFD9A0', 0, 17, 2);
      l.position.set(i * 5.4, TAVAN - 0.55, -1.5);
      sahne.add(l);
      noktaIsiklari.push(l);
    }

    // Giriş
    var kapi = new T.Mesh(new T.BoxGeometry(4.6, 0.24, 0.3),
      new T.MeshStandardMaterial({ color: '#0F8F8B', roughness: 0.5, metalness: 0.3 }));
    kapi.position.set(0, 2.5, SINIR.z - 0.16);
    sahne.add(kapi);

    var hali = new T.Mesh(new T.PlaneGeometry(4.4, 2.2),
      new T.MeshStandardMaterial({ color: '#0F8F8B', roughness: 0.95 }));
    hali.rotation.x = -Math.PI / 2;
    hali.position.set(0, 0.006, SINIR.z - 1.5);
    hali.receiveShadow = true;
    sahne.add(hali);

    var arka = new T.Mesh(new T.PlaneGeometry(9, 1.4),
      new T.MeshStandardMaterial({ map: tabelaDoku('Bereket Market'), roughness: 0.8 }));
    arka.position.set(0, 2.6, -SINIR.z + 0.06);
    sahne.add(arka);

    RAFLAR.forEach(function (r) {
      if (r.tip === 'gondol') gondolKur(r);
      else if (r.tip === 'dolap') dolapKur(r);
      else if (r.tip === 'manav') manavKur(r);
      else if (r.tip === 'stand') standKur(r);
      else if (r.tip === 'kasa') kasaKur(r);
    });

    engeller.push({ x0: -99, x1: 99, z0: SINIR.z - 0.3, z1: 99 });
    engeller.push({ x0: -99, x1: 99, z0: -99, z1: -SINIR.z + 0.3 });
    engeller.push({ x0: -99, x1: -SINIR.x + 0.3, z0: -99, z1: 99 });
    engeller.push({ x0: SINIR.x - 0.3, x1: 99, z0: -99, z1: 99 });
  }

  function gondolKur(r) {
    var g = new T.Group();
    var yuk = 2.05;

    var sirt = new T.Mesh(new T.BoxGeometry(0.10, yuk, r.uzun), sirtMat);
    sirt.position.y = yuk / 2;
    sirt.castShadow = true; sirt.receiveShadow = true;
    g.add(sirt);
    bloklar.push(sirt);

    var taban = new T.Mesh(new T.BoxGeometry(r.en, 0.16, r.uzun), rafMat);
    taban.position.y = 0.08;
    taban.castShadow = true; taban.receiveShadow = true;
    g.add(taban);

    GONDOL_KATLAR.forEach(function (y) {
      [-1, 1].forEach(function (s) {
        var tahta = new T.Mesh(new T.BoxGeometry(r.en / 2 - 0.05, 0.035, r.uzun), rafMat);
        tahta.position.set(s * (r.en / 4 + 0.025), y, 0);
        tahta.castShadow = true; tahta.receiveShadow = true;
        g.add(tahta);
        var bar = new T.Mesh(new T.BoxGeometry(0.022, 0.05, r.uzun), iskeletMat);
        bar.position.set(s * (r.en / 2 - 0.03), y + 0.04, 0);
        g.add(bar);
      });
    });

    // Uç kapaklar — koridor posteriyle
    var posterKatlar = [];
    if (r.yuz.eksi) posterKatlar.push(r.yuz.eksi);
    if (r.yuz.arti) posterKatlar.push(r.yuz.arti);
    var posterMat = new T.MeshStandardMaterial({
      map: ucPosterDoku(r.koridor, posterKatlar), roughness: 0.74
    });
    [-1, 1].forEach(function (s) {
      var uc = new T.Mesh(new T.BoxGeometry(r.en, yuk, 0.06), rafMat);
      uc.position.set(0, yuk / 2, s * (r.uzun / 2 + 0.03));
      uc.castShadow = true; uc.receiveShadow = true;
      g.add(uc);
      bloklar.push(uc);

      var poster = new T.Mesh(new T.PlaneGeometry(1.12, 1.66), posterMat);
      poster.position.set(0, 1.15, s * (r.uzun / 2 + 0.065));
      poster.rotation.y = s > 0 ? 0 : Math.PI;
      g.add(poster);
    });

    [['eksi', -1], ['arti', 1]].forEach(function (par) {
      var kat = r.yuz[par[0]];
      if (!kat) return;
      var tab = new T.Mesh(new T.PlaneGeometry(3.4, 0.5),
        new T.MeshStandardMaterial({ map: tabelaDoku(KATEGORI[kat].ad), roughness: 0.7 }));
      tab.position.set(par[1] * (r.en / 2 + 0.03), 2.34, 0);
      tab.rotation.y = par[1] * Math.PI / 2;
      g.add(tab);
    });
    var cerceve = new T.Mesh(new T.BoxGeometry(r.en, 0.62, 3.5), iskeletMat);
    cerceve.position.y = 2.34;
    g.add(cerceve);

    g.position.set(r.x, 0, r.z);
    sahne.add(g);
    engelEkle(r.x, r.z, r.en + 0.3, r.uzun + 0.35);
  }

  // Önü açık soğutucu dolap: arka + tavan + taban + yanlar + cam kapak
  function dolapKur(r) {
    var g = new T.Group();
    var yuk = 2.15;
    var kasaMat = new T.MeshStandardMaterial({ color: '#C6CFD2', roughness: 0.35, metalness: 0.5 });

    var arka = new T.Mesh(new T.BoxGeometry(0.08, yuk, r.uzun), kasaMat);
    arka.position.set(r.en / 2 - 0.04, yuk / 2, 0);
    arka.castShadow = true; arka.receiveShadow = true;
    g.add(arka);
    bloklar.push(arka);

    var ust = new T.Mesh(new T.BoxGeometry(r.en, 0.1, r.uzun), kasaMat);
    ust.position.set(0, yuk - 0.05, 0);
    ust.castShadow = true; ust.receiveShadow = true;
    g.add(ust);

    var alt = new T.Mesh(new T.BoxGeometry(r.en, 0.16, r.uzun), kasaMat);
    alt.position.set(0, 0.08, 0);
    alt.castShadow = true; alt.receiveShadow = true;
    g.add(alt);

    [-1, 1].forEach(function (s) {
      var yan = new T.Mesh(new T.BoxGeometry(r.en, yuk, 0.08), kasaMat);
      yan.position.set(0, yuk / 2, s * (r.uzun / 2 - 0.04));
      yan.castShadow = true; yan.receiveShadow = true;
      g.add(yan);
      bloklar.push(yan);
    });

    DOLAP_KATLAR.forEach(function (y) {
      var tahta = new T.Mesh(new T.BoxGeometry(r.en * 0.82, 0.035, r.uzun - 0.18), rafMat);
      tahta.position.set(r.en * 0.06, y, 0);
      tahta.castShadow = true; tahta.receiveShadow = true;
      g.add(tahta);
    });

    // Cam kapak — saydam, ışıltılı
    var kapak = new T.Mesh(new T.PlaneGeometry(r.uzun - 0.2, yuk - 0.3),
      new T.MeshStandardMaterial({
        color: '#CFE9F2', roughness: 0.06, metalness: 0.1,
        transparent: true, opacity: 0.16, side: T.DoubleSide
      }));
    kapak.rotation.y = -Math.PI / 2;
    kapak.position.set(-r.en / 2 + 0.02, yuk / 2 - 0.05, 0);
    g.add(kapak);

    [-1, 0, 1].forEach(function (s) {
      var direk = new T.Mesh(new T.BoxGeometry(0.06, yuk - 0.2, 0.07), iskeletMat);
      direk.position.set(-r.en / 2 + 0.03, yuk / 2, s * (r.uzun / 3.1));
      g.add(direk);
    });

    var tab = new T.Mesh(new T.PlaneGeometry(3.6, 0.5),
      new T.MeshStandardMaterial({ map: tabelaDoku('Süt Ürünleri'), roughness: 0.7 }));
    tab.position.set(-r.en / 2 - 0.02, 2.45, 0);
    tab.rotation.y = -Math.PI / 2;
    g.add(tab);

    g.position.set(r.x, 0, r.z);
    sahne.add(g);
    engelEkle(r.x, r.z, r.en + 0.3, r.uzun + 0.2);
  }

  var manavKasalari = [];
  function manavKur(r) {
    var g = new T.Group();
    var tahtaMat = new T.MeshStandardMaterial({ color: '#9C6B3E', roughness: 0.85 });

    [-1, 1].forEach(function (sx) {
      [-1, 1].forEach(function (sz) {
        var kx = sx * 0.78, kz = sz * 1.0;
        var kasa = new T.Group();
        var taban = new T.Mesh(new T.BoxGeometry(1.4, 0.06, 1.8), tahtaMat);
        taban.position.y = 0.62;
        taban.castShadow = true; taban.receiveShadow = true;
        kasa.add(taban);
        [[0.7, 0, 0.05, 1.8], [-0.7, 0, 0.05, 1.8], [0, 0.9, 1.4, 0.05], [0, -0.9, 1.4, 0.05]].forEach(function (k) {
          var yan = new T.Mesh(new T.BoxGeometry(k[2], 0.20, k[3]), tahtaMat);
          yan.position.set(k[0], 0.74, k[1]);
          yan.castShadow = true; yan.receiveShadow = true;
          kasa.add(yan);
        });
        var ayak = new T.Mesh(new T.BoxGeometry(1.28, 0.6, 1.68), iskeletMat);
        ayak.position.y = 0.3;
        ayak.castShadow = true;
        kasa.add(ayak);
        kasa.position.set(kx, 0, kz);
        g.add(kasa);
        manavKasalari.push({ x: r.x + kx, z: r.z + kz, y: 0.655 });
        engelEkle(r.x + kx, r.z + kz, 1.5, 1.9);
      });
    });

    var tab = new T.Mesh(new T.PlaneGeometry(3.0, 0.5),
      new T.MeshStandardMaterial({ map: tabelaDoku('Manav'), roughness: 0.7, side: T.DoubleSide }));
    tab.position.set(0.9, 2.55, 0);
    tab.rotation.y = Math.PI / 2;
    g.add(tab);
    [-1.4, 1.4].forEach(function (dz) {
      var rod = new T.Mesh(new T.CylinderGeometry(0.02, 0.02, TAVAN - 2.55, 8), iskeletMat);
      rod.position.set(0.9, 2.55 + (TAVAN - 2.55) / 2, dz);
      g.add(rod);
    });

    g.position.set(r.x, 0, r.z);
    sahne.add(g);
  }

  var standKatlari = [];
  function standKur(r) {
    var g = new T.Group();
    var kirmizi = new T.MeshStandardMaterial({ color: '#C0392B', roughness: 0.55 });
    [{ y: 0.42, en: 2.2 }, { y: 0.82, en: 1.7 }, { y: 1.22, en: 1.2 }].forEach(function (k) {
      var kut = new T.Mesh(new T.BoxGeometry(k.en, 0.06, k.en), rafMat);
      kut.position.y = k.y;
      kut.castShadow = true; kut.receiveShadow = true;
      g.add(kut);
      var govdeM = new T.Mesh(new T.BoxGeometry(k.en - 0.12, k.y, k.en - 0.12), kirmizi);
      govdeM.position.y = k.y / 2;
      govdeM.castShadow = true; govdeM.receiveShadow = true;
      g.add(govdeM);
      bloklar.push(govdeM);
      standKatlari.push({ y: k.y + 0.03, en: k.en - 0.42 });
    });

    var direk = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 1.5, 12), iskeletMat);
    direk.position.y = 1.95;
    g.add(direk);
    var levhaMat = new T.MeshStandardMaterial({ map: tabelaDoku('Kampanya'), roughness: 0.7, side: T.DoubleSide });
    var lv = new T.Mesh(new T.PlaneGeometry(1.9, 0.52), levhaMat);
    lv.position.y = 2.52;
    g.add(lv);
    var lv2 = lv.clone();
    lv2.rotation.y = Math.PI / 2;
    g.add(lv2);

    g.position.set(r.x, 0, r.z);
    sahne.add(g);
    engelEkle(r.x, r.z, 2.5, 2.5);
  }

  function kasaKur(r) {
    var g = new T.Group();
    for (var i = 0; i < 2; i++) {
      var kx = i * 2.6 - 1.3;
      var tez = new T.Mesh(new T.BoxGeometry(1.0, 0.95, 3.4),
        new T.MeshStandardMaterial({ color: '#E4E8E5', roughness: 0.5 }));
      tez.position.set(kx, 0.475, 0);
      tez.castShadow = true; tez.receiveShadow = true;
      g.add(tez);
      bloklar.push(tez);

      var yuzey = new T.Mesh(new T.BoxGeometry(0.9, 0.03, 3.2),
        new T.MeshStandardMaterial({ color: '#2C3436', roughness: 0.7 }));
      yuzey.position.set(kx, 0.97, 0);
      g.add(yuzey);

      var direk = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.45, 10), iskeletMat);
      direk.position.set(kx + 0.3, 1.18, -1.2);
      g.add(direk);
      var ekran = new T.Mesh(new T.BoxGeometry(0.06, 0.3, 0.42),
        new T.MeshStandardMaterial({ color: '#0F8F8B', emissive: '#0F8F8B', emissiveIntensity: 0.5, roughness: 0.4 }));
      ekran.position.set(kx + 0.3, 1.52, -1.2);
      g.add(ekran);

      var no = new T.Mesh(new T.PlaneGeometry(0.8, 0.36),
        new T.MeshStandardMaterial({ map: tabelaDoku('Kasa ' + (i + 1)), roughness: 0.7, side: T.DoubleSide }));
      no.position.set(kx, 2.25, 0);
      g.add(no);
      var asma = new T.Mesh(new T.CylinderGeometry(0.015, 0.015, TAVAN - 2.4, 6), iskeletMat);
      asma.position.set(kx, 2.4 + (TAVAN - 2.4) / 2, 0);
      g.add(asma);

      engelEkle(r.x + kx, r.z, 1.3, 3.6);
    }
    g.position.set(r.x, 0, r.z);
    sahne.add(g);
  }

  /* ---------- ürün yerleşimi (instanced) ---------- */

  var yerlesimler = {};

  function yerlesimEkle(p, x, y, z, rot) {
    if (!yerlesimler[p.id]) yerlesimler[p.id] = [];
    yerlesimler[p.id].push({ x: x, y: y, z: z, rot: rot });
  }

  function katDagit(urunler, katSayi) {
    var out = [];
    for (var i = 0; i < katSayi; i++) out.push([]);
    urunler.forEach(function (p, i) { out[i % katSayi].push(p); });
    for (var k = 0; k < katSayi; k++) if (!out[k].length) out[k] = urunler.slice(0, 1);
    return out;
  }

  // yon: -1 ürünler -x yönüne bakar, +1 ise +x
  function rafDoldur(kat, katYlist, x, z, uzun, yon, ofset) {
    var urunler = URUNLER.filter(function (p) { return p.kat === kat; });
    if (!urunler.length) return;
    var kats = katDagit(urunler, katYlist.length);
    var run = uzun - 0.5;
    var z0 = z - run / 2;

    kats.forEach(function (liste, ki) {
      var y = katYlist[ki];
      var ortEn = 0;
      liste.forEach(function (p) { ortEn += govde(p).en + 0.045; });
      ortEn /= liste.length;
      var yuz = kis(Math.round(run / (liste.length * ortEn)), 2, 7);

      var imlec = z0, idx = 0, sayac = 0, koruma = 0;
      while (imlec < z0 + run - 0.05 && koruma++ < 400) {
        var p = liste[idx % liste.length];
        var g = govde(p);
        var adim = g.en + 0.045;
        if (imlec + adim > z0 + run) break;
        var px = x + yon * ofset;
        var rot = yon > 0 ? Math.PI / 2 : -Math.PI / 2;
        yerlesimEkle(p, px, y, imlec + adim / 2, rot);
        if (g.derin < 0.15) {
          yerlesimEkle(p, px + yon * (g.derin + 0.03), y, imlec + adim / 2, rot);
        }
        imlec += adim;
        sayac++;
        if (sayac % yuz === 0) { idx++; imlec += 0.05; }
      }
    });
  }

  function urunleriYerlestir() {
    RAFLAR.forEach(function (r) {
      if (r.tip === 'gondol') {
        if (r.yuz.eksi) rafDoldur(r.yuz.eksi, GONDOL_KATLAR, r.x, r.z, r.uzun, -1, r.en / 2 - 0.26);
        if (r.yuz.arti) rafDoldur(r.yuz.arti, GONDOL_KATLAR, r.x, r.z, r.uzun, +1, r.en / 2 - 0.26);
      } else if (r.tip === 'dolap') {
        rafDoldur(r.yuz.eksi, DOLAP_KATLAR, r.x, r.z, r.uzun - 0.2, -1, 0.14);
      }
    });

    var manav = URUNLER.filter(function (p) { return p.kat === 'manav'; });
    manavKasalari.forEach(function (kasa, i) {
      var p = manav[i % manav.length];
      var g = govde(p);
      var adimX = g.en + 0.022, adimZ = g.derin + 0.022;
      var nx = Math.max(2, Math.floor(1.22 / adimX));
      var nz = Math.max(2, Math.floor(1.62 / adimZ));
      for (var a = 0; a < nx; a++) {
        for (var b = 0; b < nz; b++) {
          yerlesimEkle(p,
            kasa.x + (a - (nx - 1) / 2) * adimX + rastArasi(-0.007, 0.007),
            kasa.y,
            kasa.z + (b - (nz - 1) / 2) * adimZ + rastArasi(-0.007, 0.007),
            rastArasi(0, 6.28));
        }
      }
    });

    var kamp = URUNLER.filter(function (p) { return p.kat === 'kampanya'; });
    var standR = RAFLAR.filter(function (r) { return r.tip === 'stand'; })[0];
    standKatlari.forEach(function (k, ki) {
      var p = kamp[ki % kamp.length];
      var g = govde(p);
      var adimX = g.en + 0.03, adimZ = g.derin + 0.03;
      var nx = Math.min(9, Math.max(2, Math.floor(k.en / adimX)));
      var nz = Math.min(5, Math.max(2, Math.floor(k.en / adimZ)));
      for (var a = 0; a < nx; a++) {
        for (var b = 0; b < nz; b++) {
          yerlesimEkle(p,
            standR.x + (a - (nx - 1) / 2) * adimX,
            k.y,
            standR.z + (b - (nz - 1) / 2) * adimZ,
            0);
        }
      }
    });

    var m4 = new T.Matrix4(), q = new T.Quaternion(), e = new T.Euler(),
        s = new T.Vector3(1, 1, 1), v = new T.Vector3();

    URUNLER.forEach(function (p) {
      var yer = yerlesimler[p.id];
      if (!yer || !yer.length) return;
      toplamNesne += yer.length;
      govde(p).parcalar.forEach(function (par) {
        var im = new T.InstancedMesh(par.geo, par.mat, yer.length);
        im.castShadow = true;
        im.receiveShadow = false;
        im.userData.urun = p;
        yer.forEach(function (y, i) {
          e.set(0, y.rot, 0);
          q.setFromEuler(e);
          v.set(y.x, y.y, y.z);
          m4.compose(v, q, s);
          im.setMatrixAt(i, m4);
        });
        im.instanceMatrix.needsUpdate = true;
        im.computeBoundingSphere();
        sahne.add(im);
        secilebilir.push(im);
      });
    });
  }

  /* ---------- imleçler ---------- */

  function imleclerKur() {
    zeminHalka = new T.Mesh(new T.RingGeometry(0.20, 0.28, 40),
      new T.MeshBasicMaterial({ color: '#0F8F8B', transparent: true, opacity: 0.5, depthWrite: false }));
    zeminHalka.rotation.x = -Math.PI / 2;
    zeminHalka.position.y = 0.012;
    zeminHalka.visible = false;
    zeminHalka.renderOrder = 3;
    sahne.add(zeminHalka);

    var hedefMat = new T.MeshBasicMaterial({ color: '#0F8F8B', transparent: true, opacity: 0.92, depthWrite: false });
    hedefHalka = new T.Group();
    var dis = new T.Mesh(new T.RingGeometry(0.30, 0.36, 44), hedefMat);
    var ic = new T.Mesh(new T.CircleGeometry(0.085, 24), hedefMat);
    dis.rotation.x = -Math.PI / 2;
    ic.rotation.x = -Math.PI / 2;
    hedefHalka.add(dis, ic);
    hedefHalka.position.y = 0.014;
    hedefHalka.visible = false;
    hedefHalka.renderOrder = 3;
    sahne.add(hedefHalka);

    vurguKutu = new T.LineSegments(
      new T.EdgesGeometry(new T.BoxGeometry(1, 1, 1)),
      new T.LineBasicMaterial({ color: '#0F8F8B', transparent: true, opacity: 0.95, depthTest: false }));
    vurguKutu.visible = false;
    vurguKutu.renderOrder = 6;
    sahne.add(vurguKutu);
  }

  /* ------------------------------------------------------------------ *
   *  Gezinme                                                            *
   * ------------------------------------------------------------------ */

  var oyuncu = new T.Vector3(0, GOZ, 10.4);
  var hedef = null;
  var sapma = 0, egim = -0.03;
  var tuslar = {};
  var YARICAP = 0.42, HIZ = 3.3;
  var takildi = 0;

  function engelCoz(pos) {
    for (var i = 0; i < engeller.length; i++) {
      var e = engeller[i];
      var x0 = e.x0 - YARICAP, x1 = e.x1 + YARICAP, z0 = e.z0 - YARICAP, z1 = e.z1 + YARICAP;
      if (pos.x > x0 && pos.x < x1 && pos.z > z0 && pos.z < z1) {
        var dSol = pos.x - x0, dSag = x1 - pos.x, dOn = pos.z - z0, dArka = z1 - pos.z;
        var m = Math.min(dSol, dSag, dOn, dArka);
        if (m === dSol) pos.x = x0;
        else if (m === dSag) pos.x = x1;
        else if (m === dOn) pos.z = z0;
        else pos.z = z1;
      }
    }
    pos.x = kis(pos.x, -SINIR.x + 0.5, SINIR.x - 0.5);
    pos.z = kis(pos.z, -SINIR.z + 0.5, SINIR.z - 0.5);
  }

  function yurunebilir(x, z) {
    for (var i = 0; i < engeller.length; i++) {
      var e = engeller[i];
      if (x > e.x0 - 0.18 && x < e.x1 + 0.18 && z > e.z0 - 0.18 && z < e.z1 + 0.18) return false;
    }
    return Math.abs(x) < SINIR.x - 0.45 && Math.abs(z) < SINIR.z - 0.45;
  }

  function hedefBelirle(x, z) {
    if (!yurunebilir(x, z)) {
      var bulundu = null;
      for (var rr = 0.5; rr <= 3.6 && !bulundu; rr += 0.35) {
        var enYakin = 1e9;
        for (var a = 0; a < 28; a++) {
          var ax = x + Math.cos(a / 28 * 6.283) * rr;
          var az = z + Math.sin(a / 28 * 6.283) * rr;
          if (!yurunebilir(ax, az)) continue;
          var d = (ax - oyuncu.x) * (ax - oyuncu.x) + (az - oyuncu.z) * (az - oyuncu.z);
          if (d < enYakin) { enYakin = d; bulundu = { x: ax, z: az }; }
        }
      }
      if (!bulundu) return;
      x = bulundu.x; z = bulundu.z;
    }
    hedef = new T.Vector2(x, z);
    hedefHalka.position.set(x, 0.014, z);
    hedefHalka.visible = true;
    takildi = 0;
  }

  function gezinmeGuncelle(dt, zaman) {
    var ilerledi = false;
    var yon = new T.Vector2(0, 0);
    if (tuslar.w) yon.y -= 1;
    if (tuslar.s) yon.y += 1;
    if (tuslar.a) yon.x -= 1;
    if (tuslar.d) yon.x += 1;

    if (yon.lengthSq() > 0) {
      hedef = null;
      hedefHalka.visible = false;
      yon.normalize();
      var sn = Math.sin(sapma), cs = Math.cos(sapma);
      oyuncu.x += (yon.x * cs - yon.y * sn) * HIZ * dt;
      oyuncu.z += (yon.x * sn + yon.y * cs) * HIZ * dt;
      ilerledi = true;
      engelCoz(oyuncu);
    } else if (hedef) {
      var fx = hedef.x - oyuncu.x, fz = hedef.y - oyuncu.z;
      var uz = Math.hypot(fx, fz);
      if (uz < 0.24) {
        hedef = null;
        hedefHalka.visible = false;
      } else {
        var adim = Math.min(HIZ * dt, uz);
        var onceX = oyuncu.x, onceZ = oyuncu.z;
        oyuncu.x += fx / uz * adim;
        oyuncu.z += fz / uz * adim;
        engelCoz(oyuncu);
        var gercek = Math.hypot(oyuncu.x - onceX, oyuncu.z - onceZ);
        ilerledi = gercek > 0.0005;
        takildi = gercek < adim * 0.3 ? takildi + dt : 0;
        if (takildi > 0.6) { hedef = null; hedefHalka.visible = false; }
      }
    }

    kamera.position.set(
      oyuncu.x,
      GOZ + Math.sin(zaman / 260) * (ilerledi ? 0.015 : 0.002),
      oyuncu.z
    );
    kamera.rotation.y = sapma;
    kamera.rotation.x = egim;
    return ilerledi;
  }

  /* ------------------------------------------------------------------ *
   *  Girdi                                                              *
   * ------------------------------------------------------------------ */

  var isinlayici = new T.Raycaster();
  var fare = new T.Vector2(0, 0);
  var fareVar = false;
  var basildi = false, suruklu = false, basX = 0, basY = 0, hareket = 0, isaretciId = null;
  var vurguUrun = null;

  function girdiKur() {
    var el = ciz.domElement;

    el.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType === 'mouse' && ev.button !== 0) return;
      basildi = true; suruklu = false; hareket = 0;
      basX = ev.clientX; basY = ev.clientY;
      isaretciId = ev.pointerId;
      try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      sahneEl.classList.add('tutuluyor');
      fare.x = (ev.clientX / window.innerWidth) * 2 - 1;
      fare.y = -(ev.clientY / window.innerHeight) * 2 + 1;
      fareVar = true;
    });

    el.addEventListener('pointermove', function (ev) {
      fare.x = (ev.clientX / window.innerWidth) * 2 - 1;
      fare.y = -(ev.clientY / window.innerHeight) * 2 + 1;
      fareVar = true;
      if (!basildi || ev.pointerId !== isaretciId) return;
      var dx = ev.clientX - basX, dy = ev.clientY - basY;
      hareket += Math.abs(dx) + Math.abs(dy);
      if (hareket > 8) suruklu = true;
      if (suruklu) {
        sapma -= dx * 0.0042;
        egim = kis(egim - dy * 0.0036, -0.95, 0.62);
      }
      basX = ev.clientX; basY = ev.clientY;
    });

    el.addEventListener('pointerup', function (ev) {
      if (!basildi) return;
      basildi = false;
      sahneEl.classList.remove('tutuluyor');
      try { el.releasePointerCapture(ev.pointerId); } catch (e) {}
      if (suruklu) return;
      fare.x = (ev.clientX / window.innerWidth) * 2 - 1;
      fare.y = -(ev.clientY / window.innerHeight) * 2 + 1;
      tikla();
    });

    el.addEventListener('pointercancel', function () {
      basildi = false;
      sahneEl.classList.remove('tutuluyor');
    });
    el.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    var tusHarita = { w:'w', s:'s', a:'a', d:'d', arrowup:'w', arrowdown:'s', arrowleft:'a', arrowright:'d' };
    window.addEventListener('keydown', function (e) {
      var k = e.key.toLowerCase();
      if (k === 'escape') { panelKapat(); sepetKapat(); return; }
      if (tusHarita[k]) { tuslar[tusHarita[k]] = true; e.preventDefault(); }
    });
    window.addEventListener('keyup', function (e) {
      var k = e.key.toLowerCase();
      if (tusHarita[k]) tuslar[tusHarita[k]] = false;
    });
    window.addEventListener('blur', function () { tuslar = {}; });
  }

  // Kamera yakınındaki instanced meshleri süz — ışın testini hafiflet.
  var yakinListe = [];
  function yakinlar() {
    yakinListe.length = 0;
    for (var i = 0; i < secilebilir.length; i++) {
      var im = secilebilir[i];
      var bs = im.boundingSphere;
      if (!bs) { yakinListe.push(im); continue; }
      if (bs.center.distanceTo(kamera.position) - bs.radius < 9) yakinListe.push(im);
    }
    return yakinListe;
  }

  function urunIsini() {
    isinlayici.setFromCamera(fare, kamera);
    var vurus = isinlayici.intersectObjects(yakinlar(), false);
    if (!vurus.length || vurus[0].distance > 7.5) return null;
    // Arada bir raf sırtı veya duvar varsa seçme
    var blok = isinlayici.intersectObjects(bloklar, false);
    if (blok.length && blok[0].distance < vurus[0].distance - 0.02) return null;
    return vurus[0];
  }

  function tikla() {
    var u = urunIsini();
    if (u) { urunAc(u.object.userData.urun); return; }
    var zVurus = isinlayici.intersectObject(zeminMesh, false);
    if (zVurus.length) {
      hedefBelirle(zVurus[0].point.x, zVurus[0].point.z);
      panelKapat();
    }
  }

  var kutuHesap = new T.Box3(), m4Gecici = new T.Matrix4(),
      boyutGecici = new T.Vector3(), merkezGecici = new T.Vector3(), yansit = new T.Vector3();

  function vurguGuncelle() {
    if (!fareVar || panelAcikMi) { vurguGizle(); zeminHalka.visible = false; return; }
    var u = urunIsini();
    if (u) {
      var p = u.object.userData.urun;
      vurguUrun = p;
      u.object.getMatrixAt(u.instanceId, m4Gecici);
      m4Gecici.premultiply(u.object.matrixWorld);
      var g = govde(p), pad = 0.022;
      kutuHesap.min.set(-g.en / 2 - pad, -pad, -g.derin / 2 - pad);
      kutuHesap.max.set(g.en / 2 + pad, g.boy + pad, g.derin / 2 + pad);
      kutuHesap.applyMatrix4(m4Gecici);
      kutuHesap.getSize(boyutGecici);
      kutuHesap.getCenter(merkezGecici);
      vurguKutu.position.copy(merkezGecici);
      vurguKutu.scale.set(
        Math.max(boyutGecici.x, 0.03),
        Math.max(boyutGecici.y, 0.03),
        Math.max(boyutGecici.z, 0.03));
      vurguKutu.visible = true;
      zeminHalka.visible = false;
      sahneEl.classList.add('urun');
      nisanEl.classList.add('aktif');
      havaEtiketGoster(p);
      return;
    }
    vurguGizle();

    var zVurus = isinlayici.intersectObject(zeminMesh, false);
    if (zVurus.length && zVurus[0].distance < 26 && yurunebilir(zVurus[0].point.x, zVurus[0].point.z)) {
      zeminHalka.position.set(zVurus[0].point.x, 0.012, zVurus[0].point.z);
      zeminHalka.visible = true;
    } else {
      zeminHalka.visible = false;
    }
  }

  function vurguGizle() {
    vurguUrun = null;
    vurguKutu.visible = false;
    sahneEl.classList.remove('urun');
    if (nisanEl) nisanEl.classList.remove('aktif');
    if (havaEl) havaEl.classList.remove('gorunur');
  }

  function havaEtiketGoster(p) {
    kutuHesap.getCenter(merkezGecici);
    yansit.set(merkezGecici.x, kutuHesap.max.y, merkezGecici.z).project(kamera);
    var sx = (yansit.x * 0.5 + 0.5) * window.innerWidth;
    var sy = (-yansit.y * 0.5 + 0.5) * window.innerHeight;
    havaEl.style.transform = 'translate(' + sx.toFixed(1) + 'px,' + sy.toFixed(1) + 'px)';
    if (havaAd.textContent !== p.ad) {
      havaAd.textContent = p.ad;
      havaFiyat.textContent = para(p.fiyat);
    }
    havaEl.classList.add('gorunur');
  }

  /* ------------------------------------------------------------------ *
   *  Ürün paneli + döner 3B görünüm                                     *
   * ------------------------------------------------------------------ */

  var panelEl, nisanEl, havaEl, havaAd, havaFiyat, reyonAdEl;
  var pCiz, pSahne, pKamera, pKok, pOtoDon = true, pSapma = 0.6, pEgim = 0.16;
  var panelAcikMi = false, aktifUrun = null;

  function panelKur() {
    var tv = document.getElementById('urunTuval');
    pCiz = new T.WebGLRenderer({ antialias: true, alpha: true, canvas: tv });
    pCiz.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    pCiz.toneMapping = T.ACESFilmicToneMapping;
    pCiz.toneMappingExposure = 1.12;

    pSahne = new T.Scene();
    pKamera = new T.PerspectiveCamera(34, 1, 0.01, 14);
    pKamera.position.set(0, 0, 3.3);

    pSahne.add(new T.HemisphereLight('#FFFFFF', '#6E7A76', 1.6));
    var a1 = new T.DirectionalLight('#FFFFFF', 2.5); a1.position.set(2, 3.4, 3); pSahne.add(a1);
    var a2 = new T.DirectionalLight('#BFD8E8', 1.2); a2.position.set(-3, 1.4, -2); pSahne.add(a2);
    var a3 = new T.DirectionalLight('#FFE7C2', 0.8); a3.position.set(0, -2, 1.5); pSahne.add(a3);

    pKok = new T.Group();
    pSahne.add(pKok);

    var basli = false, oX = 0, oY = 0;
    tv.addEventListener('pointerdown', function (ev) {
      basli = true; oX = ev.clientX; oY = ev.clientY;
      try { tv.setPointerCapture(ev.pointerId); } catch (e) {}
      tv.classList.add('tutuluyor');
      pOtoDon = false;
      document.getElementById('donduruc').setAttribute('aria-pressed', 'false');
    });
    tv.addEventListener('pointermove', function (ev) {
      if (!basli) return;
      pSapma += (ev.clientX - oX) * 0.011;
      pEgim = kis(pEgim - (ev.clientY - oY) * 0.009, -0.9, 1.0);
      oX = ev.clientX; oY = ev.clientY;
    });
    function birak(ev) {
      basli = false;
      tv.classList.remove('tutuluyor');
      try { tv.releasePointerCapture(ev.pointerId); } catch (e) {}
    }
    tv.addEventListener('pointerup', birak);
    tv.addEventListener('pointercancel', birak);

    document.getElementById('donduruc').addEventListener('click', function () {
      pOtoDon = !pOtoDon;
      this.setAttribute('aria-pressed', pOtoDon ? 'true' : 'false');
    });
    document.getElementById('sifirla').addEventListener('click', function () {
      pSapma = 0.6; pEgim = 0.16; pOtoDon = true;
      document.getElementById('donduruc').setAttribute('aria-pressed', 'true');
    });
  }

  function urunAc(p) {
    if (!p) return;
    aktifUrun = p;
    panelAcikMi = true;
    panelEl.classList.add('acik');
    document.body.classList.add('panel-acik');
    sepetKapat();
    vurguGizle();

    document.getElementById('pMarka').textContent = p.marka + ' · ' + KATEGORI[p.kat].ad;
    document.getElementById('pAd').textContent = p.ad;
    document.getElementById('pAciklama').textContent = p.aciklama;
    document.getElementById('pFiyat').textContent = para(p.fiyat);
    document.getElementById('pBirim').textContent = '';
    var b1 = document.createElement('span'); b1.textContent = p.gram;
    var b2 = document.createElement('span'); b2.textContent = p.birim;
    var br = document.createElement('br');
    var pb = document.getElementById('pBirim');
    pb.appendChild(b1); pb.appendChild(br); pb.appendChild(b2);

    var oz = document.getElementById('pOzellik');
    oz.textContent = '';
    [['Menşe', p.mense], ['Raf ömrü', p.raf], ['Reyon', KATEGORI[p.kat].ad], ['Stok', 'Rafta var']]
      .forEach(function (satir) {
        var li = document.createElement('li');
        var k = document.createElement('span'); k.className = 'k'; k.textContent = satir[0];
        var d = document.createElement('span'); d.className = 'd'; d.textContent = satir[1];
        li.appendChild(k); li.appendChild(d);
        oz.appendChild(li);
      });

    var btn = document.getElementById('ekleDugme');
    btn.classList.remove('eklendi');
    btn.lastChild.nodeValue = ' Sepete ekle';

    while (pKok.children.length) pKok.remove(pKok.children[0]);
    var grup = urunGrubu(p);
    var o = grup.userData.olcu;
    var buyukKenar = Math.max(o.en, o.boy, o.derin);
    var olcek = 1 / buyukKenar;
    grup.scale.setScalar(olcek);
    grup.position.y = -o.boy * olcek / 2;
    pKok.add(grup);

    pSapma = 0.6; pEgim = 0.16;
    panelBoyutla();
  }

  function panelKapat() {
    if (!panelAcikMi) return;
    panelAcikMi = false;
    aktifUrun = null;
    panelEl.classList.remove('acik');
    document.body.classList.remove('panel-acik');
  }

  function panelBoyutla() {
    var tv = document.getElementById('urunTuval');
    var w = tv.clientWidth || 320, h = tv.clientHeight || 260;
    pCiz.setSize(w, h, false);
    pKamera.aspect = w / h;
    pKamera.updateProjectionMatrix();
  }

  /* ------------------------------------------------------------------ *
   *  Sepet                                                              *
   * ------------------------------------------------------------------ */

  var sepet = [], sepetAcikMi = false;

  function sepeteEkle(p) {
    var v = null;
    sepet.forEach(function (s) { if (s.id === p.id) v = s; });
    if (v) v.adet++; else sepet.push({ id: p.id, adet: 1 });
    sepetCiz();
  }

  function sepetToplam() {
    return sepet.reduce(function (t, s) { return t + URUN_INDEKS[s.id].fiyat * s.adet; }, 0);
  }

  function sepetCiz() {
    var adet = sepet.reduce(function (t, s) { return t + s.adet; }, 0);
    document.getElementById('sepetSayi').textContent = adet;
    document.getElementById('sepetTutar').textContent = para(sepetToplam());
    document.getElementById('sepetToplamBuyuk').textContent = para(sepetToplam());

    var liste = document.getElementById('sepetListe');
    liste.textContent = '';
    if (!sepet.length) {
      var bos = document.createElement('li');
      bos.className = 'sepet-bos';
      bos.textContent = 'Sepetin henüz boş. Rafta bir ürüne tıkla.';
      liste.appendChild(bos);
      return;
    }
    sepet.forEach(function (s) {
      var p = URUN_INDEKS[s.id];
      var li = document.createElement('li');
      var ad = document.createElement('span');
      ad.className = 'sad';
      ad.textContent = p.ad;
      var alt = document.createElement('small');
      alt.textContent = s.adet + ' × ' + para(p.fiyat);
      ad.appendChild(alt);
      var fiy = document.createElement('span');
      fiy.className = 'sfiy';
      fiy.textContent = para(p.fiyat * s.adet);
      var sil = document.createElement('button');
      sil.className = 'ssil';
      sil.type = 'button';
      sil.textContent = '✕';
      sil.setAttribute('aria-label', p.ad + ' ürününü sepetten çıkar');
      sil.addEventListener('click', function () {
        sepet = sepet.filter(function (x) { return x.id !== s.id; });
        sepetCiz();
      });
      li.appendChild(ad); li.appendChild(fiy); li.appendChild(sil);
      liste.appendChild(li);
    });
  }

  function sepetKapat() {
    sepetAcikMi = false;
    document.getElementById('sepetPanel').classList.remove('acik');
    document.getElementById('sepetDugme').setAttribute('aria-expanded', 'false');
  }

  /* ------------------------------------------------------------------ *
   *  Mağaza planı                                                       *
   * ------------------------------------------------------------------ */

  var haritaEl, haritaCtx, haritaOlcek, haritaKenar = 10;

  function haritaKur() {
    haritaEl = document.getElementById('haritatuval');
    haritaCtx = haritaEl.getContext('2d');
    haritaOlcek = (haritaEl.width - haritaKenar * 2) / (SINIR.x * 2);
    haritaEl.addEventListener('click', function (ev) {
      var r = haritaEl.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width * haritaEl.width;
      var py = (ev.clientY - r.top) / r.height * haritaEl.height;
      hedefBelirle(
        (px - haritaKenar) / haritaOlcek - SINIR.x,
        (py - haritaKenar) / haritaOlcek - SINIR.z);
      panelKapat();
    });
  }

  function hEkran(x, z) {
    return {
      x: haritaKenar + (x + SINIR.x) * haritaOlcek,
      y: haritaKenar + (z + SINIR.z) * haritaOlcek
    };
  }

  function kutuCiz(ctx, x, y, w, h, r) {
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); return; }
    ctx.beginPath(); ctx.rect(x, y, w, h);
  }

  function haritaCiz() {
    if (!haritaCtx) return;
    var c = haritaCtx;
    c.clearRect(0, 0, haritaEl.width, haritaEl.height);

    var a = hEkran(-SINIR.x, -SINIR.z), b = hEkran(SINIR.x, SINIR.z);
    c.fillStyle = koyuMu ? '#0E1817' : '#E7EBE8';
    c.strokeStyle = koyuMu ? 'rgba(230,237,234,.22)' : 'rgba(12,21,19,.18)';
    c.lineWidth = 2;
    kutuCiz(c, a.x, a.y, b.x - a.x, b.y - a.y, 6);
    c.fill(); c.stroke();

    var g1 = hEkran(-2.2, SINIR.z), g2 = hEkran(2.2, SINIR.z);
    c.strokeStyle = koyuMu ? '#3FD3C6' : '#0F8F8B';
    c.lineWidth = 4;
    c.beginPath(); c.moveTo(g1.x, g1.y); c.lineTo(g2.x, g2.y); c.stroke();

    RAFLAR.forEach(function (r) {
      var enX, enZ, renk;
      if (r.tip === 'gondol') { enX = r.en; enZ = r.uzun; renk = KATEGORI[r.yuz.eksi].renk; }
      else if (r.tip === 'dolap') { enX = r.en; enZ = r.uzun; renk = KATEGORI.sut.renk; }
      else if (r.tip === 'manav') { enX = r.en; enZ = r.uzun; renk = KATEGORI.manav.renk; }
      else if (r.tip === 'stand') { enX = 2.5; enZ = 2.5; renk = KATEGORI.kampanya.renk; }
      else { enX = r.uzun; enZ = r.en * 3.3; renk = koyuMu ? '#59635F' : '#9BA6A2'; }

      var p1 = hEkran(r.x - enX / 2, r.z - enZ / 2);
      var p2 = hEkran(r.x + enX / 2, r.z + enZ / 2);
      c.globalAlpha = koyuMu ? 0.6 : 0.75;
      c.fillStyle = renk;
      kutuCiz(c, p1.x, p1.y, p2.x - p1.x, p2.y - p1.y, 3);
      c.fill();

      if (r.tip === 'gondol' && r.yuz.arti) {
        var orta = hEkran(r.x, 0).x;
        c.fillStyle = KATEGORI[r.yuz.arti].renk;
        kutuCiz(c, orta, p1.y, p2.x - orta, p2.y - p1.y, 3);
        c.fill();
      }
      c.globalAlpha = 1;
    });

    if (hedef) {
      var h = hEkran(hedef.x, hedef.y);
      c.strokeStyle = koyuMu ? '#3FD3C6' : '#0F8F8B';
      c.lineWidth = 2;
      c.beginPath(); c.arc(h.x, h.y, 7, 0, 6.283); c.stroke();
      c.fillStyle = koyuMu ? '#3FD3C6' : '#0F8F8B';
      c.beginPath(); c.arc(h.x, h.y, 2.4, 0, 6.283); c.fill();
    }

    var o = hEkran(oyuncu.x, oyuncu.z);
    c.save();
    c.translate(o.x, o.y);
    c.rotate(-(sapma + Math.PI / 2));
    var koni = c.createRadialGradient(0, 0, 2, 0, 0, 48);
    koni.addColorStop(0, koyuMu ? 'rgba(63,211,198,.55)' : 'rgba(15,143,139,.45)');
    koni.addColorStop(1, 'rgba(15,143,139,0)');
    c.fillStyle = koni;
    c.beginPath();
    c.moveTo(0, 0);
    c.arc(0, 0, 48, -0.56, 0.56);
    c.closePath();
    c.fill();
    c.restore();

    c.beginPath();
    c.arc(o.x, o.y, 5, 0, 6.283);
    c.fillStyle = koyuMu ? '#3FD3C6' : '#0F8F8B';
    c.fill();
    c.lineWidth = 2;
    c.strokeStyle = koyuMu ? '#0A100F' : '#FFFFFF';
    c.stroke();
  }

  /* ------------------------------------------------------------------ *
   *  Bulunduğun reyon                                                   *
   * ------------------------------------------------------------------ */

  var sonReyon = '';

  function parcayaUzak(px, pz, x0, z0, x1, z1) {
    var dx = x1 - x0, dz = z1 - z0;
    var uz = dx * dx + dz * dz;
    var t = uz ? kis(((px - x0) * dx + (pz - z0) * dz) / uz, 0, 1) : 0;
    return Math.hypot(px - (x0 + t * dx), pz - (z0 + t * dz));
  }

  function reyonGuncelle() {
    var enIyi = null, enYakin = 4.4;
    if (oyuncu.z > 9.6) enIyi = 'Giriş';
    if (!enIyi) RAFLAR.forEach(function (r) {
      if (r.tip === 'gondol') {
        [['eksi', -1], ['arti', 1]].forEach(function (par) {
          var kat = r.yuz[par[0]];
          if (!kat) return;
          var x = r.x + par[1] * (r.en / 2 + 1.1);
          var d = parcayaUzak(oyuncu.x, oyuncu.z, x, r.z - r.uzun / 2, x, r.z + r.uzun / 2);
          if (d < enYakin) { enYakin = d; enIyi = KATEGORI[kat].ad; }
        });
      } else if (r.tip === 'dolap') {
        var dx = r.x - (r.en / 2 + 1.2);
        var d2 = parcayaUzak(oyuncu.x, oyuncu.z, dx, r.z - r.uzun / 2, dx, r.z + r.uzun / 2);
        if (d2 < enYakin) { enYakin = d2; enIyi = KATEGORI.sut.ad; }
      } else if (r.tip === 'manav') {
        var d3 = Math.hypot(oyuncu.x - (r.x + 2.4), oyuncu.z - r.z);
        if (d3 < enYakin) { enYakin = d3; enIyi = KATEGORI.manav.ad; }
      } else if (r.tip === 'stand') {
        var d4 = Math.hypot(oyuncu.x - r.x, oyuncu.z - r.z) - 1.4;
        if (d4 < enYakin) { enYakin = d4; enIyi = KATEGORI.kampanya.ad; }
      } else if (r.tip === 'kasa') {
        var d5 = Math.hypot(oyuncu.x - r.x, oyuncu.z - r.z) - 2.2;
        if (d5 < enYakin) { enYakin = d5; enIyi = 'Kasalar'; }
      }
    });
    if (!enIyi) enIyi = oyuncu.z > 6.5 ? 'Giriş' : 'Orta koridor';
    if (enIyi !== sonReyon) {
      sonReyon = enIyi;
      reyonAdEl.textContent = enIyi;
    }
  }

  /* ------------------------------------------------------------------ *
   *  Döngü                                                              *
   * ------------------------------------------------------------------ */

  var sonZaman = 0, kare = 0, ipucuGizli = false, gezinti = 0;

  function boyutla() {
    ciz.setSize(window.innerWidth, window.innerHeight, false);
    kamera.aspect = window.innerWidth / window.innerHeight;
    kamera.updateProjectionMatrix();
    if (pCiz) panelBoyutla();
  }

  function dongu(zaman) {
    requestAnimationFrame(dongu);
    var dt = Math.min((zaman - sonZaman) / 1000 || 0, 0.05);
    sonZaman = zaman;
    kare++;

    if (gezinmeGuncelle(dt, zaman)) {
      gezinti += dt;
      if (!ipucuGizli && gezinti > 7) {
        ipucuGizli = true;
        document.getElementById('ipuclari').classList.add('sonuk');
      }
    }

    if (kare % 3 === 0) vurguGuncelle();
    else if (vurguUrun) havaEtiketGoster(vurguUrun);

    if (hedefHalka.visible) {
      var n = 1 + Math.sin(zaman / 220) * 0.08;
      hedefHalka.scale.set(n, 1, n);
    }

    reyonGuncelle();
    if (kare % 3 === 1) haritaCiz();

    ciz.render(sahne, kamera);

    if (panelAcikMi) {
      if (pOtoDon) pSapma += dt * 0.55;
      pKok.rotation.y = pSapma;
      pKok.rotation.x = pEgim * 0.35;
      pCiz.render(pSahne, pKamera);
    }
  }

  /* ------------------------------------------------------------------ *
   *  Arayüz                                                             *
   * ------------------------------------------------------------------ */

  function arayuzKur() {
    panelEl = document.getElementById('panel');
    nisanEl = document.getElementById('nisan');
    havaEl = document.getElementById('havaetiket');
    havaAd = havaEl.querySelector('.ad');
    havaFiyat = havaEl.querySelector('.fiy');
    reyonAdEl = document.getElementById('reyonAd');

    document.getElementById('panelKapat').addEventListener('click', panelKapat);

    document.getElementById('ekleDugme').addEventListener('click', function () {
      if (!aktifUrun) return;
      sepeteEkle(aktifUrun);
      this.classList.add('eklendi');
      this.lastChild.nodeValue = ' Sepete eklendi';
    });

    document.getElementById('raftaGor').addEventListener('click', function () {
      if (!aktifUrun) return;
      var yer = yerlesimler[aktifUrun.id];
      if (!yer || !yer.length) return;
      var enIyi = yer[0], enYakin = 1e9;
      yer.forEach(function (y) {
        var d = (y.x - oyuncu.x) * (y.x - oyuncu.x) + (y.z - oyuncu.z) * (y.z - oyuncu.z);
        if (d < enYakin) { enYakin = d; enIyi = y; }
      });
      var yon = oyuncu.x > enIyi.x ? 1 : -1;
      var hx = enIyi.x + yon * 1.15, hz = enIyi.z;
      if (!yurunebilir(hx, hz)) { hx = enIyi.x - yon * 1.15; }
      hedefBelirle(hx, hz);
      sapma = Math.atan2(enIyi.x - hx, enIyi.z - hz) + Math.PI;
      panelKapat();
    });

    document.getElementById('sepetDugme').addEventListener('click', function () {
      sepetAcikMi = !sepetAcikMi;
      document.getElementById('sepetPanel').classList.toggle('acik', sepetAcikMi);
      this.setAttribute('aria-expanded', sepetAcikMi ? 'true' : 'false');
      if (sepetAcikMi) panelKapat();
    });

    document.getElementById('temaDugme').addEventListener('click', function () {
      document.documentElement.setAttribute('data-theme', temaKoyuMu() ? 'light' : 'dark');
      paletUygula();
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (!document.documentElement.getAttribute('data-theme')) paletUygula();
    });

    window.addEventListener('resize', boyutla);
    sepetCiz();
  }

  /* ------------------------------------------------------------------ *
   *  Açılış                                                             *
   * ------------------------------------------------------------------ */

  function durum(metin) {
    var el = document.getElementById('girisDurum');
    if (el) el.textContent = metin;
  }

  function baslat() {
    document.getElementById('istUrun').textContent = URUNLER.length;
    document.getElementById('istReyon').textContent = Object.keys(KATEGORI).length;

    var yaziHazir = Promise.resolve();
    if (document.fonts && document.fonts.load) {
      yaziHazir = Promise.all([
        document.fonts.load('400 40px "Archivo Black"'),
        document.fonts.load('600 40px "IBM Plex Sans"'),
        document.fonts.load('500 40px "IBM Plex Mono"')
      ]).catch(function () {});
    }

    yaziHazir.then(function () {
      durum('Raflar diziliyor…');
      return new Promise(function (r) { setTimeout(r, 40); });
    }).then(function () {
      sahneKur();
      arayuzKur();
      panelKur();
      haritaKur();
      girdiKur();
      haritaCiz();
      durum('Hazır · rafta ' + toplamNesne.toLocaleString('tr-TR') + ' ürün');
      var btn = document.getElementById('girisDugme');
      btn.disabled = false;
      btn.addEventListener('click', function () {
        document.getElementById('giris').classList.add('gizli');
        hedefBelirle(0, 6.4);
      });
      requestAnimationFrame(dongu);
    })['catch'](function (hata) {
      durum('Sahne kurulamadı');
      if (window.console) console.error(hata);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', baslat);
  else baslat();
})();
