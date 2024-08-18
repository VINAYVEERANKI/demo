import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../refundComponent.css";
import errorToast from "../../utilits/errorToast";
import { PendingRefundUpdateAction } from "../../../redux/actions/pendingRefundAction";
import { useDispatch } from "react-redux";
import successToast from "../../utilits/successToast";
import { Spinner } from "react-bootstrap";
import SuccessMessagemodal from "../../modals/successMessageModal";
import PasswordInputField from "../../form/passwordInputField";
import {
  premiumPendingRefundUpdateAction,
  premiumRefundCancelAction,
} from "../../../redux/actions/premiumRefundAction";
import { removeUnderScore } from "../../helper";

const ProccedPasswordModal = ({
  proceedPasswordShow,
  handleProceedPasswordClose,
  handleRefundInitiateClose,
  formik,
  pendingRefundView,
  pendingTable,
  setPendingTable,
  setLoading,
  loading,
  type,
  action,
}) => {
  console.log(type, "aksjbakjdasd");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => setSuccessMessageShow(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formikUpdatePass = useFormik({
    initialValues: {
      password: "",
      description: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .trim()
        .required("Please fill this field to procced"),
      // description: Yup.string().trim().required("required"),
    }),
    onSubmit: (values, { resetForm }) => {
      formik.setFieldValue("password", formikUpdatePass.values.password);
      console.log(formik.values);
      if (type === "riderRefund") {
        setLoading(true);
        dispatch(
          PendingRefundUpdateAction(
            {
              refund_id: pendingRefundView?.id,
              refund_type: formik.values.refundType,
              current_balance_refunded_amount:
                +formik.values.CurrentBalanceRefundedAmount,
              razorpay_refunded_amount: +formik.values.razorpayRefundedAmount,

              transaction_id: formik.values.transactionID,
              razorpay_oreder_id: formik.values.razorpayOrderID,
              password: formikUpdatePass.values.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "premiumRefund") {
        if (action === "CreatePremiumRefund") {
          setLoading(true);
          dispatch(
            premiumPendingRefundUpdateAction(
              {
                refund_id: pendingRefundView?.id,
                refund_type: formik.values.refundType,
                razorpay_refund_amount: +formik.values.razorpayRefundedAmount,
                transaction_id: formik.values.transactionID,
                razorpay_order_id: formik.values.razorpayOrderID,
                refund_decription: formik.values.description,
                refunded_amount: formik.values.refundedAmount,
                password: formikUpdatePass.values.password,
              },
              onSuccess,
              onError
            )
          );
        } else if (action === "CancelPremiumRefund") {
          setLoading(true);
          dispatch(
            premiumRefundCancelAction(
              {
                refund_id: pendingRefundView?.id,
                cancel_refund_decription: formikUpdatePass.values.description,
                password: formikUpdatePass.values.password,
              },
              onSuccess,
              onError
            )
          );
        }
      }
    },
  });

  const onSuccess = (data) => {
    setLoading(false);
    successToast(data?.message);
    console.log("Success");
    formikUpdatePass.resetForm();
    formik.resetForm();
    handleProceedPasswordClose();
    handleSuccessMessageShow();
    handleRefundInitiateClose();
    setPendingTable(!pendingTable);
  };

  const onError = (data) => {
    console.log(data);
    setLoading(false);
    errorToast(data?.data);
    setError(data?.data);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          action === "CancelPremiumRefund"
            ? "Refund Cancelled successfully!"
            : "Refund Updated Successfully!"
        }
      />
      {/* <button onClick={handleProceedPasswordShow}>hgvjh</button> */}
      <Modal
        centered
        show={proceedPasswordShow}
        onHide={handleProceedPasswordClose}
        dialogClassName="proceed_password_container"
        contentClassName="border_radius_10px"
        backdropClassName="proceed_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-sm-3 px-1">
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center mt-3 mb-4">
                <span className="fs_21 primary_color fw_600 text-center">
                  Are you sure you want to proceed?
                </span>
              </div>
              <div className="mt-3">
                <PasswordInputField
                  reasonTitle="Reason for cancellation"
                  reason={action === "CancelPremiumRefund" ? true : false}
                  inputContainer={"px-sm-3"}
                  itemName={"password"}
                  reasonItemName={"description"}
                  inputValue={formikUpdatePass.values.password}
                  reasonItemValue={formikUpdatePass.values.description}
                  onChangeFn={(e) => {
                    formikUpdatePass.handleChange(e);
                  }}
                  onBlurFn={formikUpdatePass.handleBlur}
                  formikError={formikUpdatePass.errors.password}
                  formikTouched={formikUpdatePass.touched.password}
                  formikReasonError={formikUpdatePass.errors.description}
                  formikReasonTouched={formikUpdatePass.touched.description}
                  error={error}
                  onReasonChangeFn={(e) => {
                    formikUpdatePass.handleChange(e);
                  }}
                  onReasonBlurFn={formikUpdatePass.handleBlur}
                  is_reasonError={false}
                  is_formikError={false}
                />
                <div className="red_color fw_500 ms-sm-3 ">
                  {error
                    ? removeUnderScore(error)
                    : formikUpdatePass.errors.password &&
                      formikUpdatePass.touched.password && (
                        <span className="red_color fw_500 ">
                          {formikUpdatePass.errors.password}
                        </span>
                      )}
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4 px-sm-3 mb-3 gap-1">
                <button
                  type="button"
                  className=" background_none border_radius_5px fs_16 px-4 primary_color fw_500 d-flex justify-content-center  gap-1 align-items-center "
                  onClick={() => {
                    handleProceedPasswordClose();
                    formikUpdatePass.resetForm();
                    setError(false);
                  }}
                >
                  <i className="ri-close-circle-fill fs_16 mt-0"></i>
                  Cancel
                </button>

                <button
                  className=" primary_bg border_radius_5px px-5 fs_16 py-1 border_none"
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
                    <span className="  white_color ps-2">Yes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProccedPasswordModal;
