import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/user`

export const getWalletDetailsApi = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.get(`${API_URL}/wallet/${id}`,config);
    return data;
  } catch (e) {
    console.log({ e });
    return e;
  }
};
