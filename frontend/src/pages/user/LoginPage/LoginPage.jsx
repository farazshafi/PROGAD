import React from "react";
import "./LoginPage.css";
import Header from "../../../components/Header/Header";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import headphoneImg from "../../../assets/images/walpaper/headphone.jpeg";
import Footer from "../../../components/Footer/Footer";
import OurButton from "../../../components/OurButton/OurButton";

const LoginPage = () => {
  return (
    <>
      <Header />
      <Box
        className="signIn-main-div"
        mt={{ base: "50px", md: "30px", lg: "50px" }}
        mb={{ base: "50px", md: "30px", lg: "50px" }}

      >
        <Text
          fontSize={{ base: "30px", md: "20", lg: "30px" }}
          mb={{base:"50px", md:"50px", lg:"50px" }}
          className="signIn-heading"
        >
          SignIn
        </Text>
        <Center>
          <Box
            padding={{ lg: "5% 7%", md: "5% 7%", base: "5% 10%" }}
            className="content-wrapper"
          >
            <Box
              display={{ base: "none", lg: "inline", md: "inline" }}
              width={{ lg: "50%", md: "50%", base: "80%" }}
            >
              <Image
                borderRadius={"20px"}
                src={headphoneImg}
                alt="sign-in"
              />
            </Box>
            <Box width={{ lg: "50%", md: "50%", base: "100%" }}>
              <form>
                <input
                  style={{ marginBottom: "20px" }}
                  className="form-input"
                  placeholder="Enter your gmail"
                  type="text"
                  name="gmail"
                />
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your password"
                  type="text"
                  name="passwrod"
                />
                <Text
                  mt={"10px"}
                  mb={{base:'20px',md:"30px"}}
                  fontSize={{ base: "10px", md: "20px", lg: "15px" }}
                  className="forgot-password"
                >
                  forgot password?
                </Text>
                <OurButton text={"SIGN IN"}/> 
                <Text
                  fontSize={{ base: "10px", md: "20px", lg: "15px" }}
                  mt={"10px"}
                >
                  <a href="/register">Create an Account</a>
                </Text>
              </form>
            </Box>
          </Box>
        </Center>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
