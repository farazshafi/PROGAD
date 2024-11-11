import axios from "axios";

const API_URL = "http://localhost:5000/api/offer/";


export const createOfferApi = async (offerData) => {
  const adminToken = JSON.parse(localStorage.getItem("admin")).token || "";
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
  const adminToken = JSON.parse(localStorage.getItem("admin")).token || "";
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
  const adminToken = JSON.parse(localStorage.getItem("admin")).token || "";
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

export const editOfferApi = async (id, offerData) => {
  const adminToken = JSON.parse(localStorage.getItem("admin")).token || "";
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };
    const data = await axios.patch(
      `${API_URL}edit_offer/${id}`,
      offerData,
      config
    );
    return data;
  } catch (err) {
    return err;
  }
};

export const activeOfferApi = async () => {
  try {
    const data = await axios.get(`${API_URL}active_offer`);
    return data;
  } catch (err) {
    return err;
  }
};

export const offerProductsApi = async () => {
  try {
    const data = await axios.get(`${API_URL}offer_products`);
    return data;
  } catch (err) {
    return err;
  }
};
