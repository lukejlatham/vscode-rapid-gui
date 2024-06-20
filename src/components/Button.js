// src/components/Button.js

import React, { useEffect, useRef } from 'react';
import { useNode } from '@craftjs/core';

export const Button = ({ text }) => {
  const {
    connectors: { connect, drag },
    id,
  } = useNode();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-craft-id', id);
    }
  }, [id]);

  return (
    <button ref={(refElement) => connect(drag(refElement)) && (ref.current = refElement)}>
      {text}
    </button>
  );
};

Button.craft = {
  props: {
    text: 'Click me',
  },
};
