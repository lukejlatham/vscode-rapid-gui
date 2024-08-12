import React, { useState } from 'react';
import { Title1, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from '@fluentui/react-components';
import { DrawImageRegular, TextAddRegular, Camera24Regular, SparkleRegular, SparkleFilled, CameraSparklesFilled, CameraSparklesRegular, TextEffectsSparkleRegular, GlanceHorizontalSparklesRegular } from '@fluentui/react-icons';
import { UploadDialog } from './SketchUpload/UploadDialog';
import { TextDialog } from './ImageUpload/TextDialog';
import { TemplatesDialog } from '../pages/EditingInterface/TemplatesDialog';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';

interface AddPageDialogDialogProps {
    isOpen: boolean;
    onClose: () => void;
    pages: Page[];
    setPages: (pages: Page[]) => void;
}

export const AddPageDialog: React.FC<AddPageDialogDialogProps> = ({ isOpen, onClose, pages, setPages }) => {
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [isTextDialogOpen, setIsTextDialogOpen] = useState(false);
    const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
    const navigate = useNavigate();
    const mode = "add"
    const handleScratch = () => {
        navigate('/', { state: { mode: mode } });
        onClose();
    }

    return (
        <>
            <Dialog modalType='alert' open={isOpen} onOpenChange={(event, data) => onClose()}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>New Page<SparkleFilled /></DialogTitle>
                        <DialogContent>
                            Choose how you would like to add a new page
                        </DialogContent>
                        <DialogActions fluid>
                            <Button onClick={handleScratch} size='large' appearance="secondary" icon={<DrawImageRegular />}>Scratch</Button>
                            <Button onClick={() => setIsTemplatesDialogOpen(true)} size='large' appearance="secondary" icon={<GlanceHorizontalSparklesRegular />}>Templates</Button>
                            <Button onClick={() => setIsTextDialogOpen(true)} size='large' appearance="secondary" icon={<TextEffectsSparkleRegular />}>Text</Button>
                            <Button onClick={() => setIsUploadDialogOpen(true)} size='large' appearance="primary" icon={<CameraSparklesRegular />}>Sketch</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
            <UploadDialog isOpen={isUploadDialogOpen} onClose={() => setIsUploadDialogOpen(false)} pages={pages} setPages={setPages} closeStartDialog={onClose} mode={mode}/>
            <TextDialog isOpen={isTextDialogOpen} onClose={() => setIsTextDialogOpen(false)} pages={pages} setPages={setPages} closeStartDialog={onClose} mode={mode}/>
            <TemplatesDialog isOpen={isTemplatesDialogOpen} onClose={() => setIsTemplatesDialogOpen(false)} closeStartDialog={onClose} pages={pages} setPages={setPages} mode={mode}/>
        </>
    );
};