import React from "react";
import { statusColor } from "../../helper";
import "../../rider-coupons/coupon-component.css";

const CampaignDetailsInput = ({
  formik,
  couponData,
  campaignStatus,
  is_editable,
  status,
}) => {
  return (
    <div className="discount_detials_container mt-3 px-3 p-2">
      <span className="primary_color fs_16 fw_500">Campaign Details</span>
      <div className="campaign_details_container mt-1">
        <table className="w-100">
          <tbody>
            <tr className="pale_blue_bg primary_color fw_500 fs_14">
              <td
                className={
                  formik.errors.startDate && formik.touched.startDate
                    ? "first_list ps-2 red_color fs_16 fw_500 py-1"
                    : "first_list ps-2 primary_color fs_16 fw_500 py-1"
                }
              >
                Start Date*
              </td>
              <td
                className={
                  formik.errors.startTime && formik.touched.startTime
                    ? "red_color fs_16 fw_500 py-1"
                    : "primary_color fs_16 fw_500 py-1"
                }
              >
                Start Time*
              </td>
              <td
                className={
                  formik.errors.expiryDate && formik.touched.expiryDate
                    ? "red_color fs_16 fw_500 py-1"
                    : "primary_color fs_16 fw_500 py-1"
                }
              >
                Expiry Date*
              </td>
              <td
                className={
                  formik.errors.expiryTime && formik.touched.expiryTime
                    ? "red_color fs_16 fw_500 py-1"
                    : "primary_color fs_16 fw_500 py-1"
                }
              >
                Expiry Time*
              </td>
              <td className={`${styles.last_list} transparent_bg`}>Campaign Status</td>
            </tr>
            <tr className="">
              <td className="ps-2 pt-2">
                <input
                  type="date"
                  className={
                    formik.errors.startDate && formik.touched.startDate
                      ? "w-75 border_radius_3px error_border outline_none p-1"
                      : `${
                          couponData?.edit === false ||
                          is_editable === false ||
                          status === "Active" ||
                          status === "ReviewPendingUpdated"
                            ? "disabled_border disabled_bg_color secondary_color"
                            : "primary_border primary_color white_bg"
                        }w-75 border_radius_3px outline_none p-1`
                  }
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={
                    couponData?.edit === false ||
                    status === "Active" ||
                    status === "ReviewPendingUpdated"
                      ? true
                      : false || is_editable === false
                  }
                  max="9999-12-31"
                />
              </td>
              <td className="pt-2">
                <input
                  type="time"
                  className={
                    formik.errors.startTime && formik.touched.startTime
                      ? "w-75 border_radius_3px error_border outline_none p-1"
                      : `${
                          couponData?.edit === false ||
                          is_editable === false ||
                          status === "Active" ||
                          status === "ReviewPendingUpdated"
                            ? "disabled_border disabled_bg_color secondary_color"
                            : "primary_border primary_color white_bg"
                        }w-75 border_radius_3px outline_none p-1`
                  }
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={
                    couponData?.edit === false ||
                    status === "Active" ||
                    status === "ReviewPendingUpdated"
                      ? true
                      : false || is_editable === false
                  }
                />
              </td>
              <td className="pt-2">
                <input
                  type="date"
                  className={
                    formik.errors.expiryDate && formik.touched.expiryDate
                      ? "w-75 border_radius_3px error_border outline_none p-1"
                      : `${
                          couponData?.edit === false || is_editable === false
                            ? "disabled_border disabled_bg_color secondary_color"
                            : "primary_border primary_color white_bg"
                        }w-75 border_radius_3px outline_none p-1`
                  }
                  name="expiryDate"
                  value={formik.values.expiryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={
                    couponData?.edit === false
                      ? true
                      : false || is_editable === false
                  }
                  max="9999-12-31"
                />
              </td>
              <td className="pt-2">
                <input
                  type="time"
                  className={
                    formik.errors.expiryTime && formik.touched.expiryTime
                      ? "w-75 border_radius_3px error_border outline_none p-1"
                      : `${
                          couponData?.edit === false || is_editable === false
                            ? "disabled_border disabled_bg_color secondary_color"
                            : "primary_border primary_color white_bg"
                        }w-75 border_radius_3px outline_none p-1`
                  }
                  name="expiryTime"
                  value={formik.values.expiryTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={
                    couponData?.edit === false
                      ? true
                      : false || is_editable === false
                  }
                />
              </td>
              <td className={`pt-2 ${statusColor(campaignStatus)} fw_500`}>
                {campaignStatus ?? "--"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignDetailsInput;
