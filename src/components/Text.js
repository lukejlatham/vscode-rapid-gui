// src/components/Text.js

import React, { useEffect, useRef } from 'react';
import { useNode } from '@craftjs/core';

export const Text = ({ text }) => {
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
    <div ref={(refElement) => connect(drag(refElement)) && (ref.current = refElement)}>
      {text}
    </div>
  );
};

Text.craft = {
  props: {
    text: 'Hello, world!',
  },
};
