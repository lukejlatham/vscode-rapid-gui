import React from "react";
import { useEditor } from "@craftjs/core";
import { Subtitle2, Divider, Button } from "@fluentui/react-components";
import { Delete24Regular } from "@fluentui/react-icons";


export const PropertyInspector: React.FC = () => {
  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();

    let selected;

    if (currentNodeId) {
      const node = state.nodes[currentNodeId];
      const displayName = node.data.displayName;

      // Check if the selected node is a Row
      if (displayName === "Row") {
        const parentNodeId = node.data.parent;
        if (parentNodeId) {
          const parentNode = state.nodes[parentNodeId];

          // If the parent is Rows, select the parent instead
          if (parentNode && parentNode.data.displayName === "Rows") {
            selected = {
              id: parentNodeId,
              name: parentNode.data.name,
              settings: parentNode.related?.settings,
              isDeletable: query.node(parentNodeId).isDeletable(),
            };
          }
        }
      } else if (displayName === "Column") { // Check if the selected node is a Column
        const parentNodeId = node.data.parent;
        if (parentNodeId) {
          const parentNode = state.nodes[parentNodeId];

          // If the parent is Columns, select the parent instead
          if (parentNode && parentNode.data.displayName === "Columns") {
            selected = {
              id: parentNodeId,
              name: parentNode.data.name,
              settings: parentNode.related?.settings,
              isDeletable: query.node(parentNodeId).isDeletable(),
            };
          }
        }
      }  
      else if (displayName !== "Container") {
        // If the selected node is not a Container, select it
        selected = {
          id: currentNodeId,
          name: node.data.name,
          settings: node.related?.settings,
          isDeletable: query.node(currentNodeId).isDeletable(),
        };
      }
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  return selected ? (
    <div style={{ padding: '10px', border: '1px solid #FFFFFF', borderRadius: '10px' }}>
      <div style={{ paddingTop: "5px", paddingBottom: '10px', textAlign: "center" }}>
        <Subtitle2>Property inspector</Subtitle2>
      </div>
      <Divider style={{ flexGrow: "0" }} />
      {selected.settings && React.createElement(selected.settings)}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
        <Button
          appearance='primary'
          style={{ width: "95%" }}
          icon={<Delete24Regular />}
          onClick={() => {
            actions.delete(selected.id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  ) : null;
};

export default PropertyInspector;
