import React from "react";
import moment from "moment";

const MoreDetails = ({ faqData }) => {
  const data = [
    {
      label: "Created at",
      value: faqData?.createdAt
        ? moment(faqData?.createdAt).format("DD-MM-YYYY   , HH:mm")
        : "--",
    },
    {
      label: "Created by",
      value: faqData?.CreatedBy?.user_name
        ? faqData?.CreatedBy?.user_name
        : "--",
    },
    {
      label: "Updated at",
      value: faqData?.updatedAt
        ? moment(faqData?.updatedAt).format("DD-MM-YYYY   , HH:mm")
        : "--",
    },
    {
      label: "Updated by",
      value: faqData?.UpdatedBy?.user_name
        ? faqData?.UpdatedBy?.user_name
        : "--",
    },
  ];
  return (
    <div className="my-1">
      <table>
        <tbody>
          <tr className="">
            <td className="">Details</td>
          </tr>
          {data?.map((item) => {
            return (
              <tr className="" key={item?.label}>
                <td className="secondary_color text-nowrap fw_600 fs_14 text-start ps-2">
                  {item?.label}
                </td>
                <td className="ps-3 secondary_color fs_14 fw_600 text-nowrap">
                  :
                </td>
                <td className="ps-1 primary_color fs_14 fw_600 text-start text-nowrap">
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
