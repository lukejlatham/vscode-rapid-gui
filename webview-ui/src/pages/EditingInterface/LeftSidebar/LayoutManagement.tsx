import React from 'react';
import { EditBackgroundButton } from '../../../components/EditBackgroundButton';
import { LockGridSwitch } from './LockGridSwitch';


const LayoutManagement: React.FC<{classes: any}> = ({classes}) => {
    return (
        <div className={classes.layoutManagement}>
            <LockGridSwitch classes={classes} />
            <EditBackgroundButton classes={classes}/>
        </div>
    );
};

export default LayoutManagement;