import React, { useEffect } from "react";

const SubOtherPremium = ({ params, isEditing, formik }) => {
  const action = params?.action;
  const showInputBox = formik.values.subOtherPremium === "Yes";
  useEffect(() => {
    if (formik.values.subOtherPremium === "No") {
      formik.setFieldValue("subOtherPremiumAmount", null);
    }
  }, [formik.values.subOtherPremium]);

  return (
    <>
      <div>
        <div>
          <span className=" primary_color fs_16 fw_500">
            Switch to Plans in Other Premium*
          </span>
        </div>
        <div className=" mt-3 mb-4 ms-4">
          <div>
            <input
              type="checkbox"
              name="subOtherPremiumCheckbox"
              id="subOtherPremiumCheckbox"
              checked={formik.values.subOtherPremiumCheckbox}
              onChange={(e) => {
                formik.handleChange(e);
                if (!e.target.checked) {
                  formik.setFieldValue("subOtherPremium", "No");
                }
              }}
              onBlur={formik.subOtherPremiumCheckbox}
              disabled={!isEditing || action === "view"}
            />
            <span
              className={` ${
                formik.values.subOtherPremiumCheckbox ? "fw_500" : ""
              }  ps-3 fs_14 primary_color`}
            >
              If the current plan is active, allow drivers to switch from this
              plan to plans other premium with higher 'Premium Value' , through
              the Mobile application?
            </span>
            {formik.values.subOtherPremiumCheckbox && (
              <>
                <div className="d-flex align-items-center mt-3">
                  <div className="col-3">
                    <label
                      className={`fs_14 ${
                        formik.touched.subOtherPremium &&
                        formik.errors.subOtherPremium
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
                        id="subOtherPremiumYes"
                        name="subOtherPremium"
                        value="Yes"
                        checked={formik.values.subOtherPremium === "Yes"}
                        onChange={formik.handleChange}
                        disabled={!isEditing || action === "view"}
                      />
                      <label
                        className="ps-3 fs_14"
                        htmlFor="subOtherPremiumYes"
                      >
                        Yes
                      </label>
                    </span>
                    <span className="align-items-center">
                      <input
                        className="ms-3"
                        type="radio"
                        id="subOtherPremiumNo"
                        name="subOtherPremium"
                        value="No"
                        checked={formik.values.subOtherPremium === "No"}
                        onChange={formik.handleChange}
                        disabled={!isEditing || action === "view"}
                      />
                      <label className="ps-3 fs_14" htmlFor="subOtherPremiumNo">
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
                          formik.touched.subOtherPremiumAmount &&
                          formik.errors.subOtherPremiumAmount
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
                          formik.touched.subOtherPremiumAmount &&
                          formik.errors.subOtherPremiumAmount
                            ? "error_border"
                            : !isEditing || action === "view"
                            ? "disabled_bg_color  disabled_border"
                            : "primary_color primary_border"
                        }`}
                        style={{ width: "9rem" }}
                        type="text"
                        id="subOtherPremiumAmount"
                        name="subOtherPremiumAmount"
                        value={formik.values.subOtherPremiumAmount}
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

export default SubOtherPremium;
