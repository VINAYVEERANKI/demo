import React from 'react'

const BookingDriverFine = ({BookingDriverFineData}) => {
    const driverFineDetails = BookingDriverFineData?.billingDetails?.driver_fine;
  const driverFineData = [
    {
      label: "Fine Amount",
      value:
        driverFineDetails?.fine_amount !== null
          ? parseFloat(driverFineDetails?.fine_amount).toFixed(2)
          : "--",
    },
    {
      label: "SGST",
      value:
        driverFineDetails?.sgst !== null
          ? parseFloat(driverFineDetails?.sgst).toFixed(2)
          : "--",
    },
    {
      label: "CGST",
      value:
        driverFineDetails?.cgst !== null
          ? parseFloat(driverFineDetails?.cgst).toFixed(2)
          : "--",
    },
    {
      label: "IGST",
      value:
        driverFineDetails?.igst !== null
          ? parseFloat(driverFineDetails?.igst).toFixed(2)
          : "--",
    },
    {
      label: "Total Fine Amount",
      value:
        driverFineDetails?.total_fine_amount !== null
          ? parseFloat(driverFineDetails?.total_fine_amount).toFixed(2)
          : "--",
    },
  ];
  return (
    <>
    <div className="mt-3">
      <span className="fs_18 fw_600 primary_color heading_border_bottom">
        Driver Fine
      </span>
    </div>
    <>
      <table className="w-100 mt-2 fs_14 fw_600">
        <tbody>
          {driverFineData?.map((user) => (
            <tr key={user?.label}>
              <td className="primary_color w_85">{user?.label}</td>
              <td className="secondary_color w-25">{user?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  </>
  )
}

export default BookingDriverFine