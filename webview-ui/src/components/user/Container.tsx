import { useNode, UserComponent } from "@craftjs/core";
import React, { ReactNode } from "react";
import { Text } from "@fluentui/react-components";
import { ArrowCircleDownFilled } from "@fluentui/react-icons";
import './container.css'; // Import the CSS file

interface ContainerProps {
  children?: ReactNode;
  [key: string]: any;
}

export const Container: UserComponent<ContainerProps> = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div {...props} ref={(ref) => ref && connect(drag(ref))} className="container">
      {children ? (
        children
      ) : (
        <div className="container-empty">
          <ArrowCircleDownFilled className="arrow-icon" />
          <Text className="text-center">Drop components here</Text>
        </div>
      )}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
};
