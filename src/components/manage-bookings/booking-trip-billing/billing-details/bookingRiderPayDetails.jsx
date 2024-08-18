import React from "react";

const BookingRiderPayDetails = ({ riderPayDetails }) => {
  const riderpaymentData = riderPayDetails?.billingDetails?.rider_details;

  const riderPaymentdetails = [
    {
      label: "Amount received for this trip",
      value:
        riderpaymentData?.amount_receive_for_this_trip !== null
          ? parseFloat(riderpaymentData?.amount_receive_for_this_trip).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Amount pending from this trip",
      value:
        riderpaymentData?.amount_pending_for_this_trip !== null
          ? parseFloat(riderpaymentData?.amount_pending_for_this_trip).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Amount to be refunded",
      value:
        riderpaymentData?.amount_to_be_refunded !== null
          ? parseFloat(riderpaymentData?.amount_to_be_refunded).toFixed(2)
          : "--",
    },
    {
      label: "Amount refunded",
      value:
        riderpaymentData?.amount_refunded !== null
          ? parseFloat(riderpaymentData?.amount_refunded).toFixed(2)
          : "--",
    },
    {
      label: "Total trip fare adjusted amount",
      value:
        riderpaymentData?.total_trip_fare_adjusted_amount !== null
          ? parseFloat(
              riderpaymentData?.total_trip_fare_adjusted_amount
            ).toFixed(2)
          : "--",
    },
  ];
  return (
    <>
      <div className="mt-5">
        <span className="fs_16 fw_600 primary_color heading_border_bottom">
          Rider Payment Details
        </span>
      </div>
      <div>
        <table className="w-100 mt-2 fs_14 fw_600">
          <tbody>
            {riderPaymentdetails?.map((user) => (
              <tr key={user?.label}>
                <td className="primary_color w_85">{user?.label}</td>
                <td className="secondary_color w-25">{user?.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingRiderPayDetails;
