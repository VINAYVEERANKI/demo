import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../coupon-component.css";
import moment from "moment";
import RideTypeInput from "../../../rider-coupons/utilities/rideType-input";
import PaymentMethod from "../coupon-classification/payment-method";
import RentalPackage from "../coupon-classification/rental-package";
import BookingDistance from "../coupon-classification/booking-distance";
import RentalPackageRange from "../coupon-classification/rental-package-range";
import BookingDistanceRange from "../coupon-classification/booking-distance-range";
import OutstationPackage from "../coupon-classification/outstation-package";
import OutstationPackageRange from "../coupon-classification/outstation-package-range";
import CouponInputField from "../../../form/couponInputField";
import CouponSelectField from "../../../form/CouponSelectField";
import {
  insertSpaceUnderScore,
  insertSpaces,
  useExpiryDate,
  intNumRegex,
} from "../../../helper";
import ReviewBookingDestination from "../coupon-classification/booking-destination";
import ReviewPickUpDropOffLocation from "../coupon-classification/pickUp-dropOff-location";
import CouponDetails from "../coupondetails";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as riderCouponAction from "../../../../redux/actions/riderCoupon/findOneAndEditAction";
import successToast from "../../../utilits/successToast";
import errorToast from "../../../utilits/errorToast";
import InnerLayout from "../../../layout/innerLayout";
import LeavePagemodal from "../../../modals/leaveModal";
import EditReferralBtn from "../../../rider-referrals/utilities/edit-referral-btn";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import { couponMainZoneListAction } from "../../../../redux/actions/riderCoupon/createCouponAction";
import SpinnerLoading from "../../../utilits/spinnerLoading";
import CouponSidebar from "../couponSidebar";
import CampaignDetailsInput from "../../../rider-coupons/utilities/campaign-details-input";
import RiderCouponPassword from "../modals/passWordModal";
import CreateBroadcastBtn from "../../../rider-referrals/utilities/create-broadcast-btn";
import * as createCouponAction from "../../../../redux/actions/riderCoupon/createCouponAction";
import { clearRiderCouponAction } from "../../../../redux/actions/riderCoupon/clearCouponAction";
import ErrorMessagemodal from "../../../modals/errorMessageModal";
import useDisplayToggle from "../../../useDisplayToggle";
import { couponRideTypeListAction } from "../../../../redux/actions/riderCoupon/dropdownListAction";

const RiderCouponDetails = ({ params, Location, couponData, type = "" }) => {
  const reviewData = Location.state;
  const status = Location?.state?.status;
  const is_editable = Location?.state?.edit;
  console.log(is_editable);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [reviewBackendData, setReviewBackendData] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [mainZoneId, setMainZoneId] = useState();
  // reducer data
  const riderCouponCreatedData = useSelector(
    (store) => store.createRiderCouponReducer
  );
  const createdData = riderCouponCreatedData?.data?.data;

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);
  const [statusBtn, setStatusBtn] = useState("");

  const [couponPasswordShow, setCouponPasswordShow] = useState(false);
  const handleCouponPasswordClose = () => setCouponPasswordShow(false);
  const handleCouponPasswordShow = () => setCouponPasswordShow(true);

  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);
  const [validationErrorMes, setvalidationErrorMes] = useState("");

  const caneclBtn = () => {
    navigate("/rider-coupons");
  };
  // find one
  useEffect(() => {
    const couponID = {
      coupon_id: params?.id,
    };
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      setFetchLoading(true);
      dispatch(
        riderCouponAction?.pendingCouponFindOneAction(
          couponID,
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Active") {
      setFetchLoading(true);
      dispatch(
        riderCouponAction?.activeCouponFindOneAction(
          couponID,
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Rejected") {
      setFetchLoading(true);
      dispatch(
        riderCouponAction?.rejectedCouponFindOneAction(
          couponID,
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Deleted") {
      setFetchLoading(true);
      dispatch(
        riderCouponAction?.deletedCouponFindOneAction(
          couponID,
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (status === "Expired") {
      setFetchLoading(true);
      dispatch(
        riderCouponAction?.expiredCouponFindOneAction(
          couponID,
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [reload]);

  const notificationData = reviewBackendData?.rider_coupon_notification;

  useEffect(() => {
    if (couponData?.couponApplicableZone) {
      setMainZoneId(...couponData?.couponApplicableZone);
    }
    if (type === "createRiderCoupon") {
      if (Location?.pathname === "/create-new-coupon") {
        dispatch(
          clearRiderCouponAction(
            {
              coupon_id: createdData?.id,
            },
            onClearSuccess,
            onClearError
          )
        );
      }
    }
  }, [couponData?.couponApplicableZone]);

  const onClearSuccess = (data) => {
    console.log(data);
  };
  const onClearError = (data) => {
    console.log(data);
  };

  const [selectedRideType, setSelectedRideType] = useState([]);
  const [selectedRideTypeLabel, setselectedRideTypeLabel] = useState([]);
  useEffect(() => {
    if (reviewBackendData) {
      setSelectedRideType(reviewBackendData?.ride_type_id);
      setselectedRideTypeLabel(reviewBackendData?.ride_type);
    } else if (createdData) {
      setSelectedRideType(createdData?.ride_type_id);
      setselectedRideTypeLabel(createdData?.ride_type);
    }
  }, [
    reviewBackendData?.ride_type_id,
    reviewBackendData?.ride_type,
    createdData,
  ]);
  // useEffect(() => {
  //   // Assuming you have received the backend data in a variable called `backendData`
  //   if (reviewBackendData) {
  //     formik.setFieldValue("rideTypeId", reviewBackendData?.ride_type_id);
  //     formik.setFieldValue("rideType", reviewBackendData?.ride_type);
  //   }
  // }, [reviewBackendData]);

  console.log(reviewBackendData, "aadassaddad");
  const [rideTypeOptions, setRideTypeOptions] = useState([]);
  const [rideTypeList, setRideTypeList] = useState([]);
  useEffect(() => {
    dispatch(couponRideTypeListAction(onRideTypeSuccess, onRideTypeError));
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

  // console.log(selectedRideTypeLabel, "asdasdad");

  const handleReset = () => {
    setSelectedRideType(
      reviewBackendData?.ride_type_id ?? createdData?.ride_type_id
    );
    setselectedRideTypeLabel(
      reviewBackendData?.ride_type ?? createdData?.ride_type
    );
  };

  console.log(createdData?.ride_type, "adadad");
  const [filteredRideTypeOption, setFilteredRideTypeOption] = useState([]);

  // useEffect(() => {
  //   const filteredRideType = rideTypeList.filter((item) => {
  //     return item.applicable_zone_permission.some((permission) => {
  //       return (
  //         permission.zone_id?.includes(type ==="createRiderCoupon" ? reviewData?.couponApplicableZone : reviewBackendData?.coupon_applicable_zone) &&
  //         permission.documentation_availablity === true
  //       );
  //     });
  //   });

  //   const filterRideType = Object.values(filteredRideType)?.map((item) => {
  //     return { value: item.id, label: item.ride_type };
  //   });
  //   setFilteredRideTypeOption(filterRideType);
  // }, [reviewBackendData?.coupon_applicable_zone, rideTypeList]);

  useEffect(() => {
    const filteredRideType = rideTypeList.filter((item) => {
      return item.applicable_zone_permission.some((permission) => {
        const couponApplicableZone =
          type === "createRiderCoupon"
            ? reviewData?.couponApplicableZone
            : reviewBackendData?.coupon_applicable_zone;

        if (Array.isArray(couponApplicableZone)) {
          // Handle array scenario
          return couponApplicableZone.some((zone) => {
            return (
              permission.zone_id?.includes(zone) &&
              permission.documentation_availablity === true
            );
          });
        } else {
          // Handle single value scenario
          return (
            permission.zone_id?.includes(couponApplicableZone) &&
            permission.documentation_availablity === true
          );
        }
      });
    });

    const filterRideType = Object.values(filteredRideType)?.map((item) => {
      return { value: item.id, label: item.ride_type };
    });
    setFilteredRideTypeOption(filterRideType);
  }, [
    reviewBackendData?.coupon_applicable_zone,
    reviewData?.couponApplicableZone,
    rideTypeList,
  ]);

  console.log(reviewData, "dsfkjkjaa");

  // condition
  const paymentRequired =
    reviewData?.coupon_classification === "PaymentMethod" ||
    couponData?.couponClassification === "PaymentMethod"
      ? Yup.string().required("Please fill this field to proceed")
      : Yup.string();

  const couponTypeRequired =
    reviewData?.coupon_type === "XAmountOff" ||
    couponData?.couponType === "XAmountOff"
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const discountRequired =
    reviewData?.coupon_type === "X%DiscountUpToY" ||
    couponData?.couponType === "X%DiscountUpToY"
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const maxAmountInRsRequired =
    reviewData?.coupon_type === "X%DiscountUpToY" ||
    couponData?.couponType === "X%DiscountUpToY"
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const cashbackRequired =
    reviewData?.coupon_type === "X%CashbackUpToY" ||
    couponData?.couponType === "X%CashbackUpToY"
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const couponLifeSpanRequired =
    reviewData?.coupon_classification === "NewAccountLifeSpan" ||
    couponData?.couponClassification === "NewAccountLifeSpan"
      ? Yup.string().required("Please fill this field to proceed")
      : Yup.string();

  const bookingDestinationRequired =
    reviewData?.coupon_classification === "BookingDestination" ||
    couponData?.couponClassification === "BookingDestination"
      ? Yup.string().required("Please fill this field to proceed")
      : Yup.string();

  const pickUpLocationRequired =
    reviewData?.coupon_classification === "PickupToDropoff" ||
    couponData?.couponClassification === "PickupToDropoff"
      ? Yup.string().required("Please fill this field to proceed")
      : Yup.string();

  const rentalPackageMilestoneRequired =
    (reviewData?.coupon_classification === "RentalPackage" &&
      reviewData?.coupon_classification_details === "Milestone") ||
    (couponData?.couponClassification === "RentalPackage" &&
      couponData?.couponClassificationDetails === "Milestone")
      ? Yup.string().required("Please fill this field to proceed")
      : Yup.string();

  const bookingDistanceMilestoneRequired =
    (reviewData?.coupon_classification === "BookingDistance" &&
      reviewData?.coupon_classification_details === "Milestone") ||
    (couponData?.couponClassification === "BookingDistance" &&
      couponData?.couponClassificationDetails === "Milestone")
      ? Yup.string().required("Please fill this field to proceed")
      : Yup.string();

  const R_P_range_startRequired =
    (reviewData?.coupon_classification === "RentalPackage" &&
      reviewData?.coupon_classification_details === "Rental") ||
    (couponData?.couponClassification === "RentalPackage" &&
      couponData?.couponClassificationDetails === "Range")
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const B_D_range_startRequired =
    (reviewData?.coupon_classification === "BookingDistance" &&
      reviewData?.coupon_classification_details === "Rental") ||
    (couponData?.couponClassification === "BookingDistance" &&
      couponData?.couponClassificationDetails === "Range")
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const O_P_D_range_startRequired =
    (reviewData?.coupon_classification === "OutstationPackageDistance" &&
      reviewData?.coupon_classification_details === "Rental") ||
    (couponData?.couponClassification === "OutstationPackageDistance" &&
      couponData?.couponClassificationDetails === "Milestone")
      ? Yup.string()
          .matches(intNumRegex, "invalid")
          .required("Please fill this field to proceed")
      : Yup.string();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      coupounCode:
        reviewBackendData?.coupon_code ?? createdData?.coupon_code ?? "",
      couponTitle:
        reviewBackendData?.coupon_title ?? createdData?.coupon_title ?? "",
      couponDescription:
        reviewBackendData?.coupon_description ??
        createdData?.coupon_description ??
        "",
      accountsApplicableLimit:
        reviewBackendData?.account_applicable_limit ??
        createdData?.account_applicable_limit ??
        "",
      usageLimitPerAccount:
        reviewBackendData?.usage_limit_per_account ??
        createdData?.usage_limit_per_account ??
        "",
      couponLifeSpan:
        reviewBackendData?.coupon_life_span ??
        createdData?.coupon_life_span ??
        "",
      discount: reviewBackendData?.discount ?? createdData?.discount ?? "",
      maxAmountInRs:
        reviewBackendData?.max_amount_in_rs ??
        createdData?.max_amount_in_rs ??
        "",
      startDate: reviewBackendData?.start_date
        ? moment(reviewBackendData?.start_date).format("YYYY-MM-DD")
        : createdData?.start_date
        ? moment(createdData?.start_date).format("YYYY-MM-DD")
        : "",
      startTime: reviewBackendData?.start_time ?? createdData?.start_time ?? "",
      expiryDate: reviewBackendData?.expiry_date
        ? moment(reviewBackendData?.expiry_date).format("YYYY-MM-DD")
        : createdData?.expiry_date
        ? moment(createdData?.expiry_date).format("YYYY-MM-DD")
        : "",
      expiryTime:
        reviewBackendData?.expiry_time ?? createdData?.expiry_time ?? "",
      campaignStatus:
        reviewBackendData?.campaign_status ??
        createdData?.campaign_status ??
        "",
      bookingType:
        reviewBackendData?.booking_type ?? createdData?.booking_type ?? "",
      // rideType: {
      //   Bike:
      //     reviewBackendData?.ride_type?.Bike ??
      //     createdData?.ride_type?.Bike ??
      //     false,
      //   Auto:
      //     reviewBackendData?.ride_type?.Auto ??
      //     createdData?.ride_type?.Auto ??
      //     false,
      //   Mini:
      //     reviewBackendData?.ride_type?.Mini ??
      //     createdData?.ride_type?.Mini ??
      //     false,
      //   Sedan:
      //     reviewBackendData?.ride_type?.Sedan ??
      //     createdData?.ride_type?.Sedan ??
      //     false,
      //   Suv:
      //     reviewBackendData?.ride_type?.Suv ??
      //     createdData?.ride_type?.Suv ??
      //     false,
      //   PremiumSedan:
      //     reviewBackendData?.ride_type?.PremiumSedan ??
      //     createdData?.ride_type?.PremiumSedan ??
      //     false,
      //   Luxury:
      //     reviewBackendData?.ride_type?.Luxury ??
      //     createdData?.ride_type?.Luxury ??
      //     false,
      //   KaaliPeeli:
      //     reviewBackendData?.ride_type?.KaaliPeeli ??
      //     createdData?.ride_type?.KaaliPeeli ??
      //     false,
      //   altleastOne: "",
      // },
      rideType: reviewBackendData?.ride_type ?? createdData?.ride_type ?? [],
      rideTypeId:
        reviewBackendData?.ride_type_id ?? createdData?.ride_type_id ?? [],
      paymentMethod:
        reviewBackendData?.payment_method ?? createdData?.payment_method ?? "",
      amountOff: reviewBackendData?.amountoff ?? createdData?.amountoff ?? "",
      cashback: reviewBackendData?.cashback ?? createdData?.cashback ?? "",
      maxCashbackInRs:
        reviewBackendData?.max_cashback_in_rs ??
        createdData?.max_cashback_in_rs ??
        "",
      bookingDestinationType:
        reviewBackendData?.booking_destination_type ??
        createdData?.booking_destination_type ??
        "",
      bookingDestination:
        reviewBackendData?.booking_destination ??
        createdData?.booking_destination ??
        "",

      pickUpLocationType:
        reviewBackendData?.pickup_location_type ??
        createdData?.pickup_location_type ??
        "",
      dropOffLocationType:
        reviewBackendData?.dropoff_location_type ??
        createdData?.dropoff_location_type ??
        "",
      pickupLocation:
        reviewBackendData?.pickup_location ??
        createdData?.pickup_location ??
        "",
      dropOffLocation:
        reviewBackendData?.dropoff_location ??
        createdData?.dropoff_location ??
        "",
      rentalPackageMilestone:
        reviewBackendData?.rental_package_milestone ??
        createdData?.rental_package_milestone ??
        "",
      bookingDistanceMilestone:
        reviewBackendData?.booking_distance_milestone ??
        createdData?.booking_distance_milestone ??
        "",
      R_P_range_start:
        reviewBackendData?.rental_package_range_start ??
        createdData?.rental_package_range_start ??
        "",
      R_P_range_end:
        reviewBackendData?.rental_package_range_end ??
        createdData?.rental_package_range_end ??
        "",
      B_D_range_start:
        reviewBackendData?.booking_distance_range_start ??
        createdData?.booking_distance_range_start ??
        "",
      B_D_range_end:
        reviewBackendData?.booking_distance_range_end ??
        createdData?.booking_distance_range_end ??
        "",
      outstationPackageMilestone:
        reviewBackendData?.booking_distance_range_end ??
        createdData?.booking_distance_range_end ??
        "",
      O_P_D_range_start:
        reviewBackendData?.outstation_package_range_start ??
        createdData?.outstation_package_range_start ??
        "",
      O_P_D_range_end:
        reviewBackendData?.outstation_package_range_end ??
        createdData?.outstation_package_range_end ??
        "",
    },

    validationSchema: Yup.object().shape({
      coupounCode: Yup.string().required(
        "Please Complete All The Above Fields"
      ),
      couponTitle: Yup.string().required(),
      couponDescription: Yup.string().required(),
      accountsApplicableLimit: Yup.string()
        .matches(intNumRegex, "invalid")
        .required(),
      usageLimitPerAccount: Yup.string().required(),
      discount: discountRequired,
      maxAmountInRs: maxAmountInRsRequired,
      cashback: cashbackRequired,
      maxCashbackInRs: cashbackRequired,
      couponLifeSpan: couponLifeSpanRequired,
      startDate: Yup.string().required("Please Complete All The Above Fields"),
      startTime: Yup.string().required("Please Complete All The Above Fields"),
      expiryDate: Yup.string().required("Please Complete All The Above Fields"),
      // expiryTime: Yup.string().required("Please Complete All The Above Fields"),
      expiryTime: Yup.string().when(['startDate', 'expiryDate'], (startDate, expiryDate, schema) => {
        if (startDate && expiryDate && startDate === expiryDate) {
          return schema.test({
            name: 'greaterThanStartTime',
            message: 'Expiry time should be greater than start time',
            test: function (value) {
              const startTime = this.resolve(Yup.ref('startTime'));
              return value > startTime;
            }
          });
        }
        return schema;
      }).required("Please Complete All The Above Fields"),

      bookingType: Yup.string().required(
        "Please Complete All The Above Fields"
      ),
      // rideType: Yup.object().shape({
      //   Bike: Yup.boolean(),
      //   Auto: Yup.boolean(),
      //   Mini: Yup.boolean(),
      //   Sedan: Yup.boolean(),
      //   Suv: Yup.boolean(),
      //   PremiumSedan: Yup.boolean(),
      //   Luxury: Yup.boolean(),
      //   KaaliPeeli: Yup.boolean(),
      //   altleastOne: Yup.boolean().when(
      //     [
      //       "Bike",
      //       "Auto",
      //       "Mini",
      //       "Sedan",
      //       "Suv",
      //       "PremiumSedan",
      //       "Luxury",
      //       "KaaliPeeli",
      //     ],
      //     {
      //       is: (
      //         Bike,
      //         Auto,
      //         Mini,
      //         Sedan,
      //         Suv,
      //         PremiumSedan,
      //         Luxury,
      //         KaaliPeeli
      //       ) =>
      //         !Bike &&
      //         !Auto &&
      //         !Mini &&
      //         !Sedan &&
      //         !Suv &&
      //         !PremiumSedan &&
      //         !Luxury &&
      //         !KaaliPeeli,
      //       then: Yup.boolean().required("Atleast one is required"),
      //       otherwise: Yup.boolean(),
      //     }
      //   ),
      // }),
      rideType: Yup.array(),
      rideTypeId: Yup.array()
        .min(1, "Please select at least one option")
        .required("Please fill all the required fields*"),
      paymentMethod:
        reviewData?.coupon_classification === "PaymentMethod" ||
        couponData?.couponClassification === "PaymentMethod"
          ? Yup.string().required("Please fill this field to proceed")
          : Yup.string(),
      amountOff: couponTypeRequired,
      bookingDestinationType: bookingDestinationRequired,
      bookingDestination: Yup.array().when(["bookingDestinationType"], {
        is: (bookingDestinationType) =>
          bookingDestinationType == "SpecialZone" ||
          bookingDestinationType == "LocalDefinedCity" ||
          bookingDestinationType == "OutstationDefinedCity",
        then: Yup.array()
          .min(1, "Please fill All  the fields to proceed")
          .required("Please fill All  the fields to proceed"),
        otherwise: Yup.array().nullable(),
      }),
      pickUpLocationType: pickUpLocationRequired,
      dropOffLocationType: pickUpLocationRequired,
      pickupLocation: Yup.string().when(["pickUpLocationType"], {
        is: (pickUpLocationType) =>
          pickUpLocationType == "localDefinedCity" ||
          pickUpLocationType == "SpecialZone",
        then: Yup.string().required("Please fill All  the fields to proceed"),
        otherwise: Yup.string(),
      }),
      dropOffLocation: Yup.string().when(["dropOffLocationType"], {
        is: (dropOffLocationType) =>
          dropOffLocationType == "localDefinedCity" ||
          dropOffLocationType == "SpecialZone",
        then: Yup.string().required("Please fill All  the fields to proceed"),
        otherwise: Yup.string(),
      }),
      rentalPackageMilestone: rentalPackageMilestoneRequired,
      bookingDistanceMilestone: bookingDistanceMilestoneRequired,
      R_P_range_start: R_P_range_startRequired,
      R_P_range_end: R_P_range_startRequired,
      B_D_range_start: B_D_range_startRequired,
      B_D_range_end: B_D_range_startRequired,
      O_P_D_range_start: O_P_D_range_startRequired,
      O_P_D_range_end: O_P_D_range_startRequired,
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoading(true);
      const createData = {
        user_type: "Rider",
        coupon_classification: couponData?.couponClassification,
        coupon_type: couponData?.couponType,
        coupon_code: values?.coupounCode.toUpperCase(),
        coupon_title: values?.couponTitle,
        coupon_description: values?.couponDescription,
        account_applicable_limit: values?.accountsApplicableLimit,
        usage_limit_per_account: values?.usageLimitPerAccount,
        discount: values?.discount,
        max_amount_in_rs: values?.maxAmountInRs,
        amountoff: values?.amountOff,
        cashback: values?.cashback,
        max_cashback_in_rs: values?.maxCashbackInRs,
        booking_type: values?.bookingType,
        ride_type: values?.rideType,
        ride_type_id: values?.rideTypeId,
        start_date: values?.startDate,
        start_time: values?.startTime,
        expiry_date: values?.expiryDate,
        expiry_time: values?.expiryTime,
      };
      if ((type = "createRiderCoupon")) {
        if (statusBtn === "CreateCoupon") {
          if (couponData?.couponClassification === "General") {
            dispatch(
              createCouponAction?.createGeneralAction(
                {
                  ...createData,
                  coupon_applicable_zone: couponData?.couponApplicableZone,
                },
                onSuccess,
                onError
              )
            );
          } else if (couponData?.couponClassification === "NewAccount") {
            dispatch(
              createCouponAction?.createNewAccountAction(
                createData,
                onSuccess,
                onError
              )
            );
          } else if (
            couponData?.couponClassification === "NewAccountLifeSpan"
          ) {
            dispatch(
              createCouponAction?.createNewAccountLifeSpanAction(
                { ...createData, coupon_life_span: values?.couponLifeSpan },
                onSuccess,
                onError
              )
            );
          } else if (couponData?.couponClassification === "PaymentMethod") {
            dispatch(
              createCouponAction?.createPaymentMethodAction(
                {
                  ...createData,
                  coupon_applicable_zone: couponData?.couponApplicableZone,
                  payment_method: values?.paymentMethod,
                },
                onSuccess,
                onError
              )
            );
          } else if (
            couponData?.couponClassification === "BookingDestination"
          ) {
            dispatch(
              createCouponAction?.createBookingDestinationAction(
                {
                  ...createData,
                  coupon_applicable_zone: couponData?.couponApplicableZone,
                  booking_pickup_location: mainZoneId,
                  booking_destination_type: values?.bookingDestinationType,
                  booking_destination: values?.bookingDestination,
                },
                onSuccess,
                onError
              )
            );
          } else if (couponData?.couponClassification === "PickupToDropoff") {
            dispatch(
              createCouponAction?.createPickupDropoffAction(
                {
                  ...createData,
                  coupon_applicable_zone: couponData?.couponApplicableZone,
                  pickup_location_type: values?.pickUpLocationType,
                  pickup_location: values?.pickupLocation,
                  dropoff_location_type: values?.dropOffLocationType,
                  dropoff_location: values?.dropOffLocation,
                },
                onSuccess,
                onError
              )
            );
          } else if (couponData?.couponClassification === "RentalPackage") {
            dispatch(
              createCouponAction?.createRentalPackageAction(
                {
                  ...createData,
                  coupon_applicable_zone: couponData?.couponApplicableZone,
                  coupon_classification_details:
                    couponData?.couponClassificationDetails,
                  rental_package_milestone: values?.rentalPackageMilestone,
                  rental_package_range_start: values?.R_P_range_start,
                  rental_package_range_end: values?.R_P_range_end,
                },
                onSuccess,
                onError
              )
            );
          } else if (couponData?.couponClassification === "BookingDistance") {
            dispatch(
              createCouponAction?.createBookingDistanceAction(
                {
                  ...createData,
                  coupon_applicable_zone: couponData?.couponApplicableZone,
                  coupon_classification_details:
                    couponData?.couponClassificationDetails,
                  booking_distance_milestone: values?.bookingDistanceMilestone,
                  booking_distance_range_start: values?.B_D_range_start,
                  booking_distance_range_end: values?.B_D_range_end,
                },
                onSuccess,
                onError
              )
            );
          } else if (
            couponData?.couponClassification === "OutstationPackageDistance"
          ) {
            dispatch(
              createCouponAction?.createOutstationPackageAction(
                {
                  ...createData,
                  coupon_applicable_zone: couponData?.couponApplicableZone,
                  coupon_classification_details:
                    couponData?.couponClassificationDetails,
                  outstation_package_range_start: values?.O_P_D_range_start,
                  outstation_package_range_end: values?.O_P_D_range_end,
                },
                onSuccess,
                onError
              )
            );
          }
        }
      }
      const Data = {
        coupon_id: params?.id,
        coupon_code: values?.coupounCode,
        coupon_title: values?.couponTitle,
        coupon_description: values?.couponDescription,
        account_applicable_limit: values?.accountsApplicableLimit,
        usage_limit_per_account: values?.usageLimitPerAccount,
        discount: values?.discount,
        max_amount_in_rs: values?.maxAmountInRs,
        amountoff: values?.amountOff,
        cashback: values?.cashback,
        max_cashback_in_rs: values?.maxCashbackInRs,
        booking_type: values?.bookingType,
        ride_type: values?.rideType,
        ride_type_id: values?.rideTypeId,
        start_time: values?.startTime,
        start_date: values?.startDate,
        expiry_date: values?.expiryDate,
        expiry_time: values?.expiryTime,
        is_send_notification: notificationData?.is_send_notification ?? false,
        notification_title: notificationData?.notification_title ?? "--",
        notification_body: notificationData?.notification_body ?? "--",
        is_send_sms: notificationData?.is_send_sms ?? false,
        sms_header: notificationData?.sms_header ?? "--",
        sms_body: notificationData?.sms_body ?? "--",
        broadcast_type: notificationData?.broadcast_type ?? "--",
        reminder_type: notificationData?.reminder_type ?? "--",
        reminder_time: notificationData?.reminder_time ?? "--",
        reminder_cycle: notificationData?.reminder_cycle ?? "--",
        reminder_frequency: notificationData?.reminder_frequency ?? "--",
        reminder_days: notificationData?.reminder_days ?? "--",
      };
      if (statusBtn === "SaveLater" || statusBtn === "SaveView") {
        if (status === "PendingReview" || status === "ReviewPendingUpdated") {
          if (reviewBackendData?.coupon_classification === "General") {
            dispatch(
              riderCouponAction?.generalCouponEditAction(
                Data,
                onEditSuccess,
                onEditError
              )
            );
          } else if (
            reviewBackendData?.coupon_classification === "NewAccount"
          ) {
            dispatch(
              riderCouponAction?.newAccountCouponEditAction(
                Data,
                onEditSuccess,
                onEditError
              )
            );
          } else if (
            reviewBackendData?.coupon_classification === "NewAccountLifeSpan"
          ) {
            dispatch(
              riderCouponAction?.newAccountLifeSpanCouponEditAction(
                { ...Data, coupon_life_span: values?.couponLifeSpan },
                onEditSuccess,
                onEditError
              )
            );
          } else if (
            reviewBackendData?.coupon_classification === "PaymentMethod"
          ) {
            dispatch(
              riderCouponAction?.paymentMethodCouponEditAction(
                { ...Data, payment_method: values?.paymentMethod },
                onEditSuccess,
                onEditError
              )
            );
          } else if (
            reviewBackendData?.coupon_classification === "BookingDestination"
          ) {
            dispatch(
              riderCouponAction?.bookingDestinatinCouponEditAction(
                {
                  ...Data,
                  booking_pickup_location:
                    reviewBackendData?.booking_pickup_location
                      ? reviewBackendData?.booking_pickup_location
                      : "--",
                  booking_destination_type: values?.bookingDestinationType,
                  booking_destination: values?.bookingDestination,
                },
                onEditSuccess,
                onEditError
              )
            );
          } else if (
            reviewBackendData?.coupon_classification === "PickupToDropoff"
          ) {
            dispatch(
              riderCouponAction?.pickUpDropOffCouponEditAction(
                {
                  ...Data,
                  pickup_location_type: values?.pickUpLocationType,
                  pickup_location: values?.pickupLocation,
                  dropoff_location: values?.dropOffLocation,
                  dropoff_location_type: values?.dropOffLocationType,
                },
                onEditSuccess,
                onEditError
              )
            );
          } else if (
            reviewBackendData?.coupon_classification === "BookingDistance"
          ) {
            dispatch(
              riderCouponAction?.bookingDistanceCouponEditAction(
                {
                  ...Data,
                  booking_distance_milestone: values?.bookingDistanceMilestone,
                  booking_distance_range_start: values?.B_D_range_start,
                  booking_distance_range_end: values?.B_D_range_end,
                },
                onEditSuccess,
                onEditError
              )
            );
          } else if (
            reviewBackendData?.coupon_classification === "RentalPackage"
          ) {
            dispatch(
              riderCouponAction?.rentalPackageCouponEditAction(
                {
                  ...Data,
                  rental_package_milestone: values?.rentalPackageMilestone,
                  rental_package_range_start: values?.R_P_range_start,
                  rental_package_range_end: values?.R_P_range_end,
                },
                onEditSuccess,
                onEditError
              )
            );
          } else if (
            reviewBackendData?.coupon_classification ===
            "OutstationPackageDistance"
          ) {
            dispatch(
              riderCouponAction?.outstationPackageCouponEditAction(
                {
                  ...Data,
                  outstation_package_range_start: values?.O_P_D_range_start,
                  outstation_package_range_end: values?.O_P_D_range_end,
                },
                onEditSuccess,
                onEditError
              )
            );
          }
        } else if (status === "Active") {
          dispatch(
            riderCouponAction?.activeCouponEditAction(
              {
                coupon_id: params?.id,
                account_applicable_limit: values?.accountsApplicableLimit,
                expiry_date: values?.expiryDate,
                expiry_time: values?.expiryTime,
              },
              onEditSuccess,
              onEditError
            )
          );
        }
      }
    },
  });

  console.log(formik?.values, "sdffsfs");

  const onSuccess = (data) => {
    setLoading(false);
    console.log(data);
    // dispatch(clearReducerRiderCouponAction());
    navigate("/create-broadcast", {
      state: { data, couponData },
    });
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setvalidationErrorMes(insertSpaceUnderScore(data?.data?.data));
    handleErrorMessageShow();
    console.log(data);
  };

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    console.log(data?.data);
    setReviewBackendData(data?.data);
  };

  const onFetchError = (data) => {
    setFetchLoading(false);
    console.log(data);
  };

  const onEditSuccess = (data) => {
    setReload(!reload);
    setLoading(false);
    if (formik.initialValues !== formik.values) {
      successToast(data?.message);
    }
    if (
      statusBtn === "SaveView" &&
      (errorMessage === false || errorMessage === undefined)
    ) {
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        navigate(`/coupon-review-reqired/broadcast/${reviewBackendData?.id}`, {
          state: { status, is_editable },
        });
      } else if (status === "Active") {
        navigate(`/coupon-active-broadcast/${reviewBackendData?.id}`, {
          state: { status, is_editable },
        });
      }
    }
    console.log(data);
  };

  const onEditError = (data) => {
    setReload(!reload);
    setLoading(false);
    setErrorMessage(data?.data?.data);
    errorToast(data?.data?.message);
    // errorToast(data?.data?.data);
    console.log(data);
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

  const viewFn = () => {
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      navigate(`/coupon-review-reqired/broadcast/${reviewBackendData?.id}`, {
        state: { status, is_editable },
      });
    } else if (status === "Active") {
      navigate(`/coupon-active-broadcast/${reviewBackendData?.id}`, {
        state: { status, is_editable },
      });
    } else if (status === "Rejected") {
      navigate(`/coupon-rejected-broadcast/${reviewBackendData?.id}`, {
        state: { status, is_editable },
      });
    } else if (status === "Deleted") {
      navigate(`/coupon-deleted-broadcast/${reviewBackendData?.id}`, {
        state: { status, is_editable },
      });
    } else if (status === "Expired") {
      navigate(`/coupon-expired-broadcast/${reviewBackendData?.id}`, {
        state: { status, is_editable },
      });
    }
  };

  const usageLimitPerAccount = Array.from({ length: 4 }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

  const bookingType = [
    { value: "Local", label: "Local" },
    { value: "Rental", label: "Rental" },
    { value: "OneWayOutstation", label: "OneWay Outstation" },
    { value: "RoundTripOutstation", label: "RoundTrip Outstation" },
  ];

  // const [resetRidetype, setResetRidetype] = useState(false);

  // useEffect(() => {
  //   if (reviewBackendData !== undefined) {
  //     const rideTypeListName = Object?.keys(
  //       reviewBackendData?.ride_type
  //     ).filter((key) => reviewBackendData?.ride_type[key]);
  //     setRideTypeApplicableValue(rideTypeListName);
  //   }
  //   if (formik?.values?.bookingType !== formik?.initialValues?.bookingType) {
  //     formik.setFieldValue("rideType.Bike", false);
  //     formik.setFieldValue("rideType.Auto", false);
  //     formik.setFieldValue("rideType.Mini", false);
  //     formik.setFieldValue("rideType.Sedan", false);
  //     formik.setFieldValue("rideType.Suv", false);
  //     formik.setFieldValue("rideType.PremiumSedan", false);
  //     formik.setFieldValue("rideType.Luxury", false);
  //     formik.setFieldValue("rideType.KaaliPeeli", false);
  //     setRideTypeApplicableValue("");
  //   }
  // }, [reviewBackendData, resetRidetype, formik?.values?.bookingType]);

  // const [rideTypeApplicableValue, setRideTypeApplicableValue] = useState([]);

  const [dropDowRideType, setDropDownRideType] = useState(false);

  const [couponDetails, setCouponDetails] = useState(false);

  console.log(formik?.values, "ashdajdad");

  // sidebardata
  const [zonenameloading, setZoneNameLoading] = useState(false);
  const [mainZonelist, setMainZonelist] = useState([]);
  const [moreZone, setMoreZone] = useState(false);

  useEffect(() => {
    setZoneNameLoading(true);
    dispatch(
      couponMainZoneListAction(onMainZoneListSuccess, onMainZoneListError)
    );
  }, []);

  const onMainZoneListSuccess = (data) => {
    setZoneNameLoading(false);
    setMainZonelist(
      data?.data?.map((item) => {
        return { label: item?.zone_name, value: item?.id };
      })
    );
  };

  const onMainZoneListError = () => {
    setZoneNameLoading(false);
  };

  const couponApplicableZone =
    reviewBackendData?.coupon_applicable_zone ||
    couponData?.couponApplicableZone ||
    [];

  const zoneName = mainZonelist
    ?.filter((item) => couponApplicableZone.includes(item.value))
    ?.map((item) => item.label);

  const sideBarData = [
    {
      label: "Coupon ID",
      value: reviewBackendData?.coupon_id ?? "--",
    },
    { label: "User Type", value: "Rider" },
    {
      label: "Coupon Classification",
      value: reviewBackendData?.coupon_classification
        ? insertSpaces(reviewBackendData?.coupon_classification)
        : couponData?.couponClassification
        ? insertSpaces(couponData?.couponClassification)
        : "N/A",
    },
    {
      label: "Coupon Classification Details",
      value:
        reviewBackendData?.coupon_classification_details ??
        couponData?.couponClassificationDetails ??
        "N/A",
    },
    {
      label: "Coupon Applicable Zone",
      value: zonenameloading ? (
        <SpinnerLoading />
      ) : zoneName?.length > 1 ? (
        <span className="d-flex align-items-center gap-1">
          All{" "}
          <span>
            <i
              className="ri-information-fill cursor_pointer"
              onClick={() => setMoreZone(!moreZone)}
            />
          </span>
        </span>
      ) : zoneName.length ? (
        zoneName
      ) : (
        "N/A"
      ),
    },
    {
      label: "Coupon Type",
      value: reviewBackendData?.coupon_type
        ? insertSpaces(reviewBackendData?.coupon_type)
        : couponData?.couponType
        ? insertSpaces(couponData?.couponType)
        : "--",
    },
  ];

  const editCondition =
    is_editable === false ||
    status === "Active" ||
    status === "ReviewPendingUpdated";

  const expiryDate = useExpiryDate(
    reviewBackendData?.coupon_life_span,
    reviewBackendData?.expiry_date,
    reviewBackendData?.expiry_time
  );

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  console.log(formik.values, "jhgjkg");

  console.log(reviewBackendData?.expiry_date, "jhgjhgjkhgkj");

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setCouponDetails,
  });

  return (
    <>
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title={validationErrorMes}
      />
      <RiderCouponPassword
        couponPasswordShow={couponPasswordShow}
        handleCouponPasswordClose={handleCouponPasswordClose}
        id={params?.id}
        status={statusBtn}
        title={"Are you sure you want to Delete this coupon?"}
      />
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
      />
      <InnerLayout
        mainHeading={
          reviewBackendData?.coupon_title
            ? reviewBackendData?.coupon_title +
              " - " +
              reviewBackendData?.coupon_code
            : "Create New Coupon"
        }
        navigateEnable={false}
        naviagteLeave={true}
        navigateFn={leavePageFn}
        expiryDateShow={true}
        expiryDate={
          fetchLoading
            ? ``
            : type === "createRiderCoupon"
            ? ``
            : `Coupon Exp : ${expiryDate}`
        }
      >
        {fetchLoading ? (
          <LoadingSpinnerTable />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="row gx-0 ">
              <div className="col-lg-3">
                <CouponSidebar
                  sideBarData={sideBarData}
                  moreZone={moreZone}
                  zoneName={zoneName}
                />
              </div>
              <div className="col-lg-9">
                <div className=" discount_detials_container mt-2 px-3 p-2 position-relative">
                  {type !== "createRiderCoupon" ? (
                    <>
                      <div
                        className="position-absolute top-0 end-0 mt-1 me-3 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                        onClick={() => setCouponDetails(!couponDetails)}
                        ref={onClickRef}
                      >
                        More Details
                      </div>
                      {couponDetails ? (
                        <>
                          <div
                            className="coupon_details_block border white_bg border_radius"
                            ref={insideClickRef}
                          >
                            <CouponDetails item={reviewBackendData} />
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                  {reviewBackendData?.coupon_classification ===
                    "PaymentMethod" ||
                  couponData?.couponClassification === "PaymentMethod" ? (
                    <PaymentMethod
                      formik={formik}
                      editCondition={editCondition}
                    />
                  ) : reviewBackendData?.coupon_classification ===
                      "BookingDestination" ||
                    couponData?.couponClassification ===
                      "BookingDestination" ? (
                    <ReviewBookingDestination
                      formik={formik}
                      is_editable={is_editable}
                      editCondition={editCondition}
                      coupon_applicable_zone={
                        reviewBackendData?.coupon_applicable_zone ??
                        couponData?.couponApplicableZone
                      }
                      zonenameloading={zonenameloading}
                      zoneName={zoneName}
                    />
                  ) : reviewBackendData?.coupon_classification ===
                      "PickupToDropoff" ||
                    couponData?.couponClassification === "PickupToDropoff" ? (
                    <ReviewPickUpDropOffLocation
                      formik={formik}
                      status={status}
                      is_editable={is_editable}
                      coupon_applicable_zone={
                        reviewBackendData?.coupon_applicable_zone ??
                        couponData?.couponApplicableZone
                      }
                    />
                  ) : (reviewBackendData?.coupon_classification ===
                      "RentalPackage" &&
                      reviewBackendData?.coupon_classification_details ===
                        "Milestone") ||
                    (couponData?.couponClassification === "RentalPackage" &&
                      couponData?.couponClassificationDetails ===
                        "Milestone") ? (
                    <RentalPackage
                      formik={formik}
                      editCondition={editCondition}
                    />
                  ) : (reviewBackendData?.coupon_classification ===
                      "BookingDistance" &&
                      reviewBackendData?.coupon_classification_details ===
                        "Milestone") ||
                    (couponData?.couponClassification === "BookingDistance" &&
                      couponData?.couponClassificationDetails ===
                        "Milestone") ? (
                    <BookingDistance
                      formik={formik}
                      editCondition={editCondition}
                    />
                  ) : (reviewBackendData?.coupon_classification ===
                      "RentalPackage" &&
                      reviewBackendData?.coupon_classification_details ===
                        "Range") ||
                    (couponData?.couponClassification === "RentalPackage" &&
                      couponData?.couponClassificationDetails === "Range") ? (
                    <RentalPackageRange
                      formik={formik}
                      editCondition={editCondition}
                    />
                  ) : (reviewBackendData?.coupon_classification ===
                      "BookingDistance" &&
                      reviewBackendData?.coupon_classification_details ===
                        "Range") ||
                    (couponData?.couponClassification === "BookingDistance" &&
                      couponData?.couponClassificationDetails === "Range") ? (
                    <BookingDistanceRange
                      formik={formik}
                      editCondition={editCondition}
                    />
                  ) : (reviewBackendData?.coupon_classification ===
                      "OutstationPackageDistance" &&
                      reviewBackendData?.coupon_classification_details ===
                        "Milestone") ||
                    (couponData?.couponClassification ===
                      "OutstationPackageDistance" &&
                      couponData?.couponClassificationDetails ===
                        "Milestone") ? (
                    <OutstationPackage
                      formik={formik}
                      editCondition={editCondition}
                    />
                  ) : (reviewBackendData?.coupon_classification ===
                      "OutstationPackageDistance" &&
                      reviewBackendData?.coupon_classification_details ===
                        "Range") ||
                    (couponData?.couponClassification ===
                      "OutstationPackageDistance" &&
                      couponData?.couponClassificationDetails === "Range") ? (
                    <OutstationPackageRange
                      formik={formik}
                      editCondition={editCondition}
                    />
                  ) : (
                    <></>
                  )}
                  <span className=" primary_color fs_16 fw_500">
                    Discount Details
                  </span>
                  <div className="row mt-2 ">
                    <div className="col-sm-6 ">
                      <CouponInputField
                        labelName="Coupon Code*"
                        itemName={"coupounCode"}
                        inputValue={formik.values.coupounCode}
                        onChangeFn={(e) => {
                          formik.handleChange(e);
                          setErrorMessage(false);
                        }}
                        onBlurFn={formik.handleBlur}
                        formikError={formik.errors.coupounCode}
                        formikTouched={formik.touched.coupounCode}
                        placeholder="Enter coupon code"
                        inputDisabled={editCondition}
                        inputClassName="text-uppercase"
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
                        placeholder="Enter coupon code"
                        inputDisabled={editCondition}
                      />
                    </div>
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
                      inputDisabled={editCondition}
                    />
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-6">
                          <CouponInputField
                            labelName="Accounts Applicable Limit*"
                            itemName={"accountsApplicableLimit"}
                            inputValue={formik.values.accountsApplicableLimit}
                            onChangeFn={formik.handleChange}
                            onBlurFn={formik.handleBlur}
                            formikError={formik.errors.accountsApplicableLimit}
                            formikTouched={
                              formik.touched.accountsApplicableLimit
                            }
                            placeholder="Enter applicable limit"
                            inputDisabled={is_editable === false ? true : false}
                          />
                        </div>
                        <div className="col-6">
                          <CouponSelectField
                            labelName="Usage Limit Per Account*"
                            placeholder="Select Usage Limit Per Account"
                            option={usageLimitPerAccount}
                            itemName="usageLimitPerAccount"
                            formikValue={formik.values.usageLimitPerAccount}
                            formik={formik}
                            formikError={formik.errors.usageLimitPerAccount}
                            formikTouched={formik.touched.usageLimitPerAccount}
                            selectDisabled={editCondition}
                          />
                        </div>
                      </div>

                      {(reviewBackendData?.coupon_type === "XAmountOff" ||
                        couponData?.couponType === "XAmountOff") && (
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
                              inputDisabled={editCondition}
                            />
                          </div>
                          <div className="col-6 "></div>
                        </div>
                      )}
                      {(reviewBackendData?.coupon_type === "X%DiscountUpToY" ||
                        couponData?.couponType === "X%DiscountUpToY") && (
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
                              inputDisabled={editCondition}
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
                              inputDisabled={editCondition}
                            />
                          </div>
                        </div>
                      )}
                      {(reviewBackendData?.coupon_type === "X%CashbackUpToY" ||
                        couponData?.couponType === "X%CashbackUpToY") && (
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
                              inputDisabled={editCondition}
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
                              inputDisabled={editCondition}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-6">
                      {(reviewBackendData?.coupon_classification ===
                        "NewAccountLifeSpan" ||
                        couponData?.couponClassification ===
                          "NewAccountLifeSpan") && (
                        <CouponInputField
                          labelName="Coupon Life Span(Days)*"
                          itemName={"couponLifeSpan"}
                          inputValue={formik.values.couponLifeSpan}
                          onChangeFn={formik.handleChange}
                          onBlurFn={formik.handleBlur}
                          formikError={formik.errors.couponLifeSpan}
                          formikTouched={formik.touched.couponLifeSpan}
                          placeholder="Enter max cashback"
                          inputDisabled={editCondition}
                        />
                      )}
                    </div>
                  </div>

                  <div className="row  mt-2">
                    <div className="col-md-6">
                      <CouponSelectField
                        labelName="Booking Type*"
                        placeholder="Select Booking Type"
                        option={bookingType}
                        itemName="bookingType"
                        formikValue={formik.values.bookingType}
                        formik={formik}
                        formikError={formik.errors.bookingType}
                        formikTouched={formik.touched.bookingType}
                        selectDisabled={editCondition}
                      />
                    </div>
                    <div className="col-md-6 position-relative">
                      <label
                      // className={
                      //   formik.errors.rideType?.altleastOne &&
                      //   formik.touched.rideType?.altleastOne
                      //     ? "fs_14 red_color"
                      //     : "fs_14 primary_color"
                      // }
                      >
                        Ride Type*
                      </label>

                      <div
                        onClick={() => {
                          setDropDownRideType(
                            editCondition ? false : !dropDowRideType
                          );
                        }}
                      >
                        {/* <input
                          className={
                            formik.errors.rideType?.altleastOne &&
                            formik.touched.rideType?.altleastOne
                              ? `w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 ${
                                  editCondition
                                    ? "disabled_bg_color secondary_color"
                                    : "white_bg primary_color "
                                }`
                              : `w-100 coupon_placeholder_rideType_text  pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 ${
                                  editCondition
                                    ? "disabled_border disabled_bg_color secondary_color"
                                    : "white_bg primary_color primary_border"
                                }`
                          }
                          value={rideTypeApplicableValue}
                          placeholder="Select Ride Type"
                          disabled
                        /> */}

                        <input
                          type="text"
                          value={selectedRideType
                            ?.map((option) => {
                              const rideTypeOption = rideTypeOptions?.find(
                                (item) => item.value === option
                              );
                              return rideTypeOption ? rideTypeOption.label : "";
                            })
                            .filter((label) => label !== "")
                            .join(", ")}
                          readOnly
                          placeholder="Selected values"
                          onClick={() => {
                            setDropDownRideType(
                              editCondition ? false : !dropDowRideType
                            );
                          }}
                          className={
                            formik.errors.rideTypeId &&
                            formik.touched.rideTypeId
                              ? `w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 ${
                                  editCondition
                                    ? "disabled_bg_color secondary_color"
                                    : "white_bg primary_color "
                                }`
                              : `w-100 coupon_placeholder_rideType_text  pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 ${
                                  editCondition
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
                        selectedRideType={selectedRideType}
                        filteredRideTypeOption={filteredRideTypeOption}
                        setSelectedRideType={setSelectedRideType}
                        setselectedRideTypeLabel={setselectedRideTypeLabel}
                        handleReset={handleReset}
                      />
                    </div>
                  </div>
                </div>
                <CampaignDetailsInput
                  formik={formik}
                  campaignStatus={reviewBackendData?.campaign_status ?? "--"}
                  is_editable={is_editable}
                  status={status}
                />
                {firstErrorField && (
                  <div className="red_color fs_16 fw_500 ps-3">
                    {formik.errors[firstErrorField]}
                  </div>
                )}
              </div>
            </div>

            {is_editable === false || is_editable === true ? (
              <>
                {status === "Active" ? (
                  <EditReferralBtn
                    backButton={true}
                    backBtn={leavePageFn}
                    resetBtn={() => {
                      formik.resetForm();
                    }}
                    saveViewBtn={() => setStatusBtn("SaveView")}
                    saveForLater={false}
                    DeleteButton={true}
                    deleteBtnFn={() => {
                      setStatusBtn("Delete");
                      handleCouponPasswordShow();
                    }}
                    is_editable={is_editable}
                    viewBtn={viewFn}
                    viewBtnText="View Broadcast"
                  />
                ) : (
                  <EditReferralBtn
                    backButton={true}
                    backBtn={leavePageFn}
                    saveLaterBtn={() => setStatusBtn("SaveLater")}
                    saveViewBtn={() => setStatusBtn("SaveView")}
                    is_editable={is_editable}
                    viewBtn={viewFn}
                    resetBtn={() => {
                      formik.resetForm();
                      // setResetRidetype(!resetRidetype);
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
                submitBtn={() => setStatusBtn("CreateCoupon")}
              />
            )}
          </form>
        )}
      </InnerLayout>
    </>
  );
};

export default RiderCouponDetails;
