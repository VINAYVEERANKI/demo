import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchInputfield from "../../form/searchInputfield";
import {
  formatDateTime,
  insertSpaces,
  statusColor,
  useSortableData,
} from "../../helper";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import TablePaginations from "../../utilits/pagination";
import { riderBroadCastPendingListAction } from "../../../redux/actions/broadcast/pendandCreateBroadcastAction";
import { riderBroadCastActiveListAction } from "../../../redux/actions/broadcast/activeBroadcastAction";
import { riderBroadCastRejectListAction } from "../../../redux/actions/broadcast/rejectbroadcastAction";
import { riderBroadCastDeleteListAction } from "../../../redux/actions/broadcast/deletedBroadcastAction";
import { riderBroadCastExpiredListAction } from "../../../redux/actions/broadcast/expiredBroadcastAction";
import usePermissions from "../../usePermissionChecker";

const RiderBroadcastTable = ({ type = "" ,search,}) => {
  // console.log(search,"search");
  const dispatch = useDispatch();
  const { canRead, canWrite } = usePermissions();
  console.log(canRead("rider_broadcast"),"hgcghcgcghhcch");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  // const [search, setSearch] = useState({ value: "" });
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [broadcastData, setBroadcastData] = useState();
  const { items, requestSort, sortConfig } = useSortableData(broadcastData);

  useEffect(() => {
    if (type === "reviewRequired") {
      setLoading(true);
      dispatch(
        riderBroadCastPendingListAction(
          {
            search: {
              id: "",
              broadcast_code:search?.broadcast_code,
              zone_name: search?.zone_name,
              user_type: "",
              notification_title: search?.notification_title,
              broadcast_status: search?.broadcast_status,
              campaign_status: search?.campaign_status,
              created_at: search?.created_at,
              created_by:search?.user_name,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
    //  else if (type === "active") {
    //   setLoading(true);
    //   dispatch(
    //     riderBroadCastActiveListAction(
    //       {
    //         search: {
    //           id: "",
    //           broadcast_code: "",
    //           broadcast_applicable_zone: "",
    //           user_type: "",
    //           notification_title: "",
    //           broadcast_status: "",
    //           campaign_status: "",
    //           created_at: "",
    //           created_by: "",
    //         },
    //       },
    //       page,
    //       onSuccess,
    //       onError
    //     )
    //   );
    // } 
    else if (type === "active") {
      setLoading(true);
      dispatch(
        riderBroadCastActiveListAction(
          {
            search: {
              "id":"",
              "broadcast_code":search?.broadcast_code,
              "zone_name":search?.zone_name,
              "user_type":"",
              "start_date":"",
              "expiry_date":"",
              "notification_title":search?.notification_title,
              "broadcast_status":"",
              "campaign_status":search?.campaign_status,
              "approved_at":search?.approved_at,
              "approved_by":search?.approved_by,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } 
    // else if (type === "rejected") {
    //   setLoading(true);
    //   dispatch(
    //     riderBroadCastRejectListAction(
    //       {
    //         search: {
    //           id: "",
    //           broadcast_code: search?.broadcast_code,
    //           broadcast_applicable_zone: "",
    //           user_type: "",
    //           notification_title: "",
    //           broadcast_status: "",
    //           campaign_status: "",
    //           rejected_at: "",
    //           rejected_by: "",
    //         },
    //       },
    //       page,
    //       onSuccess,
    //       onError
    //     )
    //   );
    // } 
    else if (type === "rejected") {
      setLoading(true);
      dispatch(
        riderBroadCastRejectListAction(
          {
            search: {
              "id":"",
        "broadcast_code":search?.broadcast_code,
        "zone_name":search?.zone_name,
        "user_type":"",
        "notification_title":search?.notification_title,
        "broadcast_status":search?.broadcast_status,
        "campaign_status":"",
        "rejected_at":search?.rejected_at,
        "rejected_by":search?.rejected_by,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } 
    else if (type === "deleted") {
      setLoading(true);
      dispatch(
        riderBroadCastDeleteListAction(
          {
            search: {
              id: "",
              broadcast_code:search?.broadcast_code,
              broadcast_applicable_zone: search?.zone_name,
              user_type: "",
              notification_title: search?.notification_title,
              broadcast_status: "",
              campaign_status: "",
              deleted_at: search?.deleted_at,
              deleted_by:search?.deleted_by,
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
        riderBroadCastExpiredListAction(
          {
            search: {
              id: "",
              broadcast_code:search?.broadcast_code,
              broadcast_applicable_zone: search?.zone_name,
              user_type: "",
              notification_title: search?.notification_title,
              broadcast_status: "",
              campaign_status: "",
              expired_at: search?.expired_at,
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
    setBroadcastData(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
    setErrorMessage(data?.data?.data);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  const tableHeading = [
    { title: "Broadcast ID", value: "broadcast_code" },
    { title: "User Type", value: "user_type" },
    {
      title: "Zone",
      value: "ZoneName.zone_name",
    },
    {
      title: "Notification Title",
      value: "notification_title",
    },
    {
      title: "Broadcast Status",
      value: "broadcast_status",
    },
    {
      title: "Campaign Status",
      value: "campaign_status",
    },
    {
      title: "Created At",
      value: "created_at",
    },
    {
      title: "Created By",
      value: "created_by",
    },
  ];

  switch (type) {
    case "active":
      tableHeading?.splice(6, 2);
      tableHeading?.push(
        {
          title: "Start At",
          value: "start_date",
        },
        {
          title: "Expiry At",
          value: "expiry_date",
        },
        {
          title: "Approved At",
          value: "approved_at",
        },
        {
          title: "Approved By",
          value: "approvedBy.user_name",
        }
      );
      break;
    case "rejected":
      tableHeading?.splice(5, 3);
      tableHeading?.push(
        {
          title: "Rejected At",
          value: "rejected_at",
        },
        {
          title: "rejected By",
          value: "rejectedBy.user_name",
        }
      );
      break;
    case "deleted":
      tableHeading?.splice(5, 3);
      tableHeading?.push(
        {
          title: "Deleted At",
          value: "deleted_at",
        },
        {
          title: "Deleted By",
          value: "deletedBy.user_name",
        }
      );
      break;
    case "expired":
      tableHeading?.splice(5, 3);
      tableHeading?.push({
        title: "Expired At",
        value: "expired_at",
      });
      break;
    default:
      tableHeading?.map((item) => item);
      break;
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
                {tableHeading?.map((item, index) => {
                  const isActiveSortIndex = activeSortIndex === index;
                  return (
                    <SearchInputfield
                      title={item?.title}
                      requestSort={requestSort}
                      sortName={item?.value}
                      key={item?.title}
                      index={index}
                      isActiveSortIndex={isActiveSortIndex}
                      setActiveSortIndex={setActiveSortIndex}
                      sortConfig={sortConfig}
                    />
                  );
                })}

                <th className="ongoing_heading_last_list"></th>
              </tr>
            </thead>
            <tbody className="light_blue_bg text-nowrap">
              <LoadAndError
                loader={loading}
                error={error}
                status={broadcastData?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item, id) => (
                  <tr key={id} className={"light_blue_bg text-nowrap"}>
                    <th scope="row">
                      <input
                        id={item?.id}
                        type="checkbox"
                        className="manage_fare_checkbox ms-2 "
                      />
                    </th>

                    <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.broadcast_code ?? "--"}
                        </span>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.user_type ?? "--"}
                      </span>
                    </td>

                    <td>
                      {item?.ZoneName ? (
                        <span className={"secondary_color fs_14 fw_500"}>
                          {item.ZoneName.length > 1
                            ? "All"
                            : item.ZoneName.find((zone) => zone.zone_name)
                                ?.zone_name}
                        </span>
                      ) : (
                        "--"
                      )}
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {item?.notification_title
                          ? item?.notification_title
                          : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item?.broadcast_status
                        )}  fs_14 fw_500`}
                      >
                        {item?.broadcast_status
                          ? insertSpaces(item?.broadcast_status)
                          : "--"}
                      </span>
                    </td>
                    {type === "reviewRequired" || type === "active" ? (
                      <td>
                        <span
                          className={`${statusColor(
                            item?.campaign_status
                          )}  fs_14 fw_500`}
                        >
                          {item?.campaign_status ?? "--"}
                        </span>
                      </td>
                    ) : (
                      <></>
                    )}

                    {type === "reviewRequired" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.created_at
                              ? moment(item?.created_at).format(
                                  "DD-MM-YYYY,HH:mm"
                                )
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.createdBy?.user_name
                              ? item?.createdBy?.user_name
                              : "--"}
                          </span>
                        </td>
                      </>
                    ) : type === "active" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.start_date)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.expiry_date)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.approved_at)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.approvedBy?.user_name
                              ? item?.approvedBy?.user_name
                              : "--"}
                          </span>
                        </td>
                      </>
                    ) : type === "rejected" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.rejected_at)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.rejectedBy?.user_name
                              ? item?.rejectedBy?.user_name
                              : "--"}
                          </span>
                        </td>
                      </>
                    ) : type === "deleted" ? (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {formatDateTime(item?.deleted_at)}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.deletedBy?.user_name
                              ? item?.deletedBy?.user_name
                              : "--"}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.expired_at
                              ? moment(item?.expired_at).format(
                                  "DD-MM-YYYY,HH:mm"
                                )
                              : "--"}
                          </span>
                        </td>
                      </>
                    )}

                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_14  me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={
                          type === "reviewRequired"
                            ? `review-required/view/${item?.id}`
                            : type === "active"
                            ? `active/view/${item?.id}`
                            : type === "rejected"
                            ? `rejected/view/${item?.id}`
                            : type === "deleted"
                            ? `deleted/view/${item?.id}`
                            : `expired/view/${item?.id}`
                        }
                        state={{
                          edit: false,
                          status: item?.broadcast_status,
                          zoneList: item?.ZoneName,
                          broadcast_applicable_zone:
                            item?.broadcast_applicable_zone,
                        }}
                      >
                        View
                      </NavLink>
                      {canWrite("rider_broadcast_review_required", "rider_broadcast_active") &&
                      (type === "reviewRequired" || type === "active") ? (
                        <NavLink
                          className="border_none border_radius text-decoration-none primary_bg white_color py-1 fs_14 px-3 view_text"
                          to={
                            type === "reviewRequired"
                              ? `review-required/edit/${item?.id}`
                              : type === "active"
                              ? `active/edit/${item?.id}`
                              : ""
                          }
                          state={{
                            edit: true,
                            status: item?.broadcast_status,
                            zoneList: item?.ZoneName,
                            broadcast_applicable_zone:
                              item?.broadcast_applicable_zone,
                          }}
                        >
                          Edit
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
      </div>
      {broadcastData?.length === 0 ? (
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

export default RiderBroadcastTable;
