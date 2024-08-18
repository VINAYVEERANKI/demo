import React from "react";
import "../../rider-coupons/coupon-component.css";

const BookingTypeInput = ({ formik, couponData }) => {
  return (
    <div
      className={
        formik.errors.bookingType?.bookingTypeAtleastOne &&
        formik.touched.bookingType?.bookingTypeAtleastOne
          ? "w-100 booking_type_block error_border border_radius_3px p-1 ps-2"
          : `${
              couponData?.edit === false ||
              couponData?.couponStatus === "Active"||
              couponData?.couponStatus === "ReviewPendingUpdated"
                ? "disabled_border disabled_bg_color"
                : "primary_border"
            } w-100 booking_type_block  border_radius_3px p-1 ps-2`
      }
    >
      <div className="row">
        <div className="col-6">
          {/* <div className="">
            <input
              type="checkbox"
              id="all"
              onChange={(e) => {
                formik.setFieldValue("bookingType", {
                  local: e.target.checked,
                  rental: e.target.checked,
                  one_way_outstation: e.target.checked,
                  round_trip_outstation: e.target.checked,
                  bookingTypeAtleastOne: "",
                });
              }}
            />
            <label className="ps-2 fs_12 primary_color fw_500" htmlFor="all">
              All
            </label>
          </div> */}
          <div className="">
            <input
              type="checkbox"
              id="local"
              name="local"
              onChange={() => {
                formik.setFieldValue("bookingType", {
                  ...formik.values.bookingType,
                  local: !formik.values.bookingType.local,
                });
              }}
              checked={formik.values.bookingType.local}
              disabled={
                couponData?.edit === false ||
                couponData?.couponStatus === "Active"||
                couponData?.couponStatus === "ReviewPendingUpdated"
                  ? true
                  : false
              }
            />
            <label className="ps-2 fs_12 primary_color fw_500" htmlFor="local">
              Local
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="rental"
              name="rental"
              onChange={() => {
                formik.setFieldValue("bookingType", {
                  ...formik.values.bookingType,
                  rental: !formik.values.bookingType.rental,
                });
              }}
              checked={formik.values.bookingType.rental}
              disabled={
                couponData?.edit === false ||
                couponData?.couponStatus === "Active"||
                couponData?.couponStatus === "ReviewPendingUpdated"
                  ? true
                  : false
              }
            />
            <label className="ps-2 fs_12 primary_color fw_500" htmlFor="rental">
              Rental
            </label>
          </div>
        </div>
        <div className="col-6">
          <div>
            <input
              type="checkbox"
              id="one_way_outstation"
              name="one_way_outstation"
              onChange={() => {
                formik.setFieldValue("bookingType", {
                  ...formik.values.bookingType,
                  one_way_outstation:
                    !formik.values.bookingType.one_way_outstation,
                });
              }}
              checked={formik.values.bookingType.one_way_outstation}
              disabled={
                couponData?.edit === false ||
                couponData?.couponStatus === "Active"||
                couponData?.couponStatus === "ReviewPendingUpdated"
                  ? true
                  : false
              }
            />
            <label
              className="ps-2 fs_12 primary_color fw_500"
              htmlFor="one_way_outstation"
            >
              Outstation (one-way)
            </label>
          </div>
          <div className="text-nowrap">
            <input
              type="checkbox"
              id="round_trip_outstation"
              name="round_trip_outstation"
              onChange={() => {
                formik.setFieldValue("bookingType", {
                  ...formik.values.bookingType,
                  round_trip_outstation:
                    !formik.values.bookingType.round_trip_outstation,
                });
              }}
              checked={formik.values.bookingType.round_trip_outstation}
              disabled={
                couponData?.edit === false ||
                couponData?.couponStatus === "Active"||
                couponData?.couponStatus === "ReviewPendingUpdated"
                  ? true
                  : false
              }
            />
            <label
              className="ps-2 fs_12 primary_color fw_500 text-nowrap"
              htmlFor="round_trip_outstation"
            >
              Outstation (Round trip)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTypeInput;
