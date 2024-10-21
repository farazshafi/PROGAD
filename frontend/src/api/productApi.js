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

export const getAllProductsApi = async () => {
  try{
    const data = await axios.get(`${API_URL}/get_products`)
    return data;
  }catch(err){
    console.log(err);
    return err;
  }
}