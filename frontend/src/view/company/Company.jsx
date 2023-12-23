import React, {useEffect, useState} from "react";
import {getData} from "../../API/getData";
import {FiEdit2} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import SearchInput from "../../component/forms/SearchInput";
import Table from "../../component/table/Table";
import Modal from "../../component/modal/Modal";
import putData from "../../API/putData";
import deleteData from "../../API/deleteData";
import postData from "../../API/postData";
import Input from "../../component/forms/Input";
import DropSelect from "../../component/Dropdown/DropSelect";

const Company = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editDataModal, setEditDataModal] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);

  useEffect(() => {
    getData("offer/admin/company/").then((data) => {
      setTableData(data);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (e) => {
    const {value} = e.target;
    setSearchQuery(value);
  };

  const filteredData = tableData.filter((data) => {
    return data.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const actionColumn = {
    title: "Actions",
    key: "actions",
    render: (data) => (
      <>
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
      </>
    ),
  };

  const finalDataColumns = [...companyDataColumns, actionColumn];

  //   adding data section
  const [addDataModalVisible, setAddDataModalVisible] = useState(false);
  const [addData, setAddData] = useState({});

  const handleInputChange = (name, value) => {
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addCompany = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postData("offer/admin/company/", addData);

      const updatedData = await getData("offer/admin/company/");
      setTableData(updatedData);
      setLoading(false);
      setAddDataModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   deleting data section
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
    setLoading(true);
    const itemID = selectedDeleteItem.id;

    try {
      const response = await deleteData(`offer/admin/company/${itemID}/`);
      console.log(response);

      setTableData((prevData) => prevData.filter((item) => item.id !== itemID));
      setLoading(false);
      setDeleteDataModal(false);
      setSelectedDeleteItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  //   edit data
  const finalColumn = [...companyDataColumns, actionColumn];
  const handleEditInputChange = (name, value) => {
    if (name === "is_active" || name === "is_verified") {
      value = value === "true";
    }
    setSelectedEditItem({
      ...selectedEditItem,
      [name]: value,
    });
  };

  const handleEditClick = (item) => {
    setSelectedEditItem(item);
    setEditDataModal(true);
  };
  const editCompany = async () => {
    if (!selectedEditItem) {
      return;
    }

    // console.log(selectedEditItem);

    const itemID = selectedEditItem.id;
    try {
      const response = await putData(`offer/admin/company/${itemID}/`, {
        name: selectedEditItem.name,
        website: selectedEditItem.website,
        api_key: selectedEditItem.api_key,
        is_verified: selectedEditItem.is_verified,
        is_active: selectedEditItem.is_active,
      });
      console.log(response);

      const updatedData = await getData("offer/admin/company/");
      setTableData(updatedData);
      setEditDataModal(false);
      setSelectedEditItem(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mb-5 d-flex align-items-center justify-content-between">
        <Breadcrumb directory1="Company" />
        <button
          className="btn btn-dark"
          onClick={() => setAddDataModalVisible(true)}
        >
          + Add New
        </button>
      </div>
      <div>
        <div className="filter-area d-flex align-items-center justify-content-end mb-3">
          {/* <div className="filter-box">
            <DropSelect label="FIlter data" options={filterOptions} />
          </div> */}
          <div className="search-box">
            <SearchInput
              onChange={handleSearchInputChange}
              placeHolder="Search"
            />
          </div>
        </div>
        <div>
          <Table columns={finalDataColumns} dataSource={filteredData} />
        </div>
      </div>
      {/* Add data modal */}
      <Modal
        title="Add Company"
        content={
          <div className="row">
            {loading ? (
              <p className="text-center">Processing request...</p>
            ) : (
              ""
            )}
            <Input
              type="text"
              placeholder="Name"
              onChange={(value) => handleInputChange("name", value)}
            />
            <Input
              type="text"
              placeholder="Website"
              onChange={(value) => handleInputChange("website", value)}
            />
            <Input
              type="text"
              placeholder="Api key"
              onChange={(value) => handleInputChange("api_key", value)}
            />
            <DropSelect
              label="Status"
              options={statusData}
              value={selectedEditItem ? selectedEditItem.is_active : ""}
              onChange={(value) => handleInputChange("is_active", value)}
            />
          </div>
        }
        visible={addDataModalVisible}
        onCancel={() => setAddDataModalVisible(false)}
        onOk={addCompany}
      />

      {/* delete data modal */}
      <Modal
        title="Delete Company"
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
            {loading ? (
              <p className="text-center">Processing request...</p>
            ) : (
              ""
            )}
          </div>
        }
        visible={deleteDataModal}
        onCancel={cancelDelete}
        onOk={deleteDataFunc}
      />

      {/* edit data modal */}
      <Modal
        title="Edit User"
        content={
          <div className="row">
            <Input
              type="text"
              placeholder="Name"
              value={selectedEditItem ? selectedEditItem.name || "" : ""}
              onChange={(value) => handleEditInputChange("name", value)}
            />
            <Input
              type="text"
              placeholder="Website"
              value={selectedEditItem ? selectedEditItem.website || "" : ""}
              onChange={(value) => handleEditInputChange("website", value)}
            />
            <Input
              type="text"
              placeholder="api_key"
              value={selectedEditItem ? selectedEditItem.api_key || "" : ""}
              onChange={(value) => handleEditInputChange("api_key", value)}
            />

            <DropSelect
              label="Status"
              options={statusData}
              value={selectedEditItem ? selectedEditItem.is_active : ""}
              onChange={(value) => handleEditInputChange("is_active", value)}
            />
          </div>
        }
        visible={editDataModal}
        onCancel={() => setEditDataModal(false)}
        onOk={editCompany}
      />
    </div>
  );
};

export default Company;

export const companyDataColumns = [
  {title: "ID", key: "id"},
  {title: "Name", key: "name"},
  {title: "Website", key: "website"},
  {title: "Api key", key: "api_key"},
  {title: "Created", key: "created_at"},
  {title: "Update", key: "updated_at"},
  {title: "Status", key: "is_active"},
];

export const statusData = [
  {title: "Select an item", value: "", disabled: true},
  {title: "True", value: true},
  {title: "False", value: false},
];
