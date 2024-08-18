import React, { useEffect, useMemo, useState } from "react";
import FaqTable from "../../components/FAQs/faq-table/faqTable";
import InnerLayout from "../../components/layout/innerLayout";
import FaqLayout from "../../components/layout/faqLayout";

const DriverFaqs = () => {
  const topNavbarList = [
    { label: "Help", value: "Help" },
    { label: "During Trip", value: "During_trip" },
  ];

  const [faqTab, setFaqTab] = useState("");
  const [faqSidebarTab, setFaqSidebarTab] = useState("");
  const [reload, setReload] = useState(false);

  // useEffect(() => {
  //   setFaqTab(localStorage.getItem("driverFaqMainTab") ?? "Help");
  //   setFaqSidebarTab(localStorage.getItem("driverFaqSidebarTab") ?? "My_account");
  // }, []);

  useEffect(() => {
    setFaqTab(localStorage.getItem("driverFaqMainTab") ?? "Help");
  }, []);

  // useEffect(() => {
  //   if (faqTab === "Help") {
  //     setFaqSidebarTab("My_account");
  //   } else if (faqTab === "During_trip") {
  //     setFaqSidebarTab("LocalTrip");
  //   }
  // }, [faqTab]);

  const sideBarList = [
    { label: "My Account", value: "My_account" },
    { label: "A Guide To Comride", value: "Guide_to_comride" },
    { label: "Fares & Charges", value: "Payment_fare_charges" },
    { label: "Safety", value: "Safety" },
    { label: "Comride Services", value: "Comride_service" },
    { label: "Referral", value: "Referral" },
    { label: "Covid-19", value: "Covid_19" },
    { label: "Cancellation Policy", value: "Cancellation_policy" },
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

  const sideBarListForFaqTab = () => {
    if (faqTab === "Help") {
      return sideBarList;
    } else if (faqTab === "During_trip") {
      return duringTrip;
    }
  };
  const test = sideBarListForFaqTab();

  const test2 = localStorage.getItem("driverFaqSidebarTab");
  // console.log(sideBarList.map((item) => item.value).includes(test2));
  useEffect(() => {
    if (faqTab === "Help") {
      if (sideBarList.map((item) => item.value).includes(test2)) {
        setFaqSidebarTab(test2);
      } else {
        setFaqSidebarTab("My_account");
      }
    } else if (faqTab === "During_trip") {
      if (duringTrip.map((item) => item.value).includes(test2)) {
        setFaqSidebarTab(test2);
      } else {
        setFaqSidebarTab("LocalTrip");
      }
    }
  }, [faqTab]);

  console.log(sideBarList);
  return (
    <>
      <InnerLayout
        mainHeading="Driver FAQs"
        navigateEnable={false}
        backBtnClassName="ms-4"
      >
        <FaqLayout
          topNavbarList={topNavbarList}
          faqTab={faqTab}
          setFaqTab={setFaqTab}
          sideNavbarList={test}
          faqSidebarTab={faqSidebarTab}
          setFaqSidebarTab={setFaqSidebarTab}
          type={"driverFaq"}
          reload={reload}
          setReload={setReload}
        >
          <div className="pt-4">
            <FaqTable
              type={faqSidebarTab}
              mainType={faqTab}
              faqType="Driver"
              reload={reload}
              setReload={setReload}
            />
          </div>
        </FaqLayout>
      </InnerLayout>
    </>
  );
};

export default DriverFaqs;
