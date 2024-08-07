import { FC, useEffect, useMemo, useState, useRef } from 'react';
import { Card, makeStyles} from '@fluentui/react-components';
import Responsive, { Layout, WidthProvider } from 'react-grid-layout';
import { Element } from '@craftjs/core';
import { GridCell, GridCellDefaultProps } from './GridCell';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useNode } from '@craftjs/core';
import { BackgroundProps, backgroundSchema } from '../../types';
import { DeleteRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  background: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    border: '1px solid #666666',
  },
  gridCell: {
    border: '1px dashed #666666',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
        setContainerHeight(backgroundRef.current.clientHeight*0.8);
      }
    };
    window.addEventListener('resize', updateContainerHeight);
    updateContainerHeight();

    return () => window.removeEventListener('resize', updateContainerHeight);
  }, []);


// TODO:  UPDATE THIS FUCTION TO NOT EXCEED THE MAXIMUM ROWS AND COLUMNS AND ADD RIGHT TO LEFT

  const onLayoutChange = (layout: Layout[]) => {
    setProp((props: BackgroundProps) => {
      props.layout = layout;
    });
  };

  const rowHeight = containerHeight / initialRows;

  return (
    <>
      <Card
        appearance='filled'
        ref={backgroundRef}
        className={styles.background}
        
      >
        <ResponsiveGridLayout
          style={{ backgroundColor: initialBackgroundColor }}
          className="layout"
          layout={initialLayout}
          cols={initialColumns}
          rowHeight={rowHeight}
          maxRows={initialRows}
          isResizable={initialGridLocked ? false : true}
          isDraggable={initialGridLocked ? false : true}
          compactType={null}
          onLayoutChange={onLayoutChange}
          preventCollision={true}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
        >
          {initialLayout.map((item) => (
            <div key={item.i} data-grid={item} className={styles.gridCell}>
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
    { i: '0', x: 0, y: 0, w: 1, h: 1 },
    { i: '1', x: 1, y: 0, w: 1, h: 1 },
    { i: '2', x: 2, y: 0, w: 1, h: 1 },
    { i: '3', x: 0, y: 1, w: 1, h: 1 },
    { i: '4', x: 1, y: 1, w: 1, h: 1 },
    { i: '5', x: 2, y: 1, w: 1, h: 1 },
  ],
  rows: 2,
  columns: 3,
  lockedGrid: true,
};


export default Background;
