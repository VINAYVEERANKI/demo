import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import CouponCheckboxField from "../form/couponCheckboxField";
import DraftMessageInput from "../form/draftMessageInput";
import NotificationImageUpload from "../form/notificationImageUpload";
import NSEButtons from "./NSEButtons";
import MoreDetails from "./MoreDetails";
import { useDispatch } from "react-redux";
import { uploadImageCouponAction } from "../../redux/actions/imageUploadAction";
import useDisplayToggle from "../useDisplayToggle";

const NotificationForm = ({ nseData, formik, disabled, action }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [detailsShow, setDetailsShow] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  function handleNotificationImageChange(e) {
    if (e.target?.files?.length !== 0) {
      dispatch(
        uploadImageCouponAction(
          e.target.files[0],
          onUploadSuccess,
          onUploadError
        )
      );
    }
  }
  const onUploadSuccess = (data) => {
    console.log(data.data);
    setUploaded(true);
    console.log(data?.data?.data?.location, "adasdadadds");
    formik.setFieldValue("notification_image", data?.data?.data?.location);
  };
  const onUploadError = (data) => {
    console.log(data);
  };

  console.log(formik.values);

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDetailsShow,
  });

  return (
    <>
      <>
        <div className="discount_detials_container p-sm-3 p-2 pe-4 mt-2">
          <div className="text-end">
            {detailsShow ? (
              <div className="more_details_card more_details_containers" ref={insideClickRef}>
                <MoreDetails nseData={nseData}/>
              </div>
            ) : null}
            <span
              className="blue_color fs_15 fw_400 text_underline cursor_pointer"
              onClick={() => {
                setDetailsShow(!detailsShow);
              }}
              ref={onClickRef}
            >
              More Details
            </span>
          </div>
          <CouponCheckboxField
            formikError={formik.errors.altleastOne}
            formikTouched={formik.touched.altleastOne}
            itemName="is_send_notification"
            onChangeFn={formik.handleChange}
            labelName="In-App Notification"
            formikValue={formik.values.is_send_notification}
            formik={formik}
            fontsize="18px"
            labelColor={
              formik.values.is_send_notification === true ? true : false
            }
            disabled={action === "view"}
          />
          <div className="ps-sm-4 mt-2">
            <DraftMessageInput
              labelName={"Notification Title*"}
              itemName={"notification_title"}
              label_font_size="18px"
              formik={formik}
              formikValue={formik.values.notification_title}
              formikError={formik.errors.notification_title}
              formikTouched={formik.touched.notification_title}
              onBlurFn={formik.handleBlur}
              // disabled={formik?.values?.is_send_notification === false}
              disabled={action === "view"}
              is_input={true}
            />
            <div className="mt-1">
              <DraftMessageInput
                labelName="Notification Body1*"
                itemName={"notification_body"}
                label_font_size="18px"
                formik={formik}
                formikValue={formik.values.notification_body}
                formikError={formik.errors.notification_body}
                formikTouched={formik.touched.notification_body}
                onBlurFn={formik.handleBlur}
                // disabled={formik?.values?.is_send_notification === false}
                disabled={action === "view"}
              />
            </div>

            <NotificationImageUpload
              className="mt-3"
              setFieldValue={formik?.setFieldValue}
              uploaded={uploaded}
              is_editable={action === "edit"}
              notificationImage={formik?.values?.notification_image}
              handleNotificationImageChange={handleNotificationImageChange}
              formikValue={formik?.values?.notification_image}
              itemName={"notification_image"}
              // disabled={action === "view"}
            />
          </div>

          <div className="mt-3">
            <CouponCheckboxField
              formikError={formik.errors.altleastOne}
              formikTouched={formik.touched.altleastOne}
              itemName="is_send_sms_message"
              onChangeFn={formik.handleChange}
              labelName="SMS Message"
              formikValue={formik.values.is_send_sms_message}
              formik={formik}
              fontsize="18px"
              labelColor={
                formik.values.is_send_sms_message === true ? true : false
              }
              disabled={action === "view"}
            />
          </div>
          <div className="ps-sm-4 mt-2">
            <DraftMessageInput
              labelName="Message Title*"
              itemName={"message_header"}
              label_font_size="18px"
              formik={formik}
              formikValue={formik.values.message_header}
              formikError={formik.errors.message_header}
              formikTouched={formik.touched.message_header}
              onBlurFn={formik.handleBlur}
              // disabled={formik?.values?.is_send_sms_message === false}
              disabled={action === "view"}
              is_input={true}
            />
            <div className="mt-1">
              <DraftMessageInput
                labelName="Message Body1*"
                itemName={"message_body"}
                label_font_size="18px"
                formik={formik}
                formikValue={formik.values.message_body}
                formikError={formik.errors.message_body}
                formikTouched={formik.touched.message_body}
                onBlurFn={formik.handleBlur}
                // disabled={formik?.values?.is_send_sms_message === false}
                disabled={action === "view"}
              />
            </div>
          </div>
        </div>
        {firstErrorField && (
          <div className="red_color fs_16 fw_500 ps-3">
            {formik.errors[firstErrorField]}
          </div>
        )}
      </>
      <NSEButtons
        backBtn={() => {
          navigate(-1);
        }}
        resetBtn={() => {
          formik.resetForm();
          setUploaded(false);
        }}
        disabled={disabled}
      />
    </>
  );
};

export default NotificationForm;
