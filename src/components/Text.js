import styled, { css as groupCss } from "styled-components";
import css from "@styled-system/css";

const Text = styled.div`
  ${css({
    fontFamily: "secondary",
    lineHeight: "sm",
    display: "inline-block",
  })}
  color: ${({ color, theme }) => color || theme.colors.black};
  font-size: ${({ font, theme }) => (font || theme.fontSizes.sm) + "px"};
  padding: ${({ p }) => p || 0};
  margin: ${({ m }) => m || 0};
  font-weight: ${({ fontWgt, theme }) => fontWgt || theme.fontWeights.regular};
  ${(props) =>
    props.block &&
    groupCss`
      display: block;
    `}
  ${(props) =>
    props.relative &&
    groupCss`
      position: relative;
      bottom: 7px;
      `}
`;

export default Text;
