import React, { FC, useEffect, useMemo, useState, useRef } from 'react';
import { Card, makeStyles, Input, Label } from '@fluentui/react-components';
import Responsive, { Layout, WidthProvider } from 'react-grid-layout';
import { GridCell } from './GridCell';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const useStyles = makeStyles({
  background: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'auto',
  },
  gridCell: {
    border: '1px dashed #666666',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    padding: '2px 6px',
    fontSize: '16px',
    lineHeight: '16px',
    borderRadius: '8px',
    backgroundColor: 'red',
  },
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '5px',
    marginBottom: '10px', // Added margin to separate settings from the grid
  },
  colorInput: {
    width: "100%",
    borderRadius: "4px",
    height: "35px",
  },
  addButton: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px', // Added margin to separate the button from the inputs
  }
});

interface BackgroundProps {
  backgroundColor: string;
  layout: Layout[];
  rows: number;
  columns: number;
}

export const Background: FC<BackgroundProps> = ({ backgroundColor: initialBackgroundColor, layout: initialLayout, rows: initialRows, columns: initialColumns }) => {
  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [items, setItems] = useState<Layout[]>(initialLayout);
  const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor);
  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(initialColumns);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateContainerHeight = () => {
      if (backgroundRef.current) {
        setContainerHeight(backgroundRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', updateContainerHeight);
    updateContainerHeight();

    return () => window.removeEventListener('resize', updateContainerHeight);
  }, []);

  const addItem = () => {
    const newItem = {
      i: (items.length > 0 ? (parseInt(items[items.length - 1].i) + 1).toString() : '0'),
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };
    setItems([...items, newItem]);
  };

  const onRemoveItem = (i: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.i !== i));
  };

  const onLayoutChange = (layout: Layout[]) => {
    setItems(layout);
  };

  const rowHeight = containerHeight / rows;

  return (
    <>
      <div className={classes.settingsContainer}>
        <Label>
          Background Color
          <input
            className={classes.colorInput}
            type="color"
            value={backgroundColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(e.target.value)} />
        </Label>
        <Label>
          Rows
          <Input
            type="number"
            value={rows.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRows(parseInt(e.target.value, 10))}
          />
        </Label>
        <Label>
          Columns
          <Input
            type="number"
            value={columns.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColumns(parseInt(e.target.value, 10))}
          />
        </Label>
        <button onClick={addItem} className={classes.addButton}>
          Add Item
        </button>
      </div>
      <Card
        appearance='filled'
        ref={backgroundRef}
        className={classes.background}
        style={{ backgroundColor }}
      >
        <ResponsiveGridLayout
          className="layout"
          layout={items}
          cols={columns}
          rowHeight={rowHeight}
          maxRows={rows}
          isResizable={true}
          isDraggable={true}
          preventCollision={false}
          compactType={null}
          onLayoutChange={onLayoutChange}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
        >
          {items.map((item) => (
            <div key={item.i} data-grid={item} className={classes.gridCell}>
              <GridCell />
              <button
                className={classes.removeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem(item.i);
                }}
              >
                X
              </button>
            </div>
          ))}
        </ResponsiveGridLayout>
      </Card>
    </>
  );
};

export const BackgroundDefaultProps: BackgroundProps = {
  backgroundColor: '#292929',
  layout: [{ i: '0', x: 0, y: 0, w: 1, h: 1 }],
  rows: 3,
  columns: 3,
};

export default Background;
