import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from '@fluentui/react-components';
import { DrawImageRegular, TextAddRegular, CursorHoverRegular } from '@fluentui/react-icons';


export const StartProjectDialog: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            <DialogTrigger disableButtonEnhancement>
                <Button appearance='subtle'>+ Start New Project</Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogContent>
                        Choose how you would like to begin your project
                    </DialogContent>
                    <DialogActions fluid>
                        <Button appearance="secondary" icon={<CursorHoverRegular />}>Scratch</Button>
                        <Button appearance="secondary" icon={<TextAddRegular />}>Prompt</Button>
                        <Button appearance="secondary" icon={<DrawImageRegular />}>Sketch</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
};