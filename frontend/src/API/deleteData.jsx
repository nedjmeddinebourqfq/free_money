import axiosInstance from "./AxiosInstance";

const deleteData = async (url) => {
  const token = `Token ${localStorage.getItem("token")}`;
  try {
    const response = await axiosInstance.delete(url, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.error("Error deleting data:", err);
    return [];
  }
};
export default deleteData;
