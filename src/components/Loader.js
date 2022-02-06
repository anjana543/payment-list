import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  border: ${({ border }) => border}px solid #f3f3f3;
  border-radius: 50%;
  border-top: ${({ border }) => border}px solid
    ${({ color, theme }) => (color ? color : theme?.colors?.primary_600)};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  animation: ${rotate360} 1000ms linear infinite;
  margin: 0px auto;
`;
StyledLoader.displayName = "Loader";

const Loader = ({ size, border, color, ...props }) => (
  <StyledLoader
    width={size}
    height={size}
    border={border}
    color={color}
    {...props}
  />
);

Loader.propTypes = {
  size: PropTypes.number,
  border: PropTypes.number,
  color: PropTypes.string,
};

Loader.defaultProps = {
  size: 100,
  border: 5,
  color: "",
};

export default Loader;
