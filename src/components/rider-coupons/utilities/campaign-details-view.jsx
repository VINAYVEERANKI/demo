import React from "react";
import "../../rider-coupons/coupon-component.css";

const CampaignDetailsView = ({ formik }) => {
  return (
    <div className="discount_detials_container mt-3 px-3 p-2">
      <span className="primary_color fs_16 fw_500">Campaign Details</span>
      <div className="campaign_details_container">
        <table className="w-100">
          <tr className="pale_blue_bg primary_color fw_500 fs_14">
            <td
              className={
                formik.errors.startDate && formik.touched.startDate
                  ? "first_list ps-2 red_color fs_16 fw_500"
                  : "first_list ps-2 primary_color fs_16 fw_500"
              }
            >
              Start Date*
            </td>
            <td
              className={
                formik.errors.startTime && formik.touched.startTime
                  ? "red_color fs_16 fw_500"
                  : "primary_color fs_16 fw_500"
              }
            >
              Start Time*
            </td>
            <td
              className={
                formik.errors.expiryDate && formik.touched.expiryDate
                  ? "red_color fs_16 fw_500"
                  : "primary_color fs_16 fw_500"
              }
            >
              Expiry Date*
            </td>
            <td
              className={
                formik.errors.expiryTime && formik.touched.expiryTime
                  ? "red_color fs_16 fw_500"
                  : "primary_color fs_16 fw_500"
              }
            >
              Expiry Time*
            </td>
            <td className={`${styles.last_list} transparent_bg`}>Campaign Status</td>
          </tr>
          <tr className="">
            <td className="ps-2 pt-2">
              <input
                disabled={true}
                type="date"
                className={
                  formik.errors.startDate && formik.touched.startDate
                    ? "w-75 disabled_view_bg border_radius_3px error_border outline_none p-1"
                    : "w-75 disabled_view_bg border_radius_3px primary_border outline_none p-1"
                }
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max="9999-12-31"
              />
            </td>
            <td className="pt-2">
              <input
                disabled={true}
                type="time"
                className={
                  formik.errors.startTime && formik.touched.startTime
                    ? "w-75 disabled_view_bg border_radius_3px error_border outline_none p-1"
                    : "w-75 disabled_view_bg border_radius_3px primary_border outline_none p-1"
                }
                name="startTime"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </td>
            <td className="pt-2">
              <input
                disabled={true}
                type="date"
                className={
                  formik.errors.expiryDate && formik.touched.expiryDate
                    ? "w-75 disabled_view_bg border_radius_3px error_border outline_none p-1"
                    : "w-75 disabled_view_bg border_radius_3px primary_border outline_none p-1"
                }
                name="expiryDate"
                value={formik.values.expiryDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max="9999-12-31"
              />
            </td>
            <td className="pt-2">
              <input
                disabled={true}
                type="time"
                className={
                  formik.errors.expiryTime && formik.touched.expiryTime
                    ? "w-75 disabled_view_bg border_radius_3px error_border outline_none p-1"
                    : "w-75 disabled_view_bg border_radius_3px primary_border outline_none p-1"
                }
                name="expiryTime"
                value={formik.values.expiryTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </td>
            <td className="pt-2">-</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CampaignDetailsView;
