import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import Header from "../../../components/Header/Header";
import { Box, Center, ChakraProvider, Image, Text } from "@chakra-ui/react";
import headphoneImg from "../../../assets/images/walpaper/headphone.jpeg";
import Footer from "../../../components/Footer/Footer";
import OurButton from "../../../components/OurButton/OurButton";
import { loginApi } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectedUser } from "../../../features/user/userSlice";

const LoginPage = () => {
  // redux state
  const user = useSelector(selectedUser)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const hanldeLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    const userDetails = {
      email,
      password,
    };
    const data = await loginApi(userDetails);
    if(data && data.response && data.response.status === 400){
      toast.error(data.response.data.message);
      return;
    }
    toast.success(data.message);
    console.log(data)
    navigate("/");
  };


  useEffect(()=>{
    if(user){
      console.log("login page ",user)
      navigate("/")
    }
  })

  return (
    <ChakraProvider>
      <Header />
      <Box className="signIn-main-div">
        <Text
          fontSize={{ base: "30px", md: "20", lg: "30px" }}
          mb={{ base: "50px", md: "50px", lg: "50px" }}
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
              <Image borderRadius={"20px"} src={headphoneImg} alt="sign-in" />
            </Box>
            <Box width={{ lg: "50%", md: "50%", base: "100%" }}>
              <form>
                <input
                  style={{ marginBottom: "20px" }}
                  className="form-input"
                  placeholder="Enter your gmail"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  name="gmail"
                />
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  name="passwrod"
                />
                <Text
                  mt={"10px"}
                  mb={{ base: "20px", md: "30px" }}
                  fontSize={{ base: "10px", md: "20px", lg: "15px" }}
                  className="forgot-password"
                >
                  forgot password?
                </Text>
                <div onClick={hanldeLogin}>
                  <OurButton w="100" text={"SIGN IN"} />
                </div>
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
    </ChakraProvider>
  );
};

export default LoginPage;
