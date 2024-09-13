import React, { useState, useEffect, useCallback } from "react";
import { useEditor } from "@craftjs/core";
import { SpinButton, Label, Tooltip } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { usePropertyInspectorStyles } from "../../../../hooks/usePropertyInspectorStyles";
import { BackgroundProps } from "../../../../types";
import { Layout } from "react-grid-layout";
import { FormattedMessage } from "react-intl";

const TooltipContent = ({ children, id, label }: { children: string | JSX.Element; id: string; label: string }) => (
  <Tooltip
    content={{
      children,
      id,
    }}
    positioning="above-start"
    withArrow
    relationship="label">
    <Info16Regular tabIndex={0} aria-label={`Info for ${label}`} />
  </Tooltip>
);

const SizeControl = ({
  label,
  tooltipContent,
  value,
  min,
  onChange,
}: {
  label: string | JSX.Element;
  tooltipContent: string | JSX.Element;
  value: number;
  min: number;
  onChange: (value: number) => void;
}) => {
  const styles = usePropertyInspectorStyles();
  const inputId = `${typeof label === 'string' ? label : 'size-control'}-input`;
  const tooltipId = `${typeof label === 'string' ? label : 'size-control'}-tooltip`;

  return (
    <div role="group" aria-labelledby={inputId}>
      <div className={styles.label}>
        <Label id={inputId} htmlFor={inputId}>{label}</Label>
        <TooltipContent id={tooltipId} label={typeof label === 'string' ? label : 'Size Control'}>{tooltipContent}</TooltipContent>
      </div>
      <SpinButton
        id={inputId}
        className={styles.spinButton}
        min={min}
        max={100}
        value={value}
        onChange={(_, data) => onChange(data.value || 0)}
        aria-describedby={tooltipId}
        aria-valuemin={min}
        aria-valuemax={100}
        aria-valuenow={value}
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

  const isValidResize = useCallback(
    (newRows: number, newColumns: number) => {
      return (
        props.layout &&
        props.layout.every(
          (item: Layout) => item.x + item.w <= newColumns && item.y + item.h <= newRows
        )
      );
    },
    [props.layout]
  );

  const [rowMin, setRowMin] = useState(1);
  const [columnMin, setColumnMin] = useState(1);

  useEffect(() => {
    if (props.layout) {
      setRowMin(isValidResize(props.rows - 1, props.columns) ? 1 : props.rows);
      setColumnMin(isValidResize(props.rows, props.columns - 1) ? 1 : props.columns);
    }
  }, [props.layout, props.columns, props.rows, isValidResize]);

  const handleSizeChange = useCallback(
    (dimension: "rows" | "columns") => (newValue: number) => {
      if (newValue >= (dimension === "rows" ? rowMin : columnMin)) {
        setProp("ROOT", (props: BackgroundProps) => {
          props[dimension] = newValue;
        });
      }
    },
    [setProp, rowMin, columnMin]
  );

  if (!props.layout) {
    return null;
  }

  return (
    <div role="form" aria-label="Grid Size Controls">
      <SizeControl
        label={<FormattedMessage id="grid.rows" defaultMessage="Grid Rows" />}
        tooltipContent={<FormattedMessage id="grid.rows.tooltip" defaultMessage="Change the number of rows in the grid." />}
        value={props.rows}
        min={rowMin}
        onChange={handleSizeChange("rows")}
      />
      <SizeControl
        label={<FormattedMessage id="grid.columns" defaultMessage="Grid Columns" />}
        tooltipContent={<FormattedMessage id="grid.columns.tooltip" defaultMessage="Change the number of columns in the grid." />}
        value={props.columns}
        min={columnMin}
        onChange={handleSizeChange("columns")}
      />
    </div>
  );
};