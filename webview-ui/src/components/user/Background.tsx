import React, {FC, useEffect, useRef, useState, useMemo} from 'react';
import { Card, makeStyles, Input, Label } from '@fluentui/react-components';
import { useNode, UserComponent, Element } from "@craftjs/core";
import Responsive, { Layout, WidthProvider } from 'react-grid-layout';
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
        overflow: 'hidden',
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
        gap: '5px',
        padding: '5px',
    },
    colorInput: {
        width: "100%",
        borderRadius: "4px",
        height: "35px",
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        cursor: 'pointer',
        // background: 'red',
        color: 'white',
        border: 'none',
        padding: '2px 6px',
        fontSize: '16px',
        lineHeight: '16px',
    },
});

 export const Background: UserComponent<BackgroundProps> = ({ backgroundColor, rows, columns }) => {
    const { connectors: { connect, drag } } = useNode();
    const classes = useStyles();
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const [items, setItems] = useState<Layout[]>([]);

    const ReactiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

    useEffect(() => {
        const newItems = Array.from({ length: rows * columns }, (_, i) => ({
            i: i.toString(),
            x: i % columns,
            y: Math.floor(i / columns),
            w: 1,
            h: 1,
            maxH: columns,
            maxW: rows
        }));
        setItems(newItems);
    }, [rows, columns]);

    const onRemoveItem = (i: string) => {
        setItems(prevItems => prevItems.filter((item) => item.i !== i));
    };

    const onLayoutChange = (layout: Layout[]) => {
        setItems(layout.map((l) => ({
            i: l.i,
            x: l.x,
            y: l.y,
            w: l.w,
            h: l.h,
            maxH: columns,
            maxW: rows
        })));
    };

    const createElement = (el: Layout) => (
        <div key={el.i} data-grid={el} className={classes.gridCell}>
            <Element id={el.i} is={Container} canvas />
            <span
                className={classes.removeButton}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemoveItem(el.i);
                }}
            >
                x
            </span>
        </div>
    );

    const memoizedItems = useMemo(() => items.map(el => createElement(el)), [items]);

    return (
        <Card
            appearance='filled'
            ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                    connect(drag(ref));
                    backgroundRef.current = ref;
                }
            }}
            className={classes.background}
            style={{ backgroundColor }}
        >
            <ReactiveGridLayout
                className="layout"
                layout={items}
                rowHeight={150}
                maxRows={rows}
                isResizable={true}
                isDraggable={true}
                compactType={'horizontal'}
                preventCollision={false}
                onLayoutChange={onLayoutChange}
                cols={columns}
            >
                {memoizedItems}
            </ReactiveGridLayout>
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
