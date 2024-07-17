import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    makeStyles,
    useId,
    Toaster,
    useToastController,
    ToastTitle,
    Toast,
    ToastIntent,
    ToastBody,
    Subtitle2,
    Title3,
    Button,
    SearchBox,
    Divider
} from "@fluentui/react-components";
import {
    Image24Regular,
    TextboxRegular,
    bundleIcon,
    Button20Regular,
    Button20Filled,
    TextT24Regular,
    ArrowLeft24Filled,
    ArrowLeft24Regular,
    LayoutRowTwoRegular,
    LayoutColumnTwoRegular,
    ArrowHookUpLeft24Regular,
    ArrowHookUpRight24Regular,
    DocumentSave24Regular,
    Folder24Regular
} from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { Label, LabelDefaultProps } from './user/Label';
import { Button as UserButton, ButtonDefaultProps } from "./user/Button";
import { Rows } from './user/Rows';
import { Columns } from './user/Columns';
import { TextBox, TextboxDefaultProps } from './user/TextBox';
import { Image, ImageDefaultProps } from './user/Image';
import  SaveButton from './SaveButton';
import LoadButton from './LoadButton';
import testJSON from '../data/test3.json';
import { fstat } from 'fs';
import { vscode } from '../utilities/vscode';
import path from 'path';

const useStyles = makeStyles({
    component: {
        display: "flex",
        flexDirection: "row",
        paddingTop: "10px",
        paddingBottom: "10px",
        gap: "10px",
    },
    root: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',

        paddingRight: '20px',
        gap: '10px'
    },
    header: {
        paddingTop: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

const projectDir = path.join(vscode.getState()?.workspace?.uri.fsPath, "projects");

const saveProject = (projectName: string, editorState: any) => {
    const projectPath = path.join(projectDir, projectName, 'empty.json');
    const nodeTree = editorState.query.serialize();
    fs.writeFileSync(projectPath, JSON.stringify(nodeTree, null, 2));
    vscode.postMessage({ type: 'save', payload: { projectName, nodeTree } });
}

const ButtonIcon = bundleIcon(Button20Filled, Button20Regular);
const LabelIcon = bundleIcon(TextT24Regular, TextT24Regular);
const ImageIcon = bundleIcon(Image24Regular, Image24Regular);
const TextIcon = bundleIcon(TextboxRegular, TextboxRegular);
const BackButtonIcon = bundleIcon(ArrowLeft24Filled, ArrowLeft24Regular);

const ComponentLibrary: React.FC = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const { actions, canUndo, canRedo, connectors, query } = useEditor((_, query) => ({
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),
    }));

    // const saveToaster = useId("save-toaster");
    // const { dispatchToast: dispatchSaveToast } = useToastController(saveToaster);
    
    // const notifySaveSuccess = () =>
    //     dispatchSaveToast(
    //         <Toast>
    //             <ToastTitle>Project Saved Successfully</ToastTitle>
    //         </Toast>,
    //         { intent: "success" }
    //     );

    const handleUndo = () => {
        actions.history.undo()
    }

    const handleRedo = () => {
        actions.history.redo()
    }

    const handleSaveProject = () => {
        const projectName = vscode.getState()?.projectName;
        if (projectName) {
            saveProject(projectName, query);
        }
    };

    return (
        <>
            <div className={styles.root}>
                <div className={styles.header}>
                    <Button
                        appearance="outline"
                        aria-label="Close"
                        icon={<BackButtonIcon />}
                        onClick={() => navigate(-1)}
                    />
                    <Title3>Project Name</Title3>
                </div>
                <div style={{ paddingTop: "20px" }}>
                    <SearchBox placeholder="Search components" />
                </div>
                <div style={{ paddingTop: "20px", textAlign: "center" }}><Subtitle2>Component Library</Subtitle2></div>
                {/* <div style={{display:"grid", gridTemplateColumns: 'auto auto'}}> */}
                <Divider style={{ flexGrow: "0" }} />
                <Button icon={<ButtonIcon />} appearance='outline' ref={ref => {
                    if (ref !== null) {
                        connectors.create(ref, <UserButton
                            {...ButtonDefaultProps} />);
                    }
                }}>Button</Button>
                <Button icon={<ImageIcon />} appearance='outline'
                    ref={ref => {
                        if (ref !== null) {
                            connectors.create(ref,
                                <Image
                                    {...ImageDefaultProps}
                                />
                            );
                        }
                    }}>Image</Button>
                <Button icon={<TextIcon />} appearance='outline'
                    ref={ref => {
                        if (ref !== null) {
                            connectors.create(ref,
                                <TextBox
                                    {...TextboxDefaultProps}
                                />
                            );
                        }
                    }}>TextBox</Button>
                <Button
                    appearance='outline'
                    icon={<LabelIcon />}
                    ref={ref => {
                        if (ref !== null) {
                            connectors.create(ref,
                                <Label
                                    {...LabelDefaultProps}
                                />
                            );
                        }
                    }}
                >
                    Label
                </Button>
                {/* </div> */}
                <Divider style={{ flexGrow: "0" }}>Layout</Divider>
                {/* <div style={{display:"grid", gridTemplateColumns: 'auto auto'}}> */}
                <Button icon={<LayoutRowTwoRegular />} appearance='outline' ref={ref => {
                    if (ref !== null) {
                        connectors.create(ref, <Rows />);
                    }
                }}>Rows</Button>
                <Button icon={<LayoutColumnTwoRegular />} appearance='outline' ref={ref => {
                    if (ref !== null) {
                        connectors.create(ref, <Columns />);
                    }
                }}>Columns</Button>
                {/* </div> */}
                <div style={{ paddingTop: "20px", textAlign: "center" }}><Subtitle2>Project Management</Subtitle2></div>
                <Divider style={{ flexGrow: "0" }}></Divider>
                {/* <div style={{display:"grid", gridTemplateColumns: 'auto auto'}}> */}
                {/* <Toaster id={saveToaster} /> */}
                <Button onClick={handleSaveProject} icon={<DocumentSave24Regular />}>Save Project</Button>
                <SaveButton />
                <LoadButton />
                <Button icon={<ArrowHookUpRight24Regular />} appearance='outline' onClick={handleRedo}>Redo</Button>
                {canRedo}
                <Button icon={<ArrowHookUpLeft24Regular />} appearance='outline' onClick={handleUndo}>Undo</Button>
                {canUndo}
                <Toaster
                    toasterId={saveToaster}
                    position="bottom-end"
                    pauseOnHover
                    pauseOnWindowBlur
                    timeout={500}
                />
            </div>
        </>
    );
};

export default ComponentLibrary;
