import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  mainLayout: {
    display: 'flex',
    height: '100vh',
  },
  content: {
    flexGrow: 1, /* Take up remaining space */
    ...shorthands.padding('20px'),
    overflowY: 'auto',
    boxSizing: 'border-box', /* Include padding in width and height calculations */
    backgroundColor: '#2a2a2a', /* Background color of the content area to match the body */
    color: '#fff', /* Text color */
  },
});

const MainLayout: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainLayout}>
      <NavBar />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
