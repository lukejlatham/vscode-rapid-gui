import React from 'react';
import ComponentLibrary from "../../components/ComponentLibrary";
import { Editor, Frame, Element } from "@craftjs/core";
import { Label } from "../../components/user/Label";
import { Container } from '../../components/user/Container';
import { Button } from '../../components/user/Button';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Rows, Row } from '../../components/user/Rows';
import { Columns, Column } from '../../components/user/Columns';
import { TextBox } from '../../components/user/TextBox';
import { Image } from '../../components/user/Image';
import { Background, BackgroundDefaultProps } from '../../components/user/Background';
import PropertyInspector from '../../components/PropertyInspector';
import { vscode } from '../../utilities/vscode';
import path from 'path';
import * as fs from 'fs';
import { useLocation } from 'react-router-dom';

const projectDir = path.join(vscode.getState()?.workspace?.uri.fsPath, "projects");

const loadProject = (projectName: string) => {
    const projectPath = path.join(projectDir, projectName, 'empty.json');
    if (fs.existsSync(projectPath)) {
        const data = fs.readFileSync(projectPath, 'utf8');
        return JSON.parse(data);
    }
    return null;
};

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
        background: '#333', // Just to visualize the area
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
    const {state } = useLocation();
    const projectName = state?.projectName;
    const [initialData, setInitialData] = React.useState(null);
    const { actions, query } = useEditor();

    React.useEffect(() => {
        if (projectName) {
            const data = loadProject(projectName);
            if (data) {
                setInitialData(data);
            }
        }
    }, [projectName]);
    
    const classes = useStyles();
    return (
        <Editor resolver={{ Background, Label, Container, Button, Rows, Row, Column, Columns, TextBox, Image }}>
            <div className={classes.mainLayout}>
                <div className={classes.componentLibrary}>
                    <ComponentLibrary />
                </div>
                <div>
                    <Frame>
                        <Element is={Background} id="background" {...BackgroundDefaultProps}>
                        <Element is={Container} id="root" canvas>
                            {/* Your editable components go here */}
                        </Element>
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
