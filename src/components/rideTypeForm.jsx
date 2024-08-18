import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { numRegex } from "./helper";
import "./rideType.css";

const RideTypeForm = ({ item = {}, disableItems = [], keyOrder = [] }) => {
  const validationSchema = Yup.object().shape(
    Object.fromEntries(
      Object.entries(item.fares_details)
        .filter(([key]) => !disableItems.includes(key))
        .map(([key, value]) => [
          key,
          Yup.string()
            .matches(numRegex, "Invalid value")
            .trim()
            .required("Enter value"),
        ])
    )
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: Object.entries(item.fares_details).reduce(
      (fares, [key, value]) => {
        if (value !== null && value !== undefined) {
          fares[key] = value;
        }
        return fares;
      },
      {}
    ),
    validationSchema,
    onSubmit: (values) => {
      console.log({ [item.ride_type]: values }, "rrr");
    },
  });

  return (
    <div className="mt-4 fares_input_field_height">
      <form onSubmit={formik.handleSubmit} className="d-flex">
        <div className="d-flex secondary_color fs_16 ps-3">
          <div className="input_width_fares">{item?.ride_type}</div>
        </div>
        <div className="d-flex">
          {Object.entries(item?.fares_details)
            .sort(
              ([aKey], [bKey]) =>
                keyOrder.indexOf(aKey) - keyOrder.indexOf(bKey)
            )
            .map(([key, value]) => (
              <div className="ps-5 ms-5" key={key}>
                <input
                  id={`${item.ride_type}.${key}`}
                  name={key}
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={
                    formik.values[key] !== undefined ? formik.values[key] : ""
                  }
                  className={
                    formik.touched[key] && formik.errors[key]
                      ? `price_input_error text-center`
                      : `text-center ridetype_input`
                  }
                  disabled={disableItems.includes(key)}
                />
                <div>
                  {formik.touched[key] && formik.errors[key] ? (
                    <label className="red_color fs_10 fw_500">
                      {formik.errors[key]}
                    </label>
                  ) : null}
                </div>
              </div>
            ))}
          <div className="ps-5">
            <button
              type="submit"
              className="dark_blue_bg white_color fw_600  border_radius  fs_14  me-5 edit_btn text-center border_none px-3"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RideTypeForm;
