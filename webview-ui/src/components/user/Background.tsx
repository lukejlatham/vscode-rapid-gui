import React, {FC} from 'react';
import { Card, makeStyles, Input, Label } from '@fluentui/react-components';
import { useNode, UserComponent, Element } from "@craftjs/core";
import GridLayout, { Layout } from 'react-grid-layout';
import { Container } from './Container';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface BackgroundProps {
    backgroundColor: string;
    rows: number;
    columns: number;
}

const useStyles = makeStyles({
    background: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    gridCell: {
        border: '1px dashed #666666',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '5px',
    },
    colorInput: {
        width: "100%",
        borderRadius: "4px",
        height: "35px",
    },
});

export const Background: UserComponent<BackgroundProps> = ({ backgroundColor, rows, columns }) => {
    const { connectors: { connect, drag } } = useNode();
    const classes = useStyles();

    const layout: Layout[] = Array.from({ length: rows * columns }, (_, i) => ({
        i: `cell-${i}`,
        x: i % columns,
        y: Math.floor(i / columns),
        w: 1,
        h: 1,
    }));

    const calculateWidth = (cols: number) => {
        return cols * 150 + (cols - 1) * 10;
    };

    return (
        <Card
            appearance='filled'
            ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))}
            className={classes.background}
            style={{ backgroundColor }}
        >
            <GridLayout
                className="layout"
                layout={layout}
                cols={columns}
                rowHeight={150}
                width={calculateWidth(columns)}
                maxRows={rows}
                isResizable={true}
                isDraggable={true}
                compactType={'horizontal'}
                preventCollision={false}
            >
                {layout.map(item => (
                    <div key={item.i} className={classes.gridCell}>
                        <Element
                            id={item.i}
                            is={Container}
                            canvas
                        />
                    </div>
                ))}
            </GridLayout>
        </Card>
    );
};


const BackgroundSettings: FC = () => {
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
