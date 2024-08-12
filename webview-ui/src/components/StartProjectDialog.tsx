import React, { useState } from 'react';
import { Title1, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from '@fluentui/react-components';
import { DrawImageRegular, TextAddRegular, Camera24Regular, SparkleRegular, SparkleFilled, CameraSparklesFilled, CameraSparklesRegular, TextEffectsSparkleRegular, GlanceHorizontalSparklesRegular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { UploadDialog } from './SketchUpload/UploadDialog'; // Import the UploadDialog component
import { TextDialog } from './ImageUpload/TextDialog'; // Import the TextDialog component
import { TemplatesDialog } from '../pages/EditingInterface/TemplatesDialog';

export const StartProjectDialog: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false); // State for UploadDialog
    const [isTextDialogOpen, setIsTextDialogOpen] = useState(false); // State for TextDialog
    const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false); // State for TemplatesDialog

    return (
        <>
            <Dialog modalType='alert' open={open} onOpenChange={(event, data) => setOpen(data.open)}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Welcome to AI Visual Designer<SparkleFilled/></DialogTitle>
                        <DialogContent>
                            
                            Choose how you would like to begin your project
                        </DialogContent>
                        <DialogActions fluid>
                            <Button onClick={() => setOpen(false)} size='large' appearance="secondary" icon={<DrawImageRegular />}>Scratch</Button>
                            <Button onClick={() => setIsTemplatesDialogOpen(true)} size='large' appearance="secondary" icon={<GlanceHorizontalSparklesRegular />}>Templates</Button>
                            <Button onClick={() => setIsTextDialogOpen(true)} size='large' appearance="secondary" icon={<TextEffectsSparkleRegular />}>Text</Button>
                            <Button onClick={() => setIsUploadDialogOpen(true)} size='large' appearance="primary" icon={<CameraSparklesRegular />}>Sketch</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
            <UploadDialog isOpen={isUploadDialogOpen} onClose={() => setIsUploadDialogOpen(false)} closeStartDialog={() => setOpen(false)} /> {/* Include UploadDialog */}
            <TextDialog isOpen={isTextDialogOpen} onClose={() => setIsTextDialogOpen(false)} closeStartDialog={() => setOpen(false)} /> {/* Include TextDialog */}
            <TemplatesDialog isOpen={isTemplatesDialogOpen} onClose={() => setIsTemplatesDialogOpen(false)} closeStartDialog={() => setOpen(false)} /> 
        </>
    );
};
