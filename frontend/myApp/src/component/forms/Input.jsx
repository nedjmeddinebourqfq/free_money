import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  type,
  id,
  value,
  placeholder,
  onChange,
  disabled,
  required,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  const [showPass, setShowPass] = useState(false);
  const handleTogglePass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="mb-3 form-floating input-wrap position-relative">
      <input
        type={showPass ? "text" : type}
        className="form-control input-dark"
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        required={required}
      />
      <label className="fw-bold" htmlFor={id}>
        {placeholder}
      </label>
      {type === "password" && (
        <button
          onClick={handleTogglePass}
          className="position-absolute bg-transparent border-0 pass-eye"
        >
          {showPass ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default Input;
