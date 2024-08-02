import { Page } from '../../../../types';
import RightSidebar from './RightSidebar/RightSidebar';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import { useEffect } from 'react';
import { SerializedNodes, useEditor } from '@craftjs/core';

interface EditorContentProps {
    pages: Page[];
    currentPageIndex: number;
    setCurrentPageIndex: (index: number) => void;
    addPage: () => void;
    renamePage: (index: number, newName: string) => void;
    deletePage: (index: number) => void;
    setPages: React.Dispatch<React.SetStateAction<Page[]>>;
    classes: any;
  }

export const EditorContent: React.FC<EditorContentProps> = ({
    pages,
    currentPageIndex,
    setCurrentPageIndex,
    addPage,
    renamePage,
    deletePage,
    setPages,
    classes,
  }) => {
    const { actions, query } = useEditor();
  
    useEffect(() => {
      if (pages[currentPageIndex]) {
        try {
          const stringifiedContent = JSON.stringify(pages[currentPageIndex].content);
          actions.deserialize(stringifiedContent);
        } catch (error) {
          console.error('Error deserializing page content:', error);
        }
      }
    }, [currentPageIndex, pages, actions]);
  
    const updateCurrentPage = () => {
      try {
        const serializedState = query.serialize();
        setPages(prevPages => prevPages.map((page, index) => 
          index === currentPageIndex 
            ? { ...page, content: JSON.parse(serializedState) as SerializedNodes }
            : page
        ));
      } catch (error) {
        console.error('Error updating current page:', error);
      }
    };
  
    return (
      <div className={classes.mainLayout}>
        <div className={classes.leftSidebar}>
          <LeftSidebar classes={classes} />
        </div>
        <div className={classes.mainContent}>
          <div className={classes.pageNavigation}>
            <select 
              value={currentPageIndex}
              onChange={(e) => {
                updateCurrentPage(); // Save current page before switching
                setCurrentPageIndex(Number(e.target.value));
              }}
            >
              {pages.map((page, index) => (
                <option key={page.id} value={index}>{page.name}</option>
              ))}
            </select>
            <button onClick={addPage}>Add Page</button>
            <button onClick={() => {
              const newName = prompt('Enter new page name') || pages[currentPageIndex].name;
              renamePage(currentPageIndex, newName);
            }}>
              Rename Page
            </button>
            <button onClick={() => deletePage(currentPageIndex)}>Delete Page</button>
          </div>
          <div className={classes.canvas}>
              <Canvas classes={classes} />
          </div>
        </div>
        <div className={classes.rightSidebar}>
          <RightSidebar classes={classes} />
        </div>
      </div>
    );
  };
  