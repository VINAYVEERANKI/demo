import React from "react";
import Modal from "react-bootstrap/Modal";
import "../../../components/rider-coupons/coupon-component.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import CouponSelectField from "../../form/CouponSelectField";

const ReferralCreateModal = ({
  createReferralShow,
  handleCreateReferralClose,
}) => {
  const navigate = useNavigate();

  const formikCreate = useFormik({
    enableReinitialize: true,
    initialValues: {
      userType: "rider",
      referralClassification: "riderToRiderReferral",
      senderCoupon: "",
      recieverCoupon: "",
    },
    validationSchema: Yup.object({
      userType: Yup.string().required("required"),
      referralClassification: Yup.string().required("required"),
      senderCoupon: Yup.string().required("required"),
      recieverCoupon: Yup.string().required("required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleCreateReferralClose();
      navigate("/create-new-referral", {
        state: values,
      });
    },
  });

  const referralType = [
    { value: "rider", label: "Rider" },
    { value: "driver", label: "Driver" },
  ];
  const referralClassifications = [
    { value: "riderToRiderReferral", label: "Rider To Rider Referral" },
    { value: "driverToDriverReferral", label: "Driver To Driver Referral" },
  ];
  const SenderCouponType = [
    { value: "CurrentBalanceDeposit", label: "Current Balance Deposit" },
  ];

  const couponType = [
    { value: "N/A", label: "N/A", isDisabled: true },
    { value: "X%DiscountUpToY", label: "X%DiscountUpToY" },
    { value: "XAmountOff", label: "XAmountOff" },
    { value: "X%CashbackUpToY", label: "X % Cashback Upto ₹ Y" },
    { value: "CurrentBalanceDeposit", label: "Current Balance Deposit" },
  ];
  return (
    <>
      <Modal
        centered
        show={createReferralShow}
        onHide={handleCreateReferralClose}
        dialogClassName="create_coupon_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_coupon_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs_23 fw_500">Create New Coupon</span>
            <span
              className=""
              onClick={() => {
                handleCreateReferralClose();
                formikCreate.resetForm();
              }}
            >
              <i className="ri-close-circle-fill fs_26" />
            </span>
          </div>
          <hr className="my-0 disabled_color" />

          <form onSubmit={formikCreate.handleSubmit}>
            <div className="mt-3 mx-5 px-3">
              <CouponSelectField
                label_fontSize="fs_16 fw_500"
                labelName="User Type*"
                placeholder="Select "
                option={referralType}
                itemName="userType"
                formikValue={formikCreate.values.userType}
                formik={formikCreate}
                formikError={formikCreate.errors.userType}
                formikTouched={formikCreate.touched.userType}
                selectDisabled={true}
              />
            </div>

            <div className="mt-3 mx-5 px-3">
              <CouponSelectField
                label_fontSize="fs_16 fw_500"
                labelName="Referral Classification*"
                placeholder="Select "
                option={referralClassifications}
                itemName="referralClassification"
                formikValue={formikCreate.values.referralClassification}
                formik={formikCreate}
                formikError={formikCreate.errors.referralClassification}
                formikTouched={formikCreate.touched.referralClassification}
                selectDisabled={true}
              />
            </div>
            <div className="mt-3 mx-5 px-3">
              <CouponSelectField
                label_fontSize="fs_16 fw_500"
                labelName="Sender Coupon Type*"
                placeholder="Select Sender Coupon Type"
                option={SenderCouponType}
                itemName="senderCoupon"
                formikValue={formikCreate.values.senderCoupon}
                formik={formikCreate}
                formikError={formikCreate.errors.senderCoupon}
                formikTouched={formikCreate.touched.senderCoupon}
              />
            </div>
            <div className="mt-3 mx-5 px-3">
              <CouponSelectField
                label_fontSize="fs_16 fw_500"
                labelName="Receiver Coupon Type*"
                placeholder="Select Receiver Coupon Type"
                option={couponType}
                itemName="recieverCoupon"
                formikValue={formikCreate.values.recieverCoupon}
                formik={formikCreate}
                formikError={formikCreate.errors.recieverCoupon}
                formikTouched={formikCreate.touched.recieverCoupon}
              />
            </div>
            <div className="d-flex justify-content-center mt-2">
              <button
                type="submit"
                className="primary_bg border_radius_5px px-4 py-1 white_color"
              >
                Proceed
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ReferralCreateModal;
