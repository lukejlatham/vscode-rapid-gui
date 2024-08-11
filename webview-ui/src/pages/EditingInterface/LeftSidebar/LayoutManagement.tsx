import React from 'react';
import { EditBackgroundButton } from '../../../components/EditBackgroundButton';
import { LockGridSwitch } from './LockGridSwitch';


const LayoutManagement: React.FC<{classes: any}> = ({classes}) => {
    return (
        <div className={classes.componentRoot}>
            <EditBackgroundButton classes={classes}/>
            <LockGridSwitch />
        </div>
    );
};

export default LayoutManagement;