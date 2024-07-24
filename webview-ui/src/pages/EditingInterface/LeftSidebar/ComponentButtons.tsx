import React from 'react';
import { Button, Divider } from "@fluentui/react-components";
import { useEditor } from "@craftjs/core";
import { Label, LabelDefaultProps } from '../../../components/user/Label';
import { Button as UserButton, ButtonDefaultProps } from "../../../components/user/Button";
import { Rows } from '../../../components/user/Rows';
import { Columns } from '../../../components/user/Columns';
import { TextBox, TextBoxDefaultProps } from '../../../components/user/TextBox';
import { Image, ImageDefaultProps } from '../../../components/user/Image';
import {
    Image24Regular,
    TextboxRegular,
    bundleIcon,
    Button20Regular,
    Button20Filled,
    TextT24Regular,
    LayoutRowTwoRegular,
    LayoutColumnTwoRegular,
} from '@fluentui/react-icons';
import { Container } from '../../../components/user';

const ButtonIcon = bundleIcon(Button20Filled, Button20Regular);
const LabelIcon = bundleIcon(TextT24Regular, TextT24Regular);
const ImageIcon = bundleIcon(Image24Regular, Image24Regular);
const TextIcon = bundleIcon(TextboxRegular, TextboxRegular);

const ComponentButtons: React.FC<{ classes: any }> = ({ classes }) => {
    const { connectors } = useEditor();

    return (
        <>
            <Button icon={<ButtonIcon />} appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <UserButton {...ButtonDefaultProps} />);
                }
            }}>Button</Button>
            <Button icon={<ImageIcon />} appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Image {...ImageDefaultProps} />);
                }
            }}>Image</Button>
            <Button icon={<TextIcon />} appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <TextBox {...TextBoxDefaultProps} />);
                }
            }}>TextBox</Button>
            <Button
                appearance='outline'
                icon={<LabelIcon />}
                ref={ref => {
                    if (ref !== null) {
                        connectors.create(ref, <Label {...LabelDefaultProps} />);
                    }
                }}
            >
                Label
            </Button>
            <Divider className={classes.divider}> Layout </Divider>
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
            <Button icon={<ButtonIcon />} appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Container />);
                }
            }
            }>Container</Button>
        </>
    );
};

export default ComponentButtons;
