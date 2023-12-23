import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import SearchInput from "../../component/forms/SearchInput";
import Table from "../../component/table/Table";
import { getData } from "../../API/getData";
import { FiEdit2 } from "react-icons/fi";
import axiosInstance from "../../API/AxiosInstance";
import Modal from "../../component/modal/Modal";
import DropSelect from "../../component/Dropdown/DropSelect";

const Cashout = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData("checkout/admin/cashout-request/").then((res) => {
      setTableData(res);
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
      </>
    ),
  };
  const finalColumn = [...cashoutColumn, actionColumn];

  //   edit data section
  const [editDataModal, setEditDataModal] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditInputChange = (name, value) => {
    if (name === "status") {
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
  const cancelDataModal = () => {
    setSelectedEditItem(null);
    setEditDataModal(false);
  };

  const editCashout = async () => {
    if (!selectedEditItem) {
      return;
    }
    const token = `Token ${localStorage.getItem("token")}`;
    setLoading(true);
    const itemID = selectedEditItem.id;
    try {
      const response = await axiosInstance.patch(
        `checkout/admin/cashout-request/${itemID}/`,

        {
          status: selectedEditItem.status,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(response);

      const updatedData = await getData("checkout/admin/cashout-request/");
      setTableData(updatedData);
      setLoading(false);
      setEditDataModal(false);
      setSelectedEditItem(null);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-5 d-flex align-items-center">
        <Breadcrumb directory1="Cashout" />
      </div>
      <div>
        <div className="filter-area d-flex align-items-center justify-content-end mb-3">
          <div className="search-box">
            <SearchInput placeHolder="Search" />
          </div>
        </div>
        <div>
          <Table columns={finalColumn} dataSource={tableData} />
        </div>
      </div>
      {/* edit modal */}
      <Modal
        title="Edit Cashout Request"
        content={
          <div>
            {loading ? <p>Loading...</p> : ""}
            <DropSelect
              label="Status"
              options={statusData}
              value={selectedEditItem ? selectedEditItem.status || "" : ""}
              onChange={(value) => handleEditInputChange("status", value)}
            />
          </div>
        }
        visible={editDataModal}
        onCancel={cancelDataModal}
        onOk={editCashout}
      />
    </div>
  );
};

export default Cashout;

export const cashoutColumn = [
  { title: "ID", key: "id" },
  { title: "User Name", key: "user_name" },
  { title: "Created At", key: "created_at" },
  { title: "Amount", key: "amount" },
  { title: "Payment Address", key: "payment_address" },
  {
    title: "Status",
    key: "status",
    render: (data) => {
      if (data.status === 0) {
        return <span>Pending</span>;
      }
      if (data.status === 1) {
        return <span>Approved</span>;
      }
      if (data.status === 2) {
        return <span>Rejected</span>;
      }
    },
  },
  { title: "User", key: "user" },
  {
    title: "Payment Method",
    key: "payment_method",
    render: (data) => {
      if (data.payment_method === 0) {
        return <span>Withdraw Cash</span>;
      }
      if (data.payment_method === 1) {
        return <span>Withdraw Card</span>;
      }
      if (data.payment_method === 2) {
        return <span>Withdraw Gift Card</span>;
      } else {
        return <span>Unknown</span>;
      }
    },
  },
];

export const statusData = [
  { title: "Pending", value: 0 },
  { title: "Approved", value: 1 },
  { title: "Rejected", value: 2 },
];
