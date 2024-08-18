import React from "react";
import CouponCheckboxField from "../../form/couponCheckboxField";
import CouponInputField from "../../form/couponInputField";
import { openInNewTab } from "../../helper";
import DraftMessageInput from "../../form/draftMessageInput";

const ReferralBroadcastStage4 = ({
  formik,
  is_editable,
  uploadedStage4,
  notifyImgStage4,
  handleNotifyImgStage4Change,
  stageNo = "Stage 4 :",
  stageTitle = "Receiver Broadcast (Receiver Completes The Required Rides)",
  notifyCheckboxLabel = "Sender Notifications",
  smsCheckboxLabel = "Sender SMS Message",
}) => {
  return (
    <>
      <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
        <p className=" primary_color fs_18 fw_500 ">
          <span className="text_underline">{stageNo}</span> {stageTitle}
        </p>
        <CouponCheckboxField
          formikError={formik.errors.altleastOneStage4}
          formikTouched={formik.touched.altleastOneStage4}
          itemName="notificationStage4"
          onChangeFn={formik.handleChange}
          labelName={notifyCheckboxLabel}
          formikValue={formik.values.notificationStage4}
          formik={formik}
          labelColor={formik.values.notificationStage4 === true ? true : false}
          disabled={is_editable === false ? true : false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Notification Title*"
            itemName={"notificationTitleStage4"}
            inputValue={formik.values.notificationTitleStage4}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationTitleStage4}
            formikTouched={formik.touched.notificationTitleStage4}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik.values.notificationStage4 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Title*"
            itemName={"notificationTitleStage4"}
            formik={formik}
            formikValue={formik.values.notificationTitleStage4}
            formikError={formik.errors.notificationTitleStage4}
            formikTouched={formik.touched.notificationTitleStage4}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage4 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Notification Body1*"
            itemName={"notificationBodyStage4"}
            inputValue={formik.values.notificationBodyStage4}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationBodyStage4}
            formikTouched={formik.touched.notificationBodyStage4}
            placeholder="Enter Draft Message Title*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false ||
              formik.values.notificationStage4 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Body1*"
            itemName={"notificationBodyStage4"}
            formik={formik}
            formikValue={formik.values.notificationBodyStage4}
            formikError={formik.errors.notificationBodyStage4}
            formikTouched={formik.touched.notificationBodyStage4}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage4 === false
            }
          />
        </div>
        <div className="d-flex align-items-center gap-3 my-3 ms-4">
          <span className={"fs_16 primary_color fw_500"}>
            Notification Image{" "}
            <span className="primary_color fs_14">(optional)</span>
          </span>
          {uploadedStage4 ||
          formik.values.notification_image_stage4.length >= 1 ? (
            <>
              <span className="green_color fs_14">Image Uploaded</span>
              <button
                className="primary_bg white_color border_radius_5px px-3 border_none"
                onClick={() =>
                  openInNewTab(
                    uploadedStage4
                      ? notifyImgStage4
                      : formik.values.notification_image_stage4
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
            formik?.values?.notificationStage4 === false ? (
              <></>
            ) : (
              <label
                className={
                  is_editable === false
                    ? "upload_btn px-2 white_color light_grey_bg border_radius_5px fs_14"
                    : " upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14"
                }
                htmlFor="stage4"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="stage4"
                  className="upload_document_input cursor_pointer"
                  name="notification_image_stage4"
                  onChange={(e) => {
                    formik.setFieldValue(
                      "notification_image_stage4",
                      e.target.files[0]
                    );
                    handleNotifyImgStage4Change(e);
                  }}
                  disabled={is_editable === false ? true : false}
                />
                {uploadedStage4 ||
                formik.values.notification_image_stage4.length >= 1 ? (
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
          formikError={formik.errors.altleastOneStage4}
          formikTouched={formik.touched.altleastOneStage4}
          itemName="smsMessageStage4"
          onChangeFn={formik.handleChange}
          labelName={smsCheckboxLabel}
          formikValue={formik.values.smsMessageStage4}
          formik={formik}
          labelColor={formik.values.smsMessageStage4 === true ? true : false}
          disabled={is_editable === false ? true : false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Message Title*"
            itemName={"smsMessageTitleStage4"}
            inputValue={formik.values.smsMessageTitleStage4}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.smsMessageTitleStage4}
            formikTouched={formik.touched.smsMessageTitleStage4}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false || formik.values.smsMessageStage4 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Title*"
            itemName={"smsMessageTitleStage4"}
            formik={formik}
            formikValue={formik.values.smsMessageTitleStage4}
            formikError={formik.errors.smsMessageTitleStage4}
            formikTouched={formik.touched.smsMessageTitleStage4}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage4 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Message Body1*"
            itemName={"smsMessageBodyStage4"}
            inputValue={formik.values.smsMessageBodyStage4}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.smsMessageBodyStage4}
            formikTouched={formik.touched.smsMessageBodyStage4}
            placeholder="Enter Draft Message Title*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false || formik.values.smsMessageStage4 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Body1*"
            itemName={"smsMessageBodyStage4"}
            formik={formik}
            formikValue={formik.values.smsMessageBodyStage4}
            formikError={formik.errors.smsMessageBodyStage4}
            formikTouched={formik.touched.smsMessageBodyStage4}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage4 === false
            }
          />
        </div>
      </div>
    </>
  );
};

export default ReferralBroadcastStage4;
