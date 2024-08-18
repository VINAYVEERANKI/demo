import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  driverInprogressComplaintAction,
  driverInprogressComplaintsListAction,
  riderInprogressComplaintAction,
  riderInprogressComplaintsListAction,
} from "../../../redux/actions/complaints/inprogressComplaintsAction";
import {
  driverPendComplaintsListAction,
  driverPendingComplaintAction,
  riderPendComplaintsListAction,
  riderPendingComplaintAction,
} from "../../../redux/actions/complaints/pendingComplaintsAction";
import SearchInputfield from "../../form/searchInputfield";
import {
  applicationAge,
  navigationFn,
  driverNavigateFn,
  statusColor,
  useSortableData,
  riderNavigateFn,
  formatDateTime,
} from "../../helper";
import PendingComplaintsViewModal from "../modal/viewModal";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { NavLink } from "react-router-dom";
import {
  driverResColsedComplaintAction,
  riderResClosedComplaintAction,
} from "../../../redux/actions/complaints/resolvedAndClosedAction";
import * as pendingCompl from "../../../redux/actions/complaints/pendingComplaintsAction";
import * as inprogressCompl from "../../../redux/actions/complaints/inprogressComplaintsAction";
import ComplaintsFilter from "../complaintsFilter";
import { socket } from "../../../redux/config";
import InnerLayout from "../../layout/innerLayout";
import usePermissions from "../../usePermissionChecker";
import TablePaginations from "../../utilits/pagination";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const ComplaintsTable = ({ type = "", navLocation }) => {
  const { canRead } = usePermissions();
  const pagePermissions = {
    driverPendingComplaints: "driver_pending_complaints",
    driverInprogressComplaints: "driver_inprogress_complaint",
    riderPendingComplaints: "rider_pending_complaints",
    riderInprogressComplaints: "rider_inprogress_complaint",
  };
  const permission = pagePermissions[type];

  const [pendComplaintsView, setPendComplaintsView] = useState(false);
  const handlePendComplaintsViewClose = () => setPendComplaintsView(false);
  const handlePendComplaintsViewShow = () => setPendComplaintsView(true);
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
  const [complaintData, setComplaintData] = useState([]);
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
    if (type === "riderPendingComplaints") {
      dispatch(
        pendingCompl?.riderComplPendingDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "riderInprogressComplaints") {
      dispatch(
        inprogressCompl?.riderComplInprogressDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "driverPendingComplaints") {
      dispatch(
        pendingCompl?.driverComplPendingDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "driverInprogressComplaints") {
      dispatch(
        inprogressCompl?.driverComplInprogressDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data);
    if (type === "riderPendingComplaints") {
      setComplDropdownList({
        complaint_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_id2)
              ?.filter((complaint_id) => Boolean(complaint_id))
          ),
        ].map((id) => ({ complaint_id: id })),
        source_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.source)
              ?.filter((source_type) => Boolean(source_type))
          ),
        ].map((source_type) => ({
          source_type: source_type,
        })),
        booking_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.booking_id_2)
              ?.filter((booking_id) => Boolean(booking_id))
          ),
        ].map((booking_id) => ({ booking_id: booking_id })),
        rider_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.rider_id_2)
              ?.filter((rider_id) => Boolean(rider_id))
          ),
        ].map((rider_id) => ({ rider_id: rider_id })),
        priority_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.priority_type)
              ?.filter((priority_type) => Boolean(priority_type))
          ),
        ].map((priority_type) => ({ priority_type: priority_type })),

        complaint_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_type)
              ?.filter((complaint_type) => Boolean(complaint_type))
          ),
        ].map((complaint_type) => ({
          complaint_type: complaint_type,
        })),
        complaint_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_title)
              ?.filter((complaint_title) => Boolean(complaint_title))
          ),
        ].map((complaint_title) => ({ complaint_title: complaint_title })),
        generated_at: [
          ...new Set(
            data?.data
              ?.map((item) => item?.generated_at)
              .filter((generated_at) => Boolean(generated_at))
          ),
        ].map((generated_at) => ({ generated_at: generated_at })),
        current_owner: [
          ...new Set(
            data?.data
              ?.map((item) => item?.CurrentOwnerName?.user_name)
              ?.filter((current_owner) => Boolean(current_owner))
          ),
        ].map((current_owner) => ({ current_owner: current_owner })),
      });
    } else if (type === "riderInprogressComplaints") {
      setComplDropdownList({
        complaint_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_id2)
              ?.filter((complaint_id) => Boolean(complaint_id))
          ),
        ].map((id) => ({ complaint_id: id })),
        source_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.source)
              ?.filter((source_type) => Boolean(source_type))
          ),
        ].map((source_type) => ({
          source_type: source_type,
        })),
        booking_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.booking_id_2)
              ?.filter((booking_id) => Boolean(booking_id))
          ),
        ].map((booking_id) => ({ booking_id: booking_id })),
        rider_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.rider_id_2)
              ?.filter((rider_id) => Boolean(rider_id))
          ),
        ].map((rider_id) => ({ rider_id: rider_id })),
        priority_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.priority_type)
              ?.filter((priority_type) => Boolean(priority_type))
          ),
        ].map((priority_type) => ({ priority_type: priority_type })),

        complaint_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_type)
              ?.filter((complaint_type) => Boolean(complaint_type))
          ),
        ].map((complaint_type) => ({
          complaint_type: complaint_type,
        })),
        complaint_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_title)
              ?.filter((complaint_title) => Boolean(complaint_title))
          ),
        ].map((complaint_title) => ({ complaint_title: complaint_title })),
        generated_at: [
          ...new Set(
            data?.data
              ?.map((item) => item?.generated_at)
              .filter((generated_at) => Boolean(generated_at))
          ),
        ].map((generated_at) => ({ generated_at: generated_at })),
        current_owner: [
          ...new Set(
            data?.data
              ?.map((item) => item?.CurrentOwnerName?.user_name)
              ?.filter((current_owner) => Boolean(current_owner))
          ),
        ].map((current_owner) => ({ current_owner: current_owner })),
      });
    } else if (type === "driverPendingComplaints") {
      setComplDropdownList({
        complaint_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_id2)
              ?.filter((complaint_id) => Boolean(complaint_id))
          ),
        ].map((id) => ({ complaint_id: id })),
        source_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.source)
              ?.filter((source_type) => Boolean(source_type))
          ),
        ].map((source_type) => ({
          source_type: source_type,
        })),
        booking_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.booking_id_2)
              ?.filter((booking_id) => Boolean(booking_id))
          ),
        ].map((booking_id) => ({ booking_id: booking_id })),
        driver_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.driver_id2)
              ?.filter((driver_id) => Boolean(driver_id))
          ),
        ].map((driver_id) => ({ driver_id: driver_id })),
        priority_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.priority_type)
              ?.filter((priority_type) => Boolean(priority_type))
          ),
        ].map((priority_type) => ({ priority_type: priority_type })),

        complaint_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_type)
              ?.filter((complaint_type) => Boolean(complaint_type))
          ),
        ].map((complaint_type) => ({
          complaint_type: complaint_type,
        })),
        complaint_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_title)
              ?.filter((complaint_title) => Boolean(complaint_title))
          ),
        ].map((complaint_title) => ({ complaint_title: complaint_title })),
        current_owner: [
          ...new Set(
            data?.data
              ?.map((item) => item?.CurrentOwnerName?.user_name)
              ?.filter((current_owner) => Boolean(current_owner))
          ),
        ].map((current_owner) => ({ current_owner: current_owner })),
        generated_at: [
          ...new Set(
            data?.data
              ?.map((item) => item?.generated_at)
              ?.filter((generated_at) => Boolean(generated_at))
          ),
        ].map((generated_at) => ({ generated_at: generated_at })),
      });
    } else if (type === "driverInprogressComplaints") {
      setComplDropdownList({
        complaint_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_id2)
              ?.filter((complaint_id) => Boolean(complaint_id))
          ),
        ].map((id) => ({ complaint_id: id })),
        source_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.source)
              ?.filter((source_type) => Boolean(source_type))
          ),
        ].map((source_type) => ({
          source_type: source_type,
        })),
        booking_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.booking_id_2)
              ?.filter((booking_id) => Boolean(booking_id))
          ),
        ].map((booking_id) => ({ booking_id: booking_id })),
        driver_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.driver_id2)
              ?.filter((driver_id) => Boolean(driver_id))
          ),
        ].map((driver_id) => ({ driver_id: driver_id })),
        priority_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.priority_type)
              ?.filter((priority_type) => Boolean(priority_type))
          ),
        ].map((priority_type) => ({ priority_type: priority_type })),

        complaint_type: [
          ...new Set(
            data?.data
              ?.map((item) => item?.complaint_type)
              ?.filter((complaint_type) => Boolean(complaint_type))
          ),
        ].map((complaint_type) => ({
          complaint_type: complaint_type,
        })),
        complaint_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.complaint_title)
              ?.filter((complaint_title) => Boolean(complaint_title))
          ),
        ].map((complaint_title) => ({ complaint_title: complaint_title })),
        generated_at: [
          ...new Set(
            data?.data
              ?.map((item) => item?.generated_at)
              .filter((generated_at) => Boolean(generated_at))
          ),
        ].map((generated_at) => ({ generated_at: generated_at })),
        current_owner: [
          ...new Set(
            data?.data
              ?.map((item) => item?.CurrentOwnerName?.user_name)
              ?.filter((current_owner) => Boolean(current_owner))
          ),
        ].map((current_owner) => ({ current_owner: current_owner })),
      });
    }
  };
  const onDropDownListError = (data) => {
    console.log(data?.data);
  };

  useEffect(() => {
    if (type === "riderPendingComplaints") {
      setLoading(true);
      dispatch(
        riderPendComplaintsListAction(
          {
            search: {
              complaint_id2: search?.complaint_id ?? "",
              // complented_at:search?. "",
              booking_id_2: search?.booking_id ?? "",
              rider_id2: search?.rider_id ?? "",
              priority_type: search?.priority_type ?? "",
              complaint_title: search?.complaint_title ?? "",
              // complaint_status:search?.complaint_status?? "",
              // current_owner: "",
              generated_at: search?.generated_at ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "driverPendingComplaints") {
      setLoading(true);

      dispatch(
        driverPendComplaintsListAction(
          {
            search: {
              complaint_id2: search?.complaint_id ?? "",
              // complented_at: search?."",
              booking_id_2: search?.booking_id ?? "",
              driver_id2: search?.driver_id ?? "",
              priority_type: search?.priority_type ?? "",
              complaint_title: search?.complaint_title ?? "",
              // complaint_status:search?.complaint_status ?? "",
              current_owner: search?.current_owner ?? "",
              generated_at: search?.generated_at ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "riderInprogressComplaints") {
      setLoading(true);
      dispatch(
        riderInprogressComplaintsListAction(
          {
            search: {
              complaint_id2: search?.complaint_id ?? "",
              source: search?.source_type ?? "",
              // complented_at: "",
              // last_active_at: "",
              booking_id_2: search?.booking_id ?? "",
              rider_id2: search?.rider_id ?? "",
              priority_type: search?.priority_type ?? "",
              complaint_type: search?.complaint_type ?? "",
              // assigned_at:search?. "",
              // initiated_at: "",
              generated_at: search?.generated_at ?? "",
              current_owner: search?.current_owner ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "driverInprogressComplaints") {
      setLoading(true);
      dispatch(
        driverInprogressComplaintsListAction(
          {
            search: {
              complaint_id2: search?.complaint_id ?? "",
              source: search?.source_type ?? "",
              // complented_at: "",
              // last_active_at: "",
              booking_id_2: search?.booking_id ?? "",
              driver_id2: search?.driver_id ?? "",
              priority_type: search?.priority_type ?? "",
              complaint_type: search?.complaint_type ?? "",
              // assigned_at: "",
              // initiated_at: "",
              current_owner: search?.current_owner ?? "",
              generated_at: search?.generated_at ?? "",
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
    setError(true);
    setErrorMessage(data?.data?.data);
  };

  function complaintsViewModalFn(id) {
    if (type === "riderPendingComplaints") {
      dispatch(
        riderPendingComplaintAction(
          {
            complaint_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "riderInprogressComplaints") {
      dispatch(
        riderInprogressComplaintAction(
          {
            complaint_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "driverPendingComplaints") {
      dispatch(
        driverPendingComplaintAction(
          {
            complaint_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "driverInprogressComplaints") {
      dispatch(
        driverInprogressComplaintAction(
          {
            complaint_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "driverResolvedClosedComplaints") {
      dispatch(
        driverResColsedComplaintAction(
          {
            complaint_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "riderResolvedClosedComplaints") {
      dispatch(
        riderResClosedComplaintAction(
          {
            complaint_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }

  const onFetchSuccess = (data) => {
    setLoading(false);
    setComplaintData(data?.data);
    console.log(data);
    handlePendComplaintsViewShow();
  };

  const onFetchError = (data) => {
    setLoading(false);
    console.log(data);
    // errorToast(data?.data?.data);
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
    { title: "Complaint Age", value: "complented_at" },
    { title: "Last Active At", value: "last_active_at" },
    { title: "Booking ID", value: "booking.booking_id_2" },
    {
      title:
        type === "driverPendingComplaints" ||
        type === "driverInprogressComplaints"
          ? "Driver ID"
          : "Rider ID",
      value:
        type === "driverPendingComplaints" ||
        type === "driverInprogressComplaints"
          ? "booking.driver_id2"
          : "booking.rider_id_2",
    },
    { title: "Priority Type", value: "priority_type" },
    { title: "Complaint Type", value: "complaint_type" },
    { title: "Complaint Title", value: "complaint_title" },
    { title: "Received/ Generated At", value: "complented_at" },
    { title: "Current Owner", value: "CurrentOwnerName.user_name" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(complaintsList);

  useEffect(() => {
    socket.on("driver_inprogress_complaint", (data) => {
      setSocketChange(data);
    });
    socket.on("driver_pending_complaint", (data) => {
      setSocketChange(data);
    });
    socket.on("rider_inprogress_complaint", (data) => {
      setSocketChange(data);
    });
    socket.on("rider_pending_complaint", (data) => {
      setSocketChange(data);
    });
  }, [socket, reload]);

  console.log(complaintsList, "skfsad");

  const buttonList = [
    <>
      {canRead(permission) && (
        <div className="d-flex justify-content-end gap-3 align-items-center mx-3 mt-2">
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

  console.log(complaintsList, "sfjfkjasa");

  return (
    <>
      <InnerLayout
        mainHeading={
          type === "riderPendingComplaints" ||
          type === "driverPendingComplaints"
            ? "Pending Complaints"
            : "Inprogress Complaints"
        }
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
        <div className=" mt-3">
          <div className="row">
            <div className="col-md-12 table_container">
              {loading && <LoadingSpinnerTable />}
              <table className="table">
                <thead>
                  <tr className="pale_blue_bg ">
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
                <tbody className="light_blue_bg">
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
                          <span className="secondary_color fs_14 fw_500">
                            {item?.complented_at
                              ? applicationAge(new Date(item?.complented_at))
                              : item?.generated_at
                              ? applicationAge(new Date(item?.generated_at))
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.last_active_at
                              ? moment(item?.last_active_at).format(
                                  "DD-MM-YYYY,HH:mm"
                                )
                              : "--"}
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
                              type === "driverPendingComplaints"
                                ? driverNavigateFn(
                                    item?.booking?.driver,
                                    item?.booking?.driver?.id
                                  )
                                : type === "driverInprogressComplaints"
                                ? driverNavigateFn(
                                    item?.driver,
                                    item?.driver?.id
                                  )
                                : type === "riderPendingComplaints" ||
                                  type === "riderInprogressComplaints"
                                ? riderNavigateFn(item?.rider, item?.rider?.id)
                                : ""
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
                            {item?.complaint_title ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.complented_at
                              ? formatDateTime(item?.complented_at)
                              : item?.generated_at
                              ? formatDateTime(item?.generated_at)
                              : "--"}
                          </span>
                        </td>
                        <td>
                          {type === "riderInprogressComplaints" ||
                          type === "driverInprogressComplaints" ? (
                            <span className="secondary_color fs_14 fw_500">
                              {item?.CurrentOwnerName?.user_name ?? "--"}
                            </span>
                          ) : (
                            <span
                              className={`${statusColor(
                                item?.complaint_status
                              )} fs_14 fw_500`}
                            >
                              {item?.complaint_status ?? "--"}
                            </span>
                          )}
                        </td>
                        <td className="">
                          <button
                            className="border_none border_radius fs_14 me-3 fw_500 px-3 
                            white_color blue_color_bg"
                            onClick={() => {
                              complaintsViewModalFn(item?.id);
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
    </>
  );
};

export default ComplaintsTable;
