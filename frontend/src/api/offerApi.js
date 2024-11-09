import axios from "axios";

const API_URL = "http://localhost:5000/api/offer/";
const adminToken = JSON.parse(localStorage.getItem("admin")).token;

export const createOfferApi = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
    const data = await axios.post(`${API_URL}create_offer`, config);
    return data;
  } catch (err) {
    return err;
  }
};
