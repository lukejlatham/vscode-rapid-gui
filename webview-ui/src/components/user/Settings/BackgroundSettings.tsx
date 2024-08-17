import React, { useEffect, useState, useCallback } from "react";
import { useEditor, useNode } from "@craftjs/core";
import { BackgroundProps } from "../../../types";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import {
  SpinButton,
  SpinButtonChangeEvent,
  SpinButtonOnChangeData,
  Label,
  Input,
  Button,
  useId,
  Tooltip,
  mergeClasses,
} from "@fluentui/react-components";
import { Info16Regular, AddSquareRegular } from "@fluentui/react-icons";
import { Layout } from "react-grid-layout";
import { stat } from "fs";

export const BackgroundSettings: React.FC = () => {
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  const [canAddGridCells, setCanAddGridCells] = useState(false);
  const [canChangeRowsDown, setCanChangeRowsDown] = useState(true);
  const [canChangeColumnsDown, setCanChangeColumnsDown] = useState(true);
  const {
    props,

    actions: { setProp },
  } = useEditor((state) => ({
    props: state.nodes["ROOT"].data.props as BackgroundProps,
  }));

  const nodeID = "ROOT";

  const styles = usePropertyInspectorStyles();

  const contentId = useId("content");

  const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
    setVisibleTooltip(isVisible ? tooltipKey : null);
  };

  const tooltips = [
    {
      label: "Background Color",
      content: "Change the color of the background.",
      propKey: "backgroundColor",
      type: "color",
    },
    {
      label: "Rows",
      content: "Change the number of rows in the grid.",
      propKey: "rows",
      type: "spinButton",
    },
    {
      label: "Columns",
      content: "Change the number of columns in the grid.",
      propKey: "columns",
      type: "spinButton",
    },
  ];

  const checkConditions = useCallback(() => {
    let isSpaceAvailable = false;
    let canReduceRows = true;
    let canReduceColumns = true;

    for (let y = 0; y < props.rows; y++) {
      for (let x = 0; x < props.columns; x++) {
        const overlappingCells = props.layout.some((item: Layout) => {
          return x < item.x + item.w && x + 1 > item.x && y < item.y + item.h && y + 1 > item.y;
        });

        if (!overlappingCells) {
          isSpaceAvailable = true;
        }
      }
    }

    // Check if reducing rows is possible
    canReduceRows = props.layout.every((item: Layout) => {
      return item.y + item.h <= props.rows;
    });

    // Check if reducing columns is possible
    canReduceColumns = props.layout.every((item: Layout) => {
      return item.x + item.w <= props.columns;
    });

    setCanAddGridCells(isSpaceAvailable);
    setCanChangeRowsDown(canReduceRows);
    setCanChangeColumnsDown(canReduceColumns);
  }, [props.layout, props.columns, props.rows]);

  useEffect(() => {
    checkConditions();
  }, [checkConditions, props.layout]);

  const handleAddGridCell = () => {
    setProp(nodeID, (props: BackgroundProps) => {
      let newY = 0;
      let newX = 0;
      let foundSpot = false;
      const newCellWidth = 1;
      const newCellHeight = 1;

      for (let y = 0; y <= props.rows - newCellHeight; y++) {
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
            break;
          }
        }
        if (foundSpot) {
          break;
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

  const handleRowChange = (event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
    const newValue = data.value ? data.value : 0;

    if (canChangeRowsDown) {
      setProp(nodeID, (props: BackgroundProps) => {
        props.rows = newValue;
      });
    } else {
      console.warn("Cannot reduce rows because it would remove existing cells.");
    }
  };

  const handleColumnChange = (event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
    const newValue = data.value ? data.value : 0;

    if (canChangeColumnsDown) {
      setProp(nodeID, (props: BackgroundProps) => {
        props.columns = newValue;
      });
    } else {
      console.warn("Cannot reduce columns because it would remove existing cells.");
    }
  };

  return (
    <div className={styles.settingsContainer}>
      {tooltips.map((tooltip, index) => (
        <div key={index}>
          <div
            aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined}
            className={styles.label}>
            <Label>{tooltip.label}</Label>
            <Tooltip
              content={{
                children: tooltip.content,
                id: contentId,
              }}
              positioning="above-start"
              withArrow
              relationship="label"
              onVisibleChange={(e, data) => handleVisibilityChange(tooltip.propKey, data.visible)}>
              <Info16Regular
                tabIndex={0}
                className={mergeClasses(visibleTooltip === tooltip.propKey && styles.visible)}
              />
            </Tooltip>
          </div>
          {tooltip.type === "color" ? (
            <input
              className={styles.colorInput}
              type="color"
              defaultValue={props.backgroundColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProp(nodeID, (props: BackgroundProps) => {
                  props.backgroundColor = e.target.value;
                })
              }
            />
          ) : tooltip.type === "spinButton" ? (
            <SpinButton
              className={styles.spinButton}
              min={tooltip.propKey === "rows" ? 1 : 1}
              max={
                tooltip.propKey === "rows"
                  ? canChangeRowsDown
                    ? undefined
                    : props.rows
                  : canChangeColumnsDown
                  ? undefined
                  : props.columns
              }
              defaultValue={props[tooltip.propKey as keyof typeof props]}
              onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                if (tooltip.propKey === "rows") {
                  handleRowChange(event, data);
                } else if (tooltip.propKey === "columns") {
                  handleColumnChange(event, data);
                }
              }}
            />
          ) : (
            tooltip.type === "text" && (
              <Input
                className={styles.textInput}
                type="text"
                defaultValue={props[tooltip.propKey as keyof typeof props]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProp(nodeID, (props: BackgroundProps) => {
                    (props[tooltip.propKey as keyof BackgroundProps] as string) = e.target.value;
                  });
                }}
              />
            )
          )}
        </div>
      ))}
      <div className={styles.addAndLockButtons}>
        <Button
          icon={<AddSquareRegular />}
          size="large"
          onClick={handleAddGridCell}
          disabled={!canAddGridCells}>
          Add Grid Cell
        </Button>
      </div>
    </div>
  );
};
