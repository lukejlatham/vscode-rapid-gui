import React from 'react';
import { useNode } from '@craftjs/core';

interface TextProps {
  text: string;
}

export const Text: React.FC<TextProps> = ({ text }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={ref => ref && connect(drag(ref))}>
      {text}
    </div>
  );
};