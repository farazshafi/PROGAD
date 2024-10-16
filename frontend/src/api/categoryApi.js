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

