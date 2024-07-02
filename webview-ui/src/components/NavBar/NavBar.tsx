import React from 'react';
import {
  NavDrawer,
  NavDrawerHeader,
  NavDrawerBody,
  NavItem,
  NavDivider,
  Hamburger,
} from '@fluentui/react-nav-preview';
import {  Tooltip,
  makeStyles,}
  from '@fluentui/react-components'
import {
  Board20Filled,
  Board20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  Delete20Filled,
  Delete20Regular,
  bundleIcon,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '100vh',
  },
});

const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Templates = bundleIcon(DocumentBulletListMultiple20Filled, DocumentBulletListMultiple20Regular);
const Projects = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const Deleted = bundleIcon(Delete20Filled, Delete20Regular);

const NavBar: React.FC = () => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(true);

  const renderHamburgerWithToolTip = () => (
    <Tooltip content="Navigation" relationship="label">
      <Hamburger onClick={() => setIsOpen(!isOpen)} />
    </Tooltip>
  );

  return (
    <div className={styles.root}>
      <NavDrawer open={isOpen} type="inline">
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
        <NavDrawerBody>
          <NavItem href="/" icon={<Dashboard />} value="1">
            Home
          </NavItem>
          <NavItem href="/templates" icon={<Templates />} value="2">
            Templates
          </NavItem>
          <NavItem href="/my-projects" icon={<Projects />} value="3">
            My Projects
          </NavItem>
          <NavItem href="/deleted" icon={<Deleted />} value="4">
            Deleted
          </NavItem>
          <NavDivider />
        </NavDrawerBody>
      </NavDrawer>
      {!isOpen && renderHamburgerWithToolTip()}
    </div>
  );
};

export default NavBar;
