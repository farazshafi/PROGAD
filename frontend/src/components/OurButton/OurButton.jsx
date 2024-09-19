import { Button } from "@chakra-ui/react";
import React from "react";

const OurButton = ({text,type}) => {
  return (
    <Button
      color="white"
      type={type==="submit" ? "submit" : " "}
      bg="#FF7F11"
      // width="100%"
      transition="background-color 0.5s ease, color 0.5s ease"
      _hover={{
        bg: "#262626",
        color: "white",
      }}
    >
      {text}
    </Button>
  );
};

export default OurButton;
