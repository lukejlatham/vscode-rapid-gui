import React, { useEffect, useState } from "react";
import { Button, Spinner, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { ImageSparkle24Regular } from '@fluentui/react-icons';
import { vscode } from '../utilities/vscode';

const useStyles = makeStyles({
  button: {
    ...shorthands.gap('8px'),
    minWidth: '150px',
  },
  spinner: {
    size: 'extra-tiny',
    color: tokens.colorNeutralForeground1,
  },
});

interface GenerateImageButtonProps {
  onUpload: (filePath: string) => void;
  alt: string;
}

export const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({ onUpload, alt}) => {
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const handleGenerateClick = () => {
    setIsLoading(true);
    vscode.postMessage({
      command: 'generateImage',
      alt: alt, // Replace with dynamic value if necessary
      width: 100, // Replace with dynamic value if necessary
      height: 100, // Replace with dynamic value if necessary
    });
  };

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === 'imageGenerated') {
        setIsLoading(false);
        onUpload(message.filePath);
      }
    };

    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [onUpload]);

  return (
    <Button
      icon={isLoading ? <Spinner className={styles.spinner} /> : <ImageSparkle24Regular />}
      appearance='outline'
      onClick={handleGenerateClick}
      disabled={isLoading}
      className={styles.button}
    >
      {isLoading ? 'Generating Image...' : 'Generate Image'}
    </Button>
  );
};