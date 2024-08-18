import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SwitchPremiumModal from "../../driver-finance/driver-finance-modals/switchPremiumModal";
import PremiumHistoryPWModal from "./passwordModal";
import {
  premiumPlanAction,
  premiumSchedulePlanAction,
} from "../../../redux/actions/driverFinanceAction/createCashTransaction";

const PremiumMenuOption = ({ item, reload, setReload }) => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const date = new Date(item?.start_date);
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

  console.log(item, "klsaalksada");

  const active_renewal_3_days = currentDate - date <= THREE_DAYS_IN_MS;

  const cancelActiveAutoRenewal =
    active_renewal_3_days && item?.is_auto_renewal_active;

  const cancelActiveScheduled =
    active_renewal_3_days && item?.is_schedule_active;

  const [action, setAction] = useState([]);
  const [switchPremiumModal, setSwitchPremiumModal] = useState(false);
  const handleSwitchPremiumClose = () => {
    setSwitchPremiumModal(false);
  };
  const handleSwitchPremiumShow = () => setSwitchPremiumModal(true);

  const [premiumHistoryPWModal, setPremiumHistoryPWModal] = useState(false);
  const handlePremHisPWClose = () => {
    setPremiumHistoryPWModal(false);
  };
  const handlePremHisPWShow = () => setPremiumHistoryPWModal(true);

  console.log(cancelActiveAutoRenewal, "klsaalksada");

  const data = [
    {
      label: "Invioce",
      value: "",
      display:
        (item?.status === "Active" ||
          item?.status === "Scheduled" ||
          item?.status === "Expired" ||
          item?.status === "Cancelled" ||
          item?.status === "AutoRenewalCancelled" ||
          item?.status === "AutoRenewalSuccess") &&
        item?.premium_type !== "Premium3",
    },
    {
      label: "Switch",
      value: "",
      display:
        item?.status !== "Halted" &&
        !item?.three_day_error &&
        (item?.three_day_error
          ? !(currentDate - date <= THREE_DAYS_IN_MS)
          : true) &&
        !item.is_scheduled &&
        item?.status !== "Scheduled" &&
        item?.status !== "Expired" &&
        !item?.auto_renewal &&
        item?.status !== "AutoRenewalSuccess" &&
        !cancelActiveAutoRenewal &&
        !cancelActiveScheduled &&
        item?.status !== "AutoRenewalCancelled" &&
        item?.status !== "Cancelled",

      type: "Switch",
    },
    {
      label: "Schedule",
      value: "",
      display:
        item?.premium_type !== "Premium3" &&
        item?.status !== "Halted" &&
        !item?.three_day_error &&
        (item?.three_day_error
          ? !(currentDate - date <= THREE_DAYS_IN_MS)
          : true) &&
        !item.is_scheduled &&
        item?.status !== "Scheduled" &&
        item?.status !== "Expired" &&
        !item?.auto_renewal &&
        item?.status !== "AutoRenewalSuccess" &&
        !cancelActiveAutoRenewal &&
        !cancelActiveScheduled &&
        item?.status !== "AutoRenewalCancelled" &&
        item?.status !== "Cancelled",
      type: "Schedule",
    },
    {
      label: "Cancel",
      value: "",
      display:
        item?.premium_type !== "Premium3" &&
        item?.status !== "Halted" &&
        item?.status === "Active" &&
        currentDate - date <= THREE_DAYS_IN_MS &&
        item?.three_day_error &&
        !item.is_scheduled &&
        item?.status !== "Scheduled" &&
        item?.status !== "Expired" &&
        !cancelActiveAutoRenewal && !cancelActiveScheduled,
      type: "Cancel",
      title: "Are you sure you want to Cancel this Premium?",
    },
    {
      label: "Activate Auto Renewal",
      value: "",
      display:
        item?.premium_type !== "Premium3" &&
        !item?.auto_renewal &&
        item?.status !== "Halted" &&
        !item.is_scheduled &&
        item?.status !== "Scheduled" &&
        item?.status !== "Expired" &&
        item?.status !== "AutoRenewalSuccess" &&
        !cancelActiveAutoRenewal &&
        !cancelActiveScheduled &&
        item?.status !== "AutoRenewalCancelled" &&
        item?.status !== "Cancelled" &&
        // currentDate - date >= THREE_DAYS_IN_MS &&
        !item?.three_day_error,

      type: "ActivateAutoRenewal",
      title: "Are you sure you want to Activate Auto Renewal",
    },
    {
      label: "Stop Auto Renewal",
      value: "",
      display:
        item?.premium_type !== "Premium3" &&
        item?.status !== "Halted" &&
        item?.auto_renewal &&
        !item.is_scheduled &&
        item?.status !== "Scheduled" &&
        item?.status !== "Expired" &&
        !item?.is_auto_renewal_created &&
        !cancelActiveAutoRenewal &&
        !cancelActiveScheduled &&
        item?.status !== "AutoRenewalCancelled" &&
        item?.status !== "Cancelled",
      type: "StopAutoRenewal",
      title: "Are you sure you want to Stop Auto Renewal",
    },
    {
      label: "Cancel Schedule",
      value: "",
      display: item?.status === "Scheduled" && item?.status !== "Expired",
      type: "CancelSchedule",
      title: "Are you sure you want to Cancel Schedule",
    },
    {
      label: "Cancel Auto Renewal",
      value: "",
      display:
        item?.status === "AutoRenewalSuccess" && item?.status !== "Expired",
      type: "CancelAutoRenewal",
      title: "Are you sure you want to Cancel Auto Renewal",
    },

    {
      label: "Cancel Active Auto Renewal",
      value: "",
      display: cancelActiveAutoRenewal && item?.status !== "Expired",
      type: "CancelActiveAutoRenewal",
      title: "Are you sure you want to Cancel Active Auto Renewal",
    },

    {
      label: "Cancel Active Scheduled",
      value: "",
      display: cancelActiveScheduled && item?.status !== "Expired",
      type: "CancelActiveScheduled",
      title: "Are you sure you want to Cancel Scheduled",
    },
  ];

  const display = data?.some((item) => item?.display);

  const [loading, setLoading] = useState(false);
  const [premiumPlanData, setPremiumPlanData] = useState([]);

  const onclickFn = (passData) => {
    if (passData?.type === "Switch") {
      setLoading(true);
      dispatch(
        premiumPlanAction(
          { driver_id: item?.driver_id },
          (data) => onFetchSuccess(data, passData),
          onFetchError
        )
      );
    } else if (passData?.type === "Schedule") {
      setLoading(true);
      dispatch(
        premiumSchedulePlanAction(
          { driver_id: item?.driver_id },
          (data) => onFetchSuccess(data, passData),
          onFetchError
        )
      );
    } else if (
      passData?.type === "Cancel" ||
      passData?.type === "ActivateAutoRenewal" ||
      passData?.type === "StopAutoRenewal" ||
      passData?.type === "CancelSchedule" ||
      passData?.type === "CancelAutoRenewal" ||
      passData?.type === "CancelActiveAutoRenewal" ||
      passData?.type === "CancelActiveScheduled"
    ) {
      handlePremHisPWShow();
    }
  };

  const onFetchSuccess = (data, passData) => {
    console.log(passData, "kajsdhkadad");
    setLoading(false);
    setPremiumPlanData(data?.data);
    if (passData?.type === "Switch" || passData?.type === "Schedule") {
      handleSwitchPremiumShow();
    }
    console.log(data, "asdbkads");
  };
  const onFetchError = (data) => {
    setLoading(false);
    console.log(data, "asdbkads");
  };

  console.log(
    data?.filter?.((items) => items?.display === true)?.length - 1,
    "kjshcas"
  );

  return (
    <>
      <SwitchPremiumModal
        switchPremiumModal={switchPremiumModal}
        handleSwitchPremiumClose={handleSwitchPremiumClose}
        premiumPlanData={premiumPlanData}
        driver_id={item?.driver_id}
        type={action?.type}
        reload={reload}
        setReload={setReload}
      />
      <PremiumHistoryPWModal
        premiumHistoryPWModal={premiumHistoryPWModal}
        handlePremHisPWClose={handlePremHisPWClose}
        driver_id={item?.driver_id}
        premiumData={item}
        type={action?.type}
        title={action?.title}
        reload={reload}
        setReload={setReload}
      />
      {display && (
        <div className="invoice_container mt-2 me-3">
          <ul className="menu_list p-2  mb-0 primary_color fs_14 fw_600 text-start">
            {data
              ?.filter?.((items) => items?.display === true)
              ?.map((item, index) => (
                <>
                  <li className="cursor_pointer">
                    <button
                      className="background_none border_none"
                      onClick={() => {
                        onclickFn(item);
                        setAction(item);
                      }}
                      disabled={loading}
                    >
                      {item?.label}
                    </button>
                  </li>
                  {data?.filter?.((items) => items?.display === true)?.length -
                    1 ===
                  index ? (
                    <></>
                  ) : (
                    <hr className="list_underline m-1" />
                  )}
                </>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PremiumMenuOption;
