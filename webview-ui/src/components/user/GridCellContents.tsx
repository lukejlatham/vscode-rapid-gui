import React from 'react';
import { useNode, UserComponent } from "@craftjs/core";
import { makeStyles } from "@fluentui/react-components";

interface ContainerProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    position: 'relative',
    overflow: 'hidden',
    
  },
  containerEmpty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    width: "100%",
    height: "100%",
  },
  propsDisplay: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "2px 5px",
    fontSize: "12px",
    borderRadius: "3px",
  },
});

export const GridCellContents: UserComponent<ContainerProps> = ({ children }) => {
  const { connectors: { connect, drag } } = useNode();
  const classes = useStyles();

  return (
    <div ref={(ref) => ref && connect(drag(ref))} className={classes.container}>
      {children ? (
        children
      ) : (
        <div className={classes.containerEmpty}>
          {/* Optional empty state content */}
        </div>
      )}

    </div>
  );
};

GridCellContents.craft = {
  displayName: "GridCellContents",
  props: {
    children: [],

  },
};

export default GridCellContents;
