import LoginPage from "./pages/user/LoginPage/LoginPage";
import OtpPage from "./pages/user/OtpPage/OtpPage";
import RegisterPage from "./pages/user/RegisterPage/RegisterPage";
import {ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import NotFoundPage from "./pages/user/NotFoundPage/NotFound";
import HomePage from "./pages/user/HomePage/HomePage"


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
