import axios from "axios";

const adminAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/admin`,
});

adminAxios.interceptors.request.use((config) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (admin?.token) {
    config.headers.Authorization = `Bearer ${admin.token}`;
  }

  return config;
});

adminAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin");
      window.location.href = "/admin_login";
    }
    return Promise.reject(err);
  }
);

export default adminAxios;