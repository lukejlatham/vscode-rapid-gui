import React from 'react';
import { Link } from 'react-router-dom';
import { CursorRegular, SlideMultipleRegular, DocumentFolderRegular, DeleteRegular, AddFilled } from "@fluentui/react-icons";
import { Button } from '@fluentui/react-components';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/my-projects">
            <Button appearance="primary" icon={<AddFilled />}>New Project</Button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <CursorRegular className="icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/templates">
            <SlideMultipleRegular className="icon" />
            Templates
          </Link>
        </li>
        <li>
          <Link to="/my-projects">
            <DocumentFolderRegular className="icon" />
            My Projects
          </Link>
        </li>
        <li>
          <Link to="/deleted">
            <DeleteRegular className="icon" />
            Deleted
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
