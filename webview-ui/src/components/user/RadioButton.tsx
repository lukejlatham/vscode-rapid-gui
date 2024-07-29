import React, { useState } from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { makeStyles } from '@fluentui/react-components';
import { RadioButtonProps } from '../../../../types';
import { RadioButtonSettings } from './Settings/RadioButtonSettings';


const useStyles = makeStyles({
    radioButtons: {
        display: "flex",
        gap: "5px",
        paddingTop: "2px",
    },
});


export const RadioButton: UserComponent<RadioButtonProps> = ({ header, numberOfButtons, optionLabels, fontSize, fontColor, direction }) => {
    const { connectors: { connect, drag } } = useNode();
    const [selectedButton, setSelectedButton] = useState<number>(0);

    const styles = useStyles();

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


export const RadioButtonDefaultProps: RadioButtonProps = {
    header: 'Radio Buttons',
    numberOfButtons: 2,
    optionLabels: ['Option 1', 'Option 2'],
    fontSize: 14,
    fontColor: '#FFFFFF',
    direction: "row"
};

RadioButton.craft = {
    displayName: 'Radio Button',
    props: RadioButtonDefaultProps,
    related: {
        settings: RadioButtonSettings,
    },
};
