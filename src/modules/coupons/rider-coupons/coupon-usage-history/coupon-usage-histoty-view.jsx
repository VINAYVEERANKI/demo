import React from "react";
import { useLocation, useParams } from "react-router";
import RiderCouponUseageDetails from "../../../../components/coupons/riderCoupons/couponUseageDetails";
import InnerLayout from "../../../../components/layout/innerLayout";

const CouponUsageHistotyView = () => {
  const location = useLocation();
  const params = useParams();
  console.log(location?.state?.status);
  const statusList = [
    {
      backGroundColor: `${
        location?.state?.status === "Active"
          ? "active_bg"
          : "light_red_bg"
      }`,
      value: location?.state?.status,
    },
  ];
  return (
    <>
      <>
        <InnerLayout
          mainHeading={
            location?.state?.coupon_title + " - " + location?.state?.coupon_id
          }
          currentStatus={true}
          statusValue={location?.state?.status}
          statusList={statusList}
        >
          <RiderCouponUseageDetails params={params} />
        </InnerLayout>
      </>
    </>
  );
};

export default CouponUsageHistotyView;
