import React, { useState, useEffect, useCallback } from "react";
import { useEditor } from "@craftjs/core";
import { SpinButton, Label, Tooltip, mergeClasses } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import { BackgroundProps } from "../../../types";
import { Layout } from "react-grid-layout";

const TooltipContent = ({ children, id }: { children: string; id: string }) => (
  <Tooltip
    content={{
      children,
      id,
    }}
    positioning="above-start"
    withArrow
    relationship="label"
  >
    <Info16Regular tabIndex={0} />
  </Tooltip>
);

const SizeControl = ({ 
  label, 
  tooltipContent, 
  value, 
  min, 
  onChange 
}: { 
  label: string; 
  tooltipContent: string; 
  value: number; 
  min: number; 
  onChange: (value: number) => void;
}) => {
  const styles = usePropertyInspectorStyles();

  return (
    <div>
      <div className={styles.label}>
        <Label>{label}</Label>
        <TooltipContent id={`${label.toLowerCase()}-tooltip`}>
          {tooltipContent}
        </TooltipContent>
      </div>
      <SpinButton
        className={styles.spinButton}
        min={min}
        max={100}
        value={value}
        onChange={(_, data) => onChange(data.value || 0)}
      />
    </div>
  );
};

export const GridSizeSelector: React.FC = () => {
  const {
    props,
    actions: { setProp },
  } = useEditor((state) => ({
    props: state.nodes["ROOT"].data.props as BackgroundProps,
  }));

  const isValidResize = useCallback((newRows: number, newColumns: number) => {
    // Add null check for props.layout
    return props.layout && props.layout.every((item: Layout) => 
      item.x + item.w <= newColumns && item.y + item.h <= newRows
    );
  }, [props.layout]);

  const [rowMin, setRowMin] = useState(1);
  const [columnMin, setColumnMin] = useState(1);

  useEffect(() => {
    // Only update if props.layout is defined
    if (props.layout) {
      setRowMin(isValidResize(props.rows - 1, props.columns) ? 1 : props.rows);
      setColumnMin(isValidResize(props.rows, props.columns - 1) ? 1 : props.columns);
    }
  }, [props.layout, props.columns, props.rows, isValidResize]);

  const handleSizeChange = useCallback((dimension: 'rows' | 'columns') => (newValue: number) => {
    if (newValue >= (dimension === 'rows' ? rowMin : columnMin)) {
      setProp("ROOT", (props: BackgroundProps) => {
        props[dimension] = newValue;
      });
    }
  }, [setProp, rowMin, columnMin]);

  // Only render if props.layout is defined
  if (!props.layout) {
    return null; // Or return a loading indicator
  }

  return (
    <>
      <SizeControl
        label="Grid Rows"
        tooltipContent="Change the number of rows in the grid."
        value={props.rows}
        min={rowMin}
        onChange={handleSizeChange('rows')}
      />
      <SizeControl
        label="Grid Columns"
        tooltipContent="Change the number of columns in the grid."
        value={props.columns}
        min={columnMin}
        onChange={handleSizeChange('columns')}
      />
    </>
  );
};