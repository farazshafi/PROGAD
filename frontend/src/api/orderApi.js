import axios from "axios";

const API_URL = `http://localhost:5000/api/order/`;

export const makeOrderApi = async (OrderData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.post(
      `${API_URL}make_order`,
      OrderData,
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
