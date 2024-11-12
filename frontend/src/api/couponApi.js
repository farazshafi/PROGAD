import axios from "axios";

const API_URL = "http://localhost:5000/api/coupon";

export const createCouponApi = async (couponDetails) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.post(
      `${API_URL}/create_coupon`,
      couponDetails,
      config
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getAllCouponsApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(`${API_URL}/get_coupon`, config);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const deleteCouponApi = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.delete(`${API_URL}/delete_coupon/${id}`, config);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const editCouponApi = async (id, newData) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.patch(
      `${API_URL}/edit_coupon/${id}`,
      newData,
      config
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};


export const getAvailableCouponApi = async () => {
  try {
    const data = await axios.get(`${API_URL}/active_coupon`);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
