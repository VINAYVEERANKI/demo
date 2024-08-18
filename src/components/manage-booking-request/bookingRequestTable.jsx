import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../modules/manage-bookings/manageBookings.css";
import { NavLink } from "react-router-dom";
import errorToast from "../utilits/errorToast";
import {
  ongoingRequestListAction,
  unSuccessfulRequestListAction,
  ongoingDropdownListAction,
  unsuccessfuldropdownListAction,
} from "../../redux/actions/bookingRequestAction";
import { insertSpaces, useSortableData } from "../helper";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import SearchInputfield from "../form/searchInputfield";
import LoadAndError from "../utilits/loadAndError";
import TablePaginations from "../utilits/pagination";
import InnerLayout from "../layout/innerLayout";
import RequestsFilter from "./Filter";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const BookingRequestTable = ({ type }) => {
  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [ongoingRequestList, setOngoingRequestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [requestsDropDownList, setRequestsDropDownList] = useState({});

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
    if (type === "ongoingRequests") {
      setLoading(true);
      dispatch(
        ongoingRequestListAction(
          {
            search: {
              booking_id_2: search?.booking_id_2 ?? "",
              Riderfirst_name: search?.Riderfirst_name ?? "",
              Riderlast_name: search?.Riderlast_name ?? "",
              booking_type: search?.booking_type ?? "",
              ride_type: search?.ride_type ?? "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "unsuccessfulRequests") {
      setLoading(true);
      dispatch(
        unSuccessfulRequestListAction(
          {
            search: {
              id: "",
              booking_id_2: search?.booking_id_2 ?? "",
              Riderfirst_name: search?.Riderfirst_name ?? "",
              Riderlast_name: search?.Riderlast_name ?? "",
              booking_type: search?.booking_type ?? "",
              ride_type: search?.ride_type ?? "",
              booking_request_status: search?.booking_request_status ?? "",
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
    setOngoingRequestList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  const handleFetchDropDownList = () => {
    if (type === "ongoingRequests") {
      dispatch(
        ongoingDropdownListAction(onDropDownListSuccess, onDropDownListError)
      );
    } else if (type === "unsuccessfulRequests") {
      dispatch(
        unsuccessfuldropdownListAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    if (type === "ongoingRequests") {
      setRequestsDropDownList({
        booking_id_2: [
          ...new Set(
            data?.data
              ?.map((item) => item.booking_id_2)
              ?.filter((booking_id_2) => Boolean(booking_id_2))
          ),
        ].map((booking_id_2) => ({ booking_id_2: booking_id_2 })),

        Riderfirst_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.first_name)),
        ].map((Riderfirst_name) => ({ Riderfirst_name: Riderfirst_name })),
        Riderlast_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.last_name)),
        ].map((Riderlast_name) => ({ Riderlast_name: Riderlast_name })),
        booking_type: [
          ...new Set(data?.data?.map((item) => item.booking_type)),
        ].map((booking_type) => ({ booking_type: booking_type })),
        ride_type: [...new Set(data?.data?.map((item) => item.ride_type))].map(
          (ride_type) => ({ ride_type: ride_type })
        ),
      });
    } else if (type === "unsuccessfulRequests") {
      setRequestsDropDownList({
        booking_id_2: [
          ...new Set(
            data?.data
              ?.map((item) => item.booking_id_2)
              ?.filter((booking_id_2) => Boolean(booking_id_2))
          ),
        ].map((booking_id_2) => ({ booking_id_2: booking_id_2 })),

        Riderfirst_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.first_name)),
        ].map((Riderfirst_name) => ({ Riderfirst_name: Riderfirst_name })),
        Riderlast_name: [
          ...new Set(data?.data?.map((item) => item?.rider?.last_name)),
        ].map((Riderlast_name) => ({ Riderlast_name: Riderlast_name })),
        booking_type: [
          ...new Set(data?.data?.map((item) => item.booking_type)),
        ].map((booking_type) => ({ booking_type: booking_type })),
        ride_type: [...new Set(data?.data?.map((item) => item.ride_type))].map(
          (ride_type) => ({ ride_type: ride_type })
        ),
        booking_request_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.booking_request_status)
              ?.filter((booking_request_status) =>
                Boolean(booking_request_status)
              )
          ),
        ].map((booking_request_status) => ({
          booking_request_status: booking_request_status,
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
  const { items, requestSort, sortConfig } =
    useSortableData(ongoingRequestList);

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const tableHeading = [
    { title: "Booking ID", value: "booking_id_2" },
    { title: "Rider First Name", value: "rider.first_name" },
    { title: "Rider Last Name", value: "rider.last_name" },
    { title: "Estimated Final Fare(₹)", value: "estimatedFinalFare" },
    { title: "Booking Type", value: "booking_type" },
    { title: "Ride Type", value: "ride_type" },
    { title: "Booking Request Status", value: "bookingRequestStatus" },
  ];

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
    <>
      <InnerLayout
        mainHeading={type ? insertSpaces(type) : "--"}
        navigateEnable={false}
        backBtnClassName="ms-4"
        buttons={buttonList}
      >
        {showFilter ? (
          <>
            <RequestsFilter
              filter={handleSearch}
              search={search}
              handleFilterClose={handleFilterClose}
              requestsDropDownList={requestsDropDownList}
              type={type}
            />
          </>
        ) : (
          <></>
        )}
        <div className="mx-3 d-flex justify-content-between mt-3">
          <span className="primary_color fs_24 fw_600 "></span>
        </div>

        <div className=" mt-3 row">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table  manage_fare_list_navbar ">
              <thead>
                <tr className="pale_blue_bg ">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                      id="mastercheck"
                    />
                  </th>
                  {tableHeading.map((item, index) => {
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
              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={ongoingRequestList.length === 0}
                  errorMessage={errorMessage}
                >
                  {items.map((item) => (
                    <tr
                      key={item?.id}
                      className={
                        item?.id === checkList ? "light_blue_bg" : null
                      }
                    >
                      <th scope="row">
                        <input
                          id={item?.id}
                          checked={checkList === item?.id}
                          type="checkbox"
                          className="manage_fare_checkbox ms-2 "
                          onChange={checkboxChecker}
                        />
                      </th>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.booking_id_2 ? item?.booking_id_2 : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.rider?.first_name
                            ? item?.rider?.first_name
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.rider?.last_name
                            ? item?.rider?.last_name
                            : "--"}
                        </span>
                      </td>

                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.estimated_rider_billing !== null
                            ? parseFloat(
                                item?.estimated_rider_billing?.final_fare
                              ).toFixed(2)
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14">
                          {item?.booking_type ? item?.booking_type : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fw_500 fs_14 text-nowrap">
                          {item?.ride_type ? item?.ride_type : "--"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${
                            type === "unsuccessfulRequests"
                              ? "red_color"
                              : "secondary_color"
                          }  fw_500 fs_14 text-nowrap`}
                        >
                          {type === "unsuccessfulRequests"
                            ? item?.booking_request_status
                              ? item?.booking_request_status
                              : "--"
                            : "Ongoing"}
                        </span>
                      </td>

                      <td className="">
                        <NavLink
                          className="border_none border_radius fs_13  py-1 me-3 fw_500 px-3 text-nowrap
                            white_color blue_color_bg text-decoration-none view_text"
                          to={`trip-details/${item?.id}`}
                          state={{
                            bookingType: item?.booking_type,
                            rideType: item?.ride_type,
                          }}
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
        {ongoingRequestList.length === 0 ? (
          <></>
        ) : (
          <TablePaginations
            paginate={handlePagination}
            currentPage={page}
            pageData={pageData}
          />
        )}
      </InnerLayout>
    </>
  );
};

export default BookingRequestTable;
