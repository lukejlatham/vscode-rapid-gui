// src/components/CraftEditor/CraftEditor.js

import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { Toolbox } from '../Toolbox';
import { Button } from '../Button';
import { Text } from '../Text';
import NodeTree from '../NodeTree/NodeTree';
import NodeTreeRepresentation from '../NodeTree/NodeTreeRepresentation';
import './CraftEditor.css';

const CraftEditor = () => {
  return (
    <div className="craft-editor">
      <Editor resolver={{ Button, Text }}>
        <div className="editor-container">
          <div className="editor-section">
            <div className="editor-box">
<h3 className="container-header">Editor Container</h3>
              <Frame>
                <Element canvas is="div" className="craft-frame">
                  <Text text="Hello, world!" />
                  <Button text="Click me" />
                </Element>
              </Frame>
              <Toolbox />
            </div>
            <div className="additional-box">
              <NodeTreeRepresentation />
            </div>
          </div>
          <div className="node-tree-box">
            <NodeTree />
          </div>
        </div>
      </Editor>
    </div>
  );
};

export default CraftEditor;