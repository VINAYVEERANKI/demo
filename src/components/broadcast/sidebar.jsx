import React from "react";
import { statusColor } from "../helper";

const BroadcastSidebar = ({ sideBarData }) => {
  return (
    <>
      <table className="fs_14 fw_500">
        <tbody>
          {sideBarData?.map((item) => {
            return (
              <React.Fragment key={item?.label}>
                <tr>
                  <td className={`secondary_color  pe-3 pt-1`}>{item?.label}</td>
                  <td
                    className={` ${
                      item?.label === "Broadcast Status"
                        ? `${statusColor(item?.value)}`
                        : ` primary_color`
                    } pt-1`}
                    style={{ whiteSpace: "nowrap" }}
                    valign="top"
                  >
                    {item?.value ? item?.value : "--"}
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

export default BroadcastSidebar;
