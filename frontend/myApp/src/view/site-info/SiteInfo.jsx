import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import Table from "../../component/table/Table";
import { getData } from "../../API/getData";
import Modal from "../../component/modal/Modal";
import Input from "../../component/forms/Input";
import postData from "../../API/postData";
import { postDocumentData } from "../../API/postDocumentData";

const SiteInfo = () => {
  const [tableData, setTableData] = useState([]);
  const [fileInput, setFileInput] = useState();
  const [addDataModalVisible, setAddDataModalVisible] = useState(false);
  const [addData, setAddData] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);
  useEffect(() => {
    getData("utility/admin/site-info/").then((data) => {
      setTableData(data);
    });
    if (shouldSubmit) {
      postData("utility/admin/site-info/", addData).then((res) => {
        console.log(res);
      });

      setAddDataModalVisible(false);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, addData]);

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
      setAddData((prev) => ({
        ...prev,
        logo: docUpload.data.id,
      }));
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
          + Add New
        </button>
      </div>
      <div>
        <Table columns={siteInfoColumns} dataSource={tableData} />
      </div>
      {/* add data modal */}
      <Modal
        title="Add Site Info"
        content={
          <div className="row">
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Site Name"
                onChange={(value) => handleInputChange("site_name", value)}
              />
              <Input
                type="text"
                placeholder="Website URL"
                onChange={(value) => handleInputChange("website_url", value)}
              />
              <Input
                type="text"
                placeholder="Email"
                onChange={(value) => handleInputChange("email", value)}
              />
              <Input
                type="text"
                placeholder="Phone"
                onChange={(value) => handleInputChange("phone", value)}
              />
              <Input
                type="text"
                placeholder="Address"
                onChange={(value) => handleInputChange("address", value)}
              />
              <Input
                type="text"
                placeholder="Description"
                onChange={(value) => handleInputChange("short_desc", value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Facebook"
                onChange={(value) => handleInputChange("facebook", value)}
              />
              <Input
                type="text"
                placeholder="Twitter"
                onChange={(value) => handleInputChange("twitter", value)}
              />
              <Input
                type="text"
                placeholder="Linkedin"
                onChange={(value) => handleInputChange("linkedin", value)}
              />
              <Input
                type="text"
                placeholder="Instagram"
                onChange={(value) => handleInputChange("instagram", value)}
              />
              <Input
                type="text"
                placeholder="Youtube"
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
  { title: "ID", key: "id" },
  { title: "Site Name", key: "site_name" },
  { title: "Website URL", key: "website_url" },
  { title: "Email", key: "email" },
  { title: "Phone", key: "phone" },
  { title: "Address", key: "address" },
  { title: "Description", key: "short_desc" },
  { title: "Facebook", key: "facebook" },
  { title: "Twitter", key: "twitter" },
  { title: "Linkedin", key: "linkedin" },
  { title: "Instagram", key: "instagram" },
  { title: "Youtube", key: "youtube" },
  { title: "Logo", key: "logo" },
];
