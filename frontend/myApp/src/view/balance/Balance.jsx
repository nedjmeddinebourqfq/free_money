import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import SearchInput from "../../component/forms/SearchInput";
import Table from "../../component/table/Table";
import { getData } from "../../API/getData";
import { FiEdit2 } from "react-icons/fi";
// import putData from "../../API/putData";
import Modal from "../../component/modal/Modal";
import Input from "../../component/forms/Input";
// import DropSelect from "../../component/Dropdown/DropSelect"
import axiosInstance from "../../API/AxiosInstance";

const Balance = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getData("balance/admin/balance/");
      setTableData(response);
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchUser = async () => {
  //   try {
  //     const response = await getData("auth/admin/user/");
  //     setUserData(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    fetchData();
  }, []);

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
      </>
    ),
  };
  const finalColumn = [...balanceColumn, actionColumn];

  //   edit data section
  const [editDataModal, setEditDataModal] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);

  const handleEditInputChange = (name, value) => {
    if (name === "user" || name === "points") {
      value = value ? parseInt(value, 10) : 0;
    }
    setSelectedEditItem({
      ...selectedEditItem,
      [name]: value,
    });
  };
  const token = `Token ${localStorage.getItem("token")}`;
  const handleEditClick = (item) => {
    setSelectedEditItem(item);
    setEditDataModal(true);
  };

  const editMovie = async () => {
    if (!selectedEditItem) {
      return;
    }
    setLoading(true);
    const itemID = selectedEditItem.id;
    try {
      const response = await axiosInstance.patch(
        `balance/admin/balance/${itemID}/`,
        {
          points: selectedEditItem.points,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(response);

      const updatedData = await getData("balance/admin/balance/");
      setTableData(updatedData);
      setLoading(false);
      setEditDataModal(false);
      setSelectedEditItem(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const filteredData = tableData.filter((data) => {
    return (
      data.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.points.toString().includes(searchQuery)
    );
  });
  return (
    <div>
      <div className="mb-5 d-flex align-items-center">
        <Breadcrumb directory1="balance" />
      </div>
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
      {/* edit modal */}
      <Modal
        title="Edit Movie"
        content={
          <div className="row">
            {loading ? (
              <p className="text-center">Processing request...</p>
            ) : (
              ""
            )}

            <Input
              type="text"
              placeholder="Points"
              value={selectedEditItem ? selectedEditItem.points || "" : ""}
              onChange={(value) => handleEditInputChange("points", value)}
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

export default Balance;

const balanceColumn = [
  { title: "ID", key: "id" },
  { title: "User", key: "user" },
  { title: "Points", key: "points" },
  { title: "User Name", key: "username" },
];
