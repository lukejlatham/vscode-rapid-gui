import React from 'react';
import ComponentLibrary from "../../components/ComponentLibrary";
import { Editor, Frame, Element } from "@craftjs/core";
import { Label } from "../../components/user/Label";
import { Container } from '../../components/user/Container';
import { Button } from '../../components/user/Button';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Rows, Row } from '../../components/user/Rows';
import { Columns, Column } from '../../components/user/Columns';
import PropertyInspector from '../../components/PropertyInspector';

const useStyles = makeStyles({
    mainLayout: {
        display: 'flex',
        height: '95vh',
        width: '95vw', // Ensure it takes the full width of the window
    },
    componentLibrary: {
        flex: '0 0 200px', // Fixed width for the component library
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...shorthands.padding('0px'),
    },
    canvas: {
        flexGrow: 1, // Take up remaining space
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '3px',
        ...shorthands.padding('10px'),
        background: 'white', // Just to visualize the area
        overflow: 'none'
    },
    propertyInspector: {
        flex: '0 0 200px', // Fixed width for the property inspector
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.padding('10px'),
    },
});

const EditingInterface: React.FC = () => {
    const classes = useStyles();
    return (
        <Editor resolver={{ Label, Container, Button, Rows, Row, Column, Columns }}>
            <div className={classes.mainLayout}>
                <div className={classes.componentLibrary}>
                    <ComponentLibrary />
                </div>
                <div className={classes.canvas}>
                    <Frame>
                        <Element is={Container} id="root" canvas>
                            {/* Your editable components go here */}
                        </Element>
                    </Frame>
                </div>
                <div className={classes.propertyInspector}>
                    <PropertyInspector />
                </div>
            </div>
        </Editor>
    );
};

export default EditingInterface;
