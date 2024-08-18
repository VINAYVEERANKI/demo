import React, { useEffect, useState } from "react";
import BookingDetails from "../../../components/manage-bookings/booking-details";

const OngoingBookingsDetails = () => {
  return (
    <>
      <BookingDetails type="Ongoing_Bookings" />
    </>
  );
};

export default OngoingBookingsDetails;
