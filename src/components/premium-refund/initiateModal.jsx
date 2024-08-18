import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { components } from "react-select";
import {
  reactSelectBasicInformation,
  reactSelectBasicInformationError,
} from "../mui-styles/react-styles";
import DropDownIcon from "../../assets/icons/dropdown-icon";
import ProccedPasswordModal from "../refund/pending-refund/procced-password-modal";
import RefundDetails from "../refund/refund-details";
import { formatAmount, numRegex } from "../helper";
import { Spinner } from "react-bootstrap";

const PremiumPendingRefundInitiate = ({
  refundInitiateShow,
  handleRefundInitiateClose,
  pendingRefundView,
  pendingTable,
  setPendingTable,
}) => {
  console.log(pendingRefundView, "dlkfjaslk");
  const [action, setAction] = useState("");
  const [detailsRideType, setDetailsRideType] = useState(false);

  const [loading, setLoading] = useState(false);

  const [proceedPasswordShow, setProceedPasswordShow] = useState(false);
  const handleProceedPasswordShow = () => setProceedPasswordShow(true);
  const handleProceedPasswordClose = () => {
    setProceedPasswordShow(false);
  };

  const amount = 102;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      refundType: "",
      refundedAmount: "",
      description: "",
      razorpayRefundedAmount: "",
      transactionID: "",
      razorpayOrderID: "",
    },

    validationSchema: Yup.object({
      refundType: Yup.string().required(
        "Note: Please Complete All The Above Fields"
      ),
      refundedAmount: Yup.string().when("refundType", {
        is: (val) => val?.includes("Other"),

        then: Yup.string()
          .matches(numRegex, "Invalid value")
          .test(
            "lessThanOrEqual",
            "Amount must be equal to or less than Amount to be refunded",
            function (value) {
              return (
                formatAmount(value) <=
                formatAmount(pendingRefundView?.amount_to_be_refunded)
              );
            }
          )
          .required("Required"),
        otherwise: Yup.string(),
      }),
      description: Yup.string().when("refundType", {
        is: (val) => val?.includes("Other"),

        then: Yup.string().trim().required("Please fill the about field"),
        otherwise: Yup.string(),
      }),
      razorpayRefundedAmount: Yup.string().when("refundType", {
        is: (val) => val?.includes("RazorpayRefund"),
        then: Yup.string()
          .matches(numRegex, "Invalid value")
          .test(
            "lessThanOrEqual",
            "Amount must be equal to or less than Amount to be refunded",
            function (value) {
              return (
                formatAmount(value) <=
                formatAmount(pendingRefundView?.amount_to_be_refunded)
              );
            }
          )
          .required("Required"),
        otherwise: Yup.string(),
      }),
      transactionID: Yup.string().when("refundType", {
        is: (val) => val?.includes("RazorpayRefund"),
        then: Yup.string()
          .matches(numRegex, "Invalid value")
          .required("Required"),
        otherwise: Yup.string(),
      }),
      razorpayOrderID: Yup.string().when("refundType", {
        is: (val) => val?.includes("RazorpayRefund"),
        then: Yup.string()
          .matches(numRegex, "Invalid value")
          .required("Required"),
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
    { value: "RazorpayRefund", label: "Razorpay Refund" },
    { value: "Other", label: "Others" },
  ];

  const refundData = [
    {
      label: "Driver ID",
      value: pendingRefundView?.driver?.driver_id2 ?? "--",
    },
    {
      label: "Premium",
      value: pendingRefundView?.premium_type ?? "--",
    },
    {
      label: "Plan",
      value: pendingRefundView?.plan_type ?? "--",
    },
    {
      label: "Premium Value",
      value: `₹ ${formatAmount(pendingRefundView?.premium_amount)}`,
    },
  ];

  console.log(formik?.values?.razorpayRefundedAmount, "lajsdhaksda");
  console.log(pendingRefundView?.amount_to_be_refunded, "lajsdhaksda");

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
        type="premiumRefund"
        action={action}
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
                <span> {pendingRefundView?.driver?.driver_id2 ?? "--"} </span>
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
                  {pendingRefundView?.amount_to_be_refunded
                    ? "₹" +
                      " " +
                      formatAmount(pendingRefundView?.amount_to_be_refunded)
                    : pendingRefundView?.amount_to_be_refunded === 0
                    ? "₹" +
                      " " +
                      formatAmount(pendingRefundView?.amount_to_be_refunded)
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
                      if (selectedOption?.value === "Other") {
                        formik.setFieldValue(
                          "refundedAmount",
                          formatAmount(pendingRefundView?.amount_to_be_refunded)
                        );
                        formik.setFieldValue("razorpayRefundedAmount", "");
                      } else if (selectedOption?.value === "RazorpayRefund") {
                        formik.setFieldValue(
                          "razorpayRefundedAmount",
                          formatAmount(pendingRefundView?.amount_to_be_refunded)
                        );
                        formik.setFieldValue("refundedAmount", "");
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

              {formik.values.refundType === "Other" ? (
                <>
                  <div className="row gx-0 mb-4">
                    <div className="col-7">
                      <span
                        className={
                          formik.errors.refundedAmount &&
                          formik.touched.refundedAmount
                            ? " red_color ps-4 fw_400"
                            : "secondary_color ps-4 fw_400"
                        }
                      >
                        Refunded Amount(₹)
                      </span>
                    </div>
                    <div className="col-5">
                      <span className="cement_color text-start fw_400">
                        <input
                          name="refundedAmount"
                          // className={
                          //   formik.errors.refundedAmount &&
                          //   formik.touched.refundedAmount
                          //     ? "w-100 fs_16 error_border border_radius_3px outline_none"
                          //     : "w-100 fs_16 primary_border border_radius_3px outline_none"
                          // }
                          className="w-100 fs_16 disabled_border disabled_bg_color border_radius_3px outline_none"
                          value={formik.values.refundedAmount}
                          onChange={formik.handleChange}
                          disabled
                        />
                      </span>
                    </div>
                  </div>
                  <div className="row gx-0 ">
                    <div className="col-7">
                      <div
                        className={
                          formik.errors.description &&
                          formik.touched.description
                            ? " red_color ps-4 fw_400 "
                            : "secondary_color ps-4 fw_400"
                        }
                      >
                        Describe how the money was refunded?
                      </div>
                    </div>
                    <div className="col-5">
                      <span className="cement_color text-start fw_400">
                        <textarea
                          name="description"
                          className={
                            formik.errors.description &&
                            formik.touched.description
                              ? "w-100 fs_16 error_border border_radius_3px outline_none premium_refund_description_block"
                              : "w-100 fs_16 primary_border border_radius_3px outline_none premium_refund_description_block"
                          }
                          value={formik.values.description}
                          onChange={formik.handleChange}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="error_mes_height mt-2">
                    {formik.errors.refundedAmount &&
                      formik.touched.refundedAmount && (
                        <span className="dark_red_color d-flex justify-content-center  fs_16">
                          {formik.errors.refundedAmount}
                        </span>
                      )}
                  </div>
                </>
              ) : null}

              {formik.values.refundType === "RazorpayRefund" ? (
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

              <div className="error_mes_height mt-2">
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
              </div>

              <div className={`d-flex justify-content-center mt-2 gap-3`}>
                <button
                  className="red_color background_none error_border fs_16 px-3 py-1 border_radius_5px"
                  type="button"
                  onClick={() => {
                    setAction("CancelPremiumRefund");
                    formik.resetForm();
                    handleProceedPasswordShow();
                  }}
                >
                  Cancel Refund
                </button>
                {/* {loading ? (
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
                ) : ( */}
                <button
                  className={`white_color primary_bg fs_16 px-3 py-1 border_radius_5px`}
                  type="submit"
                  onClick={() => setAction("CreatePremiumRefund")}
                >
                  Proceed
                </button>
                {/* )} */}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PremiumPendingRefundInitiate;
