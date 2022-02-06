import styled from "styled-components";

const Svg = styled.svg`
  display: inline-block;
  fill: ${(props) => props.color};
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  user-select: none;
  vertical-align: text-bottom;
  margin: 0 5px;
`;

const SvgIcon = ({
  children,
  color = "#000000",
  size = 24,
  viewBox = "0 0 24 24",
  ...others
}) => (
  <Svg color={color} size={size} viewBox={viewBox} {...others}>
    {children}
  </Svg>
);

export default SvgIcon;
