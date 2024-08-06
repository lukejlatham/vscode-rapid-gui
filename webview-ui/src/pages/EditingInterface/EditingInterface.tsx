import { Editor, SerializedNodes } from "@craftjs/core";
import { Label } from "../../components/user/Label";
import { Button } from "../../components/user/Button";
import { makeStyles } from '@fluentui/react-components';
import { TextBox } from '../../components/user/TextBox';
import { Image } from '../../components/user/Image';
import { Background } from '../../components/user/Background';
import { Input } from "../../components/user/Input";
import { RadioButton } from "../../components/user/RadioButton";
import { Checkbox } from "../../components/user/Checkbox";
import { Icon } from "../../components/user/Icon";
import { GridCell } from "../../components/user/GridCell";
import { Container } from "../../components/user/Container";
import { EditBackgroundButton } from "../../components/EditBackgroundButton";
import { Text } from "../../components/user/Text";
import { Dropdown } from "../../components/user/Dropdown";
import { Slider } from "../../components/user/Slider";
import { Page } from "../../types";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { EditorContent } from "./EditorContent";
import { vscode } from '../../utilities/vscode';

const useStyles = makeStyles({
    mainLayout: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        gap: '10px',
        alignSelf: 'center',
    },
    leftSidebar: {
        flex: '0 0 200px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    mainContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    pageNavigation: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
    },
    canvas: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '3px',
        overflow: 'hidden',
    },
    rightSidebar: {
        flex: '0 0 200px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
});

const LOCAL_STORAGE_KEY = 'userPages';

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

const EditingInterface: React.FC = () => {
    const classes = useStyles();

    const [pages, setPages] = useState<Page[]>([createDefaultPage()]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPages = () => {
          try {
            const storedPages = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedPages) {
              const parsedPages = JSON.parse(storedPages);
              if (Array.isArray(parsedPages) && parsedPages.length > 0) {
                setPages(parsedPages);
              } else {
                console.warn('Stored pages were in an unexpected format. Creating a default page.');
                setPages([createDefaultPage()]);
              }
            } else {
              console.log('No stored pages found. Creating a default page.');
              setPages([createDefaultPage()]);
            }
          } catch (error) {
            console.error('Error loading pages:', error);
            setPages([createDefaultPage()]);
          } finally {
            setIsLoading(false);
          }
        };
    
        loadPages();
      }, []);
    

      // useEffect(() => {
      //   if (!isLoading) {
      //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));
      //   }
      // }, [pages, isLoading]);

      const addPage = () => {
        const newPage = createDefaultPage();
        newPage.name = `Page ${pages.length + 1}`;
        setPages(prevPages => [...prevPages, newPage]);
        setCurrentPageIndex(pages.length);
      };
    
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
        //   alert("You can't delete the last page.");
          vscode.postMessage({ command: 'deletedPageAlert', message: "You can't delete the last page." });
        }
      };
    
      if (isLoading) {
        return <div>Loading...</div>;
      }

      const clearPage = (index: number) => {
        setPages(prevPages => prevPages.map((page, i) => 
          i === index ? { ...page, content: { ROOT: createDefaultPage().content.ROOT } } : page
        ));
        renamePage(index, `Page ${index + 1}`);
      }


    return (
        <Editor resolver={{ Background, Text, Label, Button, TextBox, Image, Input, RadioButton, Checkbox, GridCell, Icon, EditBackgroundButton, Container, Dropdown, Slider }}>
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
            />
        </Editor>
    );
};

export default EditingInterface;