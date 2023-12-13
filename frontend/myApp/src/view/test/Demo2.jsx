import React, { useState } from "react";
import Input from "../../component/forms/Input";
import Table from "../../component/table/Table";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { testData } from "../../data";
import Modal from "../../component/modal/Modal";

const Demo2 = () => {
  const dataColumn = [
    { title: "ID", key: "id" },
    { title: "Name", key: "name" },
    { title: "Age", key: "age" },
    { title: "Status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (data) => (
        <>
          <button
            className="bg-transparent border-0 me-2"
            onClick={() => handleEditClick(data)}
          >
            <FiEdit2 className="p-1 fs-4 bg-ash rounded" />
          </button>
          <button
            className="bg-transparent border-0 ms-2"
            // onClick={() => showDeleteModal(data)}
          >
            <AiOutlineDelete className="text-danger p-1 fs-4 bg-ash rounded" />
          </button>
        </>
      ),
    },
  ];
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditClick = (data) => {
    setSelectedItem(data);
    setEditModalVisible(true);
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-6">
          <Input type="text" placeholder="Input 1" required={true} />
        </div>
        <div className="col-md-6">
          <Input type="text" placeholder="Input 2" required={true} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-10">
          <Table columns={dataColumn} dataSource={testData} />
        </div>
        <div className="col-md-2 d-flex align-items-start">
          <button
            className="btn btn-dark w-100"
            style={{ height: "calc(100% - 52px)" }}
          >
            Type 1
          </button>
        </div>
      </div>

      {/* modal for edit */}
      <Modal
        title={`Edit Data of ${selectedItem ? selectedItem.id : ""}`}
        content={
          <div>
            <Input
              placeholder="Name"
              type="text"
              value={selectedItem ? selectedItem.name : ""}
            />
            <Input
              placeholder="Age"
              type="text"
              value={selectedItem ? selectedItem.age : ""}
            />
            <Input
              placeholder="Status"
              type="text"
              value={selectedItem ? selectedItem.status : ""}
            />
          </div>
        }
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() => setEditModalVisible(false)}
      />
    </div>
  );
};

export default Demo2;
