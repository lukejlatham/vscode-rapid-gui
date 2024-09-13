import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { makeStyles, Switch } from "@fluentui/react-components";
import { BackgroundProps } from "../../../../types";
import { FormattedMessage } from "react-intl";

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleToggleGridVisibility();
    }
  }

  return (
    <div className={styles.GridVisible}>
      <Switch label={
        <FormattedMessage
          id="grid.toggle"
          defaultMessage="Grid Visible"
        />
      }
      checked={GridVisible} 
      onChange={handleToggleGridVisibility} 
      onKeyDown={handleKeyDown}
      />
    </div>
  );
};
