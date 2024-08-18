import React, { useEffect, useState } from "react";
import InnerLayout from "../../../components/layout/innerLayout";
import PremiumLayout from "../../../components/layout/premiumLayout";
import PremiumTypes from "../../../components/premiums/premium-billing-details/premium-types";
import { useLocation, useParams } from "react-router";
import "../../../components/premiums/premium.css";

const DriverPremiums = () => {
  const location = useLocation();
  const [premiumSidebarTab, setPremiumSidebarTab] = useState("Premium1");
  const [premiumSubTab, setPremiumSubTab] = useState("PremiumBillingDetails");
  const sideBarList = [
    { label: "Premium -1", value: "Premium1" },
    { label: "Premium -2", value: "Premium2" },
    { label: "Premium -3", value: "Premium3" },
    {
      label: `Premium -4 ${"Disabled" ? "Disabled" : "Enabled"}`,
      value: "Premium4",
    },
    {
      label: `Premium -5 ${"Disabled" ? "Disabled" : "Enabled"}`,
      value: "Premium5",
    },
  ];

  useEffect(() => {
    setPremiumSidebarTab(
      localStorage.getItem("defaultPremiumSidebarTab") ?? "Premium1"
    );
  }, [premiumSubTab]);

  const topNavbarList = [
    { label: "Premium Billing Details", value: "PremiumBillingDetails" },
    { label: "Dues & Deposit Details", value: "DuesDepositDetails" },
    { label: "Subscriptions", value: "Subscriptions" },
    { label: "Premium Settings", value: "PremiumSettings" },
  ];

  return (
    <>
      <InnerLayout
        mainHeading={`Default Premiums - ${location?.state?.ridetype}`}
        navigateEnable={true}
      >
        <PremiumLayout
          topNavbarList={topNavbarList}
          sideNavbarList={sideBarList}
          premiumSidebarTab={premiumSidebarTab}
          setPremiumSidebarTab={setPremiumSidebarTab}
          type={"driverPremium"}
        >
          <PremiumTypes
            managePremiumType={"defaultPremium"}
            premiumtype={premiumSidebarTab}
            faqType="driverPremium"
            topNavbarList={topNavbarList}
            setPremiumSubTab={setPremiumSubTab}
          />
        </PremiumLayout>
      </InnerLayout>
    </>
  );
};

export default DriverPremiums;
