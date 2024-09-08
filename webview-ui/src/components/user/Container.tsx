import React, { useState, useCallback, useContext } from "react";
import { UserComponent, useNode } from "@craftjs/core";
import { ContainerProps, containerSchema } from "../../types";
import { makeStyles } from "@fluentui/react-components";
import { ContainerSettings } from "./Settings/ContainerSettings";
import { useSelected } from "../../hooks/useSelected";
import { DraggingComponentContext } from "../../pages/EditingInterface/EditingInterface";

const useStyles = makeStyles({
  container: {
    display: "flex",
    overflow: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    boxSizing: "border-box",
  },
  justifyLeft: {
    justifyContent: "flex-start",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyRight: {
    justifyContent: "flex-end",
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
  justifySpaceAround: {
    justifyContent: "space-around",
  },
  directionRow: {
    flexDirection: "row",
  },
  directionColumn: {
    flexDirection: "column",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignCenter: {
    alignItems: "center",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  containerEmpty: {
    width: "100%",
    height: "100%",
  },
});

export const Container: UserComponent<ContainerProps> = (props) => {
  const validatedProps = containerSchema.parse(props);
  const {
    children,
    height,
    width,
    backgroundColor,
    borderRadius,
    borderColor,
    padding,
    flexDirection,
    justifyContent,
    alignItems,
    shadowBlur,
    shadowColor,
    shadowOffsetX,
    shadowOffsetY,
    gap,
  } = validatedProps;

  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { handleDrop, id } = useNode((node) => ({
    handleDrop: node.data.custom?.handleDrop,
    id: node.id,
  }));

  const styles = useStyles();
  const select = useSelected();
  const [isFocused, setIsFocused] = useState(false); // State for focus tracking
  const divStyle = {
    backgroundColor: `${backgroundColor}`,
    borderRadius: `${borderRadius}px`,
    border: `1px solid ${borderColor}`,
    padding: padding,
    height: `${height}%`,
    width: `${width}%`,
    gap: `${gap}px`,
    boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`,
  };
  const { seletectedDraggingComponent } = useContext(DraggingComponentContext);


  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Control' && handleDrop) {
        console.log("Dropping component: ", seletectedDraggingComponent);
        try{
          handleDrop(event, id);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [handleDrop, seletectedDraggingComponent, id]
  );



  return (
    <div
      tabIndex={0}
      ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
      style={divStyle}
      onFocus={() => setIsFocused(true)} // Set focus
      onBlur={() => setIsFocused(false)} // Remove focus
      onKeyDown={handleKeyDown} // Add keydown event listener
      className={`${styles.container} ${(selected || isFocused) ? select.selectedGrid : ""}
        ${
          justifyContent === "flex-start"
            ? styles.justifyLeft
            : justifyContent === "center"
            ? styles.justifyCenter
            : justifyContent === "flex-end"
            ? styles.justifyRight
            : justifyContent === "space-between"
            ? styles.justifySpaceBetween
            : styles.justifySpaceAround
        }
        ${flexDirection === "row" ? styles.directionRow : styles.directionColumn}
        ${
          alignItems === "flex-start"
            ? styles.alignStart
            : alignItems === "center"
            ? styles.alignCenter
            : styles.alignEnd
        }`}>
      {children ? children : <div className={styles.containerEmpty}></div>}
    </div>
  );
};

export const ContainerDefaultProps = containerSchema.parse({});

Container.craft = {
  displayName: "Container",
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
