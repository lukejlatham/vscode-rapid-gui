import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles, Spinner, tokens } from "@fluentui/react-components";
import { ImageProps, imageSchema } from "../../types";
import { ImageSettings } from "./Settings/ImageSettings";
import { useSelected } from "../../hooks/useSelected";
import ImageGenerationLoader from "../SketchUpload/imageGenerationLoader";

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
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: tokens.colorNeutralForeground1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Image: UserComponent<ImageProps> = (props) => {
  const validatedProps = imageSchema.parse(props);
  const { src, alt, width, isLoading } = validatedProps;

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
      className={`${styles.container} ${selected ? select.select : ""}`}
      style={{ width: `${width}%` }}
    >
      {isLoading && (
        <div className={styles.spinner}>
          <ImageGenerationLoader size={54}/>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${styles.image}`}
      />
      {isPlaceholder && <span className={styles.placeholderOverlay}>{alt}</span>}
    </div>
  );
};

export const ImageDefaultProps: ImageProps = {
  src: "https://placehold.co/400",
  alt: "New image",
  width: 40,
  isLoading: false,
};

Image.craft = {
  displayName: "Image",
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};
