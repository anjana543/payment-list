import styled, { css as groupCss } from "styled-components";
import css from "@styled-system/css";

const Status = styled.div`
  ${css({
    borderRadius: "lg",
    padding: "0.25em 0.5em",
    display: "inline-block",
    width: "fit-content",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "ssm",
  })}
  ${(props) =>
    props.large &&
    groupCss`
      ${css({
        fontSize: "xl",
        padding: "0.75em 0.75em",
      })}
    `}
  ${(props) =>
    props.relative &&
    groupCss`
        position: relative;
        bottom: 7px;
        `}
  ${(props) =>
    props.withBorder &&
    groupCss`
      ${css({
        borderWidth: "md",
        borderStyle: "solid",
      })}
    `}
  border-color: ${({ color, theme }) => color || theme.colors.black};
  &.success {
    ${css({
      color: "info_800",
      backgroundColor: "status_success",
    })}
  }
  &.fail {
    ${css({
      color: "warning_700",
      backgroundColor: "status_fail",
    })}
  }
  &.progress {
    ${css({
      color: "neutral_700",
      backgroundColor: "status_progress",
    })}
  }
  &::first-letter {
    text-transform: capitalize;
  }
`;

export default Status;
