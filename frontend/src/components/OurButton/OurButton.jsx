import { Button, ChakraProvider } from "@chakra-ui/react";
import React from "react";

const OurButton = ({ text, type = "button", handleClick, page }) => {
  return (
    <ChakraProvider>
      <Button
        onClick={handleClick}
        color="white"
        type={type}
        bg="#FF7F11"
        width={page === "otp" || page === "product_details" ? "100%" : "auto"}
        transition="background-color 0.5s ease, color 0.5s ease"
        _hover={{
          bg: "#262626",
          color: "white",
        }}
      >
        {type === "rupees" ? ( 
          <>
            <i style={{marginTop:"3px",marginRight:"3px"}} className="fa-solid fa-indian-rupee-sign"></i> {text}
          </>
        ) : (
          text
        )}
      </Button>
    </ChakraProvider>
  );
};

export default OurButton;
