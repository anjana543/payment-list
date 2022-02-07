import { useState, useRef } from "react";
import styled, { css as groupCss, useTheme } from "styled-components";
import css from "@styled-system/css";
import PropTypes from "prop-types";
import Text from "./Text";
import Box from "./Box";
import Search from "./svg-icons/search";
import useOnClickOutside from "../hooks/useOnClickOutside";

const InputWrapper = styled.input`
  ${css({
    color: "primary_100",
    fontSize: "sm",
    outline: 0,
    borderWidth: "0 0 2px",
    borderBottomColor: "neutral_400",
  })}
  ${(props) => props.css && groupCss(...props.css)};
`;

/**
 * @description - Input Component.
 * @returns {Node} - Returns the Input view.
 */
function Input({ val, css, handleChange, label }) {
  const [showField, setShowField] = useState(false);
  const theme = useTheme();
  const ref = useRef();
  useOnClickOutside(ref, () => {
    if (!val) setShowField(false);
  });
  return (
    <Box>
      <Search
        color={theme.colors.black}
        size="20"
        viewBox="0 0 20 20"
        onClick={() => setShowField(!showField)}
      />
      <Text
        font={theme.fontSizes.md}
        fontWgt={theme.fontWeights.regular}
        onClick={() => setShowField(!showField)}
        className={showField ? "hidden" : ""}
      >
        {label}
      </Text>
      <InputWrapper
        value={val}
        onChange={handleChange}
        className={!showField ? "hidden" : ""}
        css={css}
        ref={ref}
      />
    </Box>
  );
}

Input.defaultProps = {
  label: "",
  val: "",
  css: "",
  handleChange: () => {},
};

Input.propTypes = {
  label: PropTypes.string,
  val: PropTypes.string.isRequired,
  css: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Input;
