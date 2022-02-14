import styled from "styled-components";
import css from "@styled-system/css";

export const Breadcrumbs = styled.ul`
  list-style: none;
  padding: 0;
  & > li:before {
    content: "${(props) => props.separator || "/"}";
    color: ${({ color, theme }) => color || theme?.colors?.primary_100};
    padding: 0 8px;
  }
`;

export const Crumb = styled.li`
  display: inline-block;

  &:last-of-type:after {
    content: "";
    padding: 0;
  }

  a {
    ${css({
      fontFamily: "secondary",
      lineHeight: "sm",
    })}
    color: ${({ color, theme }) => color || theme?.colors?.primary_100};
    text-decoration: none;
    &:hover,
    &:active {
      text-decoration: underline;
    }
  }
`;
