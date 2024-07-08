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
    TextAlignLeft20Filled,
    Square24Regular,
    bundleIcon,
    Button20Regular,
    Button20Filled,
    TextT24Regular,
    ImageCircle24Filled,
    ImageCircle24Regular,
    ArrowLeft24Filled,
    ArrowLeft24Regular
} from '@fluentui/react-icons';
import { Element, useEditor } from "@craftjs/core";
import { Text } from "./user/Text";
import { Canvas } from "./user/Canvas";
import { Button as UserButton } from "./user/Button";

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
        borderRight: '1px solid #FFFFFF',
        paddingRight: '30px',
        gap: '10px',
    },
    header: {
        paddingTop: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    invisibleButton: {
        backgroundColor: 'inherit',
        border: 'none',
        padding: 0,
        margin: 0,
        cursor: 'pointer',
        // color: 'inherit'
    }
});

const ButtonIcon = bundleIcon(Button20Filled, Button20Regular);
const LabelIcon = bundleIcon(TextT24Regular, TextT24Regular);
const ImageIcon = bundleIcon(Image24Regular, Image24Regular);
const IconIcon = bundleIcon(ImageCircle24Filled, ImageCircle24Regular);
const TextIcon = bundleIcon(TextAlignLeft20Filled, TextAlignLeft20Filled);
const CanvasIcon = bundleIcon(Square24Regular, Square24Regular);
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
                        appearance="subtle"
                        aria-label="Close"
                        icon={<BackButtonIcon />}
                        onClick={() => navigate(-1)}
                    />
                    <Title3>Project Name</Title3>
                </div>
                <div style={{ paddingTop: "20px" }}>
                    <SearchBox placeholder="Search components" />
                </div>
                <div style={{ paddingTop: "20px"}}><Subtitle2>Component Library</Subtitle2></div>
                {/* <div className={styles.component}>
                    <ButtonIcon />
                    <Label>Button</Label>
                </div>
                <div className={styles.component}>
                    <LabelIcon />
                    <Label>Label</Label>
                </div>
                <div className={styles.component}>
                    <ImageIcon />
                    <Label>Image</Label>
                </div>
                <div className={styles.component}>
                    <IconIcon />
                    <Label>Icon</Label>
                </div> */}
                <Button icon={<ButtonIcon />} appearance='subtle' ref={ref => {
                    if (ref !== null) {
                        connectors.create(ref, <UserButton>Button</UserButton>);
                    }
                }}>Button</Button>
                <Button icon={<LabelIcon />} appearance='subtle'>Label</Button>
                <Button icon={<ImageIcon />} appearance='subtle'>Image</Button>
                <Button icon={<IconIcon />} appearance='subtle'>Icon</Button>
                <Button appearance='subtle' icon={<TextIcon />} ref={ref => {
                    if (ref !== null) {
                        connectors.create(ref, <Text fontSize="small" text="Hi world" />);
                    }
                }}>Text</Button>
                <div>
                    <Divider />
                    <Button icon={<CanvasIcon />} appearance='subtle' ref={ref => {
                    if (ref !== null) {
                        connectors.create(ref, <Element is={Canvas} padding={20} canvas />);
                    }
                }}>Canvas</Button>
                </div>
            </div>
        </>
    );
};

export default ComponentLibrary;