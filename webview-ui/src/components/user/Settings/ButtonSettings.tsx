import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import { ButtonProps, TooltipConfigButton as TooltipConfig } from "../../../types";
import { ComponentSettings } from "./ComponentSettings";
import {
  makeStyles,
  tokens,
  mergeClasses,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  SearchBox,
} from "@fluentui/react-components";
import * as VscIcons from "react-icons/vsc"; // Import all icons from VS Code Icons

const useStyles = makeStyles({
  iconGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
    maxHeight: "400px",
    overflowY: "auto",
  },
  iconButton: {
    "width": "50%",
    "height": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "border": `1px solid ${tokens.colorNeutralStroke1}`,
    "borderRadius": tokens.borderRadiusMedium,
    "cursor": "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  selectedIconButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  dialogButton: {
    marginTop: "10px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchbox: {
    width: "100%",
    marginBottom: "10px",
  },
});

export const ButtonSettings: React.FC = () => {
  const {
    props,
    actions: { setProp },
  } = useNode((node) => ({
    props: node.data.props as ButtonProps,
  }));

  const styles = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof VscIcons>(
    props.selectedIcon || "VscPrimitiveSquare"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleIconClick = (icon: keyof typeof VscIcons) => {
    setSelectedIcon(icon);
  };

  const handleConfirm = () => {
    setProp((props: any) => {
      props.selectedIcon = selectedIcon;
    });
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSearchChange = (event: any, data: any) => {
    setSearchQuery(data.value || "");
  };

  const filteredIcons = Object.keys(VscIcons).filter((icon) =>
    icon.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tooltips: TooltipConfig[] = [
    {
      label: "Font Color",
      content: "Change the color of the text on the button.",
      propKey: "fontColor",
      type: "color",
    },
    {
      label: "Background Color",
      content: "Change the color of the button.",
      propKey: "backgroundColor",
      type: "color",
    },
    {
      label: "Border Color",
      content: "Change the color of the border.",
      propKey: "bordercolor",
      type: "color",
    },
    {
      label: "Text",
      content: "Edit the text that appears in the button.",
      propKey: "text",
      type: "text",
    },
    {
      label: "Font Size",
      content: "Adjust the size of the text on the button.",
      propKey: "fontSize",
      type: "slider",
    },
    {
      label: "Border Radius",
      content: "Adjust how rounded the corners of the button are.",
      propKey: "borderRadius",
      type: "slider",
    },
    { label: "Width", content: "Set how wide the button is.", propKey: "width", type: "slider" },
    { label: "Height", content: "Set how tall the button is.", propKey: "height", type: "slider" },

    {
      label: "Shadow Color",
      content: "Change the color of the shadow.",
      propKey: "shadowColor",
      type: "color",
    },
    {
      label: "Shadow Offset X",
      content: "Set the horizontal offset of the shadow.",
      propKey: "shadowOffsetX",
      type: "slider",
    },
    {
      label: "Shadow Offset Y",
      content: "Set the vertical offset of the shadow.",
      propKey: "shadowOffsetY",
      type: "slider",
    },
    {
      label: "Shadow Blur",
      content: "Set the blur radius of the shadow.",
      propKey: "shadowBlur",
      type: "slider",
    },
    {
      label: "Hyperlink",
      content: "Add a hyperlink to the button.",
      propKey: "hyperlink",
      type: "text",
    },   
    {
      label: "Icon",
      content:
        "Add an icon to the button. Choosing 'Left' or 'Right' will add an icon at that position.",
      propKey: "iconPosition",
      type: "icon",
    },
  ];

  return (
    <div>
      <ComponentSettings componentProps={props} tooltips={tooltips} />

      <Button
        icon={React.createElement(VscIcons[selectedIcon])}
        className={styles.dialogButton}
        appearance="secondary"
        size="large"
        onClick={() => setIsOpen(true)}>
        Change Icon
      </Button>

      <Dialog open={isOpen} onOpenChange={(event, data) => setIsOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Select an Icon</DialogTitle>
            <DialogContent>
              <SearchBox
                className={styles.searchbox}
                size="large"
                placeholder="Search icons..."
                onChange={handleSearchChange}
              />
              <div className={styles.iconGrid}>
                {filteredIcons.map((icon) => {
                  const IconComponent = VscIcons[icon as keyof typeof VscIcons];
                  if (IconComponent && typeof IconComponent === "function") {
                    return (
                      <Button
                        size="large"
                        key={icon}
                        className={mergeClasses(
                          styles.iconButton,
                          selectedIcon === icon ? styles.selectedIconButton : ""
                        )}
                        onClick={() => handleIconClick(icon as keyof typeof VscIcons)}>
                        {React.createElement(IconComponent)}
                      </Button>
                    );
                  }
                  return null;
                })}
              </div>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button appearance="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default ButtonSettings;
