import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { Subtitle1, Divider, Button, Tooltip, makeStyles, tokens, Breadcrumb, BreadcrumbItem } from "@fluentui/react-components";
import { Delete24Regular, PaintBrush24Regular, PaintBrushArrowDown24Regular, Dismiss20Regular } from "@fluentui/react-icons";


const useStyles = makeStyles({
  propertyInspector: {
    margin: '10px',
    padding: '10px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '3px',
    maxHeight: "95%",
    overflow: "hidden",
    flexBasis: "13.75%",
    flexShrink: 0,
  },
  header: {
    display: 'flex',
    padding: '5px',
    textAlign: "center",
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#d6d6d6',
    // fontSize: '0.875rem',
    // fontWeight: 100,
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
  breadcrumb: {
    color: '#d6d6d6',
    fontSize: '1rem',
    fontWeight: 500,
  },
  dismissButton: {
    ":hover": {
      border: `2px solid ${tokens.colorNeutralStroke1}`,
      borderRadius: "5px",
    },
  },
});

export const PropertyInspector: React.FC = () => {
  const [copiedSettings, setCopiedSettings] = useState<{ props: Record<string, any>, displayName: string } | null>(null);

  const { selected, actions } = useEditor((state, query) => {
    const [currentNodeId] = Array.from(state.events.selected);

    if (currentNodeId) {
      return {
        selected: {
          id: currentNodeId,
          name: state.nodes[currentNodeId].data.name,
          settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
          props: state.nodes[currentNodeId].data.props,
          displayName: state.nodes[currentNodeId].data.displayName,
          isDeletable: query.node(currentNodeId).isDeletable(),
        },
        isEnabled: state.options.enabled,
      };
    }
    return { selected: null, isEnabled: false };
  });

  console.log(selected);


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
      <Breadcrumb className={classes.breadcrumb}>
      <BreadcrumbItem>{selected.displayName}</BreadcrumbItem>
      </Breadcrumb>
        <Button icon={<Dismiss20Regular className={classes.dismissButton}/>} appearance="transparent" onClick={handleClose} />
      </div>
      <Divider style={{ flexGrow: "0" }} />
      {selected.settings && React.createElement(selected.settings)}
      
      {(selected.displayName !== 'Background') ? (<div className={classes.buttonGroup}>
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
      </div>): null}
    </div>
  ) : null;
};

export default PropertyInspector;