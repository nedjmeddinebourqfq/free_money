import React, { useState } from "react";
import noDataImage from "../../assets/image/empty-box.png";
import Pagination from "../pagination/Pagination";

const Table = ({ columns, dataSource, onActionClick }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const renderVerificationStatus = (data) => {
    const isVerified = data.is_verified;

    let statusText = "";
    let statusColor = "";

    switch (true) {
      case isVerified === true:
        statusText = "True";
        statusColor = "#a9b06a";
        break;
      case isVerified === false:
        statusText = "False";
        statusColor = "#ed0909";
        break;
      default:
        statusText = "unknown";
        statusColor = "#ff0000";
        break;
    }

    const style = {
      backgroundColor: statusColor,
      padding: "3px 5px",
      borderRadius: "8px",
      color: "white",
    };

    return <span style={style}>{statusText}</span>;
  };
  const renderStatus = (data) => {
    const isActive = data.is_active;

    let statusText = "";
    let statusColor = "";

    switch (true) {
      case isActive === true:
        statusText = "Active";
        statusColor = "#a9b06a";
        break;
      case isActive === false:
        statusText = "Inactive";
        statusColor = "#ed0909";
        break;
      default:
        statusText = "unknown";
        statusColor = "#ff0000";
        break;
    }

    const style = {
      backgroundColor: statusColor,
      padding: "3px 5px",
      borderRadius: "8px",
      color: "white",
    };

    return <span style={style}>{statusText}</span>;
  };
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Calculate the total number of data items
  const totalDataCount = dataSource.length;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalDataCount / itemsPerPage);

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataSource.slice(startIndex, endIndex);

  // Update the current page when the page number is clicked
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  // Render the table body with data for the current page
  const renderTableBody = () => {
    if (currentData.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className="text-center">
            <h4>No data to show</h4>
            <img className="no-data-img" src={noDataImage} alt="No data" />
          </td>
        </tr>
      );
    }

    return currentData.map((data, index) => (
      <tr className="border-bottom" key={index}>
        {columns.map((column, columnIndex) => {
          if (column.key === "actions") {
            return (
              <td key={columnIndex}>{column.render(data, onActionClick)}</td>
            );
          } else if (column.key === "image_url") {
            return (
              <td key={columnIndex}>
                {data?.image_url && (
                  <img
                    key={data.image_url}
                    src={data.image_url}
                    alt="category"
                    style={{ height: "50px", width: "50px" }}
                  />
                )}
              </td>
            );
          } else if (column.key === "is_active") {
            return (
              <td key={columnIndex} className="d-flex justify-content-center">
                {renderStatus(data)}
              </td>
            );
          } else if (column.key === "is_verified") {
            return (
              <td key={columnIndex} className="d-flex justify-content-center">
                {renderVerificationStatus(data)}
              </td>
            );
          } else if (column.render) {
            return <td key={column.key}>{column.render(data)}</td>;
          }
          return <td key={columnIndex}>{data[column.key]}</td>;
        })}
      </tr>
    ));
  };

  // Determine whether to display pagination based on data count
  const shouldDisplayPagination = totalDataCount > itemsPerPage;

  return (
    <div className="table-responsive">
      <table className="custom-table text-white table table-bordered w-100">
        <thead className="border-bottom">
          <tr style={{ backgroundColor: "rgb(26, 26, 29)" }}>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
      <div className="mt-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="table-dropdown">
            <select
              className="form-select border-dark c-pointer"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
          </div>
          <div className="ms-2">
            Showing {startIndex + 1} - {Math.min(endIndex, totalDataCount)} of
            Total {totalDataCount} data
          </div>
        </div>
        {shouldDisplayPagination && (
          <div className="me-1">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
