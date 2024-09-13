import React, { useEffect, useContext } from "react";
import { Button, Tooltip } from "@fluentui/react-components";
import { Folder24Regular } from "@fluentui/react-icons";
import { AccessibilityContext } from "../../EditingInterface";
import { vscode } from "../../../../utilities/vscode";
import { Page } from "../../../../types";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4
import { FormattedMessage } from "react-intl";

const LoadButton: React.FC<{
  classes: any;
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
}> = ({ classes, pages, setPages }) => {
  const handleLoad = () => {
    vscode.postMessage({
      command: "loadFile",
    });
  };

  const accessibility = useContext(AccessibilityContext);

  useEffect(() => {
    const handleMessage = (event: { data: any }) => {
      const message = event.data;

      if (message.command === "loadFiles") {
        const loadedPages: Page[] = message.data
          .map((file: { fileName: string; fileData: string }) => {
            try {
              const content = JSON.parse(file.fileData);
              return {
                id: uuidv4(), // Generate a new random ID
                name: file.fileName,
                content: content,
              } as Page;
            } catch (error) {
              console.error("Error deserializing page content:", error);
              return null;
            }
          })
          .filter((page: Page | null): page is Page => page !== null);
        setPages(loadedPages);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setPages]);

  return (
    <Tooltip
      content={<FormattedMessage id="leftSidebar.load" defaultMessage="Load" />}
      relationship="label"
      positioning="after"
      appearance="inverted">
      <Button
        style={{ width: "100%" }}
        size={accessibility.selectedAccessibility === "yes" ? "large" : "medium"}
        className={classes.button}
        icon={<Folder24Regular />}
        onClick={handleLoad}>
        {accessibility.selectedAccessibility === "yes" && (
          <FormattedMessage id="leftSidebar.load" defaultMessage="Load" />
        )}
      </Button>
    </Tooltip>
  );
};

export default LoadButton;
