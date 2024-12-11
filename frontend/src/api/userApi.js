import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/user`;

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
  try {
    const data = await axios.post(`${API_URL}/resend_otp`, { email });
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

export const editUserApi = async (userDetails) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.patch(
      `${API_URL}/edit_user`,
      userDetails,
      config
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const updatePasswordApi = async (password) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.patch(
      `${API_URL}/update_password`,
      password,
      config
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const moniteringUserApi = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/monitering_user/${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const forgottPasswordApi = async (email) => {
  try {
    const data = await axios.get(`${API_URL}/forgott_password?email=${email}`);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const resetPasswordApi = async (password) => {
  try {
    const { data } = await axios.patch(
      `${API_URL}/reset_password`,
      password,    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};