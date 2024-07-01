import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';
import NavBar from './NavBar';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Projects from './pages/Projects';
import Deleted from './pages/Deleted';

const App: React.FC = () => {
  return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/my-projects" element={<Projects />} />
          <Route path="/deleted" element={<Deleted />} />
        </Routes>
      </Router>
  );
};

export default App;
