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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser, setUser } from "../../../features/user/userSlice";
import GoogleButton from "react-google-button";
import { signInWithPopup } from "firebase/auth";
import { auth, gProvider } from "../../../firebase";

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
  const [isFacePage, setIsFacePage] = useState(false);

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
    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      toast.error("Invalid Phone Number");
      return;
    }

    setLoading(true);

    const userDetails = { name, phoneNumber, email, password };

    try {
      const data = await userRegisterApi(userDetails);

      if (data && data.response) {
        const { status } = data.response;
        toast.error(
          data.response.data.message || "server error! register error"
        );
        setLoading(false);
        return;
      }
      dispatch(setUser({ ...data.user }));
      toast.success(data.message);

      if(isFacePage){
        navigate("/face_register")
      }

      navigate("/otp");
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { user } = await signInWithPopup(auth, gProvider);
      const googleId = user.providerData[0].uid;
      const name = user.displayName;
      const email = user.email;
      const phoneNumber = user.phoneNumber || null;

      const userDetails = { name, email, googleId, phoneNumber };
      const data = await userRegisterApi(userDetails);

      if (
        (data && data.response && data.response.status === 400) ||
        (data && data.response && data.response.status === 500)
      ) {
        toast.error(data.response.data.message);
        setLoading(false);
        return;
      }
      dispatch(setUser({ ...data.user }));
      toast.success(data.message);
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!name || !phoneNumber || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields before registering with Face");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Invalid Phone Number");
      return false;
    }
    return true;
  };

  const handleFaceRegister = (e) => {
    setIsFacePage(true)
    if (!validateForm()) {
      e.preventDefault();
    }
    signUpHandler(e);
  };

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
                <button style={{ width: "100%" }} type="submit">
                  <OurButton w={"100"} isLoading={loading} text={"SIGN UP"} />
                </button>
                <Text
                  fontSize={{ base: "10px", md: "20px", lg: "15px" }}
                  mt={"10px"}
                >
                  <Link to={"/login"}> Already have Account?</Link>
                </Text>
                <GoogleButton
                  onClick={handleGoogleLogin}
                  type="light"
                  style={{
                    borderRadius: "5px",
                    marginTop: "10px",
                    width: "100%",
                  }}
                />
                {/* <div onClick={handleFaceRegister}>
                  <div className="w-full bg-gray-900 text-white p-3 rounded mt-2 text-center hover:bg-gray-800">
                    <p className="text-gray-300 text-sm font-poppins">
                      Register With Face
                    </p>
                  </div>
                </div> */}
              </form>
            </Box>
          </Box>
        </Center>
      </Box>
      {/* <Footer /> */}
    </ChakraProvider>
  );
};

export default RegisterPage;
