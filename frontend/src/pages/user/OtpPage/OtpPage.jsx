import React from "react";
import {
  Center,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Flex,
  Box,
  ChakraProvider,
} from "@chakra-ui/react";
import "./OtpPage.css";
import OurButton from "../../../components/OurButton/OurButton";

const OtpPage = () => (
  <ChakraProvider>
    <Flex
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
    >
      <Box>
        <Text
          fontSize={{ base: "15px", md: "20px", lg: "20px" }}
          mb={{ base: "30px", md: "50px", lg: "50px" }}
          className="Otp-heading"
        >
          OTP VERIFICATION
        </Text>
        <Center mb={"20px"}>
          <HStack spacing={"10px"}>
            <PinInput placeholder="_" otp>
              <PinInputField
                width={{ base: "50px", md: "60px", lg: "70px" }}
                height={{ base: "50px", md: "60px", lg: "70px" }}
                bg={"white"}
              />
              <PinInputField
                width={{ base: "50px", md: "60px", lg: "70px" }}
                height={{ base: "50px", md: "60px", lg: "70px" }}
                bg={"white"}
              />
              <PinInputField
                width={{ base: "50px", md: "60px", lg: "70px" }}
                height={{ base: "50px", md: "60px", lg: "70px" }}
                bg={"white"}
              />
              <PinInputField
                width={{ base: "50px", md: "60px", lg: "70px" }}
                height={{ base: "50px", md: "60px", lg: "70px" }}
                bg={"white"}
              />
            </PinInput>
          </HStack>
        </Center>
        <OurButton page={"otp"} text={"VERIFY"} />
      </Box>
    </Flex>
  </ChakraProvider>
);

export default OtpPage;
