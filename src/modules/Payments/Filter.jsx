import { useMemo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import css from "@styled-system/css";
import Select from "../../components/Select";
import Input from "../../components/Input";
import {
  filterArrayByProp,
  filterNestedObjectArrayByProp,
  debounce,
} from "../../utils";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const FilterWrapper = styled.div`
  ${css({
    width: "75%",
    borderCollapse: "collapse",
    color: "black",
    backgroundColor: "neutral_100",
    boxShadow: "lg",
    borderRadius: "xxl",
    margin: "1em 0 3em 0",
    padding: "1em 2em",
    display: "flex",
  })}
  justify-content: space-around;
  @media only screen and (max-width: 728px) {
    width: 90%;
    flex-direction: column;
  }
`;

const Line = styled.div`
  ${css({
    borderLeftWidth: "md",
    borderLeftStyle: "solid",
    borderLeftColor: "neutral_400",
    margin: "0 15px",
  })}
  @media only screen and (max-width: 728px) {
    ${css({
      border: "0",
      borderBottomWidth: "md",
      borderBottomStyle: "solid",
      borderBottomColor: "neutral_400",
      margin: "15px",
    })}
  }
`;

const filterParams = {
  processor: "",
  paymentMethod: "",
  status: "",
  currency_code: "",
};

const Filter = ({
  data,
  handleFilterValues,
  handleSearchValues,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectValues, setSelectValues] = useState(filterParams);
  const processors = useMemo(
    () => filterArrayByProp(data, "processor"),
    [data]
  );
  const paymentMethod = useMemo(
    () =>
      filterNestedObjectArrayByProp(
        data,
        "paymentInstrument.paymentInstrumentType"
      ),
    [data]
  );
  const status = useMemo(() => filterArrayByProp(data, "status"), [data]);
  const currencyCode = useMemo(
    () => filterArrayByProp(data, "currencyCode"),
    [data]
  );

  const handleChange = (e, key) => {
    const value = {
      ...selectValues,
      [key]: e?.target?.value || "",
    };
    setSelectValues(value);
    handleFilterValues(value);
  };

  const debouncedSave = useCallback(
    debounce((nextValue) => {
      handleSearchValues(nextValue);
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSave(e?.target?.value);
  };

  useEffect(() => {
    return () => {
      setSearchTerm("");
      setSelectValues(filterParams);
    };
  }, []);

  return (
    <Main>
      <FilterWrapper>
        <Input
          label="Search By Reference"
          val={searchTerm}
          handleChange={(e) => handleInputChange(e)}
        />
        <Line />
        <Select
          label="Processor"
          options={processors}
          handleChange={(e) => handleChange(e, "processor")}
          val={selectValues.processor}
          isTextFormat={true}
          isLoading={isLoading}
        />
        <Select
          label="Payment Method"
          options={paymentMethod}
          handleChange={(e) => handleChange(e, "payment_instrument_type")}
          val={selectValues.payment_instrument_type}
          isTextFormat={true}
          isLoading={isLoading}
        />
        <Select
          label="Current status"
          options={status}
          handleChange={(e) => handleChange(e, "status")}
          val={selectValues.status}
          isTextFormat={true}
          isLoading={isLoading}
        />
        <Select
          label="Currency"
          options={currencyCode}
          handleChange={(e) => handleChange(e, "currency_code")}
          val={selectValues.currency_code}
          isLoading={isLoading}
        />
      </FilterWrapper>
    </Main>
  );
};

export default Filter;
