import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import SearchInput from "../../component/forms/SearchInput";
import Table from "../../component/table/Table";
import { getData } from "../../API/getData";

const MobilePartner = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getData("offer/mobile/partners/").then((data) => {
      setTableData(data);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const filteredData = tableData.filter((data) => {
    return data.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <div>
      <div className="mb-5 d-flex align-items-center">
        <Breadcrumb directory1="Mobile Partner" />
      </div>
      <div className="filter-area d-flex align-items-center justify-content-end mb-3">
        <div className="search-box">
          <SearchInput
            onChange={handleSearchInputChange}
            placeHolder="Search with title"
          />
        </div>
      </div>
      <div>
        <Table columns={partnerColumns} dataSource={filteredData} />
      </div>
    </div>
  );
};

export default MobilePartner;

export const partnerColumns = [
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
    case 1:
      return "Offer Partner";
    case 2:
      return "Server Partner";
    default:
      return "Unknown Type";
  }
};
