import axios from "axios";

const API_URL = `http://localhost:5000/api/order/`;

export const makeOrderApi = async (OrderData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.post(`${API_URL}make_order`, OrderData, config);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllOrdersApi = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(
      `${API_URL}get_all_orders/userId/${userId}`,
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getOrderDetailsApi = async (orderId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(
      `${API_URL}get_order_details/${orderId}`,
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const cancelOrderApi = async (orderId) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.patch(
      `${API_URL}cancel_order/${orderId}`,
      null,
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const listOrdersApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(
      `${API_URL}list_orders`,
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateOrderStatusApi = async (id,status) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.patch(
      `${API_URL}update_status/${id}`,
      {status},
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
