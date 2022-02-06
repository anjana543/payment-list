import styled from "styled-components";

const Group = styled.div`
  display: inline-block;
  margin-right: ${({ mr }) => (mr || 0) + "px"};
  margin-left: ${({ ml }) => (ml || 0) + "px"};
  margin-top: ${({ mt }) => (mt || 0) + "px"};
  margin-bottom: ${({ mb }) => (mb || 0) + "px"};
  padding-right: ${({ pr }) => (pr || 0) + "px"};
  padding-left: ${({ pf }) => (pf || 0) + "px"};
  padding-top: ${({ pt }) => (pt || 0) + "px"};
  padding-bottom: ${({ mb }) => (mb || 0) + "px"};
`;

export default Group;
