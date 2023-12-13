import React from "react";

const Textarea = ({ id, placeholder, onChange, value }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
    <div className="mb-3 position-relative">
      <label className="form-label fw-bold" htmlFor={id}>
        {placeholder}
      </label>
      <textarea
        className="form-control"
        id={id}
        value={value}
        rows="4"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Textarea;
