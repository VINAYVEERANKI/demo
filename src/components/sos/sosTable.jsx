import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  driverInprogressSOSAction,
  driverInprogressSOSListAction,
  driverSOSInprogressDropDownAction,
  riderInprogressSOSAction,
  riderInprogressSOSListAction,
  riderSOSInprogressDropDownAction,
} from "../../redux/actions/sos/inprogressSosAction";
import {
  driverPendSOSListAction,
  driverPendingSOSAction,
  driverSOSPendingDropDownAction,
  riderPendSOSListAction,
  riderPendingSOSAction,
  riderSOSPendingDropDownAction,
} from "../../redux/actions/sos/pendingSosAction";
import SearchInputfield from "../form/searchInputfield";
import {
  applicationAge,
  driverNavigateFn,
  formatDateTime,
  navigationFn,
  riderNavigateFn,
  statusColor,
  useSortableData,
} from "../helper";
import InnerLayout from "../layout/innerLayout";
import errorToast from "../utilits/errorToast";
import LoadAndError from "../utilits/loadAndError";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import RiderGenerateSosModal from "./modal/generate-sos-modal";
import SOSViewModal from "./modal/sosViewModal";
import ErrorMessagemodal from "../modals/errorMessageModal";
import SosFilter from "./sosFilter";
import usePermissions from "../usePermissionChecker";
import { NavLink, useLocation } from "react-router-dom";
import TablePaginations from "../utilits/pagination";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const SosTable = ({ type = "" }) => {
  const location = useLocation();
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    pendingRiderSos: "pending_create_rider_sos",
    inprogressRiderSos: "inprogress_rider_sos",
    pendingDriverSos: "pending_create_driver_sos",
    inprogressDriverSos: "inprogress_driver_sos",
  };
  const permission = pagePermissions[type];
  const [checkList, setCheckList] = useState();
  const dispatch = useDispatch();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  const [riderObject, setRiderObject] = useState({});

  const [inProgRiderSOSView, setPendRiderSOSView] = useState(false);
  const handleInProgRiderSosViewClose = () => setPendRiderSOSView(false);
  const handlePendRiderSosViewShow = () => setPendRiderSOSView(true);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [sosList, setSosList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [generateSosShow, setGenerateSosShow] = useState(false);
  const handleGenerateSosClose = () => setGenerateSosShow(false);
  const handleGenerateSosShow = () => setGenerateSosShow(true);

  const [sosViewModal, setSosViewModal] = useState(false);
  const handleSosViewClose = () => setSosViewModal(false);
  const handleSosViewShow = () => setSosViewModal(true);
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageShow = () => {
    setErrorMessageShow(true);
  };
  const handleErrorMessageClose = () => {
    setErrorMessageShow(false);
  };
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

  const [sosDropdownList, setSosDropdownList] = useState({});

  const handleFetchDropDownList = () => {
    if (type === "pendingRiderSos") {
      dispatch(
        riderSOSPendingDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "inprogressRiderSos") {
      dispatch(
        riderSOSInprogressDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "pendingDriverSos") {
      dispatch(
        driverSOSPendingDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "inprogressDriverSos") {
      dispatch(
        driverSOSInprogressDropDownAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data);
    if (type === "pendingRiderSos") {
      setSosDropdownList({
        sos_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.sos_id2)
              ?.filter((sos_id) => Boolean(sos_id))
          ),
        ].map((id) => ({ sos_id: id })),
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
              ?.map((item) => item?.rider?.rider_id2)
              ?.filter((rider_id) => Boolean(rider_id))
          ),
        ].map((rider_id) => ({ rider_id: rider_id })),
        first_name: [
          ...new Set(
            data?.data
              ?.map((item) => item?.rider?.first_name)
              ?.filter((first_name) => Boolean(first_name))
          ),
        ].map((first_name) => ({ first_name: first_name })),

        phone_number: [
          ...new Set(
            data?.data
              ?.map((item) => item?.rider?.phone_number)
              ?.filter((phone_number) => Boolean(phone_number))
          ),
        ].map((phone_number) => ({
          phone_number: phone_number,
        })),
        driver_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.driver_id2)
              ?.filter((driver_id) => Boolean(driver_id))
          ),
        ].map((driver_id) => ({ driver_id: driver_id })),
        // current_owner: [
        //   ...new Set(data?.data?.map((item) => item.current_owner)),
        // ].map((current_owner) => ({ current_owner: current_owner })),
      });
    } else if (type === "inprogressRiderSos") {
      setSosDropdownList({
        sos_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.sos_id2)
              ?.filter((sos_id) => Boolean(sos_id))
          ),
        ].map((id) => ({ sos_id: id })),
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
              ?.map((item) => item?.rider?.rider_id2)
              ?.filter((rider_id) => Boolean(rider_id))
          ),
        ].map((rider_id) => ({ rider_id: rider_id })),
        first_name: [
          ...new Set(
            data?.data
              ?.map((item) => item?.rider?.first_name)
              ?.filter((first_name) => Boolean(first_name))
          ),
        ].map((first_name) => ({ first_name: first_name })),

        phone_number: [
          ...new Set(
            data?.data
              ?.map((item) => item?.rider?.phone_number)
              ?.filter((phone_number) => Boolean(phone_number))
          ),
        ].map((phone_number) => ({
          phone_number: phone_number,
        })),
        driver_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking?.driver_id2)
              ?.filter((driver_id) => Boolean(driver_id))
          ),
        ].map((driver_id) => ({ driver_id: driver_id })),
        current_owner: [
          ...new Set(
            data?.data
              ?.map((item) => item?.CurrentOwnerName?.user_name)
              ?.filter((current_owner) => Boolean(current_owner))
          ),
        ].map((current_owner) => ({ current_owner: current_owner })),
      });
    } else if (type === "pendingDriverSos") {
      setSosDropdownList({
        sos_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.sos_id2)
              ?.filter((sos_id) => Boolean(sos_id))
          ),
        ].map((id) => ({ sos_id: id })),
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

        driver_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.driver?.driver_id2)
              ?.filter((driver_id) => Boolean(driver_id))
          ),
        ].map((driver_id) => ({ driver_id: driver_id })),
        first_name: [
          ...new Set(
            data?.data
              ?.map((item) => item?.driver?.first_name)
              ?.filter((first_name) => Boolean(first_name))
          ),
        ].map((first_name) => ({ first_name: first_name })),
        phone_number: [
          ...new Set(
            data?.data
              ?.map((item) => item?.driver?.phone_number)
              ?.filter((phone_number) => Boolean(phone_number))
          ),
        ].map((phone_number) => ({
          phone_number: phone_number,
        })),
        // current_owner: [
        //   ...new Set(data?.data?.map((item) => item.current_owner)),
        // ].map((current_owner) => ({ current_owner: current_owner })),
      });
    } else if (type === "inprogressDriverSos") {
      setSosDropdownList({
        sos_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.sos_id2)
              ?.filter((sos_id) => Boolean(sos_id))
          ),
        ].map((id) => ({ sos_id: id })),
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

        driver_id: [
          ...new Set(
            data?.data
              ?.map((item) => item?.driver?.driver_id2)
              ?.filter((driver_id) => Boolean(driver_id))
          ),
        ].map((driver_id) => ({ driver_id: driver_id })),
        first_name: [
          ...new Set(
            data?.data
              ?.map((item) => item?.driver?.first_name)
              ?.filter((first_name) => Boolean(first_name))
          ),
        ].map((first_name) => ({ first_name: first_name })),
        phone_number: [
          ...new Set(
            data?.data
              ?.map((item) => item?.driver?.phone_number)
              ?.filter((phone_number) => Boolean(phone_number))
          ),
        ].map((phone_number) => ({
          phone_number: phone_number,
        })),
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
    if (type === "pendingRiderSos") {
      setLoading(true);
      dispatch(
        riderPendSOSListAction(
          {
            search: {
              sos_id2: search?.sos_id ?? "",
              source: search?.source_type ?? "",
              booking_id_2: search?.booking_id ?? "",
              driver_id2: search?.driver_id ?? "",
              first_name: search?.first_name ?? "",
              phone_number: search?.phone_number ?? "",
              rider_id2: search?.rider_id ?? "",
              // sos_created_at: "", pending need to done
              // last_active_at: "",
              current_owner: search?.current_owner ?? "",
              // sos_status: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "pendingDriverSos") {
      setLoading(true);
      dispatch(
        driverPendSOSListAction(
          {
            search: {
              sos_id2: search?.sos_id ?? "",
              source: search?.source_type ?? "",
              booking_id_2: search?.booking_id ?? "",
              driver_id2: search?.driver_id ?? "",
              first_name: search?.first_name ?? "",
              phone_number: search?.phone_number ?? "",
              rider_id2: search?.rider_id ?? "",
              sos_created_at: "",
              last_active_at: "",
              current_owner: search?.current_owner ?? "",
              sos_status: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "inprogressRiderSos") {
      setLoading(true);
      dispatch(
        riderInprogressSOSListAction(
          {
            search: {
              sos_id2: search?.sos_id ?? "",
              source: search?.source_type ?? "",
              booking_id_2: search?.booking_id ?? "",
              driver_id2: search?.driver_id ?? "",
              first_name: search?.first_name ?? "",
              phone_number: search?.phone_number ?? "",
              rider_id2: search?.rider_id ?? "",
              sos_created_at: "",
              last_active_at: "",
              current_owner: search?.current_owner ?? "",
              sos_status: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "inprogressDriverSos") {
      setLoading(true);
      dispatch(
        driverInprogressSOSListAction(
          {
            search: {
              sos_id2: search?.sos_id ?? "",
              source: search?.source_type ?? "",
              booking_id_2: search?.booking_id ?? "",
              driver_id2: search?.driver_id ?? "",
              first_name: search?.first_name ?? "",
              phone_number: search?.phone_number ?? "",
              rider_id2: search?.rider_id ?? "",
              sos_created_at: "",
              last_active_at: "",
              current_owner: search?.current_owner ?? "",
              sos_status: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, reload, search]);

  const onSuccess = (data) => {
    setSosList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
    console.log(data, "alksndalkd");
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  const [sosCurrentData, setSosCurrentData] = useState([]);

  function sosViewModalFn(id) {
    if (type === "pendingRiderSos") {
      dispatch(
        riderPendingSOSAction(
          {
            sos_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "pendingDriverSos") {
      dispatch(
        driverPendingSOSAction(
          {
            sos_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "inprogressRiderSos") {
      dispatch(
        riderInprogressSOSAction(
          {
            sos_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (type === "inprogressDriverSos") {
      dispatch(
        driverInprogressSOSAction(
          {
            sos_id: id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }

  const onFetchSuccess = (data) => {
    setLoading(false);
    setSosCurrentData(data?.data);
    console.log(data);
    handleSosViewShow();
  };

  const onFetchError = (data) => {
    setLoading(false);
    console.log(data);
    handleErrorMessageShow();
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

  const sosSource = sosList?.map((items) => items?.source);
  console.log(sosSource);

  const SOSTableHeading = [
    { title: "SOS ID", value: "sos_id2" },
    { title: "Source Type", value: "source" },
    { title: "Booking ID", value: "booking.booking_id_2" },
    {
      title:
        type === "pendingRiderSos" || type === "inprogressRiderSos"
          ? "Rider ID"
          : "Driver ID",
      value:
        type === "pendingRiderSos" || type === "inprogressRiderSos"
          ? "rider.rider_id2"
          : "driver.driver_id2",
    },
    {
      title:
        type === "pendingRiderSos" || type === "inprogressRiderSos"
          ? "Rider First Name"
          : "Driver First Name",
      value:
        type === "pendingRiderSos" || type === "inprogressRiderSos"
          ? "rider.first_name"
          : "driver.first_name",
    },
    {
      title:
        type === "pendingRiderSos" || type === "inprogressRiderSos"
          ? "Rider Phone Number"
          : "Driver Phone Number",
      value:
        type === "pendingRiderSos" || type === "inprogressRiderSos"
          ? "rider.phone_number"
          : "driver.phone_number",
    },
    {
      title:
        type === "pendingRiderSos" || type === "inprogressRiderSos"
          ? "Driver ID"
          : "Rider ID",
      value:
        type === "pendingRiderSos" || type === "inprogressRiderSos"
          ? "booking.driver_id2"
          : "booking.rider_id_2",
    },
    { title: "Last Active At", value: "last_active_at" },
    {
      title: "SOS Age",
      value: "sos_created_at",
    },
    {
      title: "Received/ Generated At",
      value: type === "pendingRiderSos" || type === "pendingDriverSos" ? "sos_created_at" : "generated_at",
    },
    { title: "Current Owner", value: "CurrentOwnerName.user_name" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(sosList);

  console.log(sosList, "ddkfnal");

  const buttonList = [
    <div className="d-flex justify-content-end gap-3 align-items-center mt-2">
      {canRead(permission) && (
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
      )}

      {(type === "pendingRiderSos" || type === "pendingDriverSos") &&
        (canWrite(permission) === false ? (
          <></>
        ) : (
          <div className="d-flex justify-content-end align-items-center">
            <button
              className=" d-flex align-items-center tertiary_bg border_none border_radius_5px primary_color py-1 px-2 fw_600"
              type="button"
              onClick={() => handleGenerateSosShow()}
            >
              <i className="ri-add-line pe-2" />
              {type === "pendingRiderSos"
                ? "Generate Rider SOS"
                : "Generate Driver SOS"}
            </button>
          </div>
        ))}
    </div>,
  ];

  console.log(sosList, "skjdfdlk");

  return (
    <>
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title={"Soemthing Went wrong"}
        imageShow={true}
      />
      <RiderGenerateSosModal
        generateSosShow={generateSosShow}
        handleGenerateSosClose={handleGenerateSosClose}
        type={type}
        reload={reload}
        setReload={setReload}
      />
      <InnerLayout
        mainHeading={
          type === "pendingRiderSos"
            ? "Pending/Create Rider SOS"
            : type === "pendingDriverSos"
              ? "Pending/Create Driver SOS"
              : type === "inprogressRiderSos"
                ? "Inprogress Rider SOS"
                : "Inprogress Driver SOS"
        }
        navigateEnable={false}
        backBtnClassName={"ms-4"}
        buttons={buttonList}
      >
        <div className="position-relative">
          {showFilter ? (
            <div className="complaint_filter_container position-absolute">
              <SosFilter
                filter={handleSearch}
                search={search}
                handleFilterClose={handleFilterClose}
                sosDropdownList={sosDropdownList}
                type={type}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="row  mt-3">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table text-nowrap">
              <thead>
                <tr className="pale_blue_bg ">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>
                  {SOSTableHeading?.map((item, index) => {
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
                  status={sosList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {items?.map((item) => (
                    <tr
                      key={item.sos_id2}
                      className={
                        item?.id === checkList ? "light_blue_bg" : null
                      }
                    >
                      <th scope="row">
                        <input
                          id={item?.id}
                          type="checkbox"
                          checked={checkList === item?.id}
                          className="manage_fare_checkbox ms-2"
                          onChange={checkboxChecker}
                        />
                      </th>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.sos_id2 ?? "--"}
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
                          to={
                            item?.booking?.id
                              ? navigationFn(
                                item?.booking?.booking_classification,
                                item?.booking?.id
                              )
                              : location?.pathname
                          }
                        >
                          <span className="secondary_color  fs_14 fw_500">
                            {item?.booking?.booking_id_2 ?? "--"}
                          </span>
                        </NavLink>
                      </td>
                      <td>
                        <NavLink
                          className=" secondary_color"
                          to={
                            type === "pendingRiderSos" ||
                              type === "inprogressRiderSos"
                              ? riderNavigateFn(item?.rider, item?.rider?.id)
                              : type === "inprogressDriverSos" ||
                                type === "pendingDriverSos"
                                ? driverNavigateFn(item?.driver, item?.driver?.id)
                                : location?.pathname
                          }
                        >
                          <span className="secondary_color fs_14 fw_500">
                            {type === "pendingRiderSos" ||
                              type === "inprogressRiderSos"
                              ? item?.rider?.rider_id2 ?? "--"
                              : type === "inprogressDriverSos" ||
                                type === "pendingDriverSos"
                                ? item?.driver?.driver_id2 ?? "--"
                                : "--"}
                          </span>
                        </NavLink>

                        {/* <span className="secondary_color fs_14 fw_500">
                          {type === "pendingRiderSos" ||
                          type === "inprogressRiderSos"
                            ? item?.rider?.rider_id2 ?? "--"
                            : type === "inprogressDriverSos" ||
                              type === "pendingDriverSos"
                            ? item?.driver?.driver_id2 ?? "--"
                            : "--"}
                        </span> */}
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {type === "pendingRiderSos" ||
                            type === "inprogressRiderSos"
                            ? item?.rider?.first_name ?? "--"
                            : type === "inprogressDriverSos" ||
                              type === "pendingDriverSos"
                              ? item?.driver?.first_name ?? "--"
                              : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {type === "pendingRiderSos" ||
                            type === "inprogressRiderSos"
                            ? item?.rider?.phone_number ?? "--"
                            : type === "inprogressDriverSos" ||
                              type === "pendingDriverSos"
                              ? item?.driver?.phone_number ?? "--"
                              : "--"}
                        </span>
                      </td>
                      <td>
                        <NavLink
                          className=" secondary_color"
                          to={
                            type === "pendingRiderSos" ||
                              type === "inprogressRiderSos"
                              ? driverNavigateFn(item?.driver, item?.driver?.id)
                              : type === "inprogressDriverSos" ||
                                type === "pendingDriverSos"
                                ? riderNavigateFn(item?.rider, item?.rider?.id)
                                : location?.pathname
                          }
                        >
                          <span className="secondary_color fs_14 fw_500">
                            {type === "pendingRiderSos" ||
                              type === "inprogressRiderSos"
                              ? item?.booking
                                ? item?.booking?.driver_id2
                                : "--"
                              : type === "inprogressDriverSos" ||
                                type === "pendingDriverSos"
                                ? item?.booking
                                  ? item?.booking?.rider_id_2
                                  : "--"
                                : "--"}
                          </span>
                        </NavLink>

                        {/* <span className="secondary_color fs_14 fw_500">
                          {type === "pendingRiderSos" ||
                          type === "inprogressRiderSos"
                            ? item?.booking
                              ? item?.booking?.driver_id2
                              : "--"
                            : type === "inprogressDriverSos" ||
                              type === "pendingDriverSos"
                            ? item?.booking
                              ? item?.booking?.rider_id_2
                              : "--"
                            : "--"}
                        </span> */}
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
                        <span className="secondary_color fs_14 fw_500">
                          {item?.sos_created_at
                            ? applicationAge(new Date(item?.sos_created_at))
                            : item?.generated_at
                              ? applicationAge(new Date(item?.generated_at))
                              : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.sos_created_at
                            ? formatDateTime(item?.sos_created_at)
                            : item?.generated_at
                              ? formatDateTime(item?.generated_at)
                              : "--"}
                        </span>
                      </td>
                      <td>
                        {type === "inprogressRiderSos" ||
                          type === "inprogressDriverSos" ? (
                          <span className="secondary_color fs_14 fw_500">
                            {item?.CurrentOwnerName?.user_name ?? "--"}
                          </span>
                        ) : (
                          <span
                            className={`${statusColor(
                              item?.sos_status
                            )} fs_14 fw_500`}
                          >
                            {item?.sos_status ?? "--"}
                          </span>
                        )}
                      </td>

                      <td className="">
                        <button
                          className="border_none border_radius fs_14 me-3 fw_500 px-3 
                      white_color blue_color_bg"
                          onClick={() => {
                            setRiderObject(item?.id);
                            sosViewModalFn(item?.id);
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
        
            <SOSViewModal
              sosViewModal={sosViewModal}
              handleSosViewClose={handleSosViewClose}
              id={riderObject}
              type={type}
              setReload={setReload}
              reload={reload}
              sosCurrentData={sosCurrentData}
            />
          </div>
        </div>
        {sosList?.length === 0 ? (
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

export default SosTable;
