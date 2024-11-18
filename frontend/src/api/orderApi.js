import axios from "axios";
import { toast } from "react-toastify";

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

export const laterPaymentApi = async (OrderData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await axios.post(`${API_URL}later_payment`, OrderData, config);
    return result.data;
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message || "Error When Updating Order")
  }
};

export const handleRazorpayApi = async (totalPrice, user, shippingAddress) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data: razorpayOrder } = await axios.post(
      `${API_URL}create_razorpay_order`,
      { totalPrice },
      config
    );

    return new Promise((resolve, reject) => {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Progad",
        description: "Thank you for your purchase",
        order_id: razorpayOrder.orderId,
        handler: (response) => {
          resolve(response);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingAddress.phoneNumber,
        },
        theme: {
          color: "#FF7F11",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (error) => {
        reject(error);
        toast.error("Payment failed.");
      });
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Razorpay order creation failed");
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

export const cancelOrderApi = async (orderId,reason) => {
  try {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.patch(
      `${API_URL}cancel_order/${orderId}`,
      {reason},
      config
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const listOrdersApi = async (page) => {
  try {
    const token = JSON.parse(localStorage.getItem("admin")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(
      `${API_URL}list_orders?page=${page}&limit=${10}`,
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
