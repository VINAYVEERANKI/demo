import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../rideType-vehicleTypeComponents.css";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import {
  addVehicleTypeAction,
  vehicleTypeEditAction,
} from "../../../redux/actions/vehicleTypeAction";
import successToast from "../../utilits/successToast";
import errorToast from "../../utilits/errorToast";
import { useDispatch } from "react-redux";
import PasswordInputField from "../../form/passwordInputField";
import SuccessMessagemodal from "../../modals/successMessageModal";

function VehicelTypePassWModal({
  vehicleTypePassWShow,
  handleVehicleTypePassWClose,
  handleVehicleTypeClose,
  vehicleTypeTable,
  setVehicleTypeTable,
  formik,
  setUploaded,
  type,
  vehicleTypeID,
  title,
}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => setSuccessMessageShow(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);


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
      if (type === "createVehicleType") {
        dispatch(
          addVehicleTypeAction(
            {
              ride_type_id: formik.values.rideType,
              comride_seating_capacity: formik.values.seatingCapacity,
              image: formik.values?.Upload,
              vehicle_make: formik.values.vehicleMake,
              vehicle_model: formik.values.vehicleModel,
              vehicle_color: formik.values.vehicleColor,
              password: formikCreatePass.values.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "editVehicleType") {
        dispatch(
          vehicleTypeEditAction(
            {
              vehicle_type_id: vehicleTypeID,
              comride_seating_capacity: formik.values.seatingCapacity,
              ride_type_id: formik.values.rideType,
              image: formik.values.Upload,
              vehicle_make: formik.values.vehicleMake,
              vehicle_model: formik.values.vehicleModel,
              vehicle_color: formik.values.vehicleColor,
              password: formikCreatePass?.values.password,
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
    setVehicleTypeTable(!vehicleTypeTable);
    successToast(data?.message);
    formik.resetForm();
    handleVehicleTypePassWClose();
    handleVehicleTypeClose();
    handleSuccessMessageShow();
    setUploaded(false);
  };
  const onError = (data) => {
    console.log(data);
    setLoading(false);
    setVehicleTypeTable(false);
    if (type === "createVehicleType") {
      errorToast(data?.data?.data);
      setErrorMessage(data?.data?.data);
    } else if (type === "editVehicleType") {
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
          type === "createVehicleType"
            ? "'Vehicle Type (Source)' Created Successfully!"
            : "Changes made successfully!"
        }
      />
      <Modal
        centered
        show={vehicleTypePassWShow}
        onHide={handleVehicleTypePassWClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikCreatePass.handleSubmit}>
              <div className="d-flex justify-content-center fs_20 fw_600 mt-0">
                <span className="primary_color text-nowrap">{title}</span>
              </div>

              <div className="mx-3 mt-4 ">
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
                    handleVehicleTypePassWClose();
                    setLoading(false);
                    setErrorMessage(false);
                  }}
                />

                <button
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                  type="submit"
                >
                  <span className=" fs_18 white_color px-3">Proceed</span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default VehicelTypePassWModal;
