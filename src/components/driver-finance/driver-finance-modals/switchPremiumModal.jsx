import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import Proceedbtn from "../../utilits/buttons/proceedbtn";
import "../../../components/driver-finance/driverFinance.css";
import { useDispatch } from "react-redux";
import { premiumPlanAction } from "../../../redux/actions/driverFinanceAction/createCashTransaction";
import { formatAmount, formatDateTime, isEmptyObject } from "../../helper";
import CashTransactionPasswordModal from "./cash-transaction-password-modal";
import PasswordInputField from "../../form/passwordInputField";
import moment from "moment";
import { date } from "yup";

const SwitchPremiumModal = ({
  switchPremiumModal,
  handleSwitchPremiumClose,
  premiumPlanData,
  driver_id,
  type,
  reload,
  setReload,
}) => {
  console.log(premiumPlanData, "ajsdakd");

  const [selectedPlan, setSelectedPlan] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordModal, setPasswordModal] = useState(false);
  const handlePasswordClose = () => setPasswordModal(false);
  const handlePasswordShow = () => setPasswordModal(true);

  useEffect(() => {
    if (!switchPremiumModal) {
      setSelectedPlan({});
      setErrorMessage("");
    }
  }, [switchPremiumModal]);

  const onSubmitFn = () => {
    if (isEmptyObject(selectedPlan)) {
      setErrorMessage("Please select any Plan");
    } else {
      setErrorMessage("");
      handlePasswordShow();
    }
  };

  const selectedSchedulePlan = {
    driver_id: driver_id,
    premium_type: selectedPlan?.premium_type,
    validity:
      selectedPlan?.plan_type === "30DaysPlan"
        ? 30
        : selectedPlan?.plan_type === "90DaysPlan"
        ? 90
        : selectedPlan?.plan_type === "180DaysPlan"
        ? 180
        : "",
    amount: formatAmount(selectedPlan?.CurrentPremiumValue),
    plan_type: selectedPlan?.plan_type,
    premium_value: selectedPlan?.premium_value,
    start_date: selectedPlan?.nextStartDate,
    expiry_date: selectedPlan?.expiry_date,
    premium_value_and_setup: selectedPlan?.premium_value_and_setup,
  };

  const selectedPlanData = {
    driver_id: driver_id,
    premium_type: selectedPlan?.premium_type,
    validity:
      selectedPlan?.plan_type === "30DaysPlan"
        ? 30
        : selectedPlan?.plan_type === "90DaysPlan"
        ? 90
        : selectedPlan?.plan_type === "180DaysPlan"
        ? 180
        : "",
    amount:
      premiumPlanData?.driver_details?.DCP?.premium_type === "Premium3" ||
      premiumPlanData?.driver_details?.DCP?.premium_type === "Premium1" ||
      premiumPlanData?.driver_details?.DCP?.premium_type === "Premium2"
        ? formatAmount(selectedPlan?.switchValue)
        : selectedPlan?.premium_type ===
          premiumPlanData?.driver_details?.DCP?.premium_type
        ? formatAmount(
            selectedPlan?.switchValue +
              selectedPlan?.switcthSamePlanUpgradeValue
          )
        : selectedPlan?.premium_type !==
          premiumPlanData?.driver_details?.DCP?.premium_type
        ? formatAmount(
            selectedPlan?.switchValue +
              selectedPlan?.switcthOtherPlanUpgradeValue
          )
        : "",
    plan_type: selectedPlan?.plan_type,
    premium_value: selectedPlan?.premium_value,
    expiry_date: selectedPlan?.expiry_date,
  };

  // console.log(selectedPlanData, "ajsdqeweakd");
  console.log(selectedPlanData, "asASsasdaasdaa");

  const filterPremium4 =
    premiumPlanData?.driver_details?.DCP?.premium_type !== "Premium3" &&
    type !== "Schedule"
      ? premiumPlanData?.PremiumFour?.filter(
          (item) =>
            (item?.premium_type ===
            premiumPlanData?.driver_details?.DCP?.premium_type
              ? item?.plan_type !=
                premiumPlanData?.driver_details?.DCP?.plan_type
              : item) &&
            parseInt(item?.plan_type) >=
              parseInt(premiumPlanData?.driver_details?.DCP?.plan_type) &&
            parseInt(item?.premium_value) >=
              parseInt(
                premiumPlanData?.driver_details?.DCP?.CurrentPremiumValue
              )
        )
      : premiumPlanData?.PremiumFour;

  console.log(premiumPlanData, "ajsdqsdfsfseweakd");
  console.log(filterPremium4, "ajsdqeweakd");

  const filterPremium5 =
    premiumPlanData?.driver_details?.DCP?.premium_type !== "Premium3" &&
    type !== "Schedule"
      ? premiumPlanData?.PremiumFive?.filter(
          (item) =>
            (item?.premium_type ===
            premiumPlanData?.driver_details?.DCP?.premium_type
              ? item?.plan_type !=
                premiumPlanData?.driver_details?.DCP?.plan_type
              : item) &&
            parseInt(item?.plan_type) >=
              parseInt(premiumPlanData?.driver_details?.DCP?.plan_type) &&
            parseInt(item?.premium_value) >=
              parseInt(
                premiumPlanData?.driver_details?.DCP?.CurrentPremiumValue
              )
        )
      : premiumPlanData?.PremiumFive;


  return (
    <>
      <CashTransactionPasswordModal
        transactionPasswordModalShow={passwordModal}
        handletransactionPasswordModalClose={handlePasswordClose}
        title="Are you sure you want to confirm the transaction?"
        type={type}
        selectedPlanData={selectedPlanData}
        selectedSchedulePlan={selectedSchedulePlan}
        handleSwitchPremiumClose={handleSwitchPremiumClose}
        reload={reload}
        setReload={setReload}
      />
      <Modal
        show={switchPremiumModal}
        centered
        keyboard={false}
        backdrop={"static"}
        onHide={handleSwitchPremiumClose}
        dialogClassName="switch_premium_modal_conatiner"
        contentClassName={`border_radius_15px`}
      >
        <Modal.Body>
          <div className="d-flex justify-content-between mt-1">
            <span className={`fs_22 primary_color fw_500 text-center`}>
              New Cash Transaction - Switch Premium*
            </span>
            <button
              className="border_none background_none"
              onClick={() => handleSwitchPremiumClose()}
              type="button"
            >
              <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container "></i>
            </button>
          </div>
          <hr className="my-2 hr_line_color" />

          <div className="row mx-2">
            <div className="col-md-6">
              <table className="fs_16 fw_500 w-100">
                <tr>
                  <td className="secondary_color py-1">Driver ID</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.driver_id2
                      : premiumPlanData?.driver_id2} */}
                    {premiumPlanData?.driver_details?.driver_id2 ?? "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color py-1">First Name</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.first_name
                      : premiumPlanData?.first_name} */}

                    {premiumPlanData?.driver_details?.first_name ?? "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color py-1">Last Name</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.last_name
                      : premiumPlanData?.last_name} */}

                    {premiumPlanData?.driver_details?.last_name ?? "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color py-1">Phone Number</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.phone_number
                      : premiumPlanData?.phone_number} */}

                    {premiumPlanData?.driver_details?.phone_number ?? "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color py-1">Zone</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.registered_zone_name
                          ?.zone_name
                      : premiumPlanData?.registered_zone_name?.zone_name} */}

                    {premiumPlanData?.driver_details?.registered_zone_name
                      ?.zone_name ?? "--"}
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <table className="fs_16 fw_500 w-100">
                <tr>
                  <td className="secondary_color py-1">Current Premium</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.DCP?.premium_type
                      : premiumPlanData?.DCP?.premium_type} */}

                    {premiumPlanData?.driver_details?.DCP?.premium_type ?? "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color py-1">Current Plan</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.DCP?.plan_type ?? "--"
                      : type === "Schedule"
                      ? premiumPlanData?.DCP?.plan_type ?? "--"
                      : "--"} */}

                    {premiumPlanData?.driver_details?.DCP?.plan_type ?? "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color py-1">
                    Current Premium Value (₹)
                  </td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.DCP
                          ?.CurrentPremiumValue ?? "--"
                      : type === "Schedule"
                      ? premiumPlanData?.DCP?.CurrentPremiumValue ?? "--"
                      : "--"} */}

                    {premiumPlanData?.driver_details?.DCP
                      ?.CurrentPremiumValue ?? "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color py-1">Validity</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.DCP?.validity ?? "--"
                      : type === "Schedule"
                      ? premiumPlanData?.DCP?.validity
                      : "--"} */}

                    {premiumPlanData?.driver_details?.DCP?.validity ?? "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color py-1">Expiry Date</td>
                  <td className="primary_color">
                    {/* {type === "Switch"
                      ? premiumPlanData?.driver_details?.DCP?.expiry_date
                        ? moment(
                            premiumPlanData?.driver_details?.DCP?.expiry_date
                          ).format("DD/MM/YYYY")
                        : "--"
                      : type === "Schedule"
                      ? premiumPlanData?.DCP?.expiry_date
                        ? moment(premiumPlanData?.DCP?.expiry_date).format(
                            "DD/MM/YYYY"
                          )
                        : "--"
                      : ""} */}

                    {premiumPlanData?.driver_details?.DCP?.expiry_date
                      ? moment(
                          premiumPlanData?.driver_details?.DCP?.expiry_date
                        ).format("DD/MM/YYYY")
                      : "--"}
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="mx-3 mt-3 d-flex gap-2 fs_14 secondary_color">
            <span>Note:</span>
            <span>
              If a premium is switched to one of the following premium, then
              after a successful cash transaction the start date will be
              immediate.
            </span>
          </div>

          <hr className="my-2 hr_line_color" />

          {type === "Switch" ? (
            <>
              {filterPremium4?.length >= 1 && (
                <>
                  <div className="mb-2">
                    <span className="fs_16 primary_color fw_500">
                      Premium 4
                    </span>
                  </div>
                  <div className="row">
                    {filterPremium4
                      ?.sort((a, b) => {
                        const aNumeric = parseInt(a.plan_type);
                        const bNumeric = parseInt(b.plan_type);
                        return aNumeric - bNumeric;
                      })
                      ?.filter((filtered) => {
                        if (
                          filtered?.premium_type ===
                          premiumPlanData?.driver_details?.DCP?.premium_type
                        ) {
                          return filtered?.switcthSamePlanStatus;
                        }
                        if (
                          filtered?.premium_type !==
                          premiumPlanData?.driver_details?.DCP?.premium_type
                        ) {
                          return filtered?.switcthOtherPlanStatus;
                        }
                      })
                      ?.map((item) => (
                        <div className="col-md-4 col-sm-6 py-3 py-md-0">
                          <label
                            className={`${
                              selectedPlan?.plan_type === item?.plan_type &&
                              selectedPlan?.premium_type === item?.premium_type
                                ? "primary_border"
                                : ""
                            }  border_radius box_shadow_00000029 w-100 d-flex justify-content-between align-items-center px-2`}
                            htmlFor={`permium4_${item?.plan_type}`}
                          >
                            <div className="d-flex  py-2">
                              <div>
                                <input
                                  type="radio"
                                  name="premium4"
                                  id={`permium4_${item?.plan_type}`}
                                  onChange={(e) => {
                                    setSelectedPlan(item);
                                    setErrorMessage("");
                                  }}
                                />
                              </div>
                              <div className="d-flex flex-column ps-1">
                                <span className="primary_color fs_16 fw_500 mb-2">
                                  {item?.plan_type}
                                </span>
                                {type === "Schedule" && (
                                  <span className="secondary_color fs_10 fw_500">
                                    Start date:{" "}
                                    {moment(item?.nextStartDate).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </span>
                                )}
                                <span className="secondary_color fs_10 fw_500">
                                  Expiry date:{" "}
                                  {moment(item?.expiry_date).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                                <span className="secondary_color fs_10 fw_500 text-nowrap">
                                  Premium Value:{" "}
                                  {formatAmount(item?.premium_value)}
                                </span>
                              </div>
                            </div>
                            <div className="switch_premium_block_broder ps-1 d-flex flex-column py-2">
                              <span className="fs_20 fw_500 primary_color text-nowrap">
                                {/* ₹ {formatAmount(item?.switchValue)} */}

                                {premiumPlanData?.driver_details?.DCP
                                  ?.premium_type === "Premium3" ||
                                premiumPlanData?.driver_details?.DCP
                                  ?.premium_type === "Premium1" ||
                                premiumPlanData?.driver_details?.DCP
                                  ?.premium_type === "Premium2"
                                  ? `₹ ${formatAmount(item?.switchValue)}`
                                  : item?.premium_type ===
                                    premiumPlanData?.driver_details?.DCP
                                      ?.premium_type
                                  ? `₹ ${formatAmount(
                                      item?.switchValue +
                                        item?.switcthSamePlanUpgradeValue
                                    )}`
                                  : item?.premium_type !==
                                    premiumPlanData?.driver_details?.DCP
                                      ?.premium_type
                                  ? `₹ ${formatAmount(
                                      item?.switchValue +
                                        item?.switcthOtherPlanUpgradeValue
                                    )}`
                                  : ""}
                                {/* {item?.premium_type ===
                                premiumPlanData?.driver_details?.DCP
                                  ?.premium_type
                                  ? `₹ ${formatAmount(
                                      item?.switchValue +
                                        item?.switcthSamePlanUpgradeValue
                                    )}`
                                  : item?.premium_type !==
                                    premiumPlanData?.driver_details?.DCP
                                      ?.premium_type
                                  ? `₹ ${formatAmount(
                                      item?.switchValue +
                                        item?.switcthOtherPlanUpgradeValue
                                    )}`
                                  : ""} */}
                              </span>
                              <span className="secondary_color fs_10 fw_500 text-center">
                                (Switch Value)
                              </span>
                            </div>
                          </label>{" "}
                        </div>
                      ))}
                  </div>
                  <hr className="my-4 hr_line_color" />
                </>
              )}
              {filterPremium5?.length >= 1 && (
                <>
                  <div className="mb-2">
                    <span className="fs_16 primary_color fw_500">
                      Premium 5
                    </span>
                  </div>
                  <div className="row">
                    {filterPremium5
                      ?.sort((a, b) => {
                        const aNumeric = parseInt(a.plan_type);
                        const bNumeric = parseInt(b.plan_type);
                        return aNumeric - bNumeric;
                      })
                      ?.filter((filtered) => {
                        if (
                          filtered?.premium_type ===
                          premiumPlanData?.driver_details?.DCP?.premium_type
                        ) {
                          return filtered?.switcthSamePlanStatus;
                        }
                        if (
                          filtered?.premium_type !==
                          premiumPlanData?.driver_details?.DCP?.premium_type
                        ) {
                          return filtered?.switcthOtherPlanStatus;
                        }
                      })
                      ?.map((item) => (
                        <div className="col-md-4 col-sm-6 py-3 py-md-0">
                          <label
                            className={`${
                              selectedPlan?.plan_type === item?.plan_type &&
                              selectedPlan?.premium_type === item?.premium_type
                                ? "primary_border"
                                : ""
                            }  border_radius box_shadow_00000029 w-100 d-flex justify-content-between align-items-center px-2`}
                            htmlFor={`permium5_${item?.plan_type}`}
                          >
                            <div className="d-flex  py-2">
                              <div>
                                <input
                                  type="radio"
                                  name="premium4"
                                  id={`permium5_${item?.plan_type}`}
                                  onChange={(e) => {
                                    setSelectedPlan(item);
                                    setErrorMessage("");
                                  }}
                                />
                              </div>
                              <div className="d-flex flex-column ps-1">
                                <span className="primary_color fs_16 fw_500">
                                  {item?.plan_type}
                                </span>
                                <span className="secondary_color fs_10 fw_500 mt-2 text-nowrap">
                                  Expiry date:{" "}
                                  {moment(item?.expiry_date).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                                <span className="secondary_color fs_10 fw_500 text-nowrap">
                                  Premium Value:{" "}
                                  {formatAmount(item?.premium_value)}
                                </span>
                              </div>
                            </div>

                            <div className="switch_premium_block_broder ps-1 d-flex flex-column py-2">
                              <span className="fs_20 fw_500 primary_color text-nowrap">
                                {/* ₹ {formatAmount(item?.switchValue)} */}

                                {premiumPlanData?.driver_details?.DCP
                                  ?.premium_type === "Premium3" ||
                                premiumPlanData?.driver_details?.DCP
                                  ?.premium_type === "Premium1" ||
                                premiumPlanData?.driver_details?.DCP
                                  ?.premium_type === "Premium2"
                                  ? `₹ ${formatAmount(item?.switchValue)}`
                                  : item?.premium_type ===
                                    premiumPlanData?.driver_details?.DCP
                                      ?.premium_type
                                  ? `₹ ${formatAmount(
                                      item?.switchValue +
                                        item?.switcthSamePlanUpgradeValue
                                    )}`
                                  : item?.premium_type !==
                                    premiumPlanData?.driver_details?.DCP
                                      ?.premium_type
                                  ? `₹ ${formatAmount(
                                      item?.switchValue +
                                        item?.switcthOtherPlanUpgradeValue
                                    )}`
                                  : ""}

                                {/* {item?.premium_type ===
                                premiumPlanData?.driver_details?.DCP
                                  ?.premium_type
                                  ? `₹ ${formatAmount(
                                      item?.switchValue +
                                        item?.switcthSamePlanUpgradeValue
                                    )}`
                                  : item?.premium_type !==
                                    premiumPlanData?.driver_details?.DCP
                                      ?.premium_type
                                  ? `₹ ${formatAmount(
                                      item?.switchValue +
                                        item?.switcthOtherPlanUpgradeValue
                                    )}`
                                  : ""} */}
                              </span>
                              <span className="secondary_color fs_10 fw_500 text-center">
                                (Switch Value)
                              </span>

                              {/* {item?.premium_type ===
                              premiumPlanData?.driver_details?.DCP?.premium_type
                                ? `₹ ${formatAmount(item?.switchValue + item?.switcthSamePlanUpgradeValue)}`
                                : item?.premium_type !==
                                  premiumPlanData?.driver_details?.DCP
                                    ?.premium_type
                                ? `₹ ${formatAmount(item?.switchValue + item?.switcthOtherPlanUpgradeValue)}`
                                : ""} */}
                            </div>
                          </label>
                        </div>
                      ))}
                  </div>
                </>
              )}
              {errorMessage && (
                <div className="d-flex justify-content-center my-2">
                  <span className="fs_16 red_color"> {errorMessage}</span>
                </div>
              )}

              {filterPremium4?.length === 0 && filterPremium5?.length === 0 && (
                <span className="d-flex justify-content-center pt-3 fs_20 primary_color ">
                  There is no Premium Plan higher then this
                </span>
              )}
            </>
          ) : type === "Schedule" ? (
            <>
              {premiumPlanData?.PremiumFour?.length >= 1 && (
                <>
                  <div className="mb-2">
                    <span className="fs_16 primary_color fw_500">
                      Premium 4
                    </span>
                  </div>
                  <div className="row">
                    {premiumPlanData?.PremiumFour?.sort((a, b) => {
                      const aNumeric = parseInt(a.plan_type);
                      const bNumeric = parseInt(b.plan_type);
                      return aNumeric - bNumeric;
                    })?.map((item) => (
                      <div className="col-md-4 col-sm-6 py-3 py-md-0">
                        <label
                          className={`${
                            selectedPlan?.plan_type === item?.plan_type &&
                            selectedPlan?.premium_type === item?.premium_type
                              ? "primary_border"
                              : ""
                          }  border_radius box_shadow_00000029 w-100 d-flex justify-content-between align-items-center px-2`}
                          htmlFor={`permium4_${item?.plan_type}`}
                        >
                          <div className="d-flex  py-2">
                            <div>
                              <input
                                type="radio"
                                name="premium4"
                                id={`permium4_${item?.plan_type}`}
                                onChange={(e) => {
                                  setSelectedPlan(item);
                                  setErrorMessage("");
                                }}
                              />
                            </div>
                            <div className="d-flex flex-column ps-1">
                              <span className="primary_color fs_16 fw_500 mb-2">
                                {item?.plan_type}
                              </span>
                              <span className="secondary_color fs_10 fw_500">
                                Start date:{" "}
                                {moment(item?.nextStartDate).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              <span className="secondary_color fs_10 fw_500">
                                Expiry date:{" "}
                                {moment(item?.expiry_date).format("DD/MM/YYYY")}
                              </span>
                            </div>
                          </div>

                          <div className="switch_premium_block_broder ps-1 d-flex flex-column py-2">
                            <span className="fs_20 fw_500 primary_color text-nowrap">
                              ₹ {formatAmount(item?.premium_value_and_setup)}
                            </span>
                            <span className="secondary_color fs_10 fw_500 text-center">
                              (Premium Value)
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <hr className="my-4 hr_line_color" />
                </>
              )}
              {premiumPlanData?.PremiumFive?.length >= 1 && (
                <>
                  <div className="mb-2">
                    <span className="fs_16 primary_color fw_500">
                      Premium 5
                    </span>
                  </div>
                  <div className="row">
                    {premiumPlanData?.PremiumFive?.sort((a, b) => {
                      const aNumeric = parseInt(a.plan_type);
                      const bNumeric = parseInt(b.plan_type);
                      return aNumeric - bNumeric;
                    })?.map((item) => (
                      <div className="col-md-4 col-sm-6 py-3 py-md-0">
                        <label
                          className={`${
                            selectedPlan?.plan_type === item?.plan_type &&
                            selectedPlan?.premium_type === item?.premium_type
                              ? "primary_border"
                              : ""
                          }  border_radius box_shadow_00000029 w-100 d-flex justify-content-between align-items-center px-2`}
                          htmlFor={`permium5_${item?.plan_type}`}
                        >
                          <div className="d-flex  py-2">
                            <div>
                              <input
                                type="radio"
                                name="premium4"
                                id={`permium5_${item?.plan_type}`}
                                onChange={(e) => {
                                  setSelectedPlan(item);
                                  setErrorMessage("");
                                }}
                              />
                            </div>
                            <div className="d-flex flex-column ps-1">
                              <span className="primary_color fs_16 fw_500 mb-2">
                                {item?.plan_type}
                              </span>
                              <span className="secondary_color fs_10 fw_500">
                                Start date:{" "}
                                {moment(item?.nextStartDate).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              <span className="secondary_color fs_10 fw_500">
                                Expiry date:{" "}
                                {moment(item?.expiry_date).format("DD/MM/YYYY")}
                              </span>
                            </div>
                          </div>

                          <div className="switch_premium_block_broder ps-1 d-flex flex-column py-2">
                            <span className="fs_20 fw_500 primary_color text-nowrap">
                              ₹ {formatAmount(item?.premium_value_and_setup)}
                            </span>
                            <span className="secondary_color fs_10 fw_500 text-center">
                              (Premium Value)
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {errorMessage && (
                <div className="d-flex justify-content-center my-2">
                  <span className="fs_16 red_color"> {errorMessage}</span>
                </div>
              )}

              {filterPremium4?.length === 0 && filterPremium5?.length === 0 && (
                <span className="d-flex justify-content-center pt-3 fs_20 primary_color ">
                  There is no Premium Plan higher then this
                </span>
              )}
            </>
          ) : (
            <></>
          )}
          <div className="d-flex justify-content-center gap-3 my-3 mt-5">
            <Cancelbtn
              cancelFn={() => {
                handleSwitchPremiumClose();
              }}
            />
            <Proceedbtn
              button_title="Confirm"
              disabled={
                filterPremium4?.length === 0 && filterPremium5?.length === 0
                  ? true
                  : false
              }
              submitFn={() => {
                // handleSwitchPremiumClose();
                onSubmitFn();
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SwitchPremiumModal;
