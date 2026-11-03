import React, { useEffect, useState } from "react";
import {
  Center,
  HStack,
  PinInput,
  PinInputField,
  Text,
  ChakraProvider,
} from "@chakra-ui/react";
import AuthPageFrame from "../../../components/AuthPageFrame/AuthPageFrame";
import OurButton from "../../../components/OurButton/OurButton";
import { verifyOtpApi, resendOtpApi } from "../../../api/userApi"; // Add resendOtpApi for resend OTP
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser, verifyUser } from "../../../features/user/userSlice";

const OtpPage = () => {
  const user = useSelector(selectedUser);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verifyDisabled, setVerifyDisabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    setLoading(true);
    const forgettPassEmail = JSON.parse(
      localStorage.getItem("passForgetEmail")
    );
    let userEmail;
    if (forgettPassEmail) {
      userEmail = forgettPassEmail;
    } else {
      userEmail = user.email;
    }

    const otpDetails = {
      email: userEmail,
      otp: Number(otp.join("")),
    };
    const data = await verifyOtpApi(otpDetails);
    if (data && data.response && data.response.status === 400) {
      toast.error(data.response.data.message);
      setLoading(false);
      return;
    }
    toast.success(data.message);
    if (!forgettPassEmail) {
      dispatch(verifyUser());
    }
    setLoading(false);
    const passForget = JSON.parse(localStorage.getItem("passForget"));
    if (passForget) {
      navigate("/forgott_password");
      return;
    }
    if(user){
      if(user.faceData)
      navigate("/face_register")
      return 
    }
    navigate("/");
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);

      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
      setVerifyDisabled(true);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    try {
      const forgettPassEmail = JSON.parse(
        localStorage.getItem("passForgetEmail")
      );
      let userEmail;
      if (forgettPassEmail) {
        userEmail = forgettPassEmail;
      } else {
        userEmail = user.email;
      }
      const result = await resendOtpApi(userEmail);
      if (result.response) {
        const { status } = result.response;
        if (status === 400 || status === 500) {
          toast.error(result.response.data.message);
        }
      } else {
        toast.success(result.data.message);
        setTimer(60);
        setCanResend(false);
        setVerifyDisabled(false);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to resend OTP");
    }
  };

  useEffect(() => {
    const forgettPassEmail = JSON.parse(
      localStorage.getItem("passForgetEmail")
    );
    if (!forgettPassEmail) {
      if (user?.isVerified) {
        return navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <ChakraProvider>
      <AuthPageFrame variant="otp" showHeader={false}>
          <Text className="Otp-heading">Verify your email</Text>
          <p className="auth-subtitle">Enter the 4-digit code we sent to your email address.</p>
          <Center mb={"20px"}>
            <HStack spacing={"10px"}>
              <PinInput otp>
                {otp.map((digit, index) => (
                  <PinInputField
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="auth-otp-input"
                    width={{ base: "50px", md: "60px", lg: "70px" }}
                    height={{ base: "50px", md: "60px", lg: "70px" }}
                    bg={"white"}
                  />
                ))}
              </PinInput>
            </HStack>
          </Center>

          <Text className="auth-resend" textAlign="right">
            {canResend ? (
              <span
                onClick={handleResendOtp}
                className="auth-resend-action"
                style={{ cursor: "pointer" }}
              >
                Resend OTP
              </span>
            ) : (
              <p>
                <span className="auth-timer">
                  {timer}
                </span>
                seconds remain
              </p>
            )}
          </Text>

          <div className="auth-primary-action" onClick={handleVerify}>
            <OurButton
              isLoading={loading}
              page={"otp"}
              text={"VERIFY"}
              disabled={verifyDisabled || loading}
            />
          </div>
      </AuthPageFrame>
    </ChakraProvider>
  );
};

export default OtpPage;
