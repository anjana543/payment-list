import { useRef, useCallback } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text";
import Table from "../../components/Table";
import Image from "../../components/Image";
import Button from "../../components/Button";
import {
  formatDate,
  getImageUrl,
  parseRawPrice,
  lowercaseText,
  uppercaseText,
  concatString,
} from "../../utils";
import Box from "../../components/Box";
import LeftCurvedArrow from "../../components/svg-icons/left-curved-arrow";
import ChevronRight from "../../components/svg-icons/chev-right";

const List = ({
  data,
  handlePagination,
  theme,
  isLoading,
  isPaginate,
  error,
  displayItemCount,
}) => {
  const navigate = useNavigate();
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && isPaginate) {
          handlePagination(
            (prevPageNumber) => prevPageNumber + displayItemCount
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isPaginate]
  );

  const rowConfig = {
    uniqueKey: "id",
    css: `
      height: 4rem;
      cursor: pointer;
      &:hover {
        background-color: ${theme?.colors?.primary_200}};
      }
    `,
    onClick: (e, item) => {
      navigate(`/${item.id}`);
    },
  };

  const columns = {
    amount: {
      key: "amount",
      align: "right",
      content: (item) => (
        <>
          <Text font={theme.fontSizes.lg} fontWgt={theme.fontWeights.bold}>
            {parseRawPrice(item?.amount)}
          </Text>
          <Text font={theme.fontSizes.md} p="0 5px">
            {uppercaseText(item?.currencyCode)}
          </Text>
        </>
      ),
    },
    status: {
      key: "status",
      align: "right",
      width: 100,
      content: (item) => (
        <Button
          className={classNames({
            success:
              item?.status === "SETTLED" || item?.status === "AUTHORIZED",
            progress: item?.status === "SETTLING",
            fail:
              item?.status === "DECLINED" ||
              item?.status === "CANCELLED" ||
              item?.status === "FAILED",
          })}
        >
          {lowercaseText(item?.status)}
        </Button>
      ),
    },
    amountRefunded: {
      key: "amountRefunded",
      align: "center",
      content: (item) =>
        item?.amountRefunded > 0 ? (
          <>
            <LeftCurvedArrow
              color={theme.colors.black}
              size="15"
              viewBox="0 0 15 15"
            />
            <Text p="0 5px">Refunded</Text>
          </>
        ) : (
          ""
        ),
    },
    processor: {
      key: "processor",
      align: "center",
      content: (item) => (
        <Image
          name={item.processor}
          {...(item.processor && {
            url: getImageUrl(item.processor),
          })}
        />
      ),
    },
    paymentMethod: {
      key: "paymentMethod",
      align: "left",
      content: (item) => (
        <Image
          name={
            item?.paymentInstrument?.paymentInstrumentData?.binData?.network
          }
          {...(item?.paymentInstrument?.paymentInstrumentData?.binData
            ?.network && {
            url: getImageUrl(
              item.paymentInstrument.paymentInstrumentData.binData.network
            ),
          })}
        />
      ),
    },
    orderId: {
      key: "orderId",
      align: "center",
      content: (item) =>
        item.orderId !== "my_order_id" ? concatString(item.orderId, 20) : "",
    },
    date: {
      key: "date",
      align: "center",
      content: (item) => formatDate(item.date, "D MMM YYYY, h:mm"),
    },
    icon: {
      key: "icon",
      align: "center",
      content: (item) => <ChevronRight color={theme.colors.primary_100} />,
    },
  };

  return (
    <>
      {data?.length > 0 && (
        <Table
          rowConfig={rowConfig}
          columns={columns}
          data={data}
          setRef={lastElementRef}
          isLoading={isLoading}
          theme={theme}
        />
      )}
      {!isLoading && data.length === 0 && !error && (
        <Box p="10" m="20">
          Found no data to display!
        </Box>
      )}
      {error && (
        <Box p="10" m="20">
          Unable to retrieve your transaction details. Please check later!
        </Box>
      )}
    </>
  );
};

export default List;
