import React from "react";
import moment from "moment";

const RideTypeDetails = ({ item }) => {
  return (
    <div className=" my-1">
      <table>
        <tbody>
          {item?.created_at ? (
            <tr className="">
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                {" "}
                Created at
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_12 fw_600 text-start text-nowrap">
                {moment(item?.created_at).format("DD-MM-YYYY   , HH:mm")}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.CreatedBy?.user_name ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                Created by
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.CreatedBy?.user_name}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.updated_at ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                Updated at :
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_12 fw_600 text-start text-nowrap">
                {moment(item?.updated_at).format("DD-MM-YYYY   , HH:mm")}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.UpdatedBy?.user_name ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                Updated by :
              </td>
              <td className="ps-3 secondary_color fs_12 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.UpdatedBy?.user_name}
              </td>
            </tr>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RideTypeDetails;
