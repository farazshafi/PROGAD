import axios from "axios";

const API_URL = "http://localhost:5000/api/offer/";
const adminToken = JSON.parse(localStorage.getItem("admin")).token;

export const createOfferApi = async (offerData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
    const data = await axios.post(`${API_URL}create_offer`, offerData, config);
    return data;
  } catch (err) {
    return err;
  }
};

export const getAllOffersAdminApi = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
    const data = await axios.get(`${API_URL}get_offers_admin`, config);
    return data;
  } catch (err) {
    return err;
  }
};

export const deleteOfferApi = async (id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
    const data = await axios.delete(`${API_URL}delete_offer/${id}`, config);
    return data;
  } catch (err) {
    return err;
  }
};
