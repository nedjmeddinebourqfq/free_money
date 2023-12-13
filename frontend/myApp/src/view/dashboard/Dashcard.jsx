import React from "react";
import { TbTimeDuration0 } from "react-icons/tb";

const Dashcard = ({ title, value }) => {
  return (
    <div className="col-lg-3 col-md-6 col-12">
      <div className="bg-dark dash-card mb-2">
        <div className="row">
          <div className="col-auto">
            <TbTimeDuration0 />
          </div>
          <div className="col-8">
            <div>
              <p className="dash-card-title">{title}</p>
              <p className="fs-5 fw-bold mb-0">{value}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashcard;
