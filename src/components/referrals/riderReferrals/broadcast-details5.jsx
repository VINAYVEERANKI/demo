import React from "react";
import CouponCheckboxField from "../../form/couponCheckboxField";
import CouponInputField from "../../form/couponInputField";
import { openInNewTab } from "../../helper";
import DraftMessageInput from "../../form/draftMessageInput";

const ReferralBroadcastStage5 = ({
  formik,
  is_editable,
  uploadedStage5,
  notifyImgStage5,
  handleNotifyImgStage5Change,
  stageNo = "Stage 5 :",
  stageTitle = "Sender Broadcast (Receiver Completes The Required Rides)",
}) => {
  return (
    <>
      <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
        <p className=" primary_color fs_18 fw_500 ">
          <span className="text_underline">{stageNo}</span> {stageTitle}
        </p>
        <CouponCheckboxField
          formikError={formik.errors.altleastOneStage5}
          formikTouched={formik.touched.altleastOneStage5}
          itemName="notificationStage5"
          onChangeFn={formik.handleChange}
          labelName="Sender Notifications"
          formikValue={formik.values.notificationStage5}
          formik={formik}
          labelColor={formik.values.notificationStage5 === true ? true : false}
          disabled={is_editable === false ? true : false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Notification Title*"
            itemName={"notificationTitleStage5"}
            inputValue={formik.values.notificationTitleStage5}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationTitleStage5}
            formikTouched={formik.touched.notificationTitleStage5}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik.values.notificationStage5 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Title*"
            itemName={"notificationTitleStage5"}
            formik={formik}
            formikValue={formik.values.notificationTitleStage5}
            formikError={formik.errors.notificationTitleStage5}
            formikTouched={formik.touched.notificationTitleStage5}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage5 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Notification Body1*"
            itemName={"notificationBodyStage5"}
            inputValue={formik.values.notificationBodyStage5}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationBodyStage5}
            formikTouched={formik.touched.notificationBodyStage5}
            placeholder="Enter Draft Message Title*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false ||
              formik.values.notificationStage5 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Body1*"
            itemName={"notificationBodyStage5"}
            formik={formik}
            formikValue={formik.values.notificationBodyStage5}
            formikError={formik.errors.notificationBodyStage5}
            formikTouched={formik.touched.notificationBodyStage5}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage5 === false
            }
          />
        </div>
        <div className="d-flex align-items-center gap-3 my-3 ms-4">
          <span className={"fs_16 primary_color fw_500"}>
            Notification Image{" "}
            <span className="primary_color fs_14">(optional)</span>
          </span>
          {uploadedStage5 ||
          formik.values.notification_image_stage5?.length >= 1 ? (
            <>
              <span className="green_color fs_14">Image Uploaded</span>
              <button
                className="primary_bg white_color border_radius_5px px-3 border_none"
                onClick={() =>
                  openInNewTab(
                    uploadedStage5
                      ? notifyImgStage5
                      : formik.values.notification_image_stage5
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
            formik?.values?.notificationStage5 === false ? (
              <></>
            ) : (
              <label
                className={
                  is_editable === false
                    ? "upload_btn px-2 white_color light_grey_bg border_radius_5px fs_14"
                    : " upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14"
                }
                htmlFor="stage5"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="stage5"
                  className="upload_document_input cursor_pointer"
                  name="notification_image_stage5"
                  onChange={(e) => {
                    formik.setFieldValue(
                      "notification_image_stage5",
                      e.target.files[0]
                    );
                    handleNotifyImgStage5Change(e);
                  }}
                  disabled={is_editable === false ? true : false}
                />
                {uploadedStage5 ||
                formik.values.notification_image_stage5?.length >= 1 ? (
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
          formikError={formik.errors.altleastOneStage5}
          formikTouched={formik.touched.altleastOneStage5}
          itemName="smsMessageStage5"
          onChangeFn={formik.handleChange}
          labelName="Sender SMS Message"
          formikValue={formik.values.smsMessageStage5}
          formik={formik}
          labelColor={formik.values.smsMessageStage5 === true ? true : false}
          disabled={is_editable === false ? true : false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Message Title*"
            itemName={"smsMessageTitleStage5"}
            inputValue={formik.values.smsMessageTitleStage5}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.smsMessageTitleStage5}
            formikTouched={formik.touched.smsMessageTitleStage5}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false || formik.values.smsMessageStage5 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Title*"
            itemName={"smsMessageTitleStage5"}
            formik={formik}
            formikValue={formik.values.smsMessageTitleStage5}
            formikError={formik.errors.smsMessageTitleStage5}
            formikTouched={formik.touched.smsMessageTitleStage5}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage5 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Message Body1*"
            itemName={"smsMessageBodyStage5"}
            inputValue={formik.values.smsMessageBodyStage5}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.smsMessageBodyStage5}
            formikTouched={formik.touched.smsMessageBodyStage5}
            placeholder="Enter Draft Message Title*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false || formik.values.smsMessageStage5 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Body1*"
            itemName={"smsMessageBodyStage5"}
            formik={formik}
            formikValue={formik.values.smsMessageBodyStage5}
            formikError={formik.errors.smsMessageBodyStage5}
            formikTouched={formik.touched.smsMessageBodyStage5}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage5 === false
            }
          />
        </div>
      </div>
    </>
  );
};

export default ReferralBroadcastStage5;
