import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    OverlayDrawer,
    Label,
    makeStyles,
    Subtitle2,
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

    return (
        <>
            <OverlayDrawer
                as="aside"
                open={true}
            >
                <DrawerHeader>
                    <DrawerHeaderTitle action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<BackButtonIcon />}
                onClick={() => navigate(-1)}
              />
            }>
                        Project Name
                    </DrawerHeaderTitle>
                </DrawerHeader>
                <DrawerBody>
                    <div style={{paddingTop:"10px"}}>
                        <SearchBox placeholder="Search" />
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
                    <Divider />
                    <div className={styles.component}>
                        <CanvasIcon />
                        <Label>Canvas</Label>
                    </div>
                </DrawerBody>
            </OverlayDrawer>

        </>
    );
};

export default ComponentLibrary;