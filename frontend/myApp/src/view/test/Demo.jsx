import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Table from "../../component/table/Table";
import { productData } from "../../data";

const Demo = () => {
  const dataColumns = [
    { title: "ID", key: "id" },
    { title: "Image", key: "image_url" },
    { title: "Name", key: "name" },
    { title: "Rating", key: "rating" },
    { title: "Price", key: "price" },
    { title: "Color", key: "color" },
    { title: "Status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (data) => (
        <>
          <button
            className="bg-transparent border-0 me-2"
            // onClick={() => handleEditClick(data.id)}
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
  return (
    <div className="">
      <h2 className="my-5">Data Table</h2>
      <Table columns={dataColumns} dataSource={productData} />
    </div>
  );
};

export default Demo;
