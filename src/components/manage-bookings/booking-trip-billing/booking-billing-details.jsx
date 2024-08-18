import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BookingsRiderDetails from "./billing-details/bookings-rider-details";
import BookingRiderPayDetails from "./billing-details/bookingRiderPayDetails";
import DriverBillings from "./billing-details/driver-billing";
import BookingDriverFine from "./billing-details/BookingDriverFine";
import ComrideBillingDetails from "./billing-details/ComrideBillingDetails";
import "../../../components/manage-bookings/manage-bookingsComponents.css";
import "../../../modules/manage-bookings/manageBookings.css";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import FinalOdometer from "../Booking-Modals/FinalOdometer";
import InitialOdometer from "../Booking-Modals/InitialOdometer";
import PaymentUpdateModal from "../Booking-Modals/PaymentUpdateModal";
import BillingUpdateModal from "../Booking-Modals/BillingUpdateModal";
import BookingRefundRequest from "../Booking-Modals/BookingRefundRequest";
import BookingCancelRefund from "../Booking-Modals/BookingCancelRefund";
import BookingCancelDriverFine from "../Booking-Modals/BookingCancelDriverFine";
import RiderBilling from "./billing-details/riderBilling";
import { formatAmount, numRegex } from "../../helper";
import usePermissions from "../../usePermissionChecker";
import { BlobProvider } from "@react-pdf/renderer";
import RiderInvoicePdf from "../../invoices/rider-invoice/rider-invoice-pdf";
import DetailedInvoicePdf from "../../invoices/detailed-invoice/detailed-invoice-pdf";
import { tripInvoiceAction } from "../../../redux/actions/invoiceAction";
import errorToast from "../../utilits/errorToast";
import { useDispatch } from "react-redux";
import DownloadIcon from "../../../assets/icons/download-icon";
import ArrowDownIcon from "../../../assets/icons/arrowDownIcon";

const BookingBillingDetails = ({
  billingDetailsEdit,
  setBillingDetailsEdit,
  BookingData,
  BookingTable,
  setBookingTable,
  type = "",
}) => {
  console.log(type,"adjusted_bookingssss", BookingData?.tripInformation?.booking_type);
  const dispatch = useDispatch();
  const { canWrite } = usePermissions();
  const pagePermissions = {
    Ongoing_Bookings: "ongoing_booking_requests",
    Completed_Bookings: "completed_booking",
    Cancelled_Bookings: "cancelled_booking",
    Accident_Bookings: "accident_booking",
    Adjusted_Bookings: "adjusted_booking",
  };
  const permission = pagePermissions[type];
  const riderBillingData = BookingData?.billingDetails?.rider_billing;

  const [PaymentMethodShow, setPaymentMethodShow] = useState(false);
  const handlePaymentMethodClose = () => setPaymentMethodShow(false);
  const handlePaymentMethodShow = () => setPaymentMethodShow(true);

  const [billingDetailsUpdateShow, setBillingDetailsUpdateShow] =
    useState(false);
  const handleBillingDetailsUpdateClose = () =>
    setBillingDetailsUpdateShow(false);
  const handleBillingDetailsUpdateShow = () =>
    setBillingDetailsUpdateShow(true);
  const [initialOdometerShow, setInitialOdometerShow] = useState(false);
  const handleInitialOdometerClose = () => setInitialOdometerShow(false);
  const handleInitialOdometerShow = () => setInitialOdometerShow(true);
  const [createdRefund, setcreatedRefund] = useState(false);
  const [cancelRefund, setCancelRefund] = useState(false);
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [FinalOdometerShow, setFinalOdometerShow] = useState(false);
  const handleFinalOdometerClose = () => setFinalOdometerShow(false);
  const handleFinalOdometerShow = () => setFinalOdometerShow(true);
  const [refundShow, setrefundShow] = useState(false);
  const handleRefundClose = () => setrefundShow(false);
  const handlerefundShow = () => setrefundShow(true);
  const [driverFineShow, setDriverFineShow] = useState(false);
  const handleDriverFineClose = () => setDriverFineShow(false);
  const handleDriverFineShow = () => setDriverFineShow(true);
  const [driverFine, setDriverFine] = useState(false);
  const [cancelRefundShow, setCancelRefundShow] = useState(false);
  const handleCancelRefundClose = () => setCancelRefundShow(false);
  const handleCancelRefundShow = () => setCancelRefundShow(true);
  const [downloadInvoiceShow, setDownloadInvoiceShow] = useState(false);
  const [editDisabelBtn, setEditDisabelBtn] = useState(false);
  const [compalaintsCount, setCompalaintsCount] = useState(0);
  // const [disableBtn, setDisableBtn] = useState({
  //   odometerUpdateDisabled: false,
  //   editDisable: false,
  // });

  const LocalTripformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      paymentMethod: BookingData?.billingDetails?.rider_details?.PaymentMethod
        ? BookingData?.billingDetails?.rider_details?.PaymentMethod
        : "",
      baseFare:
        riderBillingData?.base_fare !== null
          ? parseFloat(riderBillingData?.base_fare).toFixed(2)
          : "",
      cancellationFee:
        riderBillingData?.cancellation_fee !== null
          ? parseFloat(riderBillingData?.cancellation_fee).toFixed(2)
          : "",
      distanceFare:
        riderBillingData?.distance_fare !== null
          ? parseFloat(riderBillingData?.distance_fare).toFixed(2)
          : "",
      TimeFare:
        riderBillingData?.time_fare !== null
          ? parseFloat(riderBillingData?.time_fare).toFixed(2)
          : "",
      WaitingFee:
        riderBillingData?.waiting_fee !== null
          ? parseFloat(riderBillingData?.waiting_fee).toFixed(2)
          : "",
      TripFare:
        riderBillingData?.trip_fare !== null
          ? parseFloat(riderBillingData?.trip_fare).toFixed(2)
          : "",
      TripFareAfterCouponSavings:
        riderBillingData?.trip_fare_after_coupon !== null
          ? parseFloat(riderBillingData?.trip_fare_after_coupon).toFixed(2)
          : "",
      BookingFee:
        riderBillingData?.booking_fee !== null
          ? parseFloat(riderBillingData?.booking_fee).toFixed(2)
          : "",
      TotalAmountReceived:
        riderBillingData?.total_amount_recevied !== null
          ? parseFloat(riderBillingData?.total_amount_recevied).toFixed(2)
          : "",
    },

    validationSchema: Yup.object({
      paymentMethod: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.action === "update") {
        handleBillingDetailsUpdateShow();
      }
    },
  });
  const RentalTripformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      paymentMethod: BookingData?.billingDetails?.rider_details?.PaymentMethod
        ? BookingData?.billingDetails?.rider_details?.PaymentMethod
        : "",
      baseFare:
        riderBillingData?.base_fare !== null
          ? parseFloat(riderBillingData?.base_fare).toFixed(2)
          : "",
      cancellationFee:
        riderBillingData?.cancellation_fee !== null
          ? parseFloat(riderBillingData?.cancellation_fee).toFixed(2)
          : "",
      ExtraKmFare:
        riderBillingData?.extra_km_fare !== null
          ? parseFloat(riderBillingData?.extra_km_fare).toFixed(2)
          : "",
      ExtraTimeFareMins:
        riderBillingData?.extra_time_fare !== null
          ? parseFloat(riderBillingData?.extra_time_fare).toFixed(2)
          : "",
      WaitingFee:
        riderBillingData?.waiting_fee !== null
          ? parseFloat(riderBillingData?.waiting_fee).toFixed(2)
          : "",
      TripFare:
        riderBillingData?.trip_fare !== null
          ? parseFloat(riderBillingData?.trip_fare).toFixed(2)
          : "",
      TripFareAfterCouponSavings:
        riderBillingData?.trip_fare_after_coupon !== null
          ? parseFloat(riderBillingData?.trip_fare_after_coupon).toFixed(2)
          : "",
      BookingFee:
        riderBillingData?.booking_fee !== null
          ? parseFloat(riderBillingData?.booking_fee).toFixed(2)
          : "",
      TotalAmountReceived:
        riderBillingData?.total_amount_recevied !== null
          ? parseFloat(riderBillingData?.total_amount_recevied).toFixed(2)
          : "",
    },

    validationSchema: Yup.object({
      paymentMethod: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.action === "update") {
        handleBillingDetailsUpdateShow();
      }
    },
  });
  const oneWayTripformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      paymentMethod: BookingData?.billingDetails?.rider_details?.PaymentMethod
        ? BookingData?.billingDetails?.rider_details?.PaymentMethod
        : "",
      baseFare:
        riderBillingData?.base_fare !== null
          ? parseFloat(riderBillingData?.base_fare).toFixed(2)
          : "",
      cancellationFee:
        riderBillingData?.cancellation_fee !== null
          ? parseFloat(riderBillingData?.cancellation_fee).toFixed(2)
          : "",
      RemainingKmFare:
        riderBillingData?.remaining_km_fare !== null
          ? parseFloat(riderBillingData?.remaining_km_fare).toFixed(2)
          : "",
      RemainingTimeFare:
        riderBillingData?.remaining_time_fare !== null
          ? parseFloat(riderBillingData?.remaining_time_fare).toFixed(2)
          : "",
      ExtraKmFare:
        riderBillingData?.extra_km_fare !== null
          ? parseFloat(riderBillingData?.extra_km_fare).toFixed(2)
          : "",
      ExtraTimeFareHrs:
        riderBillingData?.extra_time_fare !== null
          ? parseFloat(riderBillingData?.extra_time_fare).toFixed(2)
          : "",
      WaitingFee:
        riderBillingData?.waiting_fee !== null
          ? parseFloat(riderBillingData?.waiting_fee).toFixed(2)
          : "",
      TripFare:
        riderBillingData?.trip_fare !== null
          ? parseFloat(riderBillingData?.trip_fare).toFixed(2)
          : "",
      TripFareAfterCouponSavings:
        riderBillingData?.trip_fare_after_coupon !== null
          ? parseFloat(riderBillingData?.trip_fare_after_coupon).toFixed(2)
          : "",
      BookingFee:
        riderBillingData?.booking_fee !== null
          ? parseFloat(riderBillingData?.booking_fee).toFixed(2)
          : "",
      NightAllowance:
        riderBillingData?.night_allowance !== null
          ? parseFloat(riderBillingData?.night_allowance).toFixed(2)
          : "",
      DriverAllowance:
        riderBillingData?.driver_allowance !== null
          ? parseFloat(riderBillingData?.driver_allowance).toFixed(2)
          : "",
      TotalAmountReceived:
        riderBillingData?.total_amount_recevied !== null
          ? parseFloat(riderBillingData?.total_amount_recevied).toFixed(2)
          : "",
    },

    validationSchema: Yup.object({
      paymentMethod: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.action === "update") {
        handleBillingDetailsUpdateShow();
      }
    },
  });
  const roundTripformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      paymentMethod: BookingData?.billingDetails?.rider_details?.PaymentMethod
        ? BookingData?.billingDetails?.rider_details?.PaymentMethod
        : "",
      baseFare:
        riderBillingData?.base_fare !== null
          ? parseFloat(riderBillingData?.base_fare).toFixed(2)
          : "",
      cancellationFee:
        riderBillingData?.cancellation_fee !== null
          ? parseFloat(riderBillingData?.cancellation_fee).toFixed(2)
          : "",
      RemainingKmFare:
        riderBillingData?.remaining_km_fare !== null
          ? parseFloat(riderBillingData?.remaining_km_fare).toFixed(2)
          : "",
      ExtraKmFare:
        riderBillingData?.extra_km_fare !== null
          ? parseFloat(riderBillingData?.extra_km_fare).toFixed(2)
          : "",
      ExtraTimeFareHrs:
        riderBillingData?.extra_time_fare !== null
          ? parseFloat(riderBillingData?.extra_time_fare).toFixed(2)
          : "",
      WaitingFee:
        riderBillingData?.waiting_fee !== null
          ? parseFloat(riderBillingData?.waiting_fee).toFixed(2)
          : "",
      TripFare:
        riderBillingData?.trip_fare !== null
          ? parseFloat(riderBillingData?.trip_fare).toFixed(2)
          : "",
      TripFareAfterCouponSavings:
        riderBillingData?.trip_fare_after_coupon !== null
          ? parseFloat(riderBillingData?.trip_fare_after_coupon).toFixed(2)
          : "",
      BookingFee:
        riderBillingData?.booking_fee !== null
          ? parseFloat(riderBillingData?.booking_fee).toFixed(2)
          : "",
      NightAllowance:
        riderBillingData?.night_allowance !== null
          ? parseFloat(riderBillingData?.night_allowance).toFixed(2)
          : "",
      DriverAllowance:
        riderBillingData?.driver_allowance !== null
          ? parseFloat(riderBillingData?.driver_allowance).toFixed(2)
          : "",
      TotalAmountReceived:
        riderBillingData?.total_amount_recevied !== null
          ? parseFloat(riderBillingData?.total_amount_recevied).toFixed(2)
          : "",
    },

    validationSchema: Yup.object({
      paymentMethod: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.action === "update") {
        handleBillingDetailsUpdateShow();
      }
    },
  });

  const formikData = () => {
    if (BookingData?.tripInformation?.booking_type === "LocalTrip") {
      return LocalTripformik;
    } else if (BookingData?.tripInformation?.booking_type === "RentalTrip") {
      return RentalTripformik;
    } else if (
      BookingData?.tripInformation?.booking_type === "OneWayOutstation"
    ) {
      return oneWayTripformik;
    } else if (
      BookingData?.tripInformation?.booking_type === "RoundTripOutstation"
    ) {
      return roundTripformik;
    }
  };

  const formik = formikData();
  const [disableCancelBtn, setDisableCancelBtn] = useState({
    afterOtp: false,
    beforeOtp: false,
  });

  useEffect(() => {
    setPaymentMethod(BookingData?.billingDetails?.rider_details?.PaymentMethod);
    setCompalaintsCount(
      BookingData?.complaints?.filter(
        (item) =>
          item?.InitiatedBy?.id === localStorage.getItem("id") ||
          item?.ReAssignedBy?.id === localStorage.getItem("id") ||
          item?.AssignedBy?.id === localStorage.getItem("id")
      )
    );

    if (compalaintsCount?.length === 0) {
      setEditDisabelBtn(true);
    } else {
      setEditDisabelBtn(false);
    }
    if (billingDetailsEdit === true) {
      if (
        riderBillingData?.total_amount_recevied > riderBillingData?.final_fare
      ) {
        if (
          BookingData?.billingDetails?.rider_payment_details
            ?.total_trip_fare_adjusted_amount > 0
        ) {
          setcreatedRefund(true);
        } else if (
          BookingData?.billingDetails?.rider_payment_details
            ?.amount_to_be_refunded > 0
        ) {
          setCancelRefund(true);
        }
      } else if (
        riderBillingData?.total_amount_recevied < riderBillingData?.final_fare
      ) {
        setcreatedRefund(false);
        setCancelRefund(false);
      }
    }
    if (BookingData?.tripInformation?.StartOtp === false) {
      setDisableCancelBtn({
        afterOtp: true,
        beforeOtp: false,
      });
    } else if (BookingData?.tripInformation?.StartOtp === true) {
      setDisableCancelBtn({
        afterOtp: false,
        beforeOtp: true,
      });
    }
  }, [
    billingDetailsEdit,
    compalaintsCount?.length,
    BookingData?.tripInformation?.StartOtp,
  ]);

  function DriverCancelFine() {
    if (
      formatAmount(
        BookingData?.billingDetails?.driver_fine?.fine_amount,
        null
      ) > 0
    ) {
      setDriverFine(true);
    } else {
      setDriverFine(false);
    }
  }

  console.log(canWrite(permission), "alsdkhalksdhad");

  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  function downloadInvoiceBtn() {
    if (downloadInvoiceShow === true) {
      setDownloadInvoiceShow(false);
    }
    setInvoiceLoading(true);
    if (BookingData?.tripInformation?.invoice?.id)
      dispatch(
        tripInvoiceAction(
          {
            invoice_id: BookingData?.tripInformation?.invoice?.id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
  }

  const onFetchSuccess = (data) => {
    if (downloadInvoiceShow === false) {
      setDownloadInvoiceShow(true);
    }
    setInvoiceLoading(false);
    setInvoiceData(data?.data);
  };

  const onFetchError = (data) => {
    setInvoiceLoading(false);
    // errorToast(data?.data?.data);
    errorToast("something went wrong in invoice");
  };

  return (
    <>
      <InitialOdometer
        initialOdometerShow={initialOdometerShow}
        handleInitialOdometerClose={handleInitialOdometerClose}
        BookingData={BookingData}
        BookingTable={BookingTable}
        setBookingTable={setBookingTable}
        type={type}
      />
      <FinalOdometer
        FinalOdometerShow={FinalOdometerShow}
        handleFinalOdometerClose={handleFinalOdometerClose}
        BookingData={BookingData}
        BookingTable={BookingTable}
        setBookingTable={setBookingTable}
        type={type}
      />
      <PaymentUpdateModal
        PaymentMethodShow={PaymentMethodShow}
        handlePaymentMethodClose={handlePaymentMethodClose}
        PaymentMethod={PaymentMethod}
        setPaymentMethod={setPaymentMethod}
        formikData={formikData}
        BookingData={BookingData}
        BookingTable={BookingTable}
        setBookingTable={setBookingTable}
        type={type}
      />
      <BillingUpdateModal
        billingDetailsUpdateShow={billingDetailsUpdateShow}
        handleBillingDetailsUpdateClose={handleBillingDetailsUpdateClose}
        setBillingDetailsEdit={setBillingDetailsEdit}
        formik={formik}
        BookingData={BookingData}
        BookingTable={BookingTable}
        setBookingTable={setBookingTable}
        type={type}
      />
      <BookingRefundRequest
        refundShow={refundShow}
        handleRefundClose={handleRefundClose}
        setcreatedRefund={setcreatedRefund}
        setCancelRefund={setCancelRefund}
        BookingData={BookingData}
        BookingTable={BookingTable}
        setBookingTable={setBookingTable}
        type={type}
      />
      <BookingCancelRefund
        cancelRefundShow={cancelRefundShow}
        handleCancelRefundClose={handleCancelRefundClose}
        setcreatedRefund={setcreatedRefund}
        setCancelRefund={setCancelRefund}
        BookingData={BookingData}
        BookingTable={BookingTable}
        setBookingTable={setBookingTable}
        type={type}
      />
      <BookingCancelDriverFine
        driverFineShow={driverFineShow}
        handleDriverFineClose={handleDriverFineClose}
        BookingData={BookingData}
        BookingTable={BookingTable}
        setBookingTable={setBookingTable}
        setDriverFine={setDriverFine}
        type={type}
      />

      <div className="mt-5 ms-sm-4 mx-2 mx-sm-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="row g-0">
            <div className="col-xxl-7 col-12">
              <>
                <span className="fs_20 primary_color fw_600">
                  Invoice Number
                </span>
                <span className="ps-5 primary_color fs_20 fw_600">-</span>
              </>

              <BookingsRiderDetails riderBookingData={BookingData} />
            </div>
            <div className="col-xxl-5 col-md-6 col-sm-12 py-2">
              <div className="d-flex gap-3 align-items-top me-5">
                <div className="position-relative">
                  <>
                    {downloadInvoiceShow ? (
                      <div className="ongoing_bookings_download_invoice  border_radius_10px ">
                        <ul className="menu_list px-3 mb-0 primary_color fs_14 fw_600 text-start">
                          <>
                            <li className=" cursor_pointer border-bottom mb-1 text-nowrap py-1">
                              <BlobProvider
                                document={
                                  !invoiceLoading && invoiceData ? (
                                    <RiderInvoicePdf item={invoiceData} />
                                  ) : (
                                    <div>Loading document...</div>
                                  )
                                }
                              >
                                {({ url, loading }) => {
                                  return loading ||
                                    invoiceLoading ||
                                    invoiceData == null ? (
                                    "loading document ..."
                                  ) : (
                                    <a
                                      href={url}
                                      target="_blank"
                                      className={`background_none border_none primary_color fs_14 text-decoration-none fw_600 cursor_pointer`}
                                    >
                                      Rider Invoice
                                    </a>
                                  );
                                }}
                              </BlobProvider>
                            </li>
                            <li className=" cursor_pointer  pb-1 mb-1 text-nowrap py-1">
                              <BlobProvider
                                document={
                                  !invoiceLoading && invoiceData ? (
                                    <DetailedInvoicePdf item={invoiceData} />
                                  ) : (
                                    <div>Loading document...</div>
                                  )
                                }
                              >
                                {({ url, loading }) => {
                                  return loading ||
                                    invoiceLoading ||
                                    invoiceData === null ? (
                                    "loading document ..."
                                  ) : (
                                    <a
                                      href={url}
                                      target="_blank"
                                      className={`background_none border_none primary_color fs_14 text-decoration-none fw_600 cursor_pointer`}
                                    >
                                      Combined Invoice
                                    </a>
                                  );
                                }}
                              </BlobProvider>
                            </li>
                          </>
                        </ul>
                      </div>
                    ) : null}
                  </>
                </div>
                <div className="input_border border_radius px-2 w_90">
                  <div
                    className=" d-flex justify-content-between align-items-center px-2 cursor_pointer"
                    onClick={() => downloadInvoiceBtn()}
                  >
                    <div>
                      <DownloadIcon fill="#687284" className={"me-2 mb-1"} />
                    </div>
                    <div className="secondary_color fs_14 fw_600 d-flex align-items-center text-nowrap download_invoice">
                      {" "}
                      Download Invoice
                    </div>
                    <div>
                      {" "}
                      <ArrowDownIcon
                        fill="#687284"
                        width={28}
                        height={24}
                        className={"pb-1"}
                      />
                    </div>
                  </div>
                </div>

                {canWrite(permission) === false ? (
                  <></>
                ) : (
                  <>
                    <button
                      className={
                        editDisabelBtn || type === "Adjusted_Bookings"
                          ? "default_color_bg white_color border_none border_radius_5px px-3 fs_14  fw_500"
                          : "primary_bg white_color border_radius_5px px-3 fs_14  fw_500"
                      }
                      type="button"
                      onClick={() => {
                        setBillingDetailsEdit(true);
                        DriverCancelFine();
                      }}
                      // disabled={editDisabelBtn || type === "Adjusted_Bookings"}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 col-10">
            <span className="fs_16 fw_600 primary_color heading_border_bottom">
              Driver Borrow cash from Rider
            </span>
            <div className="">
              <span className="fs_14 fw_500 secondary_color">
                (After The Payment Is Made By The Rider This Amount Is Not
                Reflected In Billing; However A Coupon Is Issued To The Rider
                For The Money Lent And Driver Borrowed Money Is Reflected On
                Driver Current Balance)
              </span>
            </div>
          </div>

          <>
            <div className="row mt-3 g-0">
              <div className="col-lg-5 col-7 ">
                <span className="primary_color fs_16 fw_600">
                  Money lent by rider (coupon amount)
                </span>
              </div>
              <div className="col-lg-7 col-5">
                <span className="fs_16 fw_500 secondary_color">
                  {BookingData?.billingDetails?.rider_details
                    ?.money_lent_by_rider !== null
                    ? parseFloat(
                        BookingData?.billingDetails?.rider_details
                          ?.money_lent_by_rider
                      ).toFixed(2)
                    : "--"}
                </span>
              </div>
            </div>
            <div className="row mt-1 g-0">
              <div className="col-lg-5 col-7">
                <span className="primary_color fs_16 fw_600">
                  Driver Borrowed Amount
                </span>
              </div>
              <div className="col-lg-7 col-5">
                <span className="fs_16 fw_500 secondary_color">
                  {BookingData?.billingDetails?.rider_details
                    ?.driver_barrowed_amount !== null
                    ? parseFloat(
                        BookingData?.billingDetails?.rider_details
                          ?.driver_barrowed_amount
                      ).toFixed(2)
                    : "--"}
                </span>
              </div>
            </div>

            {(BookingData?.tripInformation?.booking_type ===
              "OneWayOutstation" ||
              BookingData?.tripInformation?.booking_type ===
                "RoundTripOutstation") && (
              <>
                <div className="row mt-5 g-0">
                  <div className="col-lg-3 col-md-5 col-7">
                    <span className="primary_color fs_14 fw_600">
                      Initial Odometer Reading
                    </span>
                  </div>
                  <div className="col-lg-6 col-md-7 col-5">
                    <>
                      <input
                        className="fs_14 fw_500 secondary_color border_none background_none outline_none w-25"
                        value={
                          BookingData?.billingDetails
                            ?.initial_odometer_reading !== null
                            ? parseFloat(
                                BookingData?.billingDetails
                                  ?.initial_odometer_reading
                              ).toFixed(2)
                            : "--"
                        }
                        onChange={formik.handleChange}
                        name="InitialOdometerReading"
                        disabled
                      />

                      {type === "Cancelled_Bookings" ? (
                        <>
                          {billingDetailsEdit &&
                            !disableCancelBtn?.afterOtp && (
                              <button
                                type="button"
                                className="blue_color_bg  white_color border_none border_radius_5px px-4 fs_14 mb-2"
                                onClick={() => handleInitialOdometerShow()}
                              >
                                Update
                              </button>
                            )}
                        </>
                      ) : (
                        <>
                          {type !== "Adjusted_Bookings" &&
                            billingDetailsEdit && (
                              <button
                                type="button"
                                className="blue_color_bg  white_color border_none border_radius_5px px-4 fs_14 mb-2"
                                onClick={() => handleInitialOdometerShow()}
                              >
                                Update
                              </button>
                            )}
                        </>
                      )}
                    </>
                  </div>
                </div>

                <div className="row g-0">
                  <div className="col-lg-3 col-md-5 col-7">
                    <span className="primary_color fs_14 fw_600">
                      Final Odometer Reading
                    </span>
                  </div>
                  <div className="col-lg-6 col-md-7 col-5">
                    <>
                      <input
                        className="fs_14 fw_500 secondary_color border_none background_none outline_none w-25"
                        value={
                          BookingData?.billingDetails
                            ?.final_odometer_reading !== null
                            ? parseFloat(
                                BookingData?.billingDetails
                                  ?.final_odometer_reading
                              ).toFixed(2)
                            : "--"
                        }
                        onChange={formik.handleChange}
                      />

                      {type === "Cancelled_Bookings" ? (
                        <>
                          {billingDetailsEdit &&
                            !disableCancelBtn?.afterOtp && (
                              <button
                                type="button"
                                className={
                                  type === "Ongoing_Bookings"
                                    ? `default_color_bg white_color border_none border_radius_5px px-4 fs_14 mb-2`
                                    : `blue_color_bg  white_color border_none border_radius_5px px-4 fs_14 mb-2`
                                }
                                onClick={() => handleFinalOdometerShow()}
                                disabled={type === "Ongoing_Bookings"}
                              >
                                Update
                              </button>
                            )}
                        </>
                      ) : (
                        <>
                          {type !== "Adjusted_Bookings" &&
                            billingDetailsEdit && (
                              <button
                                type="button"
                                className={
                                  type === "Ongoing_Bookings"
                                    ? `default_color_bg white_color border_none border_radius_5px px-4 fs_14 mb-2`
                                    : `blue_color_bg  white_color border_none border_radius_5px px-4 fs_14 mb-2`
                                }
                                onClick={() => handleFinalOdometerShow()}
                                disabled={type === "Ongoing_Bookings"}
                              >
                                Update
                              </button>
                            )}
                        </>
                      )}
                    </>
                  </div>
                </div>
              </>
            )}

            <div className="row g-0">
              <div className="col-lg-3 col-md-5 col-7">
                <span className="primary_color fs_16 fw_600">
                  Payment Method
                </span>
              </div>
              <div className="col-lg-6 col-md-7 col-5">
                <>
                  <input
                    className="fs_14 fw_500 secondary_color border_none background_none outline_none w-25"
                    value={
                      BookingData?.billingDetails?.rider_details?.payment_method
                        ? BookingData?.billingDetails?.rider_details
                            ?.payment_method
                        : "--"
                    }
                    onChange={formik.handleChange}
                    disabled
                  />

                  {type === "Cancelled_Bookings" ? (
                    <>
                      {billingDetailsEdit && !disableCancelBtn?.afterOtp && (
                        <button
                          type="button"
                          className="blue_color_bg  white_color border_none border_radius_5px px-4 fs_14 mb-2"
                          onClick={() => handlePaymentMethodShow()}
                        >
                          Update
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {type !== "Adjusted_Bookings" && billingDetailsEdit && (
                        <button
                          type="button"
                          className="blue_color_bg  white_color border_none border_radius_5px px-4 fs_14 mb-2"
                          onClick={() => handlePaymentMethodShow()}
                        >
                          Update
                        </button>
                      )}
                    </>
                  )}
                </>
              </div>
            </div>
          </>

          <div className="row gx-0 me-lg-0 me-sm-3 ">
            <div className="col-lg-6">
              <>
                <RiderBilling
                  formik={formik}
                  Data={BookingData}
                  billingDetailsEdit={billingDetailsEdit}
                  type={type}
                  disableCancelBtn={disableCancelBtn}
                />
              </>
            </div>

            <div className="col-lg-6">
              <div className="mx-sm-2">
                <BookingRiderPayDetails riderPayDetails={BookingData} />
                {type === "Accident_Bookings" ||
                type === "Cancelled_Bookings" ||
                type === "Completed_Bookings" ? (
                  <>
                    {billingDetailsEdit === true && createdRefund === true ? (
                      <div className="d-flex justify-content-end">
                        <button
                          className="border_none green_color_bg white_color border_radius_5px fs_16 fw_500 px-2 mt-1"
                          type="button"
                          onClick={() => handlerefundShow()}
                        >
                          Create Refund
                        </button>
                      </div>
                    ) : null}
                    {billingDetailsEdit === true && cancelRefund === true ? (
                      <div className="d-flex justify-content-end">
                        <button
                          className="border_none red_bg white_color border_radius_5px fs_16 fw_500 px-2 mt-1"
                          type="button"
                          onClick={() => {
                            handleCancelRefundShow();
                          }}
                        >
                          Cancel Refund
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : null}
                <DriverBillings driverBillingDatas={BookingData} />
                <BookingDriverFine BookingDriverFineData={BookingData} />
                {type === "Accident_Bookings" ||
                type === "Cancelled_Bookings" ||
                type === "Completed_Bookings" ? (
                  <>
                    {billingDetailsEdit === true && driverFine === true ? (
                      <div className="d-flex justify-content-end">
                        <button
                          className="border_none green_color_bg white_color border_radius_5px fs_16 fw_500 px-2 mt-1"
                          type="button"
                          onClick={() => handleDriverFineShow()}
                        >
                          Cancel Fine
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : null}
                <ComrideBillingDetails
                  ComrideBillingsDetailsData={BookingData}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-sm-end  justify-content-center pe-sm-5 ">
            {type === "Accident_Bookings" ||
            type === "Cancelled_Bookings" ||
            type === "Completed_Bookings" ||
            type === "Ongoing_Bookings" ? (
              <>
                {billingDetailsEdit ? (
                  <div className="d-sm-flex mx-sm-0 mx-5 gap-3">
                    <button
                      className="border_none green_color_bg white_color px-5  py-2 border_radius_5px fw_600 fs_14 mb-2 mb-sm-0"
                      type="submit"
                      onClick={() => {
                        formik.setFieldValue("action", "update");
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="white_bg border_radius_5px px-2 undo_change_btn fw_600 mb-2 mb-sm-0"
                      type="button"
                      onClick={() => {
                        formik?.resetForm();
                      }}
                    >
                      <span className="d-flex align-items-center red_color fs_14">
                        <i className="ri-close-circle-fill red_color pe-1"></i>
                        Undo Changes
                      </span>
                    </button>
                    <Cancelbtn
                      cancelFn={() => {
                        setBillingDetailsEdit(false);
                      }}
                    />
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default BookingBillingDetails;
