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
import { FaresRentalEditAction } from "../../../../../redux/actions/manageFaresAction";
import SpinnerLoading from "../../../../utilits/spinnerLoading";

function RentalUpdatePassword({
  changeUpdatePasswordshow,
  handleChangeUpdatePasswordClose,
  formik,
  params,
  rentalObject,
  rentalTable,
  setRentalTable,
  setEdititemId,
  packageTime,
  setRentalBtnDisable,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setRentalTable(!rentalTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const dispatch = useDispatch();

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
            main_zone_id: params,
            ride_type: rentalObject,
            package_time: packageTime,
            package_km: formik?.values?.PackageKm,
            base_fare: formik?.values?.baseFare,
            per_extra_km_fare: formik?.values?.perExtraKmFare,
            per_extra_time_fare: formik?.values?.perExtraTimeFare,
            waiting_fee: formik?.values?.waitingFee,
            booking_fee: formik?.values?.bookingFee,
            cancellation_fee: formik?.values?.CancellationFee,
            password: values?.ConfirmPassword,
          },
          onEditSuccess,
          onEditError
        )
      );
    },
  });
  function resetField() {
    formik.setFieldValue("ConfirmPassword", "");
  }

  const onEditSuccess = (data) => {
    setLoading(false);
    handleChangeUpdatePasswordClose();
    setEdititemId(null);
    successToast(data?.data);
    handleSuccessMessageShow();
    setRentalBtnDisable(false);
  };

  const onEditError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
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
                  Are you sure you want to make changes ?{" "}
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
              <div className="d-flex justify-content-between mt-4 px-5 mb-3 ">
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
                    <SpinnerLoading />
                  ) : (
                    <span className=" fs_18 white_color ps-2">Proceed</span>
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
