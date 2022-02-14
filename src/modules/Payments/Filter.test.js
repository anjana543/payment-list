import { render, screen, cleanup, fireEvent } from "../../utils/testUtils";
import { within } from "@testing-library/dom";
import Filter from "./Filter";

import { mockData } from "../../utils/mockData";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("Payment Filter", () => {
  beforeEach(() => {
    render(<Filter data={mockData?.data} />);
  });
  afterEach(() => {
    cleanup();
  });

  test("renders input element for payment search", () => {
    //display input box on Searct text click
    const searchText = screen.getByText(/Search By Reference/i);
    const input = screen.getByTestId("Search By Reference");
    expect(input).toHaveClass("hidden");
    fireEvent.click(searchText);
    expect(input).not.toHaveClass("hidden");

    //check input value
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });

  test("renders four selection options for payment filtering", () => {
    const selectEle = screen.getAllByTestId("select");
    expect(selectEle).toHaveLength(4);

    //Processor Select
    const select1 = within(selectEle[0]);
    //check the length of select option
    let options1 = select1.getAllByRole("option");
    expect(options1).toHaveLength(5);
    expect(options1[0].selected).toBeTruthy();
    expect(options1[1].selected).toBeFalsy();
    expect(options1[2].selected).toBeFalsy();
    expect(options1[3].selected).toBeFalsy();
    expect(options1[4].selected).toBeFalsy();
    fireEvent.click(selectEle[0], {
      target: { value: "BRAINTREE" },
    });
    expect(options1[0].selected).toBeFalsy();
    expect(options1[1].selected).toBeFalsy();
    expect(options1[2].selected).toBeFalsy();
    expect(options1[3].selected).toBeFalsy();
    expect(options1[4].selected).toBeTruthy();

    //Payment Method Select
    const select2 = within(selectEle[1]);
    //check the length of select option
    let options2 = select2.getAllByRole("option");
    expect(options2).toHaveLength(3);
    expect(options2[0].selected).toBeTruthy();
    expect(options2[1].selected).toBeFalsy();
    expect(options2[2].selected).toBeFalsy();
    fireEvent.click(selectEle[1], {
      target: { value: "PAYPAL_ORDER" },
    });
    expect(options2[0].selected).toBeFalsy();
    expect(options2[1].selected).toBeFalsy();
    expect(options2[2].selected).toBeTruthy();

    //Current Status Select
    const select3 = within(selectEle[2]);
    //check the length of select option
    let options3 = select3.getAllByRole("option");
    expect(options3).toHaveLength(7);
    expect(options3[0].selected).toBeTruthy();
    expect(options3[1].selected).toBeFalsy();
    expect(options3[2].selected).toBeFalsy();
    fireEvent.click(selectEle[2], {
      target: { value: "FAILED" },
    });
    expect(options3[0].selected).toBeFalsy();
    expect(options3[1].selected).toBeFalsy();
    expect(options3[2].selected).toBeTruthy();

    //Currency Select
    const select4 = within(selectEle[3]);
    //check the length of select option
    let options4 = select4.getAllByRole("option");
    expect(options4).toHaveLength(4);
    expect(options4[0].selected).toBeTruthy();
    expect(options4[1].selected).toBeFalsy();
    expect(options4[2].selected).toBeFalsy();
    expect(options4[3].selected).toBeFalsy();
    fireEvent.click(selectEle[3], {
      target: { value: "USD" },
    });
    expect(options4[0].selected).toBeFalsy();
    expect(options4[1].selected).toBeFalsy();
    expect(options4[2].selected).toBeFalsy();
    expect(options4[3].selected).toBeTruthy();
  });
});
