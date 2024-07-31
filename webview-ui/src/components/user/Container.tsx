import { UserComponent, useNode } from "@craftjs/core";
import { ContainerProps } from "../../../../types";
import { makeStyles } from "@fluentui/react-components";
// import { ContainerSettings } from "./Settings/ContainerSettings";


const useStyles = makeStyles({
    container: {
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: 'hidden',
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

export const Container: UserComponent<ContainerProps> = ({ height, width, backgroundColor, borderRadius, bordercolor, padding, flexDirection, justifyContent, alignItems, gap, children, }) => {
    const { connectors: { connect, drag } } = useNode();
    const styles = useStyles();
    const divStyle = {
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        border: `1px solid ${bordercolor}`,
        padding: padding,
        height: `${height}%`,
        width: `${width}%`,
        gap: `${gap}px`,
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
    backgroundColor: "#666666",
    borderRadius: 0,
    bordercolor: "#FFFFFF",
    padding: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 0,
  };

Container.craft = {
    displayName: "Container",
    props: ContainerDefaultProps,
    // related: {
    //     settings: ContainerSettings,
    // },
  };