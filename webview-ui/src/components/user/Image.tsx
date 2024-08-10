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
  }} className={`${styles.container} ${selected ? select.select : ""} `}>
      <img
        src={src}
        alt={alt}
        style={{ width: `${width}%`, height: `auto` }}
      />
     </div>
  );
};

export const ImageDefaultProps: ImageProps = {
  src: "https://media.licdn.com/dms/image/C4E03AQFsOf9FqrVmPQ/profile-displayphoto-shrink_200_200/0/1642540398251?e=2147483647&v=beta&t=gVupFwbqLjIjBGMGLZ8o-Iyy6432u1VJbYRI_mxUziQ",
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