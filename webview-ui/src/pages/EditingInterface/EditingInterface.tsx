import React from 'react';
import ComponentLibrary from "../../components/ComponentLibrary";
import { Editor, Frame, Element } from "@craftjs/core";
import { Label } from "../../components/user/Label";
import { Canvas } from "../../components/user/Canvas";
import { Container } from '../../components/user/Container';
import { Button } from '../../components/user/Button';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Rows, Row } from '../../components/user/Rows';
import { Columns, Column } from '../../components/user/Columns';
import PropertyInspector from '../../components/PropertyInspector';


const useStyles = makeStyles({
    mainLayout: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    canvas: {
        flexGrow: 2, /* Take up remaining space */
        ...shorthands.padding('20px'),
    },
    propertyInspector: {
        flexGrow: 1,
        ...shorthands.padding('20px'),
    },
});


const EditingInterface: React.FC = () => {
    const classes = useStyles();
    return (
        <Editor resolver={{ Label, Canvas, Container, Button, Rows, Row, Column, Columns }}>
            <div className={classes.mainLayout}>
                <ComponentLibrary />
                <div className={classes.canvas}>
                    <Frame>
                        <Element is={Canvas} canvas>
                            {/* <Text fontSize="small" text="Hi world!" /> */}
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