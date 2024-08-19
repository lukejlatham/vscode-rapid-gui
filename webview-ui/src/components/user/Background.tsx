import { FC, useEffect, useMemo, useState, useRef } from 'react';
import { Card, makeStyles, tokens} from '@fluentui/react-components';
import Responsive, { Layout, WidthProvider } from 'react-grid-layout';
import { Element } from '@craftjs/core';
import { GridCell, GridCellDefaultProps } from './GridCell';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useNode } from '@craftjs/core';
import { BackgroundProps, backgroundSchema } from '../../types';



const useStyles = makeStyles({
  background: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  gridCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  lockedGrid: {
    border: `1px solid ${tokens.colorNeutralStroke1}`, // For example, solid border when locked
  },
  unlockedGrid: {
    border: `1px dashed ${tokens.colorNeutralForeground1}`, // For example, dashed border when unlocked
  },
});

export const Background: FC<BackgroundProps> = (props) => {
  const validatedProps = backgroundSchema.parse(props);

  const {
    backgroundColor: initialBackgroundColor,
    layout: initialLayout,
    rows: initialRows,
    columns: initialColumns,
    lockedGrid: initialGridLocked,
  } = validatedProps;

  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const styles = useStyles();
  const [containerHeight, setContainerHeight] = useState(0);
  const { actions:{setProp} } = useNode();

  setProp((props: BackgroundProps) => {
    props.rows = initialRows;
    props.columns = initialColumns;
    props.lockedGrid = initialGridLocked;
    props.backgroundColor = initialBackgroundColor;
    props.layout = initialLayout;
  }
  );

    useEffect(() => {
    const updateContainerHeight = () => {
      if (backgroundRef.current) {
        const rowMarginOffest = 20 + 10 * props.rows;

        setContainerHeight(backgroundRef.current.clientHeight - rowMarginOffest);
      }
    };
    window.addEventListener('resize', updateContainerHeight);
    updateContainerHeight();

    return () => window.removeEventListener('resize', updateContainerHeight);
  }, [props.rows]);



  const onLayoutChange = (layout: Layout[]) => {
    console.log('layout', layout);
    setProp((props: BackgroundProps) => {
      props.layout = layout;
    });
  };

  const rowHeight = containerHeight / initialRows;

  return (
    <>
      <Card
      style={{ backgroundColor: initialBackgroundColor }}
        appearance='filled'
        ref={backgroundRef}
        className={styles.background}
        
      >
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
          resizeHandles={['se', 'sw', 'ne', 'nw']}
          margin={[5, 5]}

        >
          {initialLayout.map((item) => (
            
            <div key={item.i} data-grid={item} className={`${styles.gridCell} ${initialGridLocked ? styles.lockedGrid : styles.unlockedGrid}`}>
              <Element id={item.i} is={GridCell} custom={{id: item.i}} {...GridCellDefaultProps} canvas/>
            </div>
          ))}
        </ResponsiveGridLayout>
      </Card>
    </>
  );
};

export const BackgroundDefaultProps: BackgroundProps = {
  backgroundColor: '#292929',
  layout: [
    { },
  ],
  rows: 3,
  columns: 3,
  lockedGrid: true,
};


export default Background;
