import { useState, useEffect, useCallback } from "react";
import { useTheme } from "styled-components";
import useFetch from "../../hooks/useFetch";
import useAuthState from "../../hooks/useAuthState";
import Title from "../../components/Title";
import Container from "../../components/Container";
import Filter from "../../modules/Payments/Filter";
import List from "../../modules/Payments/List";
import { PAYMENT_LIST_URL, PAGINATION_LIMIT } from "../../utils/constant";
import { queryString, lowercaseText, lowerArray } from "../../utils";

export const PaymentList = () => {
  const { user } = useAuthState();
  const theme = useTheme();
  const [list, setPayments] = useState([]);
  const [limit, setLimit] = useState(PAGINATION_LIMIT);
  const [urlParams, setUrlParams] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const { response, error, isLoading, hasMore } = useFetch(
    `${PAYMENT_LIST_URL}?limit=${limit}${urlParams}`,
    {
      bearerToken: user.accessToken,
    },
    "nextCursor"
  );

  useEffect(() => {
    if (response) {
      setPayments(response?.data || []);
    }
  }, [response]);

  useEffect(() => {
    if (response) {
      setPayments(response?.data || []);
    }
  }, [response]);

  const handleFilterValues = (value) => {
    const urlString = queryString(value);
    setUrlParams(urlString ? `&${urlString}` : "");
  };

  const handleSearchValues = (value) => {
    setSearchParam(value);
  };

  const filteredList = useCallback(() => {
    return searchParam
      ? list.filter((item) => {
          return lowerArray([
            item?.orderId,
            item?.processor,
            item?.status,
            item?.currencyCode,
            item?.amount,
            item?.currencyCode,
          ]).includes(lowercaseText(searchParam));
        })
      : list;
  }, [list, searchParam]);

  return (
    <Container data-testid="payment">
      <Title>Transactions</Title>
      <Filter
        data={filteredList()}
        handleFilterValues={handleFilterValues}
        handleSearchValues={handleSearchValues}
        isLoading={isLoading}
      />
      <List
        data={filteredList()}
        handlePagination={setLimit}
        theme={theme}
        isLoading={isLoading}
        isPaginate={hasMore}
        error={error}
        displayItemCount={PAGINATION_LIMIT}
      />
    </Container>
  );
};
