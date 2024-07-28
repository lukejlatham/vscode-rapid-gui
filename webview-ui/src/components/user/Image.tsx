import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { Input, Label, Radio, RadioGroup, makeStyles, mergeClasses, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData, useId, tokens, Tooltip, } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";


interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  alignment: "left" | "center" | "right";
}

type TooltipConfig = {
  label: string;
  content: string;
  propKey: keyof ImageProps;
  type: 'color' | 'spinButton' | 'text' | 'alignment';
};

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
  spinButton: {
    width: "95%",
  },
  textInput: {
    width: "100%",
  },
  visible: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
  label: {
    display: "flex",
    flexDirection: "row",
    columnGap: tokens.spacingVerticalS,
  },
});

export const Image: UserComponent<ImageProps> = ({ src, alt, width, height, alignment }) => {
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const styles = useStyles();

  return (
    <div className={`${styles.container} ${alignment === "left" ? styles.justifyLeft : alignment === "center" ? styles.justifyCenter : styles.justifyRight}`}>
      <img
        ref={(ref) => ref && connect(drag(ref))}
        src={src}
        alt={alt}
        style={{ width: `${width}%`, height: `${height}%` }}
      />
    </div>
  );
};

const ImageSettings: React.FC = () => {
  const { actions: { setProp }, props } = useNode(node => ({
    props: node.data.props as ImageProps
  }));

  const styles = useStyles();
  const contentId = useId('content');
  const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);

  const tooltips: TooltipConfig[] = [
    { label: 'Source', content: 'Provide the URL source of the image you want displayed.', propKey: 'src', type: 'text' },
    { label: 'Alt', content: 'Specify the alternative text for an image, if a user cannot view it.', propKey: 'alt', type: 'text' },
    { label: 'Width', content: 'Set how wide the image is.', propKey: 'width', type: 'spinButton' },
    { label: 'Height', content: 'Set how tall the image is.', propKey: 'height', type: 'spinButton' },
    { label: 'Alignment', content: 'Set how you want the image to be aligned.', propKey: 'alignment', type: 'alignment' },
  ];

  const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
    setVisibleTooltip(isVisible ? tooltipKey : null);
  };

  return (
    <div className={styles.settingsContainer}>
      {tooltips.map((tooltip, index) => (
        <div key={index}>
          <div aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined} className={styles.label}>
            <Label>
              {tooltip.label}
            </Label>
            <Tooltip
              content={{
                children: tooltip.content,
                id: contentId,
              }}
              positioning="above-start"
              withArrow
              relationship="label"
              onVisibleChange={(e, data) => handleVisibilityChange(tooltip.propKey, data.visible)}
            >
              <Info16Regular
                tabIndex={0}
                className={mergeClasses(visibleTooltip === tooltip.propKey && styles.visible)}
              />
            </Tooltip>
          </div>
          {tooltip.type === "text" ? (
            <Input
              className={styles.textInput}
              type="text"
              defaultValue={props[tooltip.propKey] as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProp((props: ImageProps) => {
                  (props[tooltip.propKey] as string) = e.target.value;
                }, 1000);
              }}
            />
          ) : tooltip.type === "spinButton" ? (<SpinButton
            className={styles.spinButton}
            defaultValue={props[tooltip.propKey] as number}
            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
              const value = data.value ? data.value : 0;
              setProp((props: ImageProps) => {
                (props[tooltip.propKey] as number) = value;
              }, 1000);
            }}
          />
          ) : tooltip.type === "alignment" && (
            <RadioGroup
              defaultValue={props[tooltip.propKey] as string}
              layout="horizontal-stacked"
              onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                setProp((props: ImageProps) => {
                  (props[tooltip.propKey] as 'left' | 'center' | 'right') = data.value as 'left' | 'center' | 'right';
                }, 1000);
              }}
            >
              <Radio key="left" label="Left" value="left" />
              <Radio key="center" label="Center" value="center" />
              <Radio key="right" label="Right" value="right" />
            </RadioGroup>
          )}
        </div>
      ))}
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

(Image as any).craft = {
  props: ImageDefaultProps,
  related: {
    settings: ImageSettings,
  },
};
