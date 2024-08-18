import React from "react";
import moment from "moment";

const AdminDetails = ({ user }) => {

  const adminData = [
    {
      name: "Created at",
      value:
        user?.createdAt &&
        moment(user.createdAt).format("DD-MM-YYYY   , HH:mm"),
    },
    { name: "Created by", value: user?.createdBy?.user_name },
    {
      name: "Updated at",
      value:
        user?.updatedAt &&
        moment(user.updatedAt).format("DD-MM-YYYY   , HH:mm"),
    },
    { name: "Updated by", value: user?.updatedBy?.user_name },
    {
      name: "Blocked at",
      value:
        user?.blocked_at &&
        moment(user.blocked_at).format("DD-MM-YYYY   , HH:mm"),
    },
    { name: "Blocked by", value: user?.blockedBy?.user_name },
    {
      name: "Unblocked at",
      value:
        user?.unblocked_at &&
        moment(user.unblocked_at).format("DD-MM-YYYY   , HH:mm"),
    },
    { name: "Unblocked by", value: user?.unBlockedBy?.user_name },
    {
      name: "Deleted at",
      value:
        user?.deleted_at &&
        moment(user.deleted_at).format("DD-MM-YYYY   , HH:mm"),
    },
    { name: "Deleted by", value: user?.deletedBy?.user_name },
  ].filter(
    (data) =>
      data.value !== null && data.value !== undefined && data.value !== ""
  );

  return (
    <div className=" my-1">
      <table>
        <tbody>
          {adminData?.map((item) => {
            return (
              <tr className="" key={item?.name}>
                <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                  {item?.name}
                </td>
                <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                  :
                </td>
                <td className="primary_color fs_12 fw_600 text-start text-nowrap">
                  {item?.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDetails;
