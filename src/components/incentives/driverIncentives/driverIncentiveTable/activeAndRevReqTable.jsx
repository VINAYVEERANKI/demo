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
import { driverIncentivePendingListAction } from "../../../../redux/actions/incentives/pendingIncentivesAction";
import { driverIncentiveActiveListAction } from "../../../../redux/actions/incentives/activeIncentivesAction";

const DriverIncentActAndRevReqTable = ({ type = "", search }) => {
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
    if (type === "reviewRequired") {
      setLoading(true);
      dispatch(
        driverIncentivePendingListAction(
          {
            search: {
              zone_name: search?.zone_name,
              id: "",
              incentive_code: search?.incentive_code,
              incentive_classification: search?.incentive_classification,
              campaign_period: search?.campaign_dates,
              approved_at: search?.approved_at,
              approved_by: search?.approved_by,
              campaign_status: search?.campaign_status,
              incentive_coupon_type: search?.incentive_coupon_type,
              incentive_applicable_zone:search?.incentive_applicable_zone ,
              incentive_status:search?.incentive_status,
              driver_default_ride_type:search?.driver_default_ride_type,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else {
      setLoading(true);
      dispatch(
        driverIncentiveActiveListAction(
          {
            search: {
              zone_name: search?.zone_name,
              id: "",
              incentive_code: search?.incentive_code,
              incentive_classification: search?.incentive_classification,
              campaign_period: "",
              approved_at: search?.approved_at,
              approved_by: search?.approved_by,
              campaign_status: search?.campaign_status,
              incentive_coupon_type: search?.incentive_coupon_type,
              incentive_applicable_zone:search?.incentive_applicable_zone ,
              incentive_status:search?.incentive_status,
              driver_default_ride_type:search?.driver_default_ride_type,
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
          <table className="table">
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
                {type === "active" ? (
                  <SearchInputfield title={"Accounts Availed"} />
                ) : (
                  <></>
                )}

                <SearchInputfield
                  title={
                    type === "reviewRequired" ? "Created At" : "Approved At"
                  }
                />
                <SearchInputfield
                  title={
                    type === "reviewRequired" ? "Created By" : "Approved By"
                  }
                />
                <SearchInputfield title={"Incentive Status"} />
                <SearchInputfield title={"Campaign Status"} />

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
                    {type === "active" ? (
                      <td>
                        {" "}
                        <span className="secondary_color fs_14 fw_500">
                          {item?.accounts_availed ?? "--"}
                        </span>
                      </td>
                    ) : (
                      <></>
                    )}

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.created_at || item?.approved_at
                          ? moment(
                              item?.created_at || item?.approved_at
                            ).format("DD-MM-YYYY,HH:mm")
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.createdBy?.user_name ??
                          item?.approvedBy?.user_name ??
                          "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item?.incentive_status
                        )} fs_14 fw_500`}
                      >
                        {item?.incentive_status
                          ? insertSpaces(item?.incentive_status)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item?.campaign_status
                        )} fs_14 fw_500`}
                      >
                        {item?.campaign_status ? item?.campaign_status : "--"}
                      </span>
                    </td>

                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_14  me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={
                          type === "reviewRequired"
                            ? `review-required/view/${item?.id}`
                            : `active/view/${item?.id}`
                        }
                        state={{
                          edit: false,
                          status: item?.incentive_status,
                        }}
                      >
                        View
                      </NavLink>
                      <NavLink
                        className="border_none border_radius text-decoration-none primary_bg white_color py-1 fs_14 px-3 view_text"
                        to={
                          type === "reviewRequired"
                            ? `review-required/edit/${item?.id}`
                            : `active/edit/${item?.id}`
                        }
                        state={{
                          edit: true,
                          status: item?.incentive_status,
                        }}
                      >
                        Edit
                      </NavLink>
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

export default DriverIncentActAndRevReqTable;
