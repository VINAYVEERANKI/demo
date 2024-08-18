import React from "react";
import styles from "./manage-admins.module.css";
import AdminTable from "../../components/manage-admins/adminTable";

const BlockedAdmins = () => {
  return (
    <>
        <AdminTable type="blockedAdminList" />
    </>
  );
};

export default BlockedAdmins;
