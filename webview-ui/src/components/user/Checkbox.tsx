import { useNode, UserComponent } from '@craftjs/core';
import { makeStyles } from '@fluentui/react-components';
import {checkboxSchema, CheckboxProps } from '../../../../types';
import { CheckboxSettings } from './Settings/CheckboxSettings';

const useStyles = makeStyles({
    checkboxes: {
        display: "flex",
        gap: "5px",
        paddingTop: "2px",
    },
});

export const Checkbox: UserComponent<CheckboxProps> = (props) => {
    const validatedProps = checkboxSchema.parse(props);

    const { header, numberOfBoxes, optionLabels, fontSize, fontColor, direction } = validatedProps;

    const { connectors: { connect, drag } } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
    }));

    const styles = useStyles();

    return (
        <div
            ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
        >
            <label style={{ fontSize: fontSize, color: fontColor }}>{header}</label>
            <div className={styles.checkboxes} style={{flexDirection: direction}}>
                {optionLabels.map((optionLabel, index) => (
                    <div key={index}>
                        <input type="checkbox" id={optionLabel} name={optionLabel} />
                        <label style={{ fontSize: `${fontSize}px`, color: fontColor }}>{optionLabel}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const CheckboxDefaultProps: CheckboxProps = {
    header: 'Checkboxes',
    numberOfBoxes: 2,
    optionLabels: ['Option 1', 'Option 2'],
    fontSize: 14,
    fontColor: '#FFFFFF',
    direction: "row"
};

Checkbox.craft = {
    displayName: 'Checkbox',
    props: CheckboxDefaultProps,
    related: {
        settings: CheckboxSettings,
    },
};
