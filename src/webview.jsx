import React from 'react';
import ReactDOM from 'react-dom';
import { Typography, Paper, Grid, makeStyles } from '@material-ui/core';
import { Editor, Frame, Element } from '@craftjs/core';

import { SettingsPanel } from './components/SettingsPanel';
import { Toolbox } from './components/Toolbox';
import { Topbar } from './components/Topbar';
import { Button } from './components/user/Button';
import { Card, CardBottom, CardTop } from './components/user/Card';
import { Container } from './components/user/Container';
import { Text } from './components/user/Text';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    background: 'rgb(252, 253, 253)',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Editor
      resolver={{
        Card,
        Button,
        Text,
        Container,
        CardTop,
        CardBottom,
      }}
    >
      <Topbar />
      <Grid container spacing={5} style={{ paddingTop: '10px' }}>
        <Grid item xs>
          <Frame>
            <Element
              canvas
              is={Container}
              padding={5}
              background="#eeeeee"
              data-cy="root-container"
            >
              <Card data-cy="frame-card" />
              <Button text="Click me" size="small" data-cy="frame-button" />
              <Text fontSize={20} text="Hi world!" data-cy="frame-text" />
              <Element
                canvas
                is={Container}
                padding={6}
                background="#999999"
                data-cy="frame-container"
              >
                <Text
                  size="small"
                  text="It's me again!"
                  data-cy="frame-container-text"
                />
              </Element>
            </Element>
          </Frame>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.root}>
            <Toolbox />
            <SettingsPanel />
          </Paper>
        </Grid>
      </Grid>
    </Editor>
  );
};

ReactDOM.render(<App />, document.getElementById('editor'));
