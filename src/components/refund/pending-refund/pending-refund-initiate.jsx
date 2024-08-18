import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { components } from "react-select";
import {
  reactSelectBasicInformation,
  reactSelectBasicInformationError,
} from "../../mui-styles/react-styles";
import DropDownIcon from "../../../assets/icons/dropdown-icon";
import ProccedPasswordModal from "./procced-password-modal";
import { PendingRefundViewAction } from "../../../redux/actions/pendingRefundAction";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import { Spinner } from "react-bootstrap";
import RefundDetails from "../refund-details";
import { formatAmount, numRegex } from "../../helper";

const PendingRefundInitiate = ({
  refundInitiateShow,
  handleRefundInitiateClose,
  pendingRefundView,
  pendingTable,
  setPendingTable,
}) => {
  console.log(
    pendingRefundView?.booking?.rider_payment?.amount_to_be_refunded,
    "dlkfjaslk"
  );
  const [detailsRideType, setDetailsRideType] = useState(false);

  const [loading, setLoading] = useState(false);

  const [proceedPasswordShow, setProceedPasswordShow] = useState(false);
  const handleProceedPasswordShow = () => setProceedPasswordShow(true);
  const handleProceedPasswordClose = () => setProceedPasswordShow(false);

  const amount = 102;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      refundType: "",
      CurrentBalanceRefundedAmount: "",
      razorpayRefundedAmount: "",
      transactionID: "",
      razorpayOrderID: "",
    },

    validationSchema: Yup.object({
      refundType: Yup.string().required(
        "Note: Please Complete All The Above Fields"
      ),
      CurrentBalanceRefundedAmount: Yup.string().when("refundType", {
        is: (val) => val?.includes("current_balance_deposite"),

        then: Yup.string()
          .matches(numRegex, "Invalid value")
          .test(
            "lessThanOrEqual",
            "Amount must be equal to or less than Amount to be refunded",
            function (value) {
              return (
                formatAmount(value) <=
                formatAmount(
                  pendingRefundView?.booking?.rider_payment
                    ?.amount_to_be_refunded
                )
              );
            }
          )
          .required("Required"),
        otherwise: Yup.string(),
      }),
      razorpayRefundedAmount: Yup.string().when("refundType", {
        is: (val) => val?.includes("razorpay_refund"),
        then: Yup.string()
          .matches(numRegex, "Invalid value")
          .test(
            "lessThanOrEqual",
            "Amount must be equal to or less than Amount to be refunded",
            function (value) {
              return (
                formatAmount(value) <=
                formatAmount(
                  pendingRefundView?.booking?.rider_payment
                    ?.amount_to_be_refunded
                )
              );
            }
          )
          .required("Required"),
        otherwise: Yup.string(),
      }),
      transactionID: Yup.string().when("refundType", {
        is: (val) => val?.includes("razorpay_refund"),
        then: Yup.string()
          .matches(numRegex, "Invalid value")
          .required("Note: Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
      razorpayOrderID: Yup.string().when("refundType", {
        is: (val) => val?.includes("razorpay_refund"),
        then: Yup.string()
          .matches(numRegex, "Invalid value")
          .required("Note: Please Complete All The Above Fields"),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handleProceedPasswordShow();
    },
  });

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon />
      </components.DropdownIndicator>
    );
  };
  const refundType = [
    { value: "current_balance_deposite", label: "Current Balance Deposit" },
    { value: "razorpay_refund", label: "Razorpay Refund" },
  ];

  const refundData = [
    {
      label: "Booking ID",
      value: pendingRefundView?.booking_id2
        ? pendingRefundView?.booking_id2
        : "--",
    },
    {
      label: "Rider ID",
      value: pendingRefundView?.rider_id2 ? pendingRefundView?.rider_id2 : "--",
    },
    {
      label: "Final Fare",
      value: pendingRefundView?.booking?.rider_billing?.final_fare
        ? "₹" + " " + pendingRefundView?.booking?.rider_billing?.final_fare
        : pendingRefundView?.booking?.rider_billing?.final_fare === 0
        ? "₹" + " " + pendingRefundView?.booking?.rider_billing?.final_fare
        : "--",
    },
    {
      label: "Adjusted Fare",
      value: pendingRefundView?.booking?.rider_payment
        ?.total_trip_fare_adjusted_amount
        ? "₹" +
          " " +
          pendingRefundView?.booking?.rider_payment
            ?.total_trip_fare_adjusted_amount
        : pendingRefundView?.booking?.rider_payment
            ?.total_trip_fare_adjusted_amount === 0
        ? "₹" +
          " " +
          pendingRefundView?.booking?.rider_payment
            ?.total_trip_fare_adjusted_amount
        : "--",
    },
  ];

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  return (
    <>
      <ProccedPasswordModal
        pendingRefundView={pendingRefundView}
        formik={formik}
        proceedPasswordShow={proceedPasswordShow}
        handleProceedPasswordClose={handleProceedPasswordClose}
        handleRefundInitiateClose={handleRefundInitiateClose}
        pendingTable={pendingTable}
        setPendingTable={setPendingTable}
        setLoading={setLoading}
        loading={loading}
        type="riderRefund"
      />
      <Modal
        centered
        show={refundInitiateShow}
        onHide={handleRefundInitiateClose}
        dialogClassName="cancelled_refund_container"
        backdropClassName="refund_view_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div>
            <div className="d-flex justify-content-between">
              <div className="primary_color fs_20 fw_500 d-flex justify-content-center">
                <span>
                  {" "}
                  {pendingRefundView?.booking_id2
                    ? pendingRefundView?.booking_id2
                    : "--"}{" "}
                </span>
              </div>
              <div
                onClick={() => {
                  handleRefundInitiateClose();
                  formik.resetForm();
                }}
                className="cursor_pointer"
              >
                <i className="ri-close-circle-fill primary_color fs_20"></i>
              </div>
            </div>
            <hr className="light_grey_bg my-2" />
            <div
              className="light_blue_color details_text fs_16 fw_500 cursor_pointer position-relative d-flex justify-content-end pe-4"
              onClick={() => setDetailsRideType(!detailsRideType)}
            >
              Details
            </div>
            {detailsRideType ? (
              <>
                <div className="cancelled_refund_details_container border white_bg border_radius mt-2">
                  <RefundDetails item={pendingRefundView} />
                </div>
              </>
            ) : null}
            <div className="row gx-0">
              {refundData?.map((item) => {
                return (
                  <>
                    <div className="col-7 ">
                      <span className="secondary_color fw_400 ps-4">
                        {item?.label}
                      </span>
                    </div>

                    <div className="col-5">
                      <span className="cement_color text-start fw_400">
                        {item?.value}
                      </span>
                    </div>
                  </>
                );
              })}
            </div>

            <hr className="light_grey_bg" />
            <div className="row gx-0 ">
              <div className="col-7">
                <span className="secondary_color ps-4 fw_400">
                  Amount To Be Refunded(₹)
                </span>
              </div>

              <div className="col-5">
                <span className="cement_color  text-start fw_400 fs_16">
                  {pendingRefundView?.booking?.rider_payment
                    ?.amount_to_be_refunded
                    ? "₹" +
                      " " +
                      pendingRefundView?.booking?.rider_payment
                        ?.amount_to_be_refunded
                    : pendingRefundView?.booking?.rider_payment
                        ?.amount_to_be_refunded === 0
                    ? "₹" +
                      " " +
                      pendingRefundView?.booking?.rider_payment
                        ?.amount_to_be_refunded
                    : "--"}
                </span>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="row gx-0 mb-2 mt-2">
                <div className="col-7">
                  <span
                    className={
                      formik.errors.refundType && formik.touched.refundType
                        ? "red_color ps-4 fw_400 "
                        : "secondary_color ps-4 fw_400"
                    }
                  >
                    Refund Type
                  </span>
                </div>

                <div className="col-5 ">
                  <Select
                    id="refundType"
                    instanceId="refundType"
                    options={refundType}
                    placeholder="Select Refund Type"
                    styles={
                      formik.errors.refundType && formik.touched.refundType
                        ? reactSelectBasicInformationError
                        : reactSelectBasicInformation
                    }
                    name="refundType"
                    value={refundType.filter((option) => {
                      return option.value === formik.values.refundType;
                    })}
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "refundType",
                          value: selectedOption.value,
                        },
                      };
                      formik.handleChange(event);
                      console.log(selectedOption?.value, "akdakjdadsda");
                      if (
                        selectedOption?.value === "current_balance_deposite"
                      ) {
                        formik.setFieldValue(
                          "CurrentBalanceRefundedAmount",
                          formatAmount(
                            pendingRefundView?.booking?.rider_payment
                              ?.amount_to_be_refunded
                          )
                        );
                        formik.setFieldValue("razorpayRefundedAmount", "");
                      } else if (selectedOption?.value === "razorpay_refund") {
                        formik.setFieldValue(
                          "razorpayRefundedAmount",
                          formatAmount(
                            pendingRefundView?.booking?.rider_payment
                              ?.amount_to_be_refunded
                          )
                        );
                        formik.setFieldValue(
                          "CurrentBalanceRefundedAmount",
                          ""
                        );
                      }
                      formik.setFieldValue("transactionID", "");
                      formik.setFieldValue("razorpayOrderID", "");
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                    }}
                  />
                </div>
              </div>

              {formik.values.refundType === "current_balance_deposite" ? (
                <>
                  <div className="row gx-0 ">
                    <div className="col-7">
                      <span
                        className={
                          formik.errors.CurrentBalanceRefundedAmount &&
                          formik.touched.CurrentBalanceRefundedAmount
                            ? " red_color ps-4 fw_400"
                            : "secondary_color ps-4 fw_400"
                        }
                      >
                        Current Balance Refunded Amount
                      </span>
                    </div>
                    <div className="col-5">
                      <span className="cement_color text-start fw_400">
                        <input
                          name="CurrentBalanceRefundedAmount"
                          // className={
                          //   formik.errors.CurrentBalanceRefundedAmount &&
                          //   formik.touched.CurrentBalanceRefundedAmount
                          //     ? "w-100 fs_16 error_border border_radius_3px outline_none"
                          //     : "w-100 fs_16 primary_border border_radius_3px outline_none"
                          // }
                          className="w-100 fs_16 disabled_border disabled_bg_color border_radius_3px outline_none"
                          value={formik.values.CurrentBalanceRefundedAmount}
                          onChange={formik.handleChange}
                          disabled
                        />
                      </span>
                    </div>
                  </div>
                  <div className="error_mes_height mt-2">
                    {formik.errors.CurrentBalanceRefundedAmount &&
                      formik.touched.CurrentBalanceRefundedAmount && (
                        <span className="dark_red_color d-flex justify-content-center  fs_16">
                          {formik.errors.CurrentBalanceRefundedAmount}
                        </span>
                      )}
                  </div>
                </>
              ) : null}

              {formik.values.refundType === "razorpay_refund" ? (
                <>
                  <div className="row gx-0 mb-2">
                    <div className="col-7">
                      <span
                        className={
                          formik.errors.razorpayRefundedAmount &&
                          formik.touched.razorpayRefundedAmount
                            ? "red_color ps-4 fw_400"
                            : "secondary_color ps-4 fw_400"
                        }
                      >
                        Razorpay Refunded Amount(₹)
                      </span>
                    </div>
                    <div className="col-5">
                      <span className="cement_color text-start fw_400">
                        <input
                          name="razorpayRefundedAmount"
                          // className={
                          //   formik.errors.razorpayRefundedAmount &&
                          //   formik.touched.razorpayRefundedAmount
                          //     ? "w-100 fs_16 error_border border_radius_3px outline_none"
                          //     : "w-100 fs_16 primary_border border_radius_3px outline_none"
                          // }
                          className="w-100 fs_16 disabled_border disabled_bg_color border_radius_3px outline_none"
                          value={formik.values.razorpayRefundedAmount}
                          onChange={formik.handleChange}
                          disabled
                        />
                      </span>
                    </div>
                  </div>
                  <div className="row gx-0 mb-2">
                    <div className="col-7">
                      <span
                        className={
                          formik.errors.transactionID &&
                          formik.touched.transactionID
                            ? "red_color ps-4 fw_400"
                            : "secondary_color ps-4 fw_400"
                        }
                      >
                        Transaction ID*
                      </span>
                    </div>
                    <div className="col-5">
                      <span className="cement_color text-start fw_400">
                        <input
                          name="transactionID"
                          className={
                            formik.errors.transactionID &&
                            formik.touched.transactionID
                              ? "w-100 fs_16 error_border border_radius_3px outline_none"
                              : "w-100 fs_16 primary_border border_radius_3px outline_none"
                          }
                          value={formik.values.transactionID}
                          onChange={formik.handleChange}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="row gx-0 mb-4">
                    <div className="col-7">
                      <span
                        className={
                          formik.errors.razorpayOrderID &&
                          formik.touched.razorpayOrderID
                            ? "red_color ps-4 fw_400"
                            : "secondary_color ps-4 fw_400"
                        }
                      >
                        Razorpay Order ID*
                      </span>
                    </div>
                    <div className="col-5">
                      <span className="cement_color text-start fw_400">
                        <input
                          name="razorpayOrderID"
                          className={
                            formik.errors.razorpayOrderID &&
                            formik.touched.razorpayOrderID
                              ? "w-100 fs_16 error_border border_radius_3px outline_none"
                              : "w-100 fs_16 primary_border border_radius_3px outline_none"
                          }
                          value={formik.values.razorpayOrderID}
                          onChange={formik.handleChange}
                        />
                      </span>
                    </div>
                  </div>
                </>
              ) : null}

              {/* <div className="error_mes_height mt-2">
                {formik.errors.razorpayRefundedAmount &&
                  formik.touched.razorpayRefundedAmount && (
                    <span className="dark_red_color d-flex justify-content-center  fs_16">
                      {formik.errors.razorpayRefundedAmount}
                    </span>
                  )}
              </div>

              <div className="error_mes_height">
                {formik.errors.refundType && formik.touched.refundType && (
                  <span className="dark_red_color d-flex justify-content-center  fs_16">
                    {formik.errors.refundType}
                  </span>
                )}
              </div> */}

              {firstErrorField && (
                <div className="dark_red_color d-flex justify-content-center  fs_16">
                  {formik.errors[firstErrorField]}
                </div>
              )}

              <div className={`d-flex justify-content-center mt-2`}>
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
                  <button
                    className={`white_color primary_bg fs_16 px-3 py-1 border_radius_5px`}
                    type="submit"
                  >
                    Proceed
                  </button>
                )}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PendingRefundInitiate;
