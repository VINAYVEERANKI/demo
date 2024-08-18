import { useFormik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import ModalInputField from "../../form/modalInputField";
import ModalHeading from "../../utilits/buttons/modal-header";
import Okaybtn from "../../utilits/buttons/okaybtn";
import "./coupons.css";
import { useNavigate } from "react-router";

const CreateDriverCouponsModal = ({
  createCouponShow,
  handleCreateCouponClose,
}) => {
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userType: "Driver",
      couponClassification: "New Account",
      couponType: "Current balance deposit",
    },
  });

  return (
    <>
      <Modal
        centered
        show={createCouponShow}
        onHide={handleCreateCouponClose}
        dialogClassName="create_coupon_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="p-2">
            <form onSubmit={formik.handleSubmit}>
              <ModalHeading
                title={"Create New Coupon"}
                closeFn={handleCreateCouponClose}
                statusShow={false}
              />
              <div className="d-flex flex-column justify-content-center mx-5 px-5">
                <div className="row mt-4">
                  <ModalInputField
                    title={"User Type*"}
                    type={"text"}
                    placeholder={"Enter User Type*"}
                    itemName={"userType"}
                    inputValue={formik.values.userType}
                    disabled={true}
                    labelClassName="raven_color"
                  />
                </div>
                <div className="row mt-2">
                  <ModalInputField
                    title={"Coupon Classification*"}
                    type={"text"}
                    placeholder={"Enter Coupon Classification*"}
                    itemName={"couponClassification"}
                    inputValue={formik.values.couponClassification}
                    disabled={true}
                    labelClassName="raven_color"
                  />
                </div>
                <div className="row mt-2">
                  <ModalInputField
                    title={"Coupon Type*"}
                    type={"text"}
                    placeholder={"Enter value"}
                    itemName={"couponType"}
                    inputValue={formik.values.couponType}
                    disabled={true}
                    labelClassName="raven_color"
                  />
                </div>

                <Okaybtn
                  okay={"Proceed"}
                  iconShow={false}
                  okayFn={() => {
                    navigate(`/driver-coupons/create`);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateDriverCouponsModal;
