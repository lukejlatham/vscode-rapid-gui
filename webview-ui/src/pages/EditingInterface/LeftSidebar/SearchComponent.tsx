import React from 'react';
import { SearchBox } from "@fluentui/react-components";

const SearchComponent: React.FC<{ classes: any }> = ({ classes }) => {
    return (
        <div className={classes.searchBox}>
            <SearchBox placeholder="Search components" />
        </div>
    );
};

export default SearchComponent;
