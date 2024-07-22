import React, { ReactNode } from "react";
import { useNode, UserComponent, Element, useEditor } from "@craftjs/core";
import { Body1Stronger, makeStyles, Label, Input } from '@fluentui/react-components';
import { Container } from "./Container";

interface RowProps {
  children?: ReactNode;
  [key: string]: any;
}

const useStyles = makeStyles({
  row: {
    margin: '0.25rem',
    padding: '1rem',
    backgroundColor: '#494B52',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
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
  },
});

export const Row: UserComponent<RowProps> = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();
  const classes = useStyles();

  return (
    <div {...props} ref={(ref) => ref && connect(ref)}>
      {children ? (
        children
      ) : (
        <div className={classes.row}>
          <Body1Stronger></Body1Stronger>
        </div>
      )}
    </div>
  );
};

Row.craft = {
  displayName: "Row",
};

interface RowsProps {
  numberOfRows?: number;
  gap?: number;
  children?: ReactNode;
}

export const Rows: UserComponent<RowsProps> = ({ numberOfRows = 2, gap = 0, children }) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const classes = useStyles();

  return (
    <Container
    className={classes.container}
    style={{ gap: `${gap}px` }}
    >
      {children ??
        Array.from({ length: numberOfRows }, (_, id) => (
          <Element is={Row} id={`row-${id}`} canvas key={id} />
        ))}
    </Container>
  );
};

const RowsSettings: React.FC = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as RowsProps,
  }));
  const classes = useStyles();

  return (
    <div className={classes.settingsContainer}>
      <div className={classes.inputContainer}>
        <Label>Number of rows</Label>
        <Input
          type="number"
          defaultValue={props.numberOfRows?.toString()}
          step={1}
          min={1}
          max={10}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: RowsProps) => (props.numberOfRows = parseInt(e.target.value, 10)), 1000);
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
            setProp((props: RowsProps) => (props.gap = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </div>
    </div>
  );
};

export const RowsDefaultProps: RowsProps = {
  numberOfRows: 2,
  gap: 0,
};

(Rows as any).craft = {
  displayName: "Rows",
  props: RowsDefaultProps,
  related: {
    settings: RowsSettings,
  },
};