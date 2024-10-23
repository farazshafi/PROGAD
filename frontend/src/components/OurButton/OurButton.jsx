import { Button, ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from "react";

const OurButton = ({ isLoading, text, type = "button", page, w, disabled }) => {

  useEffect(()=>{
  },[disabled])

  return (
    <ChakraProvider>
      <Button
        disabled = {disabled || false}
        isLoading={isLoading}
        color="white"
        type={type}
        bg="#FF7F11"
        width={
          page === "otp" || page === "product_details" || w === "100"
            ? "100%"
            : "auto"
        }
        transition="background-color 0.5s ease, color 0.5s ease"
        _hover={{
          bg: "#262626",
          color: "white",
        }}
      >
        {type === "rupees" ? <>{text}</> : text}
      </Button>
    </ChakraProvider>
  );
};

export default OurButton;
