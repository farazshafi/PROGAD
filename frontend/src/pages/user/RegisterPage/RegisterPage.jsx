import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import {
  Box,
  Button,
  Center,
  ChakraProvider,
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
import { toast } from "react-toastify";
import { userRegisterApi } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser, setUser } from "../../../features/user/userSlice";

const RegisterPage = () => {
  // redux state
  const user = useSelector(selectedUser);

  const dispatch = useDispatch();

  // state
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(Number);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!name || !phoneNumber || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    const userDetails = { name, phoneNumber, email, password };

    try {
      const data = await userRegisterApi(userDetails);

      if (data && data.response && data.response.status === 400) {
        toast.error(data.response.data.message);
        setLoading(false);
        return;
      }
      dispatch(setUser({ ...data.user }));
      toast.success(data.message);
      navigate("/otp");
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (user ?? false) {
      navigate("/");
    }
  }, []);

  return (
    <ChakraProvider>
      <Header />
      <Box
        className="signIn-main-div"
        p={{ base: "0 10% 0 10%", md: "0 5% 0 5%", lg: "0 20% 0 20%" }}
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
              <Image borderRadius={"20px"} src={headphoneImg} alt="sign-in" />
            </Box>
            <Box width={{ lg: "50%", md: "50%", base: "100%" }}>
              <form onSubmit={signUpHandler}>
                <input
                  required
                  style={{ marginBottom: "20px" }}
                  className="form-input"
                  placeholder="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input
                  required
                  style={{ marginBottom: "20px" }}
                  className="form-input"
                  placeholder="phone number"
                  type="number"
                  name="pnone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <br />
                <input
                  required
                  style={{ marginBottom: "20px" }}
                  className="form-input"
                  placeholder="email address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputGroup size="md">
                  <Input
                    required
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup
                  mt={{ base: "20px" }}
                  mb={{ base: "20px", lg: "30px" }}
                  size="md"
                >
                  <Input
                    required
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <button type="submit">
                  <OurButton isLoading={loading} text={"SIGN UP"} />
                </button>
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
    </ChakraProvider>
  );
};

export default RegisterPage;
