import React, { useEffect, useState } from "react";
import BookingDetails from "../../../components/manage-bookings/booking-details";


const CancelledBookingDetails = ({}) => {



  return (
    <>
    <BookingDetails type = "Cancelled_Bookings" />
    </>
  );
};

export default CancelledBookingDetails;
