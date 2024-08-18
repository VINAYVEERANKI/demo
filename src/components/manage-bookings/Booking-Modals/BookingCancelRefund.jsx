import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../manage-bookingsComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessMessagemodal from "../../modals/successMessageModal";
import PasswordInputField from "../../form/passwordInputField";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useDispatch } from "react-redux";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import { completedBookingCancelRefundAction } from "../../../redux/actions/manageBookings/completedBookingAction";
import SpinnerLoading from "../../utilits/spinnerLoading";
import { cancelledBookingCancelRefundAction } from "../../../redux/actions/manageBookings/cancelledBookingAction";
import { accidentBookingCancelRefundAction } from "../../../redux/actions/manageBookings/accidentBookingAction";

const BookingCancelRefund = ({
  cancelRefundShow,
  handleCancelRefundClose,
  setcreatedRefund,
  setCancelRefund,
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
      };
      if (type === "Completed_Bookings") {
        dispatch(completedBookingCancelRefundAction(data, onSuccess, onError));
      } else if (type === "Cancelled_Bookings") {
        dispatch(cancelledBookingCancelRefundAction(data, onSuccess, onError));
      } else if (type === "Accident_Bookings") {
        dispatch(accidentBookingCancelRefundAction(data, onSuccess, onError));
      }
    },
  });
  const onSuccess = (data) => {
    setLoading(false);
    handleCancelRefundClose();
    handleSuccessMessageShow();
    setcreatedRefund(true);
    setCancelRefund(false);
    successToast(data?.message);
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Refund request Cancelled successfully`}
        subsection={true}
        description={`Note : For more details visit 'Refund' section in the menu.`}
      />
      <Modal
        centered
        show={cancelRefundShow}
        onHide={handleCancelRefundClose}
        dialogClassName="billingdetails_width"
        contentClassName={`border_radius_10px`}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div>
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center align-items-center my-4 ">
                <span className="fs_22 fw_600 fs_sm_20 primary_color">
                  Are you sure you want to Cancel Refund?
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

              <div className="d-flex justify-content-center gap-4  mt-4">
                <Cancelbtn
                  cancelFn={() => {
                    handleCancelRefundClose();
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

export default BookingCancelRefund;
