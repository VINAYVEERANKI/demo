import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Okaybtn from "../../utilits/buttons/okaybtn";
import Proceedbtn from "../../utilits/buttons/proceedbtn";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import CreateCashTransactionModal from "./Create-transaction-modal";
import SwitchPremiumModal from "./switchPremiumModal";
import {
  premiumPlanAction,
  premiumSchedulePlanAction,
} from "../../../redux/actions/driverFinanceAction/createCashTransaction";
import { useDispatch } from "react-redux";
import ErrorMessagemodal from "../../modals/errorMessageModal";

const CashPaymentModal = ({
  cashPaymentShow,
  handleCashPaymentClose,
  driverData,
  title,
  cashPaymentType,
  setReload,
  reload,
}) => {
  console.log(driverData, "asdfsdsaas");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cashPaymentMethod, setCashPaymentMethod] = useState("");
  useEffect(() => {
    if (cashPaymentShow) {
      setCashPaymentMethod(cashPaymentType);
    }
  }, [cashPaymentShow]);

  const [premiumPlanData, setPremiumPlanData] = useState([]);

  const [cashTransactionModal, setCashTransactionModal] = useState(false);
  const handleCashTransactionClose = () => setCashTransactionModal(false);
  const handleCashTransactionModal = () => setCashTransactionModal(true);

  const [switchPremiumModal, setSwitchPremiumModal] = useState(false);
  const handleSwitchPremiumClose = () => setSwitchPremiumModal(false);
  const handleSwitchPremiumShow = () => setSwitchPremiumModal(true);

  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);

  console.log(premiumPlanData, "lsflaasda");

  useEffect(() => {
    if (cashPaymentMethod === "switch_premium") {
      setLoading(true);
      dispatch(
        premiumPlanAction(
          { driver_id: driverData?.id },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (cashPaymentMethod === "schedule_premium") {
      setLoading(true);
      dispatch(
        premiumSchedulePlanAction(
          { driver_id: driverData?.id },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [cashPaymentMethod, driverData?.id]);
  const onFetchSuccess = (data) => {
    setLoading(false);
    setPremiumPlanData(data?.data);
    console.log(data, "asdbkads");
  };
  const onFetchError = (data) => {
    setLoading(false);
    console.log(data, "asdbkads");
    setPremiumPlanData([]);
  };

  const onClickFn = () => {
    if (cashPaymentMethod === "current_balance") {
      handleCashTransactionModal();
    } else if (
      cashPaymentMethod === "switch_premium" ||
      cashPaymentMethod === "schedule_premium"
    ) {
      if (
        premiumPlanData?.driver_details?.DCP?.three_day_error ||
        premiumPlanData?.DCP?.three_day_error ||
        premiumPlanData?.driver_details?.DCP?.is_scheduled ||
        premiumPlanData?.DCP?.is_scheduled ||
        premiumPlanData?.driver_details?.DCP?.auto_renewal ||
        premiumPlanData?.DCP?.auto_renewal ||
        premiumPlanData?.length < 1
      ) {
        handleErrorMessageShow();
      } else {
        handleSwitchPremiumShow();
      }
    }
  };

  console.log(premiumPlanData, "skjfaksjfasd");

  return (
    <>
      <CreateCashTransactionModal
        cashTransactionModal={cashTransactionModal}
        handleCashTransactionClose={handleCashTransactionClose}
        driverData={driverData}
        reload={reload}
        setReload={setReload}
      />
      <SwitchPremiumModal
        switchPremiumModal={switchPremiumModal}
        handleSwitchPremiumClose={handleSwitchPremiumClose}
        premiumPlanData={premiumPlanData}
        reload={reload}
        setReload={setReload}
        driver_id={driverData?.id}
        type={
          cashPaymentMethod === "switch_premium"
            ? "Switch"
            : cashPaymentMethod === "schedule_premium"
            ? "Schedule"
            : ""
        }
      />
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title={
          premiumPlanData?.driver_details?.DCP?.is_scheduled ||
          premiumPlanData?.DCP?.is_scheduled
            ? `${
                cashPaymentMethod === "switch_premium"
                  ? "Cannot Switch to other Premium Because this Premium is Scheduled"
                  : cashPaymentMethod === "schedule_premium"
                  ? " Cannot Schedule this Premium Because its already Scheduled"
                  : ""
              }`
            : premiumPlanData?.driver_details?.DCP?.auto_renewal ||
              premiumPlanData?.DCP?.auto_renewal
            ? `${
                cashPaymentMethod === "switch_premium"
                  ? "Cannot Switch to other Premium Because this Premium has Auto Renewal On"
                  : cashPaymentMethod === "schedule_premium"
                  ? " Cannot Schedule this Premium Because this Premium has Auto Renewal On"
                  : ""
              }`
            : cashPaymentMethod === "switch_premium"
            ? "Cannot Switch to other Premium Because 3 days is not over from the Start Date"
            : cashPaymentMethod === "schedule_premium"
            ? " Cannot Schedule Premium Because 3 days is not over from the Start Date "
            : ""
        }
      />
      <Modal
        show={cashPaymentShow}
        centered
        keyboard={false}
        backdrop={"static"}
        onHide={handleCashPaymentClose}
        dialogClassName="create_cash_transaction_container"
        contentClassName={`border_radius_15px`}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center mt-3">
            <span className={`fs_22 primary_color fw_500 text-center`}>
              {title}
            </span>
          </div>

          <div className="d-flex justify-content-center my-2">
            <div className="w-50">
              <div className="d-flex justify-content-start align-items-center gap-2 my-1">
                <input
                  className=""
                  type="radio"
                  name="radioBtn"
                  id="current_balance"
                  checked={cashPaymentMethod === "current_balance"}
                  value={"current_balance"}
                  onChange={(e) => setCashPaymentMethod(e.target.value)}
                />{" "}
                <label
                  className={`${
                    cashPaymentMethod === "current_balance"
                      ? "primary_color fw_500"
                      : "secondary_color"
                  } fs_16 `}
                  htmlFor="current_balance"
                >
                  Current Balance
                </label>
              </div>
              {/* {premiumPlanData?.driver_details?.DCP?.three_day_error ||premiumPlanData?.DCP?.three_day_error ? null :<> */}
              <div className="d-flex justify-content-start align-items-center gap-2 my-1">
                <input
                  className=""
                  type="radio"
                  name="radioBtn"
                  id="switch_premium"
                  checked={cashPaymentMethod === "switch_premium"}
                  value={"switch_premium"}
                  onChange={(e) => setCashPaymentMethod(e.target.value)}
                />{" "}
                <label
                  className={`${
                    cashPaymentMethod === "switch_premium"
                      ? "primary_color fw_500"
                      : "secondary_color"
                  } fs_16 `}
                  htmlFor="switch_premium"
                >
                  Switch Premium
                </label>
              </div>
              <div className="d-flex justify-content-start align-items-center gap-2 my-1">
                <input
                  className=""
                  type="radio"
                  name="radioBtn"
                  id="schedule_premium"
                  checked={cashPaymentMethod === "schedule_premium"}
                  value={"schedule_premium"}
                  onChange={(e) => setCashPaymentMethod(e.target.value)}
                />{" "}
                <label
                  className={`${
                    cashPaymentMethod === "schedule_premium"
                      ? "primary_color fw_500"
                      : "secondary_color"
                  } fs_16 `}
                  htmlFor="schedule_premium"
                >
                  Schedule Premium
                </label>
              </div>
              {/* </>} */}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 my-3">
            <Cancelbtn
              cancelFn={() => {
                handleCashPaymentClose();
                // setCashPaymentMethod("");
              }}
            />
            <Proceedbtn
              submitFn={() => {
                onClickFn();
                handleCashPaymentClose();
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CashPaymentModal;
