import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../rideType-vehicleTypeComponents.css";
import Proceedbtn from "../../utilits/buttons/proceedbtn";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import {
  addRideTypeAction,
  editRideTypeAction,
} from "../../../redux/actions/rideTypeAction";
import { useDispatch } from "react-redux";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import PasswordInputField from "../../form/passwordInputField";
import SuccessMessagemodal from "../../modals/successMessageModal";

function RideTypePasswordModal({
  rideTypePasswordModal,
  handleRideTypePassWordClose,
  handleRideTypeModalClose,
  formik,
  adminTable,
  setAdminTable,
  rideTypeID,
  type,
  title,
}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => setSuccessMessageShow(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formRef = useRef();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const formikCreatePass = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      formik.setFieldValue("password", formikCreatePass.values.password);
      console.log(values);
      setLoading(true);

      const Data = {
        image: formik.values.Upload,
        applicable_zone_permission:
          formik.values.applicable_zone_permission ?? [],
        eligible_booking_type: formik.values.eligibleBookingType,
        ride_type: formik.values.rideType,
        comride_seating_capacity: formik.values.seatingCapacity,
        password: formikCreatePass.values.password,
      };
      if (type === "CreateRideType") {
        dispatch(addRideTypeAction(Data, onSuccess, onError));
      } else if (type === "editRideType") {
        dispatch(
          editRideTypeAction(
            {
              ride_type_id: rideTypeID,
              ...Data,
            },
            onSuccess,
            onError
          )
        );
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    setAdminTable(!adminTable);
    successToast(data?.message);
    formik.resetForm();
    formikCreatePass.resetForm();
    handleRideTypePassWordClose();
    handleRideTypeModalClose();
    handleSuccessMessageShow();
  };
  const onError = (data) => {
    console.log(data);
    setLoading(false);
    setAdminTable(false);
    if (type === "CreateRideType") {
      errorToast(data?.data?.data);
      setErrorMessage(data?.data?.data);
    } else if (type === "editRideType") {
      errorToast(data?.data);
      setErrorMessage(data?.data);
    }
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          type === "CreateRideType"
            ? "'Ride Type' Created Successfully!"
            : "Changes made successfully!"
        }
      />
      <Modal
        centered
        show={rideTypePasswordModal}
        onHide={handleRideTypePassWordClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikCreatePass.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-0">
                <span className="primary_color text-nowrap">{title}</span>
              </div>
              <div className="mx-3 mt-3 ">
                <PasswordInputField
                  itemName={"password"}
                  inputValue={formikCreatePass.values.password}
                  onChangeFn={(e) => {
                    formikCreatePass.handleChange(e);
                    setErrorMessage(false);
                  }}
                  onBlurFn={formikCreatePass.handleBlur}
                  formikError={formikCreatePass.errors.password}
                  formikTouched={formikCreatePass.touched.password}
                  error={errorMessage}
                />
              </div>
              <span className="red_color fw_500 ps-5 ms-3">
                {errorMessage}{" "}
              </span>

              <div className="d-flex justify-content-between mt-4 px-5 mb-3 mx-3">
                <Cancelbtn
                  cancelFn={() => {
                    handleRideTypePassWordClose();
                    setLoading(false);
                    setErrorMessage(false);
                    formikCreatePass.resetForm();
                  }}
                />

                <Proceedbtn submitFn={handleSubmit} loading={loading} />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default RideTypePasswordModal;
