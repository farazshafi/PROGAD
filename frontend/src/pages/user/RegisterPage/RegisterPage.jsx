import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import {
  Box,
  Button,
  Center,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import OurButton from "../../../components/OurButton/OurButton";
import headphoneImg from "../../../assets/images/walpaper/boat.jpeg";
import "./RegisterPage.css";
import Footer from "../../../components/Footer/Footer";

const RegisterPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Header />
      <Box
        className="signIn-main-div"
        mt={{ base: "50px", md: "30px", lg: "50px" }}
        mb={{ base: "50px", md: "30px", lg: "50px" }}


      >
        <Text
          fontSize={{ base: "15px", md: "20", lg: "20px" }}
          mb={{ base: "50px", md: "50px", lg: "50px" }}
          className="signIn-heading"
        >
            
          CREATE AN ACCOUNT
        </Text>
        <Center>
          <Box
            padding={{ lg: "5% 7%", md: "5% 7%", base: "10% 10%" }}
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
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                />
                <br />
                <input
                  style={{ marginBottom: "20px" }}
                  className="form-input"
                  placeholder="Enter your phone number"
                  type="number"
                  name="pnone"
                />
                <br />
                <input
                  style={{ marginBottom: "20px" }}
                  className="form-input"
                  placeholder="Enter your gmails address"
                  type="email"
                  name="gmail"
                />
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup mt={{base:"20px"}} mb={{base:"20px",lg:'30px'}} size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="confirm password"
                    name="confirmPassword" 
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <OurButton type={"submit"} text={"SIGN UP"} />
                <Text
                  fontSize={{ base: "10px", md: "20px", lg: "15px" }}
                  mt={"10px"}
                >
                  <a href="/register">Already have Account?</a>
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

export default RegisterPage;
