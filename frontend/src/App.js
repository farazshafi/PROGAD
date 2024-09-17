// import LoginPage from "./pages/user/LoginPage/LoginPage";
// import RegisterPage from "./pages/user/RegisterPage/RegisterPage";
import {ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import OtpPage from "./pages/user/OtpPage/OtpPage";

function App() {
  return (
    <ChakraProvider>
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}
      <OtpPage />
    </ChakraProvider>
  );
}

export default App;
