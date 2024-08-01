import React from "react";
import { Button } from "@fluentui/react-components";
import { ImageAdd24Regular } from '@fluentui/react-icons';
import { vscode } from '../utilities/vscode';

export const UserImageUploadButton: React.FC<{ onUpload: (filePath: string) => void }> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        vscode.postMessage({
          command: 'uploadImage',
          content: reader.result,
          filename: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  window.addEventListener('message', event => {
    const message = event.data;
    if (message.command === 'imageUploaded') {
      onUpload(message.filePath);
    }
  });

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-image"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-image">
        <Button icon={<ImageAdd24Regular />} appearance='outline'
        onClick={
          () => {
            const uploadImage = document.getElementById('upload-image');
            if (uploadImage) {
              uploadImage.click();
            }
          }
        }>Upload Image</Button>
      </label>
    </>
  );
};