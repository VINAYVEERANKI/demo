import React from "react";
import { useState, useRef } from "react";
import CouponCheckboxField from "../../form/couponCheckboxField";
import CouponInputField from "../../form/couponInputField";
import { openInNewTab } from "../../helper";
import DraftMessageInput from "../../form/draftMessageInput";
import CouponDetails from "../riderCoupons/coupondetails";
import useDisplayToggle from "../../useDisplayToggle";

const DriverBroadCastStage1 = ({
  formik,
  is_editable = true,
  uploadedStage1,
  notifyImgStage1,
  handleNotifyImgStage1Change,
  type,
  currentCouponData,
}) => {
  const [driverCouponDetails, setDriverCouponDetails] = useState(false);

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDriverCouponDetails,
  });
  return (
    <>
      <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
        <div className=" d-flex justify-content-between position-relative">
          <div className="text_underline primary_color fs_18 fw_500">
            Stage 1 :
          </div>
          {type !== "createDriverCoupon" ? (
            <>
              <div
                className="position-absolute top-0 end-0 mt-1 me-3 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                onClick={() => setDriverCouponDetails(!driverCouponDetails)}
                ref={onClickRef}
              >
                More Details
              </div>
              {driverCouponDetails ? (
                <>
                  <div
                    className="coupon_details_block border white_bg border_radius"
                    ref={insideClickRef}
                  >
                    <CouponDetails item={currentCouponData} />
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <CouponCheckboxField
          formikError={formik.errors.altleastOneStage1}
          formikTouched={formik.touched.altleastOneStage1}
          itemName="notificationStage1"
          onChangeFn={formik.handleChange}
          labelName="Notifications"
          formikValue={formik.values?.notificationStage1}
          labelColor={formik.values.notificationStage1 === true}
          disabled={is_editable === false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Notification Title*"
            itemName={"notificationTitleStage1"}
            inputValue={formik.values.notificationTitleStage1}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationTitleStage1}
            formikTouched={formik.touched.notificationTitleStage1}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik?.values?.notificationStage1 === false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Title*"
            itemName={"notificationTitleStage1"}
            formik={formik}
            formikValue={formik.values.notificationTitleStage1}
            formikError={formik.errors.notificationTitleStage1}
            formikTouched={formik.touched.notificationTitleStage1}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage1 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Notification Body1*"
            itemName={"notificationBodyStage1"}
            inputValue={formik.values.notificationBodyStage1}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationBodyStage1}
            formikTouched={formik.touched.notificationBodyStage1}
            placeholder="Enter Draft Message Title*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false ||
              formik?.values?.notificationStage1 === false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Body1*"
            itemName={"notificationBodyStage1"}
            formik={formik}
            formikValue={formik.values.notificationBodyStage1}
            formikError={formik.errors.notificationBodyStage1}
            formikTouched={formik.touched.notificationBodyStage1}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage1 === false
            }
          />
        </div>
        <div className="d-flex align-items-center gap-3 my-3 ms-4">
          <span className={"fs_16 primary_color fw_500"}>
            Notification Image{" "}
            <span className="primary_color fs_14">(optional)</span>
          </span>
          {uploadedStage1 ||
          formik.values.notification_image_stage1.length >= 1 ? (
            <>
              <span className="green_color fs_14">Image Uploaded</span>
              <button
                className="primary_bg white_color border_radius_5px px-3 border_none"
                onClick={() =>
                  openInNewTab(
                    uploadedStage1
                      ? notifyImgStage1
                      : formik.values.notification_image_stage1
                  )
                }
                type="button"
              >
                View
              </button>
            </>
          ) : (
            <></>
          )}
          <div className="d-flex align-item-center">
            {is_editable === false ||
            formik?.values?.notificationStage1 === false ? (
              <></>
            ) : (
              <label
                className={
                  " upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14"
                }
                htmlFor="driverStage1"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="driverStage1"
                  className="upload_document_input cursor_pointer"
                  name="notification_image_stage1"
                  onChange={(e) => {
                    formik.setFieldValue(
                      "notification_image_stage1",
                      e.target.files[0]
                    );
                    handleNotifyImgStage1Change(e);
                  }}
                />
                {uploadedStage1 ||
                formik.values.notification_image_stage1.length >= 1 ? (
                  <span> Re-upload</span>
                ) : (
                  <span> Upload</span>
                )}
              </label>
            )}
          </div>
        </div>
        <CouponCheckboxField
          className="mt-2"
          formikError={formik.errors.altleastOneStage1}
          formikTouched={formik.touched.altleastOneStage1}
          itemName="smsMessageStage1"
          onChangeFn={formik.handleChange}
          labelName="SMS Message"
          formikValue={formik.values?.smsMessageStage1}
          labelColor={formik.values.smsMessageStage1 === true ? true : false}
          disabled={is_editable === false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Message Title*"
            itemName={"smsMessageTitleStage1"}
            inputValue={formik.values.smsMessageTitleStage1}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.smsMessageTitleStage1}
            formikTouched={formik.touched.smsMessageTitleStage1}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik?.values?.smsMessageStage1 === false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Title*"
            itemName={"smsMessageTitleStage1"}
            formik={formik}
            formikValue={formik.values.smsMessageTitleStage1}
            formikError={formik.errors.smsMessageTitleStage1}
            formikTouched={formik.touched.smsMessageTitleStage1}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage1 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Message Body1*"
            itemName={"smsMessageBodyStage1"}
            inputValue={formik.values.smsMessageBodyStage1}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.smsMessageBodyStage1}
            formikTouched={formik.touched.smsMessageBodyStage1}
            placeholder="Enter Draft Message Title*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false ||
              formik?.values?.smsMessageStage1 === false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Body1*"
            itemName={"smsMessageBodyStage1"}
            formik={formik}
            formikValue={formik.values.smsMessageBodyStage1}
            formikError={formik.errors.smsMessageBodyStage1}
            formikTouched={formik.touched.smsMessageBodyStage1}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage1 === false
            }
          />
        </div>
      </div>
    </>
  );
};

export default DriverBroadCastStage1;
