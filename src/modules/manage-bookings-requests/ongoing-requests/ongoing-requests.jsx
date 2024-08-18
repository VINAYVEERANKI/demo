import React from "react";
import "../manage-booking-requests.css";
import BookingRequestTable from "../../../components/manage-booking-request/bookingRequestTable";

const OngoingRequests = () => {
  return (
    <>
      <BookingRequestTable type="ongoingRequests" />
    </>
  );
};

export default OngoingRequests;
