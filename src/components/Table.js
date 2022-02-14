import styled, { css as groupCss } from "styled-components";
import css from "@styled-system/css";
import Loader from "./Loader";
import Box from "./Box";

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const T = styled.table`
  ${css({
    width: "100%",
    borderCollapse: "collapse",
    color: "black",
    backgroundColor: "neutral_100",
    boxShadow: "lg",
    borderRadius: "md",
  })}
`;

const Th = styled.th`
  ${css({
    fontSize: "md",
    color: "black",
    fontWeight: "bold",
  })}
  text-align: ${(props) => (props.align ? props.align : "left")};
  opacity: 0.65;
  ${(props) => props.css && groupCss(...props.css)};
`;

const Td = styled.td`
  text-align: ${(props) => (props.align ? props.align : "left")};
  ${(props) => props.css && groupCss(...props.css)};
`;

const Tr = styled.tr`
  ${css({
    borderBottomWidth: "sm",
    borderBottomStyle: "solid",
    borderBottomColor: "neutral_400",
  })}
  ${(props) => props.css && groupCss(...props.css)};
`;

const Table = ({
  columns,
  data = [],
  rowConfig: { uniqueKey = "id", css, onClick } = {},
  setRef,
  isLoading,
  theme,
}) => {
  const headerColumns = () =>
    Object.keys(columns).map((key) => (
      <Th
        key={key}
        align={columns[key].align}
        width={columns[key].width}
        css={columns[key].cssHeader}
        data-testid={`header-${key}`}
      >
        {columns[key].label ? columns[key].label : ""}
      </Th>
    ));

  const cell = (key, item) => (
    <Td
      key={key}
      align={columns[key].align}
      width={columns[key].width}
      css={columns[key].css}
      data-testid={`col-${key}`}
    >
      {columns[key].content ? columns[key].content(item) : item[key]}
    </Td>
  );

  const row = (item, index) => {
    return (
      <Tr
        key={item[uniqueKey]}
        css={css}
        onClick={onClick ? (e) => onClick(e, item) : null}
        {...(setRef &&
          data.length === index + 1 && {
            ref: setRef,
          })}
        data-testid={`row-${index}`}
      >
        {Object.keys(columns).map((key) => cell(key, item))}
      </Tr>
    );
  };
  return (
    <Main>
      <T data-testid="main-table">
        <thead>
          <tr>{headerColumns()}</tr>
        </thead>
        <tbody>{data.map((item, index) => row(item, index))}</tbody>
      </T>
      {isLoading && (
        <Box p="20" m="30">
          {" "}
          <Loader size={50} color={theme?.colors?.primary_100} />
        </Box>
      )}
    </Main>
  );
};

export default Table;
