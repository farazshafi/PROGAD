import axios from "axios";

const API_URL = "http://localhost:5000/api/";

export const getAllUsers = async () => {
  try {
    const {data} = await axios.get(`${API_URL}admin/get_users`);
    return data
  } catch (e) {
    console.log(e);
    return null;
  }
};
