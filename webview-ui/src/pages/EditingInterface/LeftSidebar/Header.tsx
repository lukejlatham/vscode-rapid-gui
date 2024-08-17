import React from 'react';
import { Button, Subtitle1 } from "@fluentui/react-components";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft24Filled, ArrowLeft24Regular, bundleIcon } from '@fluentui/react-icons';

const BackButtonIcon = bundleIcon(ArrowLeft24Filled, ArrowLeft24Regular);

const Header: React.FC<{ classes: any }> = ({ classes }) => {
    const navigate = useNavigate();
    return (
        <div className={classes.header}>

        </div>
    );
};

export default Header;
