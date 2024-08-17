import React from 'react';
import { BackgroundSettings } from '../../../components/user/Settings/BackgroundSettings';

const LayoutManagement: React.FC<{classes: any}> = ({classes}) => {
    return (
        <div className={classes.layoutManagement}>
            <BackgroundSettings />
        </div>
    );
};

export default LayoutManagement;