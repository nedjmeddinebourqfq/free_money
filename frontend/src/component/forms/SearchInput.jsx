import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ onChange, placeHolder }) => {
  return (
    <div className="position-relative">
      <input
        onChange={onChange}
        type="text"
        className="form-control"
        placeholder={placeHolder}
      />
      <button className="border-0 bg-transparent text-dark table-search-btn">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchInput;
