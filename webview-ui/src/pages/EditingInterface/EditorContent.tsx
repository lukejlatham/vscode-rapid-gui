import { Page } from "../../types";
import RightSidebar from "./RightSidebar/RightSidebar";
import Canvas from "./Canvas";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import { useEffect, useCallback, useState } from "react";
import { SerializedNodes, useEditor } from "@craftjs/core";
import { StartProjectDialog } from "../../components/StartProjectDialog";
import { AddPageDialog } from "../../components/AddPageDialog";
import { Theme } from "@fluentui/react-components";

interface EditorContentProps {
  pages: Page[];
  currentPageIndex: number;
  setCurrentPageIndex: (index: number) => void;
  addPage: () => void;
  renamePage: (index: number, newName: string) => void;
  deletePage: (index: number) => void;
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  clearPage: (index: number) => void;
  classes: any;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
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
  clearPage,
  theme,
  setTheme
}) => {
  const { actions, query } = useEditor();
  const [isStartProjectDialogOpen, setIsStartProjectDialogOpen] = useState(true);
  const [isAddPageDialogOpen, setIsAddPageDialogOpen] = useState(false);

  useEffect(() => {
    if (pages[currentPageIndex]) {
      try {
        const stringifiedContent = JSON.stringify(pages[currentPageIndex].content);
        actions.deserialize(stringifiedContent);
      } catch (error) {
        console.error("Error deserializing page content:", error);
      }
    }
  }, [currentPageIndex, pages, actions]);

  const updateCurrentPage = useCallback(() => {
    try {
      const serializedState = query.serialize();
      console.log("Current index:", currentPageIndex);
      setPages((prevPages) =>
        prevPages.map((page, index) =>
          index === currentPageIndex
            ? { ...page, content: JSON.parse(serializedState) as SerializedNodes }
            : page
        )
      );
      console.log("updated page: ", currentPageIndex);
      console.log("updated page content: ", serializedState);
    } catch (error) {
      console.error("Error updating current page:", error);
    }
  }, [currentPageIndex, query, setPages]);

  return (
    <div className={classes.mainLayout}>
      <div className={classes.leftSidebar}>
        <LeftSidebar
          classes={classes}
          pages={pages}
          setPages={setPages}
          currentPageIndex={currentPageIndex}
          setCurrentPageIndex={setCurrentPageIndex}
          renamePage={renamePage}
          deletePage={deletePage}
          clearPage={clearPage}
          updateCurrentPage={updateCurrentPage}
          openStartProjectDialog={() => setIsStartProjectDialogOpen(true)}
          openAddPageDialog={() => setIsAddPageDialogOpen(true)}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      <StartProjectDialog
        isOpen={isStartProjectDialogOpen}
        onClose={() => setIsStartProjectDialogOpen(false)}
        pages={pages}
        setPages={setPages}
      />
      <AddPageDialog
        isOpen={isAddPageDialogOpen}
        onClose={() => setIsAddPageDialogOpen(false)}
        pages={pages}
        setPages={setPages}
        />
      <div className={classes.mainContent}>
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