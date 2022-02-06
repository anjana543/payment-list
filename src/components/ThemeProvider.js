import { ThemeProvider as StyledComponentsProvider } from "styled-components";

import GlobalStyles from "./GlobalStyles";

const palette = {
  primary_100: "#5866f4",
  primary_200: "#e2e3ef",
  primary_300: "#D2F895",
  primary_400: "#ABED0D",
  primary_500: "#00A846",
  primary_600: "#067A46",
  primary_700: "#056835",
  primary_800: "#035624",
  info_100: "#E9FAFF",
  info_800: "#219176",
  negative_100: "#FFEAE9",
  negative_200: "#FFCCCA",
  negative_500: "#DB1D1D",
  negative_600: "#B30000",
  negative_700: "#970000",
  negative_800: "#7C0000",
  warning_100: "#FFECD3",
  warning_500: "#EF670A",
  warning_600: "#CE4500",
  warning_700: "#e24351",
  reward_200: "#FFFAB2",
  reward_400: "#FFE900",
  reward_500: "#E2C700",
  neutral_100: "#FFFFFF",
  neutral_200: "#F5F5F5",
  neutral_300: "#EEEEEE",
  neutral_400: "#E4E4E4",
  neutral_500: "#BBBBBB",
  neutral_700: "#999999",
  neutral_800: "#343434",
  status_success: "#dcf9eb",
  status_fail: "#fbeae9",
  status_progress: "#eeeeee",
};

const fonts = [
  "Montserrat, Verdana, Geneva, sans-serif",
  "'Source Sans Pro', 'Trebuchet MS', Helvetica, sans-serif",
];
fonts.primary = fonts[0];
fonts.secondary = fonts[1];

const fontSizes = [14, 16, 20, 24, 32, 12];
fontSizes.sm = fontSizes[0];
fontSizes.md = fontSizes[1];
fontSizes.lg = fontSizes[2];
fontSizes.xl = fontSizes[3];
fontSizes.xxl = fontSizes[4];
fontSizes.ssm = fontSizes[5];

const lineHeights = ["24px", "27px", "34px", "41px", "54px"];
lineHeights.sm = lineHeights[0];
lineHeights.md = lineHeights[1];
lineHeights.lg = lineHeights[2];
lineHeights.xl = lineHeights[3];
lineHeights.xxl = lineHeights[4];

const fontWeights = [400, 600];
fontWeights.regular = fontWeights[0];
fontWeights.bold = fontWeights[1];

const space = [0, 4, 8, 16, 24, 32, 40, 56];
space.xxs = space[1];
space.xs = space[2];
space.sm = space[3];
space.md = space[4];
space.lg = space[5];
space.xl = space[6];
space.xxl = space[7];

const radii = [2, 4, 8, 16, 30];
radii.sm = radii[0];
radii.md = radii[1];
radii.lg = radii[2];
radii.xl = radii[3];
radii.xxl = radii[4];

const shadows = [
  "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  "0 2px 4px 0 rgba(0, 0, 0, 0.15)",
  "0 3px 8px 0 rgba(0, 0, 0, 0.15)",
  "0 6px 12px 0 rgba(0, 0, 0, 0.10)",
];
shadows.sm = shadows[0];
shadows.md = shadows[1];
shadows.lg = shadows[2];
shadows.xl = shadows[3];

const borderWidths = ["1px", "2px"];
borderWidths.sm = borderWidths[0];
borderWidths.md = borderWidths[1];

export const theme = {
  borderWidths,
  colors: {
    ...palette,
    border: palette.neutral_400,
    background: palette.neutral_200,
    text: palette.neutral_800,
    black: palette.neutral_800,
    white: palette.neutral_100,
  },
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
  space,
  radii,
};

const ThemeProvider = ({ children }) => (
  <StyledComponentsProvider theme={theme}>
    <GlobalStyles />
    {children}
  </StyledComponentsProvider>
);

export default ThemeProvider;
