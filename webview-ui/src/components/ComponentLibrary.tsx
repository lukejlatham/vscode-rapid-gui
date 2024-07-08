import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    makeStyles,
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
    LayoutColumnTwoRegular
} from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { Label, LabelDefaultProps } from './user/Label';
import { Button as UserButton, ButtonDefaultProps } from "./user/Button";
import { Rows } from './user/Rows';
import { Columns } from './user/Columns';

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
        borderRight: '1px solid #3C3E44',
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

const ButtonIcon = bundleIcon(Button20Filled, Button20Regular);
const LabelIcon = bundleIcon(TextT24Regular, TextT24Regular);
const ImageIcon = bundleIcon(Image24Regular, Image24Regular);
const TextIcon = bundleIcon(TextboxRegular, TextboxRegular);
const BackButtonIcon = bundleIcon(ArrowLeft24Filled, ArrowLeft24Regular);

const ComponentLibrary: React.FC = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const { connectors, query } = useEditor();

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
                <div style={{ paddingTop: "20px", textAlign: "center"}}><Subtitle2>Component Library</Subtitle2></div>
                {/* <div style={{display:"grid", gridTemplateColumns: 'auto auto'}}> */}
                <Divider style={{flexGrow: "0"}}/>
                <Button icon={<ButtonIcon />} appearance='outline' ref={ref => {
                    if (ref !== null) {
                        connectors.create(ref, <UserButton 
                            {...ButtonDefaultProps}/>);
                    }
                }}>Button</Button>
                <Button icon={<ImageIcon />} appearance='outline'>Image</Button>
                <Button icon={<TextIcon />} appearance='outline'>TextBox</Button>
                <Button
                    appearance='outline'
                    icon={<LabelIcon />}
                    ref={ref => {
                        if (ref !== null) {
                            connectors.create(ref,
                                <Label
                                    {...LabelDefaultProps}
                                    text="Hi"
                                />
                            );
                        }
                    }}
                >
                    Label
                </Button>
                {/* </div> */}
                    <Divider style={{flexGrow: "0"}}>Layout</Divider>
                    {/* <div style={{display:"grid", gridTemplateColumns: 'auto auto'}}> */}
                    <Button icon={<LayoutRowTwoRegular />} appearance='outline' ref={ref => {
                        if (ref !== null) {
                            connectors.create(ref, <Rows/>);
                        }
                    }}>Rows</Button>
                    <Button icon={<LayoutColumnTwoRegular />} appearance='outline' ref={ref => {
                        if (ref !== null) {
                            connectors.create(ref, <Columns/>);
                        }
                    }}>Columns</Button>
                {/* </div> */}
            </div>
        </>
    );
};

export default ComponentLibrary;