import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { completedBookingCancelDriverFineAction } from "../../../redux/actions/manageBookings/completedBookingAction";
import SuccessMessagemodal from "../../modals/successMessageModal";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import errorToast from "../../utilits/errorToast";
import SpinnerLoading from "../../utilits/spinnerLoading";
import successToast from "../../utilits/successToast";
import "../manage-bookingsComponents.css";
import { cancelledBookingCancelDriverFineAction } from "../../../redux/actions/manageBookings/cancelledBookingAction";
import { accidentBookingCancelDriverFineAction } from "../../../redux/actions/manageBookings/accidentBookingAction";

const BookingCancelDriverFine = ({
  driverFineShow,
  handleDriverFineClose,
  BookingData,
  BookingTable,
  setBookingTable,
  setDriverFine,
  type,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setBookingTable(!BookingTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const cancelDriverFineFn = () => {
    setLoading(true);
    const data = {
      booking_id: BookingData?.tripInformation?.id,
    };
    if (type === "Completed_Bookings") {
      dispatch(
        completedBookingCancelDriverFineAction(data, onSuccess, onError)
      );
    } else if (type === "Cancelled_Bookings") {
      dispatch(
        cancelledBookingCancelDriverFineAction(data, onSuccess, onError)
      );
    } else if (type === "Accident_Bookings") {
      dispatch(accidentBookingCancelDriverFineAction(data, onSuccess, onError));
    }
  };

  const onSuccess = (data) => {
    setLoading(false);
    successToast(data?.data);
    handleDriverFineClose();
    handleSuccessMessageShow();
    setDriverFine(false);
  };

  const onError = (data) => {
    setLoading(false);
    // setError(data?.data?.data);
    errorToast(data?.data?.data);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Driver fine cancelled successfully!`}
      />

      <Modal
        centered
        show={driverFineShow}
        onHide={handleDriverFineClose}
        dialogClassName="paymentUpdateModal_width"
        contentClassName={`border_radius_10px`}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <>
            <div className="d-flex justify-content-center">
              <div>
                <div className=" fs_22 fw_600 fs_sm_20 primary_color text-center pt-3">
                  Are you sure you want to cancel Driver Fine?
                </div>

                <div className="d-flex justify-content-center gap-4 mb-3 mt-5 col-12 mx-auto mx-sm-0">
                  <Cancelbtn cancelFn={handleDriverFineClose} />
                  <button
                    className="btn-okay text-white primary_bg border_radius_5px border_none px-sm-5 px-4 py-2"
                    type="button"
                    onClick={() => {
                      cancelDriverFineFn();
                    }}
                  >
                    {loading ? <SpinnerLoading /> : "Proceed"}
                  </button>
                </div>
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookingCancelDriverFine;
