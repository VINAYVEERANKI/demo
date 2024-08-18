import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../manage-bookingsComponents.css";
import SuccessMessagemodal from "../../modals/successMessageModal";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useDispatch } from "react-redux";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import SpinnerLoading from "../../utilits/spinnerLoading";
import { completedUpdateInitialOdometerAction } from "../../../redux/actions/manageBookings/completedBookingAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { numRegex } from "../../helper";
import { ongoingUpdateInitialOdometerAction } from "../../../redux/actions/manageBookings/onGoingBookingAction";
import { cancelledUpdateInitialOdometerAction } from "../../../redux/actions/manageBookings/cancelledBookingAction";
import { accidentUpdateInitialOdometerAction } from "../../../redux/actions/manageBookings/accidentBookingAction";

const InitialOdometer = ({
  initialOdometerShow,
  handleInitialOdometerClose,
  BookingData,
  BookingTable,
  setBookingTable,
  type,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setBookingTable(!BookingTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      InitialOdometerReading:
        BookingData?.billingDetails?.initial_odometer_reading !== null
          ? parseFloat(
              BookingData?.billingDetails?.initial_odometer_reading
            ).toFixed(2)
          : "",
    },
    validationSchema: Yup.object({
      InitialOdometerReading: Yup.string()
        .trim()
        .matches(numRegex, "Invalid value"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const data = {
        booking_id: BookingData?.tripInformation?.id,
        initial_odometer_reading: values?.InitialOdometerReading,
      };
      if (type === "Ongoing_Bookings") {
        dispatch(ongoingUpdateInitialOdometerAction(data, onSuccess, onError));
      } else if (type === "Completed_Bookings") {
        dispatch(
          completedUpdateInitialOdometerAction(data, onSuccess, onError)
        );
      } else if (type === "Cancelled_Bookings") {
        dispatch(
          cancelledUpdateInitialOdometerAction(data, onSuccess, onError)
        );
      } else if (type === "Accident_Bookings") {
        dispatch(accidentUpdateInitialOdometerAction(data, onSuccess, onError));
      }
    },
  });

  useEffect(() => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formik.values]);
  const onSuccess = (data) => {
    setLoading(false);
    successToast(data?.data);
    handleInitialOdometerClose();
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
        title={`Initial odometer reading successfully updated!`}
      />

      <Modal
        centered
        show={initialOdometerShow}
        onHide={handleInitialOdometerClose}
        dialogClassName="initialOdometer_width"
        contentClassName={`border_radius_10px`}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center align-items-center my-4 ">
                <div>
                  <span className="fs_22 fw_600 fs_sm_20 primary_color">
                    Are you sure you want Update the Initial odometer reading?
                  </span>

                  <div className="px-4 d-flex justify-content-center align-items-center">
                    <div className="col-sm-8 col-8 my-3 ">
                      <div className="my-2">
                        <div>
                          <span className=" primary_color fw_500">
                            Initial Odometer Reading(Current)
                          </span>
                        </div>
                        <div>
                          <span className="mt-1 mb-4 secondary_color fw_500">
                            {BookingData?.billingDetails
                              ?.initial_odometer_reading !== null
                              ? parseFloat(
                                  BookingData?.billingDetails
                                    ?.initial_odometer_reading
                                ).toFixed(2)
                              : "--"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 mb-3">
                        <div>
                          <span
                            className={
                              error ||
                              (formik.errors.InitialOdometerReading &&
                                formik.touched.InitialOdometerReading)
                                ? "red_color fw_500 fs_16"
                                : "primary_color fs_16 fw_500"
                            }
                          >
                            Initial Odometer Reading (New)
                          </span>
                        </div>
                        <div>
                          <input
                            type="text"
                            className={
                              error ||
                              (formik.errors.InitialOdometerReading &&
                                formik.touched.InitialOdometerReading)
                                ? " error_border w-100 border_radius_5px  py-1 fs_16 ps-3 outline_none fw_500"
                                : "w-100 modalInputBorder border_radius_5px mb-2 py-1 fs_16 ps-3 outline_none fw_500"
                            }
                            placeholder="Please enter odometer reading"
                            name="InitialOdometerReading"
                            value={formik.values.InitialOdometerReading}
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldTouched(
                                "InitialOdometerReading",
                                false
                              );
                              setError(false);
                            }}
                            autoComplete="off"
                          />

                          <span className="red_color fw_500">{error}</span>
                          {formik.errors.InitialOdometerReading &&
                            formik.touched.InitialOdometerReading && (
                              <span className={`red_color fw_500`}>
                                {formik.errors.InitialOdometerReading}
                              </span>
                            )}
                        </div>
                      </div>
                      <span className="d-flex justify-content-between col-12 mx-auto mx-sm-0">
                        <Cancelbtn
                          cancelFn={() => {
                            {
                              handleInitialOdometerClose();
                              formik.setFieldValue(
                                "InitialOdometerReading",
                                formik.initialValues.InitialOdometerReading
                              );
                              formik.setFieldTouched(
                                "InitialOdometerReading",
                                false
                              );
                              setError(false);
                            }
                          }}
                        />
                        <button
                          type="submit"
                          disabled={disabled}
                          className={`btn-okay text-white ${
                            disabled ? "disabled_color_bg" : "primary_bg"
                          }  border_radius_5px border_none px-sm-5 px-4 py-1`}
                        >
                          {loading ? <SpinnerLoading /> : "Proceed"}
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InitialOdometer;
