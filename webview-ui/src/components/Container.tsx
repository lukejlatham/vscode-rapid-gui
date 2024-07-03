import React from 'react';
import { useNode } from '@craftjs/core';

interface ContainerProps {
  padding?: number;
  background?: string;
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={ref => ref && connect(drag(ref))} {...props}>
      {children}
    </div>
  );
};
