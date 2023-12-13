import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import Table from "../../component/table/Table";
import { getData } from "../../API/getData";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../component/modal/Modal";
import Input from "../../component/forms/Input";
import postData from "../../API/postData";
import deleteData from "../../API/deleteData";
import putData from "../../API/putData";
// import DropSelect from "../../component/Dropdown/DropSelect";
import SearchInput from "../../component/forms/SearchInput";

const Movie = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData("movie/admin/movie/").then((data) => {
      setTableData(data);
    });
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
        <button
          className="bg-danger p-1 border-0 ms-2"
          onClick={() => showDeleteModal(data)}
        >
          <AiOutlineDelete className="text-white" />
        </button>
      </>
    ),
  };

  const finalDataColumns = [...movieDataColumns, actionColumn];

  //   adding data section
  const [addDataModalVisible, setAddDataModalVisible] = useState(false);
  const [addData, setAddData] = useState({});

  const handleInputChange = (name, value) => {
    if (name === "year") {
      value = value ? parseInt(value, 10) : 0;
    }
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addMovie = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postData("movie/admin/movie/", addData);
      console.log(response);

      const updatedData = await getData("movie/admin/movie/");
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
      const response = await deleteData(`movie/admin/movie/${itemID}/`);
      console.log(response);

      setTableData((prevData) => prevData.filter((item) => item.id !== itemID));
      setLoading(false);
      setDeleteDataModal(false);
      setSelectedDeleteItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  //   edit data section
  const [editDataModal, setEditDataModal] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);

  const handleEditInputChange = (name, value) => {
    if (name === "year") {
      value = value ? parseInt(value, 10) : 0;
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

  const editMovie = async () => {
    if (!selectedEditItem) {
      return;
    }
    setLoading(true);
    const itemID = selectedEditItem.id;
    console.log(selectedEditItem);
    try {
      const response = await putData(`movie/admin/movie/${itemID}/`, {
        title: selectedEditItem.title,
        genre: selectedEditItem.genre,
        year: selectedEditItem.year,
      });
      console.log(response);

      const updatedData = await getData("movie/admin/movie/");
      setTableData(updatedData);
      setLoading(false);
      setEditDataModal(false);
      setSelectedEditItem(null);
    } catch (err) {
      console.log(err);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const filteredData = tableData.filter((data) => {
    return (
      data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.year.toString().includes(searchQuery)
    );
  });

  return (
    <div>
      <div className="mb-5 d-flex align-items-center justify-content-between">
        <Breadcrumb directory1="Movie" />
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
        title="Add Movie"
        content={
          <div className="row">
            {loading ? (
              <p className="text-center">Processing request...</p>
            ) : (
              ""
            )}
            <Input
              type="text"
              placeholder="Title"
              onChange={(value) => handleInputChange("title", value)}
            />
            <Input
              type="text"
              placeholder="Genre"
              onChange={(value) => handleInputChange("genre", value)}
            />
            <Input
              type="text"
              placeholder="Year"
              onChange={(value) => handleInputChange("year", value)}
            />
          </div>
        }
        visible={addDataModalVisible}
        onCancel={() => setAddDataModalVisible(false)}
        onOk={addMovie}
      />

      {/* delete data modal */}
      <Modal
        title="Delete Movie"
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
              placeholder="Title"
              value={selectedEditItem ? selectedEditItem.title || "" : ""}
              onChange={(value) => handleEditInputChange("title", value)}
            />
            <Input
              type="text"
              placeholder="Genre"
              value={selectedEditItem ? selectedEditItem.genre || "" : ""}
              onChange={(value) => handleEditInputChange("genre", value)}
            />
            <Input
              type="text"
              placeholder="Year"
              value={selectedEditItem ? selectedEditItem.year || "" : ""}
              onChange={(value) => handleEditInputChange("year", value)}
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

export default Movie;

export const movieDataColumns = [
  { title: "ID", key: "id" },
  { title: "Title", key: "title" },
  { title: "Genre", key: "genre" },
  { title: "Year", key: "year" },
];
