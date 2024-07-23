import React, { ReactNode, FC } from 'react';
import { Card, Label, makeStyles, Button, Input } from '@fluentui/react-components';
import { useNode, UserComponent, Element } from "@craftjs/core";
import { Container } from './Container';

interface BackgroundProps {
    backgroundColor: string;
    rows: number;
    columns: number;
    // children?: ReactNode;
}

const useStyles = makeStyles({
    background: {
        display: 'grid',
        width: '100%',
        height: '100%',
        gap: '0px',
    },
    gridCell: {
        border: '1px dashed #666666',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
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
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }
});

export const Background: UserComponent<BackgroundProps> = ({ backgroundColor, rows, columns }) => {
    const { connectors: { connect, drag } } = useNode();
    const classes = useStyles();

    const gridTemplateColumns = `repeat(${columns}, 1fr)`;
    const gridTemplateRows = `repeat(${rows}, 1fr)`;

    return (
        <Card appearance='filled' ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} className={classes.background} style={{ backgroundColor, gridTemplateColumns, gridTemplateRows }}>
            {[...Array(rows * columns)].map((_, index) => (
                <Element key={index} is={Container} id={`container-${index}`} canvas className={classes.gridCell} />
            ))}
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
