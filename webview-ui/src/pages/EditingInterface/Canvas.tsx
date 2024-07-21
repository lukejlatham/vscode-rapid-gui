import React from 'react';
import { Frame, Element } from "@craftjs/core";
import { Background, BackgroundDefaultProps } from '../../components/user/Background';
import { Container } from '../../components/user/Container';

const Canvas: React.FC<{ classes: any }> = ({ classes }) => {
    return (
        <div className={classes.canvas}>
            <Frame>
                <Element is={Background} id="background" {...BackgroundDefaultProps}>
                    <Element is={Container} id="root" canvas>
                        {/* Your editable components go here */}
                    </Element>
                </Element>
            </Frame>
        </div>
    );
};

export default Canvas;
