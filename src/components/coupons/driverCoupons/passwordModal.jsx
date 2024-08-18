import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import PasswordInputField from "../../form/passwordInputField";
import SuccessMessagemodal from "../../modals/successMessageModal";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import errorToast from "../../utilits/errorToast";
import SpinnerLoading from "../../utilits/spinnerLoading";
import successToast from "../../utilits/successToast";
import * as driverCouponAction from "../../../redux/actions/driverCouponAction";

const DriverCouponPasswordModal = ({
  changeUpdatePasswordshow,
  handleChangeUpdatePasswordClose,
  params,
  title = "Are you sure you want make changes ?",
  statusBtn = "",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      ConfirmPassword: ``,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      if (statusBtn === "Approve") {
        dispatch(
          driverCouponAction?.approveDriverCouponAction(
            {
              coupon_id: params,
              password: values?.ConfirmPassword,
            },
            onSuccess,
            onError
          )
        );
      } else if (statusBtn === "Reject") {
        dispatch(
          driverCouponAction?.rejectDriverCouponAction(
            {
              coupon_id: params,
              password: values?.ConfirmPassword,
            },
            onSuccess,
            onError
          )
        );
      } else if (statusBtn === "Delete") {
        dispatch(
          driverCouponAction?.deleteDriverCouponAction(
            {
              coupon_id: params,
              password: values?.ConfirmPassword,
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
    successToast(data?.data);
    handleSuccessMessageShow();
    handleChangeUpdatePasswordClose();
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
  };

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    navigate("/driver-coupons");
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  return (
    <>
      <Modal
        centered
        show={changeUpdatePasswordshow}
        onHide={handleChangeUpdatePasswordClose}
        dialogClassName="ban_application_container"
        contentClassName="border_radius_10px"
        backdropClassName="rating_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center   mt-3 mb-4">
                <span className="fs_21 primary_color fw_600">{title}</span>
              </div>
              <PasswordInputField
                inputContainer={"px-4"}
                reason={false}
                formikReasonError={formik.errors.deleteReason}
                formikReasonTouched={formik.touched.deleteReason}
                itemName={"ConfirmPassword"}
                inputValue={formik.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formik.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formik.handleBlur}
                formikError={formik.errors.ConfirmPassword}
                formikTouched={formik.touched.ConfirmPassword}
                error={error}
              />
              <div className="red_color fw_500 ps-4">{error}</div>
              <div className="d-flex justify-content-between mt-4 px-5 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handleChangeUpdatePasswordClose();
                    formik.resetForm();
                    setError(false);
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-5 py-1 border_none"
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
        handleSuccessMessageClose={() => {
          handleSuccessMessageClose();
        }}
        title={
          statusBtn === "Approve"
            ? "Coupon successfully approved!"
            : statusBtn === "Delete"
            ? "Coupon successfully deleted!"
            : "Coupon successfully rejected!"
        }
      />
    </>
  );
};

export default DriverCouponPasswordModal;
