import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import {
  ongoingRequestIndividualAction,
  unSuccessfulReqIndividualAction,
} from "../../redux/actions/bookingRequestAction";
import errorToast from "../utilits/errorToast";
import BookingInnerLayout from "../layout/bookingInnerLayout";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import "./bookingReqComp.css";
import TripInformation from "./trip-information";
import BookingRequestBillingDetails from "./billing-details";

const TripDetailsComp = ({ type = "" }) => {
  const [activeItem, setActiveItem] = useState("trip-information");

  const [tripdetails, setTripdetails] = useState({});
  const [billingDetails, setBillingDetails] = useState({});
  const tripData = useLocation();

  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "ongoingRequests") {
      setLoading(true);
      dispatch(
        ongoingRequestIndividualAction(
          {
            booking_id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    } else {
      setLoading(true);
      dispatch(
        unSuccessfulReqIndividualAction(
          {
            booking_id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    }
  }, []);

  const onSuccess = (data) => {
    setLoading(false);
    setTripdetails(data?.data?.Trip_Information);
    setBillingDetails(data?.data?.Billing_Details);
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
        <BookingInnerLayout
          title={tripdetails?.booking_id_2 ? tripdetails?.booking_id_2 : "--"}
        >
          <div className="d-flex mt-3 me-md-5 me-3 mb-3 gap-4 justify-content-center booking_inner_data_container ms-md-4 ms-3">
            {/* <div className={`col-lg-10 col-6`}> */}
            <div className={`col-lg-10 col-12`}>
              <div className="d-flex align-items-center">
                <span className="pe-1 fs_14 primary_color fw_600">
                  Booking ID :
                </span>
                <span className="fs_14 secondary_color fw_600">
                  {tripdetails?.booking_id_2 ? tripdetails?.booking_id_2 : "--"}
                </span>
              </div>

              <div>
                <span className="fs_14 secondary_color fw_600">
                  {tripdetails?.booking_type ? tripdetails?.booking_type : "--"}
                  -{tripdetails?.ride_type ? tripdetails?.ride_type : "--"}
                </span>
              </div>

              <div className="trip_info_container  position-relative my-5 pb-5">
                <div className="d-flex  trip_information_heading white_bg border_radius_7px">
                  <button
                    onClick={() => {
                      setActiveItem("trip-information");
                    }}
                    className={
                      activeItem === "trip-information"
                        ? "primary_bg white_color px-4 py-2 border_radius_7px border_none fs_14 fw_500 "
                        : "white_bg disabled_color px-4 py-2 border_radius_7px border_none billing_details_btn fs_14 fw_600"
                    }
                  >
                    Trip Information
                  </button>

                  <button
                    onClick={() => {
                      setActiveItem("billing-details");
                    }}
                    className={
                      activeItem === "trip-information"
                        ? "white_bg disabled_color px-4 py-2 border_radius_7px border_none billing_details_btn fs_14 fw_600"
                        : "primary_bg white_color px-4 py-2 border_radius_7px border_none fs_14 fw_500 "
                    }
                  >
                    Billing Details
                  </button>
                </div>

                {activeItem === "trip-information" ? (
                  <TripInformation
                    tripData={tripData}
                    tripdetails={tripdetails}
                    type={type}
                  />
                ) : (
                  <BookingRequestBillingDetails
                    tripData={tripData}
                    billingDetails={billingDetails}
                  />
                )}
              </div>
            </div>
          </div>
        </BookingInnerLayout>
      )}
    </>
  );
};

export default TripDetailsComp;
