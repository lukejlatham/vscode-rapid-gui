import React from "react";
import { useEditor } from "@craftjs/core";
import { Subtitle2, Divider } from "@fluentui/react-components";

export const PropertyInspector: React.FC = () => {
    const { actions, selected, isEnabled } = useEditor((state, query) => {
        const currentNodeId = query.getEvent("selected").last();
    
        let selected;
    
        if (currentNodeId) {
          selected = {
            id: currentNodeId,
            name: state.nodes[currentNodeId].data.name,
            settings:
              state.nodes[currentNodeId].related &&
              state.nodes[currentNodeId].related.settings,
            isDeletable: query.node(currentNodeId).isDeletable(),
          };
        }
    
        return {
          selected,
          isEnabled: state.options.enabled,
        };
      });

    return (
        selected ? (
        <div style={{padding: '10px', border: '1px solid #FFFFFF', borderRadius: '10px'}}>
            <div style={{ paddingTop: "5px", paddingBottom: '10px', textAlign: "center"}}><Subtitle2>Property inspector</Subtitle2></div>
                {/* <div style={{display:"grid", gridTemplateColumns: 'auto auto'}}> */}
                <Divider style={{flexGrow: "0"}}/>
            {selected.settings && React.createElement(selected.settings)}
        </div>
        ) : null
    );
}

export default PropertyInspector;
