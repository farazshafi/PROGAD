import axios from "axios";

const API_URL = "http://localhost:5000/api/category";

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/get_categories`); //                                                                             3
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const onCreateCategory = async (obj) => {
  try {
    const { data } = await axios.post(`${API_URL}/create_category`,obj);       
    console.log("data", data)
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const onDeleteCategory = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/delete_category/${id}`);       
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

