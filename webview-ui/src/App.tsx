import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { FluentProvider, teamsDarkTheme, teamsLightTheme, teamsHighContrastTheme } from '@fluentui/react-components';
import "./App.css";


const App: React.FC = () => {
  const [theme, setTheme] = React.useState(teamsDarkTheme);

  return (
    <FluentProvider theme={theme}>
      <Router>
        <AppRoutes theme={theme} setTheme={setTheme}/>
      </Router>
    </FluentProvider>
  );
};

export default App;
