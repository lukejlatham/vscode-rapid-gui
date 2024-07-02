import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Projects from './pages/Projects';
import Deleted from './pages/Deleted';
import EditingInterface from './pages/EditingInterface';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/my-projects" element={<Projects />} />
          <Route path="/deleted" element={<Deleted />} />
          <Route path="/new-project" element={<EditingInterface />} />
        </Routes>
      </Router>
  );
};

export default App;
