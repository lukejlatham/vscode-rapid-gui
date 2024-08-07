import { UserComponent, useNode } from "@craftjs/core";
import { ContainerProps, containerSchema  } from "../../types";
import { makeStyles } from "@fluentui/react-components";
import { ContainerSettings } from "./Settings/ContainerSettings";
// import { ContainerSettings } from "./Settings/ContainerSettings";


const useStyles = makeStyles({
    container: {
      display: "flex",
      overflow: 'hidden',
      maxWidth: '100%',
      maxHeight: '100%',
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
  const { children, height, width, backgroundColor, borderRadius, borderColor, padding, flexDirection, justifyContent, alignItems, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, gap } = validatedProps;

    const { connectors: { connect, drag } } = useNode();
    const styles = useStyles();
    const divStyle = {
        backgroundColor: backgroundColor,
        borderRadius: `${borderRadius}px`,
        border: `2px solid ${borderColor}`,
        padding: padding,
        height: `${height}%`,
        width: `${width}%`,
        gap: `${gap}px`,
        boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`,
        };

    return (
        <div ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))} 
        className={`${styles.container} 
        ${justifyContent === 'flex-start' ? styles.justifyLeft : justifyContent === 'center' ? styles.justifyCenter : justifyContent === 'flex-end' ? styles.justifyRight : justifyContent === 'space-between' ? styles.justifySpaceBetween : styles.justifySpaceAround}
        ${flexDirection === 'row' ? styles.directionRow : styles.directionColumn}
        ${alignItems === 'flex-start' ? styles.alignStart : alignItems === 'center' ? styles.alignCenter : styles.alignEnd}`}
        style={divStyle}>
          {children ? (
            children
          ) : (
            <div className={styles.containerEmpty}>
            </div>
          )}
    
        </div>
      );
    };

export const ContainerDefaultProps: ContainerProps = {
    height: 50,
    width: 100,
    backgroundColor: "#292929",
    borderRadius: 5,
    borderColor: "#666666",
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
    shadowColor: "black",
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowBlur: 1,
  };

Container.craft = {
    displayName: "Container",
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings,
    },
  };