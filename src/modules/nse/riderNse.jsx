import React, { useEffect, useMemo, useState } from "react";
import InnerLayout from "../../components/layout/innerLayout";
import FaqLayout from "../../components/layout/faqLayout";
import NseTable from "../../components/nse/nseTable";

const RiderNse = () => {
  const topNavbarList = [
    { label: "Account", value: "Account" },
    { label: "Bookings", value: "Bookings" },
    { label: "Payment", value: "Payment" },
    { label: "Emergency-SOS", value: "Emergency_SOS" },
    { label: "In-App Messaging", value: "In_App_Messaging" },
  ];

  const [faqTab, setFaqTab] = useState("");
  const [faqSidebarTab, setFaqSidebarTab] = useState("");

  useEffect(() => {
    setFaqTab(localStorage.getItem("riderNseMainTab") ?? "Account");
  }, []);

  const accountsideBar = [
    { label: "New Account", value: "New_account" },
    { label: "General Account", value: "General_account" },
    { label: "Policy Updates", value: "Policy_updates" },
    { label: "Security", value: "Security" },
  ];

  const bookingSideBar = [
    {
      sideBarHeading: "Local Booking",
      is_sidebar_heading: true,
    },
    { label: "No Rides Available", value: "No_rides_availableL" },
    { label: "Ongoing Booking", value: "Ongoing_bookingL" },
    { label: "Cancelled Booking", value: "Cancelled_bookingL" },
    { label: "Accident Booking", value: "Accident_bookingL" },
    {
      label: "Driver review pending from Rider",
      value: "Driver_review_pending_from_riderL",
    },
    {
      sideBarHeading: "Rental Booking",
      is_sidebar_heading: true,
    },
    { label: "No Rides Available", value: "No_rides_availableR" },
    { label: "Ongoing Booking", value: "Ongoing_bookingR" },
    {
      label: "Cancelled Booking",
      value: "Cancelled_bookingR",
    },
    {
      label: "Accident Booking",
      value: "Accident_bookingR",
    },
    {
      label: "Driver review pending from Rider",
      value: "Driver_review_pending_from_riderR",
    },
    {
      sideBarHeading: "Outstation Oneway Booking",
      is_sidebar_heading: true,
    },
    { label: "Ride Scheduled", value: "Ride_scheduledO" },
    { label: "No Rides Available", value: "No_rides_availableO" },
    { label: "Ongoing Booking", value: "Ongoing_bookingO" },
    {
      label: "Cancelled Booking",
      value: "Cancelled_bookingO",
    },
    {
      label: "Accident Booking",
      value: "Accident_bookingO",
    },
    {
      label: "Driver review pending from Rider",
      value: "Driver_review_pending_from_riderO",
    },
    {
      label: "Odometer Reading",
      value: "Odometer_readingO",
    },
    {
      sideBarHeading: "Outstation Round-Trip Booking",
      is_sidebar_heading: true,
    },
    { label: "Ride Scheduled", value: "Ride_scheduledW" },
    { label: "No Rides Available", value: "No_rides_availableW" },
    { label: "Ongoing Booking", value: "Ongoing_bookingW" },
    {
      label: "Cancelled Booking",
      value: "Cancelled_bookingW",
    },
    {
      label: "Accident Booking",
      value: "Accident_bookingW",
    },
    {
      label: "Driver review pending from Rider",
      value: "Driver_review_pending_from_riderW",
    },
    {
      label: "Odometer Reading",
      value: "Odometer_readingW",
    },
  ];

  const paymentSiseBar = [
    { label: "Trip related- Pending payment", value: "Pending_payment" },
    {
      label: "Trip related- Payment done successfully",
      value: "Success_payment",
    },
    {
      label: "Rider current balance",
      value: "Rider_current_balance",
    },
    {
      label: "Wallet",
      value: "Wallet",
    },
  ];

  const emergencySOSSidebar = [
    { label: "SOS-During the trip", value: "During_trip" },
    { label: "SOS-No Trip", value: "No_trip" },
    { label: "SOS-Messaging", value: "Messaging" },
  ];

  const inAppmessagingSidebar = [
    {
      label: "During trip - Driver to Rider",
      value: "During_trip_Driver_to_rider",
    },
    { label: "Complaint - Ongoing   ", value: "Complaint_ongoing" },
    {
      label: "Complaint - Closed / Resolved",
      value: "Complaint_closed_resloved",
    },
  ];

  const sideBarListForFaqTab = () => {
    if (faqTab === "Account") {
      return accountsideBar;
    } else if (faqTab === "Bookings") {
      return bookingSideBar;
    } else if (faqTab === "Payment") {
      return paymentSiseBar;
    } else if (faqTab === "Emergency_SOS") {
      return emergencySOSSidebar;
    } else if (faqTab === "In_App_Messaging") {
      return inAppmessagingSidebar;
    }
  };
  const sideBarListData = sideBarListForFaqTab();

  const siderBarTabList = localStorage.getItem("riderNseSidebarTab");

  useEffect(() => {
    if (faqTab === "Account") {
      if (accountsideBar.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("New_account");
      }
    } else if (faqTab === "Bookings") {
      if (bookingSideBar.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("No_rides_availableL");
      }
    } else if (faqTab === "Payment") {
      if (paymentSiseBar.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("Pending_payment");
      }
    } else if (faqTab === "Emergency_SOS") {
      if (
        emergencySOSSidebar.map((item) => item.value).includes(siderBarTabList)
      ) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("During_trip");
      }
    } else if (faqTab === "In_App_Messaging") {
      if (
        inAppmessagingSidebar
          .map((item) => item.value)
          .includes(siderBarTabList)
      ) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("During_trip_Driver_to_rider");
      }
    }
  }, [faqTab]);

  return (
    <>
      <InnerLayout
        mainHeading="Rider Notifications,SMS & Email"
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
          type={"riderNse"}
        >
          <div className="ms-4">
            <NseTable
              type={faqSidebarTab}
              mainType={faqTab}
              nseType="RiderNse"
              riderdrivertype="Rider"
            />
          </div>
        </FaqLayout>
      </InnerLayout>
    </>
  );
};

export default RiderNse;
