import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../view/auth/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import MainLayout from "../view/main-layout/MainLayout";
import Dashboard from "../view/dashboard/Dashboard";
import Balance from "../view/balance/Balance";
import NotFound from "../view/NotFound";
import Movie from "../view/movie/Movie";
import PaymentMethod from "../view/payment/PaymentMethod";
import AdminPartner from "../view/partners/AdminPartner";
import MobilePartner from "../view/partners/MobilePartner";
import User from "../view/user/User";
import SiteInfo from "../view/site-info/SiteInfo";
import Profile from "../view/profile/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoutes Component={MainLayout} />}>
        <Route index element={<ProtectedRoutes Component={Dashboard} />} />
        <Route
          path="/balance"
          element={<ProtectedRoutes Component={Balance} />}
        />
        <Route
          path="/payment-method"
          element={<ProtectedRoutes Component={PaymentMethod} />}
        />
        <Route path="/movie" element={<ProtectedRoutes Component={Movie} />} />
        <Route
          path="/admin-partner"
          element={<ProtectedRoutes Component={AdminPartner} />}
        />
        <Route
          path="/mobile-partner"
          element={<ProtectedRoutes Component={MobilePartner} />}
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
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
