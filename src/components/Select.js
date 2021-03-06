import styled, { css as groupCss, useTheme } from "styled-components";
import css from "@styled-system/css";
import PropTypes from "prop-types";
import Text from "./Text";
import Box from "./Box";
import { capitalizeFirstLetter } from "../utils";

const SelectWrapper = styled.select`
  ${css({
    backgroundColor: "neutral_100",
    color: "primary_100",
    fontSize: "sm",
    border: "none",
    marginLeft: "10px",
    cursor: "pointer",
    position: "relative",
    bottom: "2px",
    width: "5.5em",
  })}
  ${(props) => props.css && groupCss(...props.css)};
  option {
    ${css({
      backgroundColor: "neutral_100",
      color: "primary_100",
      fontSize: "sm",
      border: "none",
      margin: "10px",
    })}
  }
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 728px) {
    width: 60%;
  }
`;

/**
 * @description - Select Component.
 * @returns {Node} - Select View Component
 */
const Select = ({
  val,
  css,
  handleChange,
  options,
  label,
  isTextFormat,
  isLoading,
}) => {
  const theme = useTheme();
  return (
    <Box align="flex-end">
      <Text font={theme?.fontSizes?.md} fontWgt={theme?.fontWeights?.bold}>
        {label}
      </Text>
      <SelectWrapper
        css={css}
        aria-label="Select"
        onChange={handleChange}
        value={val}
        data-testid="select"
        name={label}
      >
        <option value="" key={`${label}_0`}>
          All
        </option>
        {options.map((item, index) => (
          <option value={item} key={`${label}_${index}`}>
            {isTextFormat ? capitalizeFirstLetter(item) : item}
          </option>
        ))}
        {isLoading && <option>Loading ...</option>}
      </SelectWrapper>
    </Box>
  );
};

Select.defaultProps = {
  label: "",
  val: "",
  css: "",
  handleChange: () => {},
  options: [],
  isTextFormat: false,
  isLoading: false,
};

Select.propTypes = {
  label: PropTypes.string,
  val: PropTypes.string.isRequired,
  css: PropTypes.string,
  isTextFormat: PropTypes.bool,
  handleChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default Select;
