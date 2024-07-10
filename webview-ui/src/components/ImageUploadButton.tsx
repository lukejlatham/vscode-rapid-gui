import React, { useState } from 'react';
import { Button } from '@fluentui/react-components';
import { Camera24Filled, Camera24Regular, bundleIcon } from '@fluentui/react-icons';
import { UploadDialog } from './UploadDialog'; // Import the UploadDialog component

const CameraIcon = bundleIcon(Camera24Filled, Camera24Regular);

const ImageUploadButton: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleButtonClick = () => {
        setIsDialogOpen(true);
    };

    return (
        <>
            <Button onClick={handleButtonClick} appearance='primary' icon={<CameraIcon />}>Upload Sketch</Button>
            <UploadDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </>
    );
};

export default ImageUploadButton;
