import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { Subtitle2, Divider, Button, Tooltip, makeStyles, shorthands } from "@fluentui/react-components";
import { Delete24Regular, PaintBrush24Regular, PaintBrushArrowDown24Regular, Dismiss20Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  propertyInspector: {
    padding: '10px',
    border: '1px solid #666666',
    borderRadius: '10px',
  },
  header: {
    display: 'flex',
    paddingTop: "5px",
    paddingBottom: '10px',
    textAlign: "center",
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
    gap: '5px',
  },
  button: {
    width: "30%",
  },
});

export const PropertyInspector: React.FC = () => {
  const [copiedSettings, setCopiedSettings] = useState<{ props: Record<string, any>, displayName: string } | null>(null);
  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();

    if (currentNodeId) {
      const node = state.nodes[currentNodeId];
      return {
        selected: {
          id: currentNodeId,
          name: node.data.name,
          settings: node.related?.settings,
          props: node.data.props,
          displayName: node.data.displayName,
          isDeletable: query.node(currentNodeId).isDeletable(),
        },
        isEnabled: state.options.enabled,
      };
    }

    return { selected: null, isEnabled: false };
  });


  const classes = useStyles();

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
    <div className={classes.propertyInspector}>
      <div className={classes.header}>
        <Subtitle2>Property inspector</Subtitle2>
        <Button icon={<Dismiss20Regular />} appearance="transparent" onClick={handleClose} />
      </div>
      <Divider style={{ flexGrow: "0" }} />
      {selected.settings && React.createElement(selected.settings)}
      <div className={classes.buttonGroup}>
        <Tooltip content="Copy Format" relationship="label">
          <Button
            appearance='secondary'
            className={classes.button}
            icon={<PaintBrush24Regular />}
            onClick={handleCopy}
            disabled={!selected.props}
          />
        </Tooltip>
        <Tooltip content="Paste Format" relationship="label">
          <Button
            appearance='secondary'
            className={classes.button}
            icon={<PaintBrushArrowDown24Regular />}
            onClick={handlePaste}
            disabled={!copiedSettings || !selected.props || selected.displayName !== copiedSettings.displayName}
          />
        </Tooltip>
        <Button
          appearance='primary'
          className={classes.button}
          icon={<Delete24Regular />}
          onClick={() => {
            actions.delete(selected.id);
          }}
          disabled={!selected.isDeletable}
        >
          Delete
        </Button>
      </div>
    </div>
  ) : null;
};

export default PropertyInspector;