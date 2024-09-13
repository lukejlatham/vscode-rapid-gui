import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { Divider, Button, Tooltip, makeStyles, tokens, Breadcrumb, BreadcrumbItem } from "@fluentui/react-components";
import { Delete24Regular, PaintBrush24Regular, PaintBrushArrowDown24Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  propertyInspector: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    display: 'flex',
    padding: '5px',
    textAlign: "center",
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: tokens.colorNeutralForeground1,
  },
  content: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '10px 0',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
    gap: '5px',
  },
  button: {
    flexGrow: 1,
  },
  breadcrumb: {
    color: tokens.colorNeutralForeground1,
    fontSize: '1rem',
    fontWeight: 500,
  },
  dismissButton: {
    ":hover": {
      border: `2px solid ${tokens.colorNeutralStroke1}`,
      borderRadius: "5px",
    },
  },
  divider: {
    flexGrow: 0,
  }
});

export const PropertyInspector: React.FC<{ classes: any }> = ({ classes }) => {
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
      };
    }
    return { selected: null };
  });




  const localClasses = useStyles();

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

  return selected && (
    <div className={`${localClasses.propertyInspector} ${classes.rightSidebar}`} data-testid='property-inspector'>
      <div className={localClasses.header}>
        <Breadcrumb className={localClasses.breadcrumb}>
          <BreadcrumbItem >{selected.displayName}</BreadcrumbItem>
        </Breadcrumb>
        <Button
          aria-label="Close"
          icon={<Dismiss20Regular className={localClasses.dismissButton}/>}
          appearance="transparent"
          onClick={handleClose}
          data-testid="close-button"
        />
      </div>
      <Divider className={localClasses.divider} />
      <div className={localClasses.content}>
        {selected.settings && React.createElement(selected.settings)}
      </div>
      {selected.displayName !== "Grid Cell" ? (<div className={localClasses.buttonGroup}>
        <Tooltip
          content={<FormattedMessage
            id="propInspector.copy"
            defaultMessage="Copy Format"
          />}
          relationship="label">
          <Button
            appearance='secondary'
            className={localClasses.button}
            icon={<PaintBrush24Regular />}
            onClick={handleCopy}
            disabled={!selected.props}
          />
        </Tooltip>
        <Tooltip
          content={<FormattedMessage
            id="propInspector.paste"
            defaultMessage="Paste Format"
          />}
          relationship="label">
          <Button
            appearance='secondary'
            className={localClasses.button}
            icon={<PaintBrushArrowDown24Regular />}
            onClick={handlePaste}
            disabled={!copiedSettings || !selected.props || selected.displayName !== copiedSettings.displayName}
          />
        </Tooltip>
        <Button
          appearance='primary'
          className={localClasses.button}
          icon={<Delete24Regular />}
          onClick={() => {
            actions.delete(selected.id);
          }}
          disabled={!selected.isDeletable}
        >
          <FormattedMessage id="propInspector.delete" defaultMessage="Delete" />
        </Button>
      </div>) : null}
    </div>
  );
};

export default PropertyInspector;