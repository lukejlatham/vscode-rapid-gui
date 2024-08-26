import React, { useEffect, useState } from "react";
import { Button, Spinner, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { ImageSparkle24Regular } from "@fluentui/react-icons";
import { vscode } from "../../utilities/vscode";

const useStyles = makeStyles({
  button: {
    minWidth: "150px",
  },
  spinner: {
    size: "extra-tiny",
    color: tokens.colorNeutralForeground1,
  },
});

interface GenerateImageButtonProps {
  onUpload: (filePath: string) => void;
  alt: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({
  onUpload,
  alt,
  isLoading,
  setIsLoading,
}) => {
  const styles = useStyles();

  const handleGenerateClick = () => {
    setIsLoading(true);
    vscode.postMessage({
      command: "generateImage",
      alt: alt, // Replace with dynamic value if necessary
      width: 100, // Replace with dynamic value if necessary
      height: 100, // Replace with dynamic value if necessary
    });
  };

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === "imageGenerated") {
        setIsLoading(false);
        onUpload(message.filePath);
      }
    };

    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [onUpload, setIsLoading]);

  return (
    <Button
      icon={<ImageSparkle24Regular />}
      appearance="outline"
      size="medium"
      onClick={handleGenerateClick}
      disabled={isLoading}
      className={styles.button}>
      {isLoading ? "Generating Image..." : "Generate Image"}
    </Button>
  );
};
