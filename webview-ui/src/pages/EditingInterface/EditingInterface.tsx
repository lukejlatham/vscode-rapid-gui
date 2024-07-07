import React from 'react';
import ComponentLibrary from "../../components/ComponentLibrary";
import { Editor, Frame, Element } from "@craftjs/core";
import { Text } from "../../components/user/Text";
import { Container } from "../../components/user/Container";
import { makeStyles, shorthands } from '@fluentui/react-components';


const useStyles = makeStyles({
    mainLayout: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    content: {
        flexGrow: 1, /* Take up remaining space */
        ...shorthands.padding('20px'),
    },
});


const EditingInterface: React.FC = () => {
    const classes = useStyles();
    return (
        <Editor resolver={{ Text, Container }}>
            <div className={classes.mainLayout}>
                <ComponentLibrary />
                <div className={classes.content}>
                    <Frame>
                        <Element is={Container} padding={5} background="none" height="100%" width="80vw" appearance='subtle' canvas>
                            <Text fontSize="small" text="Hi world!" />
                        </Element>
                    </Frame>
                </div>
            </div>
        </Editor>
    );
};

export default EditingInterface;