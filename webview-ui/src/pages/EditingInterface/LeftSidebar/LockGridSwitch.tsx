import { useState } from "react";
import { Switch, Tooltip, Body1 } from "@fluentui/react-components";
import { BackgroundProps } from "../../../types";
import { useEditor } from "@craftjs/core";




export const LockGridSwitch: React.FC<{classes: any}> = ({classes}) => {
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
        <Tooltip
        content={checked ? "Unlocking the grid allows you to move and resize cells freely on the canvas." : "Locking the grid will snap cells to the grid, and prevent them from being moved or resized."}
        relationship="description"
        positioning="after"
      >
        <div className={classes.switchContainer}>
        
        <Switch
            style={{ width: "100%" }}
            checked={checked}
            onChange={handleChange}
            labelPosition="after"
            label={checked ? <Body1>Grid Locked</Body1> : <Body1>Grid Unlocked</Body1>}
        />
        
        </div>
        
        </Tooltip>
    );
};
