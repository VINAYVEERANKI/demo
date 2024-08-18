import React, { useMemo } from "react";
import "../../manage-bookingsComponents.css";
import moment from "moment";
import { formatDateTime } from "../../../helper";

const TripDetails = ({ bookingData }) => {
  console.log(bookingData, "skfjhkfa");

  const tripData = bookingData?.tripInformation

  const localTripDetails = [
    {
      label: "Pickup Address",
      value: tripData?.pickup_address?.address ?? "--",
    },
    {
      label: "Additional Stop",
      value: tripData?.additional_stop?.address ?? "--",
    },
    {
      label: "Drop-Off Address",
      value: tripData?.dropoff_address?.address ?? "--",
    },
    {
      label: "Driver Accepted At",
      value: tripData?.driver_accepted_at
        ? moment(tripData?.driver_accepted_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        !tripData?.trip_start_at &&
        !tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Driver Arrived At",
      value: tripData?.driver_arrived_at
        ? moment(tripData?.driver_arrived_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        !tripData?.trip_start_at &&
        tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Trip Start At",
      value: tripData?.trip_start_at
        ? moment(tripData?.trip_start_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        tripData?.trip_start_at &&
        tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Trip End At",
      value: tripData?.trip_end_at
        ? moment(tripData?.trip_end_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },

    {
      label: "Trip Details Distance & Duration",
      value: tripData?.trip_distance_duration ?? "--",
    },
    {
      label: "Start OTP",
      value: tripData?.start_otp ?? "--",
    },
    {
      label: "End OTP",
      value: tripData?.end_otp ?? "--",
    },
    {
      label: "Trip Duration",
      value: tripData?.trip_duration ?? "--",
    },
  ];
  const rentaltripDetails = [
    {
      label: "Pickup Address",
      value: tripData?.pickup_address?.address ?? "--",
    },
    {
      label: "Drop-Off Address",
      value: tripData?.dropoff_address?.address ?? "--",
    },
    {
      label: "Driver Accepted At",
      value: tripData?.driver_accepted_at
        ? moment(tripData?.driver_accepted_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        !tripData?.trip_start_at &&
        !tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Driver Arrived At",
      value: tripData?.driver_arrived_at
        ? moment(tripData?.driver_arrived_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        !tripData?.trip_start_at &&
        tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Trip Start At",
      value: tripData?.trip_start_at
        ? moment(tripData?.trip_start_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        tripData?.trip_start_at &&
        tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Trip End At",
      value: tripData?.trip_end_at
        ? moment(tripData?.trip_end_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },
    {
      label: "Package Details",
      value: tripData?.package_details ?? "--",
    },
    {
      label: "Trip Details Distance & Duration",
      value: tripData?.trip_distance_duration ?? "--",
    },
    {
      label: "Start OTP",
      value: tripData?.start_otp ?? "--",
    },
    {
      label: "End OTP",
      value: tripData?.end_otp ?? "--",
    },
    {
      label: "Trip Duration",
      value: tripData?.trip_duration ?? "--",
    },
  ];

  const onewayTripDetails = [
    {
      label: "Pickup Address",
      value: tripData?.pickup_address?.address ?? "--",
    },

    {
      label: "Drop-Off Address",
      value: tripData?.dropoff_address?.address ?? "--",
    },
    {
      label: "Scheduled Pickup At",
      value: tripData?.schedule_pickup_at
        ? moment(tripData?.schedule_pickup_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },
    {
      label: "Driver Accepted At",
      value: tripData?.driver_accepted_at
        ? moment(tripData?.driver_accepted_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        !tripData?.trip_start_at &&
        !tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Driver Arrived At",
      value: tripData?.driver_arrived_at
        ? moment(tripData?.driver_arrived_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        !tripData?.trip_start_at &&
        tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Trip Start At",
      value: tripData?.trip_start_at
        ? moment(tripData?.trip_start_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        tripData?.trip_start_at &&
        tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Trip End At",
      value: tripData?.trip_end_at
        ? moment(tripData?.trip_end_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },
    {
      label: "Package Details",
      value: tripData?.package_details ?? "--",
    },
    {
      label: "Trip Details Distance & Duration",
      value: tripData?.trip_distance_duration ?? "--",
    },
    {
      label: "Start OTP",
      value: tripData?.start_otp ?? "--",
    },
    {
      label: "End OTP",
      value: tripData?.end_otp ?? "--",
    },
    {
      label: "Trip Duration",
      value: tripData?.trip_duration ?? "--",
    },
  ];
  const roundTripDetails = [
    {
      label: "Pickup Address",
      value: tripData?.pickup_address?.address
        ? tripData?.pickup_address?.address
        : "--",
    },

    {
      label: "Drop-Off Address",
      value: tripData?.dropoff_address?.address
        ? tripData?.dropoff_address?.address
        : "--",
    },
    {
      label: "Scheduled Pickup At",
      value: tripData?.schedule_pickup_at
        ? moment(tripData?.schedule_pickup_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },
    {
      label: "Estimated Return At",
      value: tripData?.estimated_return_at
        ? moment(tripData?.estimated_return_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },
    {
      label: "Driver Accepted At",
      value: tripData?.driver_accepted_at
        ? moment(tripData?.driver_accepted_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        !tripData?.trip_start_at &&
        !tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Driver Arrived At",
      value: tripData?.driver_arrived_at
        ? moment(tripData?.driver_arrived_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        !tripData?.trip_start_at &&
        tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Trip Start At",
      value: tripData?.trip_start_at
        ? moment(tripData?.trip_start_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
      subValue:
        tripData?.trip_start_at &&
        tripData?.driver_arrived_at &&
        tripData?.driver_accepted_at &&
        (tripData?.cancelled_at
          ? formatDateTime(tripData?.cancelled_at)
          : tripData?.accident_reported_at
          ? formatDateTime(tripData?.accident_reported_at)
          : ""),
      type: tripData?.cancelled_at
        ? "Cancelled at"
        : "Accident Reported at",
    },
    {
      label: "Destination Arrived At",
      value: tripData?.destination_arrived_at
        ? moment(tripData?.destination_arrived_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },
    {
      label: "Return Trip Started At",
      value: tripData?.return_trip_started_at
        ? moment(tripData?.return_trip_started_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },
    {
      label: "Trip End At",
      value: tripData?.trip_end_at
        ? moment(tripData?.trip_end_at).format(
            "DD-MM-YYYY HH:mm:ss"
          )
        : "--",
    },
    {
      label: "Package Details",
      value: tripData?.package_details
        ? tripData?.package_details
        : "--",
    },
    {
      label: "Trip Details Distance & Duration",
      value: tripData?.trip_distance_duration
        ? tripData?.trip_distance_duration
        : "--",
    },
    {
      label: "Start OTP",
      value: tripData?.start_otp
        ? tripData?.start_otp
        : "--",
    },
    {
      label: "End OTP",
      value: tripData?.end_otp
        ? tripData?.end_otp
        : "--",
    },
    {
      label: "Trip Duration",
      value: tripData?.trip_duration
        ? tripData?.trip_duration
        : "--",
    },
  ];

  const tripDetailsFn = () => {
    if (tripData?.booking_type === "LocalTrip") {
      return localTripDetails;
    } else if (tripData?.booking_type === "RentalTrip") {
      return rentaltripDetails;
    } else if (
      tripData?.booking_type === "OneWayOutstation"
    ) {
      return onewayTripDetails;
    } else if (
      tripData?.booking_type === "RoundTripOutstation"
    ) {
      return roundTripDetails;
    }
  };

  const bookingtripDetails = tripDetailsFn();

  return (
    <div className="row g-0">
      <div className="col-lg-8 col-12 mt-3 mb-3">
        <div className="">
          <span className="fs_16 fw_600 primary_color heading_border_bottom">
            Trip Details
          </span>
        </div>
        <table className="w-100 mt-2 fs_14 fw_600">
          <tbody>
            {bookingtripDetails?.map((user) => (
              <tr key={user?.label}>
                <td className="primary_color w-25">{user?.label}</td>
                <td className="secondary_color w_40">
                  {user?.value}{" "}
                  {user?.subValue && (
                    <span className="fs_12 red_color">
                      ({user?.type} {user?.subValue}){" "}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td className="primary_color w-25">Ride Chat</td>
              <td className="secondary_color w_40">{"not present"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripDetails;
