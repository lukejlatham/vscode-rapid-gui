import React, { useState, useEffect, HTMLAttributes } from 'react';
import { useNode } from "@craftjs/core";
import { Slider, FormControl, FormLabel } from '@material-ui/core';
import '@material-ui/core/styles';
import ContentEditable from 'react-contenteditable';

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  fontSize: string;
  textAlign: string;
  craft?: any;
}

export const Text: React.FC<TextProps> & { craft?: any } = ({ text, fontSize, textAlign, ...props }) => {
  const { 
    connectors: { connect, drag },
    selected,
    actions: { setProp },
   } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [editableText, setEditableText] = useState(false);

  useEffect(() => {
    if (!selected) { 
      setEditableText(false);
    }
  }, [selected]);

  return (
    <div
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      onClick={() => selected && setEditableText(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editableText}
        onChange={(e) => 
          setProp((props: any) => {
            return { ...props, text: e.target.value.replace(/<\/?[^>]+(>|$)/g, '') };
          })
        }
        style={{ fontSize: `${fontSize}px`, textAlign: textAlign }}
      />
    </div>
  );
};

interface TextSettingsProps {
  fontSize: string;
  textAlign: string;
}

export const TextSettings: React.FC<TextSettingsProps> = ({ fontSize, textAlign }) => {
  const { actions: { setProp } } = useNode();

  return (
    <div>
      <FormControl>
        <FormLabel>Font Size</FormLabel>
        <Slider
          value={parseInt(fontSize)}
          onChange={(_, value) => setProp((props: any) => props.fontSize = `${value}px`)}
          min={8}
          max={100}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Text Align</FormLabel>
        <select
          value={textAlign}
          onChange={(e) => setProp((props: any) => props.textAlign = e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </FormControl>
    </div>
  );
};

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 20,
  textAlign: "left",
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};