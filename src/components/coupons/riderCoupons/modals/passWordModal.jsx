import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import PasswordInputField from "../../../form/passwordInputField";
import SuccessMessagemodal from "../../../modals/successMessageModal";
import Cancelbtn from "../../../utilits/buttons/cancelbtn";
import { useDispatch } from "react-redux";
import { approveCouponAction } from "../../../../redux/actions/riderCoupon/approveCouponAction";
import successToast from "../../../utilits/successToast";
import errorToast from "../../../utilits/errorToast";
import { useNavigate } from "react-router";
import { rejectCouponAction } from "../../../../redux/actions/riderCoupon/rejectCouponAction";
import { deleteCouponAction } from "../../../../redux/actions/riderCoupon/deleteCouponAction";

const RiderCouponPassword = ({
  couponPasswordShow,
  handleCouponPasswordClose,
  id,
  status,
  title = "",
}) => {
  console.log(status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      ConfirmPassword: ``,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim().required(" "),
    }),
    onSubmit: (values, { resetForm }) => {
      // resetForm();
      setLoading(true);
      if (status === "Approve") {
        dispatch(
          approveCouponAction(
            {
              coupon_id: id,
              password: values?.ConfirmPassword,
            },
            onSuccess,
            onError
          )
        );
      } else if (status === "Reject") {
        dispatch(
          rejectCouponAction(
            {
              coupon_id: id,
              password: values?.ConfirmPassword,
            },
            onSuccess,
            onError
          )
        );
      } else if (status === "Delete") {
        dispatch(
          deleteCouponAction(
            {
              coupon_id: id,
              password: values.ConfirmPassword,
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
    console.log(data);
    successToast(data?.data);
    handleSuccessMessageShow();
    handleCouponPasswordClose();
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
    console.log(data);
  };

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    navigate("/rider-coupons");
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  return (
    <>
      <Modal
        centered
        show={couponPasswordShow}
        onHide={handleCouponPasswordClose}
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
              <span className="red_color fw_500 ps-4">{error}</span>
              <div className="d-flex justify-content-between mt-4 px-5 mb-3 ">
                <Cancelbtn
                  cancelFn={(e) => {
                    handleCouponPasswordClose(e);
                    setError(false);
                    formik.resetForm();
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-5 py-1 border_none"
                  type="sumbit"
                >
                  <span className=" fs_18 white_color">Proceed</span>
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
          status === "Approve"
            ? "Coupon successfully approved!"
            : status === "Reject"
            ? "Coupon successfully rejected!"
            : "Coupon successfully deleted!"
        }
      />
    </>
  );
};

export default RiderCouponPassword;
