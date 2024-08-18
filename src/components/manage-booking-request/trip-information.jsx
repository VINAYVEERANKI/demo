import React from "react";
import { CharacterHidder, riderNavigateFn } from "../helper";
import moment from "moment";
import { NavLink } from "react-router-dom";

const TripInformation = ({ tripData, tripdetails, type = "" }) => {
  console.log(tripdetails, "aksdhkadsl");
  const riderDetails = [
    {
      label: "Rider ID",
      value: tripdetails?.rider?.rider_id2
        ? tripdetails?.rider?.rider_id2
        : "--",
      navigate: true,
      id: tripdetails?.rider?.id,
      link: riderNavigateFn(tripdetails?.rider, tripdetails?.rider?.id),
    },
    {
      label: "First Name",
      value: tripdetails?.rider?.first_name
        ? tripdetails?.rider?.first_name
        : "--",
    },

    {
      label: "Rider Email ID",
      value: tripdetails?.rider?.email
        ? CharacterHidder(tripdetails?.rider?.email, "email")
        : "--",
    },
    {
      label: "Rider Phone Number",
      value: tripdetails?.rider?.phone_number
        ? "+91" + CharacterHidder(tripdetails?.rider?.phone_number)
        : "--",
    },
  ];

  const tripDetails = [
    {
      label: "Pickup Address",
      value: tripdetails?.pickup_address?.address
        ? tripdetails?.pickup_address?.address
        : "--",
    },
    {
      label: "Drop-Off Address",
      value: tripdetails?.pickup_address?.address
        ? tripdetails?.pickup_address?.address
        : "--",
    },
    {
      label: "Booked At",
      value: tripdetails?.createdAt
        ? moment(tripdetails?.createdAt).format("DD-MM-YYYY,HH:mm")
        : "--",
    },
    {
      label: "Package Details",
      value: tripdetails?.package_details ? tripdetails?.package_details : "--",
    },
    {
      label: "Booking type",
      value: tripdetails?.booking_type ? tripdetails?.booking_type : "--",
    },
    {
      label: "Ride type",
      value: tripdetails?.ride_type ? tripdetails?.ride_type : "--",
    },
    {
      label: "Booking Request Status",
      value: tripdetails?.booking_request_status
        ? tripdetails?.booking_request_status
        : "--",
    },
  ];

  if (tripData?.state?.bookingType === "LocalTrip") {
    tripDetails?.splice(3, 1);
    tripDetails.splice(1, 0, {
      label: "Additional Stop",
      value: tripdetails?.additional_stop?.address
        ? tripdetails?.additional_stop?.address
        : "--",
    });

    tripDetails.splice(6, 0, {
      label: "Estimated Distance & Duration",
      value: tripdetails?.estimated_distance_and_duration
        ? tripdetails?.estimated_distance_and_duration
        : "--",
    });
  } else if (tripData?.state?.bookingType === "OneWayOutstation") {
    tripDetails?.splice(3, 0, {
      label: " Scheduled Pickup At",
      value: tripdetails?.schedule_pickup_at
        ? moment(tripdetails?.schedule_pickup_at).format("DD-MM-YYYY,HH:mm")
        : "--",
    });
  } else if (tripData?.state?.bookingType === "RoundTripOutstation") {
    tripDetails?.splice(
      3,
      0,
      {
        label: " Scheduled Pickup At",
        value: tripdetails?.estimated_return_at
          ? moment(tripdetails?.estimated_return_at).format("DD-MM-YYYY,HH:mm")
          : "--",
      },
      {
        label: "Scheduled Return At",
        value: tripdetails?.schedule_pickup_at
          ? moment(tripdetails?.schedule_pickup_at).format("DD-MM-YYYY,HH:mm")
          : "--",
      }
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className={`col-lg-10 ps-3 mt-5`}>
          <span className="fs_16 fw_600 primary_color heading_border_bottom">
            Rider details
          </span>
          {riderDetails?.map((item, index) => (
            <>
              <div
                className={`row ${index === 0 ? "mt-2" : ""}`}
                key={item?.label}
              >
                <div className="col-5">
                  <span className=" fs_14 fw_600 primary_color">
                    {item?.label}
                  </span>
                </div>
                <div className="col-5">
                  {item?.navigate ? (
                    <NavLink
                      className=" fs_14 fw_600 primary_color"
                      to={item?.link}
                    >
                      {item?.value}
                    </NavLink>
                  ) : (
                    <span className=" fs_14 fw_600 disabled_color">
                      {item?.value}
                    </span>
                  )}
                </div>
              </div>
            </>
          ))}

          <div className="mt-3">
            <span className="fs_16 fw_600 primary_color heading_border_bottom">
              Trip Details
            </span>

            {tripDetails?.map((item, index) => (
              <div
                className={`row ${index === 0 ? `mt-2` : ""}`}
                key={item?.label}
              >
                <div className="col-5">
                  <span className=" fs_14 fw_600 primary_color">
                    {item?.label}
                  </span>
                </div>
                <div className="col-7">
                  <span
                    className={`fs_14 fw_600 ${
                      type === "unsuccessfulRequests" &&
                      item?.label === "Booking Request Status"
                        ? "red_color"
                        : "secondary_color"
                    } `}
                  >
                    {item?.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default TripInformation;
