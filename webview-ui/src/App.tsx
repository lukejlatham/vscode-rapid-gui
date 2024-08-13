import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { FluentProvider, teamsDarkTheme, teamsLightTheme, teamsHighContrastTheme } from '@fluentui/react-components';
import "./App.css";


const App: React.FC = () => {
  return (
    <FluentProvider theme={teamsDarkTheme}>
      <Router>
        <AppRoutes />
      </Router>
    </FluentProvider>
  );
};

export default App;
