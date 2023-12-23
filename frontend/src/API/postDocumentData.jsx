import axiosInstance from "./AxiosInstance";

export const postDocumentData = async (url, dataSet) => {
  const token = `Token ${localStorage.getItem("token")}`;
  try {
    const response = await axiosInstance.post(url, dataSet, {
      headers: {Authorization: token, "Content-Type": "multipart/form-data"},
    });
    return response.data;
  } catch (err) {
    console.error("Error uploading files:", err);
    return [];
  }
};
