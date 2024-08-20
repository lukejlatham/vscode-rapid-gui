import React from "react";
import { GridSizeSelector } from "./GridRowsColumnsSelector"; // Adjust the import path as necessary
import { AddGridItemButton } from "./AddGridItemButton"; // Adjust the import path as necessary
import { Subtitle2Stronger, Body2, Divider, Card } from "@fluentui/react-components";

const LayoutManagement: React.FC<{ classes: any }> = ({ classes }) => {
  return (
    <div className={classes.layoutManagement}>
      <Card className={classes.boxShadowAnimation}>
        <Subtitle2Stronger>Grid Editable </Subtitle2Stronger>
        <Body2>Drag cells to reposition</Body2>
        <Body2>Drag cell corners to resize</Body2>
      </Card>
      <GridSizeSelector />
      <AddGridItemButton />
    </div>
  );
};

export default LayoutManagement;
