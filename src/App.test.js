import { render, screen, cleanup } from "./utils/testUtils";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    cleanup();
  });

  test("renders App component", async () => {
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
