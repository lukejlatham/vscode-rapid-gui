import React from "react";
import { GridSizeSelector } from "./GridRowsColumnsSelector"; // Adjust the import path as necessary
import { AddGridItemButton } from "./AddGridItemButton"; // Adjust the import path as necessary
import { Subtitle2Stronger, Body2 } from "@fluentui/react-components";

const LayoutManagement: React.FC<{ classes: any }> = ({ classes }) => {
  return (
    <div className={classes.layoutManagement}>
      <Subtitle2Stronger>Grid editable</Subtitle2Stronger>
      <Body2>Cells can be moved or resized</Body2>

      <GridSizeSelector />
      <AddGridItemButton />
    </div>
  );
};

export default LayoutManagement;
