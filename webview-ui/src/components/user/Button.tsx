import React from "react";
import { useNode, UserComponent } from "@craftjs/core";
import { Button as FluentButton } from '@fluentui/react-components';

interface ButtonProps {
    children?: React.ReactNode;
    appearance?: "secondary" | "primary" | "outline" | "subtle" | "transparent" | undefined;
    shape?: "circular" | "square" | "rounded" | undefined;
    size?: "small" | "medium" | "large" | undefined;
    craft?: any;
}

export const Button: UserComponent<ButtonProps>= ({ children, appearance, shape, size }) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <FluentButton ref={(ref: HTMLButtonElement | HTMLAnchorElement | null) => {
            if (ref) {
                connect(drag(ref));
            }
        }} appearance={appearance} shape={shape} size={size}>
            {children}
        </FluentButton>
    );
};

Button.craft = {
    props: {
        appearance: "primary",
        shape: "rounded",
        size: "medium",
    }
};