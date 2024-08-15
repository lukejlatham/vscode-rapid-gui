import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-components';


const useStyles = makeStyles({
  mainLayout: {
    display: 'flex',
    height: '100vh',
    width: '100vw', 
  },
  content: {
    flexGrow: 1,
    ...shorthands.padding('0px'),
    overflowY: 'auto',
    boxSizing: 'border-box', 
    backgroundColor: tokens.colorNeutralBackground1,
    color: 'white',
  },
});

const MainLayout: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainLayout}>
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
