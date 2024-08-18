import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import {
  Image24Regular,
  SparkleFilled,
  TextT24Regular,
  TextboxRegular,
  Button20Filled,
  RadioButtonFilled,
  Button20Regular,
  CheckboxCheckedFilled,
  SlideTextRegular,
  TextAlignLeftFilled,
  CardUiRegular,
  TextBulletListCheckmarkFilled,
  CheckboxCheckedRegular,
  OptionsRegular
} from "@fluentui/react-icons";

interface LoaderProps {
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}

const useStyles = makeStyles({
  loader: {
    overflow: 'hidden',
    position: 'relative',
  },
  iconRow: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    animation: 'moveIcons linear infinite',
  },
});

export const GenerationLoader: React.FC<LoaderProps> = ({
  width = 200,
  height = 24,
  color = '#FFF',
  speed = 5,
}) => {
  const styles = useStyles();
  const icons = [
    Image24Regular,
    TextT24Regular,
    TextboxRegular,
    Button20Filled,
    RadioButtonFilled,
    Button20Regular,
    CheckboxCheckedFilled,
    SlideTextRegular,
    TextAlignLeftFilled,
    CardUiRegular,
    TextBulletListCheckmarkFilled,
    CheckboxCheckedRegular,
    OptionsRegular,
  ];

  // Calculate the number of icons needed to fill the width
  const iconCount = Math.ceil(width / height) * 2;  // Multiply by 2 for alternating icons
  const totalWidth = iconCount * height;

  const renderIcons = () => {
    return [...Array(iconCount)].map((_, index) => {
      const IconComponent = index % 2 === 0 ? SparkleFilled : icons[Math.floor(index / 2) % icons.length];
      return (
        <IconComponent
          key={index}
          style={{ width: `${height}px`, height: `${height}px`, color: color }}
        />
      );
    });
  };

  return (
    <div className={styles.loader} style={{ width: `${width}px`, height: `${height}px` }}>
      <div
        className={styles.iconRow}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          width: `${totalWidth * 2}px`,  // Double the width to accommodate two sets of icons
        }}
      >
        {renderIcons()}
        {renderIcons()}  {/* Duplicate the icons to create a seamless loop */}
      </div>
      <style>
        {`
          @keyframes moveIcons {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
          }
        `}
      </style>
    </div>
  );
};

export default GenerationLoader;