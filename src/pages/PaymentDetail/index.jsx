import classNames from "classnames";
import { useTheme } from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useAuthState from "../../hooks/useAuthState";
import Container from "../../components/Container";
import Loader from "../../components/Loader";
import { Breadcrumbs, Crumb } from "../../components/Breadcrumbs";
import { CardWrapper, CardBody } from "../../components/Card";
import Group from "../../components/Group";
import Block from "../../components/Block";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Image from "../../components/Image";
import LeftCurvedArrow from "../../components/svg-icons/left-curved-arrow";
import {
  parseRawPrice,
  currencyCode,
  capitalizeFirstLetter,
  getImageUrl,
  concatString,
  formatDate,
  lowercaseText,
} from "../../utils";
import { PAYMENT_DETAILS_URL } from "../../utils/constant";
function PaymentDetail() {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const theme = useTheme();
  const { id } = useParams();
  const { response, error, isLoading } = useFetch(
    `${PAYMENT_DETAILS_URL.replace(":id", id)}`,
    {
      bearerToken: user.accessToken,
    }
  );

  return (
    <Container>
      <Breadcrumbs separator="&larr;">
        <Crumb>
          <a href="#" onClick={() => navigate("/")}>
            Transactions
          </a>
        </Crumb>
      </Breadcrumbs>
      {response?.id && (
        <>
          {typeof response?.amount !== "undefined" && (
            <Text font={theme.fontSizes.xxl} fontWgt={theme.fontWeights.bold}>
              {currencyCode[response?.currencyCode]}{" "}
              {parseRawPrice(response?.amount)}
            </Text>
          )}

          {response?.amountRefunded > 0 && (
            <Group mr="20" ml="30">
              <Text
                font={theme.fontSizes.sm}
                color={theme.colors.neutral_700}
                block
              >
                Refund
              </Text>
              <Text
                font={theme.fontSizes.lg}
                color={theme.colors.neutral_700}
                fontWgt={theme.fontWeights.bold}
                block
              >
                {currencyCode[response?.currencyCode]}{" "}
                {parseRawPrice(response?.amountRefunded)}
              </Text>
            </Group>
          )}

          {typeof response?.amountCaptured !== "undefined" && (
            <Group mr="20" ml="30">
              <Text
                font={theme.fontSizes.sm}
                color={theme.colors.neutral_700}
                block
              >
                Final
              </Text>
              <Text
                font={theme.fontSizes.lg}
                color={theme.colors.neutral_700}
                fontWgt={theme.fontWeights.bold}
                block
              >
                {currencyCode[response?.currencyCode]}{" "}
                {parseRawPrice(response?.amountCaptured)}
              </Text>
            </Group>
          )}
          {response?.amountRefunded > 0 && (
            <Button withBorder relative>
              <LeftCurvedArrow
                color={theme.colors.black}
                size="15"
                viewBox="0 0 15 15"
              />
              <Text fontWgt={theme.fontWeights.bold} font={theme.fontSizes.md}>
                Refunded
              </Text>
            </Button>
          )}
          <CardWrapper lg>
            <CardBody>
              {response?.currencyCode && (
                <Group>
                  <Text
                    font={theme.fontSizes.sm}
                    color={theme.colors.neutral_700}
                    block
                  >
                    Currency
                  </Text>
                  <Text
                    font={theme.fontSizes.lg}
                    color={theme.colors.black}
                    fontWgt={theme.fontWeights.bold}
                    block
                  >
                    {response?.currencyCode}
                  </Text>
                </Group>
              )}

              {response?.processor && (
                <Group>
                  <Text
                    font={theme.fontSizes.sm}
                    color={theme.colors.neutral_700}
                    block
                  >
                    Processor
                  </Text>
                  <Image
                    name={response.processor}
                    {...(response.processor && {
                      url: getImageUrl(response.processor),
                    })}
                  />
                  <Text
                    font={theme.fontSizes.md}
                    color={theme.colors.black}
                    fontWgt={theme.fontWeights.bold}
                    p="0 7px"
                    relative
                  >
                    {capitalizeFirstLetter(response.processor)}
                  </Text>
                </Group>
              )}

              {response?.paymentInstrument?.paymentInstrumentData?.binData
                ?.network && (
                <Group>
                  <Text
                    font={theme.fontSizes.sm}
                    color={theme.colors.neutral_700}
                    block
                  >
                    Payment Method
                  </Text>
                  <Image
                    name={
                      response.paymentInstrument.paymentInstrumentData.binData
                        .network
                    }
                    {...(response.paymentInstrument.paymentInstrumentData
                      .binData.network && {
                      url: getImageUrl(
                        response.paymentInstrument.paymentInstrumentData.binData
                          .network
                      ),
                    })}
                  />
                  <Text
                    font={theme.fontSizes.md}
                    color={theme.colors.black}
                    fontWgt={theme.fontWeights.bold}
                    p="0 7px"
                    relative
                  >
                    Card /{" "}
                    {capitalizeFirstLetter(
                      response.paymentInstrument.paymentInstrumentData.binData
                        .network
                    )}
                  </Text>
                </Group>
              )}

              {response?.orderId && (
                <Group>
                  <Text
                    font={theme.fontSizes.sm}
                    color={theme.colors.neutral_700}
                    block
                  >
                    Your reference
                  </Text>
                  <Text
                    font={theme.fontSizes.lg}
                    color={theme.colors.black}
                    block
                  >
                    {concatString(response?.orderId, 20)}
                  </Text>
                </Group>
              )}

              {response?.date && (
                <Group>
                  <Text
                    font={theme.fontSizes.sm}
                    color={theme.colors.neutral_700}
                    block
                  >
                    Submitted
                  </Text>
                  <Text
                    font={theme.fontSizes.lg}
                    color={theme.colors.black}
                    block
                  >
                    {formatDate(response.date, "D MMM YYYY, h:mm")}
                  </Text>
                </Group>
              )}

              {response?.status && (
                <Group>
                  <Button
                    className={classNames({
                      success:
                        response.status === "SETTLED" ||
                        response.status === "AUTHORIZED",
                      progress: response.status === "SETTLING",
                      fail:
                        response.status === "DECLINED" ||
                        response.status === "CANCELLED" ||
                        response.status === "FAILED",
                    })}
                    large
                  >
                    {lowercaseText(response?.status)}
                  </Button>
                </Group>
              )}
            </CardBody>
          </CardWrapper>
          <Block align="space-between">
            {response?.processor && (
              <CardWrapper md>
                <CardBody column pt="20" pb="20">
                  <Group>
                    <Image
                      name={response.processor}
                      {...(response.processor && {
                        url: getImageUrl(response.processor),
                      })}
                      size={30}
                    />
                    <Text
                      font={theme.fontSizes.lg}
                      color={theme.colors.black}
                      fontWgt={theme.fontWeights.bold}
                      p="0 7px"
                      relative
                    >
                      Processor
                    </Text>
                  </Group>

                  <Group mb="15">
                    <Text
                      font={theme.fontSizes.sm}
                      color={theme.colors.neutral_700}
                      block
                    >
                      Account ID
                    </Text>
                    <Text
                      font={theme.fontSizes.lg}
                      color={theme.colors.black}
                      block
                    >
                      {response?.processorMerchantId || "--"}
                    </Text>
                  </Group>

                  <Group>
                    <Text
                      font={theme.fontSizes.sm}
                      color={theme.colors.neutral_700}
                      block
                    >
                      Transaction ID
                    </Text>
                    <Text
                      font={theme.fontSizes.lg}
                      color={theme.colors.primary_100}
                      block
                    >
                      {response?.transactions?.[0]?.processorTransactionId ||
                        "--"}
                    </Text>
                  </Group>
                </CardBody>
              </CardWrapper>
            )}

            {response?.paymentInstrument?.paymentInstrumentData?.binData
              ?.network && (
              <CardWrapper md>
                <CardBody column pt="20" pb="20">
                  <Group>
                    <Image
                      name={
                        response.paymentInstrument.paymentInstrumentData.binData
                          .network
                      }
                      {...(response.paymentInstrument.paymentInstrumentData
                        .binData.network && {
                        url: getImageUrl(
                          response.paymentInstrument.paymentInstrumentData
                            .binData.network
                        ),
                      })}
                      size={30}
                    />
                    <Text
                      font={theme.fontSizes.lg}
                      color={theme.colors.black}
                      fontWgt={theme.fontWeights.bold}
                      p="0 7px"
                      relative
                    >
                      Payment Method
                    </Text>
                  </Group>

                  <Group mb="15">
                    <Text
                      font={theme.fontSizes.sm}
                      color={theme.colors.neutral_700}
                      block
                    >
                      Cardholder Name
                    </Text>
                    <Text
                      font={theme.fontSizes.lg}
                      color={theme.colors.black}
                      block
                    >
                      {response?.paymentInstrument?.paymentInstrumentData
                        ?.cardholderName || "--"}
                    </Text>
                  </Group>

                  <Group>
                    <Group>
                      <Text
                        font={theme.fontSizes.sm}
                        color={theme.colors.neutral_700}
                        block
                      >
                        Card Number
                      </Text>
                      <Text
                        font={theme.fontSizes.lg}
                        color={theme.colors.black}
                        block
                      >
                        **** **** ****{" "}
                        {response?.paymentInstrument?.paymentInstrumentData
                          ?.last4Digits || "****"}
                      </Text>
                    </Group>

                    <Group ml="30">
                      <Text
                        font={theme.fontSizes.sm}
                        color={theme.colors.neutral_700}
                        block
                      >
                        Epiration
                      </Text>
                      <Text
                        font={theme.fontSizes.lg}
                        color={theme.colors.black}
                        block
                      >
                        {response?.paymentInstrument?.paymentInstrumentData
                          ?.expirationMonth || "--"}
                        /
                        {response?.paymentInstrument?.paymentInstrumentData
                          ?.expirationYear || "--"}
                      </Text>
                    </Group>
                  </Group>
                </CardBody>
              </CardWrapper>
            )}

            {response?.paymentInstrument?.threeDSecureAuthentication && (
              <CardWrapper md>
                <CardBody column pt="20" pb="20">
                  <Group>
                    <Image name="3DS" url={getImageUrl("3DS")} size={30} />
                    <Text
                      font={theme.fontSizes.lg}
                      color={theme.colors.black}
                      fontWgt={theme.fontWeights.bold}
                      p="0 7px"
                      relative
                    >
                      3DSecure
                    </Text>
                  </Group>
                  <Group>
                    <Text
                      font={theme.fontSizes.sm}
                      color={theme.colors.neutral_700}
                      block
                    >
                      Response
                    </Text>
                    <Button className="progress">
                      {capitalizeFirstLetter(
                        response?.paymentInstrument?.threeDSecureAuthentication
                          ?.responseCode
                      )}
                    </Button>
                  </Group>
                </CardBody>
              </CardWrapper>
            )}
          </Block>
        </>
      )}
      {isLoading && <Loader color={theme?.colors?.primary_100} />}
      {error && (
        <Block p="10" m="20">
          No matching Payment could be found!
        </Block>
      )}
    </Container>
  );
}

export default PaymentDetail;
