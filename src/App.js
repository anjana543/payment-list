import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";
import { AuthProvider } from "./services/authProvider";
import { PaymentList } from "./pages/PaymentList";
import { PaymentDetail } from "./pages/PaymentDetail";
import Body from "./layout/Body";
import Footer from "./layout/Footer";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router basename="/payment-list">
          <Body>
            <Routes>
              <Route path="/" element={<PaymentList />} />
              <Route path="/:id" element={<PaymentDetail />} />
            </Routes>
          </Body>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
