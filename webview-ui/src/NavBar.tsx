import React from 'react';
import { Link } from 'react-router-dom';
import { CursorRegular, SlideMultipleRegular, DocumentFolderRegular, FolderPersonRegular, DeleteRegular, AddFilled } from "@fluentui/react-icons";
import { Button, makeStyles, Text } from '@fluentui/react-components';
import './NavBar.css';

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        border: "2px solid #353B3F",
        height: "100vh",
    },
    link: {
        borderRadius: "4px",
        textDecoration: "none",
        color: "white",
        transition: "background-color 0.3s",
        "&:hover": {
            backgroundColor: "#555", // Change to your desired hover background color
        },
        "&:active": {
            backgroundColor: "#444", // Change to your desired active background color
        }
    },
    icon: {
        marginRight: "10px",
    }
});


const NavBar: React.FC = () => {
    const styles = useStyles(); 
    return (
        <div className={styles.container}>
            <Link to="/projects" className={styles.link}>
                <Button appearance="primary" icon={<AddFilled/>}>New Project</Button>
            </Link>
            <Link to="/" className={styles.link}>
                <CursorRegular className={styles.icon} />
                <Text>Home</Text>
            </Link>
            <Link to="/templates" className={styles.link}>
                <SlideMultipleRegular className={styles.icon}/>
                Templates
            </Link>
            <Link to="/projects" className={styles.link}>
                <DocumentFolderRegular className={styles.icon}/>
                My Projects
            </Link>
            <Link to="/deleted" className={styles.link}>
                <DeleteRegular className={styles.icon}/>
                Deleted
            </Link>
        </div>
        // <ul className="navbar">
        //     <li>
        //         <Link to="/projects">
        //         <Button appearance="primary" icon={<AddFilled/>}>New Project</Button>
        //         </Link>
        //     </li>
        //     <li>
        //         <Link to="/">
        //             <CursorRegular className="icon" />
        //             Home
        //         </Link>
        //     </li>
        //     <li>
        //         <Link to="/templates">
        //             <SlideMultipleRegular className="icon"/>
        //             Templates
        //         </Link>
        //     </li>
        //     <li>
        //         <Link to="/projects">
        //             <DocumentFolderRegular className="icon"/>
        //             My Projects
        //         </Link>
        //     </li>
        //     <li>
        //         <Link to="/deleted">
        //             <DeleteRegular className="icon"/>
        //             Deleted
        //         </Link>
        //     </li>
        // </ul>
    );
}

export default NavBar;