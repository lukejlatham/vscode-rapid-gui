import React, { ReactNode } from "react";
import { Element, useNode, useEditor, UserComponent } from "@craftjs/core";
import { Container } from "./Container";
import {Body1Stronger} from '@fluentui/react-components';

interface RowProps {
  children?: ReactNode;
  [key: string]: any;
}

export const Row: UserComponent<RowProps> = ({ children, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div {...props} ref={(ref) => ref && connect(ref)} className="flex flex-col">
      {children ? (
        children
      ) : (
        <div style={{
            margin: '0.25rem',
            padding: '1rem',
            // fontStyle: 'italic', // Equivalent to italic in Tailwind CSS
            // color: 'white', // Equivalent to Body1Stronger-gray-600 in Tailwind CSS
            backgroundColor: '#494B52'
          }}>
          <Body1Stronger>Empty row</Body1Stronger>
        </div>
      )}
    </div>
  );
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
          borderStyle: 'dashed', // Equivalent to outline-dashed in Tailwind CSS
          outlineWidth: '0.5px', // Equivalent to outline-1 in Tailwind CSS
          outlineColor: '#059669', // Equivalent to outline-green-600 in Tailwind CSS
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
    <>
      <label>
        Number of rows
        <input
          type="number"
          defaultValue={props.numberOfRows}
          step={1}
          min={1}
          max={10}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: RowsProps) => (props.numberOfRows = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </label>
      <label>
        Gap
        <input
          type="number"
          defaultValue={props.gap}
          step={1}
          min={0}
          max={10}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProp((props: RowsProps) => (props.gap = parseInt(e.target.value, 10)), 1000);
          }}
        />
      </label>
    </>
  );
};

export const RowsDefaultProps: RowsProps = {
  numberOfRows: 2,
  gap: 0,
};

(Rows as any).craft = {
  props: RowsDefaultProps,
  related: {
    settings: RowsSettings,
  },
};
