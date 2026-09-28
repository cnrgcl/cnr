import { Composition } from "remotion";
import { SeferiTanitim } from "./SeferiTanitim";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="SeferiTanitim"
    component={SeferiTanitim}
    durationInFrames={360}
    fps={30}
    width={1080}
    height={1920}
  />
);
