import React from "react";
import { useNode } from "@craftjs/core";

interface TextProps {
  text: string;
  fontSize: string;
}

export const Text: React.FC<TextProps> = ({ text, fontSize }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref: HTMLDivElement | null) => {
      if (ref) {
        connect(drag(ref));
      }
    }}>
      <p style={{ fontSize }}>{text}</p>
    </div>
  );
};
