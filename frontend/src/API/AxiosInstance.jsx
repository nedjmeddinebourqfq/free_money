import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://test.privateyebd.com/api/v1/", // API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
