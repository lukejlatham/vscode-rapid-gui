import React from "react";
import { GridSizeSelector } from "./GridRowsColumnsSelector"; // Adjust the import path as necessary
import { AddGridItemButton } from "./AddGridItemButton"; // Adjust the import path as necessary
import { Subtitle2Stronger, Body2, Divider, Card, Caption1 } from "@fluentui/react-components";

const LayoutManagement: React.FC<{ classes: any }> = ({ classes }) => {
  return (
    <div className={classes.layoutManagement}>
        <Body2>Grid Editable </Body2>
        <Caption1>Drag cells to reposition and drag cell corners to resize</Caption1>
        {/* <Caption1>Drag cell corners to resize</Caption1> */}
      <GridSizeSelector />
      <AddGridItemButton />
    </div>
  );
};

export default LayoutManagement;
