import React, { useEffect, useState } from "react";
import { Box, ChakraProvider, Text } from "@chakra-ui/react";
import headphoneImg from "../../../assets/images/walpaper/headphone.jpeg";
import AuthPageFrame from "../../../components/AuthPageFrame/AuthPageFrame";
import OurButton from "../../../components/OurButton/OurButton";
import { loginApi } from "../../../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser, setUser } from "../../../features/user/userSlice";
import GoogleButton from "react-google-button";
import { gProvider, auth } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  // redux state
  const user = useSelector(selectedUser);
  const dispatch = useDispatch();

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
    if (
      (data && data.response && data.response.status === 400) ||
      (data && data.response && data.response.status === 500)
    ) {
      toast.error(data.response.data.message || "something went wrong");
      return;
    }

    toast.success(data.message);
    dispatch(setUser({ ...data.user }));
    const user = data.user;
    if (user?.isVerified) {
      navigate("/");
    } else {
      toast.warning(data.warning);
      navigate("/otp");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, gProvider);
      const email = user.email;
      const name = user.displayName;
      const googleId = user.providerData[0].uid;
      const phoneNumber = user.phoneNumber || null;
      const data = await loginApi({ email, googleId, phoneNumber, name });
      if (
        (data && data.response && data.response.status === 400) ||
        (data && data.response && data.response.status === 500)
      ) {
        toast.error(data.response.data.message);
        return;
      }
      toast.success(data.message);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <ChakraProvider>
      <AuthPageFrame variant="login" image={headphoneImg}>
        <Text
          className="signIn-heading"
        >
          Sign in
        </Text>
        <p className="auth-subtitle">Sign in to your PROGAD account to continue.</p>
        <Box>
              <form>
                <input
                  style={{ marginBottom: "20px" }}
                  className="form-input"
                  placeholder="Enter your gmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="gmail"
                />
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="passwrod"
                />
                <Link to={"/forgott_password"}>
                  <p className="auth-forgot my-2 text-right">
                    Forgott Password?
                  </p>
                </Link>
                <div className="auth-primary-action" onClick={hanldeLogin}>
                  <OurButton w="100" text={"SIGN IN"} />
                </div>
                <Text className="auth-form-foot">
                  New to PROGAD? <Link className="auth-text-link" to={"/register"}>Create an account</Link>
                </Text>
                <div className="auth-divider">or continue with</div>
                <div className="auth-google-action">
                  <GoogleButton
                    onClick={handleGoogleLogin}
                    type="light"
                    style={{ borderRadius: "5px", marginTop: "0", width: "100%" }}
                  />
                </div>
                <Link to={"/face_login"}>
                  <div className="auth-face-action">Login with face</div>
                </Link>
              </form>
        </Box>
      </AuthPageFrame>
    </ChakraProvider>
  );
};

export default LoginPage;
