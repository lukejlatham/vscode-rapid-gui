import React, { FC, useEffect, useMemo, useState, useRef } from 'react';
import { Card, makeStyles, Input, Label } from '@fluentui/react-components';
import Responsive, { Layout, WidthProvider } from 'react-grid-layout';
import { Element } from '@craftjs/core';
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
    flexDirection: 'row',
    gap: '10px',
    padding: '10px',
    marginBottom: '15px', // Increased margin for better separation
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', // Ensures all items are vertically centered
    borderRadius: '8px', // Adds slight rounding to the container edges
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow for depth
  },
  colorInput: {
    display: 'flex',
    borderRadius: '4px',
    height: '40px', // Slightly increased height for better accessibility
    padding: '0 10px', // Added padding for better input visibility
    border: '1px solid #ccc', // Added border for better visibility
    boxSizing: 'border-box', // Ensures padding is included in total height
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px', // Added horizontal padding for better click area
    borderRadius: '5px',
    backgroundColor: '#28a745', // Used a standard green color
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Added transition for smooth hover effect
  },
  addButtonHover: {
    backgroundColor: '#218838', // Darker green for hover effect
  },
  lockedButton: {
    display: 'flex',
    borderRadius: '5px',
    padding: '10px 20px', // Added horizontal padding for better click area
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Added transition for smooth hover effect
  },
  lockedButtonHover: {
    backgroundColor: '#45a049', // Darker green for hover effect
  },
  rowInput: {
    display: 'flex',
    borderRadius: '4px',
    height: '40px', // Slightly increased height for better accessibility
    padding: '0 10px', // Added padding for better input visibility
    border: '1px solid #ccc', // Added border for better visibility
    boxSizing: 'border-box', // Ensures padding is included in total height
  },
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
  const [lockedGrid, setLockedGrid] = useState(false);

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

  const setLocked = () => {
    setLockedGrid(!lockedGrid);
  }

  const rowHeight = containerHeight / rows;

  return (
    <>
      <div className={classes.settingsContainer}>
        <Label>
          <input
            className={classes.colorInput}
            type="color"
            value={backgroundColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(e.target.value)} />
        </Label>
        <Label>
          Rows
          <Input
          className='rows'
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
        <button onClick={setLocked} className={classes.lockedButton}>
          {lockedGrid ? 'Unlock Grid' : 'Lock Grid'}
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
          isResizable={lockedGrid ? false : true}
          isDraggable={lockedGrid ? false : true}
          preventCollision={false}
          compactType={null}
          onLayoutChange={onLayoutChange}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
        >
          {items.map((item) => (
            <div key={item.i} data-grid={item} className={classes.gridCell}>
              <Element id={item.i} is={GridCell} />
             {!lockedGrid && (
        <button
          className={classes.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            onRemoveItem(item.i);
          }}
        >
          Remove
        </button>
      )}
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
