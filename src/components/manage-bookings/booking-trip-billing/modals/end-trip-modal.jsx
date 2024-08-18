import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessMessagemodal from "../../../modals/successMessageModal";
import PasswordInputField from "../../../form/passwordInputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ongoingEndTripAction } from "../../../../redux/actions/manageBookings/onGoingBookingAction";
import { numRegex } from "../../../helper";
import successToast from "../../../utilits/successToast";
import errorToast from "../../../utilits/errorToast";
import SpinnerLoading from "../../../utilits/spinnerLoading";

const EndTripModal = ({
  endTripModalShow,
  handleEndTripModalClose,
  ongoingBookingData,
  ongoingTable,
  setOngoingTable,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    navigate("/manage-bookings/ongoing-bookings");
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const finalOdometerRequired =
    ongoingBookingData?.tripInformation?.booking_type === "OneWayOutstation"
      ? Yup.string()
          .matches(numRegex, "Invalid value")
          .trim()
          .required("Required")
      : ongoingBookingData?.tripInformation?.booking_type ===
        "RoundTripOutstation"
      ? Yup.string()
          .matches(numRegex, "Invalid value")
          .trim()
          .required("Required")
      : ongoingBookingData?.tripInformation?.booking_type === "LocalTrip"
      ? Yup.string().trim()
      : Yup.string().trim();
  const formik = useFormik({
    initialValues: {
      ConfirmPassword: ``,
      EndTripReason: ``,
      FinalOdometr: "",
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),

      EndTripReason: Yup.string("")
        .trim()
        .required("Please fill this field to proceed"),
      FinalOdometr: finalOdometerRequired,
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        ongoingEndTripAction(
          {
            booking_id: ongoingBookingData?.tripInformation?.id,
            password: values?.ConfirmPassword,
            cancellation_reason: values?.EndTripReason,
            final_odometer_reading: values?.FinalOdometr
              ? values?.FinalOdometr
              : "",
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
    handleEndTripModalClose();
  };

  const onError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    errorToast(data?.data?.data);
  };

  const data = [
    {
      bookingID: ongoingBookingData?.tripInformation?.booking_id_2
        ? ongoingBookingData?.tripInformation?.booking_id_2
        : "--",
      bookingStatus: "Driver Request Cancellation",
    },
  ];
  const description = (
    <div className="fs_15 fw_600 mt-3 mx-4">
      {data?.map((items) => (
        <React.Fragment key={items?.bookingID}>
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

  const finalOdometerInput = (
    <div className="px-5 mt-3">
      <label
        htmlFor="FinalOdometr"
        className={
          formik.errors.FinalOdometr && formik.touched.FinalOdometr
            ? "text-nowrap fs_16 fw_500 mb-1 red_color"
            : "text-nowrap fs_16 fw_500 mb-1 primary_color"
        }
      >
        Please enter final odometer reading
      </label>
      <div className="d-flex">
        <input
          type="text"
          // className=" background_none w-100 border_radius_3px py-1"

          className={
            formik.errors.FinalOdometr && formik.touched.FinalOdometr
              ? ` error_border background_none w-100 border_radius_3px py-1 outline_none ps-2 input_text_holder `
              : `background_none w-100 border_radius_3px py-1 driver_requested_password_input outline_none ps-2 input_text_holder `
          }
          placeholder="Please enter final odometer reading"
          name="FinalOdometr"
          id="FinalOdometr"
          value={formik.values.FinalOdometr}
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.FinalOdometr && formik.touched.FinalOdometr && (
        <div className="dark_red_color fs_14">{formik.errors.FinalOdometr}</div>
      )}
    </div>
  );
  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Trip ended successfully!`}
        subsection={true}
        description={description}
      />
      <Modal
        centered
        show={endTripModalShow}
        onHide={handleEndTripModalClose}
        dialogClassName="driver_requested_cancel_container"
        contentClassName="driver_requested_cancel_card"
        backdropClassName="driver_requested_cancel_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center fs_21 primary_color fw_600  mt-2">
                <span className="border-bottom mb-3 pb-1"> End Trip</span>
              </div>

              <div className="d-flex justify-content-center fs_20 fw_600">
                <span className="red_color">
                  Are you sure you want end this Trip?
                </span>
              </div>
              {ongoingBookingData?.tripInformation?.booking_type ===
              "OneWayOutstation" ? (
                finalOdometerInput
              ) : ongoingBookingData?.tripInformation?.booking_type ===
                "RoundTripOutstation" ? (
                finalOdometerInput
              ) : ongoingBookingData?.tripInformation?.booking_type ===
                "LocalTrip" ? (
                <></>
              ) : (
                <></>
              )}
              <PasswordInputField
                inputContainer={"px-5 mt-3"}
                reason={true}
                reasonTitle={"End Trip reason"}
                reasonItemName={"EndTripReason"}
                onReasonChangeFn={formik.handleChange}
                onReasonBlurFn={formik.handleBlur}
                reasonItemValue={formik.values.EndTripReason}
                formikReasonError={formik.errors.EndTripReason}
                formikReasonTouched={formik.touched.EndTripReason}
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
                  onClick={() => handleEndTripModalClose()}
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
                    <span className=" fs_18 white_color px-4">Proceed</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EndTripModal;
