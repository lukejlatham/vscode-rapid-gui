import { useNode, UserComponent } from "@craftjs/core";
import React, { ReactNode } from "react";
import { Text, makeStyles } from "@fluentui/react-components";
import { ArrowCircleDownFilled } from "@fluentui/react-icons";

interface ContainerProps {
  children?: ReactNode;
  [key: string]: any;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    borderRadius: "10px",
    border: "2px dashed #676767",
  },
  icon: {
    fontSize: "21px",
    paddingRight: "5px",
  },
  text: {
    fontSize: "14px",
  },
});

export const Container: UserComponent<ContainerProps> = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const classes = useStyles();

  return (
    <div {...props} ref={(ref) => ref && connect(drag(ref))}>
      {children ? (
        children
      ) : (
        <div className={classes.container}>
          <ArrowCircleDownFilled className={classes.icon} />
          <Text className={classes.text}>Drop components here</Text>
        </div>
      )}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
};
