// Toolbox.tsx
import React, { useEffect, useRef } from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Text } from './Text';
import { Button } from './Button';
import { Container } from './Container';

export const Toolbox: React.FC = () => {
  const { connectors: { create } } = useEditor();

  const textRef = React.useRef<HTMLButtonElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const containerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (textRef.current) {
      create(textRef.current, <Element canvas is={Text} text="New Text" />);
    }
    if (buttonRef.current) {
      create(buttonRef.current, <Element canvas is={Button} text="New Button" />);
    }
    if (containerRef.current) {
      create(containerRef.current, <Element canvas is={Container} padding={20} background="#f0f0f0" />);
    }
  }, [create]);

  return (
    <div>
      <button ref={textRef}>
        Add Text
      </button>
      <button ref={buttonRef}>
        Add Button
      </button>
      <button ref={containerRef}>
        Add Container
      </button>
    </div>
  );
};
