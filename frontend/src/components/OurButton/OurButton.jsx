import { Button, ChakraProvider } from "@chakra-ui/react";
import React from "react";

const OurButton = ({ text, type, handleClick }) => {
  return (
    <ChakraProvider>
      <Button
        onClick={() => handleClick()}
        color="white"
        type={type === "submit" ? "submit" : " "}
        bg="#FF7F11"
        // width="100%"
        transition="background-color 0.5s ease, color 0.5s ease"
        _hover={{
          bg: "#262626",
          color: "white",
        }}
      >
        {type === "rupees" ? (
          <>
            <i class="fa-solid fa-indian-rupee-sign"></i> {text}
          </>
        ) : (
          <>{text}</>
        )}
      </Button>
    </ChakraProvider>
  );
};

export default OurButton;
