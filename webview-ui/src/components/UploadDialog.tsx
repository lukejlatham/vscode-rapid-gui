import React, { useState, useRef } from 'react';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button, Input, Spinner } from '@fluentui/react-components';
import { Camera24Regular } from '@fluentui/react-icons';
import { handleSketchUpload } from '../sketchProcessing/sketchUpload'; // Adjust the path as needed

interface UploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UploadDialog: React.FC<UploadDialogProps> = ({ isOpen, onClose }) => {
    const [apiKey, setApiKey] = useState<string>('');
    const [endpoint, setEndpoint] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [uiDescription, setUIDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file || null);
    };

    const handleProcessSketch = async () => {
        if (selectedImage && apiKey && endpoint && model) {
            setLoading(true);
            try {
                const description = await handleSketchUpload(selectedImage, apiKey, endpoint, model);
                setUIDescription(description);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleClose = () => {
        // Reset state when the dialog is closed
        setApiKey('');
        setEndpoint('');
        setModel('');
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
                            <div style={{ flex: 1, marginRight: '1rem' }}>
                                <Input placeholder="API Key" onChange={(e) => setApiKey(e.target.value)} value={apiKey} />
                                <Input placeholder="API Endpoint" onChange={(e) => setEndpoint(e.target.value)} value={endpoint} />
                                <Input placeholder="API Model" onChange={(e) => setModel(e.target.value)} value={model} />
                            </div>
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
