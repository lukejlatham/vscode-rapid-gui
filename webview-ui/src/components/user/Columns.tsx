import React, { ReactNode } from "react";
import { Element, useNode, useEditor, UserComponent } from "@craftjs/core";
import { Container } from "./Container";
import { Label, Input, Body1Stronger, makeStyles } from "@fluentui/react-components";

interface ColumnProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

const useStyles = makeStyles({
  column: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  emptyColumn: {
    flexGrow: 1,
    margin: "0.25rem",
    padding: "1rem",
    backgroundColor: "#494B52",
  },
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '5px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  }
});


export const Column: UserComponent<ColumnProps> = ({ children, className, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();
  const classes = useStyles();

  return (
    <div {...props} ref={(ref) => ref && connect(ref)} style={{
    ...props.style // Spread other styles passed via props
  }}
  className={classes.column}>
      {children ? (
        children
      ) : (
        <div className={classes.emptyColumn}>
          <Body1Stronger>Empty column</Body1Stronger>
        </div>
      )}
    </div>);
};

interface ColumnsProps {
  numberOfCols?: number;
  gap?: number;
  children?: ReactNode;
}

export const Columns: UserComponent<ColumnsProps> = ({ numberOfCols = 2, gap = 0, children }) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const colSpanWidth = Math.floor(10 / numberOfCols);
  const classes = useStyles();

  return (
    <Container
    className={classes.column}
    style={{
      gap: `${gap}px`,
      ...(enabled ? { ':hover': { borderTopWidth: '8px', borderTopColor: '#60A5FA' } } : {})
    }}
  >
      {children ??
        Array.from({ length: numberOfCols }, (_, id) => (
          <Element
            is={Column}
            id={`column-${id}`}
            canvas
            key={id}
            style={{
              gridColumn: `span ${colSpanWidth}`,
            }}
          />
        ))}
    </Container>
  );
};

const ColumnsSettings: React.FC = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as ColumnsProps,
  }));

  const classes = useStyles();

  return (
    <div className={classes.settingsContainer}>
      <div className={classes.inputContainer}>
        <Label>Number of columns</Label>
        <Input
          type="number"
          defaultValue={props.numberOfCols?.toString()}
          step={1}
          min={1}
          max={10}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp(
              (props: ColumnsProps) => (props.numberOfCols = parseInt(e.target.value, 10)),
              1000
            );
          }}
        />
      </div>
      <div className={classes.inputContainer}>
        <Label>Gap</Label>
        <Input
          type="number"
          defaultValue={props.gap?.toString()}
          step={1}
          min={0}
          max={20}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: ColumnsProps) => (props.gap = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </div>
    </div>
  );
};

export const ColumnsDefaultProps: ColumnsProps = {
  numberOfCols: 2,
  gap: 0,
};

(Columns as any).craft = {
  props: ColumnsDefaultProps,
  related: {
    settings: ColumnsSettings,
  },
};
