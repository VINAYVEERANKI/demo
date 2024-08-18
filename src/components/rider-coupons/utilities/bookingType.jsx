import React, { useState } from "react";
import "../../rider-coupons/coupon-component.css";

const BookingTypeInput = ({
  formik,
  couponData,
  dropDowBookingType,
  setDropDownBookingType,
  bookingTypeApplicableValue,
  setBookingTypeApplicableValue,
  setDropDownBookingOpen,
  setResetBookingType,
  resetBookingType,
  setRideTypeApplicableValue,
  type,
}) => {
  console.log(dropDowBookingType);
  function removeAll(arr, target) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === target) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  return (
    <>
      <div>
        {dropDowBookingType ? (
          <div className="dropDown_vehicleDetails_container  w_90 border_radius_5px mt-1 p-2 px-3">
            <div className="">
              <input
                type="checkbox"
                id="one_way_outstation"
                name="one_way_outstation"
                onChange={(e) => {
                  formik.setFieldValue(
                    "bookingType",
                    {
                      ...formik.values.bookingType,
                      one_way_outstation:
                        !formik.values.bookingType.one_way_outstation,
                    },
                    formik.setFieldValue("rideType.Bike", false),
                    formik.setFieldValue("rideType.Auto", false),
                    formik.setFieldValue("rideType.Mini", false),
                    formik.setFieldValue("rideType.Sedan", false),
                    formik.setFieldValue("rideType.Suv", false),
                    formik.setFieldValue("rideType.PremiumSedan", false),
                    formik.setFieldValue("rideType.Luxury", false),
                    formik.setFieldValue("rideType.KaaliPeeli", false)
                  );
                  if (e.target.checked) {
                    setBookingTypeApplicableValue([
                      ...bookingTypeApplicableValue,
                      "one_way_outstation",
                    ]);
                  } else {
                    removeAll(bookingTypeApplicableValue, "one_way_outstation");
                  }
                  setRideTypeApplicableValue("");
                }}
                checked={formik.values.bookingType.one_way_outstation}
                disabled={
                  couponData?.edit === false ||
                  couponData?.couponStatus === "Active" ||
                  couponData?.couponStatus === "ReviewPendingUpdated"
                    ? true
                    : false
                }
              />
              <label
                className="ps-2 fs_16 primary_color fw_500"
                htmlFor="one_way_outstation"
              >
                One Way Outstation
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="round_trip_outstation"
                name="round_trip_outstation"
                onChange={(e) => {
                  formik.setFieldValue(
                    "bookingType",
                    {
                      ...formik.values.bookingType,
                      round_trip_outstation:
                        !formik.values.bookingType.round_trip_outstation,
                    },
                    formik.setFieldValue("rideType.Bike", false),
                    formik.setFieldValue("rideType.Auto", false),
                    formik.setFieldValue("rideType.Mini", false),
                    formik.setFieldValue("rideType.Sedan", false),
                    formik.setFieldValue("rideType.Suv", false),
                    formik.setFieldValue("rideType.PremiumSedan", false),
                    formik.setFieldValue("rideType.Luxury", false),
                    formik.setFieldValue("rideType.KaaliPeeli", false)
                  );
                  if (e.target.checked) {
                    setBookingTypeApplicableValue([
                      ...bookingTypeApplicableValue,
                      "round_trip_outstation",
                    ]);
                  } else {
                    removeAll(
                      bookingTypeApplicableValue,
                      "round_trip_outstation"
                    );
                  }
                  setRideTypeApplicableValue("");
                }}
                checked={formik.values.bookingType.round_trip_outstation}
                disabled={
                  couponData?.edit === false ||
                  couponData?.couponStatus === "Active" ||
                  couponData?.couponStatus === "ReviewPendingUpdated"
                    ? true
                    : false
                }
              />
              <label
                className="ps-2 fs_16 primary_color fw_500"
                htmlFor="round_trip_outstation"
              >
                Round Trip Outstation
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="local"
                name="local"
                onChange={(e) => {
                  formik.setFieldValue(
                    "bookingType",
                    {
                      ...formik.values.bookingType,
                      local: !formik.values.bookingType.local,
                    },
                    formik.setFieldValue("rideType.Bike", false),
                    formik.setFieldValue("rideType.Auto", false),
                    formik.setFieldValue("rideType.Mini", false),
                    formik.setFieldValue("rideType.Sedan", false),
                    formik.setFieldValue("rideType.Suv", false),
                    formik.setFieldValue("rideType.PremiumSedan", false),
                    formik.setFieldValue("rideType.Luxury", false),
                    formik.setFieldValue("rideType.KaaliPeeli", false)
                  );
                  if (e.target.checked) {
                    setBookingTypeApplicableValue([
                      ...bookingTypeApplicableValue,
                      "local",
                    ]);
                  } else {
                    removeAll(bookingTypeApplicableValue, "local");
                  }
                  setRideTypeApplicableValue("");
                }}
                checked={formik.values.bookingType.local}
                disabled={
                  couponData?.edit === false ||
                  couponData?.couponStatus === "Active" ||
                  couponData?.couponStatus === "ReviewPendingUpdated"
                    ? true
                    : false
                }
              />
              <label
                className="ps-2 fs_16 primary_color fw_500"
                htmlFor="local"
              >
                Local
              </label>
            </div>
            <div className="text-nowrap">
              <input
                type="checkbox"
                id="rental"
                name="rental"
                onChange={(e) => {
                  formik.setFieldValue(
                    "bookingType",
                    {
                      ...formik.values.bookingType,
                      rental: !formik.values.bookingType.rental,
                    },
                    formik.setFieldValue("rideType.Bike", false),
                    formik.setFieldValue("rideType.Auto", false),
                    formik.setFieldValue("rideType.Mini", false),
                    formik.setFieldValue("rideType.Sedan", false),
                    formik.setFieldValue("rideType.Suv", false),
                    formik.setFieldValue("rideType.PremiumSedan", false),
                    formik.setFieldValue("rideType.Luxury", false),
                    formik.setFieldValue("rideType.KaaliPeeli", false)
                  );
                  if (e.target.checked) {
                    setBookingTypeApplicableValue([
                      ...bookingTypeApplicableValue,
                      "rental",
                    ]);
                  } else {
                    removeAll(bookingTypeApplicableValue, "rental");
                  }
                  setRideTypeApplicableValue("");
                }}
                checked={formik.values.bookingType.rental}
                disabled={
                  couponData?.edit === false ||
                  couponData?.couponStatus === "Active" ||
                  couponData?.couponStatus === "ReviewPendingUpdated"
                    ? true
                    : false
                }
              />
              <label
                className="ps-2 fs_16 primary_color fw_500 text-nowrap"
                htmlFor="rental"
              >
                Rental
              </label>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-3 mx-2 mt-1 mb-1">
              {type === "createRiderReferral" ||
              type === "createDriverReferral" ? null : (
                <>
                  <button
                    className="green_color_bg border_none fs_16 border_radius_5px white_color py-0 px-4"
                    type="button"
                    onClick={() => {
                      setDropDownBookingType(false);
                      setDropDownBookingOpen(false);
                    }}
                  >
                    Apply
                  </button>
                  <button
                    className=" disabled_color_bg border_none fs_16 border_radius_5px white_color py-0 px-4 "
                    type="reset"
                    onClick={() => {
                      setResetBookingType(!resetBookingType);
                      formik.setFieldValue(
                        "bookingType",
                        formik.initialValues.bookingType
                      );
                    }}
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default BookingTypeInput;

// ["One_way_outstation", "Round_trip_outstation", "Local", "Rental", "Suv", "PremiumRental", "Luxury"],

// export const RideTypeApplicable = [
//   { id: 1, name: "One_way_outstation" },
//   { id: 2, name: `Round_trip_outstation` },
//   { id: 4, name: "Local" },
//   { id: 5, name: "Rental" },
//   { id: 6, name: "Suv" },
// ];
