import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { ImageProps, imageSchema } from "../../types";
import { ImageSettings } from "./Settings/ImageSettings";
import { useSelected } from "../../hooks/useSelected";


const useStyles = makeStyles({
  container: {
    display: "flex",
    borderBox: "box-sizing",
  },
});

export const Image: UserComponent<ImageProps> = (props) => {
  const validatedProps = imageSchema.parse(props);
  const { src, alt, width, height } = validatedProps;
  
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
}));

  const styles = useStyles();
  const select = useSelected();

  return (
    <div ref={(ref: HTMLImageElement | null) => {
      if (ref) {
          connect(drag(ref));
      }
  }}>
      <img
        src={src}
        alt={alt}
        style={{ width: `${width}%`, height: `auto` }}
        className={`${styles.container} ${selected ? select.select : ""} `}
      />
     </div>
  );
};

export const ImageDefaultProps: ImageProps = {
  src: "https://media.licdn.com/dms/image/D4E03AQEiKLsSnfBkYA/profile-displayphoto-shrink_200_200/0/1698861415552?e=2147483647&v=beta&t=bHAs4bdRoFftlVT0m-Lmv5iqZYKwyZCDesXRwwbdu48",
  alt: "New image",
  width: 40,
  height: 0,
};

Image.craft = {
  displayName: "Image",
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};