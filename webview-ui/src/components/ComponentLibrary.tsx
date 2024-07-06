import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Label,
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
        borderRight: '1px solid #e0e0e0',
        paddingRight: '30px',
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
const IconIcon = bundleIcon(ImageCircle24Filled, ImageCircle24Regular);
const TextIcon = bundleIcon(TextAlignLeft20Filled, TextAlignLeft20Filled);
const CanvasIcon = bundleIcon(Square24Regular, Square24Regular);
const BackButtonIcon = bundleIcon(ArrowLeft24Filled, ArrowLeft24Regular);

const ComponentLibrary: React.FC = () => {
    const styles = useStyles();
    const navigate = useNavigate();

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
                <div style={{ paddingTop: "20px" }}><Subtitle2>Component Library</Subtitle2></div>
                <div className={styles.component}>
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
                </div>
                <div className={styles.component}>
                    <TextIcon />
                    <Label>Text</Label>
                </div>
                <div>
                <Divider />
                <div className={styles.component}>
                    <CanvasIcon />
                    <Label>Canvas</Label>
                </div>
                </div>
            </div>
        </>
    );
};

export default ComponentLibrary;