import React from 'react';
import { Button, Divider } from "@fluentui/react-components";
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
import { Slider, SliderDefaultProps } from '../../../components/user/Slider';
import { LockGridSwitch } from '../../../components/LockGridSwitch';
import {
    Image24Regular,
    TextboxRegular,
    bundleIcon,
    Button20Regular,
    Button20Filled,
    TextT24Regular,
    Password24Regular,
    Password24Filled,
    RadioButtonFilled,
    CheckboxCheckedFilled,
    CheckboxCheckedRegular,
    EmojiRegular,
    SlideTextRegular,
    TextAlignLeftFilled,
    CardUiRegular,
    TextBulletListCheckmarkFilled,
    OptionsRegular
} from '@fluentui/react-icons';
import { Container, ContainerDefaultProps } from '../../../components/user/Container';

const ButtonIcon = bundleIcon(Button20Filled, Button20Regular);
const LabelIcon = bundleIcon(TextT24Regular, TextT24Regular);
const ImageIcon = bundleIcon(Image24Regular, Image24Regular);
const TextBoxIcon = bundleIcon(TextboxRegular, TextboxRegular);
const InputIcon = bundleIcon(Password24Regular, Password24Filled);
const CheckboxIcon = bundleIcon(CheckboxCheckedFilled, CheckboxCheckedRegular);
// const TextIcon = bundleIcon(SlideTextRegular, SlideTextRegular);

const ComponentButtons: React.FC<{ classes: any }> = ({ classes }) => {
    const { connectors } = useEditor();

    return (
        <div className={classes.componentRoot}>
            <Button 
            className={classes.componentButtons} icon={<ButtonIcon />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <UserButton {...ButtonDefaultProps} />);
                }
            }}>Button</Button>
            <Button className={classes.componentButtons} icon={<LabelIcon />} size='large' appearance='secondary'  ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Label {...LabelDefaultProps} />);
                }
            }}>Label</Button>               
            <Button className={classes.componentButtons} icon={<InputIcon />} size='large' appearance='secondary'  ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Input {...InputDefaultProps} />);
                }
            }}>Single-Line Input</Button>
            <Button className={classes.componentButtons} icon={<TextBoxIcon />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <TextBox {...TextBoxDefaultProps} />);
                }
            }}>Multi-Line Input</Button>
            <Button className={classes.componentButtons} icon={<TextAlignLeftFilled />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Text {...TextDefaultProps} />);
                }
            }}>Paragraph</Button>
            <Button className={classes.componentButtons} icon={<ImageIcon />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Image {...ImageDefaultProps} />);
                }
            }}>Image</Button>
            <Button className={classes.componentButtons} icon={<RadioButtonFilled />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <RadioButton {...RadioButtonDefaultProps} />);
                }
            }}>Radio Buttons</Button>
            <Button className={classes.componentButtons} icon={<CheckboxIcon />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Checkbox {...CheckboxDefaultProps} />);
                }
            }}>Checkbox</Button>
            <Button className={classes.componentButtons} icon={<TextBulletListCheckmarkFilled />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Dropdown {...DropdownDefaultProps} />);
                }
            }}>Dropdown</Button>
            <Button className={classes.componentButtons} icon={<OptionsRegular />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Slider {...SliderDefaultProps} />);
                }
            }}>Slider</Button>
            <Button className={classes.componentButtons} icon={<EmojiRegular />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Icon {...IconDefaultProps} />);
                }
            }}>Icon</Button>
            <Button className={classes.componentButtons} icon={<CardUiRegular />} size='large' appearance='secondary' ref={ref => {
                if (ref !== null) {
                    connectors.create(ref, <Element is={Container} {...ContainerDefaultProps} canvas />);
                }
            }}>Container</Button>
            <Divider> Layout </Divider>
            <EditBackgroundButton classes={classes}/>
            <div className={classes.switchContainer}>
            <LockGridSwitch />
            </div>
        </div>
    );
};

export default ComponentButtons;
