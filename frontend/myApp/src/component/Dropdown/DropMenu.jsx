import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const DropMenu = ({ buttonLabel, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleItemClick = (event) => {
    event.stopPropagation();

    closeDropdown();
  };

  return (
    <div
      className="custom-dropdown d-flex align-items-center"
      ref={dropdownRef}
    >
      <button
        className="dropdown-button fw-bold bg-transparent border-0 rounded-2"
        onClick={toggleDropdown}
      >
        {buttonLabel}
      </button>
      {isOpen && (
        <div className="dropdown-content position-relative">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { onClick: handleItemClick });
          })}
        </div>
      )}
      {isOpen ? (
        <MdKeyboardArrowUp
          className="p-1 fs-4 ms-3 rounded"
          style={{ backgroundColor: "rgb(73, 73, 73)" }}
        />
      ) : (
        <MdKeyboardArrowDown
          className="p-1 fs-4 ms-3 rounded"
          style={{ backgroundColor: "rgb(73, 73, 73)" }}
        />
      )}
    </div>
  );
};

export default DropMenu;
