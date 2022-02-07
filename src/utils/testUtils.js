import { render } from "@testing-library/react";
import ThemeProvider from "../components/ThemeProvider";
import { AuthProvider } from "../services/authProvider";
import { MemoryRouter } from "react-router-dom";

const currentUser = {
  status: "success",
  error: null,
  user: {
    accessToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyYmYzZTFlYi1mZDg3LTQ2MzItYmUyNC1kMGM0NmQ4N2RmMWMiLCJleHAiOjE2NDk0MjY1MjN9.GI5a7oh4b1tt_25F2-om-yyDkpQ54QBVK0nTEUHrXdE",
  },
};

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider value={currentUser}>
        <MemoryRouter
          initialEntries={["/", "/payment-list", { pathname: "/payment-list" }]}
          initialIndex={2}
        >
          {children}
        </MemoryRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

// create a customRender that wraps the UI in a memory Router
const customRender = (ui, options) => {
  return render(ui, {
    wrapper: (args) =>
      AllTheProviders({
        ...args,
      }),
    ...options,
  });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
