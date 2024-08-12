import { Page } from "../../types";
import RightSidebar from "./RightSidebar/RightSidebar";
import Canvas from "./Canvas";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import { useEffect, useCallback, useState } from "react";
import { SerializedNodes, useEditor } from "@craftjs/core";
import { StartProjectDialog } from "../../components/StartProjectDialog";

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

  const handleAddPage = () => {
    addPage();
    setIsStartProjectDialogOpen(true);
  };

  return (
    <div className={classes.mainLayout}>
      <div className={classes.leftSidebar}>
        <LeftSidebar
          classes={classes}
          pages={pages}
          setPages={setPages}
          currentPageIndex={currentPageIndex}
          setCurrentPageIndex={setCurrentPageIndex}
          addPage={handleAddPage}
          renamePage={renamePage}
          deletePage={deletePage}
          clearPage={clearPage}
          updateCurrentPage={updateCurrentPage}
          openStartProjectDialog={() => setIsStartProjectDialogOpen(true)}
        />
      </div>
      <StartProjectDialog
        isOpen={isStartProjectDialogOpen}
        onClose={() => setIsStartProjectDialogOpen(false)}
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