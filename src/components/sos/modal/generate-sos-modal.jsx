import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import eyeOn from "../../../assets/icons/eye-on.svg";
import eyeOff from "../../../assets/icons/eye-off.svg";
import "../../complaints/rider-complaints-components.css";
import SuccessMessagemodal from "../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import { bookingIDListAction } from "../../../redux/actions/complaints/inprogressComplaintsAction";
import CouponSelectField from "../../form/CouponSelectField";
import {
  generateSosCallDriverAction,
  generateSosCallRiderAction,
} from "../../../redux/actions/sos/pendingSosAction";
import errorToast from "../../utilits/errorToast";
import {
  driverIDListAction,
  riderIDListAction,
} from "../../../redux/actions/sos/inprogressSosAction";

const RiderGenerateSosModal = ({
  generateSosShow,
  handleGenerateSosClose,
  type,
  reload,
  setReload,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [riderList, setRiderList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  useEffect(() => {
    setLoading(true);
    dispatch(bookingIDListAction(onFetchSuccess, onFetchError));
    if (type === "pendingRiderSos") {
      dispatch(riderIDListAction(onRDFetchSuccess, onRDFetchError));
    } else if (type === "pendingDriverSos") {
      dispatch(driverIDListAction(onRDFetchSuccess, onRDFetchError));
    }
  }, [type]);

  const onFetchSuccess = (data) => {
    setLoading(false);
    console.log(data);
    setBookingList(
      data?.data?.map((item) => {
        return { label: item?.booking_id_2, value: item?.id };
      })
    );
  };
  const onFetchError = (data) => {
    setLoading(false);
    console.log(data);
  };

  const onRDFetchSuccess = (data) => {
    setLoading(false);
    console.log(data);
    setRiderList(
      data?.data?.map((item) => {
        return { label: item?.rider_id2, value: item?.id };
      })
    );
    setDriverList(
      data?.data?.map((item) => {
        return { label: item?.driver_id2, value: item?.id };
      })
    );
  };
  const onRDFetchError = (data) => {
    setLoading(false);
    console.log(data);
  };

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => setSuccessMessageShow(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);

  const [IDtypeShow, setIDtypeShow] = useState("bookingID");

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idType: `bookingID`,
      password: ``,
      BookingID: ``,
      RiderDriverID: ``,
    },
    validationSchema: Yup.object({
      idType: Yup.string(),
      password: Yup.string().trim().required("Please Enter Your Password*"),
      BookingID: Yup.string().when("idType", {
        is: "bookingID",
        then: Yup.string().required("Enter the Booking ID to create an SOS*"),
      }),
      RiderDriverID: Yup.string().when("idType", {
        is: "riderDriverID",
        then: Yup.string().required("Enter the Rider ID to create an SOS*"),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (type === "pendingRiderSos") {
        dispatch(
          generateSosCallRiderAction(
            {
              booking_id: values?.BookingID,
              rider_id: values?.RiderDriverID,
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "pendingDriverSos") {
        dispatch(
          generateSosCallDriverAction(
            {
              booking_id: values?.BookingID,
              driver_id: values?.RiderDriverID,
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      }
    },
  });

  const onSuccess = (data) => {
    setReload(!reload);
    console.log(data);
    handleGenerateSosClose();
    handleSuccessMessageShow();
    formik.resetForm();
    setIDtypeShow("bookingID");
  };
  const onError = (data) => {
    setReload(!reload);
    setError(data?.data?.data);
    errorToast(data?.data?.data);
    console.log(data, "654547");
  };

  function handleIDtypeShowButton(e) {
    formik.resetForm();
    setIDtypeShow(e.target.value);
    let event = {
      target: {
        name: "idType",
        value: e.target.value,
      },
    };
    formik.handleChange(event);
  }
  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title="Rider SOS generated successfully!"
      />
      <Modal
        centered
        show={generateSosShow}
        onHide={handleGenerateSosClose}
        dialogClassName="initiate_password_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="initiate_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-between align-items-center ">
                <span className=" fs_20 primary_color fw_600 text-nowrap">
                  Generate Rider SOS
                </span>
                <i
                  className="ri-close-circle-fill fs_22 cursor_pointer"
                  onClick={() => handleGenerateSosClose()}
                />
              </div>
              <hr className="ash_color m-0" />

              <div className="row d-flex justify-content-center">
                <div className="col-10">
                  <div className=" mt-3">
                    <span className=" fs_16 primary_color fw_600">
                      Please select any one of the following details.
                    </span>

                    <div className="d-flex  justify-content-left  gap-2 ms-sm-2">
                      <input
                        className="input_radio"
                        type="radio"
                        id="bookingID"
                        checked={IDtypeShow === "bookingID"}
                        value="bookingID"
                        onChange={handleIDtypeShowButton}
                        
                      />
                      <label
                        className={
                          IDtypeShow === "bookingID"
                            ? "fs_16 fw_500 primary_color"
                            : "fs_15 fw_500 ash_color"
                        }
                        htmlFor="bookingID"
                      >
                        Booking ID  
                      </label>
                    </div>
                    <div className="d-flex justify-content-left  gap-2 ms-sm-2">
                      <input
                       className="input_radio"
                        type="radio"
                        id="riderDriverID"
                        checked={IDtypeShow === "riderDriverID"}
                        value="riderDriverID"
                        onChange={handleIDtypeShowButton}
                      />
                      <label
                        className={
                          IDtypeShow === "bookingID"
                            ? "fs_15 fw_500 ash_color "
                            : "fs_16 fw_500 primary_color"
                        }
                        htmlFor="riderDriverID"
                      >
                        {type === "pendingRiderSos" ? "Rider ID" : "Driver ID"}
                      </label>
                    </div>
                  </div>

                  {IDtypeShow === "bookingID" ? (
                    <>
                      <div className="d-flex gap-3 ms-2 mt-3">
                        <label
                          className={
                            formik.errors.BookingID && formik.touched.BookingID
                              ? "fs_16 fw_500 red_color text-nowrap pt-1"
                              : "fs_16 fw_500 primary_color text-nowrap pt-1"
                          }
                        >
                          Booking ID
                        </label>
                        <div className="w-100">
                          <CouponSelectField
                            label={false}
                            placeholder="Select Booking Type"
                            option={bookingList}
                            itemName="BookingID"
                            formikValue={formik.values.BookingID}
                            formik={formik}
                            formikError={formik.errors.BookingID}
                            formikTouched={formik.touched.BookingID}
                          />
                          <div>
                            {formik.errors.BookingID &&
                              formik.touched.BookingID && (
                                <span className="red_color fw_500">
                                  {formik.errors.BookingID}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {IDtypeShow === "riderDriverID" ? (
                    <>
                      <div className="d-flex  gap-3 ms-2 mt-3 ">
                        <label
                          className={
                            formik.errors.RiderDriverID &&
                            formik.touched.RiderDriverID
                              ? "fs_16 fw_500 red_color text-nowrap pt-1"
                              : "fs_16 fw_500 primary_color text-nowrap pt-1"
                          }
                        >
                          {type === "pendingRiderSos"
                            ? "Rider ID"
                            : "Driver ID"}
                        </label>
                        <div className="w-100">
                          <CouponSelectField
                            label={false}
                            placeholder={
                              type === "pendingRiderSos"
                                ? "Enter Rider ID"
                                : "Enter Driver ID"
                            }
                            option={
                              type === "pendingRiderSos"
                                ? riderList
                                : type === "pendingDriverSos"
                                ? driverList
                                : ""
                            }
                            itemName="RiderDriverID"
                            formikValue={formik.values.RiderDriverID}
                            formik={formik}
                            formikError={formik.errors.RiderDriverID}
                            formikTouched={formik.touched.RiderDriverID}
                          />
                          <div>
                            {formik.errors.RiderDriverID &&
                              formik.touched.RiderDriverID && (
                                <span className="red_color fw_500">
                                  {formik.errors.RiderDriverID}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <hr className="suva_grey_color mt-4" />

                  <div className=" mt-4">
                    <label
                      htmlFor="password"
                      className={
                        (formik.errors.password && formik.touched.password) ||
                        error
                          ? ` fs_16 fw_500 mb-2 red_color`
                          : ` fs_16 fw_500 mb-2 primary_color`
                      }
                    >
                      Please submit your password to confirm
                    </label>
                    <div>
                      <div className="d-flex position-relative">
                        <input
                          type={resetPasswordVisible ? "text" : "password"}
                          className={
                            (formik.errors.password &&
                              formik.touched.password) ||
                            error
                              ? ` password_error background_none w-100 border_radius_3px py-1 outline_none ps-2`
                              : `background_none w-100 border_radius_3px py-1 password_input outline_none ps-2`
                          }
                          placeholder="Please enter your password"
                          name="password"
                          id="password"
                          value={formik.values.password}
                          onChange={(e) => {
                            formik.handleChange(e);
                            setError(false);
                          }}
                        />
                        <div className="restore_password_visible cursor_pointer">
                          <img
                            onClick={() =>
                              setResetPasswordVisible(!resetPasswordVisible)
                            }
                            src={resetPasswordVisible ? eyeOn : eyeOff}
                            alt="password visibility on or off"
                          />
                        </div>
                      </div>
                      <div style={{ height: "25px" }}>
                        {formik.errors.password && formik.touched.password && (
                          <span className="red_color fw_500 ">
                            {formik.errors.password}
                          </span>
                        )}
                        {error && (
                          <span className="red_color fw_500 ">{error}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-10 col-sm-12 d-flex justify-content-between mt-4 mb-3">
                  <button
                    className="white_bg border_radius_5px px-2 py-1"
                    type="button"
                    onClick={() => {
                      handleGenerateSosClose();
                      formik.resetForm();
                      setError(false);
                      setIDtypeShow("bookingID");
                    }}
                  >
                    <span className="d-flex justify-content-center align-items-center px-4">
                      <i className="ri-close-circle-fill primary_color fs_18"></i>
                      <span className=" fs_18 primary_color ps-2 fw_500 ">
                        Cancel
                      </span>
                    </span>
                  </button>
                  <button
                    className={`white_color primary_bg fs_16 px-5 py-1 border_radius_5px border_none`}
                    type="submit"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RiderGenerateSosModal;
