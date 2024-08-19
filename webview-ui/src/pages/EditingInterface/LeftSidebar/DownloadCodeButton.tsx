import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  makeStyles,
  Tooltip,
} from "@fluentui/react-components";
import { CodeRegular, ArrowDownloadRegular } from "@fluentui/react-icons";
import { useEditor } from "@craftjs/core";
import { vscode } from "../../../utilities/vscode";
import { Page } from "../../../types";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
});

const DownloadCodeButton: React.FC<{ classes: any; pages: Page[]; currentPageIndex: number }> = ({
  classes,
  pages,
  currentPageIndex,
}) => {
  const { query } = useEditor();
  const styles = useStyles();
  const [outputType, setOutputType] = useState<"winui3" | "html">("winui3");

  const handleDownloadCode = async (type: "winui3" | "html") => {
    setOutputType(type);
    console.log("Output type:", type);

    // Move handleDownloadCode logic inside the setState callback
    const serializedData = query.serialize();
    console.log("Current serialized state:", serializedData);

    const pagesContents = pages.map((page, index) =>
      index === currentPageIndex ? JSON.stringify(serializedData) : JSON.stringify(page.content)
    );

    const pagesNames = pages.map((page) => page.name);

    console.log("Contents to be sent:", pagesContents);
    console.log("FileNames to be sent:", pagesNames);

    vscode.postMessage({
      command: "downloadCode",
      contents: pagesContents,
      fileNames: pagesNames,
      outputType: type, // Use the passed type instead of outputType state
    });
  };

  return (
    <div className={styles.container}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Tooltip
            content={<FormattedMessage id="leftSidebar.export" defaultMessage="Export Code" />}
            relationship="label"
            positioning="after"
            appearance="inverted">
            <Button icon={<ArrowDownloadRegular />} appearance="outline">
              {/* Download Code */}
            </Button>
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem onClick={() => handleDownloadCode("winui3")}>WinUI3</MenuItem>
            <MenuItem onClick={() => handleDownloadCode("html")}>HTML/CSS</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

export default DownloadCodeButton;
