import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ComplaintsNavigationFn,
  navigationFn,
  removeUnderScore,
} from "../helper";
import "./manage-bookingsComponents.css";
import { NavLink } from "react-router-dom";

const ManageBookingSidebar = ({ bookingData }) => {
  const [clicked, setClicked] = useState({
    complaintsClicked: true,
    pendingTripsClicked: true,
    monitorTripClicked: true,
    tripMetricsClicked: true,
  });

  function applicationAge(value) {
    var date1 = new Date();
    var date2 = new Date(value);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  console.log(bookingData, "jksalkd");

  const LocaltripMetricDetails = [
    {
      label: "Base Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.base_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.base_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Km Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.per_km_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_km_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Min Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.per_min_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_min_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Parking Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.parking_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.parking_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Waiting Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.waiting_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.waiting_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Transport Hub Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.transport_hub_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.transport_hub_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Booking Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.booking_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.booking_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Cancelled Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.cancellation_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.cancellation_fee
            ).toFixed(2)
          : "--",
    },
  ];

  const RentalTripMetrics = [
    {
      label: "Base Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.base_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.base_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Package Km",
      value:
        bookingData?.tripMetrics?.fares_details?.package_km !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.package_km
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Extra Km Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.per_extra_km_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_extra_km_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Extra Time Fare(min)",
      value:
        bookingData?.tripMetrics?.fares_details?.per_extra_time_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_extra_time_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Waiting Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.waiting_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.waiting_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Booking Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.booking_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.booking_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Cancelled Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.cancellation_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.cancellation_fee
            ).toFixed(2)
          : "--",
    },
  ];

  const OneWaytripMetricDetails = [
    {
      label: "Base Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.base_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.base_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Km Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.per_km_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_km_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Min Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.per_min_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_min_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Extra Km Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.per_extra_km_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_extra_km_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Extra Time Fare (hrs)",
      value:
        bookingData?.tripMetrics?.fares_details?.per_extra_time_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_extra_time_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Night Allowance",
      value:
        bookingData?.tripMetrics?.fares_details?.night_allowance !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.night_allowance
            ).toFixed(2)
          : "--",
    },
    {
      label: "Driver Allowance",
      value:
        bookingData?.tripMetrics?.fares_details?.driver_allowance !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.driver_allowance
            ).toFixed(2)
          : "--",
    },
    {
      label: "Waiting Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.waiting_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.waiting_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Booking Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.booking_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.booking_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Cancelled Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.cancellation_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.cancellation_fee
            ).toFixed(2)
          : "--",
    },
  ];

  const RoundTripMetricDetails = [
    {
      label: "Base Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.base_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.base_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Km Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.per_km_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_km_fare
            ).toFixed(2)
          : "--",
    },

    {
      label: "Per Extra Km Fare",
      value:
        bookingData?.tripMetrics?.fares_details?.per_extra_km_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_extra_km_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Per Extra Time Fare (hrs)",
      value:
        bookingData?.tripMetrics?.fares_details?.per_extra_time_fare !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.per_extra_time_fare
            ).toFixed(2)
          : "--",
    },
    {
      label: "Night Allowance",
      value:
        bookingData?.tripMetrics?.fares_details?.night_allowance !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.night_allowance
            ).toFixed(2)
          : "--",
    },
    {
      label: "Driver Allowance",
      value:
        bookingData?.tripMetrics?.fares_details?.driver_allowance !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.driver_allowance
            ).toFixed(2)
          : "--",
    },
    {
      label: "Waiting Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.waiting_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.waiting_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Booking Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.booking_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.booking_fee
            ).toFixed(2)
          : "--",
    },
    {
      label: "Cancelled Fee",
      value:
        bookingData?.tripMetrics?.fares_details?.cancellation_fee !== null
          ? parseFloat(
              bookingData?.tripMetrics?.fares_details?.cancellation_fee
            ).toFixed(2)
          : "--",
    },
  ];

  const tripMetricFn = () => {
    if (bookingData?.tripInformation?.booking_type === "LocalTrip") {
      return LocaltripMetricDetails;
    } else if (bookingData?.tripInformation?.booking_type === "RentalTrip") {
      return RentalTripMetrics;
    } else if (
      bookingData?.tripInformation?.booking_type === "OneWayOutstation"
    ) {
      return OneWaytripMetricDetails;
    } else if (
      bookingData?.tripInformation?.booking_type === "RoundTripOutstation"
    ) {
      return RoundTripMetricDetails;
    }
  };

  const tripMetricsDetails = tripMetricFn();

  console.log(bookingData, "skdfhksf");

  return (
    <>
      <div className="box_shadow  border_radius ">
        <div
          className={
            clicked.complaintsClicked
              ? `d-flex justify-content-between  align-items-center px-3 cursor_pointer`
              : `d-flex justify-content-between light_yellow_bg align-items-center px-3 border_radius cursor_pointer`
          }
          onClick={() =>
            setClicked((prevState) => ({
              ...prevState,
              complaintsClicked: !clicked.complaintsClicked,
            }))
          }
        >
          <span className=" primary_color fs_16 fw_600 py-2">
            Complaints ({bookingData?.complaints?.length})
          </span>
          <span>
            {clicked.complaintsClicked ? (
              <i className="ri-arrow-down-s-line fw_900 fs_18 primary_color"></i>
            ) : (
              <i className="ri-arrow-up-s-line fw_900 fs_18 primary_color"></i>
            )}
          </span>
        </div>
        {clicked.complaintsClicked ? null : (
          <>
            {bookingData?.complaints?.length === 0 ? (
              <div className="d-flex justify-content-center">
                <span className="py-2">---- No Complaints Registered ----</span>{" "}
              </div>
            ) : (
              <div className="px-3 pt-2">
                <table className="w-100 fs_14">
                  <tbody>
                    <tr className="primary_color">
                      <th>Number</th>
                      <th>Complaint Age</th>
                      <th>Status</th>
                    </tr>
                    {bookingData?.complaints?.map((user) => {
                      return (
                        <React.Fragment key={user?.complaint_id2}>
                          <tr className="secondary_color">
                            <td>
                              <NavLink
                                to={ComplaintsNavigationFn(
                                  user?.call_complaint_raised_by,
                                  user?.complaint_status,
                                  user?.InitiatedBy?.user_name ??
                                    user?.AssignedBy?.user_name ??
                                    user?.ReAssignedBy?.user_name
                                )}
                                state={{
                                  id: user?.id,
                                  complaint_id: user?.complaint_id2,
                                }}
                              >
                                <span className="secondary_color">
                                  {user?.complaint_id2
                                    ? user?.complaint_id2
                                    : "--"}
                                </span>
                              </NavLink>
                              {/* <a href="" className="secondary_color">
                                {user?.complaint_id2
                                  ? user?.complaint_id2
                                  : "--"}
                              </a> */}
                            </td>
                            {/* December 17, 1995 03:24:00 */}
                            <td className="ps-4">
                              {" "}
                              {user?.compaint_age
                                ? applicationAge(
                                    moment(user?.compaint_age).format(
                                      "MMMM DD,YYYY HH:MM:SS"
                                    )
                                  )
                                : "--"}
                              days ago
                            </td>
                            <td>
                              {user?.complaint_status
                                ? user?.complaint_status
                                : "--"}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-3 box_shadow  border_radius">
        <div
          className={
            clicked.pendingTripsClicked
              ? `d-flex justify-content-between  align-items-center px-3 cursor_pointer`
              : `d-flex justify-content-between blue_bg align-items-center px-3 border_radius cursor_pointer`
          }
          onClick={() =>
            setClicked((prevState) => ({
              ...prevState,
              pendingTripsClicked: !clicked.pendingTripsClicked,
            }))
          }
        >
          <span className=" primary_color fs_16 fw_600 py-2">
            Pending Trip (s)
          </span>
          <span>
            {clicked.pendingTripsClicked ? (
              <i className="ri-arrow-down-s-line fw_900 fs_18 primary_color"></i>
            ) : (
              <i className="ri-arrow-up-s-line fw_900 fs_18 primary_color"></i>
            )}
          </span>
        </div>
        {clicked.pendingTripsClicked ? null : (
          <>
            {bookingData?.pendingTrips?.length === 0 ? (
              <div className="d-flex justify-content-center">
                <span className="py-2">---- No Pending Trips ----</span>{" "}
              </div>
            ) : (
              <div className="px-3 pt-2">
                <table className="w-100 fs_14">
                  <tbody>
                    <tr className="primary_color">
                      <th>Booking ID</th>
                      <th>Final Fare (Including Taxes)</th>
                    </tr>
                    {bookingData?.pendingTrips?.map((item) => {
                      return (
                        <React.Fragment key={item?.booking_id_2}>
                          <tr className="secondary_color">
                            <td>
                              <NavLink
                                className="fs_14 fw_600 secondary_color"
                                to={navigationFn(
                                  item?.booking_classification,
                                  item?.Booking_Id
                                )}
                              >
                                <span className="secondary_color">
                                  {item?.booking_id_2
                                    ? item?.booking_id_2
                                    : "--"}
                                </span>
                              </NavLink>
                            </td>
                            <td className="ps-5">
                              {item?.Total_Trip_Fare
                                ? item?.Total_Trip_Fare
                                : "--"}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-3 box_shadow border_radius ">
        <div
          className={
            clicked.monitorTripClicked
              ? `d-flex justify-content-between  align-items-center px-3 cursor_pointer`
              : `d-flex justify-content-between monitor_trip_title_container align-items-center px-3 border_radius cursor_pointer`
          }
          onClick={() =>
            setClicked((prevState) => ({
              ...prevState,
              monitorTripClicked: !clicked.monitorTripClicked,
            }))
          }
        >
          <span className=" primary_color fs_16 fw_600 py-2">Monitor Trip</span>
          <span>
            {clicked.monitorTripClicked ? (
              <i className="ri-arrow-down-s-line fw_900 fs_18 primary_color"></i>
            ) : (
              <i className="ri-arrow-up-s-line fw_900 fs_18 primary_color"></i>
            )}
          </span>
        </div>
        {clicked.monitorTripClicked ? null : (
          <>
            <div className="d-flex justify-content-center">
              <span className="pt-2 d-flex flex-column primary_color fw_600 fs_14">
                <span className="text-center pt-2">Driver Trip Payout</span>
                <span className="text-center secondary_color fw_500">
                  {bookingData?.billingDetails?.driver_billing
                    ?.driver_trip_payout
                    ? parseFloat(
                        bookingData?.billingDetails?.driver_billing
                          ?.driver_trip_payout
                      ).toFixed(2)
                    : "--"}
                </span>
                <span className="text-center pt-2">
                  Driver Payout Adjustment Details
                </span>
                <span className="text-center d-flex flex-column secondary_color fw_500">
                  <span>
                    CB adjustment :{" "}
                    {bookingData?.billingDetails?.driver_billing
                      ?.driver_payout_adjustment_details?.cb_adjustment
                      ? parseFloat(
                          bookingData?.billingDetails?.driver_billing
                            ?.driver_payout_adjustment_details?.cb_adjustment
                        ).toFixed(2)
                      : "--"}
                  </span>
                  <span>
                    Pending amount :{" "}
                    {bookingData?.billingDetails?.driver_billing
                      ?.driver_payout_adjustment_details?.pending_amount !==
                    null
                      ? parseFloat(
                          bookingData?.billingDetails?.driver_billing
                            ?.driver_payout_adjustment_details?.pending_amount
                        ).toFixed(2)
                      : "--"}
                  </span>
                  <span>
                    Deposited amount:{" "}
                    {bookingData?.billingDetails?.driver_billing
                      ?.driver_payout_adjustment_details?.deposited_amount !==
                    null
                      ? parseFloat(
                          bookingData?.billingDetails?.driver_billing
                            ?.driver_payout_adjustment_details?.deposited_amount
                        ).toFixed(2)
                      : "--"}
                  </span>
                </span>
                <span className="text-center pt-2">
                  Driver Trip Payout Status
                </span>
                <span className="text-center secondary_color fw_500">
                  {bookingData?.billingDetails?.driver_billing
                    ?.driver_trip_payout_status
                    ? bookingData?.billingDetails?.driver_billing
                        ?.driver_trip_payout_status
                    : "--"}
                </span>
                <span className="text-center pt-2">
                  Driver Trip Payout Payment Status
                </span>
                <span className="text-center secondary_color fw_500">
                  {bookingData?.billingDetails?.driver_billing
                    ?.driver_trip_payout_payment_status
                    ? bookingData?.billingDetails?.driver_billing
                        ?.driver_trip_payout_payment_status
                    : "--"}
                </span>
                <span className="text-center pt-2">Booking Status</span>
                <span className="text-center secondary_color fw_500">
                  {bookingData?.tripInformation?.booking_status
                    ? bookingData?.tripInformation?.booking_status
                    : "--"}
                </span>
                <span className="text-center pt-2">Refund Status</span>
                <span className="text-center secondary_color fw_500">
                  {bookingData?.billingDetails?.rider_payment_details
                    ?.refund_status
                    ? removeUnderScore(
                        bookingData?.billingDetails?.rider_payment_details
                          ?.refund_status
                      )
                    : "--"}
                </span>
                <span className="text-center pt-2">Driver Fine Status</span>
                <span className="text-center secondary_color fw_500">
                  {bookingData?.billingDetails?.driver_fine?.driver_fine_status}
                </span>
              </span>{" "}
            </div>
          </>
        )}
      </div>
      <div className="mt-3 box_shadow  border_radius ">
        <div
          className={
            clicked.tripMetricsClicked
              ? `d-flex justify-content-between  align-items-center px-3 cursor_pointer`
              : `d-flex justify-content-between blue_bg align-items-center px-3 border_radius cursor_pointer`
          }
          onClick={() =>
            setClicked((prevState) => ({
              ...prevState,
              tripMetricsClicked: !clicked.tripMetricsClicked,
            }))
          }
        >
          <span className=" primary_color fs_16 fw_600 py-2">Trip Metrics</span>
          <span>
            {clicked.tripMetricsClicked ? (
              <i className="ri-arrow-down-s-line fw_900 fs_18 primary_color"></i>
            ) : (
              <i className="ri-arrow-up-s-line fw_900 fs_18 primary_color"></i>
            )}
          </span>
        </div>
        {clicked.tripMetricsClicked ? null : (
          <>
            <div className="d-flex justify-content-center">
              <span className="pt-2 d-flex flex-column primary_color fw_600 fs_14">
                {tripMetricsDetails.map((user) => (
                  <React.Fragment key={user?.label}>
                    <span className="text-center pt-2">{user?.label}</span>
                    <span className="text-center secondary_color fw_500">
                      {user?.value}
                    </span>{" "}
                  </React.Fragment>
                ))}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ManageBookingSidebar;
