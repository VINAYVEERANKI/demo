import React from "react";
import Select, { components } from "react-select";
import DropDownIcon from "../../../assets/icons/dropdown-icon";
import CouponInputField from "../../form/couponInputField";
import CouponSelectField from "../../form/CouponSelectField";
import {
  reactSelectUsageLimit,
  reactSelectUsageLimitError,
} from "../../mui-styles/react-styles";

const BroadcastType = ({ formik }) => {
  const broadcastType = [
    {
      value: "Offline Mobile Application",
      label: "Offline Mobile Application",
    },
    { value: "Online Mobile Application", label: "Online Mobile Application" },
  ];

  const reminderType = [
    { value: "None", label: "None" },
    { value: "Notification Only", label: "Notification Only" },
    { value: "SMS Message Only", label: "SMS Message Only" },
    { value: "Both", label: "Both" },
  ];
  const reminderCycle = [
    { value: "Daily", label: "Daily" },
    { value: "Alternate Days", label: "Alternate Days" },
  ];

  const onlineReminderType = [
    { value: "None", label: "None" },
    { value: "Notification Only", label: "Notification Only" },
    { value: "SMS Message Only", label: "SMS Message Only" },
    { value: "Both", label: "Both" },
  ];

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="ps-4">
      <CouponSelectField
       label_fontSize="fs_16 fw_500 mt-3"
        labelName="Broadcast Type*"
        placeholder="Select Broadcast Type"
        option={broadcastType}
        itemName="broadcastType"
        formikValue={formik.values.broadcastType}
        formik={formik}
        formikError={formik.errors.broadcastType}
        formikTouched={formik.touched.broadcastType}
      />
      {formik.values.broadcastType === "Offline Mobile Application" && (
        <div className="row mt-1">
          <div className=" col-md-3 col-sm-6">
            <CouponSelectField
              labelName="Reminder Type*"
              placeholder="Select reminder type"
              option={reminderType}
              itemName="reminderType"
              formikValue={formik.values.reminderType}
              formik={formik}
              formikError={formik.errors.reminderType}
              formikTouched={formik.touched.reminderType}
            />
          </div>
          <div className=" col-md-3 col-sm-6">
            <label
              className={
                formik.errors.reminderTime && formik.touched.reminderTime
                  ? "fs_14 red_color"
                  : "primary_color fs_14"
              }
            >
              Reminder Time*
            </label>
            <input
              type="time"
              className={
                formik.errors.reminderTime && formik.touched.reminderTime
                  ? "w-100 border_radius_3px error_border outline_none p-1"
                  : "w-100 border_radius_3px primary_border outline_none p-1"
              }
              name="reminderTime"
              value={formik.values.reminderTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className=" col-md-3 col-sm-6">
            <CouponSelectField
              labelName="Reminder Cycle*"
              placeholder="Select reminder type"
              option={reminderCycle}
              itemName="reminderCycle"
              formikValue={formik.values.reminderCycle}
              formik={formik}
              formikError={formik.errors.reminderCycle}
              formikTouched={formik.touched.reminderCycle}
            />
          </div>
          <div className=" col-md-3 col-sm-6">
            <CouponInputField
              labelName="Reminder Frequency*"
              itemName={"reminderFrequency"}
              inputValue={formik.values.reminderFrequency}
              onChangeFn={formik.handleChange}
              onBlurFn={formik.handleBlur}
              formikError={formik.errors.reminderFrequency}
              formikTouched={formik.touched.reminderFrequency}
              placeholder="Select reminder frequency"
            />
          </div>
        </div>
      )}
      {formik.values.broadcastType === "Online Mobile Application" && (
        <div className="row mt-1">
          <div className=" col-md-4 col-sm-6">
            <CouponSelectField
              labelName="Reminder Type*"
              placeholder="Select Reminder Type"
              option={onlineReminderType}
              itemName="onlineReminderType"
              formikValue={formik.values.onlineReminderType}
              formik={formik}
              formikError={formik.errors.onlineReminderType}
              formikTouched={formik.touched.onlineReminderType}
            />
          </div>
          <div className=" col-md-4 col-sm-6">
            <CouponInputField
              labelName="Reminder Frequency (Per Day)*"
              itemName={"onlineReminderFrequency"}
              inputValue={formik.values.onlineReminderFrequency}
              onChangeFn={formik.handleChange}
              onBlurFn={formik.handleBlur}
              formikError={formik.errors.onlineReminderFrequency}
              formikTouched={formik.touched.onlineReminderFrequency}
              placeholder="Enter reminder frequency"
            />
          </div>
          <div className=" col-md-4 col-sm-6">
            <CouponInputField
              labelName="Reminder Days*"
              itemName={"onlineReminderDays"}
              inputValue={formik.values.onlineReminderDays}
              onChangeFn={formik.handleChange}
              onBlurFn={formik.handleBlur}
              formikError={formik.errors.onlineReminderDays}
              formikTouched={formik.touched.onlineReminderDays}
              placeholder="Enter reminder days"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BroadcastType;
