import React from "react";
import { useLocation, useParams } from "react-router";
import IndividualDriverCouponUsageDetails from "../../../components/coupons/driverCoupons/individualCouponUsageDetails";
import InnerLayout from "../../../components/layout/innerLayout";

const DriverCouponUsageHistoryView = () => {
  const params = useParams();
  const location = useLocation();
  const statusList = [
    {
      backGroundColor: `${
        location?.state?.coupon_status === "Active"
          ? "active_bg"
          : "light_red_bg"
      }`,
      value: location?.state?.coupon_status,
    },
  ];
  return (
    <>
      <InnerLayout
        mainHeading={`New Account - ${location?.state?.coupon_id}`}
        currentStatus={true}
        statusValue={location?.state?.coupon_status}
        statusList={statusList}
      >
        <IndividualDriverCouponUsageDetails
          params={params?.id}
          type={"driverCoupon"}
        />
      </InnerLayout>
    </>
  );
};

export default DriverCouponUsageHistoryView;
