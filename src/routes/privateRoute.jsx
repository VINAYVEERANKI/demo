import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/layout/layout";

const PrivateRoute = () => {

  return localStorage.getItem("accessToken") ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
