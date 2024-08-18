import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import RefundDetails from "../refund-details";
import { formatAmount, navigationFn, riderNavigateFn } from "../../helper";
import useDisplayToggle from "../../useDisplayToggle";
import { NavLink } from "react-router-dom";

const CancelledRefundViewModal = ({
  cancelledRefundViewShow,
  handleCancelledRefundViewClose,
  pendingRefundView,
}) => {
  const [detailsRideType, setDetailsRideType] = useState(false);

  const refundData = [
    {
      label: "Booking ID",
      value: pendingRefundView?.booking_id2
        ? pendingRefundView?.booking_id2
        : "--",
      navigation: true,
      link: navigationFn(
        pendingRefundView?.booking?.booking_classification,
        pendingRefundView?.booking?.id
      ),
    },
    {
      label: "Rider ID",
      value: pendingRefundView?.rider_id2 ? pendingRefundView?.rider_id2 : "--",
      navigation: true,
      link: riderNavigateFn(
        pendingRefundView?.rider,
        pendingRefundView?.rider?.id
      ),
    },
    {
      label: "Final Fare",
      value: `₹ ${formatAmount(
        pendingRefundView?.booking?.rider_billing?.final_fare
      )}`,
      navigation: false,
    },
    {
      label: "Adjusted Fare",
      value: `₹ ${formatAmount(
        pendingRefundView?.booking?.rider_payment
          ?.total_trip_fare_adjusted_amount
      )}`,
      navigation: false,
    },
    {
      label: "Amount To Be Refunded(₹)",
      value: `₹ ${formatAmount(
        pendingRefundView?.booking?.rider_payment?.amount_to_be_refunded
      )}`,
      navigation: false,
    },
  ];

  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDetailsRideType,
  });
  return (
    <>
      <Modal
        centered
        show={cancelledRefundViewShow}
        onHide={handleCancelledRefundViewClose}
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
              onClick={() => handleCancelledRefundViewClose()}
              className="cursor_pointer"
            >
              <i className="ri-close-circle-fill primary_color fs_20"></i>
            </div>
          </div>
          <hr className="light_grey_bg mt-2 mb-1" />
          <div
            className="light_blue_color details_text fs_16 fw_500 cursor_pointer position-relative d-flex justify-content-end pe-4"
            onClick={() => setDetailsRideType(!detailsRideType)}
            ref={onClickRef}
          >
            Details
          </div>
          {detailsRideType ? (
            <>
              <div
                className="cancelled_refund_details_container border white_bg border_radius mt-2"
                ref={insideClickRef}
              >
                <RefundDetails item={pendingRefundView} />
              </div>
            </>
          ) : null}
          <div className="row gx-0">
            {refundData?.map((item) => {
              return (
                <>
                  <div className="col-6">
                    <span className="secondary_color fw_400 fs_16 ps-sm-4">
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

export default CancelledRefundViewModal;
