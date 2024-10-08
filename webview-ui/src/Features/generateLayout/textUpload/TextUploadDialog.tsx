import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Text,
  Field,
  tokens,
  makeStyles,
  Textarea,
} from "@fluentui/react-components";
import {
  ArrowUpload24Regular,
} from "@fluentui/react-icons";
import { handleTextUpload } from "./handleTextUpload";
import { v4 as uuidv4 } from "uuid";
import { Page } from "../../../types";
import { GenerationLoader } from "../generationLoader";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalM,
  },
  spinner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
    gap: tokens.spacingHorizontalM,
  },
  noInputText: {
    textAlign: "center",
    padding: tokens.spacingVerticalL,
  },
  processingStages: {
    marginTop: tokens.spacingVerticalM,
  },
  stageItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  completedStage: {
    color: tokens.colorPaletteGreenForeground1,
  },
  incompleteStage: {
    color: tokens.colorNeutralForeground2,
  },
});

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  closeStartDialog: () => void;
  mode: string;
  pages: Page[];
  setPages: (pages: Page[]) => void;
}

const PROCESSING_STAGES = ["Generating layout", "Generating elements", "Refining properties"];

export const TextDialog: React.FC<UploadDialogProps> = ({
  isOpen,
  onClose,
  closeStartDialog,
  mode,
  pages,
  setPages,
}) => {
  const [textInput, setTextInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uiDescription, setUIDescription] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<number>(-1);
  const styles = useStyles();

  useEffect(() => {
    const handleMessage = (event: { data: any }) => {
      const message = event.data;

      if (message.command === "processingStage") {
        const stageIndex = PROCESSING_STAGES.indexOf(message.stage);
        setCurrentStage(stageIndex !== -1 ? stageIndex : -1);
      } else if (message.command === "textDescriptionProcessed") {
        setUIDescription(message.description);
        setLoading(false);
        setCurrentStage(PROCESSING_STAGES.length);

        if (mode === "start") {
          const text: Page = { id: uuidv4(), name: `Page 1`, content: JSON.parse(message.content) };
          setPages([text]);
        } else if (mode === "add") {
          const text: Page = {
            id: uuidv4(),
            name: `Page ${pages.length + 1}`,
            content: JSON.parse(message.content),
          };
          setPages([...pages, text]);
        }
        setTextInput("");
        setUIDescription(null);
        setLoading(false);
        setCurrentStage(-1);
        onClose();
        closeStartDialog();
      }
      else if (message.command === "ProcessTextError") {
        setLoading(false);
        setCurrentStage(-1);
        setUIDescription("Error occurred during processing");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [closeStartDialog, onClose, mode, setPages, pages]);

  const handleProcessText = async () => {
    if (textInput) {
      setLoading(true);
      setCurrentStage(0);
      try {
        await handleTextUpload(textInput);
      } catch (error) {
        console.error("Error uploading text:", error);
        setLoading(false);
        setCurrentStage(-1);
      }
    }
  };

  const handleClose = () => {
    setTextInput("");
    setUIDescription(null);
    setLoading(false);
    setCurrentStage(-1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => !data.open && handleClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle data-testid="textDialog-title">Generate From Text</DialogTitle>
          <DialogContent data-testid="textDialog-content">
            <div className={styles.content}>
              <Field>
                <Textarea
                  data-testid="textDialog-textarea"
                  placeholder="Enter your project description here"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={loading}
                  rows={5}
                />
              </Field>
              {uiDescription === "Error occurred during processing" ? (
                <Text>An error occurred during processing, please try again</Text>
              ) : (
              uiDescription &&
              <Text>UI Description generated successfully!</Text>)}
            </div>
          </DialogContent>
          <DialogActions fluid>
            {loading && (
              <div data-testid="loading">
                <GenerationLoader />
              </div>
            )}
            <Button
              data-testid="process-text-button"
              onClick={handleProcessText}
              appearance="primary"
              disabled={!textInput || loading}
              icon={<ArrowUpload24Regular />}>
              {loading ? "Generating..." : "Process Text"}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
