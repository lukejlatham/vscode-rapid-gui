import { Page } from "../../types";
import Canvas from "./Canvas";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import { useEffect, useCallback, useState } from "react";
import { SerializedNodes, useEditor } from "@craftjs/core";
import { StartProjectDialog } from "./StartProjectDialog";
import { AddPageDialog } from "./LeftSidebar/PagesTab/AddPageDialog";
import PropertyInspector from "./RightSidebar/PropertyInspector";

export interface EditorContentProps {
  pages: Page[];
  currentPageIndex: number;
  setCurrentPageIndex: (index: number) => void;
  addPage: () => void;
  renamePage: (index: number, newName: string) => void;
  deletePage: (index: number) => void;
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  clearPage: (index: number) => void;
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
  clearPage,
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
    <div className={classes.mainLayout} data-testid="editor-content">
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
      />
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
        <Canvas />
      </div>
      <PropertyInspector classes={classes} />
    </div>
  );
};
