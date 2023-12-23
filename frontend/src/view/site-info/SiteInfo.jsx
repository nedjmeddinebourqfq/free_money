import React, {useState, useEffect, useCallback} from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import Table from "../../component/table/Table";
import Modal from "../../component/modal/Modal";
import Input from "../../component/forms/Input";
import postData from "../../API/postData";
import {postDocumentData} from "../../API/postDocumentData";
import axiosInstance from "../../API/AxiosInstance";
import {getData} from "../../API/getData";
import putData from "../../API/putData";

const SiteInfo = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = `Token ${localStorage.getItem("token")}`;
  const [fileInput, setFileInput] = useState();

  useEffect(() => {
    axiosInstance
      .get("utility/admin/site-info/", {
        headers: {Authorization: token},
      })
      .then((res) => {
        setTableData([res.data.data]);
      });
  }, [loading]);

  //   edit data section
  const [editDataModal, setEditDataModal] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);

  const handleEditInputChange = (name, value) => {
    setSelectedEditItem({
      ...selectedEditItem,
      [name]: value,
    });
  };
  const handleEditClick = (item) => {
    setSelectedEditItem(item);
    setEditDataModal(true);
  };

  const editMovie = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Move state inside the function

    if (!selectedEditItem) {
      return;
    }

    setLoading(true);

    try {
      // Upload image file
      const formData = new FormData();
      formData.append("document", fileInput);
      formData.append("doc_type", 0);

      const docUpload = await postDocumentData(
        "auth/documents/upload/",
        formData
      );

      if (docUpload && docUpload.data && docUpload.data.id) {
        const response = await postData(`utility/admin/site-info/`, {
          site_name: selectedEditItem.site_name,
          website_url: selectedEditItem.website_url,
          email: selectedEditItem.email,
          phone: selectedEditItem.phone,
          address: selectedEditItem.address,
          short_desc: selectedEditItem.short_desc,
          facebook: selectedEditItem.facebook,
          twitter: selectedEditItem.twitter,
          linkedin: selectedEditItem.linkedin,
          instagram: selectedEditItem.instagram,
          youtube: selectedEditItem.youtube,
          logo: docUpload.data.id,
        });
        console.log(response);
        setEditDataModal(false);
        setSelectedEditItem(null);
      } else {
        const response = await postData(`utility/admin/site-info/`, {
          site_name: selectedEditItem.site_name,
          website_url: selectedEditItem.website_url,
          email: selectedEditItem.email,
          phone: selectedEditItem.phone,
          address: selectedEditItem.address,
          short_desc: selectedEditItem.short_desc,
          facebook: selectedEditItem.facebook,
          twitter: selectedEditItem.twitter,
          linkedin: selectedEditItem.linkedin,
          instagram: selectedEditItem.instagram,
          youtube: selectedEditItem.youtube,
          logo: selectedEditItem.logo,
        });
        console.log(response);
        setEditDataModal(false);
        setSelectedEditItem(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-5 d-flex align-items-center justify-content-between">
        <Breadcrumb directory1="Site Info" />
        <button
          className="btn btn-dark"
          onClick={() => handleEditClick(tableData[0])}
        >
          Update
        </button>
      </div>
      <div>
        <Table columns={siteInfoColumns} dataSource={tableData} />
      </div>
      {/* edit data modal */}
      <Modal
        title="Edit Movie"
        content={
          <div className="row">
            {loading ? (
              <p className="text-center">Processing request...</p>
            ) : (
              ""
            )}
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="Site Name"
                value={selectedEditItem ? selectedEditItem.site_name || "" : ""}
                onChange={(value) => handleEditInputChange("site_name", value)}
              />
              <Input
                type="text"
                placeholder="website_url"
                value={
                  selectedEditItem ? selectedEditItem.website_url || "" : ""
                }
                onChange={(value) =>
                  handleEditInputChange("website_url", value)
                }
              />
              <Input
                type="text"
                placeholder="email"
                value={selectedEditItem ? selectedEditItem.email || "" : ""}
                onChange={(value) => handleEditInputChange("email", value)}
              />
              <Input
                type="text"
                placeholder="phone"
                value={selectedEditItem ? selectedEditItem.phone || "" : ""}
                onChange={(value) => handleEditInputChange("phone", value)}
              />
              <Input
                type="text"
                placeholder="address"
                value={selectedEditItem ? selectedEditItem.address || "" : ""}
                onChange={(value) => handleEditInputChange("address", value)}
              />
              <Input
                type="text"
                placeholder="short_desc"
                value={
                  selectedEditItem ? selectedEditItem.short_desc || "" : ""
                }
                onChange={(value) => handleEditInputChange("short_desc", value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="text"
                placeholder="facebook"
                value={selectedEditItem ? selectedEditItem.facebook || "" : ""}
                onChange={(value) => handleEditInputChange("facebook", value)}
              />
              <Input
                type="text"
                placeholder="twitter"
                value={selectedEditItem ? selectedEditItem.twitter || "" : ""}
                onChange={(value) => handleEditInputChange("twitter", value)}
              />
              <Input
                type="text"
                placeholder="linkedin"
                value={selectedEditItem ? selectedEditItem.linkedin || "" : ""}
                onChange={(value) => handleEditInputChange("linkedin", value)}
              />
              <Input
                type="text"
                placeholder="instagram"
                value={selectedEditItem ? selectedEditItem.instagram || "" : ""}
                onChange={(value) => handleEditInputChange("instagram", value)}
              />
              <Input
                type="text"
                placeholder="youtube"
                value={selectedEditItem ? selectedEditItem.youtube || "" : ""}
                onChange={(value) => handleEditInputChange("youtube", value)}
              />
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFileInput(e.target.files[0])}
              />
            </div>
          </div>
        }
        visible={editDataModal}
        onCancel={() => setEditDataModal(false)}
        onOk={editMovie}
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
