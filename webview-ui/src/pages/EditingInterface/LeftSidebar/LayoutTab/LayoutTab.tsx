import React from "react";
import { GridSizeSelector } from "./GridRowsColumnsSelector"; // Adjust the import path as necessary
import { AddGridItemButton } from "./AddGridItemButton"; // Adjust the import path as necessary
import {
  Body2,
  Caption1,
  makeStyles,
  Breadcrumb,
  BreadcrumbItem,
} from "@fluentui/react-components";
import { GridVisibilityToggle } from "./GridVisibilityToggle";
import { FormattedMessage } from "react-intl";

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
          <Body2>
            {/* Grid Editable */}
            <FormattedMessage id="leftSidebar.layout.breadcrumb" defaultMessage="Grid Editable" />
            </Body2>
        </BreadcrumbItem>
      </Breadcrumb>
      <Caption1 className={styles.caption}>
        <FormattedMessage
          id="leftSidebar.layout.caption"
          defaultMessage="Drag cells to reposition and drag cell corners to resize"
        />
      </Caption1>
      <GridSizeSelector />
      <AddGridItemButton />
      <GridVisibilityToggle />
    </div>
  );
};

export default LayoutManagement;
