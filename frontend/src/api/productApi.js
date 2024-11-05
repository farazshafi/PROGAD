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


export const handlePublicChangeApi = async (id,isPublished) => {
  try{
    const data = await axios.patch(`${API_URL}/handle_public_change/${id}`,{isPublished})
    return data;
  }catch(err){
    console.log(err);
    return err;
  }
}


export const getProductDetailsApi = async (id) => {
  try{
    const data = await axios.get(`${API_URL}/product_details/${id}`)
    return data;
  }catch(err){
    console.log(err);
    return err;
  }
}


export const updateProductApi = async (id,data) => {
  try{
    const response = await axios.put(`${API_URL}/update_product/${id}`,data)
    return response;
  }catch(err){
    console.log(err);
    return err;
  }
}


export const getSortedProductApi = async (sort) => {
  try{
    const response = await axios.get(`${API_URL}/sort_product?sortBy=${sort}`)
    return response;
  }catch(err){
    console.log(err);
    return err;
  }
}



