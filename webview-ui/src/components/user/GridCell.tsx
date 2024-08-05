import { UserComponent, useNode } from "@craftjs/core";
import { GridCellProps, gridCellSchema } from '../../types';
import { makeStyles } from "@fluentui/react-components";
import { GridCellSettings } from "./Settings/GridCellSettings";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: "5px",
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
    padding: "5px",
    width: "100%",
    height: "100%",
  },
});

export const GridCell: UserComponent<GridCellProps> = (props) => {
  const validatedProps = gridCellSchema.parse(props);
  
  const { justifyContent, flexDirection, alignItems, gap, children } = validatedProps;
  const { connectors: { connect, drag } } = useNode();
  const styles = useStyles();

  return (
    <div ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))} 
    className={`${styles.container} 
    ${justifyContent === 'flex-start' ? styles.justifyLeft : justifyContent === 'center' ? styles.justifyCenter : justifyContent === 'flex-end' ? styles.justifyRight : justifyContent === 'space-between' ? styles.justifySpaceBetween : styles.justifySpaceAround}
    ${flexDirection === 'row' ? styles.directionRow : styles.directionColumn}
    ${alignItems === 'flex-start' ? styles.alignStart : alignItems === 'center' ? styles.alignCenter : styles.alignEnd}`}
    style={{gap: `${gap}px`}}>
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

export const GridCellDefaultProps: GridCellProps = {
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
};

GridCell.craft = {
  displayName: "Grid Cell",
  related: {
    settings: GridCellSettings
  }

};

export default GridCell;
