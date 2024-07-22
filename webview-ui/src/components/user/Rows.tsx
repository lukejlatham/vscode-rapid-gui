import React, { ReactNode } from "react";
import { Element, useNode, useEditor, UserComponent } from "@craftjs/core";
import { Container } from "./Container";
import { Body1Stronger } from '@fluentui/react-components';
import { Label, Input } from "@fluentui/react-components";

interface RowProps {
  children?: ReactNode;
  [key: string]: any;
}

export const Row: UserComponent<RowProps> = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div {...props} ref={(ref) => ref && connect(ref)}       style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        ...props.style
      }}>
      {children ? (
        children
      ) : (
        <div style={{
          padding: '1rem', 
          backgroundColor: '#494B52',
                  flexGrow: 1,
          margin: '0.25rem',

        }}>
          <Body1Stronger>Empty column</Body1Stronger>
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

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        // borderStyle: 'dashed', // Equivalent to outline-dashed in Tailwind CSS
        // outlineWidth: '0.5px', // Equivalent to outline-1 in Tailwind CSS
        // outlineColor: '#059669', // Equivalent to outline-green-600 in Tailwind CSS
        gap: `${gap}px`, // Assuming `gap` is a variable holding a numeric value
        ...(enabled ? { ':hover': { borderTopWidth: '8px', borderTopColor: '#60A5FA' } } : {})
      }}
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '5px', flexGrow: 1}}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
