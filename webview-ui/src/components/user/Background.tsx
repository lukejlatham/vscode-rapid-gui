import { FC, useEffect, useMemo, useState, useRef } from "react";
import { Card, makeStyles, tokens } from "@fluentui/react-components";
import Responsive, { Layout, WidthProvider } from "react-grid-layout";
import { Element } from "@craftjs/core";
import { GridCell, GridCellDefaultProps } from "./GridCell";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useNode } from "@craftjs/core";
import { BackgroundProps, backgroundSchema } from "../../types";
import { mergeClasses } from "@griffel/react";

const useStyles = makeStyles({
  background: {
    width: "100%",
    height: "100%",
  },
  backgroundBorderLocked: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  backgroundBorderUnlocked: {
    border: `1px solid ${tokens.colorBrandForeground2}`,
  },
  gridCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  gridCellContentOpaque: {
    opacity: 0.5,
  },
  gridCellContent: {
    width: "100%",
    height: "100%",
  },
  lockedGrid: {
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
  boxShadowAnimation: {
    border: `2px solid ${tokens.colorBrandForeground1}`,
    animationPlayState: "running",
    animationDelay: "0s",
    animationTimingFunction: "ease",
    animationDirection: "alternate",
    animationDuration: "2s",
    animationIterationCount: "infinite",
    userSelect: "none",
    animationName: {
      from: {
        boxShadow: `0 0 0 0 ${tokens.colorBrandForeground1}`,
      },
      to: {
        boxShadow: `0 0  6px ${tokens.colorBrandForeground1} `,
      },
    },
  },
  marchingAntsAnimation: {
    userSelect: "none",

    backgroundImage: `
      linear-gradient(to right, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to right, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to bottom, ${tokens.colorBrandForeground1} 50%, transparent 50%),
      linear-gradient(to bottom, ${tokens.colorBrandForeground1} 50%, transparent 50%)
    `,
    backgroundSize: "20px 2px, 20px 2px, 2px 20px, 2px 20px",
    backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
    backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
    animationName: {
      "0%": {
        backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
      },
      "100%": {
        backgroundPosition: "40px 0, -40px 100%, 0 -40px, 100% 40px",
      },
    },
    animationDuration: "1.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: "running",
    // ":hover": {
    //   animationPlayState: "running",
    // },
  },
});

export const Background: FC<BackgroundProps> = (props) => {
  const validatedProps = backgroundSchema.parse(props);

  const {
    layout: initialLayout,
    rows: initialRows,
    columns: initialColumns,
    lockedGrid: initialGridLocked,
    backgroundColor: initialBackgroundColor,
  } = validatedProps;

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const styles = useStyles();
  const [containerHeight, setContainerHeight] = useState(0);
  const {
    actions: { setProp },
  } = useNode();

  setProp((props: BackgroundProps) => {
    props.rows = initialRows;
    props.columns = initialColumns;
    props.lockedGrid = initialGridLocked;
    props.layout = initialLayout;
    props.backgroundColor = initialBackgroundColor;
  });

  useEffect(() => {
    const updateContainerHeight = () => {
      if (backgroundRef.current) {
        const rowMarginOffest = 30 + 5 * props.rows;

        setContainerHeight(backgroundRef.current.clientHeight - rowMarginOffest);
      }
    };
    window.addEventListener("resize", updateContainerHeight);
    updateContainerHeight();

    return () => window.removeEventListener("resize", updateContainerHeight);
  }, [props.rows]);

  const onLayoutChange = (layout: Layout[]) => {
    setProp((props: BackgroundProps) => {
      props.layout = layout;
    });
  };

  const rowHeight = containerHeight / initialRows;

  return (
    <>
      <Card
        style={{ backgroundColor: initialBackgroundColor }}
        appearance="filled"
        ref={backgroundRef}
        className={mergeClasses(
          styles.background,
          initialGridLocked ? styles.backgroundBorderLocked : styles.backgroundBorderUnlocked
        )}>
        <ResponsiveGridLayout
          className="layout"
          layout={initialLayout}
          cols={initialColumns}
          rowHeight={rowHeight}
          maxRows={initialRows}
          isResizable={initialGridLocked ? false : true}
          isDraggable={initialGridLocked ? false : true}
          compactType={null}
          onLayoutChange={onLayoutChange}
          useCSSTransforms={true}
          preventCollision={true}
          resizeHandles={["se", "sw", "ne", "nw"]}
          margin={[5, 5]}>
          {initialLayout.map((item) => (
            <div
              key={item.i}
              data-grid={item}
              className={`${styles.gridCell} ${
                initialGridLocked ? styles.lockedGrid : styles.boxShadowAnimation
              }`}>
              <div
                className={mergeClasses(
                  styles.gridCellContent,
                  !initialGridLocked && styles.gridCellContentOpaque
                )}>
                <Element
                  id={item.i}
                  is={GridCell}
                  custom={{ id: item.i }}
                  {...GridCellDefaultProps}
                  canvas
                />
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </Card>
    </>
  );
};

export const BackgroundDefaultProps: BackgroundProps = {
  backgroundColor: tokens.colorBrandForeground1,
  layout: [],
  rows: 3,
  columns: 3,
  lockedGrid: true,
};

export default Background;
