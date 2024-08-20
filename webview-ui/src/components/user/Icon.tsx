import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import * as VscIcons from "react-icons/vsc";
import { IconProps, iconSchema } from "../../types";
import { IconSettings } from "./Settings/IconSettings";
import { useSelected } from "../../hooks/useSelected";

export const Icon: UserComponent<IconProps> = (props) => {
  const validatedProps = iconSchema.parse(props);
  const { vscIcon, iconSize, iconColor } = validatedProps;

  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const select = useSelected();

  // Fetch the icon component from VscIcons, defaulting to null if not found
  const IconComponent = VscIcons[vscIcon] as React.ComponentType<any> | undefined;

  if (!IconComponent) {
    console.warn(`Icon component for ${String(vscIcon)} is not a valid React component.`);
    return null; // Handle the case where the component doesn't exist
  }

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`${selected ? select.select : ""}`}>
      <IconComponent size={iconSize} style={{ color: iconColor }} />
    </div>
  );
};

export const IconDefaultProps = iconSchema.parse({});

Icon.craft = {
  displayName: "Icon",
  props: IconDefaultProps,
  related: {
    settings: IconSettings,
  },
};
