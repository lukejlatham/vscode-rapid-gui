import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button, Spinner } from '@fluentui/react-components';
import { Camera24Regular } from '@fluentui/react-icons';
import { handleSketchUpload } from './handleSketchUpload';

interface UploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UploadDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [uiDescription, setUIDescription] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleMessage = (event: { data: any; }) => {
            const message = event.data;

            if (message.command === 'sketchProcessed') {
                setUIDescription(message.description);
                setLoading(false);

                console.log('Received UI JSON:', message.description);   

                // Navigate to the editing interface
                navigate('/editing-interface');

                // Post the node tree message after a short delay to ensure the page has loaded
                setTimeout(() => {
                    window.postMessage({ command: 'loadTree', data: message.description }, '*');
                    console.log('Posted node tree message');
                }, 1000); // Adjust the delay if necessary
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [navigate]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file || null);
    };

    const handleProcessSketch = async () => {
        if (selectedImage) {
            setLoading(true);
            try {
                await handleSketchUpload(selectedImage);
            } catch (error) {
                console.error('Error uploading image:', error);
                setLoading(false);
            }
        }
    };

    const handleClose = () => {
        // Reset state when the dialog is closed
        setSelectedImage(null);
        setUIDescription(null);
        setLoading(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(event, data) => !data.open && handleClose()}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Start Project From Sketch</DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} ref={fileInputRef} />
                                {selectedImage && <p>Uploaded: {selectedImage.name}</p>}
                            </div>
                        </div>
                        {loading && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                            }}>
                                <Spinner label="Processing..." />
                            </div>
                        )}
                        {uiDescription && <pre>{uiDescription}</pre>}
                    </DialogContent>
                    <DialogActions fluid>
                        <Button onClick={() => fileInputRef.current?.click()} appearance='secondary' icon={<Camera24Regular />}>Select Image</Button>
                        <Button onClick={handleProcessSketch} appearance='primary' disabled={!selectedImage}>Process Sketch</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
