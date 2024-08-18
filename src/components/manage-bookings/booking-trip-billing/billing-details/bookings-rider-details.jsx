import React from "react";
import { NavLink } from "react-router-dom";

const BookingsRiderDetails = ({ riderBookingData }) => {
  const riderPaymentData = riderBookingData?.billingDetails?.rider_details;

  const riderDetails = [
    {
      label: "Payment Status",
      value: riderPaymentData?.payment_status
        ? riderPaymentData?.payment_status
        : "--",
    },
    {
      label: "Payment Method",
      value: riderPaymentData?.payment_method
        ? riderPaymentData?.payment_method
        : "--",
    },
    {
      label: "Transaction ID",
      value: riderPaymentData?.transaction_id
        ? riderPaymentData?.transaction_id
        : "--",
    },
    {
      label: "Razorpay Order ID",
      value: riderPaymentData?.razorpay_order_id
        ? riderPaymentData?.razorpay_order_id
        : "--",
    },
    {
      label: "Coupon Code Applied",
      value: riderPaymentData?.coupon_code_applied === true ? "Yes" : "No",
    },
    {
      label: "Coupon Code",
      value: riderPaymentData?.rider_coupon?.coupon_id
        ? riderPaymentData?.rider_coupon?.coupon_id
        : "--",
      navLink: true,
      link: `/coupon-usage-history-view/${riderPaymentData?.rider_coupon?.id}`,
      coupon_title: "need data",
      coupon_id: riderPaymentData?.rider_coupon?.coupon_id,
      status: riderPaymentData?.rider_coupon?.coupon_status,
    },
  ];

  console.log(riderBookingData, "sdfbask");
  return (
    <>
      <div className="mt-3">
        <span className="fs_16 fw_600 primary_color heading_border_bottom">
          Rider details
        </span>
      </div>

      <>
        <div className="row mt-2">
          {riderDetails?.map((user) => (
            <div className="col-lg-6 col-12" key={user?.label}>
              <div className="row">
                <div className="col-7">
                  <span className="primary_color fs_14 fw_600">
                    {user?.label}
                  </span>
                </div>
                <div className="col-5">
                  <span className="secondary_color fs_14 fw_600">
                    {user?.navLink ? (
                      <NavLink
                        className={"secondary_color"}
                        to={user?.link}
                        state={{
                          coupon_title: user?.coupon_title,
                          coupon_id: user?.coupon_id,
                          status: user?.status,
                        }}
                      >
                        {user?.value}
                      </NavLink>
                    ) : (
                      user?.value
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </>
  );
};

export default BookingsRiderDetails;
