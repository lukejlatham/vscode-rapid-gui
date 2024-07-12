import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { Input, Label, Radio, RadioGroup } from "@fluentui/react-components";


interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const Image: UserComponent<ImageProps> = ({ src, alt, width, height }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  return (
    <img
      ref={(ref) => ref && connect(drag(ref))}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

const ImageSettings: React.FC = () => {
  const {
    actions: { setProp },
    src,
    alt,
    width,
    height,
  } = useNode((node) => ({
    src: node.data.props.src,
    alt: node.data.props.alt,
    width: node.data.props.width,
    height: node.data.props.height,
  }));

  return (
    <>
      <Label>
        Source
        <Input
          type="text"
          defaultValue={src}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: ImageProps) => (props.src = e.target.value), 1000);
          }}
        />
      </Label>
      <Label>
        Alt
        <Input
          type="text"
          defaultValue={alt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: ImageProps) => (props.alt = e.target.value), 1000);
          }}
        />
      </Label>
      <Label>
      Width
        <Input
          type="number"
          defaultValue={width}
          min="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: ImageProps) => (props.width = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </Label>
      <Label>
        Height
        <Input
          type="number"
          defaultValue={height}
          min="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: ImageProps) => (props.height = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </Label>
    </>
  );
};

export const ImageDefaultProps: ImageProps = {
  src: "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
  alt: "New image",
  width: 480,
  height: 320,
};

(Image as any).craft = {
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};
