import React, { useState, useEffect } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { Label as FLabel, Input } from "@fluentui/react-components";

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
    text
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
    text: node.data.props.text,
  }));

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', padding: '5px'}}>
      <FLabel>
                Font Size
                <Input
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
                    style={{ width: "100%", borderRadius: "4px", height: "35px"}}
                    type="color"
                    defaultValue={color}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: LabelProps) => props.color = e.target.value)} />
            </FLabel>
            <FLabel>
            Text
            <Input
                type="text"
                defaultValue={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setProp((props: LabelProps) => (props.text = e.target.value), 1000);
                }}
            />
            </FLabel>
    </div>
  );
};

export const LabelDefaultProps: LabelProps = {
  text: "New Label",
  fontSize: 20,
  color: "#FFFFF",
  userEditable: true,
};

Label.craft = {
  props: LabelDefaultProps,
  related: {
    settings: LabelSettings,
  },
};