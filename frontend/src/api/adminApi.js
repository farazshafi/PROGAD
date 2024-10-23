import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem("admin")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.get(`${API_URL}/get_users`, config);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const blockUnblockUser = async (id, isBlocked) => {
  const token = JSON.parse(localStorage.getItem("admin")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.patch(`${API_URL}/block_unblock_user/${id}`, {
      isBlocked,
    },config);
    return data.user;
  } catch (e) {
    console.error("Error in block/unblock API:", e);
    return null;
  }
};

export const deleteUserApi = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/delete_user/${id}`);
    return data;
  } catch (e) {
    console.error("Error in deleting user API:", e);
    return null;
  }
};

export const getAllProductsApi = async () => {
  const token = JSON.parse(localStorage.getItem("admin")).token;
  console.log("token: " + token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${API_URL}/all_products`,config);
    return response;
  } catch (e) {
    console.error("Error in deleting user API:", e);
    return e;
  }
};

export const adminLoginApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/admin_login`, data);
    return response;
  } catch (e) {
    console.error("Error in deleting user API:", e);
    return e;
  }
};
