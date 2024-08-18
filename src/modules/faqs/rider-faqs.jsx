import React from "react";
import InnerLayout from "../../components/layout/innerLayout";
import FaqLayout from "../../components/layout/faqLayout";
import { useState } from "react";
import FaqTable from "../../components/FAQs/faq-table/faqTable";
import { useEffect } from "react";

const RiderFaqs = () => {
  const topNavbarList = [
    { label: "Help", value: "Help" },
    { label: "During Trip", value: "During_trip" },
    { label: "After Trip", value: "After_trip" },
  ];
  const [reload, setReload] = useState(false);
  const [faqTab, setFaqTab] = useState("");
  const [faqSidebarTab, setFaqSidebarTab] = useState("");
  useEffect(() => {
    setFaqTab(localStorage.getItem("riderFaqMainTab") ?? "Help");
  }, []);

  const sideBarList = [
    { label: "Covid-19", value: "Covid_19" },
    { label: "Profile & Account", value: "Profile_account" },
    { label: "Payment/ Fare/ Charges", value: "Payment_fare_charges" },
    { label: "Safety", value: "Safety" },
    { label: "My Trips", value: "My_trips" },
    { label: "Troubleshoot", value: "Troubleshoot" },
    { label: "Guide To Comride", value: "Guide_to_comride" },
    { label: "Referral", value: "Referral" },
  ];
  const duringTrip = [
    {
      sideBarHeading: "During Trip Queries & Safety FAQs",
      is_sidebar_heading: true,
    },
    { label: "Local", value: "LocalTrip" },
    { label: "Rental", value: "RentalTrip" },
    { label: "Outstation - One Way", value: "OneWayOutstation" },
    { label: "Outstation - Round Trip", value: "RoundTripOutstation" },
  ];

  const afterTrip = [
    {
      sideBarHeading: "Trip Related Queries",
      is_sidebar_heading: true,
    },
    { label: "Local", value: "LocalTrip" },
    { label: "Rental", value: "RentalTrip" },
    {
      label: "Outstation - One Way",
      value: "OneWayOutstation",
    },
    {
      label: "Outstation - Round Trip",
      value: "RoundTripOutstation",
    },
    {
      sideBarHeading: "Payment Related Queries",
      is_sidebar_heading: true,
    },
    { label: "Local", value: "paymentLocal" },
    { label: "Rental", value: "paymentRental" },
    {
      label: "Outstation - One Way",
      value: "paymentOneWayOutstation",
    },
    {
      label: "Outstation - Round ",
      value: "paymentRoundOutstation",
    },
  ];

  const sideBarListForFaqTab = () => {
    if (faqTab === "Help") {
      return sideBarList;
    } else if (faqTab === "During_trip") {
      return duringTrip;
    } else if (faqTab === "After_trip") {
      return afterTrip;
    }
  };
  const sideBarListData = sideBarListForFaqTab();

  console.log(sideBarList);

  const siderBarTabList = localStorage.getItem("riderFaqSidebarTab");
  useEffect(() => {
    if (faqTab === "Help") {
      if (sideBarList.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("Covid_19");
      }
    } else if (faqTab === "During_trip") {
      if (duringTrip.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("LocalTrip");
      }
    } else if (faqTab === "After_trip") {
      if (afterTrip.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("LocalTrip");
      }
    }
  }, [faqTab]);
  return (
    <>
      <InnerLayout
        mainHeading="Rider FAQs"
        navigateEnable={false}
        backBtnClassName="ms-4"
      >
        <FaqLayout
          topNavbarList={topNavbarList}
          faqTab={faqTab}
          setFaqTab={setFaqTab}
          sideNavbarList={sideBarListData}
          faqSidebarTab={faqSidebarTab}
          setFaqSidebarTab={setFaqSidebarTab}
          type={"riderFaq"}
          reload={reload}
          setReload={setReload}
        >
          <div className="pt-4">
            <FaqTable
              type={faqSidebarTab}
              mainType={faqTab}
              faqType="Rider"
              reload={reload}
              setReload={setReload}
            />
          </div>
        </FaqLayout>
      </InnerLayout>
    </>
  );
};

export default RiderFaqs;
