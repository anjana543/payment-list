import { render, screen, cleanup, fireEvent } from "../../utils/testUtils";

import { renderHook } from "@testing-library/react-hooks";
import { PaymentDetail } from "./index";
import useFetch from "../../hooks/useFetch";

import {
  mockPaymentDetailData,
  mockPaymentApi,
  mockHeaderData,
} from "../../utils/mockData";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("Payment List", () => {
  beforeEach(() => {
    render(<PaymentDetail />);
  });

  afterEach(() => {
    cleanup();
  });

  test("renders Payment Detail Page and go back click redirects to payment list page", async () => {
    const goBackEle = screen.getByText(/Transactions/i);
    expect(goBackEle).toBeInTheDocument();
    fireEvent.click(goBackEle);

    expect(window.location.pathname).toBe("/");
  });

  test("displays payment details by payment ID by calling useFetch hook", async () => {
    // Mock API
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPaymentDetailData),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(mockPaymentApi.paymentDetail, mockHeaderData)
    );
    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();

    expect(result.current.response.id).toBe("1TKha2s1");
    expect(result.current.isLoading).toBeFalsy();
  });
});
