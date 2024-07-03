import React from 'react';
import { Text, LargeTitle, Title2, Body2, Subtitle1, makeStyles, Card, CardHeader, CardPreview, CardFooter } from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import Projects from '../Projects/Projects';

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
        background: "F35325"
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
            <div>
                <LargeTitle>Welcome to UI Studio</LargeTitle>
                <br />
                <Link to="/" className={styles.newProjectButton}>+ Start New Project</Link>
            </div>
            <div>
                <br />
                <Body2>Recent Templates</Body2>
                <div className={styles.templateContainer}>
                    <Link to="/templates" className={styles.card_link}>
                        <Card className={styles.web_card} appearance='filled'>
                            <CardHeader header={<Body2>Web App</Body2>} description={<Text className={styles.newProjectButton}>1920 x 1080 px</Text>} />
                        </Card>
                    </Link>
                    <Link to="/templates" className={styles.card_link}>
                        <Card className={styles.mobile_card} appearance='filled-alternative'>
                            <CardHeader header={<Body2>Mobile</Body2>} description={<Text className={styles.newProjectButton}>1920 x 1080 px</Text>} />
                        </Card>
                    </Link>
                    <Link to="/templates" className={styles.card_link}>
                        <Card className={styles.square_card} appearance='filled-alternative'>
                            <CardHeader header={<Body2>Square</Body2>} description={<Text className={styles.newProjectButton}>1920 x 1080 px</Text>} />
                        </Card>
                    </Link>
                    <Link to="/templates" className={styles.card_link}>
                        <Card className={styles.landscape_card} appearance='filled-alternative'>
                            <CardHeader header={<Body2>Landscape</Body2>} description={<Text className={styles.newProjectButton}>1920 x 1080 px</Text>} />
                        </Card>
                    </Link>
                </div>
            </div>
            <div className={styles.projectsContainer}><Projects /></div>
        </>
    );
};

export default Home;
