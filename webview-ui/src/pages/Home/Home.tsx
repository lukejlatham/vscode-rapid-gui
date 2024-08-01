import React from 'react';
import {
    Title1, Body2, makeStyles,
} from '@fluentui/react-components';

import Projects from '../Projects/Projects';
import { StartProjectDialog } from '../../components/StartProjectDialog';
import TemplatesGrid from '../../components/TemplatesGrid';
import ImageUploadButton from '../../components/SketchUpload/ImageUploadButton';
import { title } from 'process';
import { Color } from 'vscode';


const useStyles = makeStyles({
    projectsContainer: {
        paddingTop: "40px",
        minWidth: "100px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
});

const Home: React.FC = () => {
    const styles = useStyles();
    return (
        <>
            <Title1 color='e8ebfa'>Welcome to UI Studio</Title1>
            <div style={{ paddingTop: "15px" }}>
                <ImageUploadButton />
                <StartProjectDialog />
            </div>
            <div style={{ paddingTop: "30px" }}>
                <Body2>Project Templates</Body2>
                <TemplatesGrid />
            </div>
            <div className={styles.projectsContainer}><Projects /></div>
        </>
    );
};

export default Home;
