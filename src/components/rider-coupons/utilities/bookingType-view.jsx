import React from "react";
import "../../rider-coupons/coupon-component.css";

const BookingTypeView = ({ formik }) => {
  return (
    <div
      className={
        formik.errors.bookingType?.bookingTypeAtleastOne &&
          formik.touched.bookingType?.bookingTypeAtleastOne
          ? "w-100 disabled_view_bg booking_type_block error_border border_radius_3px p-1 ps-2"
          : "w-100 disabled_view_bg booking_type_block primary_border border_radius_3px p-1 ps-2"
      }
    >
      <div className="row">
        <div className="col-6">
          <div className="">
            <input
              disabled={true}
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
            />
            <label className="ps-2 fs_12 primary_color fw_500" htmlFor="local">
              Local
            </label>
          </div>
          <div>
            <input
              disabled={true}
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
            />
            <label className="ps-2 fs_12 primary_color fw_500" htmlFor="rental">
              Rental
            </label>
          </div>
        </div>
        <div className="col-6">
          <div>
            <input
              disabled={true}
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
              disabled={true}
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

export default BookingTypeView;
