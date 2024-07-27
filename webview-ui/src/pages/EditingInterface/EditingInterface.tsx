import { Editor } from "@craftjs/core";
import { Label } from "../../components/user/Label";
import { Container } from '../../components/user/Container';
import { Button } from '../../components/user/Button';
import { makeStyles } from '@fluentui/react-components';
import { Rows, Row } from '../../components/user/Rows';
import { Columns, Column } from '../../components/user/Columns';
import { TextBox } from '../../components/user/TextBox';
import { Image } from '../../components/user/Image';
import { Background } from '../../components/user/Background';
import { UserInput } from "../../components/user/Input";
import { RadioButton } from "../../components/user/RadioButton";
import { Checkbox } from "../../components/user/Checkbox";
import RightSidebar from './RightSidebar/RightSidebar';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar/LeftSidebar';

const useStyles = makeStyles({
    mainLayout: {
        display: 'flex',
        height: '100vh',
        width: '100vw', // Ensure it takes the full width of the window
        gap: '10px',
        alignSelf: 'center',
    },
    leftSidebar: {
        flex: '0 0 200px', // Fixed width for the component library
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    canvas: {
        flexGrow: 1, // Allow the canvas to grow and shrink as needed
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '3px',
        overflow: 'hidden', // Prevent overflow
    },
    rightSidebar: {
        flex: '0 0 200px', // Fixed width for the sidebar
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
});

const EditingInterface: React.FC = () => {
    const classes = useStyles();

    return (
        <Editor resolver={{ Background, Label, Container, Button, Rows, Row, Column, Columns, TextBox, Image, UserInput, RadioButton, Checkbox }}>
            <div className={classes.mainLayout}>
                <div className={classes.leftSidebar}>
                    <LeftSidebar classes={classes} />
                </div>
                <div className={classes.canvas}>
                    <Canvas classes={classes} />
                </div>
                <div className={classes.rightSidebar}>
                    <RightSidebar classes={classes} />
                </div>
            </div>
        </Editor>
    );
};

export default EditingInterface;
