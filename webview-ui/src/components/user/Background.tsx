import React, {useState} from 'react';
import { Card, makeStyles } from '@fluentui/react-components';
import { useNode, UserComponent, Element, useEditor } from "@craftjs/core";
import { Input, Label } from '@fluentui/react-components';
import { Container } from './Container';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);


interface BackgroundProps {
  backgroundColor: string;
  rows: number;
  columns: number;
}

const useStyles = makeStyles({
  background: {
    width: '100%',
    height: '100%',
    border: '1px solid #ccc',
  },
  gridItem: {
    border: '1px dashed #666666',
  },
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '5px',
    },
    colorInput: {
        width: '100%',
        height: '30px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    gridCell: {
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    grid: {
        border: '1px solid #ccc',
    },
});


export const Background: UserComponent<BackgroundProps> = ({ backgroundColor, rows, columns }) => {
  const { connectors: { connect, drag }, id } = useNode();
  const classes = useStyles();

  const { children } = useEditor((state) => ({
    children: state.nodes[id].data.nodes, 
  }));

  const gridItemProps = {
    w: 1,
    h: 1,
    maxW: columns,
    maxH: rows,
    minW: 1,
    minH: 1,
  };

  return (
    <Card
      appearance='filled'
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={classes.background}
      style={{ backgroundColor }}
    >
      <ResponsiveGridLayout {...gridItemProps}
        cols={{ lg: columns, md: columns, sm: columns, xs: columns, xxs: columns }}
        rowHeight={200}

        className="interactive-grid"     
        isDraggable={true}
        isResizable={true}
        resizeHandles={["se", "sw", "ne", "nw", "n", "e", "s", "w"]}
        maxRows={rows}
        isBounded={true}
      >
        {children.map((id) => (
          <div key={id} className={classes.grid} >
            <Element is={Container} id={id} canvas className={classes.gridCell} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </Card>
  );
};

export default Background;


const BackgroundSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode(node => ({
        props: node.data.props as BackgroundProps
    }));

    const classes = useStyles();

    return (
        <div className={classes.settingsContainer}>
            <Label>
                Background Color
                <input
                    className={classes.colorInput}
                    type="color"
                    defaultValue={props.backgroundColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProp((props: BackgroundProps) => props.backgroundColor = e.target.value)} />
            </Label>
            <Label>
                Number of Columns
                <Input
                    
                    type="number"
                    defaultValue={props.columns?.toString()}
                    step={1}
                    min={1}
                    max={10}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: BackgroundProps) => props.columns = parseInt(e.target.value, 10));
                    }}
                />
            </Label>
            <Label>
                Number of Rows
                <Input
                    type="number"
                    defaultValue={props.rows?.toString()}
                    step={1}
                    min={1}
                    max={10}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: BackgroundProps) => props.rows = parseInt(e.target.value, 10));
                    }}
                />
            </Label>
        </div>
    );
};


export const BackgroundDefaultProps: BackgroundProps = {
    backgroundColor: '#292929',
    rows: 3,
    columns: 3,
}

Background.craft = {
    displayName: "Background",
    props: BackgroundDefaultProps,
    related: {
        settings: BackgroundSettings
    }
};
