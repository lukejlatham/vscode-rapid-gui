import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { Toolbox } from '../components/Toolbox';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

const EditingInterface: React.FC = () => {
  return (
    <div>
      <Editor resolver={{ Text, Button, Container }}>
        <Toolbox />
        <Frame>
          <Element canvas is={Container} padding={20} background="#f0f0f0">
            <Text text="Edit me" />
            <Button text="Click me" />
          </Element>
        </Frame>
      </Editor>
    </div>
  );
};

export default EditingInterface;
