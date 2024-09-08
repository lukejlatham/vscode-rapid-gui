import React, { useState, useContext, useCallback } from "react";
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
import ComponentButtons from "./ComponentsTab/ComponentButtons";
import ProjectManagement from "./ProjectManagementButtons/ProjectManagementButtons";
import LayoutManagement from "./LayoutTab/LayoutTab";
import PagesButtons from "./PagesTab/PagesButtons";
import Settings from "./SettingsTab/Settings";
import ThemingDropdowns from "../../../Features/theming/ThemingDropdowns";
import { Page } from "../../../types";
import RestartDialog from "./ProjectManagementButtons/RestartDialog";
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
  SettingsFilled,
} from "@fluentui/react-icons";
import { FormattedMessage } from "react-intl";
import { useEditor } from "@craftjs/core";
import { BackgroundProps } from "../../../types";
import { useEffect } from "react";
import { AccessibilityContext } from "../EditingInterface";

const useStyles = makeStyles({
  accessibleSidebar: {
    maxWidth: "400px",
  },
  contentContainer: {
    padding: "10px",
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tabsBar: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    flexShrink: 0,
    flexBasis: "auto",
  },
  bottomButtons: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
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
  setTheme,
}) => {
  const localClasses = useStyles();
  const {
    actions: { setProp },
  } = useEditor();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);

  const accessibility = useContext(AccessibilityContext);

  const toggleGridLock = useCallback((selectedTab: string) => {
    setProp("ROOT", (props: BackgroundProps) => {
      props.lockedGrid = selectedTab !== "Layout";
    });
  }
    , [setProp]);

  useEffect(() => {
    toggleGridLock(selectedTab);
  }, [selectedTab, toggleGridLock]);

  const PagesIcon = selectedTab === "Pages" ? DocumentMultipleFilled : DocumentMultipleRegular;
  const LayoutIcon = selectedTab === "Layout" ? GridFilled : GridRegular;
  const ThemeIcon = selectedTab === "Theme" ? ColorFilled : ColorRegular;
  const ComponentLibraryIcon = selectedTab === "ComponentLibrary" ? LibraryFilled : LibraryRegular;
  const SettingsIcon = selectedTab === "Settings" ? SettingsFilled : SettingsRegular;

  const renderContent = () => {
    switch (selectedTab) {
      case "Layout":
        return <LayoutManagement data-testid="layout-content" />;
      case "Pages":
        return (
          <PagesButtons
            pages={pages}
            setPages={setPages}
            renamePage={renamePage}
            deletePage={deletePage}
            clearPage={clearPage}
            updateCurrentPage={updateCurrentPage}
            currentPageIndex={currentPageIndex}
            setCurrentPageIndex={setCurrentPageIndex}
            openAddPageDialog={openAddPageDialog}
            data-testid="pages-content"
          />
        );
      case "Theme":
        return <ThemingDropdowns data-testid="theme-content" />;
      case "ComponentLibrary":
        return <ComponentButtons data-testid="components-content" />;
      case "Settings":
        return <Settings classes={localClasses} theme={theme} setTheme={setTheme} data-testid="settings-content" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        ${classes.leftSidebar}
        ${accessibility.selectedAccessibility === "yes" ? localClasses.accessibleSidebar : ""}
      `} data-testid="left-sidebar">
      <div className={localClasses.tabsBar}>
        <TabList
          selectedValue={selectedTab}
          onTabSelect={(event, data) => {
            if (selectedTab === (data.value as string)) {
              setSelectedTab("");
            } else {
              setSelectedTab(data.value as string);
            }
          }}
          vertical
          appearance="subtle"
          size="large"
          data-testid="left-sidebar-tablist"
        >
          <Tooltip
            content={<FormattedMessage id="leftSidebar.layout" defaultMessage="Layout" />}
            relationship="label"
            positioning="after"
            appearance="inverted">
            <Tab icon={<LayoutIcon />} value="Layout" aria-label="Layout" data-testid="layout-tab">
              {accessibility.selectedAccessibility === "yes" && (
                <FormattedMessage id="leftSidebar.layout" defaultMessage="Layout" />
              )}
            </Tab>
          </Tooltip>

          <Tooltip
            content={<FormattedMessage id="leftSidebar.components" defaultMessage="Components" />}
            relationship="label"
            positioning="after"
            appearance="inverted">
            <Tab icon={<ComponentLibraryIcon />} value="ComponentLibrary" aria-label="Components" data-testid="components-tab">
              {accessibility.selectedAccessibility === "yes" && (
                <FormattedMessage id="leftSidebar.components" defaultMessage="Components" />
              )}
            </Tab>
          </Tooltip>

          <Tooltip
            content={<FormattedMessage id="leftSidebar.pages" defaultMessage="Pages" />}
            relationship="label"
            positioning="after"
            appearance="inverted">
            <Tab icon={<PagesIcon />} value="Pages" aria-label="Pages" data-testid="pages-tab">
              {accessibility.selectedAccessibility === "yes" && (
                <FormattedMessage id="leftSidebar.pages" defaultMessage="Pages" />
              )}
            </Tab>
          </Tooltip>

          <Tooltip
            content={<FormattedMessage id="leftSidebar.theme" defaultMessage="Theme" />}
            relationship="label"
            positioning="after"
            appearance="inverted">
            <Tab icon={<ThemeIcon />} value="Theme" aria-label="Theme" data-testid="theme-tab">
              {accessibility.selectedAccessibility === "yes" && (
                <FormattedMessage id="leftSidebar.theme" defaultMessage="Theme" />
              )}
            </Tab>
          </Tooltip>

          <Tooltip
            content={<FormattedMessage id="leftSidebar.settings" defaultMessage="Settings" />}
            relationship="label"
            positioning="after"
            appearance="inverted">
            <Tab icon={<SettingsIcon />} value="Settings" aria-label="Settings" data-testid="settings-tab">
              {accessibility.selectedAccessibility === "yes" && (
                <FormattedMessage id="leftSidebar.settings" defaultMessage="Settings" />
              )}
            </Tab>
          </Tooltip>
        </TabList>
        <div className={localClasses.bottomButtons} data-testid="utility-buttons">
          <Divider />

          <ProjectManagement
            classes={localClasses}
            pages={pages}
            setPages={setPages}
            currentPageIndex={currentPageIndex}
          />
          <Tooltip
            content={<FormattedMessage id="leftSidebar.new" defaultMessage="New" />}
            relationship="label"
            positioning="after"
            appearance="inverted">
            <Button
              data-testid="restart-dialog-button"
              onClick={() => setIsRestartDialogOpen(true)}
              appearance="primary"
              icon={<ArrowResetFilled />}
              size={accessibility.selectedAccessibility === "yes" ? "large" : "medium"}
              style={{ width: "100%" }}>
              {accessibility.selectedAccessibility === "yes" && (
                <FormattedMessage id="leftSidebar.new" defaultMessage="New" />
              )}
            </Button>
          </Tooltip>
          <RestartDialog
            data-testid="restart-dialog"
            isOpen={isRestartDialogOpen}
            onClose={() => setIsRestartDialogOpen(false)}
            openStartProjectDialog={openStartProjectDialog}
            setPages={setPages}
          />
        </div>
      </div>
      {selectedTab && <div className={localClasses.contentContainer}>{renderContent()}</div>}
    </div>
  );
};

export default LeftSidebar;
