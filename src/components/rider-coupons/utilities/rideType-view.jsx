import React from "react";
import "../../rider-coupons/coupon-component.css"

const RideTypeView = ({ formik }) => {
  console.log(formik?.values?.bookingType?.one_way_outstation);
  return (
    <div
      className={
        formik.errors.rideType?.altleastOne &&
          formik.touched.rideType?.altleastOne
          ? "w-100 disabled_view_bg  error_border border_radius_3px p-1 ps-2"
          : "w-100 disabled_view_bg  primary_border border_radius_3px p-1 ps-2"
      }
    >
      <div className="row">
        <div className="col-4">
          <div className="">
            <input
              disabled={true}
              type="checkbox"
              id="bike"
              name="bike"
              onChange={() => {
                formik.setFieldValue("rideType", {
                  ...formik.values.rideType,
                  bike: !formik.values.rideType.bike,
                });
              }}
              checked={formik.values.rideType.bike}
            />
            <label className={`${formik.values.bookingType.one_way_outstation || formik.values.bookingType.round_trip_outstation ? "disabled_color" : "primary_color"} ps-2 fs_12 primary_color fw_500`} htmlFor="bike">
              Bike
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="auto"
              name="auto"
              disabled={true}

              onChange={() => {
                formik.setFieldValue("rideType", {
                  ...formik.values.rideType,
                  auto: !formik.values.rideType.auto,
                });
              }}
              checked={formik.values.rideType.auto}
            />
            <label className={`${formik.values.bookingType.one_way_outstation || formik.values.bookingType.round_trip_outstation ? "disabled_color" : "primary_color"} ps-2 fs_12 primary_color fw_500`} htmlFor="bike">
              Auto
            </label>
          </div>
        </div>
        <div className="col-4">
          <div>
            <input
              disabled={true}
              type="checkbox"
              id="mini"
              name="mini"
              onChange={() => {
                formik.setFieldValue("rideType", {
                  ...formik.values.rideType,
                  mini: !formik.values.rideType.mini,
                });
              }}
              checked={formik.values.rideType.mini}
            />
            <label className="ps-2 fs_12 primary_color fw_500" htmlFor="mini">
              Mini
            </label>
          </div>
          <div className="text-nowrap">
            <input
              disabled={true}
              type="checkbox"
              id="sedan"
              name="sedan"
              onChange={() => {
                formik.setFieldValue("rideType", {
                  ...formik.values.rideType,
                  sedan: !formik.values.rideType.sedan,
                });
              }}
              checked={formik.values.rideType.sedan}
            />
            <label
              className="ps-2 fs_12 primary_color fw_500 text-nowrap"
              htmlFor="sedan"
            >
              Sedan
            </label>
          </div>
          <div className="text-nowrap">
            <input
              disabled={true}
              type="checkbox"
              id="SUV"
              name="SUV"
              onChange={() => {
                formik.setFieldValue("rideType", {
                  ...formik.values.rideType,
                  SUV: !formik.values.rideType.SUV,
                });
              }}
              checked={formik.values.rideType.SUV}
            />
            <label
              className="ps-2 fs_12 primary_color fw_500 text-nowrap"
              htmlFor="SUV"
            >
              SUV
            </label>
          </div>
        </div>
        <div className="col-4">
          <div>
            <input
              disabled={true}
              type="checkbox"
              id="premium_sedan"
              name="premium_sedan"
              onChange={() => {
                formik.setFieldValue("rideType", {
                  ...formik.values.rideType,
                  premium_sedan: !formik.values.rideType.premium_sedan,
                });
              }}
              checked={formik.values.rideType.premium_sedan}
            />
            <label
              className="ps-2 fs_12 primary_color fw_500"
              htmlFor="premium_sedan"
            >
              Premium Sedan
            </label>
          </div>
          <div className="text-nowrap">
            <input
              disabled={true}
              type="checkbox"
              id="luxury"
              name="luxury"
              onChange={() => {
                formik.setFieldValue("rideType", {
                  ...formik.values.rideType,
                  luxury: !formik.values.rideType.luxury,
                });
              }}
              checked={formik.values.rideType.luxury}
            />
            <label
              className="ps-2 fs_12 primary_color fw_500 text-nowrap"
              htmlFor="luxury"
            >
              Luxury
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideTypeView;
