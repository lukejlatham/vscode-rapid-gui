import React, { useEffect } from "react";
import { Button } from "@fluentui/react-components";
import { ImageSparkle24Regular } from '@fluentui/react-icons';
import { vscode } from '../utilities/vscode';

export const GenerateImageButton: React.FC<{ onUpload: (filePath: string) => void }> = ({ onUpload }) => {
  const handleGenerateClick = () => {
    vscode.postMessage({
      command: 'generateImage',
      altText: "Sample Alt Text", // Replace with dynamic value if necessary
      width: 100,                 // Replace with dynamic value if necessary
      height: 100,                // Replace with dynamic value if necessary
    });
  };

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === 'imageGenerated') {
        onUpload(message.filePath);
      }
    };

    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [onUpload]);

  return (
    <>
      <Button
        icon={<ImageSparkle24Regular />}
        appearance='outline'
        onClick={handleGenerateClick}
      >
        Generate Image
      </Button>
    </>
  );
};
