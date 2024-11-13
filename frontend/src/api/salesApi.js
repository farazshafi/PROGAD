import axios from "axios";

const API_URL = "http://localhost:5000/api/sales/";

export const getSalesReportApi = async (params) => {
  const adminToken = JSON.parse(localStorage.getItem("admin")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  };

  try {
    let url = `${API_URL}sales_report?type=${params.path}`;
    if (params.path === "custom" && params.startDate && params.endDate) {
      url += `&startDate=${params.startDate}&endDate=${params.endDate}`;
    }

    const data = await axios.get(url, config);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
