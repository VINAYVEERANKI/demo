import React, { useState } from "react";
import CouponInputField from "../../form/couponInputField";
import { openInNewTab } from "../../helper";
import "../../rider-coupons/coupon-component.css";

const NotificationInput = ({ formik, couponData }) => {
  const [uploaded, setUploaded] = useState(false);
  const [notificationImage, setNotificationImage] = useState("");

  function handleNotificationImageChange(e) {
    if (e.target?.files.length !== 0) {
      setNotificationImage(URL.createObjectURL(e.target.files[0]));
      setUploaded(true);
    }
  }

  return (
    <div className="ps-4 mt-1">
      <CouponInputField
        label_font_size="fs_16"
        labelName="Notification Title*"
        itemName={"notificationTitle"}
        inputValue={formik.values.notificationTitle}
        onChangeFn={formik.handleChange}
        onBlurFn={formik.handleBlur}
        formikError={formik.errors.notificationTitle}
        formikTouched={formik.touched.notificationTitle}
        placeholder="Enter coupon code"
        inputDisabled={couponData?.edit === false ? true : false}
      />
      <div className="mt-1">
        <CouponInputField
          label_font_size="fs_16"
          labelName="Notification Body1*"
          itemName={"notificationBody"}
          inputValue={formik.values.notificationBody}
          onChangeFn={formik.handleChange}
          onBlurFn={formik.handleBlur}
          formikError={formik.errors.notificationBody}
          formikTouched={formik.touched.notificationBody}
          placeholder="Enter coupon description"
          TextArea={true}
          input={false}
          inputDisabled={couponData?.edit === false ? true : false}
        />
      </div>

      <div className="d-flex align-items-center gap-3 mt-1">
        <span className={"fs_16 primary_color"}>
          Notification Image{" "}
          <span className="primary_color fs_14">(optional)</span>
        </span>
        {uploaded || formik.values.Upload.length >= 1 ? (
          <>
            <span className="green_color fs_14">Image Uploaded</span>
            <button
              className="primary_bg white_color border_radius_5px px-3 border_none"
              onClick={() =>
                openInNewTab(
                  uploaded ? notificationImage : formik.values.Upload
                )
              }
              type="button"
            >
              View
            </button>
          </>
        ) : (
          <span className="red_color fs_14">Image not Uploaded</span>
        )}
        <div className="d-flex">
          <label
            className="upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14 "
            htmlFor="files"
          >
            <input
              type="file"
              accept="image/*"
              id="files"
              className="upload_document_input cursor_pointer"
              name="Upload"
              onChange={(e) => {
                formik.setFieldValue("Upload", e.target.files[0]);
                handleNotificationImageChange(e);
              }}
              disabled={couponData?.edit === false ? true : false}
            />
            {uploaded || formik.values.Upload.length >= 1 ? (
              <span> Re-upload</span>
            ) : (
              <span> Upload</span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationInput;
