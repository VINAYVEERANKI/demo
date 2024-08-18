import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../manage-bookingsComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessMessagemodal from "../../modals/successMessageModal";
import PasswordInputField from "../../form/passwordInputField";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../../utilits/spinnerLoading";
import { accidentUpdateBillingDetailsAction } from "../../../redux/actions/manageBookings/accidentBookingAction";
import { cancelledUpdateBillingDetailsAction } from "../../../redux/actions/manageBookings/cancelledBookingAction";
import { ongoingUpdateBillingDetailsAction } from "../../../redux/actions/manageBookings/onGoingBookingAction";
import { completedUpdateBillingDetailsAction } from "../../../redux/actions/manageBookings/completedBookingAction";

const BillingUpdateModal = ({
  billingDetailsUpdateShow,
  handleBillingDetailsUpdateClose,
  setBillingDetailsEdit,
  formik,
  BookingData,
  BookingTable,
  setBookingTable,
  type,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setBookingTable(!BookingTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  console.log(BookingData?.tripInformation?.id, "jhsdgajdgakjd");

  const formikUpdatePass = useFormik({
    initialValues: {
      ConfirmPassword: "",
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
    }),

    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const data = {
        booking_id: BookingData?.tripInformation?.id,
        password: values?.ConfirmPassword,
        base_fare: +formik?.values?.baseFare,
        distance_fare: +formik?.values?.distanceFare,
        time_fare: +formik?.values?.TimeFare,
        remaining_km_fare: +formik?.values?.RemainingKmFare,
        remaining_time_fare: +formik?.values?.RemainingTimeFare,
        extra_km_fare: +formik?.values?.ExtraKmFare,
        extra_time_fare: +formik?.values?.ExtraTimeFareHrs,
        waiting_fee: +formik?.values?.WaitingFee,
        trip_fare: +formik?.values?.TripFare,
        trip_fare_after_coupon: +formik?.values?.TripFareAfterCouponSavings,
        booking_fee: +formik?.values?.BookingFee,
        night_allowance: +formik?.values?.NightAllowance,
        driver_allowance: +formik?.values?.DriverAllowance,
        total_amount_recevied: +formik?.values?.TotalAmountReceived,
      };

      if (type === "Ongoing_Bookings") {
        dispatch(ongoingUpdateBillingDetailsAction(data, onSuccess, onError));
      } else if (type === "Completed_Bookings") {
        dispatch(completedUpdateBillingDetailsAction(data, onSuccess, onError));
      } else if (type === "Accident_Bookings") {
        dispatch(accidentUpdateBillingDetailsAction(data, onSuccess, onError));
      } else if (type === "Cancelled_Bookings") {
        dispatch(
          cancelledUpdateBillingDetailsAction(
            {
              ...data,
              cancellation_fee: formik?.values?.cancellationFee,
            },
            onSuccess,
            onError
          )
        );
      }

      // resetForm();
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    handleBillingDetailsUpdateClose();
    handleSuccessMessageShow();
    setBillingDetailsEdit();
    successToast(data?.data);
  };

  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(data?.data?.data);
    setLoading(false);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made successfully!`}
      />

      <Modal
        centered
        show={billingDetailsUpdateShow}
        onHide={handleBillingDetailsUpdateClose}
        dialogClassName="billingdetails_width"
        contentClassName={`border_radius_10px`}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="fs_22 fw_600 fs_sm_20 primary_color">
                  Are you sure you want to update Billing details?
                </span>
              </div>
              <PasswordInputField
                itemName={"ConfirmPassword"}
                inputValue={formikUpdatePass.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formikUpdatePass.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formikUpdatePass.handleBlur}
                formikError={formikUpdatePass.errors.ConfirmPassword}
                formikTouched={formikUpdatePass.touched.ConfirmPassword}
                error={error}
              />
              <span className="red_color fw_500 ps-5">{error} </span>
              <div className="d-flex justify-content-between mt-2 px-5 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handleBillingDetailsUpdateClose();
                    setError(false);
                    formikUpdatePass.resetForm();
                  }}
                />

                <button
                  type="submit"
                  className="btn-okay text-white primary_bg border_radius_5px border_none px-sm-5 px-4 py-1"
                >
                  {loading ? <SpinnerLoading /> : "Proceed"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BillingUpdateModal;
