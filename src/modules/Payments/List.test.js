import { render, screen, cleanup, waitFor } from "../../utils/testUtils";
import { within } from "@testing-library/dom";
import List from "./List";

import { mockData, columns } from "../../utils/mockData";
import { concatString, formatDate } from "../../utils";

const tableColumnArray = Object.keys(columns);
const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("Payment List with Table", () => {
  let originFetch;
  beforeEach(() => {
    originFetch = global.fetch;
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn().mockReturnValue(null),
      unobserve: jest.fn().mockReturnValue(null),
      disconnect: jest.fn().mockReturnValue(null),
    });
    window.IntersectionObserver = mockIntersectionObserver;
    render(<List data={mockData?.data} />);
  });
  afterEach(() => {
    global.fetch = originFetch;
    cleanup();
  });

  test("renders payment data in table", () => {
    const tableEle = screen.getByTestId("main-table");
    expect(tableEle).toBeInTheDocument();
  });

  test("renders table header", async () => {
    const header = await waitFor(() => screen.getAllByTestId(/^header-*/));
    expect(header).toHaveLength(8);
  });

  test("renders table row correctly", async () => {
    const rows = await waitFor(() => screen.getAllByTestId(/^row-*/));
    expect(rows).toHaveLength(mockData?.data?.length);
    rows.forEach((tr, rowIndex) => {
      const rowData = mockData?.data?.[rowIndex];
      const utils = within(tr);
      //check status
      expect(utils.getByTestId(`col-${tableColumnArray[1]}`)).toHaveTextContent(
        rowData?.status.toLowerCase()
      );
      //check order ID
      expect(utils.getByTestId(`col-${tableColumnArray[5]}`)).toHaveTextContent(
        rowData?.orderId !== "my_order_id"
          ? concatString(rowData.orderId, 20)
          : ""
      );
      //check date
      expect(utils.getByTestId(`col-${tableColumnArray[6]}`)).toHaveTextContent(
        formatDate(rowData.date, "D MMM YYYY, h:mm")
      );
    });
  });
});
