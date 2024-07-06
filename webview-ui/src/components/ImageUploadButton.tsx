import React, { useState, useRef } from 'react';
import { Button } from '@fluentui/react-components';
import { Camera24Filled, Camera24Regular, bundleIcon } from '@fluentui/react-icons';

const CameraIcon = bundleIcon(Camera24Filled, Camera24Regular);

const ImageUploadButton: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file || null);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <>
            <Button onClick={handleButtonClick} appearance='primary' icon={<CameraIcon/>}>Upload Sketch</Button>
            <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} style={{ display: 'none' }} />
            {selectedImage && <p>Uploaded: {selectedImage.name}</p>}
        </>
    );
};

export default ImageUploadButton;