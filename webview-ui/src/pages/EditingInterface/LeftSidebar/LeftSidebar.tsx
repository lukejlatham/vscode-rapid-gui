import React, { useState } from "react";
import {
  makeStyles,
  Card,
  Button,
  TabList,
  Tab,
  Divider,
  tokens,
  Theme,
} from "@fluentui/react-components";
import Header from "./Header";
import ComponentButtons from "./ComponentButtons";
import ProjectManagement from "./ProjectManagementButtons";
import LayoutManagement from "./LayoutManagement";
import PagesButtons from "./PagesButtons";
import Settings from "./Settings";
import { ThemeDropdown } from "../../../Features/theming/ThemeDropdown";
import { Page } from "../../../types";
import {
  GridFilled,
  GridRegular,
  DocumentMultipleFilled,
  DocumentMultipleRegular,
  ColorFilled,
  ColorRegular,
  LibraryFilled,
  LibraryRegular,
  AddFilled,
  SettingsRegular,
  SettingsFilled
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
    padding: "5px",
  },
  sidebar: {
    display: "flex",
    justifyContent: "start",
    overflow: "scroll",
    height: "100%",

  },
  tabsBar: {
    padding: "10px",
    display: "flex",
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
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
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
  theme,
  setTheme
}) => {
  const localClasses = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>("");

  const PagesIcon = selectedTab === "Pages" ? DocumentMultipleFilled : DocumentMultipleRegular;
  const LayoutIcon = selectedTab === "Layout" ? GridFilled : GridRegular;
  const ThemeIcon = selectedTab === "Theme" ? ColorFilled : ColorRegular;
  const ComponentLibraryIcon = selectedTab === "ComponentLibrary" ? LibraryFilled : LibraryRegular;
  const SettingsIcon = selectedTab === "Settings" ? SettingsFilled : SettingsRegular;


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
      case "Theme":
        return <ThemeDropdown />;
      case "ComponentLibrary":
        return <ComponentButtons classes={localClasses} />;
      case "Settings":
        return <Settings classes={localClasses} theme={theme} setTheme={setTheme} />;
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
        <Tab icon={<LayoutIcon />} value="Layout" aria-label="Layout" >
        Layout
        </Tab>
        <Tab
          icon={<PagesIcon />}
          value="Pages"
          aria-label="Pages"
        > Pages </Tab>
        <Tab
          icon={<ThemeIcon />}
          value="Theme"
          aria-label="Theme"
        >
          Theme
        </Tab>
        <Tab
          icon={<ComponentLibraryIcon />}
          value="ComponentLibrary"
          aria-label="Component Library"
        >
          Components
        </Tab>
        <Tab
          icon={<SettingsIcon />}
          value="Settings"
          aria-label="Settings"
        >
          Settings
        </Tab>
      </TabList>
      <div className={localClasses.bottomButtons}>
      <ProjectManagement
            classes={localClasses}
            pages={pages}
            setPages={setPages}
            currentPageIndex={currentPageIndex}
          />
      <Button onClick={openStartProjectDialog} appearance="primary" icon={<AddFilled/>}>New</Button>
      </div>
      </div>
      <div className={localClasses.contentContainer}>{renderContent()}</div>
    </div>
  );
};

export default LeftSidebar;
