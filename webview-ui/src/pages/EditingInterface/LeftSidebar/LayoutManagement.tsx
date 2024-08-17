import React from 'react';
import { LockGridSwitch } from './LockGridSwitch';
import { BackgroundSettings } from '../../../components/user/Settings/BackgroundSettings';

const LayoutManagement: React.FC<{classes: any}> = ({classes}) => {
    return (
        <div className={classes.layoutManagement}>
            <LockGridSwitch classes={classes} />
            <BackgroundSettings />
        </div>
    );
};

export default LayoutManagement;