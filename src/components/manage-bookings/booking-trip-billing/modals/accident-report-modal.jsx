import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../manage-bookingsComponents.css";
import SuccessMessagemodal from "../../../modals/successMessageModal";
import PasswordInputField from "../../../form/passwordInputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ongoingAccidentReportAction } from "../../../../redux/actions/manageBookings/onGoingBookingAction";
import { numRegex } from "../../../helper";
import successToast from "../../../utilits/successToast";
import errorToast from "../../../utilits/errorToast";
import SpinnerLoading from "../../../utilits/spinnerLoading";

function AccidentReportModal({
  accidentReportShow,
  handleAccidentReportClose,
  ongoingBookingData,
  ongoingTable,
  setOngoingTable,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    navigate("/manage-bookings/ongoing-bookings");
    setOngoingTable(!ongoingTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const kmRequired =
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
      kmTravelled: "",
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
      kmTravelled: kmRequired,
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        ongoingAccidentReportAction(
          {
            booking_id: ongoingBookingData?.tripInformation?.id,
            password: values?.ConfirmPassword,
            km_travelled: values?.kmTravelled ? values?.kmTravelled : "",
          },
          onAccidentReportSucess,
          onAccidentReportError
        )
      );
    },
  });

  const onAccidentReportSucess = (data) => {
    handleSuccessMessageShow();
    successToast(data?.data);
    setLoading(false);
    handleAccidentReportClose();
  };

  const onAccidentReportError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    errorToast(data?.data?.data);
  };

  const data = [
    {
      label: "Booking ID",
      value: ongoingBookingData?.tripInformation?.booking_id_2
        ? ongoingBookingData?.tripInformation?.booking_id_2
        : "--",
    },
    { label: "Booking Classification", value: "Accident (After start OTP)" },
  ];

  const description = (
    <div className="fs_15 fw_600 mt-3 mx-4">
      {data?.map((item) => (
        <React.Fragment key={item?.value}>
          {" "}
          <div className="row gx-0">
            <div className="col-5">
              <div className="text-start ps-2">
                <span className="primary_color fs_15 text-nowrap">{item?.label}</span>
              </div>
            </div>
            <div className="col-1">
              <span className="ps-3 secondary_color">:</span>
            </div>
            <div className="col-6">
              <div className="text-start">
                <span className="secondary_color fs_15">{item?.value}</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  const kmInput = (
    <div className="px-5 position-relative mt-3 mb-3">
      <label
        htmlFor="kmTravelled"
        className={
          formik.errors.kmTravelled && formik.touched.kmTravelled
            ? "text-nowrap fs_16 fw_500 mb-1 red_color"
            : "text-nowrap fs_16 fw_500 mb-1 primary_color"
        }
      >
        Enter Km Travelled:
      </label>
      <div className="d-flex align-items-center">
        <input
          type="text"
          className={
            formik.errors.kmTravelled && formik.touched.kmTravelled
              ? ` error_border background_none w-100 border_radius_3px py-1 outline_none ps-2 input_text_holder `
              : `background_none w-100 border_radius_3px py-1 driver_requested_password_input outline_none ps-2 input_text_holder `
          }
          placeholder="Please enter travelled km"
          name="kmTravelled"
          id="kmTravelled"
          value={formik.values.kmTravelled}
          onChange={formik.handleChange}
        />
        <div>
          <span className="fw_700 primary_color km_input_text ps-2 ">Km</span>
        </div>
      </div>
      {formik.errors.kmTravelled && formik.touched.kmTravelled && (
        <div className="dark_red_color fs_14 fw_600">
          {formik.errors.kmTravelled}
        </div>
      )}
    </div>
  );

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Accident Reported!`}
        subsection={true}
        description={description}
      />
      <Modal
        centered
        show={accidentReportShow}
        onHide={handleAccidentReportClose}
        //  size={''}
        dialogClassName="driver_accident_report_container"
        contentClassName="driver_requested_cancel_card"
        backdropClassName="driver_requested_cancel_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-3 mb-4">
                <span className="red_color">
                  Are you sure you want to report an Accident?
                </span>
              </div>
              {ongoingBookingData?.tripInformation?.booking_type ===
              "OneWayOutstation" ? (
                kmInput
              ) : ongoingBookingData?.tripInformation?.booking_type ===
                "RoundTripOutstation" ? (
                kmInput
              ) : ongoingBookingData?.tripInformation?.booking_type ===
                "LocalTrip" ? (
                <></>
              ) : (
                <></>
              )}

              <PasswordInputField
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
              <div className="d-flex justify-content-between mt-4 px-5 mb-3 mx-3">
                <button
                  type="button"
                  className=" white_bg border_radius_5px px-4 py-1 "
                  onClick={() => {
                    handleAccidentReportClose();
                    setError(false);
                  }}
                >
                  <div className="d-flex ">
                    <span className=" fs_18 primary_color fw_600 px-3">
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
export default AccidentReportModal;
