import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';
import NavBar from './NavBar';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Projects from './pages/Shared';
import Deleted from './pages/Draft';


const App = () => {
  return (
    <>
      <h1>App</h1>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/my-projects" element={<Projects />} />
          <Route path="/deleted" element={<Deleted />} />
        </Routes>
      </Router>
      </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <FluentProvider theme={teamsDarkTheme}>
      <App />
  </FluentProvider>
);