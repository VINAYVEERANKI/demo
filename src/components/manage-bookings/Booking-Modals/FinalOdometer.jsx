import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { completedUpdateFinalOdometerAction } from "../../../redux/actions/manageBookings/completedBookingAction";
import SuccessMessagemodal from "../../modals/successMessageModal";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import errorToast from "../../utilits/errorToast";
import SpinnerLoading from "../../utilits/spinnerLoading";
import successToast from "../../utilits/successToast";
import "../manage-bookingsComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { numRegex } from "../../helper";
import { ongoingUpdateFinalOdometerAction } from "../../../redux/actions/manageBookings/onGoingBookingAction";
import { cancelledUpdateFinalOdometerAction } from "../../../redux/actions/manageBookings/cancelledBookingAction";
import { accidentUpdateFinalOdometerAction } from "../../../redux/actions/manageBookings/accidentBookingAction";

const FinalOdometer = ({
  FinalOdometerShow,
  handleFinalOdometerClose,
  BookingData,
  BookingTable,
  setBookingTable,
  type,
}) => {
  console.log(type, "jsdgasj");
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
      FinalOdometerReading: BookingData?.billingDetails?.final_odometer_reading
        ? parseFloat(
            BookingData?.billingDetails?.final_odometer_reading
          ).toFixed(2)
        : "",
    },
    validationSchema: Yup.object({
      FinalOdometerReading: Yup.string()
        .trim()
        .matches(numRegex, "Invalid value"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const data = {
        booking_id: BookingData?.tripInformation?.id,
        final_odometer_reading: values?.FinalOdometerReading,
      };
      if (type === "Ongoing_Bookings") {
        dispatch(ongoingUpdateFinalOdometerAction(data, onSuccess, onError));
      } else if (type === "Completed_Bookings") {
        dispatch(completedUpdateFinalOdometerAction(data, onSuccess, onError));
      } else if (type === "Cancelled_Bookings") {
        dispatch(cancelledUpdateFinalOdometerAction(data, onSuccess, onError));
      } else if (type === "Accident_Bookings") {
        dispatch(accidentUpdateFinalOdometerAction(data, onSuccess, onError));
      }
    },
  });

  console.log(BookingData, "jhvferjfvre");

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
    successToast(data?.data);
    setLoading(false);
    handleFinalOdometerClose();
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
        title={`Final odometer reading successfully updated!`}
      />

      <Modal
        centered
        show={FinalOdometerShow}
        onHide={handleFinalOdometerClose}
        dialogClassName="initialOdometer_width"
        contentClassName={`border_radius_10px`}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center align-items-center my-4 ">
                <div>
                  <span className="fs_22 fw_600 fs_sm_20 primary_color">
                    Are you sure you want Update the Final odometer reading?
                  </span>

                  <div className="px-4 d-flex justify-content-center align-items-center">
                    <div className="col-sm-8 col-8 my-3 ">
                      <div className="my-2">
                        <div>
                          <span className=" primary_color fw_500">
                            Final Odometer Reading(Current)
                          </span>
                        </div>
                        <div>
                          <span className="mt-1 mb-4 secondary_color fw_500">
                            {BookingData?.billingDetails
                              ?.final_odometer_reading !== null
                              ? parseFloat(
                                  BookingData?.billingDetails
                                    ?.final_odometer_reading
                                )
                              : "--"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 mb-3">
                        <div>
                          <span
                            className={
                              error ||
                              (formik.errors.FinalOdometerReading &&
                                formik.touched.FinalOdometerReading)
                                ? "red_color fw_500 fs_16"
                                : "primary_color fs_16 fw_500"
                            }
                          >
                            Final Odometer Reading (New)
                          </span>
                        </div>
                        <div>
                          <input
                            type="text"
                            className={
                              error ||
                              (formik.errors.FinalOdometerReading &&
                                formik.touched.FinalOdometerReading)
                                ? " error_border w-100 border_radius_5px  py-1 fs_16 ps-3 outline_none fw_500"
                                : "w-100 modalInputBorder border_radius_5px mb-2 py-1 fs_16 ps-3 outline_none fw_500"
                            }
                            placeholder="Please enter odometer reading"
                            name="FinalOdometerReading"
                            value={formik.values.FinalOdometerReading}
                            onChange={(e) => {
                              formik.handleChange(e);
                              setError(false);
                              formik.setFieldTouched(
                                "FinalOdometerReading",
                                false
                              );
                            }}
                            autoComplete="off"
                          />
                          <span className="red_color fw_500">{error}</span>
                          {formik.errors.FinalOdometerReading &&
                            formik.touched.FinalOdometerReading && (
                              <span className={`red_color fw_500`}>
                                {formik.errors.FinalOdometerReading}
                              </span>
                            )}
                        </div>
                      </div>
                      <span className="d-flex justify-content-between col-12 mx-auto mx-sm-0">
                        <Cancelbtn
                          cancelFn={() => {
                            handleFinalOdometerClose();
                            formik.setFieldValue(
                              "FinalOdometerReading",
                              formik.initialValues.FinalOdometerReading
                            );
                            setError(false);
                            formik.setFieldTouched(
                              "FinalOdometerReading",
                              false
                            );
                          }}
                        />

                        <button
                          type="submit"
                          className={`btn-okay text-white ${
                            disabled ? "disabled_color_bg" : "primary_bg"
                          }  border_radius_5px border_none px-sm-5 px-4 py-1`}
                          disabled={disabled}
                        >
                          {loading ? <SpinnerLoading /> : "Proceed"}
                        </button>
                      </span>
                    </div>
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

export default FinalOdometer;
