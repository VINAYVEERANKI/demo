import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import RefundDetails from "../refund-details";
import "../refundComponent.css";
import { formatAmount, navigationFn, riderNavigateFn } from "../../helper";
import { NavLink } from "react-router-dom";
import useDisplayToggle from "../../useDisplayToggle";

const PendingRefundView = ({
  refundViewShow,
  handleRefundViewClose,
  pendingRefundView,
}) => {
  console.log(pendingRefundView, "alshasl");

  const [detailsRideType, setDetailsRideType] = useState(false);
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);

  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDetailsRideType,
  });

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
      // value: pendingRefundView?.booking?.rider_billing?.final_fare
      //   ? "₹" + " " + pendingRefundView?.booking?.rider_billing?.final_fare
      //   : pendingRefundView?.booking?.rider_billing?.final_fare === 0
      //   ? "₹" + " " + pendingRefundView?.booking?.rider_billing?.final_fare
      //   : "--",
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
    {
      label: "Initiated At",
      value: pendingRefundView.created_at
        ? moment(pendingRefundView.created_at).format("DD-MM-YYYY,hh:mm A")
        : "--",
      navigation: false,
    },
    {
      label: "Current Owner",
      value: pendingRefundView.current_owner
        ? pendingRefundView.current_owner
        : "--",
      navigation: false,
    },
  ];

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
              <span>
                {pendingRefundView?.booking_id2
                  ? pendingRefundView?.booking_id2
                  : "--"}
              </span>
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
                <RefundDetails item={pendingRefundView} />
              </div>
            </>
          ) : null}
          <div className="row gx-0">
            {refundData?.map((item, index) => {
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

export default PendingRefundView;
