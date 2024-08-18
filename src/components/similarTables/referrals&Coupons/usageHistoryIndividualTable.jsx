import moment from "moment";
import React from "react";
import SearchInputfield from "../../form/searchInputfield";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { NavLink } from "react-router-dom";
import { driverNavigateFn, riderNavigateFn } from "../../helper";

const UsageHistoryIndividualTable = ({
  tableData = [],
  cb_amount,
  type,
  loading = false,
  error = false,
  coupon_type,
  referral_classification,
  driver_rating,
}) => {
  console.log(tableData, "skdfjhslk");
  return (
    <div className="mt-5">
      <div className="table_container">
        {loading && <LoadingSpinnerTable />}
        <table className="table">
          <thead>
            <tr className="pale_blue_bg text-nowrap">
              <SearchInputfield
                title={
                  coupon_type === "FiveStarDriverRating"
                    ? "Issued Date"
                    : "Deposit Date"
                }
                table_border_radius="ongoing_heading_first_list"
                colorName="ps-3"
              />
              <SearchInputfield
                title={
                  coupon_type === "FiveStarDriverRating"
                    ? "Issued Time"
                    : "Deposit Time"
                }
              />
              <SearchInputfield
                title={` ${
                  type === "driverCoupon" ||
                  (type === "driverReferral" &&
                    referral_classification === "DriverToDriverReferral")
                    ? "Driver ID"
                    : "Rider ID"
                } `}
              />
              <SearchInputfield
                title={
                  coupon_type === "CurrentBalanceDeposit"
                    ? "Current Balance Deposit Amount (₹)"
                    : "Driver Rating Issued"
                }
                table_border_radius="ongoing_heading_last_list"
              />
            </tr>
          </thead>
          <tbody className="light_blue_bg text-nowrap">
            <LoadAndError
              loader={loading}
              error={error}
              status={tableData?.length === 0}
            >
              {tableData?.map((item, id) => (
                <tr key={id} className={"light_blue_bg text-nowrap"}>
                  <td>
                    <span className="secondary_color fs_14 fw_500 ps-3">
                      {item?.deposite_date
                        ? moment(item?.deposite_date).format("DD-MM-YYYY")
                        : item?.used_date
                        ? moment(item?.used_date).format("DD-MM-YYYY")
                        : "--"}
                    </span>
                  </td>

                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.deposite_date
                        ? moment(item?.deposite_date).format("HH:mm")
                        : item?.used_date
                        ? moment(item?.used_date).format("HH:mm")
                        : "--"}
                    </span>
                  </td>
                  <td>
                    <NavLink
                      className={"secondary_color fs_14 fw_500"}
                      to={
                        type === "driverCoupon" ||
                        (type === "driverReferral" &&
                          referral_classification === "DriverToDriverReferral")
                          ? driverNavigateFn(item?.driver, item?.driver?.id)
                          : riderNavigateFn(item?.rider, item?.rider?.id)
                      }
                    >
                      {type === "driverCoupon" ||
                      (type === "driverReferral" &&
                        referral_classification === "DriverToDriverReferral")
                        ? item?.driver?.driver_id2 ?? "--"
                        : item?.rider?.rider_id2 ?? "--"}
                    </NavLink>
                  </td>

                  <td>
                    {" "}
                    <span className="secondary_color fs_14 fw_500">
                      {cb_amount
                        ? parseFloat(cb_amount).toFixed(2)
                        : driver_rating
                        ? driver_rating + "-Star"
                        : "--"}
                    </span>
                  </td>
                </tr>
              ))}
            </LoadAndError>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsageHistoryIndividualTable;
