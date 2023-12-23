import axiosInstance from "./AxiosInstance";

const patchData = async (url, dataSet) => {
  const token = `Token ${localStorage.getItem("token")}`;
  try {
    const response = await axiosInstance.patch(url, dataSet, {
      headers: {Authorization: token},
    });
    return response.data;
  } catch (err) {
    console.error("Error updating data:", err);
    return [];
  }
};
export default patchData;
