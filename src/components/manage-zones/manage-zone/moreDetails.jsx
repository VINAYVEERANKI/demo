import moment from "moment";
import React from "react";

const MoreDetails = ({ mainOneData, zoneData }) => {
  const updatedOn = zoneData?.state?.updatedOn;
  const updatedBy = zoneData?.state?.updatedBy;
  const createdBy = zoneData?.state?.createdBy;
  console.log(zoneData);
  const data = [
    {
      label: "Created at",
      value:
        mainOneData?.createdAt !== null
          ? moment(mainOneData?.createdAt).format("DD-MM-YYYY   , HH:mm")
          : "--",
    },
    {
      label: "Created by",
      value: createdBy ? createdBy : "--",
      // !== null
    },
    {
      label: "updated at",
      value:
        updatedOn !== null
          ? moment(updatedOn).format("DD-MM-YYYY, HH:mm")
          : "--",
    },
    {
      label: "updated by",
      value: updatedBy ? updatedBy : "--",
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
