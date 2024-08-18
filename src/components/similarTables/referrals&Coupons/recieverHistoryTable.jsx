import moment from "moment";
import React from "react";
import SearchInputfield from "../../form/searchInputfield";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { NavLink } from "react-router-dom";
import { navigationFn, riderNavigateFn } from "../../helper";

const ReceiverHistoryIndividualTable = ({
  tableData = [],
  // type = "",
  issueDate = "",
  loading = false,
  error = false,
}) => {
  console.log(tableData, "skfksfsa");
  return (
    <div className="mt-5">
      <div className="table_container">
        {loading && <LoadingSpinnerTable />}
        <table className="table">
          <thead>
            <tr className="pale_blue_bg text-nowrap">
              <SearchInputfield
                title={"Issue date"}
                table_border_radius="ongoing_heading_first_list"
                colorName="ps-3"
              />
              <SearchInputfield title={"Used Date"} />
              <SearchInputfield title={`Rider ID`} />

              <SearchInputfield title={"Booking ID"} />
              <SearchInputfield title={"Booking Type"} />
              <SearchInputfield title={"Ride Type"} />
              <SearchInputfield title={"Rider Payment Method"} />
              <SearchInputfield title={"Coupon Savings Amount (₹)"} />
              <SearchInputfield
                title={"Final Booking Amount (₹)"}
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
                      {issueDate
                        ? moment(issueDate).format("DD-MM-YYYY ,HH:mm")
                        : "--"}
                    </span>
                  </td>

                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.used_date
                        ? moment(item?.used_date).format("HH:mm")
                        : "--"}
                    </span>
                  </td>
                  <td>
                    <NavLink
                      className={"secondary_color fs_14 fw_500"}
                      to={riderNavigateFn(
                        item?.booking?.rider,
                        item?.booking?.rider?.id
                      )}
                    >
                      {item?.booking?.rider_id_2 ?? "--"}
                    </NavLink>
                  </td>

                  <td>
                    <NavLink
                      className={"secondary_color fs_14 fw_500"}
                      to={navigationFn(
                        item?.booking?.booking_classification,
                        item?.booking?.id
                      )}
                    >
                      {item?.booking?.booking_id_2 ?? "--"}
                    </NavLink>
                  </td>
                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.booking?.booking_type ?? "--"}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span className="secondary_color fs_14 fw_500">
                      {item?.booking?.ride_type ?? "--"}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span className="secondary_color fs_14 fw_500">
                      {item?.booking?.payment_method ?? "--"}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span className="secondary_color fs_14 fw_500">
                      {item?.booking?.RB?.coupon_savings !== null
                        ? parseFloat(item?.booking?.RB?.coupon_savings).toFixed(
                            2
                          )
                        : "--"}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span className="secondary_color fs_14 fw_500">
                      {item?.booking?.RB?.final_fare
                        ? parseFloat(item?.booking?.RB?.final_fare).toFixed(2)
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

export default ReceiverHistoryIndividualTable;
