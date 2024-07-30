import React, { FC, useEffect, useMemo, useState, useRef } from 'react';
import { Card, makeStyles, Input, Label, Button } from '@fluentui/react-components';
import Responsive, { Layout, WidthProvider } from 'react-grid-layout';
import { Element } from '@craftjs/core';
import { GridCell } from './GridCell';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useNode } from '@craftjs/core';
import { EditBackgroundButton } from '../EditBackgroundButton';
import { BackgroundProps } from '../../../../types';
import { DeleteRegular } from '@fluentui/react-icons';

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
    left: '45%',
    bottom: '10px',
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
    backgroundColor: '#218838', 
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

export const Background: FC<BackgroundProps> = ({ backgroundColor: initialBackgroundColor, layout: initialLayout, rows: initialRows, columns: initialColumns, lockedGrid: initialGridLocked }) => {
  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [containerHeight, setContainerHeight] = useState(0);
  // const [lockedGrid, setLockedGrid] = useState(false);
  const { actions:{setProp} } = useNode();

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
// TODO:  UPDATE THIS FUCTION TO NOT EXCEED THE MAXIMUM ROWS AND COLUMNS AND ADD RIGHT TO LEFT

  const onRemoveItem = (i: string) => {
    setProp((props: BackgroundProps) => {
      props.layout = props.layout.filter((item) => item.i !== i);
    });
  };

  const onLayoutChange = (layout: Layout[]) => {
    setProp((props: BackgroundProps) => {
      props.layout = layout;
    });
  };

  const handleBackgroundColorChange = (color: string) => {
    setProp((props: BackgroundProps) => {
      props.backgroundColor = color;
    });
  };

  const handleRowsChange = (newRows: number) => {
    setProp((props: BackgroundProps) => {
      props.rows = newRows;
    });
  };

  const handleColumnsChange = (newColumns: number) => {
    setProp((props: BackgroundProps) => {
      props.columns = newColumns;
    });
  };

  const handleLockedGrid = () => {
    setProp((props: BackgroundProps) => {
      props.lockedGrid = !props.lockedGrid;
    });
  };

  const rowHeight = containerHeight / initialRows;

  return (
    <>
      <div className={classes.settingsContainer}>
        {/* <EditBackgroundButton nodeId="ROOT"/> */}
        <Label>
          <input
            className={classes.colorInput}
            type="color"
            value={initialBackgroundColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBackgroundColorChange(e.target.value)} />
        </Label>
        <Label>
          Rows
          <Input
          className='rows'
            type="number"
            value={initialRows.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRowsChange(parseInt(e.target.value, 10))}
          />
        </Label>
        <Label>
          Columns
          <Input
            type="number"
            value={initialColumns.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleColumnsChange(parseInt(e.target.value, 10))}
          />
        </Label>
        {/* <Button size='small' onClick={addItem} className={classes.addButton}>
          Add Item
        </Button> */}
        <Button size='small' onClick={handleLockedGrid} className={classes.lockedButton}>
          {initialGridLocked ? 'Unlock Grid' : 'Lock Grid'}
        </Button>
      </div>
      <Card
        appearance='filled'
        ref={backgroundRef}
        className={classes.background}
        style={{ backgroundColor: initialBackgroundColor }}
      >
        <ResponsiveGridLayout
          className="layout"
          layout={initialLayout}
          cols={initialColumns}
          rowHeight={rowHeight}
          maxRows={initialRows}
          isResizable={initialGridLocked ? false : true}
          isDraggable={initialGridLocked ? false : true}
          compactType={'horizontal'}
          onLayoutChange={onLayoutChange}
        
          resizeHandles={['se', 'sw', 'ne', 'nw']}
        >
          {initialLayout.map((item) => (
            <div key={item.i} data-grid={item} className={classes.gridCell}>
              <Element id={item.i} is={GridCell} custom={{id: item.i}} canvas/>
             {!initialGridLocked && (
        <Button
          className={classes.removeButton}
          icon={<DeleteRegular />}
          onClick={(e) => {
            e.stopPropagation();
            onRemoveItem(item.i);
          }}
        />
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
  lockedGrid: false,
};


export default Background;
