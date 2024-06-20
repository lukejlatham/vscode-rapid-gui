// src/components/NodeTree/NodeTreeRepresentation.js

import React, { useEffect, useState } from 'react';
import { useEditor } from '@craftjs/core';
import { getElementPositions } from '../../utils/getElementPositions';
import './NodeTreeRepresentation.css';

const NodeTreeRepresentation = () => {
  const { query } = useEditor((state) => ({
    nodes: state.nodes,
  }));

  const [positions, setPositions] = useState([]);
const nodes = query.getSerializedNodes();

useEffect(() => {
  // Extract positions after the elements have been rendered
  const positions = getElementPositions();
  setPositions(positions);
}, [nodes]);

  const buildNodeTree = (nodeId, level = 0) => {
    const node = nodes[nodeId];
    const { displayName, props, type, nodes: childNodes } = node;
    const position = positions.find(pos => pos.id === nodeId) || {};

    return (
      <div key={nodeId} style={{ paddingLeft: level * 20 }}>
        <div className="node-details">
          <strong>ID:</strong> {nodeId} <br />
          <strong>Type:</strong> {type.resolvedName || displayName} <br />
          <strong>Props:</strong> {JSON.stringify(props)} <br />
          <strong>Level:</strong> {level} <br />
          <strong>X:</strong> {position.x !== undefined ? position.x : 'N/A'} <br />
          <strong>Y:</strong> {position.y !== undefined ? position.y : 'N/A'} <br />
          <strong>Width:</strong> {position.width !== undefined ? position.width : 'N/A'} <br />
          <strong>Height:</strong> {position.height !== undefined ? position.height : 'N/A'}
        </div>
        {childNodes && childNodes.map((childId) => buildNodeTree(childId, level + 1))}
      </div>
    );
  };

  return (
    <div className="node-tree-representation-container">
      <h3>Node Tree Representation</h3>
      <div className="node-tree-representation">
        {nodes.ROOT && buildNodeTree('ROOT')}
      </div>
    </div>
  );
};

export default NodeTreeRepresentation;
