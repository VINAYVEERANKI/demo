import React, { useEffect, useState } from "react";
import "../../modules/manage-bookings/manageBookings.css";
import { NavLink } from "react-router-dom";
import SearchInputfield from "../form/searchInputfield";
import {
  accidentBookingListAction,
  accidentBookingsDropdownListAction,
} from "../../redux/actions/manageBookings/accidentBookingAction";
import {
  adjustedBookingListAction,
  adjustedBookingsDropdownListAction,
} from "../../redux/actions/manageBookings/adjustedBookingAction";
import {
  cancelledBookingListAction,
  cancelledBookingsDropdownListAction,
} from "../../redux/actions/manageBookings/cancelledBookingAction";
import {
  completedBookingListAction,
  completedBookingsDropdownListAction,
} from "../../redux/actions/manageBookings/completedBookingAction";
import {
  ongoingBookingListAction,
  ongoingBookingsDropdownListAction,
} from "../../redux/actions/manageBookings/onGoingBookingAction";
import { removeUnderScore, useSortableData } from "../helper";
import { useDispatch } from "react-redux";
import errorToast from "../utilits/errorToast";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import LoadAndError from "../utilits/loadAndError";
import moment from "moment";
import usePermissions from "../usePermissionChecker";
import BookingsFilter from "./BookingsFilter";

const ManageBookingMainTable = ({ type = "" }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    Ongoing_Bookings: "ongoing_booking_requests",
    Completed_Bookings: "completed_booking",
    Cancelled_Bookings: "cancelled_booking",
    Accident_Bookings: "accident_booking",
    Adjusted_Bookings: "adjusted_booking",
  };
  const [manageBookingsDropdown, setManageBookingsDropDown] = useState({});

  const permission = pagePermissions[type];
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [BookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  const handleFilterClose = () => {
    setShowFilter(false);
  };
  const handleFilterOpen = () => {
    setShowFilter(true);
  };

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

  useEffect(() => {
    if (type === "Accident_Bookings") {
      setLoading(true);
      dispatch(
        accidentBookingListAction(
          {
            search: {
              id: "",
              booking_id_2: search?.booking_id_2 ?? "",
              Driverfirst_name: search?.Driverfirst_name ?? "",
              Riderfirst_name: search?.Riderfirst_name ?? "",
              booking_type: search?.booking_type ?? "",
              ride_type: search?.ride_type ?? "",
              accident_reported_at: search?.accident_reported_at ?? "",
              accident_reported_by: search?.accident_reported_by ?? "",
              vehicle_number: search?.vehicle_number ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "Adjusted_Bookings") {
      setLoading(true);
      dispatch(
        adjustedBookingListAction(
          {
            search: {
              id: "",
              booking_id_2: search?.booking_id_2 ?? "",
              Driverfirst_name: search?.Driverfirst_name ?? "",
              Riderfirst_name: search?.Riderfirst_name ?? "",
              booking_type: search?.booking_type ?? "",
              ride_type: search?.ride_type ?? "",
              adjusted_by: search?.adjusted_by ?? "",
              booking_classification: search?.booking_classification ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "Cancelled_Bookings") {
      setLoading(true);
      dispatch(
        cancelledBookingListAction(
          {
            search: {
              id: "",
              booking_id_2: search?.booking_id_2 ?? "",
              Driverfirst_name: search?.Driverfirst_name ?? "",
              Riderfirst_name: search?.Riderfirst_name ?? "",
              booking_type: search?.booking_type ?? "",
              ride_type: search?.ride_type ?? "",
              vehicle_number: search?.vehicle_number ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "Completed_Bookings") {
      setLoading(true);
      dispatch(
        completedBookingListAction(
          {
            search: {
              id: "",
              booking_id_2: search?.booking_id_2 ?? "",
              Driverfirst_name: search?.Driverfirst_name ?? "",
              Riderfirst_name: search?.Riderfirst_name ?? "",
              booking_type: search?.booking_type ?? "",
              ride_type: search?.ride_type ?? "",
              vehicle_number: search?.vehicle_number ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "Ongoing_Bookings") {
      setLoading(true);
      dispatch(
        ongoingBookingListAction(
          {
            search: {
              id: "",
              booking_id_2: search?.booking_id_2 ?? "",
              Driverfirst_name: search?.Driverfirst_name ?? "",
              Riderfirst_name: search?.Riderfirst_name ?? "",
              booking_type: search?.booking_type ?? "",
              ride_type: search?.ride_type ?? "",
              trip_duration: search?.trip_duration ?? "",
              vehicle_number: search?.vehicle_number ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, setBookingList]);

  const onSuccess = (data) => {
    setLoading(false);
    setBookingList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
    setErrorMessage(data?.data?.data);
  };

  const handleFetchDropDownList = () => {
    if (type === "Accident_Bookings") {
      dispatch(
        accidentBookingsDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "Adjusted_Bookings") {
      dispatch(
        adjustedBookingsDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "Cancelled_Bookings") {
      dispatch(
        cancelledBookingsDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "Completed_Bookings") {
      dispatch(
        completedBookingsDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (type === "Ongoing_Bookings") {
      dispatch(
        ongoingBookingsDropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    if (type === "Accident_Bookings") {
      setManageBookingsDropDown({
        booking_id_2: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking_id_2)
              ?.filter((booking_id_2) => Boolean(booking_id_2))
          ),
        ].map((booking_id_2) => ({ booking_id_2: booking_id_2 })),
        vehicle_number: [
          ...new Set(
            data?.data?.map((item) => item?.driver?.driving_license_id)
          ),
        ].map((vehicle_number) => ({ vehicle_number: vehicle_number })),
        Riderfirst_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.first_name)),
        ].map((Riderfirst_name) => ({ Riderfirst_name: Riderfirst_name })),
        Driverfirst_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.first_name)),
        ].map((Driverfirst_name) => ({ Driverfirst_name: Driverfirst_name })),
        booking_type: [
          ...new Set(data?.data?.map((item) => item?.booking_type)),
        ].map((booking_type) => ({ booking_type: booking_type })),
        ride_type: [...new Set(data?.data?.map((item) => item?.ride_type))].map(
          (ride_type) => ({ ride_type: ride_type })
        ),
        accident_reported_at: [
          ...new Set(data?.data?.map((item) => item?.accident_reported_at)),
        ].map((accident_reported_at) => ({
          accident_reported_at: accident_reported_at,
        })),
        accident_reported_by: [
          ...new Set(data?.data?.map((item) => item.accident_reported_by)),
        ].map((accident_reported_by) => ({
          accident_reported_by: accident_reported_by,
        })),
      });
    } else if (type === "Adjusted_Bookings") {
      setManageBookingsDropDown({
        booking_id_2: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking_id_2)
              ?.filter((booking_id_2) => Boolean(booking_id_2))
          ),
        ].map((booking_id_2) => ({ booking_id_2: booking_id_2 })),
        Riderfirst_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.first_name)),
        ].map((Riderfirst_name) => ({ Riderfirst_name: Riderfirst_name })),
        Driverfirst_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.first_name)),
        ].map((Driverfirst_name) => ({ Driverfirst_name: Driverfirst_name })),
        booking_type: [
          ...new Set(data?.data?.map((item) => item?.booking_type)),
        ].map((booking_type) => ({ booking_type: booking_type })),
        ride_type: [...new Set(data?.data?.map((item) => item.ride_type))].map(
          (ride_type) => ({ ride_type: ride_type })
        ),
        adjusted_by: [
          ...new Set(data?.data?.map((item) => item?.adjusted_by)),
        ].map((adjusted_by) => ({
          adjusted_by: adjusted_by,
        })),
        booking_classification: [
          ...new Set(data?.data?.map((item) => item?.booking_classification)),
        ].map((booking_classification) => ({
          booking_classification: booking_classification,
        })),
      });
    } else if (type === "Cancelled_Bookings") {
      setManageBookingsDropDown({
        booking_id_2: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking_id_2)
              ?.filter((booking_id_2) => Boolean(booking_id_2))
          ),
        ].map((booking_id_2) => ({ booking_id_2: booking_id_2 })),
        vehicle_number: [
          ...new Set(
            data?.data?.map((item) => item?.driver?.driving_license_id)
          ),
        ].map((vehicle_number) => ({ vehicle_number: vehicle_number })),
        Riderfirst_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.first_name)),
        ].map((Riderfirst_name) => ({ Riderfirst_name: Riderfirst_name })),
        Driverfirst_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.first_name)),
        ].map((Driverfirst_name) => ({ Driverfirst_name: Driverfirst_name })),
        booking_type: [
          ...new Set(data?.data?.map((item) => item?.booking_type)),
        ].map((booking_type) => ({ booking_type: booking_type })),
        ride_type: [...new Set(data?.data?.map((item) => item?.ride_type))].map(
          (ride_type) => ({ ride_type: ride_type })
        ),
      });
    } else if (type === "Completed_Bookings") {
      setManageBookingsDropDown({
        booking_id_2: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking_id_2)
              ?.filter((booking_id_2) => Boolean(booking_id_2))
          ),
        ].map((booking_id_2) => ({ booking_id_2: booking_id_2 })),
        vehicle_number: [
          ...new Set(
            data?.data?.map((item) => item?.driver?.driving_license_id)
          ),
        ].map((vehicle_number) => ({ vehicle_number: vehicle_number })),
        Riderfirst_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.first_name)),
        ].map((Riderfirst_name) => ({ Riderfirst_name: Riderfirst_name })),
        Driverfirst_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.first_name)),
        ].map((Driverfirst_name) => ({ Driverfirst_name: Driverfirst_name })),
        booking_type: [
          ...new Set(data?.data?.map((item) => item?.booking_type)),
        ].map((booking_type) => ({ booking_type: booking_type })),
        ride_type: [...new Set(data?.data?.map((item) => item?.ride_type))].map(
          (ride_type) => ({ ride_type: ride_type })
        ),
      });
    } else if (type === "Ongoing_Bookings") {
      setManageBookingsDropDown({
        booking_id_2: [
          ...new Set(
            data?.data
              ?.map((item) => item?.booking_id_2)
              ?.filter((booking_id_2) => Boolean(booking_id_2))
          ),
        ].map((booking_id_2) => ({ booking_id_2: booking_id_2 })),
        vehicle_number: [
          ...new Set(
            data?.data?.map((item) => item?.driver?.driving_license_id)
          ),
        ].map((vehicle_number) => ({ vehicle_number: vehicle_number })),
        Riderfirst_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.first_name)),
        ].map((Riderfirst_name) => ({ Riderfirst_name: Riderfirst_name })),
        Driverfirst_name: [
          ...new Set(data?.data?.map((item) => item?.driver?.first_name)),
        ].map((Driverfirst_name) => ({ Driverfirst_name: Driverfirst_name })),
        booking_type: [
          ...new Set(data?.data?.map((item) => item?.booking_type)),
        ].map((booking_type) => ({ booking_type: booking_type })),
        ride_type: [...new Set(data?.data?.map((item) => item?.ride_type))].map(
          (ride_type) => ({ ride_type: ride_type })
        ),
        trip_duration: [
          ...new Set(data?.data?.map((item) => item?.trip_duration)),
        ].map((trip_duration) => ({
          trip_duration: trip_duration,
        })),
      });
    }
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  const ManageBookingstableHeading = [
    { title: "Booking ID", value: "booking_id_2", display: true },
    { title: "Rider First Name", value: "rider.first_name", display: true },
    { title: "Driver First Name", value: "driver.first_name", display: true },

    {
      title: "Vehicle Number",
      value: "driver.driving_license_id",
      display: type === "Adjusted_Bookings" ? false : true,
    },
    {
      title: "Adjusted Amount(₹)",
      value: "rider_payment_details.total_trip_fare_adjusted_amount",
      display: type === "Adjusted_Bookings" ? true : false,
    },
    {
      title: "Reported at",
      value: "accident_reported_at",
      display: type === "Accident_Bookings" ? true : false,
    },
    {
      title: "Booking Type",
      value: "booking_type",
      display:
        type === "Adjusted_Bookings" || type === "Ongoing_Bookings"
          ? true
          : false,
    },
    {
      title: "Final Fare(₹)",
      value: "rider_billings.final_fare",
      display:
        type === "Completed_Bookings" || type === "Cancelled_Bookings"
          ? true
          : false,
    },
    {
      title: "Reported by",
      value: "accident_reported_by",
      display: type === "Accident_Bookings" ? true : false,
    },
    {
      title: "Ride Type",
      value: "ride_type",
      display:
        type === "Adjusted_Bookings" || type === "Ongoing_Bookings"
          ? true
          : false,
    },
    {
      title: "Booking Type",
      value: "booking_type",
      display:
        type === "Completed_Bookings" || type === "Cancelled_Bookings"
          ? true
          : false,
    },
    {
      title: "Booking Type",
      value: "booking_type",
      display: type === "Accident_Bookings" ? true : false,
    },
    {
      title: "Booking Classification",
      value: "not present",
      display: type === "Adjusted_Bookings" ? true : false,
    },
    {
      title: "Ride Type",
      value: "ride_type",
      display:
        type === "Completed_Bookings" || type === "Cancelled_Bookings"
          ? true
          : false,
    },
    {
      title: "Trip duration",
      value: "trip_duration",
      display: type === "Ongoing_Bookings" ? true : false,
    },
    {
      title: "Ride Type",
      value: "ride_type",
      display: type === "Accident_Bookings" ? true : false,
    },
    {
      title: "Adjusted By",
      value: "adjusted_by",
      display: type === "Adjusted_Bookings" ? true : false,
    },
    {
      title: "Ride Chat",
      value: "not present",
      display:
        type === "Cancelled_Bookings" ||
        type === "Completed_Bookings" ||
        type === "Ongoing_Bookings"
          ? true
          : false,
    },
    { title: "Created At", value: "created_at", display: true },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(BookingList);

  const buttonList = [
    <>
      <button
        className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
        type="button"
        onClick={() => {
          handleFetchDropDownList();
        }}
      >
        <i className="ri-filter-3-line primary_color pe-2" />
        <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
      </button>

      {numberOfFilters === 0 ? (
        <></>
      ) : (
        <div className={`position-relative p-1`}>
          <span
            className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
          >
            {numberOfFilters}
          </span>
        </div>
      )}
    </>,
  ];

  return (
    <div className="admin_table_container p-3 pb-4 mx-3 my-4">
      <div className="mx-3 d-flex justify-content-between mt-3">
        <div className="primary_color fs_24 fw_600 ">
          {/* {type === "Accident_Bookings"
            ? "Accident Bookings"
            : type === "Adjusted_Bookings"
            ? "Adjusted Bookings"
            : type === "Cancelled_Bookings"
            ? "Cancelled Bookings"
            : type === "Completed_Bookings"
            ? "Completed Bookings"
            : type === "Ongoing_Bookings"
            ? "Ongoing Bookings"
            : ""} */}
          {removeUnderScore(type)}
        </div>
        <div className=" d-flex justify-content-center">{buttonList}</div>
      </div>
      {showFilter ? (
        <>
          <BookingsFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            manageBookingsDropdown={manageBookingsDropdown}
            type={type}
          />
        </>
      ) : (
        <></>
      )}
      <div className="row mt-3">
        <div className="col-md-12 table_container text-nowrap">
          {loading && <LoadingSpinnerTable />}
          <table className="table  manage_fare_list_navbar">
            <thead>
              <tr className="pale_blue_bg">
                <th
                  scope="col"
                  className="ongoing_heading_first_list transparent_bg"
                >
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                    id="mastercheck"
                  />
                </th>

                {ManageBookingstableHeading?.filter(
                  (item) => item?.display === true
                )?.map((item, index) => {
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
                <th className="ongoing_heading_last_list transparent_bg"></th>
              </tr>
            </thead>
            <tbody className="light_blue_bg">
              <LoadAndError
                loader={loading}
                error={error}
                status={BookingList?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item) => (
                  <tr
                    key={item?.id}
                    className={item?.id === checkList ? "light_blue_bg" : null}
                  >
                    <th scope="row">
                      <input
                        id={item?.id}
                        type="checkbox"
                        className="manage_fare_checkbox ms-2 "
                        checked={checkList === item?.id}
                        onChange={checkboxChecker}
                      />
                    </th>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {item?.booking_id_2 ? item?.booking_id_2 : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {item?.rider?.first_name
                          ? item?.rider?.first_name
                          : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {item?.driver?.first_name
                          ? item?.driver?.first_name
                          : "--"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {type === "Accident_Bookings" ||
                        type === "Cancelled_Bookings" ||
                        type === "Completed_Bookings" ||
                        type === "Ongoing_Bookings"
                          ? item?.driver?.driving_license_id
                            ? item?.driver?.driving_license_id
                            : "--"
                          : item?.rider_payment_details
                              ?.total_trip_fare_adjusted_amount
                          ? item?.rider_payment_details
                              ?.total_trip_fare_adjusted_amount
                          : "--"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500 text-nowrap">
                        {type === "Accident_Bookings"
                          ? item?.accident_reported_at
                            ? moment(item?.accident_reported_at).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )
                            : "--"
                          : type === "Cancelled_Bookings" ||
                            type === "Completed_Bookings"
                          ? item?.rider_billings?.final_fare
                            ? item?.rider_billings?.final_fare
                            : "--"
                          : type === "Adjusted_Bookings" ||
                            type === "Ongoing_Bookings"
                          ? item?.booking_type
                            ? item?.booking_type
                            : "--"
                          : "--"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500 text-nowrap">
                        {type === "Accident_Bookings"
                          ? item?.accident_reported_by
                            ? item?.accident_reported_by
                            : "--"
                          : type === "Adjusted_Bookings" ||
                            type === "Ongoing_Bookings"
                          ? item?.ride_type
                            ? item?.ride_type
                            : "--"
                          : type === "Completed_Bookings" ||
                            type === "Cancelled_Bookings"
                          ? item?.booking_type
                            ? item?.booking_type
                            : "--"
                          : "--"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500 text-nowrap">
                        {type === "Accident_Bookings"
                          ? item?.booking_type
                            ? item?.booking_type
                            : "--"
                          : type === "Completed_Bookings" ||
                            type === "Cancelled_Bookings"
                          ? item?.ride_type
                            ? item?.ride_type
                            : "--"
                          : type === "Ongoing_Bookings"
                          ? item?.trip_duration
                            ? item?.trip_duration
                            : "--"
                          : type === "Adjusted_Bookings"
                          ? "not present"
                          : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500 text-nowrap">
                        {type === "Accident_Bookings"
                          ? item?.ride_type
                            ? item?.ride_type
                            : "--"
                          : type === "Adjusted_Bookings"
                          ? item?.adjusted_by
                            ? item?.adjusted_by
                            : "--"
                          : type === "Completed_Bookings" ||
                            type === "Cancelled_Bookings" ||
                            type === "Ongoing_Bookings"
                          ? "not present"
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14 fw_500 text-nowrap">
                        {item?.created_at
                          ? moment(item?.created_at).format("DD/MM/YYYY, hh:mm")
                          : "--"}
                      </span>
                    </td>

                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_13  py-1 me-3 fw_500 px-3 
                            white_color blue_color_bg text-decoration-none view_text text-nowrap"
                        to={
                          type === "Accident_Bookings"
                            ? `/accident-bookings-details/${item?.id}`
                            : type === "Adjusted_Bookings"
                            ? `/adjusted-bookings-details/${item?.id}`
                            : type === "Cancelled_Bookings"
                            ? `/cancelled-bookings-details/${item?.id}`
                            : type === "Completed_Bookings"
                            ? `/completed-bookings-details/${item?.id}`
                            : `/ongoing-bookings-details/${item?.id}`
                        }
                      >
                        Trip Details
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookingMainTable;
