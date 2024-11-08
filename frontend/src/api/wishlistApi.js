import axios from "axios";

const API_URL = "http://localhost:5000/api/wishlist";

export const createWishlistApi = async (wishlist) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.post(
      `${API_URL}/create_wishlist`,
      wishlist,
      config
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getUserWishlistApi = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${API_URL}/get_wishlist/${userId}`,
      config
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const deleteWishlistApi = async (dataObj) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: dataObj,
    };

    const response = await axios.delete(`${API_URL}/delete_product`, config);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
