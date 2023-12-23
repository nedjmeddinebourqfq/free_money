import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Breadcrumb = ({ directory1, directory2 }) => {
  return (
    <nav>
      <ol className="breadcrumb mb-1">
        <li className="breadcrumb-item">
          <Link to="/">
            <AiOutlineHome className="mb-1 text-white" />
          </Link>
        </li>
        <li className="breadcrumb-item text-white active">{directory1}</li>
        {directory2 ? (
          <li className="breadcrumb-item text-white active">{directory2}</li>
        ) : null}
      </ol>
      <h4>{directory2 ? directory2 : directory1}</h4>
    </nav>
  );
};

export default Breadcrumb;
