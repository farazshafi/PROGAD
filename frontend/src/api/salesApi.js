import axios from "axios"

const API_URL = "http://localhost:5000/api/sales/"
const adminToken = JSON.parse(localStorage.getItem("admin")).token
const config = {
    headers:{
        Authorization: `Bearer ${adminToken}`
    }
}

export const getSalesReportApi = async (params) => {
    try{
        const data = await axios.get(`${API_URL}sales_report?reportType=${params.reportType}`,config)
        return data
    }catch(err){
        console.log(err)
        return err
    }
}