import React, { useState, useEffect, useCallback } from "react";
import { useEditor } from "@craftjs/core";
import { Button } from "@fluentui/react-components";
import { AddSquareRegular } from "@fluentui/react-icons";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { BackgroundProps } from "../../../types";
import { Layout } from "react-grid-layout";

export const AddGridItemButton: React.FC = () => {
  const [canAddGridCells, setCanAddGridCells] = useState(false);

  const {
    props,
    actions: { setProp },
  } = useEditor((state) => ({
    props: state.nodes["ROOT"].data.props as BackgroundProps,
  }));

  const nodeID = "ROOT";
  const styles = usePropertyInspectorStyles();

  const checkConditions = useCallback(() => {
    let isSpaceAvailable = false;

    outerLoop: for (let y = 0; y < props.rows; y++) {
      for (let x = 0; x < props.columns; x++) {
        const overlappingCells = props.layout.some((item: Layout) => {
          return (
            x < item.x + item.w &&
            x + 1 > item.x &&
            y < item.y + item.h &&
            y + 1 > item.y
          );
        });
        if (!overlappingCells) {
          isSpaceAvailable = true;
          break outerLoop;
        }
      }
    }

    setCanAddGridCells(isSpaceAvailable);
  }, [props.layout, props.columns, props.rows]);

  useEffect(() => {
    checkConditions();
  }, [checkConditions, props.layout, props.columns, props.rows]);

  const handleAddGridCell = () => {
    setProp(nodeID, (props: BackgroundProps) => {
      let newY = 0;
      let newX = 0;
      let foundSpot = false;
      const newCellWidth = 1;
      const newCellHeight = 1;

      outerLoop: for (let y = 0; y <= props.rows - newCellHeight; y++) {
        for (let x = 0; x <= props.columns - newCellWidth; x++) {
          const overlappingCells = props.layout.some((item: Layout) => {
            return (
              x < item.x + item.w &&
              x + newCellWidth > item.x &&
              y < item.y + item.h &&
              y + newCellHeight > item.y
            );
          });
          if (!overlappingCells) {
            newX = x;
            newY = y;
            foundSpot = true;
            break outerLoop;
          }
        }
      }

      if (foundSpot) {
        const newItem: Layout = {
          i:
            props.layout.length > 0
              ? (parseInt(props.layout[props.layout.length - 1].i) + 1).toString()
              : "0",
          x: newX,
          y: newY,
          w: newCellWidth,
          h: newCellHeight,
          maxW: props.columns,
          maxH: props.rows,
        };
        props.layout = [...props.layout, newItem];
      }
    });
  };

  return (
    <div className={styles.addAndLockButtons}>
      <Button
        icon={<AddSquareRegular />}
        size="large"
        onClick={handleAddGridCell}
        disabled={!canAddGridCells}>
        Add Grid Cell
      </Button>
    </div>
  );
};