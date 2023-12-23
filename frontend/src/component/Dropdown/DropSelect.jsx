import React from "react";

const DropSelect = ({ options, label, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="mb-3 drop-wrap">
      <label className="form-label fw-bold">{label}</label>
      <select
        className="form-select"
        aria-label="select example"
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropSelect;
