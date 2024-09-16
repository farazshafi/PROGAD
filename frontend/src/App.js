// import LoginPage from "./pages/user/LoginPage/LoginPage";
import {ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import RegisterPage from "./pages/user/RegisterPage/RegisterPage";

function App() {
  return (
    <ChakraProvider>
      {/* <LoginPage /> */}
      <RegisterPage />
    </ChakraProvider>
  );
}

export default App;
