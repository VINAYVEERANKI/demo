import React from "react";
import { couponTypeName, removeUnderScore, statusColor } from "../../helper";

const DriverIncentivesSideBar = ({data}) => {
  return (
    <div>
      <table className="fs_14 fw_500">
        {data?.map(
          (item, id) =>
            item?.display && (
              <tbody key={id}>
                {item?.heading && (
                  <tr className="">
                    <td
                      className="fs_16 primary_color fw_500 text_underline pt-3 pb-2"
                      colSpan="2"
                    >
                      {item?.heading}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="secondary_color pe-2 w-50" valign="top">
                    {item?.label}
                  </td>
                  <td
                    className={
                      item?.label === "Referral Status"
                        ? statusColor(item?.value)
                        : `primary_color`
                    }
                    valign="top"
                  >
                    {item?.value}
                  </td>
                </tr>
              </tbody>
            )
        )}
      </table>
    </div>
  );
};

export default DriverIncentivesSideBar;
