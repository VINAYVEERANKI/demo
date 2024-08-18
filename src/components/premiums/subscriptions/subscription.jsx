import React, { useEffect, useState } from "react";
import InnerLayout from "../../layout/innerLayout";
import SubPlanDetails from "./subPlanDetails";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubPlanExpiry from "./subPlanExpiry";
import SubPlanCancel from "./subPlanCancel";
import SubSamePremium from "./subSamePremium";
import SubOtherPremium from "./subOtherPremium";
import { numRegex, wholeNumRegex } from "../../helper";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useDispatch } from "react-redux";
import {
  managePremium4SubscriptionAction,
  managePremium5SubscriptionAction,
  archivedPremium4SubscriptionAction,
  archivedPremium5SubscriptionAction,
} from "../../../redux/actions/premiumaction/defaultPremiumAction";
import SubscriptionPasswordModal from "./subscriptionPassWord";
const Subscription = ({ params, action, managePremiumType, premiumtype }) => {
  console.log(params, "akjsdhkasd");
  console.log(action, "akjsdhkasd");
  console.log(managePremiumType, "akjsdhkasd");
  console.log(premiumtype, "akjsdhkasd");
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [premiumSubactiveTab, setPremiumSubActiveTab] = useState("30DaysPlan");
  const [subscriptData, setSubscriptData] = useState({});
  const [reload, setReload] = useState(false);
  const [planDescNum, setPlanDescNum] = useState(1);

  const [subscriptionPasswordModal, setsubscriptionPasswordModal] =
    useState(false);
  const handleSubscriptionPWClose = () => {
    setsubscriptionPasswordModal(false);
  };
  const handleSubscriptionPWShow = () => setsubscriptionPasswordModal(true);

  const subscriptionSubHead = [
    { label: "30 Days Plan", value: "30DaysPlan" },
    { label: "90 Days Plan", value: "90DaysPlan" },
    { label: "180 days plan", value: "180DaysPlan" },
  ];
  const subscriptionSubHeadFunc = (label) => {
    return premiumSubactiveTab === label ? "buttonactive" : "buttoninactive";
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  useEffect(() => {
    if (managePremiumType === "managePremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          managePremium4SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(
          managePremium5SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      }
    } else if (managePremiumType === "defaultPremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          archivedPremium4SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.id },
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(
          archivedPremium5SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.id },
            onFetchSuccess,
            onFetchError
          )
        );
      }
    } else if (managePremiumType === "archivedPremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          archivedPremium4SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(
          archivedPremium5SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      }
    }
  }, [premiumtype, params?.ride_type_id, premiumSubactiveTab]);

  const onFetchSuccess = (data) => {
    console.log(data, "askjdhaskd");
    setLoading(false);
    if (premiumSubactiveTab === "30DaysPlan") {
      setSubscriptData(data?.data?.Plan30Days);
    } else if (premiumSubactiveTab === "90DaysPlan") {
      setSubscriptData(data?.data?.Plan90Days);
    } else if (premiumSubactiveTab === "180DaysPlan") {
      setSubscriptData(data?.data?.Plan180Days);
    }
    console.log(data?.data, "asdasdasd");
  };
  const onFetchError = (data) => {
    setLoading(false);
    console.log(data, "asdasdasd");
  };

  console.log(premiumSubactiveTab, "askjdhaskd");
  console.log(subscriptData,"formikValuesss");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      planName: subscriptData?.plan_details?.planName ?? "",
      planValue: subscriptData?.plan_details?.planValue ?? "",
      validity:
        subscriptData?.plan_details?.validity ??
        // premiumSubactiveTab === "30DaysPlan"
        //   ? 30
        //   : premiumSubactiveTab === "90DaysPlan"
        //   ? 90
        //   : premiumSubactiveTab === "180DaysPlan"
        //   ? 180
        //   :
        "",
      setupFeeRadio:
        subscriptData?.plan_details?.checkSetup === true ? "Yes" : "No",
      setupFeeAmount: subscriptData?.plan_details?.setupFee ?? "",
      inputFields:
        subscriptData?.plan_details?.planDescription?.length >= 1
          ? subscriptData?.plan_details?.planDescription
          : [""],
      planExpiryFirstRemind:
        subscriptData?.plan_expiry_date_reminder?.firstReminderMessage ?? "",
      planExpirySecondRemind:
        subscriptData?.plan_expiry_date_reminder?.secondReminderMessage ?? "",
      planExpiryThirdRemind:
        subscriptData?.plan_expiry_date_reminder?.thirdReminderCall ?? "",
      subExpiryRadio:
        subscriptData?.plan_expiry_date_reminder?.enableAutoRenewal === true
          ? "Yes"
          : "No",
      driverPAfterCancel:
        subscriptData?.plan_cancellation?.driverPAfterCancel ?? "Premium-3",
      subSamePremiumCheckbox:
        subscriptData?.switch_plan_to_same_premium?.current_plan_active ??
        false,
      subSamePremium:
        subscriptData?.switch_plan_to_same_premium?.upgradeStatus === true
          ? "Yes"
          : "No",
      subSamePremiumAmount:
        subscriptData?.switch_plan_to_same_premium?.upgradeFee ?? null,
      subOtherPremiumCheckbox:
        subscriptData?.switch_plan_to_other_premium?.current_plan_active ??
        false,
      subOtherPremium:
        subscriptData?.switch_plan_to_other_premium?.upgradeStatus === true
          ? "Yes"
          : "No",
      subOtherPremiumAmount:
        subscriptData?.switch_plan_to_other_premium?.upgradeFee ?? null,

      giveRefundIfActivePlanCancel:
        subscriptData?.plan_cancellation?.giveRefundIfActivePlanCancel === true
          ? "Yes"
          : "No",

      ActivePlanCancelAfter1Ride:
        subscriptData?.plan_cancellation?.ActivePlanCancelAfter1Ride ?? "",
      noRideAPCWithin24hrOfStartDate:
        subscriptData?.plan_cancellation?.noRideAPCWithin24hrOfStartDate ?? "",
      noRideAPCBetween24hrTo48hrOfStartDate:
        subscriptData?.plan_cancellation
          ?.noRideAPCBetween24hrTo48hrOfStartDate ?? "",
      noRideAPCBetween48hrTo72hrOfStartDate:
        subscriptData?.plan_cancellation
          ?.noRideAPCBetween48hrTo72hrOfStartDate ?? "",
      giveRefundIfSchedulePlanCancel:
        subscriptData?.plan_cancellation?.giveRefundIfSchedulePlanCancel ===
        true
          ? "Yes"
          : "No",
      planScheduleCancelBeforeStartDate:
        subscriptData?.plan_cancellation?.planScheduleCancelBeforeStartDate ??
        "",
      giveRefundIfAutoRenewalCancel:
        subscriptData?.plan_cancellation?.giveRefundIfAutoRenewalCancel === true
          ? "Yes"
          : "No",
      autoRenewalCancelBeforeStartDate:
        subscriptData?.plan_cancellation?.autoRenewalCancelBeforeStartDate ??
        "",
    },

    validationSchema: Yup.object().shape({
      planName: Yup.string().required("!Required"),
      planValue: Yup.string().required("Required"),
      setupFeeRadio: Yup.string().required("!Required"),
      planExpiryFirstRemind: Yup.string().required("!Required"),
      planExpirySecondRemind: Yup.string().required("!Required"),
      planExpiryThirdRemind: Yup.string().required("!Required"),
      // setupFeeAmount: Yup.string().when("setupFeeRadio", {
      //   is: (value) => value === "Yes",
      //   then: Yup.string()
      //     .matches(numRegex, "Invalid value")
      //     .required("!Required"),
      // }),
      subSamePremium: Yup.string().required("!Required"),
      // subSamePremiumAmount: Yup.string().when("subSamePremium", {
      //   is: (value) => value === "Yes",
      //   then: Yup.string()
      //     .matches(numRegex, "Invalid value")
      //     .required("!Required"),
      //   otherwise: Yup.string().nullable(),
      // }),
      subOtherPremium: Yup.string().required("!Required"),
      // subOtherPremiumAmount: Yup.string().when("subOtherPremium", {
      //   is: (value) => value === "Yes",
      //   then: Yup.string()
      //     .matches(numRegex, "Invalid value")
      //     .required("!Required"),
      //   otherwise: Yup.string().nullable(),
      // }),
      subExpiryRadio: Yup.string().required("!Required"),
      subSamePremiumCheckbox: Yup.boolean(),
      subOtherPremiumCheckbox: Yup.boolean(),
      inputFields: Yup.array().of(Yup.string().required("!Required")),
      giveRefundIfActivePlanCancel: Yup.string().required("!Required"),
      // ActivePlanCancelAfter1Ride: Yup.string().when(
      //   "giveRefundIfActivePlanCancel",
      //   {
      //     is: (value) => value === "Yes",
      //     then: Yup.string()
      //       .matches(wholeNumRegex, "Invalid value")
      //       .required("!Required"),
      //   }
      // ),
      // noRideAPCWithin24hrOfStartDate: Yup.string().when(
      //   "giveRefundIfActivePlanCancel",
      //   {
      //     is: (value) => value === "Yes",
      //     then: Yup.string()
      //       .matches(wholeNumRegex, "Invalid value")
      //       .required("!Required"),
      //   }
      // ),
      // noRideAPCBetween24hrTo48hrOfStartDate: Yup.string().when(
      //   "giveRefundIfActivePlanCancel",
      //   {
      //     is: (value) => value === "Yes",
      //     then: Yup.string()
      //       .matches(wholeNumRegex, "Invalid value")
      //       .required("!Required"),
      //   }
      // ),
      // noRideAPCBetween48hrTo72hrOfStartDate: Yup.string().when(
      //   "giveRefundIfActivePlanCancel",
      //   {
      //     is: (value) => value === "Yes",
      //     then: Yup.string()
      //       .matches(wholeNumRegex, "Invalid value")
      //       .required("!Required"),
      //   }
      // ),
      // giveRefundIfSchedulePlanCancel: Yup.string().required("!Required"),
      // planScheduleCancelBeforeStartDate: Yup.string().when(
      //   "giveRefundIfSchedulePlanCancel",
      //   {
      //     is: (value) => value === "Yes",
      //     then: Yup.string()
      //       .matches(wholeNumRegex, "Invalid value")
      //       .required("!Required"),
      //   }
      // ),
      // giveRefundIfAutoRenewalCancel: Yup.string().required("!Required"),
      // autoRenewalCancelBeforeStartDate: Yup.string().when(
      //   "giveRefundIfAutoRenewalCancel",
      //   {
      //     is: (value) => value === "Yes",
      //     then: Yup.string()
      //       .matches(wholeNumRegex, "Invalid value")
      //       .required("!Required"),
      //   }
      // ),
    }),
    onSubmit: (values) => {
      console.log(values, "formikvaluessasasasasas");
      handleSubscriptionPWShow();
    },
  });
  console.log(formik.errors, "formikerrors");
  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  const handleAddField = () => {
    const lastInputValue =
      formik.values.inputFields[formik.values.inputFields.length - 1];
    if (lastInputValue.trim() !== "") {
      formik.setFieldValue("inputFields", [...formik.values.inputFields, ""]);
    }
  };

  const handleDeleteField = (index) => {
    const updatedFields = [...formik.values.inputFields];
    updatedFields.splice(index, 1);
    formik.setFieldValue("inputFields", updatedFields);
  };

  const [Disable, setDisable] = useState(null);

  useEffect(() => {
    let hasChanged = false;
    for (const key in formik.values) {
      if (
        formik.values.hasOwnProperty(key) &&
        formik.initialValues.hasOwnProperty(key)
      ) {
        if (formik.values[key] != formik.initialValues[key]) {
          hasChanged = true;
          break;
        }
      }
    }
    setDisable(!hasChanged);
  }, [formik.values]);

  console.log(formik.values, "dsknakdada");

  return (
    <>
      <SubscriptionPasswordModal
        subscriptionPasswordModal={subscriptionPasswordModal}
        handleSubscriptionPWClose={handleSubscriptionPWClose}
        title={"Are you sure you want make changes ?"}
        reload={reload}
        setReload={setReload}
        formik={formik}
        params={params}
        plan_type={subscriptData?.plan_type}
        premiumtype={premiumtype}
        setIsEditing={setIsEditing}
      />
      <InnerLayout
        mainHeading=""
        navigateEnable={false}
        layoutClassname="inner_layout_container"
      >
        <div className="premium_sub_layout">
          <div className="sub_border_bottom">
            {subscriptionSubHead.map((item) => {
              return (
                <>
                  <label
                    key={item.label}
                    className={`px-4  mt-3 pb-1  fs_16 ${subscriptionSubHeadFunc(
                      item.value
                    )}`}
                    onClick={() => setPremiumSubActiveTab(item.value)}
                  >
                    {" "}
                    {item.label}
                  </label>
                </>
              );
            })}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-end my-1">
              {action === "view" ? null : (
                <>
                  <div>
                    {!isEditing ? (
                      <>
                        <button
                          className="border-0 primary_bg white_color px-3 fs_15 border_radius_5px mt-1 p-1"
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                      </>
                    ) : null}
                  </div>
                </>
              )}
            </div>
            <div className="ps-4 sub_border_bottom ">
              <SubPlanDetails
                isEditing={isEditing}
                formik={formik}
                premiumSubactiveTab={premiumSubactiveTab}
                params={params}
                planDescNum={planDescNum}
                setPlanDescNum={setPlanDescNum}
                handleAddField={handleAddField}
                handleDeleteField={handleDeleteField}
              />
            </div>
            <div className="ps-4 mt-3 sub_border_bottom">
              <SubPlanExpiry
                isEditing={isEditing}
                formik={formik}
                params={params}
              />
            </div>
            <div className="ps-4 mt-3 sub_border_bottom">
              <SubPlanCancel
                isEditing={isEditing}
                formik={formik}
                params={params}
              />
            </div>
            <div className="ps-4 mt-3 sub_border_bottom">
              <SubSamePremium
                isEditing={isEditing}
                formik={formik}
                params={params}
              />
            </div>
            <div className="ps-4 mt-3">
              <SubOtherPremium
                isEditing={isEditing}
                formik={formik}
                params={params}
              />
            </div>
          </form>
        </div>
        {/* <div className="col-8 d-flex justify-content-center mb-3">
          {firstErrorField && (
            <div className="red_color fs_13 fw_400 ">
              {formik.errors[firstErrorField]}
            </div>
          )}
        </div> */}
        {isEditing ? (
          <>
            <div className="d-flex justify-content-end gap-3">
              <Cancelbtn
                cancelFn={() => {
                  handleCancel();
                }}
              />
              <button
                className="white_bg border_radius_5px px-2 undo_change_btn fw_600 mb-2 mb-sm-0"
                type="reset"
                onClick={() => {
                  formik.resetForm();
                }}
              >
                <span className="d-flex align-items-center red_color px-4 fs_14">
                  <i className="ri-close-circle-fill red_color pe-1"></i>
                  Reset
                </span>
              </button>
              <button
                className="border_none green_color_bg white_color px-5  py-2 border_radius_5px fw_600 fs_14 mb-2 mb-sm-0"
                type="submit"
                onClick={formik.handleSubmit}
                disabled={Disable}
              >
                Update
              </button>
            </div>
          </>
        ) : null}
      </InnerLayout>
    </>
  );
};

export default Subscription;
