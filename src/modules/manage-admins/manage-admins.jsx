import React from "react";
import styles from "./manage-admins.module.css";
import AdminTable from "../../components/manage-admins/adminTable";

const ManageAdmins = () => {

  return (
    <>
        <AdminTable type={"manageAdminList"}/>
    </>
  );
};

export default ManageAdmins;
