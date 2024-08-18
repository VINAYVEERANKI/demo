import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PasswordInputField from "../../form/passwordInputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import SpinnerLoading from "../../utilits/spinnerLoading";
import CashTransactionSuccessModal from "./cash-transaction-success-modal";
import SuccessMessagemodal from "../../modals/successMessageModal";
import { dFinCreateCashTransCreateApi } from "../../../redux/apis/driverFinanceApi/createCashTransaction";
import { useDispatch } from "react-redux";
import {
  driFinCreateCashTransCreateAction,
  premiumPlanScheduleAction,
  premiumPlanSwitchAction,
} from "../../../redux/actions/driverFinanceAction/createCashTransaction";
import errorToast from "../../utilits/errorToast";

const CashTransactionPasswordModal = ({
  transactionPasswordModalShow,
  handletransactionPasswordModalClose,
  title = "",
  formik,
  driverData,
  reload,
  setReload,
  type,
  selectedPlanData,
  selectedSchedulePlan,
  handleSwitchPremiumClose,
}) => {
  console.log(selectedSchedulePlan, "ssfsfsaaddad");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [switchAmount, setSwitchAmount] = useState("");
  const formikCreatePass = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .trim()
        .required("Please fill this field to proceed"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (type === "current_balance") {
        setLoading(true);
        dispatch(
          driFinCreateCashTransCreateAction(
            {
              driver_id: driverData?.id,
              sign: formik?.values?.costtype,
              transaction_amount: formik?.values?.transactionamt,
              notes: formik?.values?.notes,
              password: values?.password,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "Switch") {
        setLoading(true);
        dispatch(
          premiumPlanSwitchAction(
            {
              driver_id: selectedPlanData?.driver_id,
              premium_type: selectedPlanData?.premium_type,
              validity: selectedPlanData?.validity,
              amount: +selectedPlanData?.amount,
              plan_type: selectedPlanData?.plan_type,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "Schedule") {
        setLoading(true);
        dispatch(
          premiumPlanScheduleAction(
            {
              driver_id: selectedSchedulePlan?.driver_id,
              premium_type: selectedSchedulePlan?.premium_type,
              plan_type: selectedSchedulePlan?.plan_type,
              expiry_date: selectedSchedulePlan?.expiry_date,
              start_date: selectedSchedulePlan?.start_date,
              amount: +selectedSchedulePlan?.premium_value_and_setup,
            },
            onSuccess,
            onError
          )
        );
      }
    },
  });
  const onSuccess = (data) => {
    console.log(data?.data, "klsaalksada");
    setSwitchAmount(data?.data?.amount);
    setLoading(false);
    if (type === "Switch" || type === "Schedule") {
      handleSwitchPremiumClose();
    }
    handletransactionPasswordModalClose();
    setSuccessMessageModalShow(true);
    console.log(data, "aaaa");
    setError(null);
  };
  const onError = (data) => {
    console.log(data?.data?.data);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
    setLoading(false);
  };

  const transactionData = [
    {
      title: "Transaction Amount",
      values:
        type === "current_balance"
          ? formik?.values.transactionamt
          : type === "Switch"
          ? selectedPlanData?.amount
          : type === "Schedule"
          ? selectedSchedulePlan?.premium_value_and_setup
          : "--",
      display: true,
    },
    {
      title: "Estimated Current Balance",
      values:
        formik?.values?.costtype === "+"
          ? driverData?.current_balance +
            parseInt(formik?.values.transactionamt, 10)
          : driverData?.current_balance -
            parseInt(formik?.values.transactionamt, 10),
      display: type === "current_balance" ? true : false,
    },
    {
      title: "Updated premium",
      values:
        type === "Switch"
          ? selectedPlanData?.premium_type
          : type === "Schedule"
          ? selectedSchedulePlan?.premium_type
          : "",
      display: type === "Switch" || type === "Schedule" ? true : false,
    },
    {
      title: "Updated plan",
      values:
        type === "Switch"
          ? selectedPlanData?.plan_type
          : type === "Schedule"
          ? selectedSchedulePlan?.plan_type
          : "",
      display: type === "Switch" || type === "Schedule" ? true : false,
    },
    {
      title: "Updated expiry date",
      values:
        type === "Switch"
          ? selectedPlanData?.expiry_date
          : type === "Schedule"
          ? selectedSchedulePlan?.expiry_date
          : "",
      display: type === "Switch" || type === "Schedule" ? true : false,
    },
  ];

  const [successMessageModalShow, setSuccessMessageModalShow] = useState(false);
  const handleSuccessMessageModalClose = () => {
    setSuccessMessageModalShow(false);
    setReload(!reload);
    formik.resetForm();
  };

  return (
    <>
      <CashTransactionSuccessModal
        show={successMessageModalShow}
        handleSuccessMessageModalClose={handleSuccessMessageModalClose}
        title_color={""}
        title={"Transaction Successful!"}
        driverData={driverData}
        switchAmount={switchAmount}
        formik={formik}
        type={type}
      />
      <Modal
        show={transactionPasswordModalShow}
        onHide={handletransactionPasswordModalClose}
        contentClassName={`border_radius_15px`}
        backdropClassName="transaction_passwd_modal_backdrop"
        centered
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikCreatePass.handleSubmit}>
              <div className="d-flex  fs_18 fw_600 mt-2">
                <span className="primary_color text-center">{title}</span>
              </div>
              <div className="mt-3">
                {transactionData
                  ?.filter((item) => item?.display === true)
                  ?.map((items) => {
                    return (
                      <div className="d-flex ms-sm-5 ">
                        <div className="col-7">
                          <span className="raven_color fw_400 ">
                            {items.title}
                          </span>
                        </div>
                        <div className="col-5">
                          <span className="fw_400">{items.values}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-3">
                <PasswordInputField
                  itemName={"password"}
                  inputValue={formikCreatePass.values.password}
                  onChangeFn={(e) => {
                    formikCreatePass.handleChange(e);
                    setError(false);
                  }}
                  onBlurFn={formikCreatePass.handleBlur}
                  formikError={formikCreatePass.errors.password}
                  formikTouched={formikCreatePass.touched.password}
                  error={error}
                />
                <div className="red_color fw_500 ms-5">{error ?? null}</div>
              </div>
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    setError(false);
                    handletransactionPasswordModalClose(false);
                    formikCreatePass.resetForm();
                  }}
                />

                <button
                  type="submit"
                  className=" primary_bg border_radius_5px px-2 py-1 border_none"
                >
                  <span className=" fs_18 white_color px-3">
                    {/* {loading ? <SpinnerLoading /> : `Confirm`} */}
                    Confirm
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CashTransactionPasswordModal;
