import styled from "styled-components";
import css from "@styled-system/css";

const Block = styled.div`
  ${css({
    fontFamily: "secondary",
    lineHeight: "sm",
    display: "flex",
  })}
  justify-content:  ${({ align }) => align || "center"};
  align-items: ${({ align }) => align || "center"};
  font-size: ${({ font, theme }) => (font || theme.fontSizes.lg) + "px"};
  color: ${({ color, theme }) => color || theme.colors.black};
  padding: ${({ p }) => p + "px" || 0};
  margin: ${({ m }) => m + "px" || 0};
`;

export default Block;
