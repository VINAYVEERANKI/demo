import React, { useEffect } from "react";
import { useState } from "react";
import "../premium.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";
import DetailsPremiumPasswordModal from "../detailsPasswordModal";

const DuesDetails = ({
  action,
  premiumtype,
  defaultDuedepositData,
  params,
  setReload,
  reload,
  managePremiumType,
  setIsDisable,
  isDisable,
}) => {
  console.log(params, "hiubin");
  const dueData = defaultDuedepositData?.due_details;

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
      CBamount1: dueData?.CBDueAmount1 ?? "",
      CBThreshold: dueData?.CBDueAmount1Threshold ?? "",
      CBamount2: dueData?.CBDueAmount2 ?? "",
    },
    validationSchema: Yup.object().shape({
      CBamount1: Yup.string().required("please complete all the fields"),
      CBThreshold: Yup.string().required(
        "current balance threshold is required"
      ),
      CBamount2: Yup.string().required("current balance amount2 is required"),
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
    setIsDisable(true)
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
    setIsDisable(false)
  };

  return (
    <>
      <DetailsPremiumPasswordModal
        detailsPremiumPasswordModal={detailsPremiumPasswordModal}
        handleDetailsPremiumPWClose={handleDetailsPremiumPWClose}
        title={"Are you sure you want to Update"}
        setIsEditing={setIsEditing}
        params={params}
        formik={formik}
        type="Dues"
        setReload={setReload}
        reload={reload}
        premiumtype={premiumtype}
        managePremiumType={managePremiumType}
      />
      <div className="py-5 mt-3">
        <div className=" d-flex justify-content-between pe-4">
          <div className="fs_16 fw_500 primary_color">Dues Details</div>
          {action === "view" ? null : (
            <>
              {!isEditing ? (
                <button
                  className={`${isDisable === true ? "disabled_color_bg" : "primary_bg"
                    } border-0  white_color px-3 fs_15 border_radius_5px`}
                  onClick={handleEdit}
                  disabled={isDisable === true }
                >
                  Edit
                </button>
              ) : (
                <>
                  <div className=" d-flex gap-2">
                    <button
                      className="ms-3 fs_14 reset_btn border_radius white_bg red_color  px-2 reset_btn"
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
        <form onSubmit={formik.handleSubmit}>
          <div className="ps-3 mt-3 fs_14 primary_color">
            <div className="d-flex align-items-center">
              <div className="col-3">
                <label
                  className={`${formik.touched.CBamount1 && formik.errors.CBamount1
                    ? " red_color"
                    : ""
                    }`}
                >
                  Current Balance Due Amount -1 (₹)
                </label>
              </div>
              <div className="col-3">
                <input
                  className={`border_radius_7px p-1 outline_none ${formik.touched.CBamount1 && formik.errors.CBamount1
                    ? " border-red"
                    : !isEditing || action === "view"
                    ? "disabled_bg_color  disabled_border"
                    : "primary_color primary_border"
                    }`}
                  style={{ width: "13rem" }}
                  disabled={!isEditing || action === "view"}
                  id="CBamount1"
                  name="CBamount1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.CBamount1}
                />
              </div>
            </div>
            <div className="d-flex align-items-center py-2">
              <div className="col-3">
                <label
                  className={` amountthreshold ${formik.touched.CBThreshold && formik.errors.CBThreshold
                    ? " red_color"
                    : ""
                    }`}
                >
                  Current balance Due Amount -1 Threshold for (hrs)
                </label>
              </div>
              <div className="col-3">
                <input
                  className={`border_radius_7px p-1 outline_none ${formik.touched.CBThreshold && formik.errors.CBThreshold
                    ? " border-red"
                    : !isEditing || action === "view"
                    ? "disabled_bg_color  disabled_border"
                    : "primary_color primary_border"
                    }`}
                  style={{ width: "13rem" }}
                  disabled={!isEditing || action === "view"}
                  id="CBThreshold"
                  name="CBThreshold"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.CBThreshold}
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-3">
                <label
                  className={`${formik.touched.CBamount2 && formik.errors.CBamount2
                    ? " red_color"
                    : ""
                    }`}
                >
                  Current Balance Due Amount -2 (₹)
                </label>
              </div>
              <div className="col-3">
                <input
                  className={`border_radius_7px p-1 outline_none ${formik.touched.CBamount2 && formik.errors.CBamount2
                    ? " border-red"
                    : !isEditing || action === "view"
                    ? "disabled_bg_color  disabled_border"
                    : "primary_color primary_border"
                    }`}
                  style={{ width: "13rem" }}
                  disabled={!isEditing || action === "view"}
                  id="CBamount2"
                  name="CBamount2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.CBamount2}
                />
              </div>
            </div>
            <div className="col-8 d-flex justify-content-center mt-2">
              {firstErrorField && (
                <div className="red_color fs_13 fw_400 ps-3">
                  {formik.errors[firstErrorField]}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <hr className="detailsline" />
    </>
  );
};

export default DuesDetails;
