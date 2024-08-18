import React from "react";

const ComrideBillingDetails = ({ ongoingBookingData }) => {
  const comrideBillingData =
    ongoingBookingData?.billingDetails?.comride_billing;

  const comrideBillingDetails = [
    {
      label: "Comride Commission (Before)",
      value:
        comrideBillingData?.comride_commission_before !== null
          ? parseFloat(comrideBillingData?.comride_commission_before).toFixed(2)
          : "--",
    },
    {
      label: "Coupon Impact On Commission",
      value:
        comrideBillingData?.coupon_impact_on_commission !== null
          ? parseFloat(comrideBillingData?.coupon_impact_on_commission).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Cashback Impact On Commission",
      value:
        comrideBillingData?.cashback_impact_on_commission !== null
          ? parseFloat(
              comrideBillingData?.cashback_impact_on_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "Comride Commission (After)",
      value:
        comrideBillingData?.comride_commission_after !== null
          ? parseFloat(comrideBillingData?.comride_commission_after).toFixed(2)
          : "--",
    },
    {
      label: "Booking Fee",
      value:
        comrideBillingData?.booking_fee !== null
          ? parseFloat(comrideBillingData?.booking_fee).toFixed(2)
          : "--",
    },
    {
      label: "Total Comride Commission",
      value:
        comrideBillingData?.total_comride_commission !== null
          ? parseFloat(comrideBillingData?.total_comride_commission).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      value:
        comrideBillingData?.sgst !== null
          ? parseFloat(comrideBillingData?.sgst).toFixed(2)
          : "--",
    },

    {
      label: "CGST",
      value:
        comrideBillingData?.cgst !== null
          ? parseFloat(comrideBillingData?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      value:
        comrideBillingData?.igst !== null
          ? parseFloat(comrideBillingData?.igst).toFixed(2)
          : "--",
    },
    {
      label: "Total Comride Commission With Taxes",
      value:
        comrideBillingData?.total_comride_commission_with_taxes !== null
          ? parseFloat(
              comrideBillingData?.total_comride_commission_with_taxes
            ).toFixed(2)
          : "--",
    },
  ];
  return (
    <>
      {" "}
      <div className="mt-3">
        <span className="fs_16 fw_600 primary_color heading_border_bottom">
          Comride Billing
        </span>
      </div>
      <div>
        <table className="w-100 mt-2 fs_14 fw_600">
          <tbody>
            {comrideBillingDetails?.map((user) => {
              return (
                <tr key={user?.label}>
                  <td className="primary_color w_85">{user?.label}</td>
                  <td className="secondary_color w-25">{user?.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ComrideBillingDetails;
