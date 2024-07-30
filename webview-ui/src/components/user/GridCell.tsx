import { UserComponent, Element, useNode} from "@craftjs/core";
import {ContainerProps} from '../../../../types';
import { makeStyles } from "@fluentui/react-components";
import { GridCellSettings } from "./Settings/GridCellSettings";

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

export const GridCell: UserComponent<ContainerProps> = ({ id, children }) => {
  const { connectors: { connect, drag } } = useNode();
  const styles = useStyles();

  return (
    <div ref={(ref: HTMLDivElement | null ) => ref && connect(drag(ref))} className={styles.container}>
      {children ? (
        children
      ) : (
        <div className={styles.containerEmpty}>
          {/* Optional empty state content */}
        </div>
      )}

    </div>
  );
};

GridCell.craft = {
  displayName: "GridCell",
  related: {
    settings: GridCellSettings
  }
  
};

export default GridCell;
