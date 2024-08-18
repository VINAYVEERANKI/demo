import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../manage-bookingsComponents.css";
import SuccessMessagemodal from "../../../modals/successMessageModal";
import PasswordInputField from "../../../form/passwordInputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import errorToast from "../../../utilits/errorToast";
import successToast from "../../../utilits/successToast";
import { ongoingRiderReqCancelAction } from "../../../../redux/actions/manageBookings/onGoingBookingAction";
import SpinnerLoading from "../../../utilits/spinnerLoading";

function RiderRequestedCancelModal({
  riderRequestedCancelShow,
  handleRiderRequestedCancelClose,
  ongoingBookingData,
  ongoingTable,
  setOngoingTable,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    navigate("/manage-bookings/ongoing-bookings");
    setOngoingTable(!ongoingTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [CancellationFee, setCancellationFee] = useState("nocancellationFee");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ConfirmPassword: ``,
      cancellationReason: ``,
      cancellationFee: `nocancellationFee`,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
      cancellationReason: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
      cancellationFee: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        ongoingRiderReqCancelAction(
          {
            booking_id: ongoingBookingData?.tripInformation?.id,
            password: values?.ConfirmPassword,
            cancellation_reason: values?.cancellationReason,
            cancellation_fee_charged:
              values?.cancellationFee === "nocancellationFee" ? false : true,
          },
          onSucess,
          onError
        )
      );
    },
  });
  const onSucess = (data) => {
    handleSuccessMessageShow();
    successToast(data?.data);
    setLoading(false);
    handleRiderRequestedCancelClose();
  };

  const onError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    errorToast(data?.data?.data);
  };
  function handleCancellationFeeButton(e) {
    setCancellationFee(e.target.value);
    let event = {
      target: {
        name: "cancellationFee",
        value: e.target.value,
      },
    };
    formik.handleChange(event);
  }
  const data = [
    {
      bookingID: ongoingBookingData?.tripInformation?.booking_id_2
        ? ongoingBookingData?.tripInformation?.booking_id_2
        : "--",
      bookingStatus: "Rider Request Cancellation",
    },
  ];

  const description = (
    <div className="fs_15 fw_600 mt-3 mx-4">
      {data?.map((items) => (
        <React.Fragment key={items?.bookingID}>
          {" "}
          <div className="row gx-0">
            <div className="col-4">
              <div className="text-start ps-2">
                <span className="primary_color fs_14 ">Booking ID</span>
              </div>
            </div>
            <div className="col-1">
              <span className="ps-3 secondary_color">:</span>
            </div>
            <div className="col-7">
              <div className="text-start">
                <span className="secondary_color fs_14">{items.bookingID}</span>
              </div>
            </div>
          </div>
          <div className="row gx-0">
            <div className="col-4">
              <div className="text-start ps-2">
                <span className="primary_color fs_14 text-nowrap">
                  Booking Status
                </span>
              </div>
            </div>
            <div className="col-1">
              <div>
                <span className="ps-3 secondary_color">:</span>
              </div>
            </div>
            <div className="col-7">
              <div className="text-start">
                <span className="secondary_color fs_14">
                  {items.bookingStatus}
                </span>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Trip has been cancelled successfully!`}
        subsection={true}
        description={description}
      />
      <Modal
        centered
        show={riderRequestedCancelShow}
        onHide={handleRiderRequestedCancelClose}
        //  size={''}
        dialogClassName="driver_requested_cancel_container"
        contentClassName="driver_requested_cancel_card"
        backdropClassName="driver_requested_cancel_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center fs_21 primary_color fw_600  mt-3">
                <span className="driver_request_cancel_heading ">
                  {" "}
                  Rider Requested Cancellation
                </span>
              </div>
              <hr className="light_grey_bg mt-0 mb-4 mx-5" />

              <div className="d-flex justify-content-center fs_20 fw_600">
                <span className="red_color">
                  Are you sure you want Cancel this Trip?
                </span>
              </div>
              <div className="ms-5">
                <div className="d-flex  justify-content-left ms-5 gap-1">
                  <input
                    className=""
                    type="radio"
                    // name="cancellationFee"
                    id="cancellationFee"
                    checked={CancellationFee === "cancellationFee"}
                    value="cancellationFee"
                    onChange={handleCancellationFeeButton}
                  />
                  <label
                    className="fs_16 fw_500 primary_color"
                    for="cancellationFee"
                  >
                    Cancellation Fee Charged
                  </label>
                </div>
                <div className="d-flex justify-content-left ms-5 gap-1">
                  <input
                    className=""
                    type="radio"
                    // name="nocancellationFee"
                    id="nocancellationFee"
                    value="nocancellationFee"
                    checked={CancellationFee === "nocancellationFee"}
                    onChange={handleCancellationFeeButton}
                  />
                  <label
                    className="fs_16 fw_500 primary_color"
                    for="nocancellationFee"
                  >
                    No Cancellation Fee Charged
                  </label>
                </div>
              </div>
              <PasswordInputField
                inputContainer={"px-5 mt-4"}
                reason={true}
                reasonTitle={"Cancellation reason"}
                reasonItemName={"cancellationReason"}
                onReasonChangeFn={formik.handleChange}
                onReasonBlurFn={formik.handleBlur}
                reasonItemValue={formik.values.cancellationReason}
                formikReasonError={formik.errors.cancellationReason}
                formikReasonTouched={formik.touched.cancellationReason}
                itemName={"ConfirmPassword"}
                inputValue={formik.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formik.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.ConfirmPassword}
                formikTouched={formik.touched.ConfirmPassword}
                error={error}
              />
              <span className="red_color fw_500 ps-5">{error} </span>
              <div className="d-flex justify-content-between mt-4 px-5 mb-3 ">
                <button
                  type="button"
                  className=" white_bg border_radius_5px px-4 py-1 "
                  onClick={() => {
                    handleRiderRequestedCancelClose();
                    setError(false);
                  }}
                >
                  <div className="d-flex ">
                    <span className=" fs_18 primary_color fw_600 px-4">
                      Go Back
                    </span>
                  </div>
                </button>
                <button
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                  type="sumbit"
                >
                  {loading ? (
                    <SpinnerLoading />
                  ) : (
                    <span className=" fs_18 white_color px-3">Proceed</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RiderRequestedCancelModal;
