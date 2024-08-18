import { useLocation, useParams } from "react-router";
import CreateReferralDetails from "../../../../components/referrals/riderReferrals/create-referral-details";

const ReferralDeletedView = () => {
  const Data = useLocation();
  const params = useParams();

  console.log(params);

  return (
      <>
          <CreateReferralDetails Data={Data} params={params} />
      </>
  );
};
export default ReferralDeletedView;
