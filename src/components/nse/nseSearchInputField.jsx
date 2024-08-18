import React, { useState } from "react";

const NseSearchInputField = ({ type }) => {
  const [dropDown, setDropDown] = useState("");
  function optionsFn() {
    if (type === "newAccount") {
      const option = [
        { value: "newAccountOption1", label: "Login- OTP" },
        { value: "newAccountOption2", label: "Login- Resend OTP" },
        { value: "newAccountOption3", label: "Welcome Message" },
      ];
      return option;
    } else if (type === "generalAccount") {
      const option = [
        { value: "generalAccountOption1", label: "Login- OTP" },
        { value: "generalAccountOption2", label: "Login- Resend OTP" },
        { value: "generalAccountOption3", label: "Phone number update- OTP" },
        {
          value: "generalAccountOption4",
          label: "Phone number update - Resend OTP",
        },
        { value: "generalAccountOption5", label: "Email verification- OTP" },
        {
          value: "generalAccountOption6",
          label: "Email verification- Resend OTP",
        },
        { value: "generalAccountOption7", label: "Email update- OTP" },
        { value: "generalAccountOption8", label: "Email update- OTP" },
      ];
      return option;
    } else if (type === "policyUpdates") {
      const option = [
        {
          value: "policyUpdatesOption1",
          label: "Terms and Conditions - Updated",
        },
        { value: "policyUpdatesOption2", label: "Privacy policy - Updated" },
        {
          value: "policyUpdatesoption3",
          label: "Cancellation Policy - Updated",
        },
      ];
      return option;
    } else if (type === "Security") {
      const option = [
        { value: "securityOption1", label: "New device login" },
        { value: "securityOption2", label: "Unkown Activity" },
      ];
      return option;
    } else if (type === "localNoRidesAvailable") {
      const option = [
        { value: "localNoRidesAvailableOption1", label: "All drivers denied" },
        {
          value: "localNoRidesAvailableOption2",
          label: "No drivers available",
        },
      ];
      return option;
    } else if (type === "localRentalTrip") {
      const option = [
        { value: "localRentalTripOption1", label: "Booking details received" },
        { value: "localRentalTripOption2", label: "Driver 5 mins away" },
        {
          value: "localRentalTripOption3",
          label: "Driver Almost Arrived (1 or 2 min away)",
        },
        { value: "localRentalTripOption4", label: "Driver Arrived" },
        {
          value: "localRentalTripOption5",
          label: "Driver Arrived (driver waiting > 5 mins)",
        },
        { value: "localRentalTripOption6", label: "Stop arrived" },
        {
          value: "localRentalTripOption7",
          label: "Stop arrived (Wait time > 5 mins)",
        },
        {
          value: "localRentalTripOption8",
          label: 'Driver clicks on "End Trip" ',
        },
      ];
      return option;
    } else if (type === "localCancelledBooking") {
      const option = [
        {
          value: "localCancelledBookingOption1",
          label:
            "Driver1 Cancelled Booking (Before Arriving- Without cancellation fee)",
        },
        {
          value: "localCancelledBookingOption2",
          label:
            "Driver2 Cancelled Booking (Before Arriving- Without cancellation fee)",
        },
        {
          value: "localCancelledBookingOption3",
          label:
            "Driver3 Cancelled Booking (Before Arriving- Without cancellation fee)",
        },
        {
          value: "localCancelledBookingOption4",
          label:
            "Rider Cancelled Booking (Before Arriving- Without charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption5",
          label:
            "Rider Cancelled Booking (Before Arriving- With charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption6",
          label:
            "Admin Cancelled Booking-  rider requested (Before Arriving- Without cancellation fee) ",
        },
        {
          value: "localCancelledBookingOption7",
          label:
            "Admin Cancelled Booking-  Rider requested (Before Arriving- With charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption8",
          label:
            "Admin Cancelled Booking-  Driver requested (Before Arriving- Without cancellation fee) ",
        },
        {
          value: "localCancelledBookingOption9",
          label:
            "Admin Cancelled Booking-  Driver requested (Before Arriving- With charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption10",
          label:
            "Driver Cancelled Booking (After arrived- Without charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption11",
          label:
            "Driver Cancelled Booking (After arrived- With charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption12",
          label:
            "Rider Cancelled Booking (After arrived- With charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption13",
          label:
            "Admin Cancelled Booking-  rider requested (After arrived- Without cancellation fee) ",
        },
        {
          value: "localCancelledBookingOption14",
          label:
            "Admin Cancelled Booking-  rider requested (After arrived- With charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption15",
          label:
            "Admin Cancelled Booking-  Driver requested (After Arrived- Without cancellation fee) ",
        },
        {
          value: "localCancelledBookingOption16",
          label:
            "Admin Cancelled Booking-  Driver requested (After Arrived- With charged cancellation fee)",
        },
        {
          value: "localCancelledBookingOption17",
          label: "Rider Cancelled Booking (After Start OTP)",
        },
        {
          value: "localCancelledBookingOption18",
          label: 'Admin clicks on "End Trip" ',
        },
      ];
      return option;
    } else if (type === "localAccidentBooking") {
      const option = [
        {
          value: "localAccidentBookingOption1",
          label:
            "Driver reports an accident (Before arriving) (Without cancellation fee)  - Three driver logic",
        },
        {
          value: "localAccidentBookingOption2",
          label:
            "Admin reports an accident (Before arriving) (Without cancellation fee) ",
        },
        {
          value: "localAccidentBookingOption3",
          label:
            "Driver reports an accident (After arrived) (Without cancellation fee) ",
        },
        {
          value: "localAccidentBookingOption4",
          label:
            "Admin reports an accident (After arrived) (Without cancellation fee) ",
        },
        {
          value: "localAccidentBookingOption5",
          label: "Driver Arrived (driver waiting > 5 mins)",
        },
        {
          value: "localAccidentBookingOption6",
          label:
            'Driver reports an accident (After "Start OTP") - with fee charged',
        },
        {
          value: "localAccidentBookingOption7",
          label:
            'Admin reports an accident (After "Start OTP")- with fee charged',
        },
      ];
      return option;
    } else if (type === "localDriverReviewPendingFromRider") {
      const option = [
        {
          value: "localDriverReviewPendingFromRiderOption1",
          label: "Rider to Driver rating -Pending",
        },
      ];
      return option;
    } else if (type === "rentNoRidesAvailable") {
      const option = [
        { value: "rentNoRidesAvailableOption1", label: "All drivers denied" },
        { value: "rentNoRidesAvailableOption1", label: "No drivers available" },
      ];
      return option;
    } else {
      const option = [
        { value: "option5", label: "Email verification- OTP" },
        { value: "option6", label: "Email verification- Resend OTP" },
        { value: "option7", label: "Email update- OTP" },
        // { value: 'option8', label: 'Email update- OTP' },
      ];
      return option;
    }
  }

  const options = optionsFn();
  console.log(options);
  return (
    <>
      <div className="">
        <select
          value={dropDown}
          onChange={(e) => setDropDown(e.target.value)}
          placeholder={"Sub-Classification"}
          style={{ width: "200px" }}
        >
          <option
            value="Sub-Classification"
            // placeholder="Sub-Classification"
          ></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default NseSearchInputField;
