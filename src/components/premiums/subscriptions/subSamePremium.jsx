import React, { useEffect, useState } from "react";

const SubSamePremium = ({ params, formik, isEditing }) => {
  const action = params?.action;
  const showInputBox = formik.values.subSamePremium === "Yes";
  useEffect(() => {
    if (formik.values.subSamePremium === "No") {
      formik.setFieldValue("subSamePremiumAmount", null);
    }
  }, [formik.values.subSamePremium]);

  return (
    <>
      <div>
        <div>
          <span className="primary_color fs_16 fw_500">
            Switch to Plans in the same Premium*
          </span>
        </div>
        <div className=" mt-3 mb-4 ms-4">
          <div>
            <input
              type="checkbox"
              name="subSamePremiumCheckbox"
              id="subSamePremiumCheckbox"
              // checked={formik.values.subSamePremiumCheckbox}
              checked={formik.values.subSamePremiumCheckbox}
              onChange={(e) => {
                formik.handleChange(e);
                if (!e.target.checked) {
                  formik.setFieldValue("subSamePremium", "No");
                }
              }}
              onBlur={formik.subSamePremiumCheckbox}
              disabled={!isEditing || action === "view"}
            />
            <span
              className={` ${
                formik.values.subSamePremiumCheckbox ? "fw_500" : ""
              }  ps-3 fs_14 primary_color`}
            >
              If the current plan is active, allow drivers to switch from this
              plan to plans in the same premium with higher 'Premium Value' ,
              through the Mobile application?
            </span>
            {formik.values.subSamePremiumCheckbox && (
              <>
                <div className="d-flex align-items-center mt-3">
                  <div className="col-3">
                    <label
                      className={`fs_14 ${
                        formik.touched.subSamePremium &&
                        formik.errors.subSamePremium
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Upgrade Fee
                    </label>
                  </div>
                  <div className="col-6">
                    <span className="align-items-center">
                      <input
                        type="radio"
                        id="subSamePremiumYes"
                        name="subSamePremium"
                        value="Yes"
                        checked={formik.values.subSamePremium === "Yes"}
                        onChange={formik.handleChange}
                        disabled={!isEditing || action === "view"}
                      />
                      <label className="ps-3 fs_14" htmlFor="subSamePremiumYes">
                        Yes
                      </label>
                    </span>
                    <span className="align-items-center">
                      <input
                        className="ms-3"
                        type="radio"
                        id="subSamePremiumNo"
                        name="subSamePremium"
                        value="No"
                        checked={formik.values.subSamePremium === "No"}
                        onChange={formik.handleChange}
                        disabled={!isEditing || action === "view"}
                      />
                      <label className="ps-3 fs_14" htmlFor="subSamePremiumNo">
                        No
                      </label>
                    </span>
                  </div>
                </div>
                {showInputBox && (
                  <div className="d-flex align-items-center mt-3">
                    <div className="col-3">
                      <label
                        className={`fs_14 ${
                          formik.touched.subSamePremiumAmount &&
                          formik.errors.subSamePremiumAmount
                            ? " red_color"
                            : ""
                        }`}
                      >
                        Upgrade fee?
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        className={`border_radius_7px ${
                          formik.touched.subSamePremiumAmount &&
                          formik.errors.subSamePremiumAmount
                            ? "error_border"
                            : !isEditing || action === "view"
                            ? "disabled_bg_color  disabled_border"
                            : "primary_color primary_border"
                        }`}
                        style={{ width: "9rem" }}
                        type="text"
                        id="subSamePremiumAmount"
                        name="subSamePremiumAmount"
                        value={formik.values.subSamePremiumAmount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing || action === "view"}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubSamePremium;
