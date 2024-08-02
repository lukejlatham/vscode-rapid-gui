import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { ImageProps, imageSchema } from "../../../../types";
import { ImageSettings } from "./Settings/ImageSettings";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

export const Image: UserComponent<ImageProps> = (props) => {
  const validatedProps = imageSchema.parse(props);
  const { src, alt, width, height } = validatedProps;
  
  const { connectors: { connect, drag } } = useNode();

  const styles = useStyles();

  return (
    <div ref={(ref: HTMLImageElement | null) => {
      if (ref) {
          connect(drag(ref));
      }
  }} className={styles.container}>
      <img
        src={src}
        alt={alt}
        style={{ width: `${width}%`, height: `${height}%` }}
      />
     </div>
  );
};

export const ImageDefaultProps: ImageProps = {
  src: "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
  alt: "New image",
  width: 80,
  height: 80,
};

Image.craft = {
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};