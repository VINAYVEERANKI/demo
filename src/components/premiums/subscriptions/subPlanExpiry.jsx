import React from 'react'

const SubPlanExpiry = ({ formik, params, isEditing }) => {


  const action = params?.action;

  return (
    <>
      <div>
        <div><span className=' primary_color fs_16 fw_500'>Plan Expiry Date Reminder</span></div>
        <div className='row gx-0 mb-4 ms-4' >
          <div className='col-xl-6'>
            <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label
                  className={`fs_14 ${formik.touched.planExpiryFirstRemind && formik.errors.planExpiryFirstRemind
                      ? " red_color"
                      : ""
                    }`}
                >
                  1st reminder through Message (Days)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${formik.touched.planExpiryFirstRemind && formik.errors.planExpiryFirstRemind
                      ? "error_border"
                      : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                  style={{ width: "5rem" }}
                  id="planExpiryFirstRemind"
                  name="planExpiryFirstRemind"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.planExpiryFirstRemind}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <div className="col-8">
                <label
                  className={`fs_14 ${formik.touched.planExpirySecondRemind && formik.errors.planExpirySecondRemind
                      ? " red_color"
                      : ""
                    }`}
                >
                  2nd reminder through Message (Days)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${formik.touched.planExpirySecondRemind && formik.errors.planExpirySecondRemind
                      ? "error_border"
                      : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                  style={{ width: "5rem" }}
                  id="planExpirySecondRemind"
                  name="planExpirySecondRemind"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.planExpirySecondRemind}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <div className="col-8">
                <label
                  className={`fs_14 ${formik.touched.planExpiryThirdRemind && formik.errors.planExpiryThirdRemind
                      ? " red_color"
                      : ""
                    }`}
                >
                  3rd reminder through call (Days)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${formik.touched.planExpiryThirdRemind && formik.errors.planExpiryThirdRemind
                      ? "error_border"
                      : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                  style={{ width: "5rem" }}
                  id="planExpiryThirdRemind"
                  name="planExpiryThirdRemind"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.planExpiryThirdRemind}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label
                  className="fs_14"
                >
                  Enable auto renewal feature for this plan in the driver app
                </label>
              </div>
              <div className="col-6">
                <span className="align-items-center">
                  <input
                    className='Yesradio'
                    type="radio"
                    id="subExpiryRadioYes"
                    name="subExpiryRadio"
                    value="Yes"
                    checked={formik.values.subExpiryRadio === 'Yes'}
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label className='ps-3 fs_14' htmlFor="subExpiryRadioYes">Yes</label>
                </span>
                <span className="align-items-center">
                  <input
                    className='ms-3'
                    type="radio"
                    id="subExpiryRadioNo"
                    name="subExpiryRadio"
                    value="No"
                    checked={formik.values.subExpiryRadio === 'No'}
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label className='ps-3 fs_14' htmlFor="subExpiryRadioNo">No</label>
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubPlanExpiry
