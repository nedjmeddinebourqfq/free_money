import React, { useEffect, useState } from "react";
import "../../assets/style/dashboard.css";
import Dashcard from "./Dashcard";
import axios from "axios";

const Dashboard = () => {
  const [dashCard, setDashCard] = useState([]);
  const token = `Token ${localStorage.getItem("token")}`;
  const login = localStorage.getItem("login");
  useEffect(() => {
    if (login) {
      axios
        .get("https://test.privateyebd.com/api/v1/utility/admin/report/", {
          headers: { Authorization: token },
        })
        .then((response) => {
          setDashCard(response.data.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [token, login]);
  return (
    <div>
      <section className="cards col-12">
        <div className="row">
          {Object.entries(dashCard).map(([name, value], index) => (
            <Dashcard key={index} title={name} value={value} />
          ))}
        </div>
        <div className="mt-4"></div>
      </section>
    </div>
  );
};

export default Dashboard;
