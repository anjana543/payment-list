import styled, { css as groupCss } from "styled-components";
import css from "@styled-system/css";

export const CardWrapper = styled.div`
  ${css({
    borderCollapse: "collapse",
    color: "black",
    backgroundColor: "neutral_100",
    boxShadow: "lg",
    borderRadius: "md",
    overflow: "hidden",
    marginTop: "1em",
  })}
  ${(props) =>
    props.lg &&
    groupCss`
      width: 100%;
    `}

  ${(props) =>
    props.md &&
    groupCss`
      width: 49%;
    `}

  ${(props) =>
    props.sm &&
    groupCss`
      width: 20%;
    `}
`;

export const CardHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const CardHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) =>
    props.column &&
    groupCss`
      flex-direction: column;
    `}
  margin-right: ${({ mr }) => (mr || 0) + "px"};
  margin-left: ${({ ml }) => (ml || 0) + "px"};
  margin-top: ${({ mt }) => (mt || 0) + "px"};
  margin-bottom: ${({ mb }) => (mb || 0) + "px"};
  padding-right: ${({ pr }) => (pr || 32) + "px"};
  padding-left: ${({ pf }) => (pf || 32) + "px"};
  padding-top: ${({ pt }) => (pt || 32) + "px"};
  padding-bottom: ${({ mb }) => (mb || 32) + "px"};
`;

export const CardIcon = styled.span`
  color: #666;
  cursor: pointer;
  opacity: 0.25;
  transition: opacity 0.25s ease-in;

  &:hover {
    opacity: 0.95;
  }

  ${(props) =>
    props.big &&
    groupCss`
      font-size: 26px;
    `}

  ${(props) =>
    props.eye &&
    groupCss`
      position: absolute;
      top: 8px;
      right: 0;
    `}

  ${(props) =>
    props.small &&
    groupCss`
      font-size: 14px;
    `}
`;
