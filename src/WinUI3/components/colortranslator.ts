export const colorTokens: { [key: string]: string } = {
  colorNeutralStroke1: "#E1E1E1",
  colorBrandForeground2: "#0078D4",
  colorNeutralStroke2: "#525252",
  colorBrandForeground1: "#2899f5",
  colorNeutralBackground3: "#141414",
  colorBrandForeground2Pressed: "#333357",
  DarkAccent: "#FFFFFF",
  LightAccent: "#000000",
  // got some from our other pages but need to add more
};

//must add tokens also for the borderRadiusMedium so border size?

export function convertColor(color: string): string {
  if (color.startsWith("${tokens.") && color.endsWith("}")) {
    const tokenName = color.slice(9, -1); // Remove '${tokens.' and '}'
    return colorTokens[tokenName] || color;
  }
  else if (color.endsWith("Accent")) {
    return colorTokens[color];
  }
  else if (color.startsWith("var")) {
    const tokenName = color.slice(6, -1); // Remove 'var(--' and ')'
    return colorTokens[tokenName];
  }
  return color;
}
