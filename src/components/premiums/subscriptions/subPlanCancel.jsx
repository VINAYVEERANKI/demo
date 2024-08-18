import React, { useEffect } from "react";

const SubPlanCancel = ({ formik, params, isEditing }) => {
  const action = params?.action;
  useEffect(() => {
    if (formik.values.giveRefundIfActivePlanCancel === "No") {
      formik.setFieldValue("ActivePlanCancelAfter1Ride", "");
      formik.setFieldValue("noRideAPCWithin24hrOfStartDate", "");
      formik.setFieldValue("noRideAPCBetween24hrTo48hrOfStartDate", "");
      formik.setFieldValue("noRideAPCBetween48hrTo72hrOfStartDate", "");
    }
    if (formik.values.giveRefundIfSchedulePlanCancel === "No") {
      formik.setFieldValue("planScheduleCancelBeforeStartDate", "");
    }
    if (formik.values.giveRefundIfAutoRenewalCancel === "No") {
      formik.setFieldValue("autoRenewalCancelBeforeStartDate", "");
    }
  }, [
    formik.values.giveRefundIfActivePlanCancel,
    formik.values.giveRefundIfSchedulePlanCancel,
    formik.values.giveRefundIfAutoRenewalCancel,
  ]);
  // useEffect(() => {
  //   if (formik.values.giveRefundIfSchedulePlanCancel === "No") {
  //     formik.setFieldValue("planScheduleCancelBeforeStartDate", "");
  //   }
  // }, [formik.values.giveRefundIfSchedulePlanCancel]);

  console.log(formik.errors, "aksdjhaksjd");


  return (
    <>
      <div className="">
        <div>
          <span className=" primary_color fs_16 fw_500">Plan Cancellation</span>
        </div>
        <div className="row gx-0 mb-4 ms-4">
          <div className="col-xl-6">
            {/* <div className="d-flex align-items-center mt-3 gap-2">
              <div className="col-8">
                <label className="primary_color">Cancelled after 1 ride</label>
              </div>
              <div className="col-4">
                <input
                  className="premium_input_boxcontainer fw_500 border_radius_7px fs_14 p-1 premium_disabled_color input_box_otlineborder outline_none"
                  style={{ width: "5rem" }}
                  id="subCancelOne"
                  name="subCancelOne"
                  value={formik?.values?.subCancelOne}
                  disabled
                  placeholder=""
                />
              </div>
            </div> */}
            <div className="d-flex align-items-center mt-3 gap-2">
              <div className="col-7">
                <label className="fs_14">
                  Default for the driver premium after this plan cancellation
                </label>
              </div>
              <div className="col-5">
                <input
                  className="fw_500 premium_input_boxcontainer border_radius_7px fs_13 p-1 premium_disabled_color input_box_otlineborder outline_none"
                  style={{ width: "5rem" }}
                  id="driverPAfterCancel"
                  name="driverPAfterCancel"
                  // disabled={!isEditing || action === "view"}
                  value={formik?.values?.driverPAfterCancel}
                  placeholder=""
                  disabled
                />
              </div>
            </div>

            <div className="d-flex align-items-center mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.giveRefundIfActivePlanCancel &&
                    formik.errors.giveRefundIfActivePlanCancel
                      ? " red_color"
                      : ""
                  }`}
                >
                  Do you want to give any refund if an active plan is cancelled?
                </label>
              </div>
              <div className="col-5 ps-5">
                <span className="align-items-center">
                  <input
                    type="radio"
                    id="giveRefundIfActivePlanCancelYes"
                    name="giveRefundIfActivePlanCancel"
                    value="Yes"
                    checked={
                      formik.values.giveRefundIfActivePlanCancel === "Yes"
                    }
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label
                    className="ps-3 fs_14"
                    htmlFor="giveRefundIfActivePlanCancelYes"
                  >
                    Yes
                  </label>
                </span>
                <span className="align-items-center">
                  <input
                    className="ms-3"
                    type="radio"
                    id="giveRefundIfActivePlanCancelNo"
                    name="giveRefundIfActivePlanCancel"
                    value="No"
                    checked={
                      formik.values.giveRefundIfActivePlanCancel === "No"
                    }
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label
                    className="ps-3 fs_14"
                    htmlFor="giveRefundIfActivePlanCancelNo"
                  >
                    No
                  </label>
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.giveRefundIfSchedulePlanCancel &&
                    formik.errors.giveRefundIfSchedulePlanCancel
                      ? " red_color"
                      : ""
                  }`}
                >
                  Do you want to give any refund if a scheduled** plan is
                  canceled?
                </label>
              </div>
              <div className="col-5 ps-5">
                <span className="align-items-center">
                  <input
                    type="radio"
                    id="giveRefundIfSchedulePlanCancelYes"
                    name="giveRefundIfSchedulePlanCancel"
                    value="Yes"
                    checked={
                      formik.values.giveRefundIfSchedulePlanCancel === "Yes"
                    }
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label
                    className="ps-3 fs_14"
                    htmlFor="giveRefundIfSchedulePlanCancelYes"
                  >
                    Yes
                  </label>
                </span>
                <span className="align-items-center">
                  <input
                    className="ms-3"
                    type="radio"
                    id="giveRefundIfSchedulePlanCancelNo"
                    name="giveRefundIfSchedulePlanCancel"
                    value="No"
                    checked={
                      formik.values.giveRefundIfSchedulePlanCancel === "No"
                    }
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label
                    className="ps-3 fs_14"
                    htmlFor="giveRefundIfSchedulePlanCancelNo"
                  >
                    No
                  </label>
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.giveRefundIfAutoRenewalCancel &&
                    formik.errors.giveRefundIfAutoRenewalCancel
                      ? " red_color"
                      : ""
                  }`}
                >
                  Do you want to give any refund if a Auto Renewal** plan is
                  canceled?
                </label>
              </div>
              <div className="col-5 ps-5">
                <span className="align-items-center">
                  <input
                    type="radio"
                    id="giveRefundIfAutoRenewalCancelYes"
                    name="giveRefundIfAutoRenewalCancel"
                    value="Yes"
                    checked={
                      formik.values.giveRefundIfAutoRenewalCancel === "Yes"
                    }
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label
                    className="ps-3 fs_14"
                    htmlFor="giveRefundIfAutoRenewalCancelYes"
                  >
                    Yes
                  </label>
                </span>
                <span className="align-items-center">
                  <input
                    className="ms-3"
                    type="radio"
                    id="giveRefundIfAutoRenewalCancelNo"
                    name="giveRefundIfAutoRenewalCancel"
                    value="No"
                    checked={
                      formik.values.giveRefundIfAutoRenewalCancel === "No"
                    }
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label
                    className="ps-3 fs_14"
                    htmlFor="giveRefundIfAutoRenewalCancelNo"
                  >
                    No
                  </label>
                </span>
              </div>
            </div>

            {/* <div className="d-flex align-items-center mt-3 gap-2">
              <div className="col-8">
                <label
                  className={`${
                    formik.touched.subCancelThree &&
                    formik.errors.subCancelThree
                      ? " red_color"
                      : "primary_color"
                  }`}
                >
                  Maximum number of consecutive cancellations before blocking
                  the account
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.subCancelThree &&
                    formik.errors.subCancelThree
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="subCancelThree"
                  name="subCancelThree"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subCancelThree}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div> */}
          </div>
          <div className="col-xl-6">
            {formik.values.giveRefundIfActivePlanCancel === "Yes" && (
              <>
                <div className="d-flex align-items-center mt-3">
                  <div className="col-8">
                    <label
                      className={`fs_14 ${
                        formik.touched.ActivePlanCancelAfter1Ride &&
                        formik.errors.ActivePlanCancelAfter1Ride
                          ? " red_color"
                          : ""
                      }`}
                    >
                      If this plan is active and canceled after 1 ride (%
                      refund)
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.ActivePlanCancelAfter1Ride &&
                        formik.errors.ActivePlanCancelAfter1Ride
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="ActivePlanCancelAfter1Ride"
                      name="ActivePlanCancelAfter1Ride"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ActivePlanCancelAfter1Ride}
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div className="col-8">
                    <label
                      className={`fs_14 ${
                        formik.touched.noRideAPCWithin24hrOfStartDate &&
                        formik.errors.noRideAPCWithin24hrOfStartDate
                          ? " red_color"
                          : ""
                      }`}
                    >
                      If this plan is active and canceled within 24 hrs of the
                      start date & no completed rides (% refund)
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.noRideAPCWithin24hrOfStartDate &&
                        formik.errors.noRideAPCWithin24hrOfStartDate
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="noRideAPCWithin24hrOfStartDate"
                      name="noRideAPCWithin24hrOfStartDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.noRideAPCWithin24hrOfStartDate}
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div className="col-8">
                    <label
                      className={`fs_14 ${
                        formik.touched.noRideAPCBetween24hrTo48hrOfStartDate &&
                        formik.errors.noRideAPCBetween24hrTo48hrOfStartDate
                          ? " red_color"
                          : ""
                      }`}
                    >
                      If this plan is active and canceled between 24 hrs to 48
                      hrs of the start date & no completed rides (% refund)
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.noRideAPCBetween24hrTo48hrOfStartDate &&
                        formik.errors.noRideAPCBetween24hrTo48hrOfStartDate
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="noRideAPCBetween24hrTo48hrOfStartDate"
                      name="noRideAPCBetween24hrTo48hrOfStartDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.noRideAPCBetween24hrTo48hrOfStartDate
                      }
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div className="col-8">
                    <label
                      className={`fs_14 ${
                        formik.touched.noRideAPCBetween48hrTo72hrOfStartDate &&
                        formik.errors.noRideAPCBetween48hrTo72hrOfStartDate
                          ? " red_color"
                          : ""
                      }`}
                    >
                      If this plan is active and canceled between 48 hrs to 72
                      hrs of the start date & no completed rides (% refund)
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.noRideAPCBetween48hrTo72hrOfStartDate &&
                        formik.errors.noRideAPCBetween48hrTo72hrOfStartDate
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="noRideAPCBetween48hrTo72hrOfStartDate"
                      name="noRideAPCBetween48hrTo72hrOfStartDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.noRideAPCBetween48hrTo72hrOfStartDate
                      }
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
              </>
            )}
            {formik.values.giveRefundIfSchedulePlanCancel === "Yes" && (
              <>
                <div className="d-flex align-items-center mt-3">
                  <div className="col-8">
                    <label
                      className={`fs_14 ${
                        formik.touched.planScheduleCancelBeforeStartDate &&
                        formik.errors.planScheduleCancelBeforeStartDate
                          ? " red_color"
                          : ""
                      }`}
                    >
                      If this plan is scheduled & canceled before the start date
                      (% refund)
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.planScheduleCancelBeforeStartDate &&
                        formik.errors.planScheduleCancelBeforeStartDate
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="planScheduleCancelBeforeStartDate"
                      name="planScheduleCancelBeforeStartDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.planScheduleCancelBeforeStartDate}
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
              </>
            )}

            {formik.values.giveRefundIfAutoRenewalCancel === "Yes" && (
              <>
                <div className="d-flex align-items-center mt-3">
                  <div className="col-8">
                    <label
                      className={`fs_14 ${
                        formik.touched.autoRenewalCancelBeforeStartDate &&
                        formik.errors.autoRenewalCancelBeforeStartDate
                          ? " red_color"
                          : ""
                      }`}
                    >
                      If this plan is Auto Renewal Active & canceled before the
                      start date (% refund)
                    </label>
                  </div>
                  <div className="col-4">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.autoRenewalCancelBeforeStartDate &&
                        formik.errors.autoRenewalCancelBeforeStartDate
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="autoRenewalCancelBeforeStartDate"
                      name="autoRenewalCancelBeforeStartDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.autoRenewalCancelBeforeStartDate}
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
              </>
            )}
            {/* <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label
                  className={`${
                    formik.touched.subNoridesOne && formik.errors.subNoridesOne
                      ? " red_color"
                      : "primary_color"
                  }`}
                >
                  No rides & less than 1 day (% refund)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.subNoridesOne && formik.errors.subNoridesOne
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="subNoridesOne"
                  name="subNoridesOne"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subNoridesOne}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label
                  className={`${
                    formik.touched.subNoridesTwo && formik.errors.subNoridesTwo
                      ? " red_color"
                      : "primary_color"
                  }`}
                >
                  No rides & less than 2 day (% refund)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.subNoridesTwo && formik.errors.subNoridesTwo
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="subNoridesTwo"
                  name="subNoridesTwo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subNoridesTwo}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label
                  className={`${
                    formik.touched.subNoridesThree &&
                    formik.errors.subNoridesThree
                      ? " red_color"
                      : "primary_color"
                  }`}
                >
                  No rides & less than 3 day (% refund)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.subNoridesThree &&
                    formik.errors.subNoridesThree
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="subNoridesThree"
                  name="subNoridesThree"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subNoridesThree}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label
                  className={`${
                    formik.touched.subNoridesFour &&
                    formik.errors.subNoridesFour
                      ? " red_color"
                      : "primary_color"
                  }`}
                >
                  No rides & more than 3 days (% refund)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.subNoridesFour &&
                    formik.errors.subNoridesFour
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="subNoridesFour"
                  name="subNoridesFour"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subNoridesFour}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label
                  className={`${
                    formik.touched.subNoridesThree &&
                    formik.errors.subNoridesThree
                      ? " red_color"
                      : "primary_color"
                  }`}
                >
                  No rides & less than 3 day (% refund)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.subNoridesThree &&
                    formik.errors.subNoridesThree
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="subNoridesThree"
                  name="subNoridesThree"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subNoridesThree}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label
                  className={`${
                    formik.touched.subNoridesFour &&
                    formik.errors.subNoridesFour
                      ? " red_color"
                      : "primary_color"
                  }`}
                >
                  No rides & more than 3 days (% refund)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.subNoridesFour &&
                    formik.errors.subNoridesFour
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="subNoridesFour"
                  name="subNoridesFour"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subNoridesFour}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubPlanCancel;
