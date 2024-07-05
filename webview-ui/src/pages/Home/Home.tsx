import React from 'react';
import {
 LargeTitle, Body2, makeStyles, tokens, Button
} from '@fluentui/react-components';

import Projects from '../Projects/Projects';
import { StartProjectDialog } from '../../components/NavBar/StartProjectDialog';
import TemplatesGrid from '../../components/TemplatesGrid';


const useStyles = makeStyles({
    newProjectButton: {
        color: "#8F8F8F",
        textDecoration: "none",
    },
    card_link: {
        textDecoration: "none",
    },
    templateContainer: {
        paddingTop: "20px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px",
    },
    projectsContainer: {
        paddingTop: "20px",
        minWidth: "100px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    web_card: {
        width: "280px",
        height: "250px",
        color: tokens.colorNeutralForeground2
    },
    mobile_card: {
        width: "170px",
        height: "250px",
        background: "3A3D41"
    },
    square_card: {
        width: "250px",
        height: "250px",
        background: "3A3D41"
    },
    landscape_card: {
        width: "300px",
        height: "250px",
        background: "3A3D41"
    },
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
