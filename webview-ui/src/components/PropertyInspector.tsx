import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { Subtitle2, Divider, Button, Tooltip } from "@fluentui/react-components";
import { Delete24Regular, PaintBrush24Regular, PaintBrushArrowDown24Regular, Dismiss20Regular } from "@fluentui/react-icons";

export const PropertyInspector: React.FC = () => {
  const [copiedSettings, setCopiedSettings] = useState<{ props: Record<string, any>, displayName: string } | null>(null);
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
          props: node.data.props,
          displayName: node.data.displayName,
          isDeletable: query.node(currentNodeId).isDeletable(),
        };
      }
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  const handleCopy = () => {
    if (selected && selected.props) {
      setCopiedSettings({ props: selected.props, displayName: selected.displayName });
    }
  };

  const handlePaste = () => {
    if (selected && copiedSettings && selected.displayName === copiedSettings.displayName) {
      actions.setProp(selected.id, (props: Record<string, any>) => {
        Object.keys(copiedSettings.props).forEach(key => {
          props[key] = copiedSettings.props[key];
        });
      });
    }
  };

  const handleClose = () => {
    actions.clearEvents();
  };

  return selected ? (
    <div style={{ padding: '10px', border: '1px solid #666666', borderRadius: '10px' }}>
      <div style={{ display: 'flex', paddingTop: "5px", paddingBottom: '10px', textAlign: "center", gap: '10px', alignItems: 'center', justifyContent: 'center'}}>
        <Subtitle2>Property inspector</Subtitle2>
        <Button icon={<Dismiss20Regular/>} appearance="transparent" onClick={handleClose} />
      </div>
      <Divider style={{ flexGrow: "0" }} />
      {selected.settings && React.createElement(selected.settings)}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px', gap: '5px' }}>
        <Tooltip content="Copy Format" relationship="label">
          <Button
            appearance='secondary'
            style={{ width: "30%" }}
            //size="small"
            icon={<PaintBrush24Regular />}
            onClick={handleCopy}
            disabled={!selected.props}
          />
        </Tooltip>
        <Tooltip content="Paste Format" relationship="label">
        <Button
          appearance='secondary'
          style={{ width: "30%" }}
          //size="small"
          icon={<PaintBrushArrowDown24Regular />}
          onClick={handlePaste}
          disabled={!copiedSettings || !selected.props || selected.displayName !== copiedSettings.displayName}
        />
        </Tooltip>
        <Button
          appearance='primary'
          style={{ width: "30%" }}
          //size="small"
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
