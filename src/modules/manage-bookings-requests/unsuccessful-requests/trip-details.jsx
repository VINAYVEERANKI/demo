import React from "react";
import "../manage-booking-requests.css";
import TripDetailsComp from "../../../components/manage-booking-request/tripDetailsComp";

const UnsuccessFulRequestTripDetails = () => {
  return (
    <>
      <TripDetailsComp type={"unsuccessfulRequests"} />
    </>
  );
};

export default UnsuccessFulRequestTripDetails;
