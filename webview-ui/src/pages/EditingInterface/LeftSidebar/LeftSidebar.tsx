import { makeStyles, Divider, Subtitle2, Card, Tooltip, tokens, useId } from "@fluentui/react-components";
import Header from './Header';
import SearchComponent from './SearchComponent';
import ComponentButtons from './ComponentButtons';
import ProjectManagement from './ProjectManagementButtons';
import { DrawerProps } from '@fluentui/react-components';
import * as React from 'react';
import {
  Hamburger,
  Nav,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,
} from '@fluentui/react-nav-preview';

const useStyles = makeStyles({
    root: {
      overflow: 'hidden',
      display: 'flex',
      height: '100vh',
    },
    content: {
      flex: '1',
      padding: '16px',
      display: 'grid',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  });

type DrawerType = Required<DrawerProps>['type'];

export interface LeftSidebarProps {
    classes: Record<"mainLayout" | "leftSidebar" | "canvas" | "rightSidebar", string>;

}

export const LeftSidebar = (props: Partial<NavDrawerProps>) => {
    const styles = useStyles();
    const [isOpen, setIsOpen] = React.useState(true);
    const [type, setType] = React.useState<DrawerType>('inline');

    const renderHamburgerWithToolTip = () => (
        <Tooltip content='Navigation' relationship='label'>
            <Hamburger onClick={() => setIsOpen(!isOpen)} />
        </Tooltip>
    );

    return (
        <div className={styles.root}>
            <NavDrawer
                defaultSelectedValue='2'
                defaultSelectedCategoryValue='1'
                open={isOpen}
                type={type}
                {...props}
            >
                <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
                <NavDrawerBody>
                    <Header classes={styles} />
                    <SearchComponent classes={styles} />
                    <NavSectionHeader>Layout</NavSectionHeader>
                    <ComponentButtons classes={styles} />
                    <NavDivider />
                    <NavSectionHeader>Project Management</NavSectionHeader>
                    <ProjectManagement classes={styles} />
                    <NavDivider />
                    <NavSectionHeader>Project Management</NavSectionHeader>
                    <ProjectManagement classes={styles} />
                </NavDrawerBody>
            </NavDrawer>
        </div>
    );
}

export default LeftSidebar;