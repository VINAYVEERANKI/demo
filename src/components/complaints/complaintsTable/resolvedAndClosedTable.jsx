import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchInputfield from "../../form/searchInputfield";
import {
  applicationAge,
  driverNavigateFn,
  navigationFn,
  riderNavigateFn,
  useSortableData,
} from "../../helper";
import errorToast from "../../utilits/errorToast";
import DriverResolvedMobileAppViewModal from "../modal/mobile-app-view-modal";
import {
  driverResColsedComplaintAction,
  driverResolvedClosedComplaintsListAction,
  riderResClosedComplaintAction,
  riderResolvedClosedComplaintsListAction,
} from "../../../redux/actions/complaints/resolvedAndClosedAction";
import PendingComplaintsViewModal from "../modal/viewModal";
import moment from "moment";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import LoadAndError from "../../utilits/loadAndError";
import { NavLink } from "react-router-dom";
import ComplaintsFilter from "../complaintsFilter";
import * as resolvedCompl from "../../../redux/actions/complaints/resolvedAndClosedAction";
import { socket } from "../../../redux/config";
import usePermissions from "../../usePermissionChecker";
import InnerLayout from "../../layout/innerLayout";
import TablePaginations from "../../utilits/pagination";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const ResolvedAndClosedComplaintsTable = ({ type = "", navLocation }) => {
  const { canRead } = usePermissions();
  const pagePermissions = {
    riderResolvedClosedComplaints: "rider_resloved_closed_complaint",
    driverResolvedClosedComplaints: "driver_resloved_closed_complaint",
  };
  const permission = pagePermissions[type];
  const [pendComplaintsView, setPendComplaintsView] = useState(false);
  const handlePendComplaintsViewClose = () => setPendComplaintsView(false);
  const handlePendComplaintsViewShow = () => setPendComplaintsView(true);

  const [driverResolveCMPTMobileAppView, setDriverResolveCMPTMobileAppView] =
    useState(false);
  const handleDriverResolveCMPTMobileAppViewClose = () =>
    setDriverResolveCMPTMobileAppView(false);
  const handleDriverResolveCMPTMobileAppViewShow = () =>
    setDriverResolveCMPTMobileAppView(true);

  const [socketChange, setSocketChange] = useState([]);

  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  useEffect(() => {
    setCheckList(navLocation?.state?.id);
  }, [navLocation?.state?.id]);

  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [complaintsList, setComplaintsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (value) => {
    setNumberOfFilters(0);
    setSearch(value);
    for (let key in value) {
      if (value[key]) {
        setNumberOfFilters((prev) => prev + 1);
      }
    }
    setPage(0);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const [complDropdownList, setComplDropdownList] = useState({});

  const handleFetchDropDownList = () => {
    if (type === "riderResolvedClosedComplaints") {
      dispatch(
        resolvedCompl?.riderComplReslovedDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "driverResolvedClosedComplaints") {
      dispatch(
        resolvedCompl?.driverComplReslovedDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data);
    if (type === "riderResolvedClosedComplaints") {
      setComplDropdownList({
        complaint_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_id2)
              .filter((complaint_id) => Boolean(complaint_id))
          ),
        ].map((id) => ({ complaint_id: id })),
        source_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.source)
              .filter((source_type) => Boolean(source_type))
          ),
        ].map((source_type) => ({
          source_type: source_type,
        })),
        booking_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.booking_id_2)
              .filter((booking_id) => Boolean(booking_id))
          ),
        ].map((booking_id) => ({ booking_id: booking_id })),
        rider_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.rider_id_2)
              .filter((rider_id) => Boolean(rider_id))
          ),
        ].map((rider_id) => ({ rider_id: rider_id })),
        priority_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.priority_type)
              .filter((priority_type) => Boolean(priority_type))
          ),
        ].map((priority_type) => ({ priority_type: priority_type })),

        complaint_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_type)
              .filter((complaint_type) => Boolean(complaint_type))
          ),
        ].map((complaint_type) => ({
          complaint_type: complaint_type,
        })),
        complaint_title: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_title)
              .filter((complaint_title) => Boolean(complaint_title))
          ),
        ].map((complaint_title) => ({ complaint_title: complaint_title })),
        complaint_status: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_status)
              .filter((complaint_status) => Boolean(complaint_status))
          ),
        ].map((complaint_status) => ({ complaint_status: complaint_status })),
        generated_at: [
          ...new Set(
            data?.data
              ?.map((item) => item?.generated_at)
              .filter((generated_at) => Boolean(generated_at))
          ),
        ].map((generated_at) => ({ generated_at: generated_at })),
        resolved_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.ReslovedBy?.user_name)
              ?.filter((resolved_by) => Boolean(resolved_by))
          ),
        ].map((resolved_by) => ({ resolved_by: resolved_by })),
        closed_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.ClosedBy?.user_name)
              .filter((closed_by) => Boolean(closed_by))
          ),
        ].map((closed_by) => ({ closed_by: closed_by })),
      });
    } else if (type === "driverResolvedClosedComplaints") {
      setComplDropdownList({
        complaint_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_id2)
              .filter((complaint_id) => Boolean(complaint_id))
          ),
        ].map((id) => ({ complaint_id: id })),
        source_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.source)
              .filter((source_type) => Boolean(source_type))
          ),
        ].map((source_type) => ({
          source_type: source_type,
        })),
        booking_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.booking_id_2)
              .filter((booking_id) => Boolean(booking_id))
          ),
        ].map((booking_id) => ({ booking_id: booking_id })),
        driver_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.driver_id2)
              .filter((driver_id) => Boolean(driver_id))
          ),
        ].map((driver_id) => ({ driver_id: driver_id })),
        priority_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.priority_type)
              .filter((priority_type) => Boolean(priority_type))
          ),
        ].map((priority_type) => ({ priority_type: priority_type })),

        complaint_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_type)
              .filter((complaint_type) => Boolean(complaint_type))
          ),
        ].map((complaint_type) => ({
          complaint_type: complaint_type,
        })),
        complaint_title: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_title)
              .filter((complaint_title) => Boolean(complaint_title))
          ),
        ].map((complaint_title) => ({ complaint_title: complaint_title })),
        complaint_status: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_status)
              .filter((complaint_status) => Boolean(complaint_status))
          ),
        ].map((complaint_status) => ({ complaint_status: complaint_status })),
        resolved_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.ReslovedBy?.user_name)
              ?.filter((resolved_by) => Boolean(resolved_by))
          ),
        ].map((resolved_by) => ({ resolved_by: resolved_by })),
        generated_at: [
          ...new Set(
            data?.data
              ?.map((item) => item?.generated_at)
              .filter((generated_at) => Boolean(generated_at))
          ),
        ].map((generated_at) => ({ generated_at: generated_at })),
        closed_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.ClosedBy?.user_name)
              .filter((closed_by) => Boolean(closed_by))
          ),
        ].map((closed_by) => ({ closed_by: closed_by })),
      });
    }
  };
  const onDropDownListError = (data) => {
    console.log(data?.data);
  };

  console.log(complDropdownList);

  useEffect(() => {
    if (type === "riderResolvedClosedComplaints") {
      setLoading(true);
      dispatch(
        riderResolvedClosedComplaintsListAction(
          {
            search: {
              complaint_id2: search?.complaint_id ?? "",
              source: search?.source_type ?? "",
              // complented_at:search?. "",
              booking_id_2: search?.booking_id ?? "",
              rider_id2: search?.rider_id ?? "",
              priority_type: search?.priority_type ?? "",
              complaint_type: search?.complaint_type ?? "",
              generated_at: search?.generated_at ?? "",
              complaint_status: search?.complaint_status ?? "",
              resolved_by: search?.resolved_by ?? "",
              closed_by: search?.closed_by ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "driverResolvedClosedComplaints") {
      setLoading(true);
      dispatch(
        driverResolvedClosedComplaintsListAction(
          {
            search: {
              complaint_id2: search?.complaint_id ?? "",
              source: search?.source_type ?? "",
              // complented_at: "",
              booking_id_2: search?.booking_id ?? "",
              driver_id2: search?.driver_id ?? "",
              priority_type: search?.priority_type ?? "",
              complaint_type: search?.complaint_type ?? "",
              generated_at: search?.generated_at ?? "",
              complaint_status: search?.complaint_status ?? "",
              resolved_by: search?.resolved_by ?? "",
              closed_by: search?.closed_by ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, reload, socketChange]);

  const onSuccess = (data) => {
    setComplaintsList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
  };
  console.log(pageData, "jsdhlkadsa");

  const [complaintData, setComplaintData] = useState([]);

  function complaintsViewModalFn(item) {
    if (type === "driverResolvedClosedComplaints") {
      dispatch(
        driverResColsedComplaintAction(
          {
            complaint_id: item?.id,
          },
          onFetchSuccess.bind(null, item),
          onFetchError
        )
      );
    } else if (type === "riderResolvedClosedComplaints") {
      dispatch(
        riderResClosedComplaintAction(
          {
            complaint_id: item?.id,
          },
          onFetchSuccess.bind(null, item),
          onFetchError
        )
      );
    }
  }

  const onFetchSuccess = (item, data) => {
    setLoading(false);
    setComplaintData(data?.data);
    console.log(data);
    console.log(item, "daaaaaaaaaaaaaaaaaaaaaa");
    if (item?.source === "Call") {
      handlePendComplaintsViewShow();
    } else if (item?.source === "MobileApp") {
      handleDriverResolveCMPTMobileAppViewShow();
    }
  };

  const onFetchError = (data) => {
    setLoading(false);
    console.log(data);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  const handlePageChange = (event) => {
    setPage(Number(event.target.value) - 1);
    setCurrentPage(page);
  };

  const complaintsTableHeading = [
    { title: "Complaint ID", value: "complaint_id2" },
    { title: "Source", value: "source" },
    { title: "Booking ID", value: "booking.booking_id_2" },
    {
      title:
        type === "driverResolvedClosedComplaints" ? "Driver ID" : "Rider ID",
      value:
        type === "driverResolvedClosedComplaints"
          ? "booking.driver_id2"
          : "booking.rider_id_2",
    },
    { title: "Priority Type", value: "priority_type" },
    { title: "Complaint Type", value: "complaint_type" },
    { title: "Received/ Generated At", value: "generated_at" },
    { title: "Complaint Age", value: "generated_at" },
    { title: "Status", value: "complaint_status" },
    {
      title: "Resolved/Closed by",
      value: "resolvedOrClosedByName",
    },
  ];
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(complaintsList);
  useEffect(() => {
    socket.on("driver_resloved_complaint", (data) => {
      setSocketChange(data);
    });
    socket.on("rider_resloved_complaint", (data) => {
      setSocketChange(data);
    });
  }, [socket, reload]);

  const buttonList = [
    <>
      {canRead(permission) && (
        <div className="d-sm-flex justify-content-end gap-3 align-items-center mx-sm-3 mt-2">
          <div className="position-relative">
            <button
              className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
              type="button"
              onClick={() => {
                handleFetchDropDownList();
              }}
            >
              <i className="ri-filter-3-line primary_color pe-2" />
              <span className={`fs_14 fw_600 primary_color ps-1`}>
                Add Filter
              </span>
            </button>
            {numberOfFilters === 0 ? (
              <></>
            ) : (
              <div className={`p-1`}>
                <span
                  className={`complaint_filter_number_container position-absolute fw_700 fs_16 text-center white_color`}
                >
                  {numberOfFilters}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>,
  ];

  console.log(complaintsList, "dkjhsdklf");
  return (
    <InnerLayout
      mainHeading={"Resolved/Closed Complaints"}
      navigateEnable={false}
      backBtnClassName={"ms-4"}
      buttons={buttonList}
    >
      <div className="position-relative">
        {showFilter ? (
          <div className="complaint_filter_container position-absolute">
            <ComplaintsFilter
              filter={handleSearch}
              search={search}
              handleFilterClose={handleFilterClose}
              complDropdownList={complDropdownList}
              type={type}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-3">
        <div className="row">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table">
              <thead>
                <tr className="pale_blue_bg">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>
                  {complaintsTableHeading?.map((item, index) => {
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

                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>
              <tbody className="light_blue_bg ">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={complaintsList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {items?.map((item) => (
                    <tr
                      key={item?.id}
                      className={`${
                        item?.id === checkList ? "light_blue_bg" : null
                      } text-nowrap`}
                    >
                      <th scope="row">
                        <input
                          checked={checkList === item?.id}
                          id={item?.id}
                          type="checkbox"
                          className="manage_fare_checkbox ms-2"
                          onChange={checkboxChecker}
                        />
                      </th>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.complaint_id2 ?? "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.source ?? "--"}
                        </span>
                      </td>
                      <td>
                        <NavLink
                          className=" secondary_color"
                          to={navigationFn(
                            item?.booking?.booking_classification,
                            item?.booking?.id
                          )}
                          // target='_blank'
                        >
                          <span className="secondary_color  fs_14 fw_500">
                            {item?.booking?.booking_id_2
                              ? item?.booking?.booking_id_2
                              : "--"}
                          </span>
                        </NavLink>
                      </td>
                      <td>
                        <NavLink
                          className=" secondary_color"
                          to={
                            type === "driverResolvedClosedComplaints"
                              ? driverNavigateFn(item?.driver, item?.driver?.id)
                              : riderNavigateFn(item?.rider, item?.rider?.id)
                          }
                          // target='_blank'
                        >
                          <span className="secondary_color  fs_14 fw_500">
                            {item?.booking?.rider_id_2 ??
                              item?.booking?.driver_id2 ??
                              "--"}
                          </span>
                        </NavLink>
                        {/* <a className="secondary_color fs_14 fw_500">
                          {item?.booking?.rider_id_2 ??
                            item?.booking?.driver_id2 ??
                            "--"}
                        </a> */}
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.priority_type ?? "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.complaint_type ?? "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.generated_at
                            ? moment(item?.generated_at).format(
                                "DD-MM-YYYY,HH:mm"
                              )
                            : item?.complented_at
                            ? moment(item?.complented_at).format(
                                "DD-MM-YYYY,HH:mm"
                              )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.complented_at
                            ? applicationAge(new Date(item?.complented_at))
                            : item?.generated_at
                            ? applicationAge(new Date(item?.generated_at))
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={` ${
                            item?.complaint_status === "Resolved"
                              ? "green_color"
                              : "secondary_color"
                          }  fs_14 fw_500`}
                        >
                          {item?.complaint_status ?? "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.ReslovedBy?.user_name ??
                            item?.ClosedBy?.user_name ??
                            "--"}
                        </span>
                      </td>
                      <td className="">
                        <button
                          className="border_none border_radius fs_14 me-3 fw_500 px-3 
                            white_color blue_color_bg"
                          onClick={() => {
                            complaintsViewModalFn(item);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>
            <PendingComplaintsViewModal
              pendComplaintsView={pendComplaintsView}
              handlePendComplaintsViewClose={handlePendComplaintsViewClose}
              type={type}
              setReload={setReload}
              reload={reload}
              complaintData={complaintData}
            />

            <DriverResolvedMobileAppViewModal
              driverResolveCMPTMobileAppView={driverResolveCMPTMobileAppView}
              handleDriverResolveCMPTMobileAppViewClose={
                handleDriverResolveCMPTMobileAppViewClose
              }
              type={type}
              setReload={setReload}
              reload={reload}
              complaintList={complaintData}
            />
          </div>
        </div>
      </div>
      {complaintsList?.length === 0 ? (
        <></>
      ) : (
        <TablePaginations
          paginate={handlePagination}
          handleChange={handlePageChange}
          currentPage={page}
          pageData={pageData}
        />
      )}
    </InnerLayout>
  );
};

export default ResolvedAndClosedComplaintsTable;
