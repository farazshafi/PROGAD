import axios from "axios";

const API_URL = "http://localhost:5000/api/product";

export const createProductApi = async (productDetails) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };
    const { data } = await axios.post(`${API_URL}/create_product`, productDetails, config); 
    return data;
  } catch (e) {
    console.log("Error:", e);
    return null;
  }
};
