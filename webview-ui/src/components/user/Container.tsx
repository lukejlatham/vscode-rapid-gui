import React, { FC, ReactNode } from 'react';
import { Card } from '@fluentui/react-components';
import { useNode } from "@craftjs/core";

interface ContainerProps {
  background?: string;
  padding?: number;
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ background, padding = 0, children }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <Card ref={(ref: HTMLDivElement | null) => {
      if (ref) {
        connect(drag(ref));
      }
    }} style={{ margin: "5px 0", background, padding: `${padding}px` }}>
      {children}
    </Card>
  );
};

export default Container;
