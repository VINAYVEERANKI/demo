import React from "react";

const DriverBillings = ({driverBillingDatas}) => {
  const driverBillingData = driverBillingDatas?.billingDetails?.driver_billing;
  const localDriverBillings = [
    {
      label: "Driver Commission (Before)",
      value:
        driverBillingData?.driver_commission_before !== null
          ? parseFloat(driverBillingData?.driver_commission_before).toFixed(2)
          : "--",
    },
    {
      label: "Coupon Impact On Commission",
      value:
        driverBillingData?.coupon_impact_on_commission !== null
          ? parseFloat(driverBillingData?.coupon_impact_on_commission).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Cashback Impact On Commission",
      value:
        driverBillingData?.cashback_impact_on_commission !== null
          ? parseFloat(
              driverBillingData?.cashback_impact_on_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "Driver Commission (After)",
      value:
        driverBillingData?.driver_commission_after !== null
          ? parseFloat(driverBillingData?.driver_commission_after).toFixed(2)
          : "--",
    },
    {
      label: "Toll Fee",
      value:
        driverBillingData?.tolls_fee !== null
          ? parseFloat(driverBillingData?.tolls_fee).toFixed(2)
          : "--",
    },
    {
      label: "Tips",
      value:
        driverBillingData?.tips !== null
          ? parseFloat(driverBillingData?.tips).toFixed(2)
          : "--",
    },
    {
      label: "Parking",
      value:
        driverBillingData?.parking_fee !== null
          ? parseFloat(driverBillingData?.parking_fee).toFixed(2)
          : "--",
    },
    {
      label: "Transport Hub Fee",
      value:
        driverBillingData?.transport_hub_fee !== null
          ? parseFloat(driverBillingData?.transport_hub_fee).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission",
      value:
        driverBillingData?.total_driver_commission !== null
          ? parseFloat(driverBillingData?.total_driver_commission).toFixed(2)
          : "--",
    },
    {
      label: "TDS",
      value:
        driverBillingData?.tds !== null
          ? parseFloat(driverBillingData?.tds).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      value:
        driverBillingData?.sgst !== null
          ? parseFloat(driverBillingData?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      value:
        driverBillingData?.cgst !== null
          ? parseFloat(driverBillingData?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      value:
        driverBillingData?.igst !== null
          ? parseFloat(driverBillingData?.igst).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission With Taxes",
      value:
        driverBillingData?.total_driver_commission_with_taxes !== null
          ? parseFloat(
              driverBillingData?.total_driver_commission_with_taxes
            ).toFixed(2)
          : "--",
    },
  ];

  const rentalDriverBillings = [
    {
      label: "Driver Commission (Before)",
      value:
        driverBillingData?.driver_commission_before !== null
          ? parseFloat(driverBillingData?.driver_commission_before).toFixed(2)
          : "--",
    },
    {
      label: "Coupon Impact On Commission",
      value:
        driverBillingData?.coupon_impact_on_commission !== null
          ? parseFloat(driverBillingData?.coupon_impact_on_commission).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Cashback Impact On Commission",
      value:
        driverBillingData?.cashback_impact_on_commission !== null
          ? parseFloat(
              driverBillingData?.cashback_impact_on_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "Driver Commission (After)",
      value:
        driverBillingData?.driver_commission_after !== null
          ? parseFloat(driverBillingData?.driver_commission_after).toFixed(2)
          : "--",
    },

    {
      label: "Tips",
      value:
        driverBillingData?.tips !== null
          ? parseFloat(driverBillingData?.tips).toFixed(2)
          : "--",
    },

    {
      label: "Total Driver Commission",
      value:
        driverBillingData?.total_driver_commission !== null
          ? parseFloat(driverBillingData?.total_driver_commission).toFixed(2)
          : "--",
    },
    {
      label: "TDS",
      value:
        driverBillingData?.tds !== null
          ? parseFloat(driverBillingData?.tds).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      value:
        driverBillingData?.sgst !== null
          ? parseFloat(driverBillingData?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      value:
        driverBillingData?.cgst !== null
          ? parseFloat(driverBillingData?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      value:
        driverBillingData?.igst !== null
          ? parseFloat(driverBillingData?.igst).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission With Taxes",
      value:
        driverBillingData?.total_driver_commission_with_taxes !== null
          ? parseFloat(
              driverBillingData?.total_driver_commission_with_taxes
            ).toFixed(2)
          : "--",
    },
  ];
  const OnewayandRoundTripdriverBilling = [
    {
      label: "Driver Commission (Before)",
      value:
        driverBillingData?.driver_commission_before !== null
          ? parseFloat(driverBillingData?.driver_commission_before).toFixed(2)
          : "--",
    },
    {
      label: "Coupon Impact On Commission",
      value:
        driverBillingData?.coupon_impact_on_commission !== null
          ? parseFloat(driverBillingData?.coupon_impact_on_commission).toFixed(
              2
            )
          : "--",
    },
    {
      label: "Cashback Impact On Commission",
      value:
        driverBillingData?.cashback_impact_on_commission !== null
          ? parseFloat(
              driverBillingData?.cashback_impact_on_commission
            ).toFixed(2)
          : "--",
    },
    {
      label: "Driver Commission (After)",
      value:
        driverBillingData?.driver_commission_after !== null
          ? parseFloat(driverBillingData?.driver_commission_after).toFixed(2)
          : "--",
    },
    {
      label: "Night Allowance",
      value:
        driverBillingData?.night_allowance !== null
          ? parseFloat(driverBillingData?.night_allowance).toFixed(2)
          : "--",
    },
    {
      label: "Driver Allowance",
      value:
        driverBillingData?.driver_allowance !== null
          ? parseFloat(driverBillingData?.driver_allowance).toFixed(2)
          : "--",
    },
    {
      label: "Tips",
      value:
        driverBillingData?.tips !== null
          ? parseFloat(driverBillingData?.tips).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission",
      value:
        driverBillingData?.total_driver_commission !== null
          ? parseFloat(driverBillingData?.total_driver_commission).toFixed(2)
          : "--",
    },
    {
      label: "TDS",
      value:
        driverBillingData?.tds !== null
          ? parseFloat(driverBillingData?.tds).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      value:
        driverBillingData?.sgst !== null
          ? parseFloat(driverBillingData?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      value:
        driverBillingData?.cgst !== null
          ? parseFloat(driverBillingData?.cgst).toFixed(2)
          : "--",
    },

    {
      label: "IGST",
      value:
        driverBillingData?.igst !== null
          ? parseFloat(driverBillingData?.igst).toFixed(2)
          : "--",
    },
    {
      label: "Total Driver Commission With Taxes",
      value:
        driverBillingData?.total_driver_commission_with_taxes !== null
          ? parseFloat(
              driverBillingData?.total_driver_commission_with_taxes
            ).toFixed(2)
          : "--",
    },
  ];

  const driverBillingFn = () => {
    if (driverBillingDatas?.tripInformation?.booking_type === "LocalTrip") {
      return localDriverBillings;
    } else if (
      driverBillingDatas?.tripInformation?.booking_type === "RentalTrip"
    ) {
      return rentalDriverBillings;
    } else if (
      driverBillingDatas?.tripInformation?.booking_type === "OneWayOutstation"
    ) {
      return OnewayandRoundTripdriverBilling;
    } else if (
      driverBillingDatas?.tripInformation?.booking_type ===
      "RoundTripOutstation"
    ) {
      return OnewayandRoundTripdriverBilling;
    }
  };

  const DriverBillings = driverBillingFn();
  return (
    <>
      <div className="mt-3">
        <span className="fs_16 fw_600 primary_color heading_border_bottom">
          Driver Billing
        </span>
      </div>
      <>
        <table className="w-100 mt-2 fs_14 fw_600">
          <tbody>
            {DriverBillings?.map((user) => (
              <tr key={user?.label}>
                <td className="primary_color w_85">{user?.label}</td>
                <td className="secondary_color w-25">{user?.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </>
  );
};

export default DriverBillings;
