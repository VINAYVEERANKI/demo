import React from "react";
import { useLocation, useParams } from "react-router";
import InnerLayout from "../../../../components/layout/innerLayout";
import RiderReferralusageHistoryView from "../../../../components/referrals/riderReferrals/usageHistoryIndividualView";

const ReferralRecevierHistory = () => {
  const params = useParams();
  const location = useLocation();
  const coupon_type = location?.state?.coupon_type;
  const referral_classification = location?.state?.referral_classification;

  
  const statusList = [
    {
      backGroundColor: `${
        location?.state?.referral_status === "Active" ? "active_bg" : "light_red_bg"
      }`,
      value: location?.state?.referral_status,
    },
  ];

  return (
    <>
      <InnerLayout
        mainHeading={`Rider To Rider Referral - ${location?.state?.referral_id}`}
        currentStatus={true}
        statusList={statusList}
      >
        <RiderReferralusageHistoryView
          params={params?.id}
          referralType={"receiverReferral"}
          coupon_type={coupon_type}
          type="riderReferral"
          referral_classification={referral_classification}
        />
      </InnerLayout>
    </>
  );
};

export default ReferralRecevierHistory;
