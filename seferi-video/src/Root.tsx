import { Composition, Folder } from "remotion";
import { SeferiTanitim } from "./SeferiTanitim";
import { POI_VIDEO_FRAMES, PoiVideo } from "./PoiVideo";
import { POIS, poiId } from "./poi-data";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="SeferiTanitim"
      component={SeferiTanitim}
      durationInFrames={360}
      fps={30}
      width={1080}
      height={1920}
    />
    <Folder name="Noktalar">
      {POIS.map((poi) => (
        <Composition
          key={poi.no}
          id={poiId(poi)}
          component={PoiVideo}
          defaultProps={{ poi }}
          durationInFrames={POI_VIDEO_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
    </Folder>
  </>
);
