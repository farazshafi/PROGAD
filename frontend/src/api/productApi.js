import axios from "axios";
import { toast } from "react-toastify";

// production
const API_URL = `${process.env.REACT_APP_API_URL}/product`;

export const createProductApi = async (productDetails) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `${API_URL}/create_product`,
      productDetails,
      config
    );
    return data;
  } catch (e) {
    console.log("Error:", e);
    return e;
  }
};

export const getAllProductsApi = async (page) => {
  try {
    const data = await axios.get(
      `${API_URL}/get_products?page=${page}&limit=${10}`
    );
    return data;
  } catch (err) {
    console.error(
      "Error fetching products:",
      err.response?.data || err.message
    );
    if (err.response && err.response.data) {
      toast.error(err.response.data.message);
    }
    return null;
  }
};

export const handlePublicChangeApi = async (id, isPublished) => {
  try {
    const data = await axios.patch(`${API_URL}/handle_public_change/${id}`, {
      isPublished,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const checkCartProductValidApi = async (cartItems) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.post(`${API_URL}/check_cart_products`, {cartItems} ,config);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getProductDetailsApi = async (id) => {
  try {
    const data = await axios.get(`${API_URL}/product_details/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateProductApi = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/update_product/${id}`, data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getRelatedProductApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/related_product/${id}`);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllPublicProductsForAdminApi = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/public_products`, config);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getFilteredProductsApi = async (filters) => {
  try {
    const { categories, priceRange, brands, sort } = filters;
    const params = new URLSearchParams();

    if (categories.length > 0) {
      params.append("categories", categories.join(","));
    }
    if (brands.length > 0) {
      params.append("brands", brands.join(","));
    }
    if (priceRange) {
      params.append("minPrice", priceRange.min);
      params.append("maxPrice", priceRange.max);
    }

    const response = await axios.get(
      `${API_URL}/filter_products?${params.toString()}&sortBy=${sort}`
    );

    return response.data;
  } catch (err) {
    console.error("Error fetching filtered products:", err);
    return err;
  }
};

export const getTopSellingProductApi = async (limit) => {
  try {
    
    const response = await axios.get(`${API_URL}/best_selling?limit=${limit}`);
    return response?.data;
  } catch (err) {
    console.error("Error fetching filtered products:", err);
    if (err.response) {
      toast.error(err.response.data.message);
    }
  }
};
