import React, { useState } from 'react';
import { Title1, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from '@fluentui/react-components';
import { DrawImageRegular, TextAddRegular, Camera24Regular, SparkleRegular, SparkleFilled, CameraSparklesFilled, CameraSparklesRegular, TextEffectsSparkleRegular, GlanceHorizontalSparklesRegular } from '@fluentui/react-icons';
import { UploadDialog } from './SketchUpload/UploadDialog';
import { TextDialog } from './ImageUpload/TextDialog';
import { TemplatesDialog } from '../pages/EditingInterface/TemplatesDialog';

interface StartProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartProjectDialog: React.FC<StartProjectDialogProps> = ({ isOpen, onClose }) => {
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [isTextDialogOpen, setIsTextDialogOpen] = useState(false);
    const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);

    return (
        <>
            <Dialog modalType='alert' open={isOpen} onOpenChange={(event, data) => onClose()}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Welcome to AI Visual Designer<SparkleFilled/></DialogTitle>
                        <DialogContent>
                            Choose how you would like to begin your project
                        </DialogContent>
                        <DialogActions fluid>
                            <Button onClick={onClose} size='large' appearance="secondary" icon={<DrawImageRegular />}>Scratch</Button>
                            <Button onClick={() => setIsTemplatesDialogOpen(true)} size='large' appearance="secondary" icon={<GlanceHorizontalSparklesRegular />}>Templates</Button>
                            <Button onClick={() => setIsTextDialogOpen(true)} size='large' appearance="secondary" icon={<TextEffectsSparkleRegular />}>Text</Button>
                            <Button onClick={() => setIsUploadDialogOpen(true)} size='large' appearance="primary" icon={<CameraSparklesRegular />}>Sketch</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
            <UploadDialog isOpen={isUploadDialogOpen} onClose={() => setIsUploadDialogOpen(false)} closeStartDialog={onClose} />
            <TextDialog isOpen={isTextDialogOpen} onClose={() => setIsTextDialogOpen(false)} closeStartDialog={onClose} />
            <TemplatesDialog isOpen={isTemplatesDialogOpen} onClose={() => setIsTemplatesDialogOpen(false)} closeStartDialog={onClose} />
        </>
    );
};