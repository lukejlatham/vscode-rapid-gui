import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";
import { ImageProps, imageSchema } from "../../types";
import { ImageSettings } from "./Settings/ImageSettings";
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
  container: {
    display: "flex",
    position: "relative",
    width: "100%",
    height: "auto",
  },
  placeholderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    zIndex: 1,
    pointerEvents: "none", // Ensures the overlay is non-interactive
  },
  image: {
    width: "100%",
    height: "auto",
  },
});

export const Image: UserComponent<ImageProps> = (props) => {
  const validatedProps = imageSchema.parse(props);
  const { src, alt, width } = validatedProps;

  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const styles = useStyles();
  const select = useSelected();

  const isPlaceholder = src.includes("placehold.co");

  return (
    <div
      ref={(ref: HTMLImageElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={styles.container}
      style={{ width: `${width}%` }}
    >
      <img
        src={src}
        alt={alt}
        className={`${styles.image} ${selected ? select.select : ""}`}
      />
      {isPlaceholder && <span className={styles.placeholderOverlay}>{alt}</span>}
    </div>
  );
};

export const ImageDefaultProps: ImageProps = {
  src: "https://placehold.co/400",
  alt: "New image",
  width: 40,
};

Image.craft = {
  displayName: "Image",
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};
