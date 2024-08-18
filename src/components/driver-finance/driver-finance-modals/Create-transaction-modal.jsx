import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Modal from "react-bootstrap/Modal";
import ModalHeading from "../../utilits/buttons/modal-header";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import TransactionInputFields from "../TransactionInputFields";
import CashTransactionPasswordModal from "./cash-transaction-password-modal";
import { useDispatch } from "react-redux";
import "../driverFinance.css";
import dropDownIcon from "../../../assets/icons/select-dropdowm-icon.svg";
import { NavLink } from "react-router-dom";
import { driverNavigateFn } from "../../helper";
import CouponSelectField from "../../form/CouponSelectField";

const CreateCashTransactionModal = ({
  cashTransactionModal,
  handleCashTransactionClose,
  driverData,
  reload,
  setReload,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [transactionPasswordModalShow, setTransactionPasswordModalShow] =
    useState(false);
  const handletransactionPasswordModalClose = () => {
    setTransactionPasswordModalShow(false);
  };
  const handletransactionPasswordModalShow = () =>
    setTransactionPasswordModalShow(true);

  const validationSchema = yup.object({
    costtype: yup.string().required("*"),
    transactionamt: yup
      .number()
      .when("costtype", {
        is: (val) => val === "+" || val === "-",
        then: yup
          .number()
          .moreThan(0, "Transaction amount must be greater than 0"),
      })
      .required("This field cannot be left empty*"),
    notes: yup
      .string()
      .trim()
      .required("Please fill all the above mandatory fields!"),
  });

  const formik = useFormik({
    // enableReinitialize: false,
    initialValues: {
      costtype: "",
      transactionamt: "",
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handletransactionPasswordModalShow();
      handleCashTransactionClose();
    },
  });

  console.log(driverData, "kjhkj");

  const tranctionType = [
    {
      label: "+",
      value: "+",
    },
    {
      label: "-",
      value: "-",
    },
  ];

  return (
    <>
      <CashTransactionPasswordModal
        transactionPasswordModalShow={transactionPasswordModalShow}
        handletransactionPasswordModalClose={
          handletransactionPasswordModalClose
        }
        title="Are you sure you want to confirm the transaction?"
        formik={formik}
        driverData={driverData}
        reload={reload}
        setReload={setReload}
        type="current_balance"
      />
      <Modal
        centered
        show={cashTransactionModal}
        onHide={handleCashTransactionClose}
        size="large"
        dialogClassName="create_cash_transaction_container"
        contentClassName={`border_radius_15px`}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body onHide>
          <ModalHeading
            title={"New Cash Transaction(Driver Only)"}
            closeFn={() => {
              handleCashTransactionClose();
              formik.resetForm();
            }}
            statusShow={false}
          />
          <div className="d-flex justify-content-center py-3 px-2">
            <div className="col-11">
              <div className=" d-flex justify-content-center secondary_color fs_13">
                <span>Note: </span>
                <span className="ps-2">
                  {" "}
                  Any transactions made here would reflect in the drivers'
                  current balance.
                </span>
              </div>

              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="d-flex mt-2">
                  <div className="col-5 fs_14 secondary_color">
                    <label>Driver ID</label>
                  </div>
                  <div className="col-7 fs_14 primary_color">
                    <NavLink
                      className={"primary_color"}
                      to={driverNavigateFn(driverData, driverData?.id)}
                    >
                      {driverData?.driver_id2}
                    </NavLink>
                  </div>
                </div>
                <div className="d-flex mt-1">
                  <div className="col-5 fs_14 secondary_color">
                    <label>First Name</label>
                  </div>
                  <div className="col-7 fs_14 primary_color">
                    <span>{driverData?.first_name}</span>
                  </div>
                </div>
                <div className="d-flex mt-1">
                  <div className="col-5 fs_14 secondary_color">
                    <label>Last Name</label>
                  </div>
                  <div className="col-7 fs_14 primary_color">
                    <span>{driverData?.last_name}</span>
                  </div>
                </div>
                <div className="d-flex mt-1">
                  <div className="col-5 fs_14 secondary_color">
                    <label>Phone Number</label>
                  </div>
                  <div className="col-7 fs_14 primary_color">
                    <span>{driverData?.phone_number}</span>
                  </div>
                </div>
                <div className="d-flex mt-1">
                  <div className="col-5 fs_14 secondary_color">
                    <label>Current Balance(₹)</label>
                  </div>

                  <div
                    className={`col-7 fs_14 ${
                      driverData?.current_balance < 0
                        ? "error_color"
                        : "primary_color"
                    }`}
                  >
                    <span>{driverData?.current_balance}</span>
                  </div>
                </div>

                <div className="d-flex mt-2 ">
                  <div className="col-5 ">
                    <label
                      className={`fs_14 mt-2 secondary_color ${
                        formik.errors.costtype && formik.touched.costtype
                          ? "error_color"
                          : ""
                      }`}
                    >
                      Transaction amount*
                    </label>
                  </div>
                  <div className="col-7">
                    <div className="d-flex gap-2">
                      <div className="w-25">
                        <CouponSelectField
                          label={false}
                          placeholder=""
                          option={tranctionType}
                          itemName="costtype"
                          formikValue={formik.values.costtype}
                          formik={formik}
                          formikError={formik.errors.costtype}
                          formikTouched={formik.touched.costtype}
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Amount"
                        className={` py-1 ps-2 border_radius_5px  w-50 ${
                          formik.errors.transactionamt
                            ? "error"
                            : "border_grey_color"
                        }`}
                        name="transactionamt"
                        value={formik?.values?.transactionamt}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <TransactionInputFields
                  labelName={"Notes*"}
                  itemName={"notes"}
                  type={"text"}
                  id={"notes"}
                  placeholder={"Write message here"}
                  name={"notes"}
                  TextArea={true}
                  input={false}
                  selectField={false}
                  inputValue={formik.values?.notes}
                  onChangeFn={formik.handleChange}
                  onBlurFn={formik.handleBlur}
                  formikError={formik.errors.notes}
                  formikTouched={formik.touched.notes}
                />
                <div className="d-flex justify-content-center mt-4 gap-3">
                  <Cancelbtn
                    cancelFn={() => {
                      handleCashTransactionClose();
                      formik.resetForm();
                    }}
                  />
                  <button
                    type="submit"
                    className="white_color primary_bg border_radius_5px px-4 py-1 border_none"
                    // onClick={() => handletransactionPasswordModalShow()}
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateCashTransactionModal;
