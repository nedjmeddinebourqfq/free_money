import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../view/auth/Login";
import {ProtectedRoutes} from "./ProtectedRoutes";
import MainLayout from "../view/main-layout/MainLayout";
import Dashboard from "../view/dashboard/Dashboard";
import NotFound from "../view/NotFound";
import Movie from "../view/movie/Movie";
import PaymentMethod from "../view/payment/PaymentMethod";
import AdminPartner from "../view/partners/AdminPartner";
import User from "../view/user/User";
import SiteInfo from "../view/site-info/SiteInfo";
import Profile from "../view/profile/Profile";
import Signup from "../view/auth/Signup";
import AccoutVerification from "../view/auth/AccoutVerification";
import Cashout from "../view/cashout/Cashout";
import Balance from "../view/balance/Balance";
import SignupSuccess from "../view/auth/SignupSuccess";
import Company from "../view/company/Company";

const AppRoutes = () => {
  const [mail, setMail] = useState("");
  const handleMail = (email) => {
    setMail(email);
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup verifyMail={handleMail} />} />
      <Route
        path="/account-verification"
        element={<AccoutVerification emailProps={mail} />}
      />
      <Route
        path="/signup-successful"
        element={<SignupSuccess emailProps={mail} />}
      />
      <Route path="/" element={<ProtectedRoutes Component={MainLayout} />}>
        <Route index element={<ProtectedRoutes Component={Dashboard} />} />
        <Route
          path="/payment-method"
          element={<ProtectedRoutes Component={PaymentMethod} />}
        />
        <Route
          path="/company"
          element={<ProtectedRoutes Component={Company} />}
        />
        <Route path="/movie" element={<ProtectedRoutes Component={Movie} />} />
        <Route
          path="/admin-partner"
          element={<ProtectedRoutes Component={AdminPartner} />}
        />

        <Route path="/user" element={<ProtectedRoutes Component={User} />} />
        <Route
          path="/site-info"
          element={<ProtectedRoutes Component={SiteInfo} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoutes Component={Profile} />}
        />
        <Route
          path="/cashout"
          element={<ProtectedRoutes Component={Cashout} />}
        />
        <Route
          path="/balance"
          element={<ProtectedRoutes Component={Balance} />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
