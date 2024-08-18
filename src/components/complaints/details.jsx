import moment from "moment";
import React from "react";

const ComplaintsDetails = ({ item }) => {
  console.log(item, "fdvdvdsvfbv");
  return (
    <div className="rider_details_container border_radius_7px  white_bg border_radius p-md-3">
      <span className="primary_color fs_16 fw_500">Details</span>
      <table>
        <tbody className="text-nowrap">
          {item?.complented_at && (
            <tr>
              <td className="cement_color fs_14 fw_500">Received at</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                :{" "}
                {item?.complented_at
                  ? moment(item?.complented_at).format("DD-MM-YYYY,HH:mm")
                  : "--"}
              </td>
            </tr>
          )}
          {item?.generated_at && (
            <tr>
              <td className="cement_color fs_14 fw_500">Received at</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                :{" "}
                {item?.generated_at
                  ? moment(item?.generated_at).format("DD-MM-YYYY,HH:mm")
                  : "--"}
              </td>
            </tr>
          )}
          {item?.initiated_at && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Initiated at</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                :{" "}
                {item?.initiated_at
                  ? moment(item?.initiated_at).format("DD-MM-YYYY,HH:mm")
                  : "--"}
              </td>
            </tr>
          )}
          {item?.InitiatedBy?.user_name && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Initiated by</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                : {item?.InitiatedBy?.user_name ?? "--"}
              </td>
            </tr>
          )}

          {item?.assigned_at && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Assigned at</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                :{" "}
                {item?.assigned_at
                  ? moment(item?.assigned_at).format("DD-MM-YYYY,HH:mm")
                  : "--"}
              </td>
            </tr>
          )}
          {item?.AssignedBy?.user_name && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Assigned by</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                : {item?.AssignedBy?.user_name ?? "--"}
              </td>
            </tr>
          )}

          {item?.re_assigned_at && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Reassigned at</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                :{" "}
                {item?.re_assigned_at
                  ? moment(item?.re_assigned_at).format("DD-MM-YYYY,HH:mm")
                  : "--"}
              </td>
            </tr>
          )}
          {item?.ReAssignedBy?.user_name && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Reassigned by</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                : {item?.ReAssignedBy?.user_name ?? "--"}
              </td>
            </tr>
          )}
          {item?.resolved_at && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Resolved at</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                :{" "}
                {item?.resolved_at
                  ? moment(item?.resolved_at).format("DD-MM-YYYY,HH:mm")
                  : "--"}
              </td>
            </tr>
          )}

          {item?.ReslovedBy?.user_name && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Resloved by</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                : {item?.ReslovedBy?.user_name ?? "--"}
              </td>
            </tr>
          )}

          {item?.closed_at && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Closed at</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                :{" "}
                {item?.closed_at
                  ? moment(item?.closed_at).format("DD-MM-YYYY,HH:mm")
                  : "--"}
              </td>
            </tr>
          )}

          {item?.ClosedBy?.user_name && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Closed by</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                : {item?.ClosedBy?.user_name ?? "--"}
              </td>
            </tr>
          )}

          {item?.CurrentOwnerName?.user_name && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">Current owner</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                : {item?.CurrentOwnerName?.user_name ?? "--"}
              </td>
            </tr>
          )}

          {item?.call_id && (
            <tr className="text-nowrap">
              <td className="cement_color fs_14 fw_500">call Id</td>
              <td className="ps-1 primary_color fs_14 fw_500">
                : {item?.call_id ?? "--"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsDetails;
