import React, { useState, useContext } from "react";
import {
  makeStyles,
  Button,
  TabList,
  Tab,
  Divider,
  tokens,
  Theme,
  Tooltip,
} from "@fluentui/react-components";
import Header from "./Header";
import ComponentButtons from "./ComponentButtons";
import ProjectManagement from "./ProjectManagementButtons";
import LayoutManagement from "./LayoutManagement";
import PagesButtons from "./PagesButtons";
import Settings from "./Settings";
import ThemingDropdowns from "../../../Features/theming/ThemingDropdowns";
import { Page } from "../../../types";
import { RestartDialog } from "./RestartDialog";
import {
  GridFilled,
  GridRegular,
  DocumentMultipleFilled,
  DocumentMultipleRegular,
  ColorFilled,
  ColorRegular,
  LibraryFilled,
  LibraryRegular,
  ArrowResetFilled,
  SettingsRegular,
  SettingsFilled
} from "@fluentui/react-icons";
import { FormattedMessage } from "react-intl";
import { useEditor } from "@craftjs/core";
import { BackgroundProps } from "../../../types";
import { useEffect } from "react";
import { AccessibilityContext } from "../EditingInterface";

const useStyles = makeStyles({
  componentRoot: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignContent: "center",
    gap: "10px",
    padding: "5px",
  },
    boxShadowAnimation: {
      outline: `2px solid ${tokens.colorBrandForeground1}`,
    animationPlayState: "running",
    animationDelay: "0s",
    animationTimingFunction: "ease",
    animationDirection: "alternate",
    animationDuration: "2s",
    animationIterationCount: "infinite",
    userSelect: "none",
    animationName: {
      from: {
        boxShadow: `0 0 0 0 ${tokens.colorBrandForeground1}`,
      },
      to: {
        boxShadow: `0 0  10px ${tokens.colorBrandForeground1} `,
      },
    },
  },
  contentContainer: {
    padding: "15px",
    flexGrow: 1, // Allow content to grow and take available space
    flexShrink: 1,
    height: "100%",
    boxSizing: "border-box",
    gap: "10px",
  },
  sidebar: {
    display: "flex",
    justifyContent: "start",
    height: "100%",
  },
  sidebarExtended: {
    width: "280px",
  },
  tabsBar: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    flexShrink: 0,
  },
  bottomButtons: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  layoutManagement: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'Left',
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
  const { actions: { setProp } } = useEditor();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);

  const accessibility = useContext(AccessibilityContext);
  const toggleGridLock = (selectedTab: string) => {

    setProp("ROOT", (props: BackgroundProps) => {
      props.lockedGrid = selectedTab !== "Layout";
    });
  };

  useEffect(() => {
    toggleGridLock(selectedTab);
  }, [selectedTab]);

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
        return <ThemingDropdowns />;
      case "ComponentLibrary":
        return <ComponentButtons classes={localClasses} />;
      case "Settings":
        return <Settings classes={localClasses} theme={theme} setTheme={setTheme} />;
      default:
        return null;
    }
  };



    return (
    <div className={`${localClasses.sidebar} ${selectedTab !== '' ? localClasses.sidebarExtended : '' }`}>
      <div className={localClasses.tabsBar}>
        <TabList
          selectedValue={selectedTab}
          onTabSelect={(event, data) => {
            if (selectedTab === data.value as string) {
              setSelectedTab("");
            } else {
              setSelectedTab(data.value as string)
            }
          }}
          vertical
          appearance="subtle"
          size="large"
        >
          <Tooltip content={<FormattedMessage id="leftSidebar.layout" defaultMessage="Layout"/>}
          relationship="label" positioning="after" appearance="inverted">
          <Tab icon={<LayoutIcon />} value="Layout" aria-label="Layout">
            {accessibility.selectedAccessibility === 'yes' && 
            (<FormattedMessage
              id="leftSidebar.layout"
              defaultMessage="Layout"
            />)}
          </Tab>
          </Tooltip>

          <Tooltip content={<FormattedMessage id="leftSidebar.components" defaultMessage="Components"/>}
          relationship="label" positioning="after" appearance="inverted">
          <Tab icon={<ComponentLibraryIcon />} value="ComponentLibrary" aria-label="Components">
            {accessibility.selectedAccessibility === 'yes' && 
            (<FormattedMessage
              id="leftSidebar.components"
              defaultMessage="Components"
            />)}
          </Tab>
          </Tooltip>

          <Tooltip content={<FormattedMessage id="leftSidebar.pages" defaultMessage="Pages"/>}
          relationship="label" positioning="after" appearance="inverted">
          <Tab icon={<PagesIcon />} value="Pages" aria-label="Pages">
          {accessibility.selectedAccessibility === 'yes' && 
          (<FormattedMessage
              id="leftSidebar.pages"
              defaultMessage="Pages"
            />)}
          </Tab>
          </Tooltip>

          <Tooltip content={<FormattedMessage id="leftSidebar.theme" defaultMessage="Theme"/>}
          relationship="label" positioning="after" appearance="inverted">
          <Tab icon={<ThemeIcon />} value="Theme" aria-label="Theme">
          {accessibility.selectedAccessibility === 'yes' && (<FormattedMessage
              id="leftSidebar.theme"
              defaultMessage="Theme"
            />)}
          </Tab>
          </Tooltip>

          <Tooltip content={<FormattedMessage id="leftSidebar.settings" defaultMessage="Settings"/>}
          relationship="label" positioning="after" appearance="inverted">
          <Tab icon={<SettingsIcon />} value="Settings" aria-label="Settings">
            {accessibility.selectedAccessibility === 'yes' && (<FormattedMessage
              id="leftSidebar.settings"
              defaultMessage="Settings"
            />)}
          </Tab>
          </Tooltip>
        </TabList>
        <div className={localClasses.bottomButtons}>
                  <Divider />

          <ProjectManagement
            classes={localClasses}
            pages={pages}
            setPages={setPages}
            currentPageIndex={currentPageIndex}
          />
          <Tooltip content={<FormattedMessage id="leftSidebar.new" defaultMessage="New" />} relationship="label" positioning="after" appearance="inverted">
          <Button onClick={() => setIsRestartDialogOpen(true)} appearance="primary" icon={<ArrowResetFilled />} size={
                    accessibility.selectedAccessibility === 'yes' ? 'large' : 'medium'
                }>
            {accessibility.selectedAccessibility === 'yes' && (<FormattedMessage
              id="leftSidebar.new"
              defaultMessage="New"
            />)}
          </Button>
          </Tooltip>
          <RestartDialog isOpen={isRestartDialogOpen} onClose={() => setIsRestartDialogOpen(false)} openStartProjectDialog={openStartProjectDialog} />
        </div>
      </div>
      <div className={localClasses.contentContainer}>{renderContent()}</div>
    </div>
  );
};

export default LeftSidebar;
