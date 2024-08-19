import { Editor, SerializedNodes } from "@craftjs/core";
import { Label } from "../../components/user/Label";
import { Button } from "../../components/user/Button";
import { makeStyles, Theme } from '@fluentui/react-components';
import { TextBox } from '../../components/user/TextBox';
import { Image } from '../../components/user/Image';
import { Background } from '../../components/user/Background';
import { Input } from "../../components/user/Input";
import { RadioButtons } from "../../components/user/RadioButton";
import { Checkboxes } from "../../components/user/Checkboxes";
import { Icon } from "../../components/user/Icon";
import { GridCell } from "../../components/user/GridCell";
import { Container } from "../../components/user/Container";
import { Text } from "../../components/user/Text";
import { Dropdown } from "../../components/user/Dropdown";
import { Slider } from "../../components/user/Slider";
import { Page, AccessibilityContextType } from "../../types";
import { useState, useEffect, useCallback, createContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { EditorContent } from "./EditorContent";
import { vscode } from '../../utilities/vscode';
import { useLocation } from "react-router-dom";
import { add, set } from "lodash";
import { use } from "i18next";



const useStyles = makeStyles({
  mainLayout: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  canvas: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  // leftSidebar: {
  //   flexBasis: '30%',
  //   flexShrink: 0,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   padding: '5px',
  //   borderRadius: '3px',
  //   overflow: 'hidden',
  // }
});

const createDefaultPage = (): Page => ({
  id: uuidv4(),
  name: 'Page 1',
  content: {
    ROOT: {
      type: { resolvedName: 'Background' },
      isCanvas: true,
      props: {},
      displayName: 'Background',
      custom: {},
      hidden: false,
      nodes: [],
      linkedNodes: {},
      parent: null,
    },
  },
});


export const AccessibilityContext = createContext<AccessibilityContextType >({
  selectedAccessibility: 'no',
  setSelectedAccessibility: () => {}
});

const EditingInterface: React.FC<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}> = ({
  theme,
  setTheme
}) => {
  const classes = useStyles();

  const [pages, setPages] = useState<Page[]>([createDefaultPage()]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [accessibility, setSelectedAccessibility] = useState<'yes'|'no'>('no');

  // setting template if state has template
  const template = location.state?.template;
  console.log('Template: ', template);

  const sketch = location.state?.sketch;
  console.log('Sketch sent: ', sketch);

  const text = location.state?.text;
  console.log('Text sent: ', text);

  const addPage = useCallback(() => {
    const newPage = createDefaultPage();
    newPage.name = `Page ${pages.length + 1}`;
    setPages(prevPages => [...prevPages, newPage]);
    setCurrentPageIndex(pages.length);
  }, [pages]);

  useEffect(() => {
    if (pages.length === 0) {
      setPages([createDefaultPage()]);
      setCurrentPageIndex(0);
    }
    // if any page is empty, create a default page
    setPages(prevPages => prevPages.map(page => Object.keys(page.content).length === 0 ? createDefaultPage() : page));
    
    setCurrentPageIndex(pages.length - 1);
    setIsLoading(false);
  }, [pages.length]);


  const renamePage = (index: number, newName: string) => {
    setPages(prevPages => prevPages.map((page, i) =>
      i === index ? { ...page, name: newName } : page
    ));
  };

  const deletePage = (index: number) => {
    if (pages.length > 1) {
      setPages(prevPages => prevPages.filter((_, i) => i !== index));
      setCurrentPageIndex(prevIndex => Math.min(prevIndex, pages.length - 2));
    } else {
      vscode.postMessage({ command: 'deletedPageAlert', message: "You can't delete the last page." });
    }
  };



  const clearPage = (index: number) => {
    setPages(prevPages => prevPages.map((page, i) =>
      i === index ? { ...page, content: { ROOT: createDefaultPage().content.ROOT } } : page
    ));
    renamePage(index, `Page ${index + 1}`);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AccessibilityContext.Provider value={{
      selectedAccessibility: accessibility,
      setSelectedAccessibility: setSelectedAccessibility
    }}>
    <Editor resolver={{ Background, Text, Label, Button, TextBox, Image, Input, RadioButtons, Checkboxes, GridCell, Icon, Container, Dropdown, Slider }}>
      <EditorContent
        pages={pages}
        currentPageIndex={currentPageIndex}
        setCurrentPageIndex={setCurrentPageIndex}
        addPage={addPage}
        renamePage={renamePage}
        deletePage={deletePage}
        setPages={setPages}
        clearPage={clearPage}
        classes={classes}
        theme={theme}
        setTheme={setTheme}
      />
    </Editor>
    </AccessibilityContext.Provider>
  );
};

export default EditingInterface;