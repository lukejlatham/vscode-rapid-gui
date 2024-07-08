import React, { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";

interface LabelProps {
  text: string;
  fontSize: number;
  color: string;
  userEditable?: boolean;
}

interface ContentEditableEvent {
  target: { value: string };
}

export const Label: UserComponent<LabelProps> = ({ text, fontSize, color, userEditable = true }) => {
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

  const style = {
    fontSize: `${fontSize}px`,
    color: color,
  };

  return (
    <div
      ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
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
          style={style}
        />
      ) : (
        <p style={style}>{text}</p>
      )}
    </div>
  );
};

const LabelSettings: React.FC = () => {
  const {
    actions: { setProp },
    fontSize,
    color,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
  }));

  return (
    <div>
      <label>
        Font size
        <input
          type="range"
          defaultValue={fontSize}
          step={1}
          min={1}
          max={50}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: LabelProps) => (props.fontSize = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </label>
      <label>
        Color
        <input
          type="color"
          defaultValue={color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: LabelProps) => (props.color = e.target.value), 1000);
          }}
        />
      </label>
    </div>
  );
};

export const LabelDefaultProps: LabelProps = {
  text: "Hi",
  fontSize: 20,
  color: "#000000", // Black
  userEditable: true,
};

Label.craft = {
  props: LabelDefaultProps,
  related: {
    settings: LabelSettings,
  },
};