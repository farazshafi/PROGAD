import axios from "axios";

const API_URL = `http://localhost:5000/api/address/`;

export const createAddressApi = async (id, addressDetails) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.post(
      `${API_URL}user/${id}/create_address`,
      addressDetails,
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllAddressesApi = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(`${API_URL}user/${id}/all_addresses`, config);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const editAddressApi = async (id, address) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.patch(
      `${API_URL}edit_address/${id}`,
      address,
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteAddressApi = async (id, userId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { userId },
    };
    console.log("test token ", config);
    const data = await axios.delete(`${API_URL}delete_address/${id}`, config);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
