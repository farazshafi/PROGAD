import React, { useState } from "react";
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
import { verifyOtpApi } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { verifyUser } from "../../../features/user/userSlice";

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Update state to hold individual OTP digits
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newOtp = [...otp]; // Create a copy of the otp state
    newOtp[index] = value; // Update the specific index
    setOtp(newOtp); // Set the updated state
  };

  const handleVerify = async () => {
    setLoading(true);
    const email = JSON.parse(localStorage.getItem("otp-email"));
    const otpDetails = {
      email: email,
      otp: Number(otp.join("")),
    };
    const data = await verifyOtpApi(otpDetails);
    if (data && data.response && data.response.status === 400) {
      toast.error(data.response.data.message);
      setLoading(false)
      return;
    }
    console.log("data",data)
    toast.success(data.message);
    dispatch(verifyUser())
    setLoading(false);
    navigate("/")
  };

  return (
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
              <PinInput otp>
                {otp.map((digit, index) => (
                  <PinInputField
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    width={{ base: "50px", md: "60px", lg: "70px" }}
                    height={{ base: "50px", md: "60px", lg: "70px" }}
                    bg={"white"}
                  />
                ))}
              </PinInput>
            </HStack>
          </Center>
          <div onClick={handleVerify}>
            <OurButton isLoading={loading} page={"otp"} text={"VERIFY"} />
          </div>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default OtpPage;
