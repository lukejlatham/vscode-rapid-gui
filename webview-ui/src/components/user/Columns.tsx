import React, { ReactNode } from "react";
import { Element, useNode, useEditor, UserComponent } from "@craftjs/core";
import { Container } from "./Container";
import {Body1Stronger} from '@fluentui/react-components';
import { Label, Input } from "@fluentui/react-components";


const EmptyColumn: React.FC = () => {
  return (
    <div style={{
        margin: '0.25rem', 
        padding: '1rem', // Equivalent to p-4 in Tailwind CSS (adjust as needed)
        // fontStyle: 'italic', // Equivalent to italic in Tailwind CSS
        // color: 'white', // Equivalent to text-gray-600 in Tailwind CSS
        backgroundColor: '#3C3E44' // Equivalent to bg-teal-100 in Tailwind CSS
      }}><Body1Stronger></Body1Stronger></div>
  );
};

interface ColumnProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

export const Column: UserComponent<ColumnProps> = ({ children, className, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div {...props} ref={(ref) => ref && connect(ref)} style={{
    width: '100%',
    ...props.style // Spread other styles passed via props
  }}>
      {children ? <React.Fragment>{children}</React.Fragment> : <EmptyColumn />}
    </div>
  );
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

  return (
    <Container
    style={{
      display: 'flex',
      flexDirection: 'row',
      gap: `${gap}px`,
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
                gridColumn: `span ${colSpanWidth}`, // Equivalent to col-span-${Math.floor(10 / numberOfCols)} in Tailwind CSS
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

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '15px', padding: '5px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
        <Label>Number of columns</Label>
        <Input
          type="number"
          defaultValue={props.numberOfCols?.toString()}
          step={1}
          min={1}
          max={10}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: ColumnsProps) => (props.numberOfCols = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
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
