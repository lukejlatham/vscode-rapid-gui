import React, { useState, useRef, useEffect } from 'react';
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
  Card,
  CardHeader,
  tokens,
  makeStyles
} from '@fluentui/react-components';
import { Image24Regular, ArrowUpload24Regular, CheckmarkCircle24Filled, CircleHint24Filled } from '@fluentui/react-icons';
import { handleSketchUpload } from './handleSketchUpload';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '../../types';
import { GenerationLoader } from './generationLoader';


declare const vscode: any;

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  imagePreview: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: tokens.borderRadiusMedium,
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    gap: tokens.spacingHorizontalM,
  },
  noImageText: {
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
  mode: string;
  pages: Page[];
  setPages: (pages: Page[]) => void;
}

const PROCESSING_STAGES = [
  "Generating layout",
  "Generating elements",
  "Refining properties",
];

export const UploadDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose, closeStartDialog, mode, pages, setPages }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uiDescription, setUIDescription] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<number>(-1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const styles = useStyles();

  useEffect(() => {
    const handleMessage = (event: { data: any }) => {
      const message = event.data;

      if (message.command === 'processingStage') {
        const stageIndex = PROCESSING_STAGES.indexOf(message.stage);
        setCurrentStage(stageIndex !== -1 ? stageIndex : -1);
      } else if (message.command === 'sketchProcessed') {
        setUIDescription(message.description);
        setLoading(false);
        setCurrentStage(PROCESSING_STAGES.length);

        if (mode === 'start') {
          const sketch = { id: uuidv4(), name: `Page 1`, content: JSON.parse(message.content) };
          setPages([sketch]);
        }
        else if (mode === 'add') {
          const sketch = { id: uuidv4(), name: `Page ${pages.length + 1}`, content: JSON.parse(message.content) };
          setPages([...pages, sketch]);
        }
        setSelectedImage(null);
        setUIDescription(null);
        setLoading(false);
        setCurrentStage(-1);
        onClose();
        closeStartDialog();


      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [closeStartDialog, onClose, mode, setPages, pages]);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleProcessSketch = async () => {
    if (selectedImage) {
      setLoading(true);
      setCurrentStage(0);
      try {
        await handleSketchUpload(selectedImage);
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
        setCurrentStage(-1);
      }
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setUIDescription(null);
    setLoading(false);
    setCurrentStage(-1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(event, data) => !data.open && handleClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Generate From Sketch</DialogTitle>
          <DialogContent>
            <div className={styles.content}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              {!selectedImage ? (
                <Text className={styles.noImageText}>No image selected. Click "Select Image" to upload.</Text>
              ) : (
                <Card>
                  <CardHeader
                    header={
                      <Text weight="semibold">
                        {selectedImage.name}
                      </Text>
                    }
                    description={
                      <Text>
                        {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    }
                  />
                </Card>
              )}
              {loading && (
                <div className={styles.spinner}>
                  <Spinner label={`${PROCESSING_STAGES[currentStage]}...`} />
                  <GenerationLoader />
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
              onClick={() => fileInputRef.current?.click()}
              appearance="secondary"
              icon={<Image24Regular />}
            >
              {selectedImage ? 'Change Image' : 'Select Image'}
            </Button>
            <Button
              onClick={handleProcessSketch}
              appearance="primary"
              disabled={!selectedImage || loading}
              icon={<ArrowUpload24Regular />}
            >
              Process Sketch
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};