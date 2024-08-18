import React from "react";
import moment from "moment";

const CouponDetails = ({ item }) => {
  return (
    <div className="my-1 p-2 pe-3">
      <span className="ps-2 fs_14 primary_color">Details</span>
      <table>
        <tbody>
          {item?.created_at ? (
            <tr className="">
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                {" "}
                Created at
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_13 fw_600 text-start text-nowrap">
                {moment(item?.created_at).format("DD-MM-YYYY   , HH:mm")}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.createdBy ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Created by
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.createdBy?.user_name}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.approved_at ? (
            <tr className="">
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                {" "}
                Approved at
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_13 fw_600 text-start text-nowrap">
                {moment(item?.approved_at).format("DD-MM-YYYY   , HH:mm")}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.approvedBy ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Approved by
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.approvedBy?.user_name}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.updatedAt ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Last updated at
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_13 fw_600 text-start text-nowrap">
                {moment(item?.updatedAt).format("DD-MM-YYYY   , HH:mm")}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.updatedBy ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Last updated by :
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.updatedBy?.user_name}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.rejected_at ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Rejected at
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_13 fw_600 text-start text-nowrap">
                {moment(item?.rejected_at).format("DD-MM-YYYY   , HH:mm")}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.rejectedBy ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Rejected by :
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.rejectedBy?.user_name}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.deleted_at ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Deleted at
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_13 fw_600 text-start text-nowrap">
                {moment(item?.deleted_at).format("DD-MM-YYYY   , HH:mm")}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.deletedBy ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Deleted by :
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                {item?.deletedBy?.user_name}
              </td>
            </tr>
          ) : (
            <></>
          )}
          {item?.expired_at ? (
            <tr>
              <td className="secondary_color text-nowrap fw_600 fs_13 text-start ps-2">
                Expired at
              </td>
              <td className="ps-3 pe-2 secondary_color fs_13 fw_600 text-nowrap">
                :
              </td>
              <td className="primary_color fs_13 fw_600 text-start text-nowrap">
                {moment(item?.expired_at).format("DD-MM-YYYY   , HH:mm")}
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

export default CouponDetails;
