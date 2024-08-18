import { Formik } from "formik";
import React, { useEffect, useState } from "react";

const SubPlanDetails = ({
  formik,
  isEditing,
  params,
  premiumSubactiveTab,
  handleDeleteField,
  handleAddField,
}) => {
  const action = params?.action;

  const showInputBox = formik.values.setupFeeRadio === "Yes";

  useEffect(() => {
    if (formik.values.setupFeeRadio === "No") {
      formik.setFieldValue("setupFeeAmount", "");
    }
  }, [formik.values.setupFeeRadio]);

  console.log(formik,"formikValuesss");

  return (
    <>
      <div>
        <div>
          <span className="fs_16 fw_500 primary_color">Plan Details</span>
        </div>
        <div className="row gx-0 ms-4 mb-4">
          <div className="col-xl-6">
            <div>
              <div className="d-flex align-items-center mt-3">
                <div className="col-xl-3">
                  <label
                    className={`fs_14 ${formik.touched.planName && formik.errors.planName
                        ? " red_color"
                        : ""
                      }`}
                  >
                    Plan Name
                  </label>
                </div>
                <div className="col-xl-6">
                  <input
                    className={`border_radius_7px p-1 outline_none fs_16 ms-3 ${formik.touched.planName && formik.errors.planName
                        ? "error_border"
                        : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                    style={{ width: "13rem" }}
                    id="planName"
                    name="planName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.planName}
                    disabled={!isEditing || action === "view"}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mt-2">
                <div className="col-3">
                  <label className="fs_14">Validity</label>
                </div>
                <div className="col-6">
                  <input
                    className="ms-3 border_none background_none primary_color w_15 fs_14"
                    id="planValue"
                    name="planValue"
                    value={formik?.values?.validity}
                    disabled
                  />
                  <span className="primary_color fs_14">Days</span>
                </div>
              </div>

              <div className="d-flex mt-2">
                <div className="col-3">
                  <div className="d-flex">
                    <label
                      className={` primary_color pt-3 fs_14 ${formik.touched.inputFields && formik.errors.inputFields
                          ? " red_color"
                          : ""
                        }`}
                    >
                      Plan Description in Driver Mobile App
                      <div className="secondary_color fs_14">(max 5 points)</div>
                    </label>
                  </div>
                </div>
                <div className="col-9">
                  {formik.values.inputFields.map((field, index) => (
                    <>
                      <div
                        className="mt-3 d-flex align-items-center fs_14"
                        key={index}
                      >
                        <span>{index + 1 + "."}</span>
                        <input
                          style={{ width: "13rem" }}
                          type="text"
                          name={`inputFields[${index}]`}
                          value={field}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.inputFields &&
                              formik.touched.inputFields[index] &&
                              formik.errors.inputFields?.[index]
                              ? "border_radius_7px error_border p-1 ms-1 outline_none fs_16 "
                              : !isEditing || action === "view"
                                ? "border_radius_7px disabled_bg_color  disabled_border p-1 ms-1 outline_none fs_16"
                                : "border_radius_7px primary_color primary_border p-1 ms-1 outline_none fs_16"
                          }
                          disabled={!isEditing || action === "view"}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className={`fs_14 fw_500 border_radius ${!isEditing || action === "view"
                                ? "disabled_color_bg white_color"
                                : "white_bg red_color error_border"
                              } px-1 ms-2`}
                            onClick={() => handleDeleteField(index)}
                            disabled={!isEditing || action === "view"}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <div className="ms-4">
                        {" "}
                        {formik.touched.inputFields?.[index] &&
                          formik.errors.inputFields?.[index] && (
                            <div className="red_color fs_14 mt-1">
                              {formik.errors.inputFields[index]}
                            </div>
                          )}
                      </div>
                    </>
                  ))}
                  <div className="mt-3 ms-3">
                    {formik.values.inputFields?.length < 5 && (
                      <button
                        type="button"
                        disabled={!isEditing || action === "view"}
                        className={`fs_14 ${!isEditing || action === "view"
                            ? "disabled_color_bg"
                            : "blue_color_bg "
                          } white_color ms-1 border_radius  px-2  border_none`}
                        onClick={handleAddField}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="d-flex align-items-center mt-3">
              <div className="col-3">
                <label
                  className={`fs_14 ${formik.touched.planValue && formik.errors.planValue
                      ? "red_color"
                      : "primary_color"
                    }`}
                >
                  Plan Value
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none fs_16 ${formik.touched.planValue && formik.errors.planValue
                      ? "error_border"
                      : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                  style={{ width: "5rem" }}
                  id="planValue"
                  name="planValue"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.planValue}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>

            <div className="d-flex align-items-center mt-3">
              <div className="col-3">
                <label className="primary_color fs_14">Setup Fee</label>
              </div>
              <div className="col-6">
                <span className="align-items-center">
                  <input
                    className="Yesradio"
                    type="radio"
                    id="planValueYes"
                    name="setupFeeRadio"
                    value="Yes"
                    checked={formik.values.setupFeeRadio === "Yes"}
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label className="ps-3 fs_14" htmlFor="planValueYes">
                    Yes
                  </label>
                </span>
                <span className="align-items-center">
                  <input
                    className="ms-3"
                    type="radio"
                    id="planValueNo"
                    name="setupFeeRadio"
                    value="No"
                    checked={formik.values.setupFeeRadio === "No"}
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label className="ps-3 fs_14" htmlFor="planValueNo">
                    No
                  </label>
                </span>
              </div>
            </div>
            {showInputBox && (
              <div className="d-flex align-items-center mt-3">
                <div className="col-3">
                  <label
                    className={`fs_14 ${formik.touched.setupFeeAmount &&
                        formik.errors.setupFeeAmount
                        ? " red_color"
                        : "primary_color"
                      }`}
                  >
                    Setup fee?
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className={`border_radius_7px outline_none ${formik.touched.setupFeeAmount &&
                        formik.errors.setupFeeAmount
                        ? "error_border"
                        : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                    style={{ width: "9rem" }}
                    type="text"
                    id="setupFeeAmount"
                    name="setupFeeAmount"
                    value={formik.values.setupFeeAmount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!isEditing || action === "view"}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubPlanDetails;
