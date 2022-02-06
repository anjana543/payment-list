import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";
import Payments from "./pages/Payments";
import PaymentDetail from "./pages/PaymentDetail";
import Body from "./layout/Body";
import Footer from "./layout/Footer";

import { AuthProvider } from "./services/authProvider";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Body>
            <Routes>
              <Route path="/" exact element={<Payments />} />
              <Route path="/services/:id" element={<PaymentDetail />} />
            </Routes>
          </Body>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
