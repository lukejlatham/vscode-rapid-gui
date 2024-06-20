// src/components/CraftEditor/Toolbox.js

import React from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="toolbox">
      <h3>Toolbox</h3>
      <div>
        <button
          ref={(ref) => connectors.create(ref, <Element is={Button} canvas />)}
        >
          Button
        </button>
        <button
          ref={(ref) => connectors.create(ref, <Element is={Text} canvas />)}
        >
          Text
        </button>
      </div>
    </div>
  );
};
