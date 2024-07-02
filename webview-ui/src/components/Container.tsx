// Container.tsx
import React from 'react';
import { useNode } from '@craftjs/core';

interface ContainerProps {
  padding?: number;
  background?: string;
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  const { connectors: { drag } } = useNode();
  return (
    <div ref={(ref: HTMLDivElement | null) => ref && drag(ref)} {...props}>
      {children}
    </div>
  );
};
