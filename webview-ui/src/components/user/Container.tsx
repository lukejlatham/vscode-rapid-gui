import { useNode } from "@craftjs/core";
import React, { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  [key: string]: any;
}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div className="" {...props} ref={(ref) => ref && connect(drag(ref))}>
      {children ? (
        children
      ) : (
        <div style={{
            textAlign: 'center',
            fontStyle: 'italic',
            padding: '1rem', // Using equivalent of p-4 (adjust as needed)
            backgroundColor: 'rgba(255, 242, 153, 1)', // Using equivalent of bg-yellow-100
            outlineWidth: '1px', // Using equivalent of outline-1
            outlineStyle: 'dashed', // Using equivalent of outline-dashed
            outlineColor: 'rgba(255, 193, 7, 1)' // Using equivalent of outline-amber-400
          }}>
          Empty container
        </div>
      )}
    </div>
  );
};
