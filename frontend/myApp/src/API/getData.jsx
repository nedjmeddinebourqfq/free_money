import axiosInstance from "./AxiosInstance";

export const getData = async (url, params = {}) => {
  const token = `Token ${localStorage.getItem("token")}`;
  try {
    const response = await axiosInstance.get(url, {
      headers: { Authorization: token },
      params: params,
    });
    return response.data.data.results;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};
