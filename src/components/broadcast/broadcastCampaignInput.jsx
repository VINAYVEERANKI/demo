import React, { useRef } from "react";
import { useState } from "react";
import { statusColor } from "../helper";
import "../coupons/riderCoupons/coupon-component.css";
import CouponDetails from "../coupons/riderCoupons/coupondetails";
import useDisplayToggle from "../useDisplayToggle";

const BroadCastCampaignInput = ({
  broadcastData,
  formik,
  campaignStatus,
  is_editable,
  status,
}) => {

console.log(status,"status");

  const [broadcastDetails, setBroadcastDetails] = useState(false);
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setBroadcastDetails,
  });
  return (
    <div className="discount_detials_container px-3 p-2">
      <div className=" d-flex justify-content-between position-relative">
        <div className="primary_color fs_16 fw_500">Campaign Details</div>
        {status !== "create" ? (
          <>
            <div
              className="position-absolute top-0 end-0 mt-1 me-3 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
              onClick={() => setBroadcastDetails(!broadcastDetails)}
              ref={onClickRef}
            >
              More Details
            </div>
            {broadcastDetails ? (
              <>
                <div
                  className="coupon_details_block border white_bg border_radius"
                  ref={insideClickRef}
                >
                  <CouponDetails item={broadcastData} />
                </div>
              </>
            ) : null}
          </>
        ) : null}
      </div>
      <div className="campaign_details_container mt-3">
        <table className="w-100">
          <tbody>
            <tr className="pale_blue_bg primary_color fw_500 fs_14">
              <td
                className={
                  formik.errors.start_date && formik.touched.start_date
                    ? "first_list ps-2 red_color fs_16 fw_500 py-1"
                    : "first_list ps-2 primary_color fs_16 fw_500 py-1"
                }
              >
                Start Date*
              </td>
              <td
                className={
                  formik.errors.start_time && formik.touched.start_time
                    ? "red_color fs_16 fw_500 py-1"
                    : "primary_color fs_16 fw_500 py-1"
                }
              >
                Start Time*
              </td>
              <td
                className={
                  formik.errors.expiry_date && formik.touched.expiry_date
                    ? "red_color fs_16 fw_500 py-1"
                    : "primary_color fs_16 fw_500 py-1"
                }
              >
                Expiry Date*
              </td>
              <td
                className={
                  formik.errors.expiry_time && formik.touched.expiry_time
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
                    formik.errors.start_date && formik.touched.start_date
                      ? "w-75 border_radius_3px error_border outline_none p-1"
                      : `${
                          is_editable === false || status === "Active"
                            ? "disabled_border disabled_bg_color secondary_color"
                            : "primary_border primary_color white_bg"
                        } w-75 border_radius_3px outline_none p-1`
                  }
                  name="start_date"
                  value={formik.values.start_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={
                    status === "Active" ? true : false || is_editable === false
                  }
                  max="9999-12-31"
                />
              </td>
              <td className="pt-2">
                <input
                  type="time"
                  className={
                    formik.errors.start_time && formik.touched.start_time
                      ? "w-75 border_radius_3px error_border outline_none p-1"
                      : `${
                          is_editable === false || status === "Active"
                            ? "disabled_border disabled_bg_color secondary_color"
                            : "primary_border primary_color white_bg"
                        } w-75 border_radius_3px outline_none p-1`
                  }
                  name="start_time"
                  value={formik.values.start_time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={
                    status === "Active" ? true : false || is_editable === false
                  }
                />
              </td>
              <td className="pt-2">
                <input
                  type="date"
                  className={
                    formik.errors.expiry_date && formik.touched.expiry_date
                      ? "w-75 border_radius_3px error_border outline_none p-1"
                      : `${
                          is_editable === false
                            ? "disabled_border disabled_bg_color secondary_color"
                            : "primary_border primary_color white_bg"
                        } w-75 border_radius_3px outline_none p-1`
                  }
                  name="expiry_date"
                  value={formik.values.expiry_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={is_editable === false}
                  max="9999-12-31"
                />
              </td>
              <td className="pt-2">
                <input
                  type="time"
                  className={
                    formik.errors.expiry_time && formik.touched.expiry_time
                      ? "w-75 border_radius_3px error_border outline_none p-1"
                      : `${
                          is_editable === false
                            ? "disabled_border disabled_bg_color secondary_color"
                            : "primary_border primary_color white_bg"
                        }w-75 border_radius_3px outline_none p-1`
                  }
                  name="expiry_time"
                  value={formik.values.expiry_time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={is_editable === false}
                />
              </td>
              <td
                className={`pt-2 ${statusColor(campaignStatus ?? "--")} fw_500`}
              >
                {campaignStatus ?? "--"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BroadCastCampaignInput;
