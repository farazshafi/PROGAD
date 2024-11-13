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


export const downloadSalesReportApi = async (params) => {
  const adminToken = JSON.parse(localStorage.getItem("admin")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
    responseType: "blob",
  };

  try {
    let url = `${API_URL}download_sales_report?type=${params.path}&format=${params.format}`;
    
    if (params.path === "custom" && params.startDate && params.endDate) {
      url += `&startDate=${params.startDate}&endDate=${params.endDate}`;
    }

    const response = await axios.get(url, config);
    
    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `sales_report.${params.format}`;
    link.click();

    return response;
  } catch (err) {
    console.log("Error downloading report:", err);
    return err
  }
};