import React, { useState } from "react";
import {
  makeStyles,
  Card,
  Button,
  TabList,
  Tab,
  Divider,
  tokens
} from "@fluentui/react-components";
import Header from "./Header";
import ComponentButtons from "./ComponentButtons";
import ProjectManagement from "./ProjectManagementButtons";
import LayoutManagement from "./LayoutManagement";
import PagesButtons from "./PagesButtons";
import { Page } from "../../../types";
import {
  GridFilled,
  DocumentMultipleFilled,
  DocumentFolderFilled,
  LibraryFilled,
  AddFilled
} from "@fluentui/react-icons";

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
  contentContainer: {
    marginTop: "10px",
    padding: "5px",
    flex: "1 0 auto",
  },
  sidebar: {
    display: "flex",
    justifyContent: "start",
    overflow: "scroll",
    height: "100%",
    // flex: "1 1 auto",

  },
  tabsBar: {
    padding: "10px",
    display: "flex",
    flex: "1 0 auto",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  bottomButtons: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    gap: "10px",
  },
  layoutManagement: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
    gap: '10px',
  },
  switchContainer: {
    width: '100%',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '5px',
  },
  componentButtons: {
    cursor: "move !important",
  }
});

interface LeftSidebarProps {
  classes: any;
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  currentPageIndex: number;
  setCurrentPageIndex: (index: number) => void;
  renamePage: (index: number, newName: string) => void;
  deletePage: (index: number) => void;
  clearPage: (index: number) => void;
  updateCurrentPage: () => void;
  openStartProjectDialog: () => void;
  openAddPageDialog: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  classes,
  pages,
  setPages,
  currentPageIndex,
  setCurrentPageIndex,
  renamePage,
  deletePage,
  clearPage,
  updateCurrentPage,
  openStartProjectDialog,
  openAddPageDialog,
}) => {
  const localClasses = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>("");

  const renderContent = () => {
    switch (selectedTab) {
      case "Layout":
        return <LayoutManagement classes={localClasses} />;
      case "Pages":
        return (
          <PagesButtons
            classes={localClasses}
            pages={pages}
            setPages={setPages}
            renamePage={renamePage}
            deletePage={deletePage}
            clearPage={clearPage}
            updateCurrentPage={updateCurrentPage}
            currentPageIndex={currentPageIndex}
            setCurrentPageIndex={setCurrentPageIndex}
            openAddPageDialog={openAddPageDialog}
          />
        );
      case "ProjectManagement":
        return (
          <ProjectManagement
            classes={localClasses}
            pages={pages}
            setPages={setPages}
            currentPageIndex={currentPageIndex}
          />
        );
      case "ComponentLibrary":
        return <ComponentButtons classes={localClasses} />;
      default:
        return null;
    }
  };

    

  return (
    <div className={`${localClasses.sidebar}`}>
      {/* <Header classes={localClasses} /> */}
      <div className={localClasses.tabsBar}>
      <TabList
        selectedValue={selectedTab}
        onTabSelect={(event, data) => 
          {if (selectedTab === data.value as string) {
            setSelectedTab("");
          } else {
          setSelectedTab(data.value as string)}
        }}
        vertical
        appearance="subtle"
        size="medium"
      >
        <Tab icon={<GridFilled />} value="Layout" aria-label="Layout" >
        Layout
        </Tab>
        <Tab
          icon={<DocumentMultipleFilled />}
          value="Pages"
          aria-label="Pages"
        > Pages </Tab>
        <Tab
          icon={<DocumentFolderFilled />}
          value="Theme"
          aria-label="Theme"
        >
          Theme
        </Tab>
        <Tab
          icon={<LibraryFilled />}
          value="ComponentLibrary"
          aria-label="Component Library"
        >
          Component
        </Tab>
      </TabList>
      <div className={localClasses.bottomButtons}>
      <ProjectManagement
            classes={localClasses}
            pages={pages}
            setPages={setPages}
            currentPageIndex={currentPageIndex}
          />
      <Button onClick={openStartProjectDialog} icon={<AddFilled/>}>New</Button>
      </div>
      </div>
      <div className={localClasses.contentContainer}>{renderContent()}</div>
    </div>
  );
};

export default LeftSidebar;
