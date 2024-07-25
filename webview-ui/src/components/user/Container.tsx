import { useNode, UserComponent } from "@craftjs/core";
import React, { FC, ReactNode } from "react";
import { Text, makeStyles, shorthands } from "@fluentui/react-components";
import { ArrowCircleDownFilled } from "@fluentui/react-icons";

interface ContainerProps {
  children?: ReactNode;
  [key: string]: any;
}


const useStyles = makeStyles({
  container: {
    // display: "flex",
    // flex: 1,
    width: "100%",
    height: "100%",
  },
  containerEmpty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // padding: "40px",
    width: "100%",
    height: "100%",
  },
});

export const Container: UserComponent<ContainerProps> = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const classes = useStyles();

  return (
    <div {...props} ref={(ref) => ref && connect(drag(ref))} className={classes.container}>
      {children}
    </div>
  );
};


Container.craft = {
  displayName: "Container",
};
