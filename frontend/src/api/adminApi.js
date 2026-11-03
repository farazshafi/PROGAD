import axios from "axios";
import adminAxios from "./adminInterceptor";

export const getAllUsers = async (page) => {
  try {
    const { data } = await adminAxios.get(
      `/get_users?page=${page}&limit=${10}`,
    );
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const blockUnblockUser = async (id, isBlocked) => {
  try {
    const { data } = await adminAxios.patch(`/block_unblock_user/${id}`, {
      isBlocked,
    });
    return data.user;
  } catch (e) {
    console.error("Error in block/unblock API:", e);
    return null;
  }
};

export const deleteUserApi = async (id) => {
  try {
    const { data } = await adminAxios.delete(`/delete_user/${id}`);
    return data;
  } catch (e) {
    console.error("Error in deleting user API:", e);
    return null;
  }
};

export const getAllProductsApi = async (page) => {
  try {
    const response = await adminAxios.get(
      `/all_products?page=${page}&limit=${5}`,
    );
    return response;
  } catch (e) {
    console.error("Error in deleting user API:", e);
    return e;
  }
};

export const adminLoginApi = async (data) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/admin/admin_login`, data);
};
