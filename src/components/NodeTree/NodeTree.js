// src/components/NodeTree/NodeTree.js

import React from 'react';
import { useEditor } from '@craftjs/core';
import './NodeTree.css';

const NodeTree = () => {
  const { query } = useEditor((state) => ({
    nodes: state.nodes,
  }));

  return (
    <div className="node-tree-container">
      <h3>Node Tree</h3>
      <pre className="node-tree-content">{JSON.stringify(query.getSerializedNodes(), null, 2)}</pre>
    </div>
  );
};

export default NodeTree;
