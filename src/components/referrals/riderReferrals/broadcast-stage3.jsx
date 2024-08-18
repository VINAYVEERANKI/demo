import React from "react";
import CouponCheckboxField from "../../form/couponCheckboxField";
import CouponInputField from "../../form/couponInputField";
import CouponSelectField from "../../form/CouponSelectField";
import { openInNewTab } from "../../helper";
import DraftMessageInput from "../../form/draftMessageInput";

const ReferralBroadcastStage3 = ({
  formik,
  is_editable,
  uploadedStage3,
  notifyImgStage3,
  handleNotifyImgStage3Change,
  DriverToDriver_5Star,
  referralData,
  stageNo = "Stage 3 :",
}) => {
  console.log(referralData);

  const broadcastTypeStage3 = [
    {
      value: "OfflineMobileApp",
      label: "Offline Mobile Application",
    },
    { value: "OnlineMobileApp", label: "Online Mobile Application" },
  ];
  const reminderCycleStage3 = [
    { value: "Daily", label: "Daily" },
    { value: "AlternateDays", label: "Alternate Days" },
  ];
  const reminderTypeStage3 = [
    { value: "None", label: "None" },
    {
      value: "NotificationOnly",
      label: "Notification Only",
      isDisabled: !formik.values.notificationStage3,
    },
    {
      value: "SMSOnly",
      label: "SMS Message Only",
      isDisabled: !formik.values.smsMessageStage3,
    },
    {
      value: "Both",
      label: "Both",
      isDisabled:
        !formik.values.smsMessageStage3 || !formik.values.notificationStage3,
    },
  ];

  return (
    <>
      <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
        <p className=" primary_color fs_18 fw_500 ">
          <span className="text_underline">{stageNo}</span>
          {DriverToDriver_5Star
            ? " Receiver Broadcast (Receiver Completes The Required Rides) "
            : " Sender Broadcast (Receiver Downloads The App)"}
        </p>
        <CouponCheckboxField
          formikError={formik.errors.altleastOneStage3}
          formikTouched={formik.touched.altleastOneStage3}
          itemName="notificationStage3"
          onChangeFn={(e) => {
            formik.handleChange(e);
            formik.setFieldValue("reminderTypeStage3", "");
          }}
          labelName={
            DriverToDriver_5Star
              ? "Receiver Notification"
              : "Sender Notification"
          }
          formikValue={formik.values.notificationStage3}
          formik={formik}
          labelColor={formik.values.notificationStage3 === true ? true : false}
          // disabled={is_editable === false || referralData?.required_rides_completed_by_receiver === 0}
          disabled={is_editable === false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Notification Title*"
            itemName={"notificationTitleStage3"}
            inputValue={formik.values.notificationTitleStage3}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationTitleStage3}
            formikTouched={formik.touched.notificationTitleStage3}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik.values.notificationStage3 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Notification Title*"
            itemName={"notificationTitleStage3"}
            formik={formik}
            formikValue={formik.values.notificationTitleStage3}
            formikError={formik.errors.notificationTitleStage3}
            formikTouched={formik.touched.notificationTitleStage3}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage3 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Notification Body1*"
            itemName={"notificationBody1Stage3"}
            inputValue={formik.values.notificationBody1Stage3}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.notificationBody1Stage3}
            formikTouched={formik.touched.notificationBody1Stage3}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik.values.notificationStage3 === false
                ? true
                : false
            }
            input={!DriverToDriver_5Star ? true : false}
            TextArea={DriverToDriver_5Star ? true : false}
          /> */}
          <DraftMessageInput
            labelName="Notification Body1*"
            itemName={"notificationBody1Stage3"}
            formik={formik}
            formikValue={formik.values.notificationBody1Stage3}
            formikError={formik.errors.notificationBody1Stage3}
            formikTouched={formik.touched.notificationBody1Stage3}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.notificationStage3 === false
            }
          />
          {/* {!DriverToDriver_5Star ? (
            <>
              <CouponInputField
                label_font_size="fs_16 mt-2"
                labelName="Notification Body2*"
                itemName={"notificationBody2Stage3"}
                inputValue={formik.values.notificationBody2Stage3}
                onChangeFn={formik.handleChange}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.notificationBody2Stage3}
                formikTouched={formik.touched.notificationBody2Stage3}
                placeholder="Enter Draft Message Title*"
                inputDisabled={
                  is_editable === false ||
                  formik.values.notificationStage3 === false
                    ? true
                    : false
                }
              />
              <CouponInputField
                label_font_size="fs_16 mt-2"
                labelName="Notification Body3*"
                itemName={"notificationBody3Stage3"}
                inputValue={formik.values.notificationBody3Stage3}
                onChangeFn={formik.handleChange}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.notificationBody3Stage3}
                formikTouched={formik.touched.notificationBody3Stage3}
                placeholder="Enter Draft Message Title*"
                input={false}
                TextArea={true}
                inputDisabled={
                  is_editable === false ||
                  formik.values.notificationStage3 === false
                    ? true
                    : false
                }
              />
            </>
          ) : (
            <></>
          )} */}
        </div>
        <div className="d-flex align-items-center gap-3 my-3 ms-4">
          <span className={"fs_16 primary_color fw_500"}>
            Notification Image{" "}
            <span className="primary_color fs_14">(optional)</span>
          </span>
          {uploadedStage3 ||
          formik.values.notification_image_stage3.length >= 1 ? (
            <>
              <span className="green_color fs_14">Image Uploaded</span>
              <button
                className="primary_bg white_color border_radius_5px px-3 border_none"
                onClick={() =>
                  openInNewTab(
                    uploadedStage3
                      ? notifyImgStage3
                      : formik.values.notification_image_stage3
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
            formik?.values?.notificationStage3 === false ? (
              <></>
            ) : (
              <label
                className={
                  is_editable === false
                    ? "upload_btn px-2 white_color light_grey_bg border_radius_5px fs_14"
                    : " upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14"
                }
                htmlFor="stage3"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="stage3"
                  className="upload_document_input cursor_pointer"
                  name="notification_image_stage3"
                  onChange={(e) => {
                    formik.setFieldValue(
                      "notification_image_stage3",
                      e.target.files[0]
                    );
                    handleNotifyImgStage3Change(e);
                  }}
                  disabled={is_editable === false ? true : false}
                />
                {uploadedStage3 ||
                formik.values.notification_image_stage3.length >= 1 ? (
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
          formikError={formik.errors.altleastOneStage3}
          formikTouched={formik.touched.altleastOneStage3}
          itemName="smsMessageStage3"
          onChangeFn={(e) => {
            formik.handleChange(e);
            formik.setFieldValue("reminderTypeStage3", "");
          }}
          labelName={
            DriverToDriver_5Star ? "Receiver SMS Message" : "Sender SMS Message"
          }
          formikValue={formik.values.smsMessageStage3}
          formik={formik}
          labelColor={formik.values.smsMessageStage3 === true ? true : false}
          disabled={is_editable === false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Message Title*"
            itemName={"messageTitleStage3"}
            inputValue={formik.values.messageTitleStage3}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.messageTitleStage3}
            formikTouched={formik.touched.messageTitleStage3}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false || formik.values.smsMessageStage3 === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Message Title*"
            itemName={"messageTitleStage3"}
            formik={formik}
            formikValue={formik.values.messageTitleStage3}
            formikError={formik.errors.messageTitleStage3}
            formikTouched={formik.touched.messageTitleStage3}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage3 === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Message Body1*"
            itemName={"messageBody1Stage3"}
            inputValue={formik.values.messageBody1Stage3}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.messageBody1Stage3}
            formikTouched={formik.touched.messageBody1Stage3}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false || formik.values.smsMessageStage3 === false
                ? true
                : false
            }
            input={!DriverToDriver_5Star ? true : false}
            TextArea={DriverToDriver_5Star ? true : false}
          /> */}
          <DraftMessageInput
            labelName="Message Body1*"
            itemName={"messageBody1Stage3"}
            formik={formik}
            formikValue={formik.values.messageBody1Stage3}
            formikError={formik.errors.messageBody1Stage3}
            formikTouched={formik.touched.messageBody1Stage3}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.smsMessageStage3 === false
            }
          />
          {/* 
          {!DriverToDriver_5Star ? (
            <>
              <CouponInputField
                label_font_size="fs_16 mt-1"
                labelName="Message Body2*"
                itemName={"messageBody2Stage3"}
                inputValue={formik.values.messageBody2Stage3}
                onChangeFn={formik.handleChange}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.messageBody2Stage3}
                formikTouched={formik.touched.messageBody2Stage3}
                placeholder="Enter Draft Message Title*"
                inputDisabled={
                  is_editable === false ||
                  formik.values.smsMessageStage3 === false
                    ? true
                    : false
                }
              />
              <CouponInputField
                label_font_size="fs_16 mt-2"
                labelName="Message Body3*"
                itemName={"messageBody3Stage3"}
                inputValue={formik.values.messageBody3Stage3}
                onChangeFn={formik.handleChange}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.messageBody3Stage3}
                formikTouched={formik.touched.messageBody3Stage3}
                placeholder="Enter Draft Message Title*"
                input={false}
                TextArea={true}
                inputDisabled={
                  is_editable === false ||
                  formik.values.smsMessageStage3 === false
                    ? true
                    : false
                }
              />
            </>
          ) : (
            <></>
          )} */}

          {!DriverToDriver_5Star ? (
            <>
              <CouponSelectField
                label_fontSize="fs_16 fw_500 mt-3"
                labelName="Broadcast Type*"
                placeholder="Select Broadcast Type"
                option={broadcastTypeStage3}
                itemName="broadcastTypeStage3"
                formikValue={formik.values.broadcastTypeStage3}
                formik={formik}
                formikError={formik.errors.broadcastTypeStage3}
                formikTouched={formik.touched.broadcastTypeStage3}
                selectDisabled={is_editable === false ? true : false}
              />
              <div className="row mt-1">
                <div className=" col-md-3 col-sm-6">
                  <CouponSelectField
                    label_fontSize="fs_16"
                    labelName="Reminder Type*"
                    placeholder="Select reminder type"
                    option={reminderTypeStage3}
                    itemName="reminderTypeStage3"
                    formikValue={formik.values.reminderTypeStage3}
                    formik={formik}
                    formikError={formik.errors.reminderTypeStage3}
                    formikTouched={formik.touched.reminderTypeStage3}
                    selectDisabled={is_editable === false ? true : false}
                  />
                </div>
                {formik.values.broadcastTypeStage3 === "OfflineMobileApp" && (
                  <>
                    <div className=" col-md-3 col-sm-6">
                      <label
                        className={
                          formik.errors.reminderTimeStage3 &&
                          formik.touched.reminderTimeStage3
                            ? "fs_14 red_color"
                            : "primary_color fs_14"
                        }
                      >
                        Reminder Time*
                      </label>
                      <input
                        type="time"
                        className={
                          formik.errors.reminderTimeStage3 &&
                          formik.touched.reminderTimeStage3
                            ? "w-100 border_radius_3px error_border outline_none p-1"
                            : `w-100 border_radius_3px outline_none p-1 ${
                                is_editable === false
                                  ? "disabled_border disabled_bg_color secondary_color"
                                  : "primary_border primary_color white_bg"
                              }`
                        }
                        name="reminderTimeStage3"
                        value={formik.values.reminderTimeStage3}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={is_editable === false ? true : false}
                      />
                    </div>

                    <div className=" col-md-3 col-sm-6">
                      <CouponSelectField
                        label_fontSize="fs_16"
                        labelName="Reminder Cycle*"
                        placeholder="Select reminder type"
                        option={reminderCycleStage3}
                        itemName="reminderCycleStage3"
                        formikValue={formik.values.reminderCycleStage3}
                        formik={formik}
                        formikError={formik.errors.reminderCycleStage3}
                        formikTouched={formik.touched.reminderCycleStage3}
                        selectDisabled={is_editable === false ? true : false}
                      />
                    </div>
                  </>
                )}
                <div className=" col-md-3 col-sm-6">
                  <CouponInputField
                    labelName="Reminder Frequency*"
                    itemName={"reminderFrequencyStage3"}
                    inputValue={formik.values.reminderFrequencyStage3}
                    onChangeFn={formik.handleChange}
                    onBlurFn={formik.handleBlur}
                    formikError={formik.errors.reminderFrequencyStage3}
                    formikTouched={formik.touched.reminderFrequencyStage3}
                    placeholder="Select reminder frequency"
                    inputDisabled={is_editable === false ? true : false}
                  />
                </div>
                {formik.values.broadcastTypeStage3 === "OnlineMobileApp" && (
                  <div className=" col-md-4 col-sm-6">
                    <CouponInputField
                      labelName="Reminder Days*"
                      itemName={"onlineReminderDaysStage3"}
                      inputValue={formik.values.onlineReminderDaysStage3}
                      onChangeFn={formik.handleChange}
                      onBlurFn={formik.handleBlur}
                      formikError={formik.errors.onlineReminderDaysStage3}
                      formikTouched={formik.touched.onlineReminderDaysStage3}
                      placeholder="Enter reminder days"
                      inputDisabled={is_editable === false ? true : false}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default ReferralBroadcastStage3;
