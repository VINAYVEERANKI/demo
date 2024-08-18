import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import SearchInputfield from "../../../form/searchInputfield";
import { insertSpaces, statusColor } from "../../../helper";
import errorToast from "../../../utilits/errorToast";
import LoadAndError from "../../../utilits/loadAndError";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import TablePaginations from "../../../utilits/pagination";
import { driverIncentiveRejectedListAction } from "../../../../redux/actions/incentives/rejectedIncentivesAction";
import { driverIncentiveDeletedListAction } from "../../../../redux/actions/incentives/deletedIncentivesAction";
import { driverIncentiveExpiredListAction } from "../../../../redux/actions/incentives/expiredIncentivesAction";

const DriverIncentiveTable = ({ type = "", search }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  // const [search, setSearch] = useState({ value: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [incentiveData, setIncentiveData] = useState();

  useEffect(() => {
    if (type === "rejected") {
      setLoading(true);
      dispatch(
        driverIncentiveRejectedListAction(
          {
            search: {
              zone_name: search?.zone_name,
              id: "",
              incentive_code: search?.incentive_code,
              incentive_classification: search?.incentive_classification,
              campaign_period: search?.campaign_period,
              rejected_at: search?.rejected_at,
              rejected_by: search?.rejectedBy,
              incentive_coupon_type: search?.incentive_coupon_type,
              driver_default_ride_type:search?.driver_default_ride_type,
              incentive_applicable_zone:search?.incentive_applicable_zone ,
              incentive_status:search?.incentive_status,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "deleted") {
      setLoading(true);
      dispatch(
        driverIncentiveDeletedListAction(
          {
            search: {
              zone_name:search?.zone_name,
              id: "",
              incentive_code: search?.incentive_code,
              incentive_classification: search?.incentive_classification,
              campaign_period: "",
              deleted_at: search?.deleted_at,
              deleted_by: search?.deleted_by,
              incentive_coupon_type: search?.incentive_coupon_type,
              driver_default_ride_type:search?.driver_default_ride_type,
              incentive_applicable_zone:search?.incentive_applicable_zone ,
              incentive_status:search?.incentive_status,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "expired") {
      setLoading(true);
      dispatch(
        driverIncentiveExpiredListAction(
          {
            search: {
              zone_name: search?.zone_name,
              id: "",
              incentive_code: search?.incentive_code,
              incentive_classification: search?.incentive_classification,
              campaign_period: search?.campaign_dates,
              expired_at: search?.expired_at,
              incentive_coupon_type: search?.incentive_coupon_type,
              driver_default_ride_type:search?.driver_default_ride_type,
              incentive_applicable_zone:search?.incentive_applicable_zone ,
              incentive_status:search?.incentive_status,
              campaign_dates:search?.campaign_status
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search]);

  const onSuccess = (data) => {
    setError(false);
    setLoading(false);
    setIncentiveData(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  return (
    <div>
      <div className="mt-2">
        <div className=" table_container">
          {loading && <LoadingSpinnerTable />}
          <table className="table  ">
            <thead>
              <tr className="pale_blue_bg text-nowrap">
                <th scope="col" className="ongoing_heading_first_list">
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                    id="mastercheck"
                  />
                </th>
                <SearchInputfield title={"Incentive ID"} />
                <SearchInputfield title={"Incentive Classification"} />
                <SearchInputfield title={"Zone"} />
                <SearchInputfield title={"Campaign Period"} />
                <SearchInputfield title={"Incentive Status"} />

                <SearchInputfield
                  title={
                    type === "rejected"
                      ? "Rejected At"
                      : type === "deleted"
                      ? "Deleted At"
                      : "Expired At"
                  }
                />
                {type === "expired" ? (
                  <></>
                ) : (
                  <SearchInputfield
                    title={type === "rejected" ? "Rejected By" : "Deleted By"}
                  />
                )}

                <th className="ongoing_heading_last_list"></th>
              </tr>
            </thead>
            <tbody className="light_blue_bg text-nowrap">
              <LoadAndError
                loader={loading}
                error={error}
                status={incentiveData?.length === 0}
              >
                {incentiveData?.map((item, id) => (
                  <tr key={id} className={"light_blue_bg text-nowrap"}>
                    <th scope="row">
                      <input
                        id={item?.id}
                        type="checkbox"
                        className="manage_fare_checkbox ms-2 "
                      />
                    </th>

                    <td>
                      <a className=" secondary_color">
                        <span className="secondary_color fs_14 fw_500">
                          {item?.incentive_code ?? "--"}
                        </span>
                      </a>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.incentive_classification
                          ? insertSpaces(item?.incentive_classification)
                          : "--"}
                      </span>
                    </td>

                    <td>
                      <span className={"secondary_color fs_14 fw_500"}>
                        {item?.ZoneName?.zone_name ?? "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {item?.campaign_period ? item?.campaign_period : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item?.incentive_status ?? "--"
                        )} fs_14 fw_500`}
                      >
                        {item?.incentive_status
                          ? insertSpaces(item?.incentive_status)
                          : "--"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.rejected_at ||
                        item?.deleted_at ||
                        item?.expired_at
                          ? moment(
                              item?.rejected_at ||
                                item?.deleted_at ||
                                item?.expired_at
                            ).format("DD-MM-YYYY,HH:mm")
                          : "--"}
                      </span>
                    </td>
                    {type === "expired" ? (
                      <></>
                    ) : (
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.rejectedBy?.user_name ??
                            item?.deletedBy?.user_name ??
                            "--"}
                        </span>
                      </td>
                    )}

                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_14  me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={
                          type === "rejected"
                            ? `rejected/view/${item?.id}`
                            : type === "deleted"
                            ? `deleted/view/${item?.id}`
                            : type === "expired"
                            ? `expired/view/${item?.id}`
                            : ``
                        }
                        state={{
                          edit: false,
                          status: item?.incentive_status,
                        }}
                      >
                        View
                      </NavLink>
                      {/* <NavLink
                        className="border_none border_radius text-decoration-none primary_bg white_color py-1 fs_14 px-3 view_text"
                        to={
                          type === "rejected"
                            ? `rejected/edit/${item?.id}`
                            : type === "deleted"
                            ? `deleted/edit/${item?.id}`
                            : type === "expired"
                            ? `expired/edit/${item?.id}`
                            : ``
                        }
                        state={{
                          edit: false,
                          status: item?.incentive_status,
                        }}
                      >
                        Edit
                      </NavLink> */}
                    </td>
                  </tr>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
      </div>
      {incentiveData?.length === 0 ? (
        <></>
      ) : (
        <TablePaginations
          paginate={handlePagination}
          currentPage={page}
          pageData={pageData}
        />
      )}
    </div>
  );
};

export default DriverIncentiveTable;
