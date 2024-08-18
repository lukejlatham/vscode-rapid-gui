import React from 'react';
import { GridSizeSelector } from './GridRowsColumnsSelector'; // Adjust the import path as necessary
import { AddGridItemButton } from './AddGridItemButton'; // Adjust the import path as necessary

const LayoutManagement: React.FC<{classes: any}> = ({classes}) => {
    return (
        <div className={classes.layoutManagement}>
      <GridSizeSelector />
      <AddGridItemButton />
              </div>
    );
};

export default LayoutManagement;