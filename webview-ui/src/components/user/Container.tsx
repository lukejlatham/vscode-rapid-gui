import React, { FC } from 'react';
import { Card, Slider, Label, Field } from '@fluentui/react-components';
import { useNode } from "@craftjs/core";

interface ContainerProps {
    children: React.ReactNode;
    background?: string;
    padding?: string | number;
    craft?: any;
    // height?: string | number;
    // width?: string | number;
}

export const Container: FC<ContainerProps> & { craft?: any } = ({ children, background, padding, ...props }) => {
    const { connectors: { connect, drag }, } = useNode();
    
    return (
        <Card appearance='filled' ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} style={{ height: "100%", width: "80vw" }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {children}
            </div>
        </Card>
    );
}

interface ContainerSettingsProps {
    background: string;
    padding: string | number;
}

export const ContainerSettings: FC<ContainerSettingsProps> = () => {
    const { actions: { setProp }, background, padding, } = useNode((node) => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
    }));
    
    return (
        <div>
          <Field label='Background'>
            {/* <ColorPicker
              name="background-color"
              value={background}
              onChange={(color) => {
                setProp((props) => (props.background = color), 500);
              }} */}
          </Field>
          <Field label='Padding'>
            <Slider
              defaultValue={padding}
              onChange={(_, value) =>
                setProp((props: { padding: any; }) => (props.padding = typeof value === 'number' ? value : padding), 500)
              }
            />
          </Field>
        </div>
      );
    };
    
export const ContainerDefaultProps = {
      background: '#ffffff',
      padding: 3,
    };

    Container.craft = {
      props: ContainerDefaultProps,
      related: {
        settings: ContainerSettings,
      },
    };

// height="100%" width="80vw"