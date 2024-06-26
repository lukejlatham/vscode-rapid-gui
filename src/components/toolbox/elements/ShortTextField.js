import React, { useState, useEffect } from 'react';
import { Textarea } from '@fluentui/react';
import { useNode } from '@craftjs/core';
import Label from './Label';

const ShortTextField = ({ text, label }) => {
    const [inputValue, setInputValue] = useState('');
    const { connectors: { connect, drag }, setProp, isClicked } = useNode((node) => ({
        isClicked: node.events.selected
    }));

    useEffect(() => {
        setProp(props => {
            props.text = inputValue;
        });
    }, [inputValue, setProp]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div ref={dom => connect(drag(dom))}>
            <Label text={label} />
            <Textarea
                resize="both"
                placeholder={inputValue || "type here..."}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

ShortTextField.craft = {
    props: {
        text: 'Text...',
        label: 'Text...'
    },
    related: {
        settings: ShortTextFieldSettings
    }
};

export default ShortTextField;