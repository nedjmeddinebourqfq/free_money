import React, {useState, useEffect, useCallback} from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import Table from "../../component/table/Table";
import Modal from "../../component/modal/Modal";
import Input from "../../component/forms/Input";
import postData from "../../API/postData";
import {postDocumentData} from "../../API/postDocumentData";
import axiosInstance from "../../API/AxiosInstance";

const SiteInfo = () => {
  const [tableData, setTableData] = useState([]);
  const [fileInput, setFileInput] = useState();
  const [addDataModalVisible, setAddDataModalVisible] = useState(false);
  const [addData, setAddData] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const token = `Token ${localStorage.getItem("token")}`;

  const postSiteInfo = useCallback(async () => {
    try {
      const response = await postData("utility/admin/site-info/", addData);
      console.log(response);
    } catch (error) {
      setErrMsg(
        error.response?.data?.errors?.email?.[0] ||
          error.response?.data?.errors?.phone?.[0] ||
          error.response?.data?.errors?.address?.[0] ||
          error.response?.data?.message
      );
    }
  }, [addData]);
  useEffect(() => {
    axiosInstance
      .get("utility/admin/site-info/", {
        headers: {Authorization: token},
      })
      .then((res) => {
        setTableData([res.data.data]);
      });
    if (shouldSubmit) {
      postSiteInfo();

      setAddDataModalVisible(false);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, addData, token, postSiteInfo]);

  //   adding data section

  const handleInputChange = (name, value) => {
    if (name === "logo") {
      value = value ? parseInt(value, 10) : 0;
    }
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addSiteInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", fileInput);
    formData.append("doc_type", 0);

    try {
      const docUpload = await postDocumentData(
        "auth/documents/upload/",
        formData
      );
      if (docUpload.data && docUpload.data.id) {
        // If docUpload.data.id is found, update the logo
        setAddData((prev) => ({
          ...prev,
          logo: docUpload.data.id,
        }));
      } else {
        // If docUpload.data.id is not found, use the default value from tableData
        setAddData((prev) => ({
          ...prev,
          logo: tableData[0]?.logo || "",
        }));
      }
      setShouldSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="mb-5 d-flex align-items-center justify-content-between">
        <Breadcrumb directory1="Site Info" />
        <button
          className="btn btn-dark"
          onClick={() => setAddDataModalVisible(true)}
        >
          Update
        </button>
      </div>
      <div>
        <Table columns={siteInfoColumns} dataSource={tableData} />
      </div>
      {/* add data modal */}
      <Modal
        title="Update Site Info"
        content={
          <>
            {errMsg ? <p>{errMsg}</p> : ""}
            <div className="row">
              <div className="col-md-6">
                <Input
                  type="text"
                  placeholder="Site Name"
                  value={tableData[0]?.site_name || ""}
                  onChange={(value) => handleInputChange("site_name", value)}
                />
                <Input
                  type="text"
                  placeholder="Website URL"
                  value={tableData[0]?.website_url || ""}
                  onChange={(value) => handleInputChange("website_url", value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={tableData[0]?.email || ""}
                  onChange={(value) => handleInputChange("email", value)}
                />
                <Input
                  type="text"
                  placeholder="Phone"
                  value={tableData[0]?.phone || ""}
                  onChange={(value) => handleInputChange("phone", value)}
                />
                <Input
                  type="text"
                  placeholder="Address"
                  value={tableData[0]?.address || ""}
                  onChange={(value) => handleInputChange("address", value)}
                />
                <Input
                  type="text"
                  placeholder="Description"
                  value={tableData[0]?.short_desc || ""}
                  onChange={(value) => handleInputChange("short_desc", value)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  type="text"
                  placeholder="Facebook"
                  value={tableData[0]?.facebook || ""}
                  onChange={(value) => handleInputChange("facebook", value)}
                />
                <Input
                  type="text"
                  placeholder="Twitter"
                  value={tableData[0]?.twitter || ""}
                  onChange={(value) => handleInputChange("twitter", value)}
                />
                <Input
                  type="text"
                  placeholder="Linkedin"
                  value={tableData[0]?.linkedin || ""}
                  onChange={(value) => handleInputChange("linkedin", value)}
                />
                <Input
                  type="text"
                  placeholder="Instagram"
                  value={tableData[0]?.instagram || ""}
                  onChange={(value) => handleInputChange("instagram", value)}
                />
                <Input
                  type="text"
                  placeholder="Youtube"
                  value={tableData[0]?.youtube || ""}
                  onChange={(value) => handleInputChange("youtube", value)}
                />
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFileInput(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </>
        }
        visible={addDataModalVisible}
        onCancel={() => setAddDataModalVisible(false)}
        onOk={addSiteInfo}
      />
    </div>
  );
};

export default SiteInfo;

export const siteInfoColumns = [
  {title: "ID", key: "id"},
  {title: "Site Name", key: "site_name"},
  {title: "Website URL", key: "website_url"},
  {title: "Email", key: "email"},
  {title: "Phone", key: "phone"},
  {title: "Address", key: "address"},
  {title: "Description", key: "short_desc"},
  {title: "Facebook", key: "facebook"},
  {title: "Twitter", key: "twitter"},
  {title: "Linkedin", key: "linkedin"},
  {title: "Instagram", key: "instagram"},
  {title: "Youtube", key: "youtube"},
  {title: "Logo", key: "logo"},
  {title: "Logo Url", key: "logo_url"},
];
