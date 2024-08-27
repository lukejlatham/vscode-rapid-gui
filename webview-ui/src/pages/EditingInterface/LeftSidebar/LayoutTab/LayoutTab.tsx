import React from "react";
import { GridSizeSelector } from "./GridRowsColumnsSelector"; // Adjust the import path as necessary
import { AddGridItemButton } from "./AddGridItemButton"; // Adjust the import path as necessary
import {
  Subtitle2Stronger,
  Body2,
  Divider,
  Card,
  Caption1,
  makeStyles,
  Breadcrumb,
  BreadcrumbItem,
} from "@fluentui/react-components";
import { GridVisibilityToggle } from "./GridVisibilityToggle";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingBottom: "15px",
    width: "100%",
  },
  breadcrumb: {
    marginBottom: "2px",
    color: "#d6d6d6",
  },
  caption: {
    color: "#d6d6d6",
    marginBottom: "5px",
  },
});

const LayoutManagement: React.FC<{ classes?: any }> = ({ classes }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Breadcrumb className={styles.breadcrumb}>
        <BreadcrumbItem>
          <Body2>Grid Editable</Body2>
        </BreadcrumbItem>
      </Breadcrumb>
      <Caption1 className={styles.caption}>
        Drag cells to reposition and drag cell corners to resize
      </Caption1>
      <GridSizeSelector />
      <AddGridItemButton />
      <GridVisibilityToggle />
    </div>
  );
};

export default LayoutManagement;
