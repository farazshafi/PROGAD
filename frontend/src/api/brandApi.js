import axios from "axios";

const API_URL = "http://localhost:5000/api/brand";

export const createBrandApi = async (brandDetails) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.post(
      `${API_URL}/create_brand`,
      brandDetails,
      config
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getAllBrandsApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(`${API_URL}/list_brands`, config);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const editBrandApi = async (id, updates) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.patch(`${API_URL}/edit_brand/${id}`, updates, config);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const updateBrandStatusApi = async (id, updates) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.patch(`${API_URL}/update_status/${id}`, updates, config);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
