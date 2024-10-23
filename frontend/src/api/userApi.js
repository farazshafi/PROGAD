import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/user";

export const userRegisterApi = async (userDetails) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, userDetails);
    return data;
  } catch (e) {
    console.log({ e });
    return e;
  }
};

export const verifyOtpApi = async (otp) => {
  try {
    const { data } = await axios.post(`${API_URL}/verify_otp`, otp);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const resendOtpApi = async (email) => {
  const token = JSON.parse(localStorage.getItem("admin")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const data = await axios.post(`${API_URL}/resend_otp`, { email }, config);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const loginApi = async (userDetails) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, userDetails);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
