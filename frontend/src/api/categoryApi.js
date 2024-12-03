import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${process.env.REACT_APP_API_URL}/category`

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
    const { data } = await axios.post(`${API_URL}/create_category`, obj);
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

export const handlePublishCategory = async (id, isPublished) => {
  try {
    const { data } = await axios.patch(`${API_URL}//publish_unpublish/${id}`, {
      isPublished,
    });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const updateCategoryApi = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/edit_category/${id}`, data);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getPublishedCategoriesApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_published_categories`);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getTopSellingCategoriesApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/top_selling`, config);
    return response.data;
  } catch (e) {
    toast.error(
      e.response.data.message || "server Error! cannot get top categories"
    );
    console.log(e);
    return null;
  }
};
