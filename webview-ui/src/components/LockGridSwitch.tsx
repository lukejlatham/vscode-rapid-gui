import { useState } from "react";
import { Switch } from "@fluentui/react-components";
import { BackgroundProps } from "../types";
import { useEditor } from "@craftjs/core";



export const LockGridSwitch = () => {
    const [checked, setChecked] = useState(true);
    const { query, actions: { setProp } } = useEditor();
    const node = query.node("ROOT").get();
    if (!node || !node.data) {
        // Handle the case where node or node.data is undefined
        console.error("Node or data is undefined");
        return null; // Or any fallback
    }
    const props = node.data.props as BackgroundProps;
    const nodeID = query.node('ROOT').get().id;


    const handleChange = () => {
        setChecked(!checked)
        setProp(nodeID, (props: BackgroundProps) => {
            props.lockedGrid = !props.lockedGrid;
        }
        );
    };

    return (
        <Switch
            style={{ width: "100%" }}
            checked={checked}
            onChange={handleChange}
            labelPosition="above"
            label={checked ? "Grid Locked" : "Grid Unlocked"}
        />
    );
};
