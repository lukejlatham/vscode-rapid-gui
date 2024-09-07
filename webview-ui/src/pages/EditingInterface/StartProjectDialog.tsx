import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@fluentui/react-components";
import {
  DrawImageRegular,
  SparkleFilled,
  CameraSparklesRegular,
  TextEffectsSparkleRegular,
  GlanceHorizontalSparklesRegular,
} from "@fluentui/react-icons";
import { UploadDialog } from "../../Features/generateLayout/sketchUpload/UploadDialog";
import { TextDialog } from "../../Features/generateLayout/textUpload/TextUploadDialog";
import { TemplatesDialog } from "./TemplatesDialog";
import { Page } from "../../types";
import { FormattedMessage } from "react-intl";
import { vscode } from "../../utilities/vscode";

interface StartProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pages: Page[];
  setPages: (pages: Page[]) => void;
}

export const StartProjectDialog: React.FC<StartProjectDialogProps> = ({
  isOpen,
  onClose,
  pages,
  setPages,
}) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isTextDialogOpen, setIsTextDialogOpen] = useState(false);
  const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
  const mode = "start";

  const handleScratch = () => {
    setPages([]);
    onClose();
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      switch (message.command) {
        case "projectStarted":
          switch (message.type) {
            case "scratch":
              handleScratch();
              break;
            case "template":
              setIsTemplatesDialogOpen(true);
              break;
            case "text":
              setIsTextDialogOpen(true);
              break;
            case "sketch":
              setIsUploadDialogOpen(true);
              break;
          }
          break;
      }
    };

    window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, [onClose, setPages]);

  const handleScratchN = () => {
    vscode.postMessage({ command: "scratch" });
  };

  const handleTemplates = () => {
    vscode.postMessage({ command: "templates" });
  };

  const handleText = () => {
    vscode.postMessage({ command: "text" });
  };

  const handleSketch = () => {
    vscode.postMessage({ command: "sketch" });
  };

  return (
    <>
      <Dialog modalType="alert" open={isOpen} onOpenChange={(event, data) => onClose()}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              <FormattedMessage id="startProjectDialog.title" />
              <SparkleFilled />
            </DialogTitle>
            <DialogContent>
              <FormattedMessage id="startProjectDialog.content" />
            </DialogContent>
            <DialogActions fluid>
              <Button
                onClick={handleScratch}
                size="large"
                appearance="secondary"
                icon={<DrawImageRegular />}>
                <FormattedMessage id="startProjectDialog.scratch" />
              </Button>
              <Button
                onClick={() => setIsTemplatesDialogOpen(true)}
                size="large"
                appearance="secondary"
                icon={<GlanceHorizontalSparklesRegular />}>
                <FormattedMessage id="startProjectDialog.templates" />
              </Button>
              <Button
                onClick={() => setIsTextDialogOpen(true)}
                size="large"
                appearance="secondary"
                icon={<TextEffectsSparkleRegular />}>
                <FormattedMessage id="startProjectDialog.text" />
              </Button>
              <Button
                onClick={() => setIsUploadDialogOpen(true)}
                size="large"
                appearance="primary"
                icon={<CameraSparklesRegular />}>
                <FormattedMessage id="startProjectDialog.sketch" />
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <UploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        pages={pages}
        setPages={setPages}
        closeStartDialog={onClose}
        mode={mode}
      />
      <TextDialog
        isOpen={isTextDialogOpen}
        onClose={() => setIsTextDialogOpen(false)}
        pages={pages}
        setPages={setPages}
        closeStartDialog={onClose}
        mode={mode}
      />
      <TemplatesDialog
        isOpen={isTemplatesDialogOpen}
        onClose={() => setIsTemplatesDialogOpen(false)}
        closeStartDialog={onClose}
        pages={pages}
        setPages={setPages}
        mode={mode}
      />
    </>
  );
};
