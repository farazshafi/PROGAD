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
