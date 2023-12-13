import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import Table from "../../component/table/Table";
import { getData } from "../../API/getData";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Input from "../../component/forms/Input";
import DropSelect from "../../component/Dropdown/DropSelect";
import { postDocumentData } from "../../API/postDocumentData";
import postData from "../../API/postData";
import Modal from "../../component/modal/Modal";
import deleteData from "../../API/deleteData";
import Textarea from "../../component/forms/Textarea";
import putData from "../../API/putData";

const MobilePartner = () => {
  const [offerPartnerData, setOfferPartnerData] = useState([]);
  const [serverPartnerData, setServerPartnerData] = useState([]);

  const [partnerData, setPartnerData] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    type: null,
    is_active: null,
  });
  const [fileInput, setFileInput] = useState();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [editSubmit, setEditSubmit] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);

  useEffect(() => {
    if (editSubmit) {
      putData(`offer/admin/partners/${selectedEditItem.id}/`, {
        title: selectedEditItem.title,
        image: selectedEditItem.image,
        price: selectedEditItem.price,
        type: selectedEditItem.type,
        is_active: selectedEditItem.is_active,
      }).then((res) => {
        console.log("edit response:", res);
      });
      fetchData();
      setEditDataModal(false);
      setSelectedEditItem(null);
      setEditSubmit(false);
    }
    if (shouldSubmit) {
      postData("offer/admin/partners/", partnerData).then((response) => {
        console.log("partner data upload response", response);
      });
      setShouldSubmit(false);
      setPartnerData({
        title: "",
        description: "",
        image: null,
        price: "",
        type: null,
        is_active: null,
      });
      fetchData();
      setFileInput();
    }
    fetchData();
  }, [shouldSubmit, partnerData, editSubmit, selectedEditItem]);

  const handleInputChange = (name, value) => {
    if (name === "type" || name === "image") {
      value = value ? parseInt(value, 10) : 0;
    } else if (name === "is_active") {
      value = value === "true";
    }
    setPartnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const data = await getData("offer/admin/partners/");

      setOfferPartnerData(data.filter((item) => item.type === 1));
      setServerPartnerData(data.filter((item) => item.type === 2));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = {
    title: "Actions",
    key: "actions",
    render: (data) => (
      <div className="d-flex">
        <button
          className="bg-white p-1 border-0 me-2"
          onClick={() => handleEditClick(data)}
        >
          <FiEdit2 className="text-dark" />
        </button>
        <button
          className="bg-danger p-1 border-0 ms-2"
          onClick={() => showDeleteModal(data)}
        >
          <AiOutlineDelete className="text-white" />
        </button>
      </div>
    ),
  };

  const finalColumn = [...mobilePartnerColumns, actionColumn];

  // adding data
  const handleFirstButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", fileInput);
    formData.append("doc_type", 0);

    try {
      const docUpload = await postDocumentData(
        "auth/documents/upload/",
        formData
      );
      setPartnerData((prev) => ({
        ...prev,
        image: docUpload.data.id,
        type: 1,
      }));
      setShouldSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSecondButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", fileInput);
    formData.append("doc_type", 0);

    try {
      const docUpload = await postDocumentData(
        "auth/documents/upload/",
        formData
      );
      setPartnerData((prev) => ({
        ...prev,
        image: docUpload.data.id,
        type: 2,
      }));
      setShouldSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };

  // delete section

  const [deleteDataModal, setDeleteDataModal] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

  const showDeleteModal = (item) => {
    setSelectedDeleteItem(item);
    setDeleteDataModal(true);
  };

  const cancelDelete = () => {
    setSelectedDeleteItem(null);
    setDeleteDataModal(false);
  };

  const deleteDataFunc = async () => {
    if (!selectedDeleteItem) {
      return;
    }

    const itemID = selectedDeleteItem.id;

    try {
      const response = await deleteData(`offer/admin/partners/${itemID}/`);
      console.log(response);

      setOfferPartnerData((prevData) =>
        prevData.filter((item) => item.id !== itemID)
      );
      setServerPartnerData((prevData) =>
        prevData.filter((item) => item.id !== itemID)
      );
      setDeleteDataModal(false);
      setSelectedDeleteItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  // edit section
  const [editDataModal, setEditDataModal] = useState(false);

  const handleEditInputChange = (name, value) => {
    if (name === "type" || name === "image") {
      value = value ? parseInt(value, 10) : 0;
    } else if (name === "is_active") {
      value = value === "true";
    }
    setSelectedEditItem({
      ...selectedEditItem,
      [name]: value,
    });
  };
  const cancelEdit = () => {
    setEditDataModal(false);
    setSelectedEditItem(null);
  };
  const handleEditClick = (item) => {
    setSelectedEditItem(item);
    setEditDataModal(true);
  };

  const editData = async () => {
    if (!selectedEditItem) {
      return;
    }

    if (fileInput) {
      const formData = new FormData();
      formData.append("document", fileInput);
      formData.append("doc_type", 0);

      try {
        const docUpload = await postDocumentData(
          "auth/documents/upload/",
          formData
        );
        setSelectedEditItem((prev) => ({
          ...prev,
          image: docUpload.data.id,
        }));
        setEditSubmit(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setEditSubmit(true);
    }
  };

  return (
    <div>
      <div className="mb-5 d-flex align-items-center">
        <Breadcrumb directory1="Admin partner" />
      </div>
      <div className="payment-forms mb-5">
        <form className="row flex-wrap">
          <div className="col-md-6">
            <Input
              type="text"
              placeholder="Title"
              value={partnerData.title || ""}
              onChange={(value) => handleInputChange("title", value)}
            />
          </div>
          <div className="col-md-6">
            <Input
              type="text"
              placeholder="Description"
              value={partnerData.description || ""}
              onChange={(value) => handleInputChange("description", value)}
            />
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                // value={fileInput ? fileInput || "" : ""}
                onChange={(e) => setFileInput(e.target.files[0])}
              />
            </div>
          </div>
          <div className="col-md-6">
            <Input
              type="text"
              placeholder="Price"
              value={partnerData.price || ""}
              onChange={(value) => handleInputChange("price", value)}
            />
          </div>
          <div className="col-md-6">
            <DropSelect
              options={statusData}
              label="Status"
              value={
                partnerData.is_active === false
                  ? false
                  : partnerData.is_active === true
                  ? true
                  : ""
              }
              onChange={(value) => handleInputChange("is_active", value)}
            />
          </div>
        </form>
      </div>
      <div className="payment-table-wrapper">
        <h4 className="mb-3">Offer Partner Table</h4>
        <div className="row">
          <div className="col-md-10">
            <Table columns={finalColumn} dataSource={offerPartnerData} />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-dark w-100 fs-4"
              onClick={handleFirstButtonClick}
            >
              Offer Partner
            </button>
          </div>
        </div>
      </div>
      <div className="payment-table-wrapper">
        <h4 className="mb-3">Server Partner Table</h4>
        <div className="row">
          <div className="col-md-10">
            <Table columns={finalColumn} dataSource={serverPartnerData} />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-dark w-100 fs-4"
              onClick={handleSecondButtonClick}
            >
              Server Partner
            </button>
          </div>
        </div>
      </div>
      {/* delete data modal */}
      <Modal
        title="Delete Partner"
        content={
          <div>
            <p>
              Are sure you want to delete{" "}
              {selectedDeleteItem ? (
                <span className="fs-5 fw-bold">
                  {selectedDeleteItem.title} ?
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        }
        visible={deleteDataModal}
        onCancel={cancelDelete}
        onOk={deleteDataFunc}
      />
      {/* edit data modal */}
      <Modal
        title="Edit Partner"
        content={
          <div>
            <div className="col-12">
              <Input
                type="text"
                placeholder="Title"
                value={selectedEditItem ? selectedEditItem.title || "" : ""}
                onChange={(value) => handleEditInputChange("title", value)}
              />
            </div>
            <div className="col-12">
              <div className="mb-3">
                {`selected image id: ${
                  selectedEditItem ? selectedEditItem.image : ""
                }`}
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFileInput(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-12">
              <Input
                type="text"
                placeholder="Price"
                value={selectedEditItem ? selectedEditItem.price || "" : ""}
                onChange={(value) => handleEditInputChange("price", value)}
              />
            </div>
            <div className="col-12">
              <DropSelect
                options={paymentTypeData}
                label="Type"
                value={selectedEditItem ? selectedEditItem.type : ""}
                onChange={(value) => handleEditInputChange("type", value)}
              />
            </div>
            <div className="col-12">
              <Textarea
                placeholder="Description"
                value={
                  selectedEditItem ? selectedEditItem.description || "" : ""
                }
                onChange={(value) =>
                  handleEditInputChange("description", value)
                }
              />
            </div>
          </div>
        }
        visible={editDataModal}
        onCancel={cancelEdit}
        onOk={editData}
      />
    </div>
  );
};

export default MobilePartner;

export const mobilePartnerColumns = [
  { title: "ID", key: "id" },
  { title: "Title", key: "title" },
  { title: "Image", key: "image_url" },
  { title: "Description", key: "description" },
  { title: "Price", key: "price" },
  {
    title: "Type",
    key: "type",
    render: (data) => getTypeLabel(data.type),
  },
];

export const getTypeLabel = (type) => {
  switch (type) {
    case 0:
      return "New Offer";
    case 1:
      return "Offer Partner";
    case 2:
      return "Server Partner";
    default:
      return "Unknown Type";
  }
};

export const paymentTypeData = [
  { title: "Offer Partner", value: 1 },
  { title: "Server Partner", value: 2 },
];

export const statusData = [
  { title: "Select an item", value: "", disabled: true },
  { title: "True", value: true },
  { title: "False", value: false },
];
