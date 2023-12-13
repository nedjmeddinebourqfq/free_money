import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <nav>
        <ul className="pagination">
          {/* Previous button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <NavLink
              className="page-link"
              to="#"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span aria-hidden="true">
                <MdOutlineKeyboardArrowLeft />
                <span>Previous</span>
              </span>
            </NavLink>
          </li>

          {/* Page numbers */}
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <NavLink
                className="page-link"
                to="#"
                onClick={() => onPageChange(page)}
              >
                {page}
              </NavLink>
            </li>
          ))}

          {/* Next button */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <NavLink
              className="page-link"
              to="#"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span aria-hidden="true">
                <span>Next</span>
                <MdOutlineKeyboardArrowRight />
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
