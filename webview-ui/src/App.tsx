import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';

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
