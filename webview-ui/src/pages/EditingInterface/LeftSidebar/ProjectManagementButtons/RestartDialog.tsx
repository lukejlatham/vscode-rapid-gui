import React from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@fluentui/react-components";
import { Page } from "../../../../types";
import { ArrowLeftFilled, ArrowResetFilled } from "@fluentui/react-icons";
import { FormattedMessage } from "react-intl";


export const RestartDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  openStartProjectDialog: () => void;
  setPages: (pages: Page[]) => void;
}> = ({ isOpen, onClose, openStartProjectDialog, setPages }) => {
  const handleClick = () => {
    setPages([]);
    openStartProjectDialog();
    onClose();
  };

  return (
    <Dialog modalType="alert" open={isOpen} onOpenChange={(event, data) => onClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <FormattedMessage id="restartDialog.title"
              defaultMessage="Restart Project"
            />
          </DialogTitle>
          <DialogContent>
            <FormattedMessage id="restartDialog.content"
              defaultMessage="Are you sure you want to restart? This will delete all your current progress."
            />
          </DialogContent>
          <DialogActions fluid>
            <Button
              icon={<ArrowLeftFilled />}
              onClick={onClose}
              size="large"
              appearance="secondary">
              <FormattedMessage id="restartDialog.cancel" defaultMessage="Cancel" />
            </Button>
            <Button
              onClick={handleClick}
              size="large"
              appearance="primary"
              icon={<ArrowResetFilled />}>
              <FormattedMessage id="restartDialog.restart" defaultMessage="Restart" />
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
