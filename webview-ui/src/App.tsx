// import { vscode } from "./utilities/vscode";
// import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
// import "./App.css";

// const VSCodeButtonAny = VSCodeButton as any;

// function App() {
//   function handleHowdyClick() {
//     vscode.postMessage({
//       command: "hello",
//       text: "Hey there partner! 🤠",
//     });
//   }

//   return (
//     <main>
//       <h1>Hello Georges! </h1>
//       <VSCodeButtonAny onClick={handleHowdyClick}>Howdy!</VSCodeButtonAny>
//     </main>
//   );
// }

// export default App;

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
