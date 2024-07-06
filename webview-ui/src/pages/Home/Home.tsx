import React from 'react';
import {
 LargeTitle, Body2, makeStyles, tokens, Button
} from '@fluentui/react-components';

import Projects from '../Projects/Projects';
import { StartProjectDialog } from '../../components/StartProjectDialog';
import TemplatesGrid from '../../components/TemplatesGrid';


const useStyles = makeStyles({
    projectsContainer: {
        paddingTop: "20px",
        minWidth: "100px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    }
});

const Home: React.FC = () => {
    const styles = useStyles();
    return (
        <>

            <LargeTitle>Welcome to UI Studio</LargeTitle>
            <div style={{ paddingTop: "10px" }}>
                <Button appearance='primary'>Upload Sketch</Button>
                <StartProjectDialog />
            </div>
            <div style={{ paddingTop: "20px" }}>
                <Body2>Recent Templates</Body2>
                <TemplatesGrid />
            </div>
            <div className={styles.projectsContainer}><Projects /></div>
        </>
    );
};

export default Home;
