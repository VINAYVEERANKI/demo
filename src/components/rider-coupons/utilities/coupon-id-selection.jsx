import React from "react";

const CouponIdSelection = ({ couponData }) => {
  return (
    <div>
      <table className="fs_12 fw_500">
        <tr>
          <td className="secondary_color">Coupon ID</td>
          <td className="primary_color">{couponData?.couponID
              ? couponData?.couponID
              : "--"}</td>
        </tr>
        <tr>
          <td className="secondary_color">User Type</td>
          <td className="primary_color">Rider</td>
        </tr>
        <tr>
          <td className="secondary_color">Coupon Classification</td>
          <td className="primary_color">
            {couponData?.couponClassification
              ? couponData?.couponClassification
              : "--"}
          </td>
        </tr>
        <tr>
          <td className="secondary_color">Coupon Classification Details</td>
          <td className="primary_color">
            {couponData?.couponClassificationDetails
              ? couponData?.couponClassificationDetails
              : "--"}
          </td>
        </tr>
        <tr>
          <td className="secondary_color">Coupon Applicable Zone</td>
          <td className="primary_color">
            {couponData?.couponApplicableZone
              ? couponData?.couponApplicableZone
              : "--"}
          </td>
        </tr>
        <tr>
          <td className="secondary_color">Coupon Type</td>
          <td className="primary_color">
            {couponData?.couponType ? couponData?.couponType : "--"}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CouponIdSelection;
