import React, { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { Label as FLabel, Input, RadioGroup, Radio, makeStyles } from "@fluentui/react-components";

interface LabelProps {
  text: string;
  fontSize: number;
  color: string;
  userEditable?: boolean;
  width: number;
  height: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
}

interface ContentEditableEvent {
  target: { value: string };
}

const useStyles = makeStyles({
  labelContainer: {
    cursor: "pointer",
  },
  labelContent: {
    margin: 0,
  },
  alignLeft: {
    textAlign: "left",
  },
  alignCenter: {
    textAlign: "center",
  },
  alignRight: {
    textAlign: "right",
  },
  alignJustify: {
    textAlign: "justify",
  },
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '5px',
  },
  numberInput: {
    width: "100%",
  },
  colorInput: {
    width: "100%",
    borderRadius: "4px",
    height: "35px",
  },
  textInput: {
    width: "100%",
  },
});

export const Label: UserComponent<LabelProps> = ({ text, fontSize, color, textAlign, userEditable = true, height, width }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
    dragged: node.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }
    if (userEditable) {
      setEditable(false);
    }
  }, [selected, userEditable]);

  const classes = useStyles();

  return (
    <div
      ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
      className={classes.labelContainer}
      onClick={() => selected && userEditable && setEditable(true)}
    >
      {userEditable ? (
        <ContentEditable
          html={text}
          disabled={!editable}
          onChange={(e: ContentEditableEvent) =>
            setProp(
              (props: LabelProps) =>
                (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
              500
            )
          }
          tagName="p"
          className={`${classes.labelContent} ${
            textAlign === 'left' ? classes.alignLeft :
            textAlign === 'center' ? classes.alignCenter :
            textAlign === 'right' ? classes.alignRight :
            classes.alignJustify}`}
          style={{ fontSize: `${fontSize}px`, color: color }}
        />
      ) : (
        <p
          className={`${classes.labelContent} ${
            textAlign === 'left' ? classes.alignLeft :
            textAlign === 'center' ? classes.alignCenter :
            textAlign === 'right' ? classes.alignRight :
            classes.alignJustify}`}
          style={{ fontSize: `${fontSize}px`, color: color }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

const LabelSettings: React.FC = () => {
  const {
    actions: { setProp },
    fontSize,
    color,
    text,
    textAlign,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
    text: node.data.props.text,
    textAlign: node.data.props.textAlign,
  }));

  const classes = useStyles();

  return (
    <div className={classes.settingsContainer}>
      <FLabel>
        Font Size
        <Input
          className={classes.numberInput}
          type="number"
          value={fontSize.toString()} // Convert the number to a string
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: LabelProps) => (props.fontSize = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </FLabel>
      <FLabel>
        Color
        <input
          className={classes.colorInput}
          type="color"
          defaultValue={color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: LabelProps) => props.color = e.target.value)} />
      </FLabel>
      <FLabel>
        Text
        <Input
          className={classes.textInput}
          type="text"
          defaultValue={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: LabelProps) => (props.text = e.target.value), 1000);
          }}
        />
      </FLabel>
      <FLabel>
        Alignment
        <RadioGroup
          defaultValue={textAlign}
          layout="horizontal-stacked"
          onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
            setProp((props: LabelProps) => (props.textAlign = data.value as 'left' | 'center' | 'right' | 'justify'), 1000);
          }}
        >
          <Radio value="left" label="Left" />
          <Radio value="center" label="Center" />
          <Radio value="right" label="Right" />
          <Radio value="justify" label="Justify" />
        </RadioGroup>
      </FLabel>
    </div>
  );
};

export const LabelDefaultProps: LabelProps = {
  text: "New Label",
  textAlign: 'left',
  fontSize: 20,
  color: "#FFFFF",
  userEditable: true,
  width: 100,
  height: 100,
};

(Label as any).craft = {
  props: LabelDefaultProps,
  related: {
    settings: LabelSettings,
  },
};
