import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../manage-bookingsComponents.css";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useDispatch } from "react-redux";
import SuccessMessagemodal from "../../modals/successMessageModal";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import { completedUpdatePaymentMethodAction } from "../../../redux/actions/manageBookings/completedBookingAction";
import SpinnerLoading from "../../utilits/spinnerLoading";
import { ongoingUpdatePaymentMethodAction } from "../../../redux/actions/manageBookings/onGoingBookingAction";
import { cancelledUpdatePaymentMethodAction } from "../../../redux/actions/manageBookings/cancelledBookingAction";
import { accidentUpdatePaymentMethodAction } from "../../../redux/actions/manageBookings/accidentBookingAction";

const PaymentUpdateModal = ({
  PaymentMethodShow,
  handlePaymentMethodClose,
  PaymentMethod,
  setPaymentMethod,
  formikData,
  BookingData,
  BookingTable,
  setBookingTable,
  type,
}) => {
  console.log(type, "jsdfbajskfhaskfj");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = formikData();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setBookingTable(!BookingTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [editDisable, setEditDisable] = useState(false);
  function handlePaymentMethodButton(e) {
    setPaymentMethod(e.target.value);
    let event = {
      target: {
        name: "paymentMethod",
        value: e.target.value,
      },
    };
    formik.handleChange(event);
  }

  console.log(BookingData?.tripInformation?.id);
  const PaymentMethodFn = () => {
    setLoading(true);
    const data = {
      booking_id: BookingData?.tripInformation?.id,
      payment_method: PaymentMethod,
    };
    if (type === "Ongoing_Bookings") {
      dispatch(ongoingUpdatePaymentMethodAction(data, onSuccess, onError));
    } else if (type === "Completed_Bookings") {
      dispatch(completedUpdatePaymentMethodAction(data, onSuccess, onError));
    } else if (type === "Cancelled_Bookings") {
      dispatch(cancelledUpdatePaymentMethodAction(data, onSuccess, onError));
    } else if (type === "Accident_Bookings") {
      dispatch(accidentUpdatePaymentMethodAction(data, onSuccess, onError));
    }
  };
  useEffect(() => {
    if (formik.initialValues.paymentMethod !== formik?.values?.paymentMethod) {
      setEditDisable(false);
    } else {
      setEditDisable(true);
    }
  }, [formik?.values?.paymentMethod]);
  const onSuccess = (data) => {
    successToast(data?.data);
    setLoading(false);
    handlePaymentMethodClose();
    handleSuccessMessageShow();
  };

  const onError = (data) => {
    setLoading(false);
    setError(data?.data?.data);
    errorToast(data?.data?.data);
  };
  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Payment method updated Suuccessfully!`}
      />
      <Modal
        centered
        show={PaymentMethodShow}
        onHide={handlePaymentMethodClose}
        dialogClassName="paymentUpdateModal_width"
        contentClassName={`border_radius_10px`}
        size={"md"}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center">
                <div>
                  <div className=" fs_22 fw_600 fs_sm_20 primary_color text-center pt-3">
                    Are you sure you want Update the payment method?
                  </div>
                  <div className=" d-flex justify-content-center my-4">
                    <div>
                      <div className=" d-flex justify-content-start fs_18">
                        <input
                          type="radio"
                          id="Cash"
                          checked={PaymentMethod === "Cash"}
                          value="Cash"
                          onChange={handlePaymentMethodButton}
                          className="input_radio"
                        />
                        <label
                          for="Cash"
                          className={
                            PaymentMethod === "Cash"
                              ? "px-1 fs_18 primary_color fw_600"
                              : "px-1 fs_18 secondary_color"
                          }
                        >
                          Cash Payment
                        </label>
                      </div>
                      <div className=" d-flex justify-content-start fs_18">
                        <input
                          type="radio"
                          id="Online"
                          checked={PaymentMethod === "Online"}
                          value="Online"
                          onChange={handlePaymentMethodButton}
                          className="input_radio"
                        />
                        <label
                          for="Online"
                          className={
                            PaymentMethod === "Online"
                              ? "px-1 fs_18 primary_color fw_600"
                              : "px-1 fs_18 secondary_color"
                          }
                        >
                          Online Payment
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-4 my-3 col-12 mx-auto mx-sm-0">
                    <Cancelbtn
                      cancelFn={() => {
                        handlePaymentMethodClose();
                        formik.setFieldValue(
                          "paymentMethod",
                          formik.initialValues.paymentMethod
                        );
                        setPaymentMethod(
                          BookingData?.billingDetails?.rider_details
                            ?.PaymentMethod
                        );
                      }}
                    />
                    <button
                      className={`btn-okay text-white ${
                        editDisable ? "disabled_color_bg" : "primary_bg"
                      }  border_radius_5px border_none px-sm-5 px-4 py-1`}
                      type="button"
                      onClick={PaymentMethodFn}
                      disabled={editDisable}
                    >
                      {loading ? <SpinnerLoading /> : "Proceed"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentUpdateModal;
