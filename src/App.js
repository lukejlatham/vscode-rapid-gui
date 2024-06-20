// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/EditorPage/EditorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </Router>
  );
};

export default App;