import React from "react";
import CurrentBalance from "../../../components/premiums/PremiumHistoryTable/CurrentBalance";
import { useParams } from "react-router";

const PremiumCurrentBalance = () => {
  const params = useParams();
  return (
    <div>
      <CurrentBalance params={params} />
    </div>
  );
};

export default PremiumCurrentBalance;
