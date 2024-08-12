import React, { useState } from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { makeStyles } from '@fluentui/react-components';
import { RadioButtonProps, radioButtonSchema } from '../../types';
import { RadioButtonSettings } from './Settings/RadioButtonSettings';
import { useSelected } from "../../hooks/useSelected";

const useStyles = makeStyles({
    radioButtons: {
        display: "flex",
        gap: "5px",
        paddingTop: "2px",
    },
});

export const RadioButtons: UserComponent<RadioButtonProps> = (props) => {
    const validatedProps = radioButtonSchema.parse(props);

    const { header, optionLabels, fontSize, fontColor, direction } = validatedProps;
    
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));
    const [selectedButton, setSelectedButton] = useState<number>(0);

    const styles = useStyles();
    const select = useSelected();

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedButton(Number(event.target.value));
    };

    return (
        <div
            ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
            className={`${selected ? select.select : ""}`}
        >
            <label style={{ fontSize: `${fontSize}px`, color: fontColor }}>{header}</label>
            <div className={styles.radioButtons} style={{ flexDirection: direction }}>
                {optionLabels.map((optionLabel, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            name="radioGroup"
                            value={index}
                            checked={selectedButton === index}
                            onChange={handleRadioChange}
                        />
                        <label style={{ fontSize: `${fontSize}px`, color: fontColor }}>{optionLabel}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const RadioButtonsDefaultProps: RadioButtonProps = {
    header: 'Radio Buttons',
    numberOfButtons: 2,
    optionLabels: ['Option 1', 'Option 2'],
    fontSize: 14,
    fontColor: '#FFFFFF',
    direction: "row"
};

RadioButtons.craft = {
    displayName: 'Radio Buttons',
    props: RadioButtonsDefaultProps,
    related: {
        settings: RadioButtonSettings,
    },
};
