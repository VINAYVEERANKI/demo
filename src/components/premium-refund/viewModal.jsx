import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import RefundDetails from "../refund/refund-details";
import "../../components/refund/refundComponent.css";
import {
  formatAmount,
  navigationFn,
  removeUnderScore,
  riderNavigateFn,
} from "../helper";
import { NavLink } from "react-router-dom";
import useDisplayToggle from "../useDisplayToggle";

const PremiumRefundViewModal = ({
  refundViewShow,
  handleRefundViewClose,
  refundDataView,
  type,
}) => {
  console.log(refundDataView, "alshasl");
  console.log(type, "alshasl");

  const [detailsRideType, setDetailsRideType] = useState(false);
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);

  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDetailsRideType,
  });

  const PendingRefundData = [
    {
      label: "Driver ID",
      value: refundDataView?.driver?.driver_id2 ?? "--",
      navigation: false,
      display: true,
      link: navigationFn(
        refundDataView?.booking?.booking_classification,
        refundDataView?.booking?.id
      ),
    },
    {
      label: "Premium",
      value: refundDataView?.premium_type ?? "--",
      navigation: false,
      display: true,
      link: riderNavigateFn(refundDataView?.rider, refundDataView?.rider?.id),
    },
    {
      label: "Plan",
      value: refundDataView?.plan_type ?? "--",
      display: true,
      navigation: false,
    },
    {
      label: "Premium Value",
      value: `₹ ${formatAmount(refundDataView?.premium_amount)}`,
      display: true,
      navigation: false,
    },
    {
      label: "Amount To Be Refunded(₹)",

      value: `₹ ${formatAmount(refundDataView?.amount_to_be_refunded)}`,
      display: true,
      navigation: false,
    },
    {
      label: "Initiated At",
      value: refundDataView.created_at
        ? moment(refundDataView.created_at).format("DD-MM-YYYY,hh:mm A")
        : "--",
      display: true,
      navigation: false,
    },
    {
      label: "Current Owner",
      value: refundDataView.current_owner ? refundDataView.current_owner : "--",
      display: true,
      navigation: false,
    },
  ];

  const cancelledRefundData = [
    {
      label: "Driver ID",
      value: refundDataView?.driver?.driver_id2 ?? "--",
      navigation: false,
      display: true,
      link: navigationFn(
        refundDataView?.booking?.booking_classification,
        refundDataView?.booking?.id
      ),
    },
    {
      label: "Premium",
      value: refundDataView?.premium_type ?? "--",
      navigation: false,
      display: true,
      link: riderNavigateFn(refundDataView?.rider, refundDataView?.rider?.id),
    },
    {
      label: "Plan",
      value: refundDataView?.plan_type ?? "--",
      display: true,
      navigation: false,
    },
    {
      label: "Premium Value",
      value: `₹ ${formatAmount(refundDataView?.premium_amount)}`,
      display: true,
      navigation: false,
    },
    {
      label: "Amount To Be Refunded(₹)",
      value: `₹ ${formatAmount(refundDataView?.amount_to_be_refunded)}`,
      display: true,
      navigation: false,
    },
    {
      label: "Reason For Cancellation",
      value: refundDataView?.cancel_refund_decription ?? "--",
      display: true,
      navigation: false,
    },
  ];

  const successFulRefundData = [
    {
      label: "Driver ID",
      value: refundDataView?.driver?.driver_id2 ?? "--",
      navigation: false,
      display: true,
      link: navigationFn(
        refundDataView?.booking?.booking_classification,
        refundDataView?.booking?.id
      ),
    },
    {
      label: "Premium",
      value: refundDataView?.premium_type ?? "--",
      navigation: false,
      display: true,
      link: riderNavigateFn(refundDataView?.rider, refundDataView?.rider?.id),
    },
    {
      label: "Plan",
      value: refundDataView?.plan_type ?? "--",
      display: true,
      navigation: false,
    },
    {
      label: "Premium Value",
      value: `₹ ${formatAmount(refundDataView?.premium_amount)}`,
      display: true,
      navigation: false,
    },
    {
      label: "Amount To Be Refunded(₹)",
      value: `₹ ${formatAmount(refundDataView?.amount_to_be_refunded)}`,
      display: true,
      navigation: false,
    },
    {
      label: "Refund Type",
      value: refundDataView?.refund_type
        ? removeUnderScore(refundDataView?.refund_type)
        : "--",
      display: true,
      navigation: false,
    },
    {
      label: "Razorpay Refunded Amount",
      value: `₹ ${formatAmount(refundDataView?.razorpay_refund_amount)}`,
      display: refundDataView?.refund_type === "RazorpayRefund",
      navigation: false,
    },
    {
      label: "Transaction ID",
      value: refundDataView.transaction_id
        ? refundDataView.transaction_id
        : "--",
      display: refundDataView?.refund_type === "RazorpayRefund",
      navigation: false,
    },
    {
      label: "Razorpay Order ID",
      value: refundDataView.razorpay_order_id
        ? refundDataView.razorpay_order_id
        : "--",
      display: refundDataView?.refund_type === "RazorpayRefund",
      navigation: false,
    },
    {
      label: "Refunded Amount",
      value: refundDataView.refunded_amount
        ? refundDataView.refunded_amount
        : "--",
      display: refundDataView?.refund_type === "Other",
      navigation: false,
    },
    {
      label: "Refund Description",
      value: refundDataView.refund_decription
        ? refundDataView.refund_decription
        : "--",
      display: refundDataView?.refund_type === "Other",
      navigation: false,
    },
  ];

  const refundDataFn = useMemo(() => {
    if (type === "pendingRefund") {
      return PendingRefundData;
    } else if (type === "cancelledRefund") {
      return cancelledRefundData;
    } else if (type === "successRefund") {
      return successFulRefundData;
    }
  }, [type, refundDataView]);

  return (
    <Modal
      centered
      show={refundViewShow}
      onHide={handleRefundViewClose}
      dialogClassName="cancelled_refund_container"
      backdropClassName="refund_view_backdrop"
      backdrop={"static"}
      keyboard={false}
    >
      <Modal.Body>
        <div>
          <div className="d-flex justify-content-between">
            <div className="primary_color fs_20 fw_500 d-flex justify-content-center">
              <span>{refundDataView?.driver?.driver_id2 ?? "--"}</span>
            </div>
            <div
              onClick={() => handleRefundViewClose()}
              className="cursor_pointer"
            >
              <i className="ri-close-circle-fill primary_color fs_20"></i>
            </div>
          </div>
          <hr className="light_grey_bg my-2" />
          <div className="light_blue_color details_text fs_16 fw_500 cursor_pointer position-relative d-flex justify-content-end pe-4">
            <span
              ref={onClickRef}
              onClick={() => setDetailsRideType(!detailsRideType)}
            >
              Details
            </span>
          </div>
          {detailsRideType ? (
            <>
              <div
                className="cancelled_refund_details_container border white_bg border_radius mt-2"
                ref={insideClickRef}
              >
                <RefundDetails item={refundDataView} />
              </div>
            </>
          ) : null}
          <div className="row gx-0">
            {refundDataFn
              ?.filter((data) => data?.display === true)
              ?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="col-7 ">
                      <span className="secondary_color fw_400 fs_16 ps-4">
                        {item?.label}
                      </span>
                    </div>

                    <div className="col-5">
                      {/* <span className="cement_color text-start fw_400 fs_16">
                      {item?.value}
                    </span> */}
                      {item?.navigation === true ? (
                        <NavLink
                          className="fs_14 fw_600 primary_color"
                          to={item?.link}
                        >
                          {item?.value}
                        </NavLink>
                      ) : (
                        <span className="fs_14 fw_600 secondary_color">
                          {item?.value}
                        </span>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PremiumRefundViewModal;
