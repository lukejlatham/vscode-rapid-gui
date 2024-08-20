import * as React from "react";
import { makeStyles } from "@griffel/react";
import { tokens } from "@fluentui/react-theme";
import { ImageSparkle24Regular } from "@fluentui/react-icons";

const colorTokens = [
  tokens.colorPaletteRedForeground1,
  tokens.colorPalettePumpkinForeground2,
  tokens.colorPaletteYellowForeground1,
  tokens.colorPaletteGreenForeground1,
  tokens.colorPaletteRoyalBlueForeground2,
  tokens.colorPalettePurpleForeground2,
  tokens.colorPaletteLavenderForeground2,
];

const useStyles = makeStyles({
  icon: {
    animationName: {
      "0%": { opacity: 0, color: colorTokens[0] },
      "4.76%": { opacity: 1, color: colorTokens[0] },
      "9.52%": { opacity: 1, color: colorTokens[0] },
      "14.28%": { opacity: 0, color: colorTokens[1] },
      "19.04%": { opacity: 1, color: colorTokens[1] },
      "23.8%": { opacity: 1, color: colorTokens[1] },
      "28.56%": { opacity: 0, color: colorTokens[2] },
      "33.32%": { opacity: 1, color: colorTokens[2] },
      "38.08%": { opacity: 1, color: colorTokens[2] },
      "42.84%": { opacity: 0, color: colorTokens[3] },
      "47.6%": { opacity: 1, color: colorTokens[3] },
      "52.36%": { opacity: 1, color: colorTokens[3] },
      "57.12%": { opacity: 0, color: colorTokens[4] },
      "61.88%": { opacity: 1, color: colorTokens[4] },
      "66.64%": { opacity: 1, color: colorTokens[4] },
      "71.4%": { opacity: 0, color: colorTokens[5] },
      "76.16%": { opacity: 1, color: colorTokens[5] },
      "80.92%": { opacity: 1, color: colorTokens[5] },
      "85.68%": { opacity: 0, color: colorTokens[6] },
      "90.44%": { opacity: 1, color: colorTokens[6] },
      "95.2%": { opacity: 1, color: colorTokens[6] },
      "100%": { opacity: 0, color: colorTokens[0] },
    },
    animationDuration: "var(--loader-duration)",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  },
});

interface LoaderProps {
  size?: number;
  duration?: number;
}

export const ImageGenerationLoader: React.FC<LoaderProps> = ({
  size = 104,
  duration = 21,
}) => {
  const styles = useStyles();

  return (
    <div
      className={styles.icon}
      style={{

        "--loader-duration": `${duration}s`,
      } as React.CSSProperties}
    >
      <ImageSparkle24Regular fontSize={size}  />
    </div>
  );
};

export default ImageGenerationLoader;