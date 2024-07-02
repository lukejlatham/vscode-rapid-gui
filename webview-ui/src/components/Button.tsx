// Button.tsx
import React from 'react';
import { useNode } from '@craftjs/core';

interface ButtonProps {
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ text }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <button ref={ref => ref && connect(drag(ref))}>
      {text}
    </button>
  );
};
