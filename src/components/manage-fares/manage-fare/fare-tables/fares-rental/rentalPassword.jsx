import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInputField from "../../../../form/passwordInputField";
import Cancelbtn from "../../../../utilits/buttons/cancelbtn";
import SuccessMessagemodal from "../../../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import errorToast from "../../../../utilits/errorToast";
import successToast from "../../../../utilits/successToast";
import { Spinner } from "react-bootstrap";
import {
  FaresRentalEditAction,
  FaresTollsEditAction,
} from "../../../../../redux/actions/manageFaresAction";

function RentalUpdatePassword({
  changeUpdatePasswordshow,
  handleChangeUpdatePasswordClose,
  formik,
  mainZoneId,
  rentalTable,
  setRentalTable,
  editedValues,
  setIsEditing,
  setEditedIndex,
  ride_type,
  rentalId,
}) {
  console.log(editedValues, "akdjakjda");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setRentalTable(!rentalTable);
    formik.resetForm();
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formikUpdatePass = useFormik({
    initialValues: {
      ConfirmPassword: ``,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        FaresRentalEditAction(
          {
            main_zone_id: mainZoneId,
            id: rentalId,
            ride_type: ride_type,
            package_time: +editedValues?.package_time,
            base_fare: +editedValues?.base_fare,
            package_km: +editedValues?.package_km,
            per_extra_km_fare: +editedValues?.per_extra_km_fare,
            per_extra_time_fare: +editedValues?.per_extra_time_fare,
            waiting_fee: +editedValues?.waiting_fee,
            booking_fee: +editedValues?.booking_fee,
            cancellation_fee: +editedValues?.cancellation_fee,
            password: values?.ConfirmPassword,
          },

          onEditSuccess,
          onEditError
        )
      );
    },
  });
  function resetField() {
    formikUpdatePass.setFieldValue("ConfirmPassword", "");
  }

  const onEditSuccess = (data) => {
    localStorage.removeItem("newRenatlPackage");
    setLoading(false);
    handleChangeUpdatePasswordClose();
    resetField();
    successToast(data?.data);
    handleSuccessMessageShow();
    setEditedIndex(null);
    setIsEditing(false);
  };

  const onEditError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
    setRentalTable(false);
  };
  return (
    <>
      <Modal
        centered
        backdrop={"static"}
        keyboard={false}
        show={changeUpdatePasswordshow}
        onHide={handleChangeUpdatePasswordClose}
        dialogClassName="change_update_password_container"
        contentClassName="change_update_password_card"
        backdropClassName="create_password_modal_backdrop"
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center   mt-1 mb-4">
                <span className="fs_20 primary_color fw_600">
                  Are you sure you want to make changes?{" "}
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
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5  px-sm-0 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handleChangeUpdatePasswordClose();
                    setLoading(false);
                    setError(false);
                    resetField();
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                  type="sumbit"
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      size="sm"
                      animation="border"
                      className="mx-3"
                      variant="secondary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <span className=" fs_18 white_color">Proceed</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made successfully!`}
      />
    </>
  );
}

export default RentalUpdatePassword;
