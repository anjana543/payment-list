import { render, screen, cleanup, fireEvent } from "../../utils/testUtils";
import { renderHook } from "@testing-library/react-hooks";
import { PaymentList } from "./index";
import useFetch from "../../hooks/useFetch";

import { mockData, mockPaymentApi, mockHeaderData } from "../../utils/mockData";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("Payment List", () => {
  beforeEach(() => {
    render(<PaymentList />);
  });

  afterEach(() => {
    cleanup();
  });

  test("renders Payment Lisitng page", async () => {
    const mainHeadingEle = screen.getByText(/Transactions/i);
    expect(mainHeadingEle).toBeInTheDocument();
  });

  test("renders payment search label", () => {
    //display input box on Searct text click
    const searchText = screen.getByText(/Search By Reference/i);
    expect(searchText).toBeInTheDocument();
  });

  test("renders four selection options for payment filtering", () => {
    const selectEle = screen.getAllByTestId("select");
    expect(selectEle).toHaveLength(4);
  });

  test("displays payment list by calling useFetch hook", async () => {
    // Mock API
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(mockPaymentApi.paymentList, mockHeaderData)
    );
    expect(result.current.response).toEqual({});
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();

    expect(result.current.response.data).toHaveLength(mockData.data.length);
    expect(result.current.isLoading).toBeFalsy();
  });
});
