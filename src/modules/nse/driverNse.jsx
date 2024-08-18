import React, { useEffect, useMemo, useState } from "react";
import InnerLayout from "../../components/layout/innerLayout";
import FaqLayout from "../../components/layout/faqLayout";
import NseTable from "../../components/nse/nseTable";

const DriverNse = () => {
  const topNavbarList = [
    { label: "Account", value: "Account" },
    { label: "Bookings", value: "Bookings" },
    { label: "Payment", value: "Payment" },
    { label: "Emergency-SOS", value: "emergencySOS" },
    { label: "In-App Messaging", value: "appMessaging" },
    { label: "Incentives", value: "Incentives" },
  ];

  const [faqTab, setFaqTab] = useState("");
  const [faqSidebarTab, setFaqSidebarTab] = useState("");

  useEffect(() => {
    setFaqTab(localStorage.getItem("driverNseMainTab") ?? "Account");
  }, []);

  const accountsidebar = [
    { label: "New Account", value: "newAccount" },
    { label: "New Driver Application", value: "newDriverApplication" },
    {
      label: "Existing Driver Application",
      value: "existingDriverApplication",
    },
    { label: "General Account", value: "generalAccount" },
    { label: "Account Activity", value: "accountActivity" },
    { label: "Policy Updates", value: "policyUpdates" },
    { label: "Driver Performance", value: "driverPerformance" },
    { label: "Security", value: "Security" },
  ];

  const bookingsidebar = [
    {
      sideBarHeading: "Local Booking",
      is_sidebar_heading: true,
    },
    { label: "Ongoing Booking", value: "localOngoingBooking" },
    { label: "Stop Added/ Updated", value: "localstopadded" },
    { label: "DropOff Updated", value: "localdropoffupdated" },
    { label: "Payment Method", value: "localpayment" },
    {
      label: "Cancelled Booking",
      value: "localCancelledBooking",
    },
    {
      label: "Accident",
      value: "localAccidentBooking",
    },
    {
      label: "Driver review pending from Rider",
      value: "localReview",
    },
    {
      sideBarHeading: "Rental Booking",
      is_sidebar_heading: true,
    },
    { label: "Ongoing Booking", value: "rentalOngoingBooking" },
    {
      label: "DropOff added/ Updated",
      value: "rentaldropoffupdated",
    },
    {
      label: "Payment Method",
      value: "rentalpayment",
    },
    {
      label: "Cancelled Booking",
      value: "rentalCancelledBooking",
    },
    {
      label: "Accident",
      value: "rentalAccidentBooking",
    },
    {
      label: "Driver review pending from Rider",
      value: "rentalReview",
    },
    {
      label: "Daily working hours limit reached",
      value: "rentaldailylimitreached",
    },
    {
      sideBarHeading: "Outstation Oneway Booking",
      is_sidebar_heading: true,
    },
    { label: "Ongoing Bookings", value: "onewayOngoingBooking" },
    {
      label: "DropOff Updated",
      value: "onewaydropoffupdated",
    },
    {
      label: "Payment Method",
      value: "onewaypayment",
    },
    {
      label: "Cancelled Booking",
      value: "onewaycancelledbooking",
    },
    {
      label: "Odometer reading not approved by Rider",
      value: "onewayOdometer",
    },
    {
      label: "Accident Booking",
      value: "onewayaccidentbooking",
    },
    {
      label: "Driver review pending from Rider",
      value: "onewayreview",
    },
    {
      label: "Max days limit reached",
      value: "onewaymaxlimitreached",
    },
    {
      sideBarHeading: "Outstation Round-Trip Booking",
      is_sidebar_heading: true,
    },
    { label: "Ongoing Booking", value: "RoundOngoing" },
    {
      label: "Return Trip",
      value: "roundreturntrip",
    },
    { label: "DropOff Updated", value: "Rounddropoff" },
    {
      label: "Payment Method",
      value: "roundpayment",
    },
    {
      label: "Cancelled Booking",
      value: "roundcancelled",
    },
    { label: "Odometer reading not approved by Rider", value: "Roundodometer" },
    {
      label: "Accident",
      value: "roundaccident",
    },
    {
      label: "Driver review pending from Rider",
      value: "roundreview",
    },
    {
      label: "Max days limit reached",
      value: "roundmaxlimit",
    },
  ];

  const paymentsidebar = [
    { label: "Trip related- Fine", value: "Paymentfine" },
    {
      label: "Trip related- Payment received",
      value: "Paymentreceived",
    },
    {
      label: "Driver current balance- Payment Due",
      value: "Paymentdue",
    },
    {
      label: "Driver current balance- Payment received",
      value: "driverCurrentBalance",
    },
    {
      label: "Driver current balance- Cashout",
      value: "cashout",
    },
  ];

  const emergencysidebar = [
    { label: "SOS-During the trip ", value: "sos-DuringTrip" },
    { label: "SOS-No Trip ", value: "sosNoTrip" },
    { label: "SOS-Messaging", value: "sosMessaging" },
  ];

  const inAppMessaging = [
    { label: "During trip - Rider to Driver", value: "driverToRider" },
    { label: "Complaint - Ongoing   ", value: "complaintOngoing" },
    {
      label: "Complaint - Closed / Resolved",
      value: "complaintClosedResolved",
    },
  ];

  const IncentivesSidebar = [
    { label: "Incentive- Slot start time remainder", value: "slottime" },
    { label: "Incentive in progress", value: "inprogress" },
    {
      label: "Incentive- Slot remaining time remainder",
      value: "slotremainingtime",
    },
    {
      label: "Incentive completed successfully",
      value: "completedsuccess",
    },
  ];

  const sideBarListForFaqTab = () => {
    if (faqTab === "Account") {
      return accountsidebar;
    } else if (faqTab === "Bookings") {
      return bookingsidebar;
    } else if (faqTab === "Payment") {
      return paymentsidebar;
    } else if (faqTab === "emergencySOS") {
      return emergencysidebar;
    } else if (faqTab === "appMessaging") {
      return inAppMessaging;
    } else if (faqTab === "Incentives") {
      return IncentivesSidebar;
    }
  };
  const sideBarListData = sideBarListForFaqTab();

  const siderBarTabList = localStorage.getItem("driverNseSidebarTab");

  useEffect(() => {
    if (faqTab === "Account") {
      if (accountsidebar.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("newAccount");
      }
    } else if (faqTab === "Bookings") {
      if (bookingsidebar.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("localOngoingBooking");
      }
    } else if (faqTab === "Payment") {
      if (paymentsidebar.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("Paymentfine");
      }
    } else if (faqTab === "emergencySOS") {
      if (
        emergencysidebar.map((item) => item.value).includes(siderBarTabList)
      ) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("sos-DuringTrip");
      }
    } else if (faqTab === "appMessaging") {
      if (inAppMessaging.map((item) => item.value).includes(siderBarTabList)) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("driverToRider");
      }
    } else if (faqTab === "Incentives") {
      if (
        IncentivesSidebar.map((item) => item.value).includes(siderBarTabList)
      ) {
        setFaqSidebarTab(siderBarTabList);
      } else {
        setFaqSidebarTab("slottime");
      }
    }
  }, [faqTab]);

  // useEffect(() => {
  //   setFaqTab(localStorage.getItem("driverNseMainTab") ?? "Account");
  //   if (faqTab === "Account") {
  //     setFaqSidebarTab("newAccount");
  //   } else if (faqTab === "Bookings") {
  //     setFaqSidebarTab("localOngoingBooking");
  //   } else if (faqTab === "Payment") {
  //     setFaqSidebarTab("Paymentfine");
  //   } else if (faqTab === "emergencySOS") {
  //     setFaqSidebarTab("sosDuringTrip");
  //   } else if (faqTab === "appMessaging") {
  //     setFaqSidebarTab("driverToRider");
  //   } else if (faqTab === "Incentives") {
  //     setFaqSidebarTab("slottime");
  //   }
  // }, [faqTab]);

  // const sideBarList = useMemo(() => {
  //   if (faqTab === "Account") {
  //     return [
  //       { label: "New Account", value: "newAccount" },
  //       { label: "New Driver Application", value: "newDriverApplication" },
  //       {
  //         label: "Existing Driver Application",
  //         value: "existingDriverApplication",
  //       },
  //       { label: "General Account", value: "generalAccount" },
  //       { label: "Account Activity", value: "accountActivity" },
  //       { label: "Policy Updates", value: "policyUpdates" },
  //       { label: "Driver Performance", value: "driverPerformance" },
  //       { label: "Security", value: "Security" },
  //     ];
  //   } else if (faqTab === "Bookings") {
  //     return [
  //       {
  //         sideBarHeading: "Local Booking",
  //         is_sidebar_heading: true,
  //       },
  //       { label: "Ongoing Booking", value: "localOngoingBooking" },
  //       { label: "Stop Added", value: "localstopadded" },
  //       { label: "Drop Off Updated", value: "localdropoffupdated" },
  //       { label: "Payment", value: "localpayment" },
  //       {
  //         label: "Cancelled Booking",
  //         value: "localCancelledBooking",
  //       },
  //       {
  //         label: "Accident Booking",
  //         value: "localAccidentBooking",
  //       },
  //       {
  //         label: "Review",
  //         value: "localReview",
  //       },
  //       {
  //         sideBarHeading: "Rental Booking",
  //         is_sidebar_heading: true,
  //       },
  //       { label: "Ongoing Booking", value: "rentalOngoingBooking" },
  //       { label: "Daily Limit Reached", value: "rentaldailylimitreached" },
  //       {
  //         label: "Drop Off Updated",
  //         value: "rentaldropoffupdated",
  //       },
  //       {
  //         label: "Payment",
  //         value: "rentalpayment",
  //       },
  //       {
  //         label: "Cancelled Booking",
  //         value: "rentalCancelledBooking",
  //       },
  //       {
  //         label: "Accident Booking",
  //         value: "rentalAccidentBooking",
  //       },
  //       {
  //         label: "Review",
  //         value: "rentalReview",
  //       },
  //       {
  //         sideBarHeading: "Outstation Oneway Booking",
  //         is_sidebar_heading: true,
  //       },
  //       { label: "Ongoing Bookings", value: "onewayOngoingBooking" },
  //       { label: "Odometer", value: "onewayOdometer" },
  //       {
  //         label: "Drop Off Updated",
  //         value: "onewaydropoffupdated",
  //       },
  //       {
  //         label: "Payment",
  //         value: "onewaypayment",
  //       },
  //       {
  //         label: "Cancelled Booking",
  //         value: "onewaycancelledbooking",
  //       },
  //       {
  //         label: "Accident Booking",
  //         value: "onewayaccidentbooking",
  //       },
  //       {
  //         label: "Review",
  //         value: "onewayreview",
  //       },
  //       {
  //         label: "Max Limit Reached",
  //         value: "onewaymaxlimitreached",
  //       },
  //       {
  //         sideBarHeading: "Outstation Round-Trip Booking",
  //         is_sidebar_heading: true,
  //       },
  //       { label: "Ongoing Booking", value: "RoundOngoing" },
  //       { label: "Odometer Reading", value: "Roundodometer" },
  //       { label: "Drop Off Updated", value: "Rounddropoff" },
  //       {
  //         label: "Payment",
  //         value: "roundpayment",
  //       },
  //       {
  //         label: "Cancelled Booking",
  //         value: "roundcancelled",
  //       },
  //       {
  //         label: "Accident Booking",
  //         value: "roundaccident",
  //       },
  //       {
  //         label: "Driver review pending from Rider",
  //         value: "roundreview",
  //       },
  //       {
  //         label: "Max Limit Reached",
  //         value: "roundmaxlimit",
  //       },
  //       {
  //         label: "Return Trip",
  //         value: "roundreturntrip",
  //       },
  //     ];
  //   } else if (faqTab === "Payment") {
  //     return [
  //       // {
  //       //   sideBarHeading: "Security",
  //       //   is_sidebar_heading: true,
  //       // },
  //       { label: "Payment Fine", value: "Paymentfine" },
  //       {
  //         label: "Payment Received",
  //         value: "Paymentreceived",
  //       },
  //       {
  //         label: "Payment Due",
  //         value: "Paymentdue",
  //       },
  //       {
  //         label: "Driver current balance",
  //         value: "driverCurrentBalance",
  //       },
  //       {
  //         label: "Cashout",
  //         value: "cashout",
  //       },
  //     ];
  //   } else if (faqTab === "emergencySOS") {
  //     return [
  //       { label: "SOS-During the trip ", value: "sosDuringTrip " },
  //       { label: "SOS-No Trip ", value: "sosNoTrip" },
  //       { label: "SOS-Messaging", value: "sosMessaging" },
  //     ];
  //   } else if (faqTab === "appMessaging") {
  //     return [
  //       { label: "During trip - Driver to Rider", value: "driverToRider" },
  //       { label: "Complaint - Ongoing   ", value: "complaintOngoing" },
  //       {
  //         label: "Complaint - Closed / Resolved",
  //         value: "complaintClosedResolved",
  //       },
  //     ];
  //   } else if (faqTab === "Incentives") {
  //     return [
  //       { label: "Slot Start Time", value: "slottime" },
  //       { label: "Inprogress", value: "inprogress" },
  //       {
  //         label: "Slot Remaining Time",
  //         value: "slotremainingtime",
  //       },
  //       {
  //         label: "Completed Success",
  //         value: "completedsuccess",
  //       },
  //     ];
  //   }
  // }, [faqTab]);

  return (
    <>
      <InnerLayout
        mainHeading="Driver Notifications,SMS & Email"
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
          type={"driverNse"}
        >
          <div className="ms-4">
            <NseTable
              type={faqSidebarTab}
              mainType={faqTab}
              nseType="DriverNse"
              riderdrivertype="Driver"
            />
          </div>
        </FaqLayout>
      </InnerLayout>
    </>
  );
};

export default DriverNse;
