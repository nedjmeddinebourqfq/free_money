import axiosInstance from "./AxiosInstance";

const postData = async (url, dataSet) => {
  const token = `Token ${localStorage.getItem("token")}`;
  try {
    const response = await axiosInstance.post(url, dataSet, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.error("Error posting data:", err);
    return [];
  }
};
export default postData;
