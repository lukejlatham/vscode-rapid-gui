import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Spinner,
  Text,
  Input,
  tokens,
  makeStyles
} from '@fluentui/react-components';
import { ArrowUpload24Regular, CheckmarkCircle24Filled, CircleHint24Filled } from '@fluentui/react-icons';
import { handleTextUpload } from './handleTextUpload';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
  },
  noInputText: {
    textAlign: 'center',
    padding: tokens.spacingVerticalL,
  },
  processingStages: {
    marginTop: tokens.spacingVerticalM,
  },
  stageItem: {
    display: 'flex',
    alignItems: 'center',
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
}

const PROCESSING_STAGES = [
  "Generating layout",
  "Generating elements",
  "Refining properties",
];

export const TextDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose, closeStartDialog }) => {
  const [textInput, setTextInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [uiDescription, setUIDescription] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<number>(-1);
  const navigate = useNavigate();
  const styles = useStyles();

  useEffect(() => {
    const handleMessage = (event: { data: any }) => {
      const message = event.data;

      if (message.command === 'processingStage') {
        const stageIndex = PROCESSING_STAGES.indexOf(message.stage);
        setCurrentStage(stageIndex !== -1 ? stageIndex : -1);
      } else if (message.command === 'textDescriptionProcessed') {
        setUIDescription(message.description);
        setLoading(false);
        setCurrentStage(PROCESSING_STAGES.length);

        navigate('/', { state: { text: { id: uuidv4(), name: 'Page 1', content: JSON.parse(message.content) } } });
        onClose();
        closeStartDialog();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate, closeStartDialog, onClose]);

  const handleProcessText = async () => {
    if (textInput) {
      setLoading(true);
      setCurrentStage(0);
      try {
        await handleTextUpload(textInput);
      } catch (error) {
        console.error('Error uploading text:', error);
        setLoading(false);
        setCurrentStage(-1);
      }
    }
  };

  const handleClose = () => {
    setTextInput('');
    setUIDescription(null);
    setLoading(false);
    setCurrentStage(-1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => !data.open && handleClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Start Project From Text</DialogTitle>
          <DialogContent>
            <div className={styles.content}>
              <Input
                placeholder="Enter your project description here"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              {!textInput && (
                <Text className={styles.noInputText}>No text entered. Please provide a description.</Text>
              )}
              {loading && (
                <div className={styles.spinner}>
                  <Spinner label={`${PROCESSING_STAGES[currentStage]}...`} />
                </div>
              )}
              {currentStage >= 0 && (
                <div className={styles.processingStages}>
                  {PROCESSING_STAGES.map((stage, index) => (
                    <div key={index} className={styles.stageItem}>
                      {index < currentStage ? (
                        <CheckmarkCircle24Filled className={styles.completedStage} />
                      ) : (
                        <CircleHint24Filled className={styles.incompleteStage} />
                      )}
                      <Text className={index < currentStage ? styles.completedStage : undefined}>
                        {stage}
                      </Text>
                    </div>
                  ))}
                </div>
              )}
              {uiDescription && (
                <Text>
                  UI Description generated successfully!
                </Text>
              )}
            </div>
          </DialogContent>
          <DialogActions fluid>
            <Button
              onClick={handleProcessText}
              appearance="primary"
              disabled={!textInput || loading}
              icon={<ArrowUpload24Regular />}
            >
              Process Text
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
