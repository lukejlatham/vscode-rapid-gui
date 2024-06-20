// src/pages/EditorPage/EditorPage.js

// src/pages/EditorPage/EditorPage.js

import React from 'react';
import CraftEditor from '../../components/CraftEditor/CraftEditor';
import './EditorPage.css';

const EditorPage = () => {
  return (
    <div className="editor-page">
      <div className="editor-section">
        <CraftEditor />
      </div>
    </div>
  );
};

export default EditorPage;
