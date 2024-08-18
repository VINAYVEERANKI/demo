import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InnerLayout from "../../layout/innerLayout";
import moment from "moment";
import { useNavigate } from "react-router";
import LeavePagemodal from "../../modals/leaveModal";
import CouponInputField from "../../form/couponInputField";
import BookingTypeInput from "../../rider-coupons/utilities/bookingType";
import RideTypeInput from "../../rider-coupons/utilities/rideType-input";
import CouponSelectField from "../../form/CouponSelectField";
import CampaignDetailsInput from "../../rider-coupons/utilities/campaign-details-input";
import EditReferralBtn from "../../rider-referrals/utilities/edit-referral-btn";
import CreateBroadcastBtn from "../../rider-referrals/utilities/create-broadcast-btn";
import ReferralPasswordModal from "../passwordModal";
import {
  insertSpaceUnderScore,
  insertSpaces,
  intNumRegex,
  isEmptyObject,
  removeUnderScore,
  removeUnderScoreInArray,
  useExpiryDate,
} from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearReducerDriverReferralAction,
  createDriverToDriverRefAction,
  createDriverToRiderRefAction,
} from "../../../redux/actions/referrals/createreferralAction";
import successToast from "../../utilits/successToast";
import {
  reviewReqDriverRefDToDEditAction,
  reviewReqDriverRefDToREditAction,
  reviewReqDriverRefFindOneAction,
} from "../../../redux/actions/referrals/reviewRequiredAction";
import errorToast from "../../utilits/errorToast";
import ReferralSideBar from "../referralSideBar";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import SuccessMessagemodal from "../../modals/successMessageModal";
import {
  activeDriverRefEditAction,
  activeDriverRefFindOneAction,
} from "../../../redux/actions/referrals/approveReferralAction";
import { expiredDriverRefIdAction } from "../../../redux/actions/referrals/expiredReferralAction";
import { deletedDriverRefAction } from "../../../redux/actions/referrals/deleteReferralAction";
import { rejectedDriverRefAction } from "../../../redux/actions/referrals/rejectReferralAction";
import { clearDriverReferralAction } from "../../../redux/actions/referrals/clearReferralAction";
import ErrorMessagemodal from "../../modals/errorMessageModal";
import CouponDetails from "../../coupons/riderCoupons/coupondetails";
import { referralRideTypeListAction } from "../../../redux/actions/referrals/dropdownListAction";

const DriverReferralDetails = ({ params, location, type }) => {
  console.log(type, "type");
  const referralData = location?.state;
  console.log(referralData);

  const [referralDetails, setReferralDetails] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = location?.state?.referral_status;
  const is_editable = location?.state?.edit;
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const driverReferralCreatedData = useSelector(
    (store) => store.createDriverReferralReducer
  );

  const createdData = driverReferralCreatedData?.data?.data;
  console.log(createdData);

  const caneclBtn = () => {
    navigate("/driver-referral");
  };

  const [reloadtable, setReloadtable] = useState(false);
  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);
  const [currentReferralData, setCurrentReferralData] = useState({});
  const [changeUpdatePasswordshow, setReferralApproveShow] = useState(false);
  const handleChangeUpdatePasswordClose = () => setReferralApproveShow(false);
  const handlChangesUpdateShow = () => setReferralApproveShow(true);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReloadtable(!reloadtable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [statusBtn, setStatusBtn] = useState("");

  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);
  const [validationErrorMes, setvalidationErrorMes] = useState("");

  useEffect(() => {
    if (type === "createDriverReferral") {
      if (location?.pathname === "/driver-referral/create") {
        dispatch(
          clearDriverReferralAction(
            {
              referral_id: createdData?.id,
            },
            onClearSuccess,
            onClearError
          )
        );
      }
    }
  }, [referralData?.id]);

  const onClearSuccess = (data) => {
    console.log(data);
  };
  const onClearError = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      setFetchLoading(true);
      dispatch(
        reviewReqDriverRefFindOneAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Active") {
      setFetchLoading(true);
      dispatch(
        activeDriverRefFindOneAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Rejected") {
      setFetchLoading(true);
      dispatch(
        rejectedDriverRefAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Deleted") {
      setFetchLoading(true);
      dispatch(
        deletedDriverRefAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Expired") {
      setFetchLoading(true);
      dispatch(
        expiredDriverRefIdAction(
          {
            referral_id: params,
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [status, reloadtable]);

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    setCurrentReferralData(data?.data);
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    errorToast(data?.data?.data);
  };

  const [selectedRideType, setSelectedRideType] = useState([]);
  const [selectedRideTypeLabel, setselectedRideTypeLabel] = useState([]);
  useEffect(() => {
    if (isEmptyObject(currentReferralData) === false) {
      setSelectedRideType(currentReferralData?.ride_type_id);
      setselectedRideTypeLabel(currentReferralData?.ride_type);
    } else if (createdData) {
      setSelectedRideType(createdData?.ride_type_id);
      setselectedRideTypeLabel(createdData?.ride_type);
    }
  }, [
    currentReferralData?.ride_type_id,
    currentReferralData?.ride_type,
    createdData,
  ]);

  console.log(isEmptyObject(currentReferralData), "sdfsdfff");

  const [rideTypeOptions, setRideTypeOptions] = useState([]);
  const [rideTypeList, setRideTypeList] = useState([]);
  useEffect(() => {
    dispatch(
      referralRideTypeListAction(onRideTypeSuccess, onRideTypeError)
    );
  }, []);

  const onRideTypeSuccess = (data) => {
    setRideTypeList(data?.data);
  };

  const onRideTypeError = (data) => {
    console.log(data);
  };
  useEffect(() => {
    if (rideTypeList) {
      const rideTypeOptions = Object.values(rideTypeList)?.map((item) => {
        return { value: item.id, label: item.ride_type };
      });
      setRideTypeOptions(rideTypeOptions);
    }
  }, [rideTypeList]);

  console.log(rideTypeOptions, "sdfdsfs");

  const handleReset = () => {
    setSelectedRideType(
      currentReferralData?.ride_type_id ?? createdData?.ride_type_id
    );
    setselectedRideTypeLabel(
      currentReferralData?.ride_type ?? createdData?.ride_type
    );
  };

  // validation
  const senderCurrent_B_D_req =
    referralData?.senderCoupon === "CurrentBalanceDeposit"
      ? Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed")
      : Yup.string();

  const discountRequired =
    referralData?.recieverCoupon === "X%DiscountUpToY" ||
      currentReferralData?.receiver_coupon_type === "X%DiscountUpToY"
      ? Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed")
      : Yup.string();
  const cashbackRequired =
    referralData.recieverCoupon === "X%CashbackUpToY" ||
      currentReferralData.receiver_coupon_type === "X%CashbackUpToY"
      ? Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed")
      : Yup.string();
  const amountRequired =
    referralData.recieverCoupon === "XAmountOff" ||
      currentReferralData.receiver_coupon_type === "XAmountOff"
      ? Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed")
      : Yup.string();

  const required =
    (referralData?.recieverCoupon
      ? referralData?.recieverCoupon !== "CurrentBalanceDeposit"
      : null) ||
      (currentReferralData?.receiver_coupon_type
        ? currentReferralData?.receiver_coupon_type !== "CurrentBalanceDeposit"
        : null)
      ? Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed")
      : Yup.string();

  const couponRequired =
    (referralData.recieverCoupon
      ? referralData.recieverCoupon !== "CurrentBalanceDeposit"
      : null) ||
      (currentReferralData.receiver_coupon_type
        ? currentReferralData.receiver_coupon_type !== "CurrentBalanceDeposit"
        : null)
      ? Yup.string().required("Please fill this field to proceed")
      : Yup.string();

  const bookingTyperequired =
    (referralData.recieverCoupon
      ? referralData.recieverCoupon !== "CurrentBalanceDeposit"
      : null) ||
      (currentReferralData.receiver_coupon_type
        ? currentReferralData.receiver_coupon_type !== "CurrentBalanceDeposit"
        : null)
      ? Yup.object().shape({
        one_way_outstation: Yup.boolean(),
        round_trip_outstation: Yup.boolean(),
        local: Yup.boolean(),
        rental: Yup.boolean(),
        altleastOneBookingType: Yup.boolean().when(
          ["one_way_outstation", "round_trip_outstation", "local", "rental"],
          {
            is: (one_way_outstation, round_trip_outstation, local, rental) =>
              !one_way_outstation &&
              !round_trip_outstation &&
              !local &&
              !rental,
            then: Yup.boolean().required("Atleast one is required"),
            otherwise: Yup.boolean(),
          }
        ),
      })
      : "";

  const rideTypeRequired =
    (referralData.recieverCoupon
      ? referralData.recieverCoupon !== "CurrentBalanceDeposit"
      : null) ||
      (currentReferralData.receiver_coupon_type
        ? currentReferralData.receiver_coupon_type !== "CurrentBalanceDeposit"
        : null)
      ? Yup.array()
        .min(1, "Please select at least one option")
        .required("Please fill all the required fields*")
      : "";

  const receiverRequired =
    referralData.recieverCoupon === "CurrentBalanceDeposit" ||
      currentReferralData.receiver_coupon_type === "CurrentBalanceDeposit"
      ? Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed")
      : Yup.string();

  console.log(createdData);

  // validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sender_c_b_deposit:
        currentReferralData?.sender_cb_deposite_amount ??
        createdData?.sender_cb_deposite_amount ??
        "",
      receiver_c_b_deposit:
        currentReferralData?.receiver_cb_deposite_amount ??
        createdData?.receiver_cb_deposite_amount ??
        "",
      driver_rating: 5,

      required_rides_completed_by_receiver:
        currentReferralData?.required_rides_completed_by_receiver ??
        createdData?.required_rides_completed_by_receiver ??
        "",
      receiver_required_rides:
        currentReferralData?.receiver_required_rides ??
        createdData?.receiver_required_rides ??
        "",
      coupounCode:
        currentReferralData?.coupon_code ?? createdData?.coupon_code ?? "",
      couponTitle:
        currentReferralData?.coupon_title ?? createdData?.coupon_title ?? "",
      couponDescription:
        currentReferralData?.coupon_description ??
        createdData?.coupon_description ??
        "",
      accountsApplicableLimit:
        currentReferralData?.account_applicable_limit ??
        createdData?.account_applicable_limit ??
        "",
      usageLimitPerAccount:
        currentReferralData?.usage_limit_per_account ??
        createdData?.usage_limit_per_account ??
        "",
      discount: currentReferralData?.discount ?? createdData?.discount ?? "",
      maxAmountInRs:
        currentReferralData?.max_amount_in_rs ??
        createdData?.max_amount_in_rs ??
        "",
      startDate: currentReferralData?.start_date
        ? moment(currentReferralData?.start_date).format("YYYY-MM-DD")
        : createdData?.start_date
          ? moment(createdData?.start_date).format("YYYY-MM-DD")
          : "",
      startTime:
        currentReferralData?.start_time ?? createdData?.start_time ?? "",
      expiryDate: currentReferralData?.expiry_date
        ? moment(currentReferralData?.expiry_date).format("YYYY-MM-DD")
        : createdData?.expiry_date
          ? moment(createdData?.expiry_date).format("YYYY-MM-DD")
          : "",
      expiryTime:
        currentReferralData?.expiry_time ?? createdData?.expiry_time ?? "",
      campaignStatus:
        currentReferralData?.campaign_status ??
        createdData?.campaign_status ??
        "",
      bookingType: {
        one_way_outstation:
          currentReferralData?.booking_type?.one_way_outstation ??
          createdData?.booking_type?.one_way_outstation ??
          false,
        round_trip_outstation:
          currentReferralData?.booking_type?.round_trip_outstation ??
          createdData?.booking_type?.round_trip_outstation ??
          false,
        local:
          currentReferralData?.booking_type?.local ??
          createdData?.booking_type?.local ??
          false,
        rental:
          currentReferralData?.booking_type?.rental ??
          createdData?.booking_type?.rental ??
          false,
        altleastOneBookingType: "",
      },
      // rideType: {
      //   Bike:
      //     currentReferralData?.ride_type?.Bike ??
      //     createdData?.ride_type?.Bike ??
      //     false,
      //   Auto:
      //     currentReferralData?.ride_type?.Auto ??
      //     createdData?.ride_type?.Auto ??
      //     false,
      //   Mini:
      //     currentReferralData?.ride_type?.Mini ??
      //     createdData?.ride_type?.Mini ??
      //     false,
      //   Sedan:
      //     currentReferralData?.ride_type?.Sedan ??
      //     createdData?.ride_type?.Sedan ??
      //     false,
      //   Suv:
      //     currentReferralData?.ride_type?.Suv ??
      //     createdData?.ride_type?.Suv ??
      //     false,
      //   PremiumSedan:
      //     currentReferralData?.ride_type?.PremiumSedan ??
      //     createdData?.ride_type?.PremiumSedan ??
      //     false,
      //   Luxury:
      //     currentReferralData?.ride_type?.Luxury ??
      //     createdData?.ride_type?.Luxury ??
      //     false,
      //   KaaliPeeli:
      //     currentReferralData?.ride_type?.KaaliPeeli ??
      //     createdData?.ride_type?.KaaliPeeli ??
      //     false,
      //   altleastOne: "",
      // },
      rideType: currentReferralData?.ride_type ?? createdData?.ride_type ?? [],
      rideTypeId:
        currentReferralData?.ride_type_id ?? createdData?.ride_type_id ?? [],
      amountOff: currentReferralData?.amountoff ?? createdData?.amountoff ?? "",
      cashback: currentReferralData?.cashback ?? createdData?.cashback ?? "",
      maxCashbackInRs:
        currentReferralData?.max_cashback_in_rs ??
        createdData?.max_cashback_in_rs ??
        "",
      couponLifeSpan:
        currentReferralData?.coupon_life_span ??
        createdData?.coupon_life_span ??
        "",
    },

    validationSchema: Yup.object().shape({
      sender_c_b_deposit: senderCurrent_B_D_req,
      receiver_c_b_deposit: receiverRequired,
      receiver_required_rides: receiverRequired,
      required_rides_completed_by_receiver: senderCurrent_B_D_req,
      coupounCode: couponRequired,
      couponTitle: couponRequired,
      couponDescription: couponRequired,
      accountsApplicableLimit: Yup.string(),
      usageLimitPerAccount: required,
      discount: discountRequired,
      maxAmountInRs: discountRequired,
      cashback: cashbackRequired,
      maxCashbackInRs: cashbackRequired,
      couponLifeSpan: required,
      amountOff: amountRequired,
      startDate: Yup.string().required("Please Complete All The Above Fields"),
      startTime: Yup.string().required("Please Complete All The Above Fields"),
      expiryDate: Yup.string().required("Please Complete All The Above Fields"),
      // expiryTime: Yup.string().required("Please Complete All The Above Fields"),
      expiryTime: Yup.string()
        .when(["startDate", "expiryDate"], (startDate, expiryDate, schema) => {
          if (startDate && expiryDate && startDate === expiryDate) {
            return schema.test({
              name: "greaterThanStartTime",
              message: "Expiry time should be greater than start time",
              test: function (value) {
                const startTime = this.resolve(Yup.ref("startTime"));
                return value > startTime;
              },
            });
          }
          return schema;
        })
        .required("Please Complete All The Above Fields"),

      bookingType: bookingTyperequired,

      rideType: rideTypeRequired,
      rideTypeId: rideTypeRequired,
    }),

    onSubmit: (values, { resetForm }) => {
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        if (
          currentReferralData?.referral_classification ===
          "DriverToDriverReferral"
        ) {
          dispatch(
            reviewReqDriverRefDToDEditAction(
              {
                referral_id: params,
                sender_cb_deposite_amount: values?.sender_c_b_deposit,
                required_rides_completed_by_receiver:
                  values?.required_rides_completed_by_receiver,
                driver_rating: 5,
                receiver_cb_deposite_amount: values?.receiver_c_b_deposit,
                receiver_required_rides: values?.receiver_required_rides,
                start_date: values?.startDate,
                start_time: values?.startTime,
                expiry_date: values?.expiryDate,
                expiry_time: values?.expiryTime,
              },
              onSubmitSuccess,
              onSubmitError
            )
          );
        } else {
          dispatch(
            reviewReqDriverRefDToREditAction(
              {
                referral_id: params,
                driver_rating: "5",
                sender_cb_deposite_amount: values?.sender_c_b_deposit,
                required_rides_completed_by_receiver:
                  values?.required_rides_completed_by_receiver,
                coupon_code: values?.coupounCode?.toUpperCase(),
                coupon_title: values?.couponTitle,
                coupon_description: values?.couponDescription,
                usage_limit_per_account: values?.usageLimitPerAccount,
                coupon_life_span: values?.couponLifeSpan,
                discount: values?.discount,
                amountoff: values?.amountOff,
                max_amount_in_rs: values?.maxAmountInRs,
                cashback: values?.cashback,
                max_cashback_in_rs: values?.maxCashbackInRs,
                booking_type: values?.bookingType,
                ride_type: values?.rideType,
                ride_type_id: values?.rideTypeId,
                start_date: values?.startDate,
                start_time: values?.startTime,
                expiry_date: values?.expiryDate,
                expiry_time: values?.expiryTime,
              },
              onSubmitSuccess,
              onSubmitError
            )
          );
        }
      } else if (status === "Active") {
        dispatch(
          activeDriverRefEditAction(
            {
              referral_id: params,
              expiry_date: values?.expiryDate,
              expiry_time: values?.expiryTime,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else {
        if (referralData?.referralClassification === "DriverToDriverReferral") {
          dispatch(
            createDriverToDriverRefAction(
              {
                user_type: "Driver",
                referral_classification: referralData?.referralClassification,
                sender_coupon_type: referralData?.senderCoupon,
                receiver_coupon_type: referralData?.recieverCoupon,
                driver_rating: 5,
                sender_cb_deposite_amount: values?.sender_c_b_deposit,
                required_rides_completed_by_receiver:
                  values?.required_rides_completed_by_receiver,
                receiver_cb_deposite_amount: values?.receiver_c_b_deposit,
                receiver_required_rides: values?.receiver_required_rides,
                start_date: values?.startDate,
                start_time: values?.startTime,
                expiry_date: values?.expiryDate,
                expiry_time: values?.expiryTime,
              },
              onSubmitSuccess,
              onSubmitError
            )
          );
          // dispatch(clearReducerDriverReferralAction());
        } else {
          dispatch(
            createDriverToRiderRefAction(
              {
                user_type: "Driver",
                referral_classification: referralData?.referralClassification,
                sender_coupon_type: referralData?.senderCoupon,
                receiver_coupon_type: referralData?.recieverCoupon,
                driver_rating: 5,
                sender_cb_deposite_amount: values?.sender_c_b_deposit,
                required_rides_completed_by_receiver:
                  values?.required_rides_completed_by_receiver,
                coupon_code: values?.coupounCode.toUpperCase(),
                coupon_title: values?.couponTitle,
                coupon_description: values?.couponDescription,
                usage_limit_per_account: values?.usageLimitPerAccount,
                coupon_life_span: values?.couponLifeSpan,
                discount: values?.discount,
                amountoff: values?.amountOff,
                max_amount_in_rs: values?.maxAmountInRs,
                cashback: values?.cashback,
                max_cashback_in_rs: values?.maxCashbackInRs,
                booking_type: values?.bookingType,
                ride_type: values?.rideType,
                ride_type_id: values?.rideTypeId,
                start_date: values?.startDate,
                start_time: values?.startTime,
                expiry_date: values?.expiryDate,
                expiry_time: values?.expiryTime,
              },
              onSubmitSuccess,
              onSubmitError
            )
          );
        }
      }
    },
  });

  const onSubmitSuccess = (data) => {
    setLoading(false);
    // dispatch(clearReducerDriverReferralAction());
    if (statusBtn === "CreateReferral") {
      navigate("/driver-referral/broadcast/create", {
        state: { data: data?.data, referralData },
      });
    }

    if (
      JSON.stringify(formik?.initialValues) !== JSON.stringify(formik?.values)
    ) {
      successToast(data?.message ?? data?.data);
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        if (statusBtn === "SaveLater") {
          handleSuccessMessageShow();
        }
      } else {
      }
    }

    const Data = {
      edit: is_editable,
      coupon_id: currentReferralData?.coupon_code,
      status: status,
    };
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      if (statusBtn === "Save&ViewBroadCast") {
        navigate(`/driver-referral/review-required/broadcast/edit/${params}`, {
          state: Data,
        });
      }
    } else if (status === "Active") {
      if (statusBtn === "Save&ViewBroadCast") {
        navigate(`/driver-referral/active/broadcast/edit/${params}`, {
          state: Data,
        });
      }
    }
  };

  const onSubmitError = (data) => {
    console.log(data);
    errorToast(data?.data?.data);
    setvalidationErrorMes(insertSpaceUnderScore(data?.data?.data));
    handleErrorMessageShow();
  };

  // const currentDate = new Date();
  // const startDate = new Date(
  //   currentReferralData?.start_date
  //     ? moment(currentReferralData?.start_date).format("YYYY-MM-DD")
  //     : createdData?.start_date
  //     ? moment(createdData?.start_date).format("YYYY-MM-DD")
  //     : ""
  // );

  // useEffect(() => {
  //   if (startDate.getTime() >= currentDate.getTime()) {
  //     errorToast("Start Date Should be Greater then The Current Date");
  //   }
  // }, [currentDate, startDate]);

  const viewFn = () => {
    const data = {
      edit: false,
      // coupon_id: currentReferralData?.coupon_code,
      status: status,
    };
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      navigate(`/driver-referral/review-required/broadcast/view/${params}`, {
        state: data,
      });
    }
    if (status === "Active") {
      navigate(`/driver-referral/active/broadcast/view/${params}`, {
        state: data,
      });
    }
    if (status === "Rejected") {
      navigate(`/driver-referral/rejected/broadcast/view/${params}`, {
        state: data,
      });
    }
    if (status === "Deleted") {
      navigate(`/driver-referral/deleted/broadcast/view/${params}`, {
        state: data,
      });
    }
    if (status === "Expired") {
      navigate(`/driver-referral/expired/broadcast/view/${params}`, {
        state: data,
      });
    }
  };

  const usageLimitPerAccount = Array.from({ length: 4 }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

  const [bookingTypeApplicableValue, setBookingTypeApplicableValue] = useState(
    []
  );
  const [dropDowBookingType, setDropDownBookingType] = useState(false);
  const [dropDownBookingOpen, setDropDownBookingOpen] = useState(false);

  const [rideTypeApplicableValue, setRideTypeApplicableValue] = useState([]);
  const [dropDowRideType, setDropDownRideType] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const [resetRidetype, setResetRidetype] = useState(false);
  const [resetBookingType, setResetBookingType] = useState(false);

  useEffect(() => {
    const setData = (data, type) => {
      if (data?.[type] !== undefined && data?.[type] !== null) {
        const listName = Object?.keys(data?.[type]).filter(
          (key) => data?.[type][key]
        );
        if (type === "ride_type") {
          setRideTypeApplicableValue(listName);
        } else if (type === "booking_type") {
          setBookingTypeApplicableValue(listName);
        }
      }
    };
    setData(currentReferralData, "ride_type");
    setData(currentReferralData, "booking_type");
    setData(createdData, "ride_type");
    setData(createdData, "booking_type");
  }, [currentReferralData, resetRidetype, resetBookingType]);

  const leavePageFn = () => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };

  const sideBarData = [
    {
      label: "Referral ID",
      value: currentReferralData?.referral_code ?? "--",
      display: true,
    },
    {
      label: "User Type",
      value:
        referralData?.userType || currentReferralData?.user_type
          ? removeUnderScore(
            referralData?.userType || currentReferralData?.user_type
          )
          : "--",
      display: true,
    },
    {
      label: "Referral Classification",
      value:
        referralData?.referralClassification ||
          currentReferralData?.referral_classification
          ? insertSpaces(
            referralData?.referralClassification ||
            currentReferralData?.referral_classification
          )
          : "--",
      display: true,
    },
    {
      label: "Sender Coupon Type",
      value:
        referralData?.senderCoupon || currentReferralData?.sender_coupon_type
          ? insertSpaces(
            referralData?.senderCoupon ||
            currentReferralData?.sender_coupon_type
          )
          : "--",
      display: true,
    },
    {
      label: "Receiver Coupon Type",
      value:
        referralData?.recieverCoupon ||
          currentReferralData?.receiver_coupon_type
          ? insertSpaces(
            referralData?.recieverCoupon ||
            currentReferralData?.receiver_coupon_type
          )
          : "--",
      display: true,
    },
  ];

  console.log(formik.values);

  console.log(type);

  const expiryDate = useExpiryDate(
    currentReferralData?.coupon_life_span,
    currentReferralData?.expiry_date,
    currentReferralData?.expiry_time
  );

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  return (
    <>
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title={validationErrorMes}
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
      />
      <ReferralPasswordModal
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        referralBackendData={currentReferralData}
        statusBtn={statusBtn}
        title={
          statusBtn === "Delete"
            ? "Are you sure you want to Delete this referral?"
            : "Are yoy sure you want to make changes ?"
        }
        type="driverReferrals"
      />
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made successfully!`}
      />
      <InnerLayout
        mainHeading={`Create New Referral`}
        navigateEnable={false}
        naviagteLeave={true}
        navigateFn={leavePageFn}
        expiryDateShow={true}
        expiryDate={
          fetchLoading
            ? ``
            : type === "createDriverReferral"
              ? ``
              : `Referral Coupon Code Exp : ${expiryDate}`
        }
      >
        {fetchLoading ? (
          <LoadingSpinnerTable />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="row gx-0">
              <div className="col-lg-3">
                <ReferralSideBar data={sideBarData} />
              </div>
              <div className="col-lg-9">
                <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
                  {type != "createDriverReferral" ? (
                    <>
                      <div
                        className="position-absolute top-0 end-0 mt-3 me-5 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                        onClick={() =>
                          setReferralDetails(!referralDetails)
                        }
                      >
                        More Details
                      </div>
                    </>
                  ) : null}
                  {referralDetails ? (
                    <>
                      <div className="coupon_details_block border white_bg border_radius">
                        <CouponDetails item={currentReferralData} />
                      </div>
                    </>
                  ) : null}
                  {referralData?.senderCoupon === "CurrentBalanceDeposit" ||
                    currentReferralData?.sender_coupon_type ===
                    "CurrentBalanceDeposit" ? (
                    <>
                      <div className=" d-flex justify-content-between position-relative">
                        <div className=" primary_color fs_18 fw_500 text_underline">
                          {" "}
                          Sender Current Balance Deposit Details
                        </div>
                        {/* {type != "createDriverReferral" ? (
                          <>
                            <div
                              className="position-absolute top-0 end-0 mt-2 me-3 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                              onClick={() =>
                                setReferralDetails(!referralDetails)
                              }
                            >
                              More Details
                            </div>
                          </>
                        ) : null}
                        {referralDetails ? (
                          <>
                            <div className="coupon_details_block border white_bg border_radius">
                              <CouponDetails item={currentReferralData} />
                            </div>
                          </>
                        ) : null} */}



                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
                          <span className="fs_16 primary_color">
                            Current Balance Deposit Amount (₹)*
                          </span>
                        </div>
                        <div className="col-sm-4 col-12">
                          <CouponInputField
                            label={false}
                            itemName={"sender_c_b_deposit"}
                            inputValue={formik.values.sender_c_b_deposit}
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={formik.errors.sender_c_b_deposit}
                            formikTouched={formik.touched.sender_c_b_deposit}
                            placeholder=""
                            inputDisabled={
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
                          <span className="fs_16 primary_color">
                            Required Rides(Completed By Receiver)*
                          </span>
                        </div>
                        <div className="col-sm-4 col-12">
                          <CouponInputField
                            label={false}
                            itemName={"required_rides_completed_by_receiver"}
                            inputValue={
                              formik.values.required_rides_completed_by_receiver
                            }
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={
                              formik.errors.required_rides_completed_by_receiver
                            }
                            formikTouched={
                              formik.touched
                                .required_rides_completed_by_receiver
                            }
                            placeholder=""
                            inputDisabled={
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className=" primary_color fs_18 fw_500 text_underline">
                        Sender Driver Rating Details
                      </p>
                      <div className="row">
                        <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
                          <span className="fs_16 primary_color">
                            Driver Rating (1 Count)
                          </span>
                        </div>
                        <div className="col-sm-4 col-12">
                          <CouponInputField
                            label={false}
                            itemName={"driver_rating"}
                            inputValue={formik.values.driver_rating}
                            placeholder=""
                            inputDisabled={true}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
                  {referralData?.recieverCoupon === "CurrentBalanceDeposit" ||
                    currentReferralData?.receiver_coupon_type ===
                    "CurrentBalanceDeposit" ? (
                    <>
                      {" "}
                      <p className=" primary_color fs_18 fw_500 text_underline">
                        Receiver Current Balance Deposit Details
                      </p>
                      <div className="row">
                        <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
                          <span className="fs_16 primary_color">
                            Current Balance Deposit Amount (₹)*
                          </span>
                        </div>
                        <div className="col-sm-4 col-12">
                          <CouponInputField
                            label={false}
                            itemName={"receiver_c_b_deposit"}
                            inputValue={formik.values.receiver_c_b_deposit}
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={formik.errors.receiver_c_b_deposit}
                            formikTouched={formik.touched.receiver_c_b_deposit}
                            placeholder=""
                            inputDisabled={
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
                          <span className="fs_16 primary_color">
                            Required Rides*
                          </span>
                        </div>
                        <div className="col-sm-4 col-12">
                          <CouponInputField
                            label={false}
                            itemName={"receiver_required_rides"}
                            inputValue={formik.values.receiver_required_rides}
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={formik.errors.receiver_required_rides}
                            formikTouched={
                              formik.touched.receiver_required_rides
                            }
                            placeholder=""
                            inputDisabled={
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p className=" primary_color fs_18 fw_500 text_underline">
                        Receiver Coupon Type
                      </p>
                      <span className=" primary_color fs_18 fw_500">
                        Discount Details
                      </span>
                      <div className="row mt-2 ">
                        <div className="col-sm-6 ">
                          <CouponInputField
                            inputClassName="text-uppercase"
                            labelName="Coupon Code*"
                            itemName={"coupounCode"}
                            inputValue={formik.values.coupounCode}
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={formik.errors.coupounCode}
                            formikTouched={formik.touched.coupounCode}
                            placeholder="Enter coupon code"
                            inputDisabled={
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                        </div>
                        <div className="col-sm-6">
                          <CouponInputField
                            labelName="Coupon Title* (for admins reference)"
                            itemName={"couponTitle"}
                            inputValue={formik.values.couponTitle}
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={formik.errors.couponTitle}
                            formikTouched={formik.touched.couponTitle}
                            placeholder="Enter coupon title"
                            inputDisabled={
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                        </div>
                        <div className="mt-2">
                          <CouponInputField
                            labelName="Coupon Description* (For Admins Reference)"
                            itemName={"couponDescription"}
                            inputValue={formik.values.couponDescription}
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={formik.errors.couponDescription}
                            formikTouched={formik.touched.couponDescription}
                            placeholder="Enter coupon description"
                            TextArea={true}
                            input={false}
                            inputDisabled={
                              is_editable === false ||
                              status === "Active" ||
                              status === "ReviewPendingUpdated"
                            }
                          />
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="row">
                              <div className="col-6">
                                <CouponInputField
                                  labelName="Accounts Applicable Limit*"
                                  itemName={"accountsApplicableLimit"}
                                  inputValue={
                                    formik.values.accountsApplicableLimit
                                  }
                                  onChangeFn={formik.handleChange}
                                  onBlurFn={formik.handleBlur}
                                  formikError={
                                    formik.errors.accountsApplicableLimit
                                  }
                                  formikTouched={
                                    formik.touched.accountsApplicableLimit
                                  }
                                  placeholder="--"
                                  inputDisabled={true}
                                />
                              </div>
                              <div className="col-6">
                                <CouponSelectField
                                  labelName="Usage Limit Per Account*"
                                  placeholder="Select Refund Type"
                                  option={usageLimitPerAccount}
                                  itemName="usageLimitPerAccount"
                                  formikValue={
                                    formik.values.usageLimitPerAccount
                                  }
                                  formik={formik}
                                  formikError={
                                    formik.errors.usageLimitPerAccount
                                  }
                                  formikTouched={
                                    formik.touched.usageLimitPerAccount
                                  }
                                  selectDisabled={
                                    is_editable === false ||
                                    status === "Active" ||
                                    status === "ReviewPendingUpdated"
                                  }
                                />
                              </div>
                            </div>

                            {referralData?.recieverCoupon === "XAmountOff" ||
                              currentReferralData?.receiver_coupon_type ===
                              "XAmountOff" ? (
                              <div className="row mt-2">
                                <div className="col-6 position-relative">
                                  <CouponInputField
                                    labelName="Amount Off*"
                                    itemName={"amountOff"}
                                    inputValue={formik.values.amountOff}
                                    onChangeFn={formik.handleChange}
                                    onBlurFn={formik.handleBlur}
                                    formikError={formik.errors.amountOff}
                                    formikTouched={formik.touched.amountOff}
                                    placeholder="Enter max Amount"
                                    ruppeSymbol={true}
                                    inputDisabled={
                                      is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                    }
                                  />
                                </div>
                                <div className="col-6 "></div>
                              </div>
                            ) : (
                              <></>
                            )}
                            {referralData?.recieverCoupon ===
                              "X%DiscountUpToY" ||
                              currentReferralData?.receiver_coupon_type ===
                              "X%DiscountUpToY" ? (
                              <div className="row mt-2">
                                <div className="col-6 ">
                                  <CouponInputField
                                    labelName="% Discount*"
                                    itemName={"discount"}
                                    inputValue={formik.values.discount}
                                    onChangeFn={formik.handleChange}
                                    onBlurFn={formik.handleBlur}
                                    formikError={formik.errors.discount}
                                    formikTouched={formik.touched.discount}
                                    placeholder="Enter discount"
                                    percentSign={true}
                                    inputDisabled={
                                      is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                    }
                                  />
                                </div>
                                <div className="col-6 ">
                                  <CouponInputField
                                    labelName="Max Amount In Rs*"
                                    itemName={"maxAmountInRs"}
                                    inputValue={formik.values.maxAmountInRs}
                                    onChangeFn={formik.handleChange}
                                    onBlurFn={formik.handleBlur}
                                    formikError={formik.errors.maxAmountInRs}
                                    formikTouched={formik.touched.maxAmountInRs}
                                    placeholder="Enter max Amount"
                                    ruppeSymbol={true}
                                    inputDisabled={
                                      is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                    }
                                  />
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                            {referralData?.recieverCoupon ===
                              "X%CashbackUpToY" ||
                              currentReferralData?.receiver_coupon_type ===
                              "X%CashbackUpToY" ? (
                              <div className="row mt-2">
                                <div className="col-6 position-relative">
                                  <CouponInputField
                                    labelName="% Cashback*"
                                    itemName={"cashback"}
                                    inputValue={formik.values.cashback}
                                    onChangeFn={formik.handleChange}
                                    onBlurFn={formik.handleBlur}
                                    formikError={formik.errors.cashback}
                                    formikTouched={formik.touched.cashback}
                                    placeholder="Enter cashback"
                                    percentSign={true}
                                    inputDisabled={
                                      is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                    }
                                  />
                                </div>
                                <div className="col-6 position-relative">
                                  <CouponInputField
                                    labelName="Max Cashback In Rs*"
                                    itemName={"maxCashbackInRs"}
                                    inputValue={formik.values.maxCashbackInRs}
                                    onChangeFn={formik.handleChange}
                                    onBlurFn={formik.handleBlur}
                                    formikError={formik.errors.maxCashbackInRs}
                                    formikTouched={
                                      formik.touched.maxCashbackInRs
                                    }
                                    placeholder="Enter max cashback"
                                    ruppeSymbol={true}
                                    inputDisabled={
                                      is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                    }
                                  />
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-6">
                            <div className="col-lg-6">
                              <CouponInputField
                                labelName="Coupon Life Span(Days)*"
                                itemName={"couponLifeSpan"}
                                inputValue={formik.values.couponLifeSpan}
                                onChangeFn={formik.handleChange}
                                onBlurFn={formik.handleBlur}
                                formikError={formik.errors.couponLifeSpan}
                                formikTouched={formik.touched.couponLifeSpan}
                                placeholder="Enter max cashback"
                                inputDisabled={
                                  is_editable === false ||
                                  status === "Active" ||
                                  status === "ReviewPendingUpdated"
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row  mt-2">
                          <div className="col-md-6 position-relative">
                            <label
                              className={
                                formik.errors.bookingType
                                  ?.altleastOneBookingType &&
                                  formik.touched.bookingType
                                    ?.altleastOneBookingType
                                  ? "fs_14 red_color"
                                  : "fs_14 primary_color"
                              }
                            >
                              Booking Type*
                            </label>
                            <div
                              onClick={() => {
                                setDropDownBookingOpen(
                                  is_editable === false ||
                                    status === "Active" ||
                                    status === "ReviewPendingUpdated"
                                    ? false
                                    : !dropDownBookingOpen
                                );
                                setDropDownBookingType(
                                  is_editable === false ||
                                    status === "Active" ||
                                    status === "ReviewPendingUpdated"
                                    ? false
                                    : !dropDowBookingType
                                );
                              }}
                            >
                              <input
                                className={
                                  formik.errors.bookingType
                                    ?.altleastOneBookingType &&
                                    formik.touched.bookingType
                                      ?.altleastOneBookingType
                                    ? "w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 primary_color fw_500"
                                    : `w-100 coupon_placeholder_rideType_text pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 fw_500 ${is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                      ? "disabled_border disabled_bg_color secondary_color"
                                      : "primary_border primary_color white_bg"
                                    }`
                                }
                                value={removeUnderScoreInArray(
                                  bookingTypeApplicableValue
                                )}
                                placeholder="Select Ride Type"
                                disabled
                              />
                              {dropDownBookingOpen ? (
                                <div className="coupon_dropdown_icon">
                                  <i className="ri-arrow-up-s-fill fs_18 fw_700" />
                                </div>
                              ) : (
                                <div className="coupon_dropdown_icon">
                                  <i className="ri-arrow-down-s-fill fs_18 fw_700" />
                                </div>
                              )}
                            </div>
                            <BookingTypeInput
                              formik={formik}
                              dropDowBookingType={dropDowBookingType}
                              setDropDownBookingType={setDropDownBookingType}
                              bookingTypeApplicableValue={
                                bookingTypeApplicableValue
                              }
                              setBookingTypeApplicableValue={
                                setBookingTypeApplicableValue
                              }
                              setDropDownBookingOpen={setDropDownBookingOpen}
                              setResetBookingType={setResetBookingType}
                              resetBookingType={resetBookingType}
                              setRideTypeApplicableValue={
                                setRideTypeApplicableValue
                              }
                              type={type}
                            />
                          </div>
                          {/* <div className="col-md-6 position-relative">
                            <label
                              className={
                                formik.errors.rideType?.altleastOne &&
                                formik.touched.rideType?.altleastOne
                                  ? "fs_14 red_color"
                                  : "fs_14 primary_color"
                              }
                            >
                              Ride Type*
                            </label>

                            <div
                              onClick={() => {
                                setDropDownOpen(
                                  is_editable === false ||
                                    status === "Active" ||
                                    status === "ReviewPendingUpdated"
                                    ? false
                                    : !dropDownOpen
                                );
                                setDropDownRideType(
                                  is_editable === false ||
                                    status === "Active" ||
                                    status === "ReviewPendingUpdated"
                                    ? false
                                    : !dropDowRideType
                                );
                              }}
                            >
                              <input
                                className={
                                  formik.errors.rideType?.altleastOne &&
                                  formik.touched.rideType?.altleastOne
                                    ? "w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 primary_color fw_500"
                                    : `w-100 coupon_placeholder_rideType_text pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 fw_500 ${
                                        is_editable === false ||
                                        status === "Active" ||
                                        status === "ReviewPendingUpdated"
                                          ? "disabled_border disabled_bg_color secondary_color"
                                          : "primary_border primary_color white_bg"
                                      }`
                                }
                                value={rideTypeApplicableValue}
                                placeholder="Select Ride Type"
                                disabled
                              />
                              {dropDownOpen ? (
                                <div className="coupon_dropdown_icon">
                                  <i className="ri-arrow-up-s-fill fs_18 fw_700" />
                                </div>
                              ) : (
                                <div className="coupon_dropdown_icon">
                                  <i className="ri-arrow-down-s-fill fs_18 fw_700" />
                                </div>
                              )}
                            </div>

                            <RideTypeInput
                              formik={formik}
                              dropDowRideType={dropDowRideType}
                              setDropDownRideType={setDropDownRideType}
                              rideTypeApplicableValue={rideTypeApplicableValue}
                              setRideTypeApplicableValue={
                                setRideTypeApplicableValue
                              }
                              setDropDownOpen={setDropDownOpen}
                              setResetRidetype={setResetRidetype}
                              resetRidetype={resetRidetype}
                              type={type}
                            />
                          </div> */}
                          <div className="col-md-6 position-relative">
                            <label
                              className={
                                formik.errors.rideType &&
                                  formik.touched.rideType
                                  ? "fs_14 red_color"
                                  : "fs_14 primary_color"
                              }
                            >
                              Ride Type*
                            </label>

                            <div
                              onClick={() => {
                                setDropDownRideType(
                                  is_editable === false ||
                                    status === "Active" ||
                                    status === "ReviewPendingUpdated"
                                    ? false
                                    : !dropDowRideType
                                );
                              }}
                            >
                              <input
                                type="text"
                                value={selectedRideType
                                  ?.map((option) => {
                                    const rideTypeOption =
                                      rideTypeOptions?.find(
                                        (item) => item.value === option
                                      );
                                    return rideTypeOption
                                      ? rideTypeOption.label
                                      : "";
                                  })
                                  .filter((label) => label !== "")
                                  .join(", ")}
                                readOnly
                                placeholder="Selected values"
                                onClick={() => {
                                  setDropDownRideType(
                                    is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                      ? false
                                      : !dropDowRideType
                                  );
                                }}
                                className={
                                  formik.errors.rideType &&
                                    formik.touched.rideType
                                    ? `w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 ${is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                      ? "disabled_bg_color secondary_color"
                                      : "white_bg primary_color "
                                    }`
                                    : `w-100 coupon_placeholder_rideType_text  pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 ${is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                      ? "disabled_border disabled_bg_color secondary_color"
                                      : "white_bg primary_color primary_border"
                                    }`
                                }
                              />

                              <div className="coupon_dropdown_icon">
                                <i className="ri-arrow-down-s-fill fs_18 fw_700" />
                              </div>
                            </div>

                            <RideTypeInput
                              dropDowRideType={dropDowRideType}
                              setDropDownRideType={setDropDownRideType}
                              type={type}
                              formik={formik}
                              name={"rideTypeId"}
                              filteredRideTypeOption={rideTypeOptions}
                              selectedRideType={selectedRideType}
                              setSelectedRideType={setSelectedRideType}
                              setselectedRideTypeLabel={
                                setselectedRideTypeLabel
                              }
                              handleReset={handleReset}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <CampaignDetailsInput
                  formik={formik}
                  is_editable={is_editable}
                  status={status}
                  campaignStatus={currentReferralData?.campaign_status ?? "--"}
                />
                {firstErrorField && (
                  <div className="red_color fs_16 fw_500 ps-3">
                    {formik.errors[firstErrorField]}
                  </div>
                )}

                {is_editable === false || is_editable === true ? (
                  <>
                    {status === "Active" ? (
                      <EditReferralBtn
                        backButton={true}
                        backBtn={leavePageFn}
                        resetBtn={() => {
                          formik?.resetForm();
                        }}
                        saveViewBtn={() => setStatusBtn("Save&ViewBroadCast")}
                        saveForLater={false}
                        DeleteButton={true}
                        deleteBtnFn={() => {
                          setStatusBtn("Delete");
                          handlChangesUpdateShow();
                        }}
                        is_editable={is_editable}
                        viewBtn={viewFn}
                        viewBtnText="View Broadcast"
                      />
                    ) : (
                      <EditReferralBtn
                        loading={loading}
                        backButton={true}
                        backBtn={leavePageFn}
                        saveLaterBtn={() => setStatusBtn("SaveLater")}
                        saveViewBtn={() => setStatusBtn("Save&ViewBroadCast")}
                        is_editable={is_editable}
                        viewBtn={viewFn}
                        resetBtn={() => {
                          formik.resetForm();
                          setResetRidetype(!resetRidetype);
                          setResetBookingType(!resetBookingType);
                        }}
                        viewBtnText="View Broadcast"
                      />
                    )}
                  </>
                ) : (
                  <CreateBroadcastBtn
                    formik={formik}
                    navigateBtn={caneclBtn}
                    cancelBtn={true}
                    btnText="Create Broadcast"
                    submitBtn={() => setStatusBtn("CreateReferral")}
                  />
                )}
              </div>
            </div>
          </form>
        )}
      </InnerLayout>
    </>
  );
};

export default DriverReferralDetails;
