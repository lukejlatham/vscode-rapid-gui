import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Text, Body2, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
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
    card_link: {
        textDecoration: "none",
    },
    newProjectButton: {
        color: "#8F8F8F",
        textDecoration: "none",
    },
    templateContainer: {
        paddingTop: "20px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px",
    },
});


export default function TemplatesGrid() {
    const styles = useStyles();
    return (
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
    )
};