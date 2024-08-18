import React from "react";
import CouponCheckboxField from "../../form/couponCheckboxField";
import CouponInputField from "../../form/couponInputField";
import CouponSelectField from "../../form/CouponSelectField";
import { openInNewTab } from "../../helper";
import DraftMessageInput from "../../form/draftMessageInput";

const ReferralBroadcastStage2 = ({
  formik,
  is_editable,
  uploaded,
  notifyImgStage2,
  handleNotifyImgStage2Change,
}) => {
  const broadcastTypeStage2 = [
    {
      value: "OfflineMobileApp",
      label: "Offline Mobile Application",
    },
    { value: "OnlineMobileApp", label: "Online Mobile Application" },
  ];
  const reminderCycleStage2 = [
    { value: "Daily", label: "Daily" },
    { value: "AlternateDays", label: "Alternate Days" },
  ];
  const reminderTypeStage2 = [
    { value: "None", label: "None" },
    {
      value: "NotificationOnly",
      label: "Notification Only",
      isDisabled: !formik.values.notificationStage2,
    },
    {
      value: "SMSOnly",
      label: "SMS Message Only",
      isDisabled: !formik.values.smsMessageStage2,
    },
    {
      value: "Both",
      label: "Both",
      isDisabled: !formik.values.smsMessageStage2 || !formik.values.notificationStage2,
    },
  ];

  return (
    <>
      <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
        <p className=" primary_color fs_18 fw_500 ">
          <span className="text_underline">Stage 2 :</span> Receiver Broadcast
          (Receiver Downloads The App)
        </p>
        <CouponCheckboxField
          formikError={formik.errors.altleastOneStage2}
          formikTouched={formik.touched.altleastOneStage2}
          itemName="notificationStage2"
          onChangeFn={(e) => {
            formik.handleChange(e);
            formik.setFieldValue("reminderTypeStage2", "");
          }}
          labelName="Receiver Notifications"
          formikValue={formik.values.notificationStage2}
          formik={formik}
          labelColor={formik.values.notificationStage2 === true ? true : false}
          disabled={is_editable === false ? true : false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Notification Title*"
            itemName={"notificationTitleStage2"}
            inputValue={formik.values.notificationTitleStage2}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationTitleStage2}
            formikTouched={formik.touched.notificationTitleStage2}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik?.values?.notificationStage2 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Title*"
            itemName={"notificationTitleStage2"}
            formik={formik}
            formikValue={formik.values.notificationTitleStage2}
            formikError={formik.errors.notificationTitleStage2}
            formikTouched={formik.touched.notificationTitleStage2}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage2 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Notification Body1*"
            itemName={"notificationBodyStage2"}
            inputValue={formik.values.notificationBodyStage2}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationBodyStage2}
            formikTouched={formik.touched.notificationBodyStage2}
            placeholder="Enter Draft Message Title*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false ||
              formik?.values?.notificationStage2 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Body1*"
            itemName={"notificationBodyStage2"}
            formik={formik}
            formikValue={formik.values.notificationBodyStage2}
            formikError={formik.errors.notificationBodyStage2}
            formikTouched={formik.touched.notificationBodyStage2}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage2 === false
            }
          />
        </div>
        <div className="d-flex align-items-center gap-3 my-3 ms-4">
          <span className={"fs_16 primary_color fw_500"}>
            Notification Image{" "}
            <span className="primary_color fs_14">(optional)</span>
          </span>
          {uploaded || formik.values.notification_image_stage2.length >= 1 ? (
            <>
              <span className="green_color fs_14">Image Uploaded</span>
              <button
                className="primary_bg white_color border_radius_5px px-3 border_none"
                onClick={() =>
                  openInNewTab(
                    uploaded
                      ? notifyImgStage2
                      : formik.values.notification_image_stage2
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
            formik?.values?.notificationStage2 === false ? (
              <></>
            ) : (
              <label
                className={
                  is_editable === false
                    ? "upload_btn px-2 white_color light_grey_bg border_radius_5px fs_14"
                    : " upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14"
                }
                htmlFor="files"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="files"
                  className="upload_document_input cursor_pointer"
                  name="notification_image_stage2"
                  onChange={(e) => {
                    formik.setFieldValue(
                      "notification_image_stage2",
                      e.target.files[0]
                    );
                    handleNotifyImgStage2Change(e);
                  }}
                  disabled={is_editable === false ? true : false}
                />
                {uploaded ||
                formik.values.notification_image_stage2.length >= 1 ? (
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
          formikError={formik.errors.altleastOneStage2}
          formikTouched={formik.touched.altleastOneStage2}
          itemName="smsMessageStage2"
          onChangeFn={(e) => {
            formik.handleChange(e);
            formik.setFieldValue("reminderTypeStage2", "");
          }}
          labelName="Receiver SMS Message"
          formikValue={formik.values.smsMessageStage2}
          formik={formik}
          labelColor={formik.values.smsMessageStage2 === true ? true : false}
          disabled={is_editable === false ? true : false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Message Title*"
            itemName={"smsMessageTitleStage2"}
            inputValue={formik.values.smsMessageTitleStage2}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.smsMessageTitleStage2}
            formikTouched={formik.touched.smsMessageTitleStage2}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false || formik.values.smsMessageStage2 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Title*"
            itemName={"smsMessageTitleStage2"}
            formik={formik}
            formikValue={formik.values.smsMessageTitleStage2}
            formikError={formik.errors.smsMessageTitleStage2}
            formikTouched={formik.touched.smsMessageTitleStage2}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage2 === false
            }
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Message Body1*"
            itemName={"smsMessageBodyStage2"}
            inputValue={formik.values.smsMessageBodyStage2}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.smsMessageBodyStage2}
            formikTouched={formik.touched.smsMessageBodyStage2}
            placeholder="Enter Draft Message Title*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false || formik.values.smsMessageStage2 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Body1*"
            itemName={"smsMessageBodyStage2"}
            formik={formik}
            formikValue={formik.values.smsMessageBodyStage2}
            formikError={formik.errors.smsMessageBodyStage2}
            formikTouched={formik.touched.smsMessageBodyStage2}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage2 === false
            }
            is_input={true}
          />
          <CouponSelectField
            label_fontSize="fs_16 fw_500 mt-3"
            labelName="Broadcast Type*"
            placeholder="Select Broadcast Type"
            option={broadcastTypeStage2}
            itemName="broadcastTypeStage2"
            formikValue={formik.values.broadcastTypeStage2}
            formik={formik}
            formikError={formik.errors.broadcastTypeStage2}
            formikTouched={formik.touched.broadcastTypeStage2}
            selectDisabled={is_editable === false ? true : false}
          />
          <div className="row mt-1">
            <div className=" col-md-3 col-sm-6">
              <CouponSelectField
                labelName="Reminder Type*"
                placeholder="Select reminder type"
                option={reminderTypeStage2}
                itemName="reminderTypeStage2"
                formikValue={formik.values.reminderTypeStage2}
                formik={formik}
                formikError={formik.errors.reminderTypeStage2}
                formikTouched={formik.touched.reminderTypeStage2}
                selectDisabled={is_editable === false ? true : false}
              />
            </div>
            {formik.values.broadcastTypeStage2 === "OfflineMobileApp" && (
              <>
                <div className=" col-md-3 col-sm-6">
                  <label
                    className={
                      formik.errors.reminderTimeStage2 &&
                      formik.touched.reminderTimeStage2
                        ? "fs_14 red_color"
                        : "primary_color fs_14"
                    }
                  >
                    Reminder Time*
                  </label>
                  <input
                    type="time"
                    className={
                      formik.errors.reminderTimeStage2 &&
                      formik.touched.reminderTimeStage2
                        ? "w-100 border_radius_3px error_border outline_none p-1"
                        : `w-100 border_radius_3px outline_none p-1 ${
                            is_editable === false
                              ? "disabled_border disabled_bg_color secondary_color"
                              : "primary_border primary_color white_bg"
                          }`
                    }
                    name="reminderTimeStage2"
                    value={formik.values.reminderTimeStage2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={is_editable === false ? true : false}
                  />
                </div>

                <div className=" col-md-3 col-sm-6">
                  <CouponSelectField
                    labelName="Reminder Cycle*"
                    placeholder="Select reminder type"
                    option={reminderCycleStage2}
                    itemName="reminderCycleStage2"
                    formikValue={formik.values.reminderCycleStage2}
                    formik={formik}
                    formikError={formik.errors.reminderCycleStage2}
                    formikTouched={formik.touched.reminderCycleStage2}
                    selectDisabled={is_editable === false ? true : false}
                  />
                </div>
              </>
            )}
            <div className=" col-md-3 col-sm-6">
              <CouponInputField
                labelName="Reminder Frequency*"
                itemName={"reminderFrequencyStage2"}
                inputValue={formik.values.reminderFrequencyStage2}
                onChangeFn={formik.handleChange}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.reminderFrequencyStage2}
                formikTouched={formik.touched.reminderFrequencyStage2}
                placeholder="Select reminder frequency"
                inputDisabled={is_editable === false ? true : false}
              />
            </div>
            {formik.values.broadcastTypeStage2 === "OnlineMobileApp" && (
              <div className=" col-md-4 col-sm-6">
                <CouponInputField
                  labelName="Reminder Days*"
                  itemName={"onlineReminderDaysStage2"}
                  inputValue={formik.values.onlineReminderDaysStage2}
                  onChangeFn={formik.handleChange}
                  onBlurFn={formik.handleBlur}
                  formikError={formik.errors.onlineReminderDaysStage2}
                  formikTouched={formik.touched.onlineReminderDaysStage2}
                  placeholder="Enter reminder days"
                  inputDisabled={is_editable === false ? true : false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferralBroadcastStage2;
