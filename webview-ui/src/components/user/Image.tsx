import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { ImageProps } from "../../../../types";
import { ImageSettings } from "./Settings/ImageSettings";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  justifyLeft: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyRight: {
    justifyContent: "flex-end",
  },
});

export const Image: UserComponent<ImageProps> = ({ src, alt, width, height, alignment }) => {
  const { connectors: { connect, drag } } = useNode();

  const styles = useStyles();

  return (
    <div ref={(ref: HTMLImageElement | null) => {
      if (ref) {
          connect(drag(ref));
      }
  }}className={`${styles.container} ${alignment === "left" ? styles.justifyLeft : alignment === "center" ? styles.justifyCenter : styles.justifyRight}`}>
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
  width: 100,
  height: 100,
  alignment: "center",
};

Image.craft = {
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};