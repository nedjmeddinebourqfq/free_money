import React, {useState, useEffect} from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import SearchInput from "../../component/forms/SearchInput";
import Table from "../../component/table/Table";
import {getData} from "../../API/getData";
import {FiEdit2} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import Modal from "../../component/modal/Modal";
import deleteData from "../../API/deleteData";
import DropSelect from "../../component/Dropdown/DropSelect";
import Input from "../../component/forms/Input";
import putData from "../../API/putData";

const User = () => {
  const [tableData, setTableData] = useState([]);
  const [editDataModal, setEditDataModal] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  useEffect(() => {
    getData("auth/admin/user/").then((data) => {
      setTableData(data);
    });
  }, []);

  console.log(tableData);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (e) => {
    const {value} = e.target;
    setSearchQuery(value);
  };

  const filteredData = tableData.filter((data) => {
    return data.username.toLowerCase().includes(searchQuery.toLowerCase());
    //   data.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   data.year.toString().includes(searchQuery)
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
  const finalColumn = [...userDataColumns, actionColumn];
  const handleEditInputChange = (name, value) => {
    if (name === "is_active" || name === "is_verified") {
      value = value === "true";
    }
    setSelectedEditItem({
      ...selectedEditItem,
      [name]: value,
    });
  };

  //   delete user
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
      const response = await deleteData(`auth/admin/user/${itemID}/`);
      console.log(response);

      setTableData((prevData) => prevData.filter((item) => item.id !== itemID));

      setDeleteDataModal(false);
      setSelectedDeleteItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  //   edit data

  const handleEditClick = (item) => {
    setSelectedEditItem(item);
    setEditDataModal(true);
  };
  const editMovie = async () => {
    if (!selectedEditItem) {
      return;
    }

    // console.log(selectedEditItem);

    const itemID = selectedEditItem.id;
    try {
      const response = await putData(`auth/admin/user/${itemID}/`, {
        username: selectedEditItem.username,
        email: selectedEditItem.email,
        mobile: selectedEditItem.mobile,
        is_verified: selectedEditItem.is_verified,
        is_active: selectedEditItem.is_active,
      });
      console.log(response);

      const updatedData = await getData("auth/admin/user/");
      setTableData(updatedData);

      setEditDataModal(false);
      setSelectedEditItem(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mb-5 d-flex align-items-center">
        <Breadcrumb directory1="Users" />
      </div>
      <div>
        <div className="filter-area d-flex align-items-center justify-content-end mb-3">
          <div className="search-box">
            <SearchInput
              onChange={handleSearchInputChange}
              placeHolder="Search"
            />
          </div>
        </div>
        <div>
          <Table columns={finalColumn} dataSource={filteredData} />
        </div>
      </div>
      {/* delete data modal */}
      <Modal
        title="Delete User"
        content={
          <div>
            <p>
              Are sure you want to delete{" "}
              {selectedDeleteItem ? (
                <span className="fs-5 fw-bold">
                  {selectedDeleteItem.username} ?
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
      {/* edit modla */}
      <Modal
        title="Edit User"
        content={
          <div className="row">
            <Input
              type="text"
              placeholder="User Name"
              value={selectedEditItem ? selectedEditItem.username || "" : ""}
              onChange={(value) => handleEditInputChange("username", value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={selectedEditItem ? selectedEditItem.email || "" : ""}
              onChange={(value) => handleEditInputChange("email", value)}
            />
            <Input
              type="text"
              placeholder="Mobile"
              value={selectedEditItem ? selectedEditItem.mobile || "" : ""}
              onChange={(value) => handleEditInputChange("mobile", value)}
            />
            <DropSelect
              label="Verification"
              options={verifyStatusData}
              value={selectedEditItem ? selectedEditItem.is_verified : ""}
              onChange={(value) => handleEditInputChange("is_verified", value)}
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
        onOk={editMovie}
      />
    </div>
  );
};

export default User;

export const userDataColumns = [
  {title: "ID", key: "id"},
  {title: "User Name", key: "username"},
  {title: "Verification", key: "is_verified"},
  {title: "Email", key: "email"},
  {title: "Mobile", key: "mobile"},
  {title: "Status", key: "is_active"},
];
export const statusData = [
  {title: "Select an item", value: "", disabled: true},
  {title: "True", value: true},
  {title: "False", value: false},
];

export const verifyStatusData = [
  {title: "Select an item", value: "", disabled: true},
  {title: "True", value: true},
  {title: "False", value: false},
];
