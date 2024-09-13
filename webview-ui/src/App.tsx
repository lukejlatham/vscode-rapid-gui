import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { FluentProvider } from '@fluentui/react-components';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import "./App.css";


const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <FluentProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </FluentProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};
export default App;