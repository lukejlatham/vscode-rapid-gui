import React, { useState } from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { makeStyles } from '@fluentui/react-components';
import { DropdownProps, dropdownSchema } from '../../types';
import { DropdownSettings } from './Settings/DropdownSettings';
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
    dropdown: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
});

export const Dropdown: UserComponent<DropdownProps> = (props) => {
    const validatedProps = dropdownSchema.parse(props);

    const { header, optionLabels, numberOfOptions, fontSize, fontColor } = validatedProps;
    
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));
    const [selectedOption, setSelectedOption] = useState<number>(0);

    const styles = useStyles();
    const select = useSelected();

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(Number(event.target.value));
    };

    return (
        <div
        className={`${styles.dropdown} ${selected ? select.select : ""}`}
            ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
        >
            <label style={{ fontSize: `${fontSize}px`, color: fontColor }}>{header}</label>
            <select
                value={selectedOption}
                onChange={handleOptionChange}
                style={{ fontSize: `${fontSize}px`, color: fontColor }}
            >
                {optionLabels.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export const DropdownDefaultProps: DropdownProps = {
    header: 'Dropdown',
    numberOfOptions: 2,
    optionLabels: ['Option 1', 'Option 2'],
    fontSize: 16,
    fontColor: '#000000',
};

Dropdown.craft = {
    displayName: 'Dropdown',
    props: DropdownDefaultProps,
    related: {
        settings: DropdownSettings,
    },
};
