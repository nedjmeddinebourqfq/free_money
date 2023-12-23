import React, {useEffect, useState} from "react";
import "../../assets/style/dashboard.css";
import Dashcard from "./Dashcard";
import axios from "axios";

const Dashboard = () => {
  const [dashCard, setDashCard] = useState([]);
  const [cashoutData, setCashoutData] = useState([]);
  const token = `Token ${localStorage.getItem("token")}`;
  const login = localStorage.getItem("login");

  useEffect(() => {
    if (login) {
      axios
        .get("https://test.privateyebd.com/api/v1/utility/admin/report/", {
          headers: {Authorization: token},
        })
        .then((response) => {
          setDashCard(response.data.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [token, login]);

  if (!cashoutData) {
    return;
  }

  return (
    <div>
      <section className="cards col-12">
        <div className="row">
          {Object.entries(dashCard).map(([name, value], index) => (
            <Dashcard
              key={index}
              title={
                name === "total_user"
                  ? "Total User"
                  : name === "total_partner"
                  ? "Total Partner"
                  : name === "new_offer"
                  ? "New Offer"
                  : name === "offer_partner"
                  ? "Offer Partner"
                  : name === "survey_partner"
                  ? "Survey Partner"
                  : name === "total_cashout"
                  ? "total cashout"
                  : name === "daily_total"
                  ? "Today's payout"
                  : name === "weekly_total"
                  ? "Weekly  payout"
                  : name === "monthly_total"
                  ? "Monthly  payout"
                  : name
              }
              value={value}
            />
          ))}
        </div>
        <div className="mt-4"></div>
      </section>
    </div>
  );
};

export default Dashboard;
