import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { makeStyles, Switch } from "@fluentui/react-components";
import { BackgroundProps } from "../../../../types";

const useGridVisibleStyles = makeStyles({
  GridVisible: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
  GridInvisible: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
});

export const GridVisibilityToggle: React.FC = () => {
  const styles = useGridVisibleStyles();
  const [GridVisible, setGridVisible] = useState(true);
  const {
    actions: { setProp },
  } = useEditor();

  const handleToggleGridVisibility = () => {
    setProp("ROOT", (props: BackgroundProps) => {
      props.visibleGrid = !props.visibleGrid;
    });
    setGridVisible(!GridVisible);
  };

  return (
    <div className={styles.GridVisible}>
      <Switch label="Grid Visible" checked={GridVisible} onChange={handleToggleGridVisibility} />
    </div>
  );
};
