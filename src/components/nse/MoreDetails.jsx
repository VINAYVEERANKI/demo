import React from "react";
import moment from "moment";

const MoreDetails = ({ nseData }) => {
  const data = [
    {
      label: "Last updated at",
      value:
        nseData?.updatedAt !== null
          ? moment(nseData?.updatedAt).format("DD-MM-YYYY   , HH:mm")
          : "--",
    },
    {
      label: "Last updated by",
      value: nseData?.UpdatedBy?.user_name
        ? nseData?.UpdatedBy?.user_name
        : "--",
    },
  ];
  return (
    <div className="my-1">
      <table>
        <tbody>
          {/* <tr className="">
          <td className="">
            Details
          </td>
        </tr> */}
          {data?.map((item) => {
            return (
              <tr className="" key={item?.label}>
                <td className="secondary_color text-nowrap fw_600 fs_14 text-start ps-2">
                  {item?.label}
                </td>
                <td className="ps-3 secondary_color fs_14 fw_600 text-nowrap">
                  :
                </td>
                <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                  {item?.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MoreDetails;
