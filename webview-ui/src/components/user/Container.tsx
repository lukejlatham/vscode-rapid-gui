import { useNode, UserComponent } from "@craftjs/core";
import React, { ReactNode } from "react";
import { Text, makeStyles, shorthands } from "@fluentui/react-components";
import { ArrowCircleDownFilled } from "@fluentui/react-icons";

interface ContainerProps {
  children?: ReactNode;
  [key: string]: any;
}


const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1
  },
  containerEmpty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    border: "1px dashed #ccc",
    width: "100%",
  },
  icon: {
    fontSize: "21px",
    paddingRight: "5px",
  },
  text: {
    textAlign: "center",
  },
});

export const Container: UserComponent<ContainerProps> = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const classes = useStyles();

  return (
    <div {...props} ref={(ref) => ref && connect(drag(ref))} className={classes.container}>
      {children ? (
        children
      ) : (
        <div className={classes.containerEmpty}>
          {/* <ArrowCircleDownFilled className={classes.icon} />
          <Text className={classes.text}>Drop components here</Text> */}
        </div>
      )}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
};
