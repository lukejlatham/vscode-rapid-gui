import React from "react";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Body2,
  makeStyles,
  Caption1,
  tokens,
  useArrowNavigationGroup,
} from "@fluentui/react-components";
import { useEditor, Element } from "@craftjs/core";
import { Label, LabelDefaultProps } from "../../../../components/user/Label";
import { Button as UserButton, ButtonDefaultProps } from "../../../../components/user/Button";
import { TextBox, TextBoxDefaultProps } from "../../../../components/user/TextBox";
import { Image, ImageDefaultProps } from "../../../../components/user/Image";
import { Input, InputDefaultProps } from "../../../../components/user/Input";
import { RadioButtons, RadioButtonsDefaultProps } from "../../../../components/user/RadioButton";
import { Checkboxes, CheckboxesDefaultProps } from "../../../../components/user/Checkboxes";
import { Icon, IconDefaultProps } from "../../../../components/user/Icon";
import { Text, TextDefaultProps } from "../../../../components/user/Text";
import { Dropdown, DropdownDefaultProps } from "../../../../components/user/Dropdown";
import { Slider, SliderDefaultProps } from "../../../../components/user/Slider";
import { FormattedMessage } from "react-intl";
import {
  Image24Regular,
  TextboxRegular,
  bundleIcon,
  Button20Regular,
  Button20Filled,
  TextT24Regular,
  PasswordRegular,
  RadioButtonFilled,
  CheckboxCheckedFilled,
  CheckboxCheckedRegular,
  EmojiRegular,
  TextAlignLeftFilled,
  CardUiRegular,
  TextBulletListCheckmarkFilled,
  OptionsRegular
} from "@fluentui/react-icons";
import { Container, ContainerDefaultProps } from "../../../../components/user/Container";

const ButtonIcon = bundleIcon(Button20Filled, Button20Regular);
const LabelIcon = bundleIcon(TextT24Regular, TextT24Regular);
const ImageIcon = bundleIcon(Image24Regular, Image24Regular);
const TextBoxIcon = bundleIcon(TextboxRegular, TextboxRegular);
const CheckboxesIcon = bundleIcon(CheckboxCheckedFilled, CheckboxCheckedRegular);
// const TextIcon = bundleIcon(SlideTextRegular, SlideTextRegular);

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  fontPreview: {
    marginLeft: "10px",
  },
  select: {
    width: "100%",
  },
  breadcrumb: {
    marginBottom: "2px",
  },
  caption: {
    color: tokens.colorNeutralForeground2,
    marginBottom: "5px",
  },
  componentButtons: {
    cursor: "move !important",
  },
});

const ComponentButtons: React.FC<{ classes?: any }> = ({ classes }) => {
  const { connectors } = useEditor();
  const styles = useStyles();
  const attributes = useArrowNavigationGroup({ axis: "vertical" })

  return (
    <div className={styles.container} {...attributes}
    >
      <Breadcrumb className={styles.breadcrumb}>
        <BreadcrumbItem>
          <Body2>
            <FormattedMessage id="leftSidebar.components" defaultMessage="Components" />
          </Body2>
        </BreadcrumbItem>
      </Breadcrumb>
      <Caption1 className={styles.caption}>
        <FormattedMessage id="leftSidebar.components.caption" defaultMessage="Drag components onto grid cells to add them to the canvas" />
      </Caption1>
      <Button
        data-testid="button-button"
        className={styles.componentButtons}
        icon={<ButtonIcon />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <UserButton {...ButtonDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.button" defaultMessage="Button" />
      </Button>
      <Button
        data-testid="button-label"
        className={styles.componentButtons}
        icon={<LabelIcon />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Label {...LabelDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.label" defaultMessage="Label" />
      </Button>
      <Button
        data-testid="button-input"
        className={styles.componentButtons}
        icon={<PasswordRegular />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Input {...InputDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.singleLineInput" defaultMessage="Single-Line Input" />
      </Button>
      <Button
        data-testid="button-textbox"
        className={styles.componentButtons}
        icon={<TextBoxIcon />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <TextBox {...TextBoxDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.multiLineInput" defaultMessage="Multi-Line Input" />
      </Button>
      <Button
        data-testid="button-text"
        className={styles.componentButtons}
        icon={<TextAlignLeftFilled />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Text {...TextDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.paragraph" defaultMessage="Paragraph" />
      </Button>
      <Button
        data-testid="button-image"
        className={styles.componentButtons}
        icon={<ImageIcon />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Image {...ImageDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.image" defaultMessage="Image" />
      </Button>
      <Button
        data-testid="button-radio"
        className={styles.componentButtons}
        icon={<RadioButtonFilled />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <RadioButtons {...RadioButtonsDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.radio" defaultMessage="Radio Buttons" />
      </Button>
      <Button
        data-testid="button-checkbox"
        className={styles.componentButtons}
        icon={<CheckboxesIcon />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Checkboxes {...CheckboxesDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.checkboxes" defaultMessage="Checkboxes" />
      </Button>
      <Button
        data-testid="button-dropdown"
        className={styles.componentButtons}
        icon={<TextBulletListCheckmarkFilled />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Dropdown {...DropdownDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.dropdown" defaultMessage="Dropdown" />
      </Button>
      <Button
        data-testid="button-slider"
        className={styles.componentButtons}
        icon={<OptionsRegular />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Slider {...SliderDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.slider" defaultMessage="Slider" />
      </Button>
      <Button
        data-testid="button-icon"
        className={styles.componentButtons}
        icon={<EmojiRegular />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Icon {...IconDefaultProps} />);
          }
        }}>
        <FormattedMessage id="components.icon" defaultMessage="Icon" />
      </Button>
      <Button
        data-testid="button-container"
        className={styles.componentButtons}
        icon={<CardUiRegular />}
        size="medium"
        appearance="secondary"
        ref={(ref) => {
          if (ref !== null) {
            connectors.create(ref, <Element is={Container} {...ContainerDefaultProps} canvas />);
          }
        }}>
        <FormattedMessage id="components.container" defaultMessage="Container" />
      </Button>
    </div>
  );
};

export default ComponentButtons;
