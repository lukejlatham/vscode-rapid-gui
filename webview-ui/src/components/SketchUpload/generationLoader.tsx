import * as React from 'react';
import { useMemo } from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import {
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
  SparkleFilled
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  loader: {
    overflow: 'hidden',
    position: 'relative',
    width: 'var(--loader-width)',
    height: 'var(--loader-height)',
  },
  iconRow: {
    display: 'flex',
    position: 'absolute',
    left: '0',
    top: '0',
    height: 'var(--loader-height)',
    animationName: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-50%)' },
    },
    animationDuration: 'var(--loader-speed)',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  icon: {
    width: 'var(--loader-height)',
    height: 'var(--loader-height)',
  },
  sparkle: { color: tokens.colorNeutralForeground1 },
  iconRed: { color: tokens.colorPaletteRedForeground1 },
  iconOrange: { color: tokens.colorPalettePumpkinForeground2 },
  iconYellow: { color: tokens.colorPaletteYellowForeground1 },
  iconGreen: { color: tokens.colorPaletteGreenForeground1 },
  iconBlue: { color: tokens.colorPaletteRoyalBlueForeground2 },
  iconIndigo: { color: tokens.colorPalettePurpleForeground2 },
  iconViolet: { color: tokens.colorPaletteLavenderForeground2 },
});

const iconComponents = [
  { Icon: Image24Regular, colorClass: 'iconRed' },
  { Icon: TextT24Regular, colorClass: 'iconOrange' },
  { Icon: TextboxRegular, colorClass: 'iconYellow' },
  { Icon: Button20Filled, colorClass: 'iconGreen' },
  { Icon: RadioButtonFilled, colorClass: 'iconBlue' },
  { Icon: Button20Regular, colorClass: 'iconIndigo' },
  { Icon: CheckboxCheckedFilled, colorClass: 'iconViolet' },
  { Icon: SlideTextRegular, colorClass: 'iconRed' },
  { Icon: TextAlignLeftFilled, colorClass: 'iconOrange' },
  { Icon: CardUiRegular, colorClass: 'iconYellow' },
  { Icon: TextBulletListCheckmarkFilled, colorClass: 'iconGreen' },
  { Icon: CheckboxCheckedRegular, colorClass: 'iconBlue' },
  { Icon: OptionsRegular, colorClass: 'iconIndigo' },
];

interface LoaderProps {
  width?: number;
  height?: number;
  speed?: number;
}

export const GenerationLoader: React.FC<LoaderProps> = ({ 
  width = 200, 
  height = 24, 
  speed = 6 
}) => {
  const styles = useStyles();

  const iconSet = useMemo(() => {
    const count = Math.ceil(width / height) * 2;
    return [...Array(count)].map((_, index) => {
      if (index % 2 === 0) {
        return (
          <SparkleFilled 
            key={index} 
            className={mergeClasses(styles.icon, styles.sparkle)}
          />
        );
      } else {
        const { Icon, colorClass } = iconComponents[(index - 1) / 2 % iconComponents.length];
        return (
          <Icon
            key={index}
            className={mergeClasses(styles.icon, styles[colorClass as keyof typeof styles])}
          />
        );
      }
    });
  }, [width, height, styles]);

  return (
    <div 
      className={styles.loader} 
      style={{ 
        '--loader-width': `${width}px`,
        '--loader-height': `${height}px`,
        '--loader-speed': `${speed}s`,
      } as React.CSSProperties}
    >
      <div className={styles.iconRow}>
        {iconSet}
        {iconSet}
      </div>
    </div>
  );
};

export default GenerationLoader;