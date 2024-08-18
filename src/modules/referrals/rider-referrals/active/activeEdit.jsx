import React from "react";
import { useLocation, useParams } from "react-router";
import CreateReferralDetails from "../../../../components/referrals/riderReferrals/create-referral-details";

const ReferralActiveEdit = () => {
  const Data = useLocation();
  const params = useParams();
console.log(params?.id);
  return (
      <>
        <CreateReferralDetails Data={Data} params={params} />
      </>
  );
};

export default ReferralActiveEdit;
