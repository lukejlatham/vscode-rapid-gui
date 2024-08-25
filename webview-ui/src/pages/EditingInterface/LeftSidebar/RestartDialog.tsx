import React from 'react';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from '@fluentui/react-components';
import { Page } from '../../../types';

export const RestartDialog: React.FC<{ isOpen: boolean, onClose: () => void, openStartProjectDialog: () => void, setPages: (pages: Page[]) => void}> = ({ isOpen, onClose, openStartProjectDialog, setPages }) => {
    return (
        <Dialog modalType='alert' open={isOpen} onOpenChange={(event, data) => onClose()}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        Restart
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to restart? This will delete all your current progress.
                    </DialogContent>
                    <DialogActions fluid>
                        <Button onClick={onClose} size='large' appearance="secondary">Cancel</Button>
                        <Button onClick={
                            () => {
                                setPages([]);
                                openStartProjectDialog();
                                onClose();
                            }
                        } size='large' appearance="primary">Restart</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}