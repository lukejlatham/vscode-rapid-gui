import React, { useEffect, useState } from "react";
import { useEditor } from "@craftjs/core";
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

export const BackgroundSettings: React.FC = () => {
  const {
    query,
    actions: { setProp },
  } = useEditor();
  const props = query.node("ROOT").get().data.props as BackgroundProps;

  const nodeID = query.node("ROOT").get().id;
  const styles = usePropertyInspectorStyles();

  const contentId = useId("content");
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

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

  const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
    setVisibleTooltip(isVisible ? tooltipKey : null);
  };

  // New logic for adding a grid cell and disabling the button if no space is available
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    checkSpaceAvailability();
  }, [props.layout, props.columns, props.rows]);

  const checkSpaceAvailability = () => {
    let isSpaceAvailable = false;
    for (let y = 0; y < props.rows; y++) {
      for (let x = 0; x < props.columns; x++) {
        const overlappingCells = (props.layout as Layout[]).some((item: Layout) => {
          const isOverlapping =
            x < item.x + item.w && x + 1 > item.x && y < item.y + item.h && y + 1 > item.y;
          return isOverlapping;
        });
        if (!overlappingCells) {
          isSpaceAvailable = true;
          break;
        }
      }
      if (isSpaceAvailable) {
        break;
      }
    }
    setIsDisabled(!isSpaceAvailable);
  };
  const handleAddGridCell = () => {
    setProp(nodeID, (props: BackgroundProps) => {
      let newY = 0;
      let newX = 0;
      let foundSpot = false;
      // Set the desired width and height for the new grid cell
      const newCellWidth = 1; // Example value, change as needed
      const newCellHeight = 1; // Example value, change as needed
      for (let y = 0; y <= props.rows - newCellHeight; y++) {
        for (let x = 0; x <= props.columns - newCellWidth; x++) {
          const overlappingCells = (props.layout as Layout[]).some((item: Layout) => {
            const isOverlapping =
              x < item.x + item.w &&
              x + newCellWidth > item.x &&
              y < item.y + item.h &&
              y + newCellHeight > item.y;
            return isOverlapping;
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
              min={1}
              defaultValue={props[tooltip.propKey as keyof typeof props]}
              onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                const value = data.value ? data.value : 0;
                setProp(nodeID, (props: BackgroundProps) => {
                  (props[tooltip.propKey as keyof BackgroundProps] as number) = value;
                });
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
          disabled={isDisabled}>
          Add Grid Cell
        </Button>
      </div>
    </div>
  );
};
