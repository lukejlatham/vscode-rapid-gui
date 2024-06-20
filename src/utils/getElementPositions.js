// src/utils/getElementPositions.js

export const getElementPositions = () => {
  const elements = document.querySelectorAll('[data-craft-id]');
  const positions = Array.from(elements).map((element) => {
    const rect = element.getBoundingClientRect();
    return {
      id: element.getAttribute('data-craft-id'),
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  });
  return positions;
};
