import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import Table from "../../component/table/Table";
import { getData } from "../../API/getData";
import Input from "../../component/forms/Input";
import DropSelect from "../../component/Dropdown/DropSelect";
import { postDocumentData } from "../../API/postDocumentData";
import postData from "../../API/postData";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../component/modal/Modal";
import deleteData from "../../API/deleteData";
import putData from "../../API/putData";

const PaymentMethod = () => {
  const [offerPartnerData, setOfferPartnerData] = useState([]);
  const [serverPartnerData, setServerPartnerData] = useState([]);
  const [thirdData, setThirdData] = useState([]);
  const [paymentData, setPaymentData] = useState({
    name: "",
    image: null,
    type: null,
    is_active: null,
  });
  const [fileInput, setFileInput] = useState();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [editSubmit, setEditSubmit] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);

  const actionColumn = {
    title: "Actions",
    key: "actions",
    render: (data) => (
      <div className="d-flex">
        <button
          className="bg-white p-1 border-0 me-3"
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
  const finalColumn = [...paymentColumn, actionColumn];

  const fetchData = async () => {
    try {
      const data = await getData("payment-method/admin/payment-method/");

      setOfferPartnerData(data.filter((item) => item.type === 0));
      setServerPartnerData(data.filter((item) => item.type === 1));
      setThirdData(data.filter((item) => item.type === 2));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (editSubmit) {
      putData(`payment-method/admin/payment-method/${selectedEditItem.id}/`, {
        name: selectedEditItem.name,
        image: selectedEditItem.image,
        type: selectedEditItem.type,
        is_active: selectedEditItem.is_active,
      }).then((res) => {
        console.log("edit response:", res);
        fetchData();
      });

      setEditDataModal(false);
      setSelectedEditItem(null);
      setEditSubmit(false);
    }

    if (shouldSubmit) {
      postData("payment-method/admin/payment-method/", paymentData).then(
        (response) => {
          console.log("payment data upload response", response);
        }
      );
      setShouldSubmit(false);
      setPaymentData({
        name: "",
        image: null,
        type: null,
        is_active: null,
      });
      fetchData();
      setFileInput();
    }
    fetchData();
  }, [shouldSubmit, paymentData, selectedEditItem, editSubmit]);

  const handleInputChange = (name, value) => {
    if (name === "type" || name === "image") {
      value = value ? parseInt(value, 10) : 0;
    } else if (name === "is_active") {
      value = value === "true";
    }
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      setPaymentData((prev) => ({
        ...prev,
        image: docUpload.data.id,
        type: 0,
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
      setPaymentData((prev) => ({
        ...prev,
        image: docUpload.data.id,
        type: 1,
      }));
      setShouldSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleThirdButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("document", fileInput);
    formData.append("doc_type", 0);

    try {
      const docUpload = await postDocumentData(
        "auth/documents/upload/",
        formData
      );
      setPaymentData((prev) => ({
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
      const response = await deleteData(
        `payment-method/admin/payment-method/${itemID}/`
      );
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

  // editing section
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
        <Breadcrumb directory1="Payment Method" />
      </div>
      <div className="payment-forms mb-5">
        <form className="row flex-wrap">
          <div className="col-md-6">
            <Input
              type="text"
              placeholder="Name"
              value={paymentData.name || ""}
              onChange={(value) => handleInputChange("name", value)}
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
            <DropSelect
              options={statusData}
              label="Status"
              value={
                paymentData.is_active === false
                  ? false
                  : paymentData.is_active === true
                  ? true
                  : ""
              }
              onChange={(value) => handleInputChange("is_active", value)}
            />
          </div>
        </form>
      </div>

      <div className="payment-table-wrapper">
        <h4 className="mb-3">Withdraw Cash Table</h4>
        <div className="row">
          <div className="col-md-10">
            <Table columns={finalColumn} dataSource={offerPartnerData} />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-dark w-100 fs-4"
              onClick={handleFirstButtonClick}
            >
              Withdraw Cash
            </button>
          </div>
        </div>
      </div>
      <div className="payment-table-wrapper">
        <h4 className="mb-3">Withdraw Card Table</h4>
        <div className="row">
          <div className="col-md-10">
            <Table columns={finalColumn} dataSource={serverPartnerData} />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-dark w-100 fs-4"
              onClick={handleSecondButtonClick}
            >
              Withdraw Card
            </button>
          </div>
        </div>
      </div>
      <div className="payment-table-wrapper">
        <h4 className="mb-3">Withdraw Gift Card Table</h4>
        <div className="row">
          <div className="col-md-10">
            <Table columns={finalColumn} dataSource={thirdData} />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-dark w-100 fs-4"
              onClick={handleThirdButtonClick}
            >
              Withdraw Gift Card
            </button>
          </div>
        </div>
      </div>
      {/* delete data modal */}
      <Modal
        title="Delete Payment"
        content={
          <div>
            <p>
              Are sure you want to delete{" "}
              {selectedDeleteItem ? (
                <span className="fs-5 fw-bold">
                  {selectedDeleteItem.name} ?
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

      {/* edit modal */}
      <Modal
        title="Edit Payment"
        content={
          <div>
            <div className="col-12">
              <Input
                type="text"
                placeholder="Name"
                value={selectedEditItem ? selectedEditItem.name || "" : ""}
                onChange={(value) => handleEditInputChange("name", value)}
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
              <DropSelect
                options={statusData}
                label="Status"
                value={selectedEditItem ? selectedEditItem.is_active : ""}
                onChange={(value) => handleEditInputChange("is_active", value)}
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
          </div>
        }
        visible={editDataModal}
        onCancel={cancelEdit}
        onOk={editData}
      />
    </div>
  );
};

export default PaymentMethod;

export const paymentColumn = [
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
  { title: "Image", key: "image_url" },
  {
    title: "Type",
    key: "type",
    render: (data) => getTypeLabel(data.type),
  },
  { title: "Status", key: "is_active" },
];

export const getTypeLabel = (type) => {
  switch (type) {
    case 0:
      return "Withdraw Cash";
    case 1:
      return "Withdraw Card";
    case 2:
      return "Withdraw Gift Card";
    default:
      return "Unknown Type";
  }
};

export const paymentTypeData = [
  { title: "Withdraw Cash", value: 0 },
  { title: "Withdraw Card", value: 1 },
  { title: "Withdraw Gift Card", value: 2 },
];

export const statusData = [
  { title: "Select an item", value: "", disabled: true },
  { title: "True", value: true },
  { title: "False", value: false },
];
