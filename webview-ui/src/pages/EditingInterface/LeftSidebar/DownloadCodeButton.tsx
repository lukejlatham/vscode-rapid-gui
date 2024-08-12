import React, { useState } from 'react';
import { Button, Dropdown, Option, makeStyles } from "@fluentui/react-components";
import { CodeRegular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';
import { Page } from "../../../types";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  dropdown: {
    minWidth: '120px',
  },
});

const DownloadCodeButton: React.FC<{ classes: any, pages: Page[], currentPageIndex: number; }> = ({ classes, pages, currentPageIndex }) => {
  const { query } = useEditor();
  const styles = useStyles();
  const [outputType, setOutputType] = useState<'winui3' | 'html'>('winui3');

  const handleDownloadCode = async () => {
    const serializedData = query.serialize();
    console.log('Current serialized state:', serializedData);

    const pagesContents = pages.map((page, index) =>
      index === currentPageIndex
        ? JSON.stringify(serializedData)
        : JSON.stringify(page.content)
    );

    const pagesNames = pages.map(page => page.name);

    console.log('Contents to be sent:', pagesContents);
    console.log('FileNames to be sent:', pagesNames);

    vscode.postMessage({
      command: 'downloadCode',
      contents: pagesContents,
      fileNames: pagesNames,
      outputType: outputType,
    });
  };

  return (
    <div className={styles.container}>
      <Dropdown
        className={styles.dropdown}
        value={outputType}
        onOptionSelect={(_, data) => setOutputType(data.optionValue as 'winui3' | 'html')}
      >
        <Option value="winui3">WinUI3</Option>
        <Option value="html">HTML/CSS</Option>
      </Dropdown>
      <Button 
        className={classes.button} 
        icon={<CodeRegular />} 
        appearance='outline'
        onClick={handleDownloadCode}
      >
        Download Code
      </Button>
    </div>
  );
};

export default DownloadCodeButton;