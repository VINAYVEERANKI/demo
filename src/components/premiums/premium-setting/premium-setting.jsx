import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import InnerLayout from '../../layout/innerLayout';
import { useLocation, useParams } from "react-router";

const PremiumSetting = () => {
  const location = useLocation();
  const params = useParams();
  const action = params.action;
  console.log(action,"action");

    const [isEditing, setIsEditing] = useState(false);
    const [detailsPremiumPasswordModal, setDetailsPremiumPasswordModal] =
      useState(false);
    const handleDetailsPremiumPWClose = () => {
      setDetailsPremiumPasswordModal(false);
    };
    const handleDetailsPremiumPasswordModal = () =>
      setDetailsPremiumPasswordModal(true);
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        premiumName: "",
        premiumDescription: "",
      
      },
      validationSchema: Yup.object().shape({
        premiumName: Yup.string().required("Please complete all above the fields"),
        premiumDescription: Yup.string().required(
          "Premium description is required"
        ),
      }),
      onSubmit: (values) => {
        console.log(values);
        handleDetailsPremiumPasswordModal();
        setIsEditing(false);
      },
    });
  
    const firstErrorField = Object.keys(formik.errors).find(
      (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
    );
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleCancel = () => {
      formik.resetForm();
      setIsEditing(false);
    };
  return (
    <>
     <InnerLayout
        mainHeading=""
        navigateEnable={false}
        layoutClassname="inner_layout_container"
      >
        <div className="mt-4 ms-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="ps-3 mt-3 fs_14 primary_color">
            <div className="d-flex align-items-center">
              <div className="col-3">
                <label
                  className={`${
                    formik.touched.premiumName && formik.errors.premiumName
                      ? "fw_500 red_color"
                      : "fw_500" 
                  }`}
                >
                 Premium Name
                </label>
              </div>
              <div className="col-3">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.premiumName && formik.errors.premiumName
                      ? " border-red"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "13rem" }}
                  disabled={!isEditing || action === "view"}
                  id="premiumName"
                  name="premiumName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.premiumName}
                />
              </div>
            </div>
            <div className="d-flex align-items-center py-2">
              <div className="col-3">
                <label
                  className={` amountthreshold ${
                    formik.touched.premiumDescription && formik.errors.premiumDescription
                      ? " fw_500 red_color"
                      : "fw_500"
                  }`}
                >
                 Premium Description in Driver Mobile App
                </label>
              </div>
              <div className="col-3">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.premiumDescription && formik.errors.premiumDescription
                      ? " border-red"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "13rem" }}
                  disabled={!isEditing || action === "view"}
                  id="premiumDescription"
                  name="premiumDescription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.premiumDescription}
                />
              </div>
            </div>

            <div className="col-8 d-flex justify-content-center mb-3">
              {firstErrorField && (
                <div className="red_color fs_13 fw_400 ">
                  {formik.errors[firstErrorField]}
                </div>
              )}
            </div>

            <div className=" col-5  d-flex justify-content-end">
          {action === "view" ? null : (
            <>
              {!isEditing ? (
                <>
                <button
                  className="border-0 primary_bg white_color px-3 fs_15 border_radius_5px"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                </>
               
              ) : (
                <>
                  <div className=" d-flex ps-4 col-5 gap-2">
                    <button
                      className=" fs_14 reset_btn border_radius white_bg red_color  px-2 reset_btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="fs_14 cancel_btn border_radius white_bg primary_color px-2 "
                      type="reset"
                      onClick={() => {
                        formik.resetForm();
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="fs_14 save_Btn dark_green_bg border_radius  px-3 white_color border_none"
                      type="submit"
                      onClick={formik.handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
          </div>
        </form>
      </div>
      </InnerLayout>
    </>
  )
}

export default PremiumSetting
