import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from '@fluentui/react-components';
import { DrawImageRegular, TextAddRegular, Camera24Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { UploadDialog } from './ImageUpload/UploadDialog'; // Import the UploadDialog component
import { TextDialog } from './ImageUpload/TextDialog'; // Import the TextDialog component

export const StartProjectDialog: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false); // State for UploadDialog
    const [isTextDialogOpen, setIsTextDialogOpen] = useState(false); // State for TextDialog

    return (
        <>
            <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
                <DialogTrigger disableButtonEnhancement>
                    <Button size='large' appearance='subtle'>+ Start New Project</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>New Project</DialogTitle>
                        <DialogContent>
                            Choose how you would like to begin your project
                        </DialogContent>
                        <DialogActions fluid>
                            <Button onClick={() => navigate("/editing-interface")} appearance="secondary" icon={<DrawImageRegular />}>Scratch</Button>
                            <Button onClick={() => setIsTextDialogOpen(true)} appearance="secondary" icon={<TextAddRegular />}>Text</Button>
                            <Button onClick={() => setIsUploadDialogOpen(true)} appearance="secondary" icon={<Camera24Regular />}>Sketch</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
            <UploadDialog isOpen={isUploadDialogOpen} onClose={() => setIsUploadDialogOpen(false)} /> {/* Include UploadDialog */}
            <TextDialog isOpen={isTextDialogOpen} onClose={() => setIsTextDialogOpen(false)} /> {/* Include TextDialog */}
        </>
    );
};
