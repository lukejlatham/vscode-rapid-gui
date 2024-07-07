import React, { ReactNode, FC } from 'react';
import { Card } from '@fluentui/react-components';
import { useNode, UserComponent } from "@craftjs/core";
import { Resizable } from "re-resizable";

interface ContainerProps {
    background?: string;
    padding?: number;
    height?: string | number;
    width?: string | number;
    appearance?: "filled" | "filled-alternative" | "outline" | "subtle" | undefined;
    children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ background = 'white', padding = 0, height = '100px', width = "100px", children, appearance }) => {
    const { connectors: { connect, drag }, setProp } = useNode();

    return (
        <Resizable
            size={{ width: width as string | number, height: height as string | number }}
            onResizeStop={(e, direction, ref, d) => {
                setProp(props => {
                    props.width = ref.style.width;
                    props.height = ref.style.height;
                });
            }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        ><Card appearance={appearance} ref={(ref: HTMLDivElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} style={{ margin: "5px 0", background, padding: `${padding}px`, height, width }}>
                {children}
            </Card></Resizable>

    );
};

// Container.craft = {
//     props: {
//         background: '#fff',
//         padding: 5,
//         height: 100,
//         width: 100,
//       }
// };

export default Container;
