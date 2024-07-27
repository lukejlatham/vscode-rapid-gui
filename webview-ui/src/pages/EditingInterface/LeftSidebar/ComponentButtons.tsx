import React from 'react';
import { Button, Divider } from "@fluentui/react-components";
import { useEditor } from "@craftjs/core";
import { Label, LabelDefaultProps } from '../../../components/user/Label';
import { Button as UserButton, ButtonDefaultProps } from "../../../components/user/Button";
import { Rows } from '../../../components/user/Rows';
import { Columns } from '../../../components/user/Columns';
import { TextBox, TextBoxDefaultProps } from '../../../components/user/TextBox';
import { Image, ImageDefaultProps } from '../../../components/user/Image';
import { UserInput, InputDefaultProps } from '../../../components/user/Input';
import { RadioButton, RadioButtonDefaultProps } from '../../../components/user/RadioButton';
import {
    Image24Regular,
    TextboxRegular,
    bundleIcon,
    Button20Regular,
    Button20Filled,
    TextT24Regular,
    LayoutRowTwoRegular,
    LayoutColumnTwoRegular,
    Password24Regular,
    Password24Filled,
    RadioButtonFilled
} from '@fluentui/react-icons';

const ButtonIcon = bundleIcon(Button20Filled, Button20Regular);
const LabelIcon = bundleIcon(TextT24Regular, TextT24Regular);
const ImageIcon = bundleIcon(Image24Regular, Image24Regular);
const TextIcon = bundleIcon(TextboxRegular, TextboxRegular);
const InputIcon = bundleIcon(Password24Regular, Password24Filled);

const ComponentButtons: React.FC<{ classes: any }> = ({ classes }) => {
    const { connectors } = useEditor();

    return (
        <>
            <Button icon={<ButtonIcon />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <UserButton {...ButtonDefaultProps} />);
                }
            }}>Button</Button>
            <Button icon={<ImageIcon />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Image {...ImageDefaultProps} />);
                }
            }}>Image</Button>
            <Button icon={<TextIcon />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <TextBox {...TextBoxDefaultProps} />);
                }
            }}>TextBox</Button>
            <Button icon={<LabelIcon />} size='large' appearance='outline'  ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Label {...LabelDefaultProps} />);
                }
            }}>Label</Button>
            <Button icon={<InputIcon />} size='large' appearance='outline'  ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <UserInput {...InputDefaultProps} />);
                }
            }}>Input</Button>
            <Button icon={<RadioButtonFilled />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <RadioButton {...RadioButtonDefaultProps} />);
                }
            }}>Radio Buttons</Button>
            <Divider className={classes.divider}> Layout </Divider>
            <Button icon={<LayoutRowTwoRegular />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Rows />);
                }
            }}>Rows</Button>
            <Button icon={<LayoutColumnTwoRegular />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Columns />);
                }
            }}>Columns</Button>
        </>
    );
};

export default ComponentButtons;
