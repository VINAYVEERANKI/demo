import React from "react";
import { useState } from "react";
import CouponCheckboxField from "../../form/couponCheckboxField";
import CouponInputField from "../../form/couponInputField";
import DraftMessageInput from "../../form/draftMessageInput";
import CouponDetails from "../../coupons/riderCoupons/coupondetails";

const ReferralBroadcastStage1 = ({
  formik,
  is_editable,
  referralBackendData,
  type = "",
  currentReferralData,
  driverreferral,
  riderreferral,
}) => {
  console.log(currentReferralData, "currentReferralData");
  console.log(referralBackendData, "referralBackendData");
  const [referralDetails, setReferralDetails] = useState(false);
  return (
    <>
      <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
        <div className=" d-flex justify-content-between position-relative">
          <div className=" primary_color fs_18 fw_500 text_underline">
            Stage 1 :
          </div>
          {riderreferral === "riderreferral" ? (
            <>
              {type !== "createRiderReferral" ? (
                <>
                  <div
                    className="position-absolute end-0 mt-1 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                    onClick={() => setReferralDetails(!referralDetails)}
                  >
                    More Details
                  </div>
                  {referralDetails ? (
                    <>
                      <div className="coupon_details_block border white_bg border_radius">
                        <CouponDetails item={referralBackendData} />
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          ) : driverreferral === "driverreferral" ? (
            <>
              {type !== "createDriverReferral" ? (
                <>
                  <div
                    className="position-absolute end-0 mt-1 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                    onClick={() => setReferralDetails(!referralDetails)}
                  >
                    More Details
                  </div>
                  {referralDetails ? (
                    <>
                      <div className="coupon_details_block border white_bg border_radius">
                        <CouponDetails item={currentReferralData} />
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <CouponCheckboxField
          formikError={formik.errors.receiverDraftMessage}
          formikTouched={formik.touched.receiverDraftMessage}
          itemName="receiverDraftMessage"
          onChangeFn={formik.handleChange}
          labelName="Receiver Draft Message"
          formikValue={formik.values.receiverDraftMessage}
          formik={formik}
          labelColor={
            formik.values.receiverDraftMessage === true ? true : false
          }
          disabled={is_editable === false ? true : false}
        />
        <div className="ps-4 pe-3">
          {/* <CouponInputField
            label_font_size="fs_16 mt-1"
            labelName="Draft Message Title*"
            itemName={"draftMessageTitle"}
            inputValue={formik.values.draftMessageTitle}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.draftMessageTitle}
            formikTouched={formik.touched.draftMessageTitle}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik?.values?.receiverDraftMessage === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Draft Message Title*"
            itemName={"draftMessageTitle"}
            formik={formik}
            formikValue={formik.values.draftMessageTitle}
            formikError={formik.errors.draftMessageTitle}
            formikTouched={formik.touched.draftMessageTitle}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.receiverDraftMessage === false
            }
            is_input={true}
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Draft Message Body1*"
            itemName={"draftMessageBody1"}
            inputValue={formik.values.draftMessageBody1}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.draftMessageBody1}
            formikTouched={formik.touched.draftMessageBody1}
            placeholder="Enter Draft Message Body1*"
            input={false}
            TextArea={true}
            inputDisabled={
              is_editable === false ||
              formik?.values?.receiverDraftMessage === false
                ? true
                : false
            }
          /> */}
          <DraftMessageInput
            labelName="Draft Message Body1*"
            itemName={"draftMessageBody1"}
            formik={formik}
            formikValue={formik.values.draftMessageBody1}
            formikError={formik.errors.draftMessageBody1}
            formikTouched={formik.touched.draftMessageBody1}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.receiverDraftMessage === false
            }
          />
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Draft Message Body3 (Google Play Link)*"
            itemName={"draftMessageGooglePlayLinkStage1"}
            inputValue={formik.values.draftMessageGooglePlayLinkStage1}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.draftMessageGooglePlayLinkStage1}
            formikTouched={formik.touched.draftMessageGooglePlayLinkStage1}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik?.values?.receiverDraftMessage === false
                ? true
                : false
            }
          /> */}
          {/* <CouponInputField
            label_font_size="fs_16 mt-2"
            labelName="Draft Message Body4 (App Store Link)*"
            itemName={"draftMessageAppStoreLinkStage1"}
            inputValue={formik.values.draftMessageAppStoreLinkStage1}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.draftMessageAppStoreLinkStage1}
            formikTouched={formik.touched.draftMessageAppStoreLinkStage1}
            placeholder="Enter Draft Message Title*"
            inputDisabled={
              is_editable === false ||
              formik?.values?.receiverDraftMessage === false
                ? true
                : false
            }
          /> */}
        </div>
      </div>
    </>
  );
};

export default ReferralBroadcastStage1;
