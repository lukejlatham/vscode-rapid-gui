import React from 'react';
import { Label as FluentLabel } from '@fluentui/react';
import { useNode } from '@craftjs/core';

const Label = ({text}) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <FluentLabel ref={ref => connect(drag(ref))}>{text}</FluentLabel>
    );
};

export default Label;