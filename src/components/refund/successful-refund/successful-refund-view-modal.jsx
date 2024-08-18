import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import RefundDetails from "../refund-details";
import "../refundComponent.css";
import { formatAmount, navigationFn, removeUnderScore, riderNavigateFn } from "../../helper";
import useDisplayToggle from "../../useDisplayToggle";
import { NavLink } from "react-router-dom";

const SuccessfulRefundViewModal = ({
  successfulRefundView,
  handleSuccessfulRefundViewClose,
  pendingRefundView,
}) => {
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);

  const [detailsRideType, setDetailsRideType] = useState(false);

  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDetailsRideType,
  });

  console.log(pendingRefundView, "lskdalsd");

  const refundData = [
    {
      label: "Booking ID",
      value: pendingRefundView?.booking_id2
        ? pendingRefundView?.booking_id2
        : "--",
      display: true,
      navigation: true,
      link: navigationFn(
        pendingRefundView?.booking?.booking_classification,
        pendingRefundView?.booking?.id
      ),
    },
    {
      label: "Rider ID",
      value: pendingRefundView?.rider_id2 ? pendingRefundView?.rider_id2 : "--",
      display: true,
      navigation: true,
      link: riderNavigateFn(
        pendingRefundView?.rider,
        pendingRefundView?.rider?.id
      ),
    },
    {
      label: "Final Fare",

      value: `${formatAmount(
        pendingRefundView?.booking?.rider_billing?.final_fare
      )}`,
      display: true,
      navigation: false,
    },
    {
      label: "Adjusted Fare",
      // value: pendingRefundView?.booking?.rider_payment
      //   ?.total_trip_fare_adjusted_amount
      //   ? "₹" +
      //     " " +
      //     pendingRefundView?.booking?.rider_payment
      //       ?.total_trip_fare_adjusted_amount
      //   : pendingRefundView?.booking?.rider_payment
      //       ?.total_trip_fare_adjusted_amount === 0
      //   ? "₹" +
      //     " " +
      //     pendingRefundView?.booking?.rider_payment
      //       ?.total_trip_fare_adjusted_amount
      //   : "--",
      value: `₹ ${formatAmount(
        pendingRefundView?.booking?.rider_payment
          ?.total_trip_fare_adjusted_amount
      )}`,
      display: true,
      navigation: false,
    },
    {
      label: "Amount To Be Refunded(₹)",

      value: `₹ ${formatAmount(
        pendingRefundView?.booking?.rider_payment?.amount_to_be_refunded
      )}`,
      display: true,
      navigation: false,
    },
    {
      label: "Refund Type",
      value:
        // pendingRefundView?.refund_type
        //   ? removeUnderScore(pendingRefundView?.refund_type)
        //   : "--",
        pendingRefundView?.refund_type
          ? pendingRefundView.refund_type === "current_balance_deposite"
            ? "current balance deposit"
            : removeUnderScore(pendingRefundView.refund_type)
          : "--",
      display: true,
      navigation: false,
    },
    {
      label: "Current Balance Deposit",
      value: `₹ ${formatAmount(
        pendingRefundView?.current_balance_refunded_amount
      )}`,
      display: pendingRefundView?.current_balance_refunded_amount
        ? true
        : false,
      navigation: false,
    },
    {
      label: "Razorpay Refunded Amount",

      value: `₹ ${formatAmount(pendingRefundView?.razorpay_refunded_amount)}`,
      display: pendingRefundView?.current_balance_refunded_amount
        ? false
        : true,
      navigation: false,
    },
    {
      label: "Transaction ID",
      value: pendingRefundView.transaction_id
        ? pendingRefundView.transaction_id
        : "--",
      display: pendingRefundView?.current_balance_refunded_amount
        ? false
        : true,
      navigation: false,
    },
    {
      label: "Razorpay Order ID",
      value: pendingRefundView.razorpay_order_id
        ? pendingRefundView.razorpay_order_id
        : "--",
      display: pendingRefundView?.current_balance_refunded_amount
        ? false
        : true,
      navigation: false,
    },
  ];

  return (
    <>
      <Modal
        centered
        show={successfulRefundView}
        onHide={handleSuccessfulRefundViewClose}
        dialogClassName="cancelled_refund_container"
        backdropClassName="refund_view_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <div className="primary_color fs_20 fw_500 d-flex justify-content-center">
              <span>
                {pendingRefundView?.booking_id2
                  ? pendingRefundView?.booking_id2
                  : "--"}
              </span>
            </div>
            <div
              onClick={() => handleSuccessfulRefundViewClose()}
              className="cursor_pointer"
            >
              <i className="ri-close-circle-fill primary_color fs_20"></i>
            </div>
          </div>
          <hr className="light_grey_bg mt-2 mb-1" />
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
                className="cancelled_refund_details_container border white_bg border_radius mt-1"
                ref={insideClickRef}
              >
                <RefundDetails item={pendingRefundView} />
              </div>
            </>
          ) : null}
          <div className="row gx-0">
            {refundData
              ?.filter((item) => item?.display === true)
              ?.map((item) => {
                return (
                  <>
                    <div className="col-6">
                      <span className="secondary_color fw_400 fs_16 ps-4">
                        {item?.label}
                      </span>
                    </div>

                    <div className="col-6">
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
                  </>
                );
              })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SuccessfulRefundViewModal;
