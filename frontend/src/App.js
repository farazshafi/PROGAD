import LoginPage from "./pages/user/LoginPage/LoginPage";
import {ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <LoginPage />
    </ChakraProvider>
  );
}

export default App;
