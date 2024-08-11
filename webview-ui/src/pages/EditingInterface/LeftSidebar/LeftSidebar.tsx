import React, { useState } from "react";
import {
  makeStyles,
  Divider,
  Subtitle2,
  Card,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
} from "@fluentui/react-components";
import Header from "./Header";
import ComponentButtons from "./ComponentButtons";
import ProjectManagement from "./ProjectManagementButtons";
import { Page } from "../../../types";
import LayoutManagement from "./LayoutManagement";
import PagesButtons from "./PagesManagement";
import { GridFilled, DocumentMultipleFilled, DocumentFolderFilled, LibraryFilled} from "@fluentui/react-icons";

const useStyles = makeStyles({
  componentRoot: {
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignContent: "center",
    gap: "10px",
    padding: "5px",
  },
  header: {
    display: "flex",
    justifyContent: "start",
  },
  projectManagement: {
    paddingTop: "20px",
    textAlign: "center",
  },
  componentButtons: {
    // fontSize: '10px',
    // padding: '20px'
    cursor: "move !important",
  },
  layoutManagement: {
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignContent : "center",
    // alignItems: "center",
    gap: "5px",
    // padding: "5px",
    marginTop: "10px",
  },
  switchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: '5px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid #666666',
}
});

const LeftSidebar: React.FC<{
  classes: any;
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  currentPageIndex: number;
  setCurrentPageIndex: (index: number) => void;
  addPage: () => void;
  renamePage: (index: number, newName: string) => void;
  deletePage: (index: number) => void;
  clearPage: (index: number) => void;
  updateCurrentPage: () => void;
}> = ({
  classes,
  pages,
  setPages,
  currentPageIndex,
  setCurrentPageIndex,
  addPage,
  renamePage,
  deletePage,
  clearPage,
  updateCurrentPage,
}) => {
  const localClasses = useStyles();
//   const [openItems, setOpenItems] = useState(["ComponentLibrary", "ProjectManagement", "Layout", "Pages"]);
const [openItems, setOpenItems] = useState([""]);
  
const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };

  return (
    <Card className={`${classes.componentRoot} ${localClasses.componentRoot}`}>
      <Header classes={localClasses} />
      <Accordion openItems={openItems} onToggle={handleToggle} multiple collapsible>
        <AccordionItem value="Layout">
          <AccordionHeader size="extra-large" icon={<GridFilled/>}>Layout</AccordionHeader>
          <AccordionPanel>
            <LayoutManagement classes={localClasses} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="Pages">
          <AccordionHeader size="extra-large" icon={<DocumentMultipleFilled/>} >Pages</AccordionHeader>
          <AccordionPanel>
            <PagesButtons
              classes={localClasses}
              pages={pages}
              setPages={setPages}
              addPage={addPage}
              renamePage={renamePage}
              deletePage={deletePage}
              clearPage={clearPage}
              updateCurrentPage={updateCurrentPage}
              currentPageIndex={currentPageIndex}
              setCurrentPageIndex={setCurrentPageIndex}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="ProjectManagement">
          <AccordionHeader size="extra-large" icon={<DocumentFolderFilled/>}>Project Management</AccordionHeader>
          <AccordionPanel>
            <ProjectManagement
              classes={localClasses}
              pages={pages}
              setPages={setPages}
              currentPageIndex={currentPageIndex}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="ComponentLibrary">
          <AccordionHeader size="extra-large" icon={<LibraryFilled/>}>Component Library</AccordionHeader>
          <AccordionPanel>
            <ComponentButtons classes={localClasses} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default LeftSidebar;
