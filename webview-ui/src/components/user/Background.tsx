import React, { ReactNode, FC } from 'react';
import { Card, Label, makeStyles } from '@fluentui/react-components';
import { useNode, UserComponent } from "@craftjs/core";

interface BackgroundProps {
    children?: ReactNode;
    backgroundColor: string;
}

const useStyles = makeStyles({
    background: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        width: '100%',
        height: '100%',
        gap: '0px',
    },
    gridCell: {
        border: '1px dashed #666666',
        // minHeight: '100px', // Adjust this height as needed
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        // backgroundColor: 'transparent',
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

export const Background: UserComponent<BackgroundProps> = ({ backgroundColor }) => {
    const { connectors: { connect, drag } } = useNode();
    const classes = useStyles();

    return (
        <Card appearance='filled' ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} className={classes.background} style={{ backgroundColor }}>
            {[...Array(9)].map((_, index) => (
                <div key={index} className={classes.gridCell}>
                    {/* Empty grid cell */}
                </div>
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
        </div>
    );
};



export const BackgroundDefaultProps: BackgroundProps = {
    backgroundColor: '#292929',
}

Background.craft = {
    displayName: "Background",
    props: BackgroundDefaultProps,
    related: {
        settings: BackgroundSettings
    }
};
