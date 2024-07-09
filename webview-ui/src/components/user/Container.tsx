import { useNode } from "@craftjs/core";
import React, { ReactNode } from "react";
import { Text } from "@fluentui/react-components";
import { ArrowCircleDownFilled } from "@fluentui/react-icons";

interface ContainerProps {
  children?: ReactNode;
  [key: string]: any;
}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div className=""  {...props} ref={(ref) => ref && connect(drag(ref))}>
      {children ? (
        children
      ) : (

          <div style={{display: 'flex', justifyContent: 'center', borderStyle: 'dashed', outlineWidth: '1px', outlineColor: '#676767', padding: '40px', borderRadius: '10px'}}>
            <ArrowCircleDownFilled style={{fontSize: '21px', paddingRight: '5px'}} />
            <Text style={{textAlign: 'center'}}>Drop components here</Text>
          </div>
      )}
    </div>
  );
};
