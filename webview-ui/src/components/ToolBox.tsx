import React, { useEffect, useRef } from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

export const Toolbox: React.FC = () => {
  const { connectors: { create } } = useEditor();

  const textRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (textRef.current) {
      create(textRef.current, <Text text="New Text" />);
    }
    if (buttonRef.current) {
      create(buttonRef.current, <Button text="New Button" />);
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
