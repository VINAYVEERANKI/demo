import React from "react";
import { useEffect, useState } from "react";
import "../../modules/manage-bookings/manageBookings.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import errorToast from "../utilits/errorToast";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import BookingInnerLayout from "../layout/bookingInnerLayout";

import { accidentBookingIndividualAction } from "../../redux/actions/manageBookings/accidentBookingAction";
import { adjustedBookingIndividualAction } from "../../redux/actions/manageBookings/adjustedBookingAction";
import { cancelledBookingIndividualAction } from "../../redux/actions/manageBookings/cancelledBookingAction";
import { completedBookingIndividualAction } from "../../redux/actions/manageBookings/completedBookingAction";
import { ongoingBookingIndividualAction } from "../../redux/actions/manageBookings/onGoingBookingAction";
import TripInformation from "./booking-trip-billing/trip-information";
import BookingBillingDetails from "./booking-trip-billing/booking-billing-details";
import ManageBookingSidebar from "./bookingSidebar";

const BookingDetails = ({ type = "" }) => {
  const [activeItem, setActiveItem] = useState("trip-information");
  const [bookingTable, setBookingTable] = useState(false);
  const [billingDetailsEdit, setBillingDetailsEdit] = useState(false);
  const [bookingData, setBookingData] = useState({
    tripInformation: {},
    billingDetails: {},
    tripMetrics: {},
    pendingTrips: [],
    complaints: [],
  });
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (type === "Accident_Bookings") {
      dispatch(
        accidentBookingIndividualAction(
          {
            booking_id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    } else if (type === "Adjusted_Bookings") {
      dispatch(
        adjustedBookingIndividualAction(
          {
            booking_id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    } else if (type === "Cancelled_Bookings") {
      dispatch(
        cancelledBookingIndividualAction(
          {
            booking_id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    } else if (type === "Completed_Bookings") {
      dispatch(
        completedBookingIndividualAction(
          {
            booking_id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    } else if (type === "Ongoing_Bookings") {
      dispatch(
        ongoingBookingIndividualAction(
          {
            booking_id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    }
  }, [bookingTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setBookingData({
      tripInformation: data?.data?.Trip_Information,
      billingDetails: data?.data?.Billing_Details,
      tripMetrics: data?.data?.Trip_Metrics,
      pendingTrips: data?.data?.Pending_Trips,
      complaints: data?.data?.Complaints,
    });
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <BookingInnerLayout
            title={bookingData?.tripInformation?.booking_id_2 ?? "--"}
          >
            <div className=" ms-sm-3 mx-2 mx-sm-0 mt-2">
              <>
                <div className="d-flex align-items-center">
                  <span className="pe-1 fs_14 primary_color fw_600">
                    Booking ID
                  </span>
                  <span className="pe-1 fw_600">:</span>
                  <span className="fs_14 secondary_color fw_600">
                    {bookingData?.tripInformation?.booking_id_2
                      ? bookingData?.tripInformation?.booking_id_2
                      : "--"}
                  </span>
                  <span className="fs_14 fw_600 ps-2 d-flex align-items-center">
                    <a href="" className="blue_color">
                      Track Ride
                    </a>
                    <i className="ri-map-pin-2-fill ps-1 blue_color"></i>
                  </span>
                </div>
              </>
              <>
                <span className="pe-2 fs_14 primary_color fw_600">
                  {bookingData?.tripInformation?.booking_type
                    ? bookingData?.tripInformation?.booking_type
                    : "--"}
                </span>
                <span className="pe-1 ">:</span>
                <span className="fs_14 secondary_color fw_600">
                  {bookingData?.tripInformation?.ride_type
                    ? bookingData?.tripInformation?.ride_type
                    : "--"}
                </span>
              </>

              <div className="d-xl-flex mt-5 me-sm-5 mb-3 gap-4">
                <div className="col-xl-9 col-12">
                  <div className="position-relative trip_info_container">
                    <div className="d-flex  trip_information_heading white_bg border_radius_7px">
                      <>
                        <button
                          onClick={() => {
                            setActiveItem("trip-information");
                          }}
                          className={
                            activeItem === "trip-information"
                              ? "primary_bg white_color px-4 py-2 border_radius_7px border_none fs_14 fw_500 "
                              : "white_bg primary px-4 py-2 border_radius_7px border_none billing_details_btn fs_14 fw_500"
                          }
                        >
                          Trip Information
                        </button>
                      </>
                      <>
                        <button
                          onClick={() => {
                            setActiveItem("billing-details");
                          }}
                          className={
                            activeItem === "trip-information"
                              ? "white_bg primary px-4 py-2 border_radius_7px border_none billing_details_btn fs_14 fw_500"
                              : "primary_bg white_color px-4 py-2 border_radius_7px border_none fs_14 fw_500 "
                          }
                        >
                          Billing Details
                        </button>
                      </>
                    </div>

                    {activeItem === "trip-information" ? (
                      <>
                        <TripInformation
                          bookingData={bookingData}
                          bookingTable={bookingTable}
                          setBookingTable={setBookingTable}
                          type={type}
                        />
                      </>
                    ) : (
                      <>
                        <BookingBillingDetails
                          billingDetailsEdit={billingDetailsEdit}
                          setBillingDetailsEdit={setBillingDetailsEdit}
                          BookingData={bookingData}
                          BookingTable={bookingTable}
                          setBookingTable={setBookingTable}
                          type={type}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="col-xl-3 col-12 mt-2">
                  <ManageBookingSidebar bookingData={bookingData} />
                </div>
              </div>
            </div>
          </BookingInnerLayout>
        </>
      )}
    </>
  );
};

export default BookingDetails;
