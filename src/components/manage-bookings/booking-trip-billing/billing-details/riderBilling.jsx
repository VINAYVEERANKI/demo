import React from "react";
import "../../manage-bookingsComponents.css";
import { formatAmount } from "../../../helper";

const RiderBilling = ({
  formik,
  Data,
  billingDetailsEdit,
  type,
  disableCancelBtn,
}) => {
  const riderBillingData =
    Data?.billingDetails?.rider_billing ?? Data?.rider_billing;
  const estimatedRiderBillingData =
    Data?.billingDetails?.estimated_rider_billing ??
    Data?.estimated_rider_billing;

  const booking_type =
    Data?.tripInformation?.booking_type ?? Data?.booking_type;

  const allFeeDataDetails = [
    {
      label: "Base Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.base_fare),
      finalFare: formatAmount(riderBillingData?.base_fare),
      name: "baseFare",
      formikValue: formik?.values?.baseFare,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,

      display: true,
    },
    // local
    {
      label: "Distance Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.distance_fare),
      finalFare: formatAmount(riderBillingData?.distance_fare),
      name: "distanceFare",
      formikValue: formik?.values?.distanceFare,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display: booking_type === "LocalTrip",
    },
    {
      label: "Time Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.time_fare),
      finalFare: formatAmount(riderBillingData?.time_fare),
      name: "TimeFare",
      formikValue: formik?.values?.TimeFare,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display: booking_type === "LocalTrip",
    },
    // end local
    // rental
    {
      label: "Extra Km Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.extra_km_fare),
      finalFare: formatAmount(riderBillingData?.extra_km_fare),
      name: "ExtraKmFare",
      formikValue: formik?.values?.ExtraKmFare,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display: booking_type === "RentalTrip",
    },
    {
      label: "Extra Time Fare(Mins)",
      estimatedFare: formatAmount(estimatedRiderBillingData?.extra_time_fare),
      finalFare: formatAmount(riderBillingData?.extra_time_fare),
      name: "ExtraTimeFareMins",
      formikValue: formik?.values?.ExtraTimeFareMins,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display: booking_type === "RentalTrip",
    },

    // rental end
    //  outStation
    {
      label: "Remaining 'Km' Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.remaining_km_fare),
      finalFare: formatAmount(riderBillingData?.remaining_km_fare),
      name: "RemainingKmFare",
      formikValue: formik?.values?.RemainingKmFare,
      editable:
        type === "Ongoing_Bookings"
          ? false
          : booking_type === "OneWayOutstation" ||
            booking_type === "RoundTripOutstation"
          ? true
          : false,
      display:
        booking_type === "OneWayOutstation" ||
        booking_type === "RoundTripOutstation",
    },
    {
      label: "Remaining Time Fare",
      estimatedFare: formatAmount(
        estimatedRiderBillingData?.remaining_time_fare
      ),
      finalFare: formatAmount(riderBillingData?.remaining_time_fare),
      formikValue: formik?.values?.RemainingTimeFare,
      name: "RemainingTimeFare",
      editable:
        type === "Ongoing_Bookings"
          ? false
          : booking_type === "OneWayOutstation"
          ? true
          : false,
      display: booking_type === "OneWayOutstation",
    },
    {
      label: "Extra Km Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.extra_km_fare),
      finalFare: formatAmount(riderBillingData?.extra_km_fare),
      formikValue: formik?.values?.ExtraKmFare,
      name: "ExtraKmFare",
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display:
        booking_type === "OneWayOutstation" ||
        booking_type === "RoundTripOutstation",
    },
    {
      label: "Extra Time Fare (Hrs)",
      estimatedFare: formatAmount(estimatedRiderBillingData?.extra_time_fare),
      finalFare: formatAmount(riderBillingData?.extra_time_fare),
      formikValue: formik?.values?.ExtraTimeFareHrs,
      name: "ExtraTimeFareHrs",
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display:
        booking_type === "OneWayOutstation" ||
        booking_type === "RoundTripOutstation",
    },
    //  outStation end
    {
      label: "Waiting Fee",
      estimatedFare: formatAmount(estimatedRiderBillingData?.waiting_fee),
      finalFare: formatAmount(riderBillingData?.waiting_fee),
      formikValue: formik?.values?.WaitingFee,
      name: "WaitingFee",
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display: true,
    },
    {
      label: "Cancellation Fee",
      estimatedFare: formatAmount(estimatedRiderBillingData?.cancellation_fee),
      finalFare: formatAmount(riderBillingData?.cancellation_fee),
      formikValue: formik?.values?.cancellationFee,
      name: "cancellationFee",
      editable: type === "Cancelled_Bookings" ? true : false,
      display: true,
    },
    {
      label: "Trip Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.trip_fare),
      finalFare: formatAmount(riderBillingData?.trip_fare),
      name: "TripFare",
      formikValue: formik?.values?.TripFare,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display: true,
    },
    {
      label: "Coupon Savings",
      estimatedFare: formatAmount(estimatedRiderBillingData?.coupon_savings),
      finalFare: formatAmount(riderBillingData?.coupon_savings),
      editable: false,
      display: true,
    },
    {
      label: "Trip Fare (after coupon savings)",
      estimatedFare: formatAmount(
        estimatedRiderBillingData?.trip_fare_after_coupon
      ),
      finalFare: formatAmount(riderBillingData?.trip_fare_after_coupon),
      name: "TripFareAfterCouponSavings",
      formikValue: formik?.values?.TripFareAfterCouponSavings,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display: true,
    },
    {
      label: "SGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.sgst),
      finalFare: formatAmount(riderBillingData?.sgst),
      editable: false,
      display: true,
    },
    {
      label: "CGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.cgst),
      finalFare: formatAmount(riderBillingData?.cgst),
      editable: false,
      display: true,
    },
    {
      label: "IGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.igst),
      finalFare: formatAmount(riderBillingData?.igst),
      editable: false,
      display: true,
    },
    // booking fee
    {
      label: "Booking Fee",
      estimatedFare: formatAmount(estimatedRiderBillingData?.booking_fee),
      finalFare: formatAmount(riderBillingData?.booking_fee),
      name: "BookingFee",
      formikValue: formik?.values?.BookingFee,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display: true,
    },
    {
      label: "SGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.b_sgst),
      finalFare: formatAmount(riderBillingData?.b_sgst),
      editable: false,
      display: true,
    },
    {
      label: "CGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.b_cgst),
      finalFare: formatAmount(riderBillingData?.b_cgst),
      editable: false,
      display: true,
    },
    {
      label: "IGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.b_igst),
      finalFare: formatAmount(riderBillingData?.b_igst),
      editable: false,
      display: true,
    },
    // booking fee end
    // allowanceFees
    {
      label: "Night Allowance",
      estimatedFare: formatAmount(estimatedRiderBillingData?.night_allowance),
      finalFare: formatAmount(riderBillingData?.night_allowance),
      name: "NightAllowance",
      formikValue: formik?.values?.NightAllowance,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display:
        booking_type === "OneWayOutstation" ||
        booking_type === "RoundTripOutstation",
    },
    {
      label: "Driver Allowance",
      estimatedFare: formatAmount(estimatedRiderBillingData?.driver_allowance),
      finalFare: formatAmount(riderBillingData?.driver_allowance),
      name: "DriverAllowance",
      formikValue: formik?.values?.DriverAllowance,
      editable:
        type === "Cancelled_Bookings"
          ? !disableCancelBtn?.afterOtp
            ? true
            : false
          : type === "Ongoing_Bookings"
          ? false
          : true,
      display:
        booking_type === "OneWayOutstation" ||
        booking_type === "RoundTripOutstation",
    },
    {
      label: "SGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.n_sgst),
      finalFare: formatAmount(riderBillingData?.n_sgst),
      editable: false,
      display:
        booking_type === "OneWayOutstation" ||
        booking_type === "RoundTripOutstation",
    },
    {
      label: "CGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.n_cgst),
      finalFare: formatAmount(riderBillingData?.n_cgst),
      editable: false,
      display:
        booking_type === "OneWayOutstation" ||
        booking_type === "RoundTripOutstation",
    },
    {
      label: "IGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.n_igst),
      finalFare: formatAmount(riderBillingData?.n_igst),
      editable: false,
      display:
        booking_type === "OneWayOutstation" ||
        booking_type === "RoundTripOutstation",
    },
    // allowanceFees end
    // trip fee
    {
      label: "Tolls",
      estimatedFare: formatAmount(estimatedRiderBillingData?.tolls_fee),
      finalFare: formatAmount(riderBillingData?.tolls_fee),
      editable: false,
      display: booking_type === "LocalTrip",
    },
    {
      label: "Parking",
      estimatedFare: formatAmount(estimatedRiderBillingData?.parking_fee),
      finalFare: formatAmount(riderBillingData?.parking_fee),
      editable: false,
      display: booking_type === "LocalTrip",
    },
    {
      label: "Transport Hub Fee",
      estimatedFare: formatAmount(estimatedRiderBillingData?.transport_hub_fee),
      finalFare: formatAmount(riderBillingData?.transport_hub_fee),
      editable: false,
      display: booking_type === "LocalTrip",
    },
    {
      label: "Tips",
      estimatedFare: formatAmount(estimatedRiderBillingData?.tips),
      finalFare: formatAmount(riderBillingData?.tips),
      editable: false,
      display: true,
    },
    // trip fee end
    // total fee
    {
      label: "Total SGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.total_sgst),
      finalFare: formatAmount(riderBillingData?.total_sgst),
      editable: false,
      display: true,
    },
    {
      label: "Total CGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.total_cgst),
      finalFare: formatAmount(riderBillingData?.total_cgst),
      editable: false,
      display: true,
    },
    {
      label: "Total IGST",
      estimatedFare: formatAmount(estimatedRiderBillingData?.total_igst),
      finalFare: formatAmount(riderBillingData?.total_igst),
      editable: false,
      display: true,
    },
    {
      label: "Total Taxes",
      estimatedFare: formatAmount(estimatedRiderBillingData?.total_taxes),
      finalFare: formatAmount(riderBillingData?.total_taxes),
      editable: false,
      display: true,
    },
    {
      label: "Total Trip Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.total_trip_fare),
      finalFare: formatAmount(riderBillingData?.total_trip_fare),
      editable: false,
      display: true,
    },
    {
      label: "Total Trip Fare (Including Taxes)",
      estimatedFare: formatAmount(
        estimatedRiderBillingData?.total_trip_fare_with_taxes
      ),
      finalFare: formatAmount(riderBillingData?.total_trip_fare_with_taxes),
      editable: false,
      display: true,
    },
    {
      label: "Total Trip Fare (Rounded Off)",
      estimatedFare: formatAmount(
        estimatedRiderBillingData?.total_trip_fare_rounded_off
      ),
      finalFare: formatAmount(riderBillingData?.total_trip_fare_rounded_off),
      editable: false,
      display: true,
    },
    {
      label: "Pending Amount From Previous Trips",
      estimatedFare: formatAmount(
        estimatedRiderBillingData?.pending_amount_previous
      ),
      finalFare: formatAmount(riderBillingData?.pending_amount_previous),
      editable: false,
      display: true,
    },
    {
      label: "Final Fare",
      estimatedFare: formatAmount(estimatedRiderBillingData?.final_fare),
      finalFare: formatAmount(riderBillingData?.final_fare),
      editable: false,
      display: true,
    },
    {
      label: "Wallet Balance Applied",
      estimatedFare: formatAmount(
        estimatedRiderBillingData?.wallet_amount_applied
      ),
      finalFare: formatAmount(riderBillingData?.wallet_amount_applied),
      editable: false,
      display: true,
    },
    {
      label: "Total Amount Received",
      estimatedFare: formatAmount(
        estimatedRiderBillingData?.total_amount_recevied
      ),
      finalFare: formatAmount(riderBillingData?.total_amount_recevied),
      name: "TotalAmountReceived",
      formikValue: formik?.values?.TotalAmountReceived,
      editable: type === "Ongoing_Bookings" ? false : true,
      display: true,
    },
    // total fee end
  ];

  return (
    <>
      <div className="mt-4">
        <span className="fs_16 fw_600 primary_color heading_border_bottom">
          Rider Billing
        </span>
      </div>

      <table className="w-100 fs_14 fw_600 mt-2 ">
        <tbody>
          <tr className="fs_12 primary_color fw_600 rider_billing_headings ">
            <th className="py-2 rider_billing_first_list"></th>
            <th className="py-2">Estimated</th>
            <th className="py-2 rider_billing_last_list px-2">Final</th>
          </tr>
          {allFeeDataDetails
            ?.filter((item) => item?.display === true)
            ?.map((user, index) => {
              return (
                <>
                  <tr className="rider_billing_datas" key={index}>
                    <td className="ps-2 primary_color">{user?.label}</td>
                    <td className="secondary_color">{user?.estimatedFare}</td>
                    {user?.editable === true && formik !== undefined ? (
                      <td className="secondary_color ps-2">
                        <input
                          className={`${
                            billingDetailsEdit
                              ? "rider_billing_input_edit fw_600 secondary_color border_radius_3px background_none outline_none"
                              : "rider_billing_input fw_600 secondary_color border_radius_3px background_none outline_none border_none"
                          }  `}
                          value={user?.formikValue}
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          name={user?.name}
                          placeholder="--"
                          autoComplete="off"
                          disabled={!billingDetailsEdit}
                        />
                      </td>
                    ) : (
                      <td className="secondary_color ps-2">
                        {user?.finalFare}
                      </td>
                    )}
                  </tr>
                  {(user?.label === "IGST" || user?.label === "Tips") && (
                    <tr className="table_lines mx-2" />
                  )}
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default RiderBilling;
