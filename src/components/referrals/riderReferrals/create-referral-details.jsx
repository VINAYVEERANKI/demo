import React, { useEffect, useState } from "react";
import BookingTypeInput from "../../rider-coupons/utilities/bookingType";
import CouponInputField from "../../form/couponInputField";
import CouponSelectField from "../../form/CouponSelectField";
import RideTypeInput from "../../rider-coupons/utilities/rideType-input";
import CampaignDetailsInput from "../../rider-coupons/utilities/campaign-details-input";
import ReferralSideBar from "../referralSideBar";
import CreateBroadcastBtn from "../../rider-referrals/utilities/create-broadcast-btn";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createReferralAction } from "../../../redux/actions/referrals/createreferralAction";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import {
  couponTypeName,
  insertSpaceUnderScore,
  insertSpaces,
  intNumRegex,
  isEmptyArray,
  removeUnderScore,
  removeUnderScoreInArray,
  useExpiryDate,
} from "../../helper";
import {
  reviewReqReferralEditAction,
  reviewReqRefrralFindOneAction,
} from "../../../redux/actions/referrals/reviewRequiredAction";
import { activeReferralEditAction } from "../../../redux/actions/referrals/approveReferralAction";
import moment from "moment";
import EditReferralBtn from "../../rider-referrals/utilities/edit-referral-btn";
import { activeReferralFindOneAction } from "../../../redux/actions/referrals/approveReferralAction";
import { rejectedReferralFindOneAction } from "../../../redux/actions/referrals/rejectReferralAction";
import ReferralPasswordModal from "../passwordModal";
import { deletedReferralFindOneAction } from "../../../redux/actions/referrals/deleteReferralAction";
import { expiredReferralFindOneAction } from "../../../redux/actions/referrals/expiredReferralAction";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import InnerLayout from "../../layout/innerLayout";
import LeavePagemodal from "../../modals/leaveModal";
import SuccessMessagemodal from "../../modals/successMessageModal";
import { clearRiderReferralAction } from "../../../redux/actions/referrals/clearReferralAction";
import ErrorMessagemodal from "../../modals/errorMessageModal";
import CouponDetails from "../../coupons/riderCoupons/coupondetails";
import { referralRideTypeListAction } from "../../../redux/actions/referrals/dropdownListAction";

const CreateReferralDetails = ({ params, Data, location, type = "" }) => {
  const status = Data?.state?.referral_status;
  const is_editable = Data?.state?.edit;

  const [referralDetails, setReferralDetails] = useState(false);

  // const location = useLocation();
  const [referralData] = useState(location?.state);
  const navigate = useNavigate();
  const caneclBtn = () => {
    navigate("/rider-referral");
  };

  const riderReferralCreatedData = useSelector(
    (store) => store.createRiderReferralReducer
  );

  const createdData = riderReferralCreatedData?.data?.data;
  console.log(riderReferralCreatedData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [referralBackendData, setreferralBackendData] = useState([]);
  const [statusBtn, setStatusBtn] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);

  const [changeUpdatePasswordshow, setReferralApproveShow] = useState(false);
  const handleChangeUpdatePasswordClose = () => setReferralApproveShow(false);
  const handlChangesUpdateShow = () => setReferralApproveShow(true);

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);
  const [validationErrorMes, setvalidationErrorMes] = useState("");

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setReload(!reload);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  console.log(referralData?.id);

  useEffect(() => {
    if (type === "createRiderReferral") {
      if (location?.pathname === "/create-new-referral") {
        dispatch(
          clearRiderReferralAction(
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
    const referralID = {
      referral_id: params?.id,
    };
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      setFetchLoading(true);

      dispatch(
        reviewReqRefrralFindOneAction(referralID, onFetchSuccess, onFetchError)
      );
    } else if (status === "Active") {
      setFetchLoading(true);
      dispatch(
        activeReferralFindOneAction(referralID, onFetchSuccess, onFetchError)
      );
    } else if (status === "Rejected") {
      setFetchLoading(true);
      dispatch(
        rejectedReferralFindOneAction(referralID, onFetchSuccess, onFetchError)
      );
    } else if (status === "Deleted") {
      setFetchLoading(true);
      dispatch(
        deletedReferralFindOneAction(referralID, onFetchSuccess, onFetchError)
      );
    } else if (status === "Expired") {
      setFetchLoading(true);
      dispatch(
        expiredReferralFindOneAction(referralID, onFetchSuccess, onFetchError)
      );
    }
  }, [reload]);

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    console.log(data);
    setreferralBackendData(data?.data);
  };

  const onFetchError = (data) => {
    setFetchLoading(false);
    console.log(data);
  };

  const [selectedRideType, setSelectedRideType] = useState([]);
  const [selectedRideTypeLabel, setselectedRideTypeLabel] = useState([]);
  useEffect(() => {
    if (isEmptyArray(referralBackendData) === false) {
      setSelectedRideType(referralBackendData?.ride_type_id);
      setselectedRideTypeLabel(referralBackendData?.ride_type);
    } else if (createdData) {
      setSelectedRideType(createdData?.ride_type_id);
      setselectedRideTypeLabel(createdData?.ride_type);
    }
  }, [
    referralBackendData?.ride_type_id,
    referralBackendData?.ride_type,
    createdData,
  ]);

  console.log(referralBackendData, "sdfsdfff");

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
      referralBackendData?.ride_type_id ?? createdData?.ride_type_id
    );
    setselectedRideTypeLabel(
      referralBackendData?.ride_type ?? createdData?.ride_type
    );
  };

  // validation
  const discountRequired =
    referralData?.recieverCoupon === "X%DiscountUpToY" ||
    referralBackendData?.receiver_coupon_type === "X%DiscountUpToY"
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();
  const cashbackRequired =
    referralData?.recieverCoupon === "X%CashbackUpToY" ||
    referralBackendData.receiver_coupon_type === "X%CashbackUpToY"
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();
  const amountRequired =
    referralData?.recieverCoupon === "XAmountOff" ||
    referralBackendData.receiver_coupon_type === "XAmountOff"
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const required =
    (referralData?.recieverCoupon
      ? referralData?.recieverCoupon !== "CurrentBalanceDeposit"
      : null) ||
    (referralBackendData?.receiver_coupon_type
      ? referralBackendData?.receiver_coupon_type !== "CurrentBalanceDeposit"
      : null)
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const couponRequired =
    (referralData?.recieverCoupon
      ? referralData?.recieverCoupon !== "CurrentBalanceDeposit"
      : null) ||
    (referralBackendData.receiver_coupon_type
      ? referralBackendData.receiver_coupon_type !== "CurrentBalanceDeposit"
      : null)
      ? Yup.string().required("Please fill this field to proceed")
      : Yup.string();

  const bookingTyperequired =
    (referralData?.recieverCoupon
      ? referralData?.recieverCoupon !== "CurrentBalanceDeposit"
      : null) ||
    (referralBackendData.receiver_coupon_type
      ? referralBackendData.receiver_coupon_type !== "CurrentBalanceDeposit"
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
    (referralData?.recieverCoupon
      ? referralData?.recieverCoupon !== "CurrentBalanceDeposit"
      : null) ||
    (referralBackendData.receiver_coupon_type
      ? referralBackendData.receiver_coupon_type !== "CurrentBalanceDeposit"
      : null)
      ? Yup.array()
          .min(1, "Please select at least one option")
          .required("Please fill all the required fields*")
      : "";

  const receiverRequired =
    referralData?.recieverCoupon === "CurrentBalanceDeposit" ||
    referralBackendData.receiver_coupon_type === "CurrentBalanceDeposit"
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();
  // validation

  console.log(referralBackendData?.required_rides_completed_by_receiver);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sender_c_b_deposit:
        referralBackendData?.sender_cb_deposite_amount ??
        createdData?.sender_cb_deposite_amount ??
        "",
      sender_c_b_deposit_lifeSpan:
        referralBackendData?.sender_cb_deposite_amount_life_span ??
        createdData?.sender_cb_deposite_amount_life_span ??
        "",
      receiver_c_b_deposit:
        referralBackendData?.receiver_cb_deposite_amount ??
        createdData?.receiver_cb_deposite_amount ??
        "",
      receiver_c_b_deposit_lifeSpan:
        referralBackendData?.receiver_cb_deposite_amount_life_span ??
        createdData?.receiver_cb_deposite_amount_life_span ??
        "",
      requiredRides:
        referralBackendData?.required_rides_completed_by_receiver !==
          undefined ||
        createdData?.required_rides_completed_by_receiver !== undefined
          ? referralBackendData?.required_rides_completed_by_receiver ??
            createdData?.required_rides_completed_by_receiver
          : "",
      coupounCode:
        referralBackendData?.coupon_code ?? createdData?.coupon_code ?? "",
      couponTitle:
        referralBackendData?.coupon_title ?? createdData?.coupon_title ?? "",
      couponDescription:
        referralBackendData?.coupon_description ??
        createdData?.coupon_description ??
        "",
      accountsApplicableLimit:
        referralBackendData?.account_applicable_limit ??
        createdData?.account_applicable_limit ??
        "",
      usageLimitPerAccount:
        referralBackendData?.usage_limit_per_account ??
        createdData?.usage_limit_per_account ??
        "",
      discount: referralBackendData?.discount ?? createdData?.discount ?? "",
      maxAmountInRs:
        referralBackendData?.max_amount_in_rs ??
        createdData?.max_amount_in_rs ??
        "",
      startDate: referralBackendData?.start_date
        ? moment(referralBackendData?.start_date).format("YYYY-MM-DD")
        : createdData?.start_date
        ? moment(createdData?.start_date).format("YYYY-MM-DD")
        : "",
      startTime:
        referralBackendData?.start_time ?? createdData?.start_time ?? "",
      expiryDate: referralBackendData?.expiry_date
        ? moment(referralBackendData?.expiry_date).format("YYYY-MM-DD")
        : createdData?.expiry_date
        ? moment(createdData?.expiry_date).format("YYYY-MM-DD")
        : "",
      expiryTime:
        referralBackendData?.expiry_time ?? createdData?.expiry_time ?? "",
      campaignStatus:
        referralBackendData?.campaign_status ??
        createdData?.campaign_status ??
        "",
      bookingType: {
        one_way_outstation:
          referralBackendData?.booking_type?.one_way_outstation ??
          createdData?.booking_type?.one_way_outstation ??
          false,
        round_trip_outstation:
          referralBackendData?.booking_type?.round_trip_outstation ??
          createdData?.booking_type?.round_trip_outstation ??
          false,
        local:
          referralBackendData?.booking_type?.local ??
          createdData?.booking_type?.local ??
          false,
        rental:
          referralBackendData?.booking_type?.rental ??
          createdData?.booking_type?.rental ??
          false,
        altleastOneBookingType: "",
      },
      // rideType: {
      //   Bike:
      //     referralBackendData?.ride_type?.Bike ??
      //     createdData?.ride_type?.Bike ??
      //     false,
      //   Auto:
      //     referralBackendData?.ride_type?.Auto ??
      //     createdData?.ride_type?.Auto ??
      //     false,
      //   Mini:
      //     referralBackendData?.ride_type?.Mini ??
      //     createdData?.ride_type?.Mini ??
      //     false,
      //   Sedan:
      //     referralBackendData?.ride_type?.Sedan ??
      //     createdData?.ride_type?.Sedan ??
      //     false,
      //   Suv:
      //     referralBackendData?.ride_type?.Suv ??
      //     createdData?.ride_type?.Suv ??
      //     false,
      //   PremiumSedan:
      //     referralBackendData?.ride_type?.PremiumSedan ??
      //     createdData?.ride_type?.PremiumSedan ??
      //     false,
      //   Luxury:
      //     referralBackendData?.ride_type?.Luxury ??
      //     createdData?.ride_type?.Luxury ??
      //     false,
      //   KaaliPeeli:
      //     referralBackendData?.ride_type?.KaaliPeeli ??
      //     createdData?.ride_type?.KaaliPeeli ??
      //     false,
      //   altleastOne: "",
      // },
      rideType: referralBackendData?.ride_type ?? createdData?.ride_type ?? [],
      rideTypeId:
        referralBackendData?.ride_type_id ?? createdData?.ride_type_id ?? [],
      amountOff: referralBackendData?.amountoff ?? createdData?.amountoff ?? "",
      cashback: referralBackendData?.cashback ?? createdData?.cashback ?? "",
      maxCashbackInRs:
        referralBackendData?.max_cashback_in_rs ??
        createdData?.max_cashback_in_rs ??
        "",
      couponLifeSpan:
        referralBackendData?.coupon_life_span ??
        createdData?.coupon_life_span ??
        "",
    },

    validationSchema: Yup.object().shape({
      sender_c_b_deposit: Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed"),
      sender_c_b_deposit_lifeSpan: Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed"),
      receiver_c_b_deposit: receiverRequired,
      receiver_c_b_deposit_lifeSpan: receiverRequired,
      requiredRides: Yup.string()
        .matches(intNumRegex, "invalid")
        .required("Please fill this field to proceed"),
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
      console.log(values);
      setLoading(true);
      if (statusBtn === "CreateRefferal") {
        dispatch(
          createReferralAction(
            {
              user_type: "Rider",
              referral_classification: "RiderToRiderReferral",
              sender_coupon_type: referralData?.senderCoupon,
              receiver_coupon_type: referralData?.recieverCoupon,
              sender_cb_deposite_amount: values?.sender_c_b_deposit,
              sender_cb_deposite_amount_life_span:
                values?.sender_c_b_deposit_lifeSpan,
              required_rides_completed_by_receiver: values?.requiredRides,
              receiver_cb_deposite_amount: values?.receiver_c_b_deposit,
              receiver_cb_deposite_amount_life_span:
                values?.receiver_c_b_deposit_lifeSpan,
              coupon_code: values?.coupounCode.toUpperCase(),
              coupon_title: values?.couponTitle,
              coupon_description: values?.couponDescription,
              usage_limit_per_account: values?.usageLimitPerAccount,
              coupon_life_span: values?.couponLifeSpan,
              discount: values?.discount,
              cashback: values?.cashback,
              max_cashback_in_rs: values?.maxCashbackInRs,
              max_amount_in_rs: values?.maxAmountInRs,
              amountoff: values?.amountOff,
              booking_type: values?.bookingType,
              ride_type: values?.rideType,
              ride_type_id: values?.rideTypeId,
              start_date: values?.startDate,
              start_time: values?.startTime,
              expiry_date: values?.expiryDate,
              expiry_time: values?.expiryTime,
            },
            onSuccess,
            onError
          )
        );
        // dispatch(clearReducerRiderReferralAction());
      }
      if (statusBtn === "SaveLater" || statusBtn === "SaveView") {
        {
          (status === "PendingReview" || status === "ReviewPendingUpdated") &&
            dispatch(
              reviewReqReferralEditAction(
                {
                  referral_id: referralBackendData?.id,
                  sender_cb_deposite_amount: values?.sender_c_b_deposit
                    ? values?.sender_c_b_deposit
                    : "--",
                  sender_cb_deposite_amount_life_span:
                    values?.sender_c_b_deposit_lifeSpan
                      ? values?.sender_c_b_deposit_lifeSpan
                      : "--",
                  required_rides_completed_by_receiver:
                    values?.requiredRides !== undefined
                      ? values?.requiredRides
                      : "--",
                  receiver_cb_deposite_amount: values?.receiver_c_b_deposit
                    ? values?.receiver_c_b_deposit
                    : "--",
                  receiver_cb_deposite_amount_life_span:
                    values?.receiver_c_b_deposit_lifeSpan
                      ? values?.receiver_c_b_deposit_lifeSpan
                      : "--",
                  coupon_code: values?.coupounCode
                    ? values?.coupounCode.toUpperCase()
                    : "--",
                  coupon_title: values?.couponTitle
                    ? values?.couponTitle
                    : "--",
                  coupon_description: values?.couponDescription
                    ? values?.couponDescription
                    : "--",
                  usage_limit_per_account: values?.usageLimitPerAccount
                    ? values?.usageLimitPerAccount
                    : "--",
                  coupon_life_span: values?.couponLifeSpan
                    ? values?.couponLifeSpan
                    : "--",
                  discount: values?.discount ? values?.discount : "--",
                  max_amount_in_rs: values?.maxAmountInRs
                    ? values?.maxAmountInRs
                    : "--",
                  cashback: values?.cashback ? values?.cashback : "--",
                  max_cashback_in_rs: values?.maxCashbackInRs
                    ? values?.maxCashbackInRs
                    : "--",
                  amountoff: values?.amountOff ? values?.amountOff : "--",
                  booking_type: values?.bookingType
                    ? values?.bookingType
                    : false,
                  ride_type: values?.rideType,
                  ride_type_id: values?.rideTypeId,
                  start_date: values?.startDate ? values?.startDate : "--",
                  start_time: values?.startTime ? values?.startTime : "--",
                  expiry_date: values?.expiryDate ? values?.expiryDate : "--",
                  expiry_time: values?.expiryTime ? values?.expiryTime : "--",
                },
                onEditSuccess,
                onEditError
              )
            );
        }
        if (status === "Active") {
          dispatch(
            activeReferralEditAction(
              {
                referral_id: referralBackendData?.id,
                expiry_date: values?.expiryDate ?? "--",
                expiry_time: values?.expiryTime ?? "--",
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      }
    },
  });

  console.log(formik.values);

  const onSuccess = (data) => {
    setLoading(false);
    console.log(data);
    successToast(data?.message);
    navigate("/create-broadcast-referral", {
      state: { data: data?.data },
    });
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data);
    errorToast(data?.data?.data);
    setvalidationErrorMes(insertSpaceUnderScore(data?.data?.data));
    handleErrorMessageShow();
  };

  const onEditSuccess = (data) => {
    setLoading(false);
    console.log(data);
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      successToast(data?.message);
      handleSuccessMessageShow();
    }
    if (statusBtn === "SaveView") {
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        navigate(
          `/referral-review-required-broadcast-edit/${referralBackendData?.id}`,
          {
            state: { status, is_editable },
          }
        );
      } else if (status === "Active") {
        navigate(`/referral-active-braodcast-edit/${referralBackendData?.id}`, {
          state: { status, is_editable },
        });
      }
    }
  };
  const onEditError = (data) => {
    setLoading(false);
    setReload(!reload);
    console.log(data);
    errorToast(data?.data?.data);
    setvalidationErrorMes(insertSpaceUnderScore(data?.data?.data));
    handleErrorMessageShow();
  };

  const leavePageFn = () => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };
  console.log(Data);

  const viewFn = () => {
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      navigate(
        `/referral-review-required-broadcast-edit/${referralBackendData?.id}`,
        {
          state: { status, is_editable },
        }
      );
    } else if (status === "Active") {
      navigate(`/referral-active-braodcast-edit/${referralBackendData?.id}`, {
        state: { status, is_editable },
      });
    } else if (status === "Rejected") {
      navigate(`/referral-rejected/broadcast/view/${referralBackendData?.id}`, {
        state: { status, is_editable },
      });
    } else if (status === "Deleted") {
      navigate(`/referral-deleted/broadcast/view/${referralBackendData?.id}`, {
        state: { status, is_editable },
      });
    } else if (status === "Expired") {
      navigate(`/referral-expire/broadcast/view/${referralBackendData?.id}`, {
        state: { status, is_editable },
      });
    }
  };

  const usageLimitPerAccount = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

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
    setData(referralBackendData, "ride_type");
    setData(referralBackendData, "booking_type");
    setData(createdData, "ride_type");
    setData(createdData, "booking_type");
  }, [referralBackendData, resetRidetype, resetBookingType]);

  const sideBarBackendData = [
    {
      label: "Referral ID",
      value: referralBackendData?.referral_id,
      display: true,
    },
    {
      label: "User Type",
      value: referralBackendData?.user_type,
      display: true,
    },
    {
      label: "Referral Classification",
      value: referralBackendData?.referral_classification,
      display: true,
    },
    {
      label: "Sender Coupon Type",
      value: couponTypeName(referralBackendData?.sender_coupon_type),
      display: true,
    },
    {
      label: "Receiver Coupon Type",
      value: couponTypeName(referralBackendData?.receiver_coupon_type),
      display: true,
    },
    {
      label: "Referral Status",
      value: referralBackendData?.referral_status,
      display: true,
    },
  ];

  const activereferralData = [
    {
      label: "Accounts Availed",
      value: referralBackendData?.accounts_availed ?? "--",
      heading: "Receiver Coupon Usage Details*",
      display: true,
    },
    {
      label: "Total Coupons Used",
      value: referralBackendData?.total_coupon_used ?? "--",
      display: true,
    },
  ];

  if (referralBackendData?.referral_status === "Active") {
    sideBarBackendData.push(...activereferralData);
  }

  const sideBarData = [
    { label: "Referral ID", value: "-" },
    {
      label: "User Type",
      value: removeUnderScore(referralData?.userType),
      display: true,
    },

    {
      label: "Referral Classification",
      value: referralData?.referralClassification,
      display: true,
    },
    {
      label: "Sender Coupon Type",
      value: couponTypeName(referralData?.senderCoupon),
      display: true,
    },
    {
      label: "Receiver Coupon Type",
      value: couponTypeName(referralData?.recieverCoupon),
      display: true,
    },
  ];

  function sidebarFn() {
    if (referralBackendData?.referral_id !== undefined) {
      return sideBarBackendData;
    } else {
      return sideBarData;
    }
  }

  const referralSideBar = sidebarFn();

  console.log(type);

  const expiryDate = useExpiryDate(
    referralBackendData?.coupon_life_span,
    referralBackendData?.expiry_date,
    referralBackendData?.expiry_time
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
        referralBackendData={referralBackendData}
        statusBtn={statusBtn}
        title={
          statusBtn === "Delete"
            ? "Are you sure you want to Delete this referral ?"
            : "Are yoy sure you want to make changes ?"
        }
        type="riderReferrals"
      />
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={() => {
          handleSuccessMessageClose();
        }}
        title={"Changes made Successfully"}
      />
      <InnerLayout
        mainHeading={
          Data?.state?.referralID
            ? `Rider To Rider Referral - ${Data?.state?.referralID}`
            : `Create Account Specific Coupon`
        }
        navigateEnable={false}
        naviagteLeave={true}
        navigateFn={leavePageFn}
        expiryDateShow={true}
        expiryDate={
          fetchLoading
            ? ``
            : type === "createRiderReferral"
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
                <ReferralSideBar data={referralSideBar} />
              </div>

              <div className="col-lg-9">
                <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
                  <div className=" d-flex justify-content-between position-relative">
                    <div className=" primary_color fs_18 fw_500 text_underline">
                      Sender Current Balance Deposit Details
                    </div>
                    {type != "createRiderReferral" ? (
                      <>
                        <div
                          className="position-absolute top-0 end-0 mt-1 me-3 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                          onClick={() => setReferralDetails(!referralDetails)}
                        >
                          More Details
                        </div>
                      </>
                    ) : null}

                    {referralDetails ? (
                      <>
                        <div className="coupon_details_block border white_bg border_radius">
                          <CouponDetails item={referralBackendData} />
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="row">
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
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
                      <span className="fs_16 primary_color">
                        Current Balance Deposit Amount Life Span (Days)*
                      </span>
                    </div>
                    <div className="col-sm-4 col-12">
                      <CouponInputField
                        label={false}
                        itemName={"sender_c_b_deposit_lifeSpan"}
                        inputValue={formik.values.sender_c_b_deposit_lifeSpan}
                        onChangeFn={formik.handleChange}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.sender_c_b_deposit_lifeSpan}
                        formikTouched={
                          formik.touched.sender_c_b_deposit_lifeSpan
                        }
                        placeholder=""
                        inputDisabled={
                          is_editable === false ||
                          status === "Active" ||
                          status === "ReviewPendingUpdated"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
                      <span className="fs_16 primary_color ">
                        Required Rides(Completed By Receiver)*
                      </span>
                    </div>
                    <div className="col-sm-4 col-12">
                      <CouponInputField
                        label={false}
                        itemName={"requiredRides"}
                        inputValue={formik.values.requiredRides}
                        onChangeFn={formik.handleChange}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.requiredRides}
                        formikTouched={formik.touched.requiredRides}
                        placeholder=""
                        inputDisabled={
                          is_editable === false ||
                          status === "Active" ||
                          status === "ReviewPendingUpdated"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
                {referralData?.recieverCoupon === "CurrentBalanceDeposit" ||
                referralBackendData?.receiver_coupon_type ===
                  "CurrentBalanceDeposit" ? (
                  <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
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
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-7 col-md-7 col-lg-6 col-xl-5">
                        <span className="fs_16 primary_color">
                          Current Balance Deposit Amount Life Span (Days)*
                        </span>
                      </div>
                      <div className="col-sm-4 col-12">
                        <CouponInputField
                          label={false}
                          itemName={"receiver_c_b_deposit_lifeSpan"}
                          inputValue={
                            formik.values.receiver_c_b_deposit_lifeSpan
                          }
                          onChangeFn={formik.handleChange}
                          onBlurFn={formik.handleBlur}
                          formikError={
                            formik.errors.receiver_c_b_deposit_lifeSpan
                          }
                          formikTouched={
                            formik.touched.receiver_c_b_deposit_lifeSpan
                          }
                          placeholder=""
                          inputDisabled={
                            is_editable === false ||
                            status === "Active" ||
                            status === "ReviewPendingUpdated"
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
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
                              ? true
                              : false
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
                              ? true
                              : false
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
                          placeholder="Enter coupon code"
                          TextArea={true}
                          input={false}
                          inputDisabled={
                            is_editable === false ||
                            status === "Active" ||
                            status === "ReviewPendingUpdated"
                              ? true
                              : false
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
                                // inputDisabled={
                                //   is_editable === false ? true : false
                                // }
                                inputDisabled={true}
                              />
                            </div>
                            <div className="col-6">
                              <CouponSelectField
                                labelName="Usage Limit Per Account*"
                                placeholder="Select Refund Type"
                                option={usageLimitPerAccount}
                                itemName="usageLimitPerAccount"
                                formikValue={formik.values.usageLimitPerAccount}
                                formik={formik}
                                formikError={formik.errors.usageLimitPerAccount}
                                formikTouched={
                                  formik.touched.usageLimitPerAccount
                                }
                                selectDisabled={
                                  is_editable === false ||
                                  status === "Active" ||
                                  status === "ReviewPendingUpdated"
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </div>

                          {referralData?.recieverCoupon === "XAmountOff" ||
                          referralBackendData?.receiver_coupon_type ===
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
                                      ? true
                                      : false
                                  }
                                />
                              </div>
                              <div className="col-6 "></div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {referralData?.recieverCoupon === "X%DiscountUpToY" ||
                          referralBackendData?.receiver_coupon_type ===
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
                                      ? true
                                      : false
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
                                      ? true
                                      : false
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {referralData?.recieverCoupon === "X%CashbackUpToY" ||
                          referralBackendData?.receiver_coupon_type ===
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
                                      ? true
                                      : false
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
                                  formikTouched={formik.touched.maxCashbackInRs}
                                  placeholder="Enter max cashback"
                                  ruppeSymbol={true}
                                  inputDisabled={
                                    is_editable === false ||
                                    status === "Active" ||
                                    status === "ReviewPendingUpdated"
                                      ? true
                                      : false
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
                                  ? true
                                  : false
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
                              formik.touched.bookingType?.altleastOneBookingType
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
                                  : `w-100 coupon_placeholder_rideType_text pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 fw_500 ${
                                      is_editable === false ||
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
                              formik.errors.rideType && formik.touched.rideType
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
                                  const rideTypeOption = rideTypeOptions?.find(
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
                                  ? `w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 ${
                                      is_editable === false ||
                                      status === "Active" ||
                                      status === "ReviewPendingUpdated"
                                        ? "disabled_bg_color secondary_color"
                                        : "white_bg primary_color "
                                    }`
                                  : `w-100 coupon_placeholder_rideType_text  pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 ${
                                      is_editable === false ||
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
                            setselectedRideTypeLabel={setselectedRideTypeLabel}
                            handleReset={handleReset}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <CampaignDetailsInput
                  formik={formik}
                  is_editable={is_editable}
                  status={status}
                  campaignStatus={referralBackendData?.campaign_status ?? "--"}
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
                          formik.setFieldValue(
                            "expiryDate",
                            formik.initialValues.expiryDate
                          );
                          formik.setFieldValue(
                            "expiryTime",
                            formik.initialValues.expiryTime
                          );
                        }}
                        saveViewBtn={() => setStatusBtn("SaveView")}
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
                        // loading={loading}
                        backButton={true}
                        backBtn={leavePageFn}
                        saveLaterBtn={() => setStatusBtn("SaveLater")}
                        saveViewBtn={() => setStatusBtn("SaveView")}
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
                    submitBtn={() => setStatusBtn("CreateRefferal")}
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

export default CreateReferralDetails;
