import React from "react";
import { statusColor } from "../../helper";

const DriverCouponSidebar = ({ couponDetails }) => {
  return (
    <>
      <table className="fs_14 fw_500">
        <tbody>
          {couponDetails?.map((item) => {
            return (
              <React.Fragment key={item?.label}>
                {item?.subheading ? (
                  <tr>
                    <td
                      className="fs_16 primary_color fw_500 text_underline pt-4"
                      colSpan="2"
                    >
                      {item?.subheading}
                    </td>
                  </tr>
                ) : (
                  <></>
                )}

                <tr>
                  <td className={`secondary_color  pe-3`}>{item?.label}</td>
                  <td
                    className={` ${
                      item?.label === "Coupon status"
                        ? `${statusColor(item?.value)}`
                        : ` primary_color`
                    } `}
                    style={{ whiteSpace: "nowrap" }}
                    valign="top"
                  >
                    {item?.value}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DriverCouponSidebar;
