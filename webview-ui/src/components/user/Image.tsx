import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { Input, Label, Radio, RadioGroup, makeStyles, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData } from "@fluentui/react-components";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  alignment: "left" | "center" | "right";
}

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
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '5px',
  },
  textInput: {
    width: "100%",
  },
  spinButton: {
    width: "95%",
  }
});

export const Image: UserComponent<ImageProps> = ({ src, alt, width, height, alignment }) => {
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const classes = useStyles();

  return (
    <div className={`${classes.container} ${alignment === "left" ? classes.justifyLeft : alignment === "center" ? classes.justifyCenter : classes.justifyRight}`}>
      <img
        ref={(ref) => ref && connect(drag(ref))}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
};

const ImageSettings: React.FC = () => {
  const { actions: { setProp }, props } = useNode(node => ({
    props: node.data.props as ImageProps
  }));

  const classes = useStyles();

  return (
    <div className={classes.settingsContainer}>
      <Label>
        Source
        <Input
          className={classes.textInput}
          type="text"
          defaultValue={props.src}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: ImageProps) => (props.src = e.target.value), 1000);
          }}
        />
      </Label>
      <Label>
        Alt
        <Input
          className={classes.textInput}
          type="text"
          defaultValue={props.alt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: ImageProps) => (props.alt = e.target.value), 1000);
          }}
        />
      </Label>
      <Label>
        Width
        <SpinButton
          className={classes.spinButton}
          min={1}
          max={500}
          step={5}
          defaultValue={props.width}
          onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
            const width = data.value ? data.value : 0;
            setProp((props: ImageProps) => props.width = width, 1000);
          }}
        />
      </Label>
      <Label>
        Height
        <SpinButton
          className={classes.spinButton}
          min={1}
          max={500}
          step={5}
          defaultValue={props.height}
          onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
            const height = data.value ? data.value : 0;
            setProp((props: ImageProps) => props.height = height, 1000);
          }}
        />
      </Label>
      <Label>
        Alignment
        <RadioGroup
          defaultValue={props.alignment}
          layout="horizontal-stacked"
          onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
            setProp((props: ImageProps) => (props.alignment = data.value as 'left' | 'center' | 'right'), 1000);
          }}
        >
          <Radio key="left" label="Left" value="left" />
          <Radio key="center" label="Center" value="center" />
          <Radio key="right" label="Right" value="right" />
        </RadioGroup>
      </Label>
    </div>
  );
};

export const ImageDefaultProps: ImageProps = {
  src: "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
  alt: "New image",
  width: 480,
  height: 320,
  alignment: "center",
};

(Image as any).craft = {
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};
