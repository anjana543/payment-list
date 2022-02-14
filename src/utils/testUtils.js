import { render } from "@testing-library/react";
import ThemeProvider from "../components/ThemeProvider";
import { AuthProvider } from "../services/authProvider";

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider
        initialState={{
          status: "success",
          error: null,
          user: {
            accessToken:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyYmYzZTFlYi1mZDg3LTQ2MzItYmUyNC1kMGM0NmQ4N2RmMWMiLCJleHAiOjE2NDk0MjY1MjN9.GI5a7oh4b1tt_25F2-om-yyDkpQ54QBVK0nTEUHrXdE",
          },
        }}
      >
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options, initialState) => {
  render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} initialState={initialState} />
    ),
    ...options,
  });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
