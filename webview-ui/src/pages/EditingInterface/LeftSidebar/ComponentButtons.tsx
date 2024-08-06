import React from 'react';
import { Button, Divider, makeStyles } from "@fluentui/react-components";
import { useEditor, Element } from "@craftjs/core";
import { Label, LabelDefaultProps } from '../../../components/user/Label';
import { Button as UserButton, ButtonDefaultProps } from "../../../components/user/Button";
import { TextBox, TextBoxDefaultProps } from '../../../components/user/TextBox';
import { Image, ImageDefaultProps } from '../../../components/user/Image';
import { Input, InputDefaultProps } from '../../../components/user/Input';
import { RadioButton, RadioButtonDefaultProps } from '../../../components/user/RadioButton';
import { Checkbox, CheckboxDefaultProps } from '../../../components/user/Checkbox';
import { Icon, IconDefaultProps } from '../../../components/user/Icon';
import { EditBackgroundButton } from '../../../components/EditBackgroundButton';
import { Text, TextDefaultProps } from '../../../components/user/Text';
import { Dropdown, DropdownDefaultProps } from '../../../components/user/Dropdown';
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
    RadioButtonFilled,
    CheckboxCheckedFilled,
    CheckboxCheckedRegular,
    EmojiRegular,
    SlideTextRegular,
    CardUiRegular,
    TextBulletListCheckmarkFilled
} from '@fluentui/react-icons';
import { Container, ContainerDefaultProps } from '../../../components/user/Container';

const ButtonIcon = bundleIcon(Button20Filled, Button20Regular);
const LabelIcon = bundleIcon(TextT24Regular, TextT24Regular);
const ImageIcon = bundleIcon(Image24Regular, Image24Regular);
const TextBoxIcon = bundleIcon(TextboxRegular, TextboxRegular);
const InputIcon = bundleIcon(Password24Regular, Password24Filled);
const CheckboxIcon = bundleIcon(CheckboxCheckedFilled, CheckboxCheckedRegular);
const TextIcon = bundleIcon(SlideTextRegular, SlideTextRegular);

const ComponentButtons: React.FC<{ classes: any }> = ({ classes }) => {
    const { connectors } = useEditor();

    return (
        <>
            <Button 
            className={classes.button} icon={<ButtonIcon />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <UserButton {...ButtonDefaultProps} />);
                }
            }}>Button</Button>
            <Button className={classes.button} icon={<ImageIcon />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Image {...ImageDefaultProps} />);
                }
            }}>Image</Button>
            <Button className={classes.button} icon={<TextBoxIcon />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <TextBox {...TextBoxDefaultProps} />);
                }
            }}>Text Box</Button>
            <Button className={classes.button} icon={<LabelIcon />} size='large' appearance='outline'  ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Label {...LabelDefaultProps} />);
                }
            }}>Label</Button>
            <Button className={classes.button} icon={<InputIcon />} size='large' appearance='outline'  ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Input {...InputDefaultProps} />);
                }
            }}>Text Input</Button>
            <Button className={classes.button} icon={<TextIcon />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Text {...TextDefaultProps} />);
                }
            }}>Paragraph</Button>
            <Button className={classes.button} icon={<RadioButtonFilled />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <RadioButton {...RadioButtonDefaultProps} />);
                }
            }}>Radio Buttons</Button>
            <Button className={classes.button} icon={<CheckboxIcon />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Checkbox {...CheckboxDefaultProps} />);
                }
            }}>Checkbox</Button>
            <Button className={classes.button} icon={<TextBulletListCheckmarkFilled />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Dropdown {...DropdownDefaultProps} />);
                }
            }}>Dropdown</Button>
            <Button className={classes.button} icon={<EmojiRegular />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Icon {...IconDefaultProps} />);
                }
            }}>Icon</Button>
            <Button className={classes.button} icon={<CardUiRegular />} size='large' appearance='outline' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Element is={Container} {...ContainerDefaultProps} canvas />);
                }
            }}>Container</Button>
            <Divider className={classes.divider}> Layout </Divider>
            <EditBackgroundButton classes={classes}/>
        </>
    );
};

export default ComponentButtons;
