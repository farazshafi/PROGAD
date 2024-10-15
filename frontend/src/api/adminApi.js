import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/get_users`);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const blockUnblockUser = async (id, isBlocked) => {
  try {
    const { data } = await axios.patch(`${API_URL}/block_unblock_user/${id}`, {
      isBlocked,
    });
    return data.user;
  } catch (e) {
    console.error("Error in block/unblock API:", e);
    return null;
  }
};
