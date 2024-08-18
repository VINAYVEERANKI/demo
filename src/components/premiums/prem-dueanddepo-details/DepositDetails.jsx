import React from "react";
import { useState } from "react";
import "../premium.css";
import { reactSelectDriverDetails } from "../../mui-styles/react-styles";
import Select, { components } from "react-select";
import DropDownIcon from "../../../assets/icons/dropdown-icon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "@material-ui/core";
import DetailsPremiumPasswordModal from "../detailsPasswordModal";

const options = [
  { value: "OneTimeDaily", label: "One Time Daily" },
  { value: "TwoTimesDaily", label: "Two Times Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
];

const DepositDetails = ({
  action,
  defaultDuedepositData,
  params,
  setReload,
  reload,
  premiumtype,
  managePremiumType,
  setIsDisable,
  isDisable,
}) => {
  console.log(defaultDuedepositData?.deposite_details, "ajdgasj");
  const depositeData = defaultDuedepositData?.deposite_details;
  const [isEditing, setIsEditing] = useState(false);
  const [showhide, setShowhide] = useState("");

  const handleshowhide = (event) => {
    const getuser = event.value;
    setShowhide(getuser);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [detailsPremiumPasswordModal, setDetailsPremiumPasswordModal] =
    useState(false);
  const handleDetailsPremiumPWClose = () => {
    setDetailsPremiumPasswordModal(false);
  };
  const handleDetailsPremiumPasswordModal = () =>
    setDetailsPremiumPasswordModal(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cashoutcycle: depositeData?.COCycle ?? "",
      cashouttime: depositeData?.COTime ?? "",
      cashouttime1: depositeData?.COTime ?? "",
      cashouttime2: depositeData?.COTime2 ?? "",
      cashoutday: depositeData?.CODay ?? "",
      cashoutdaytimes: depositeData?.COTime ?? "",
      defaultcashout: depositeData?.CODay ?? "",
      cashoutdefaulttimes: depositeData?.COTime ?? "",
    },
    validationSchema: Yup.object().shape({
      cashoutcycle: Yup.string().required(
        "Please Complete All The Above Fields"
      ),
      cashouttime:
        selectedOption === "OneTimeDaily"
          ? Yup.string().required("cashout time is required")
          : Yup.string(),
      cashouttime1:
        selectedOption === "TwoTimesDaily"
          ? Yup.string().required("cashout time 1 is required")
          : Yup.string(),
      cashouttime2:
        selectedOption === "TwoTimesDaily"
          ? Yup.string().required("cashout time 2 is required")
          : Yup.string(),
      cashoutday:
        selectedOption === "Weekly"
          ? Yup.string().required("cashout day is required")
          : Yup.string(),
      cashoutdaytimes:
        selectedOption === "Weekly"
          ? Yup.string().required("cashout time is required")
          : Yup.string(),
      defaultcashout:
        selectedOption === "Monthly"
          ? Yup.string().required("cashout day(default) is required")
          : Yup.string(),
      cashoutdefaulttimes:
        selectedOption === "Monthly"
          ? Yup.string().required("cashout time is required")
          : Yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values);
      setIsEditing(false);
      handleDetailsPremiumPasswordModal();
    },
  });

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  const handleEdit = () => {
    setIsEditing(true);
    setIsDisable(true);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
    setIsDisable(false);
  };

  const [cashOutRequest, setCashOutRequest] = useState(
    depositeData?.CODriverRequest === true ? true : false
  );

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setCashOutRequest(true);
    } else if (isChecked && value === "no") {
      setCashOutRequest(false);
    }
  }

  console.log(cashOutRequest, "kajdkajd");

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };

  return (
    <>
      <DetailsPremiumPasswordModal
        detailsPremiumPasswordModal={detailsPremiumPasswordModal}
        handleDetailsPremiumPWClose={handleDetailsPremiumPWClose}
        title={"Are you sure you want to Update"}
        setIsEditing={setIsEditing}
        params={params}
        cashOutRequest={cashOutRequest}
        formik={formik}
        type="Deposite"
        setReload={setReload}
        reload={reload}
        premiumtype={premiumtype}
        managePremiumType={managePremiumType}
      />
      <div className="py-5">
        <div className=" d-flex justify-content-between pe-4">
          <div className="fs_16 fw_500 primary_color">Deposit Details</div>
          {action === "view" ? null : (
            <>
              {!isEditing ? (
                <button
                  className={`${isDisable === true ? "disabled_color_bg" : "primary_bg"
                    } border-0  white_color px-3 fs_15 border_radius_5px`}
                  onClick={handleEdit}
                  disabled={isDisable === true }
                >
                  Edit
                </button>
              ) : (
                <>
                  <div className=" d-flex gap-2">
                    <button
                      className="ms-3 fs_14 reset_btn border_radius white_bg red_color  px-2 reset_btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="fs_14 cancel_btn border_radius white_bg primary_color px-2 "
                      type="reset"
                      onClick={() => {
                        formik.resetForm();
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="fs_14 save_Btn dark_green_bg border_radius  px-3 white_color border_none"
                      type="submit"
                      onClick={formik.handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="ps-3 mt-3 fs_14 primary_color">
            <div className="d-flex align-items-center">
              <div className="col-2">Cashout at driver's request</div>
              <div className="col-3">
                {/* <div className="d-flex gap-5 align-items-center">
                  <div className="d-flex ps-2 gap-2 ">
                    <label>Yes</label>
                    <input
                      type="radio"
                      id="yes"
                      name="answer"
                      value="yes"
                      onChange={(e) => handleCheckbox(e)}
                      className="Yesradio"
                      disabled={action === "view"}
                    />{" "}
                  </div>
                  <div className="d-flex ps-2 gap-2">
                    <label> No</label>
                    <input
                      type="radio"
                      id="no"
                      name="answer"
                      value="no"
                      onChange={(e) => handleCheckbox(e)}
                      className="Noradio"
                      defaultChecked
                      disabled={action === "view"}
                    />{" "}
                  </div>
                </div> */}
                <div className="d-flex gap-5 align-items-center">
                  <div className="d-flex ps-2 gap-2">
                    <label>Yes</label>
                    <input
                      type="radio"
                      id="yes"
                      name="answer"
                      value="yes"
                      onChange={handleCheckbox}
                      className="Yesradio"
                      checked={cashOutRequest}
                      disabled={action === "view"}
                    />
                  </div>
                  <div className="d-flex ps-2 gap-2">
                    <label>No</label>
                    <input
                      type="radio"
                      id="no"
                      name="answer"
                      value="no"
                      onChange={handleCheckbox}
                      className="Noradio"
                      checked={!cashOutRequest}
                      disabled={action === "view"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center py-2 mt-2">
              <div className="col-2">
                <label
                  className={`${formik.touched.cashoutcycle && formik.errors.cashoutcycle
                    ? "red_color fw_500"
                    : ""
                    }`}
                >
                  Cashout Cycle
                </label>
              </div>
              <div className="col-3">
                {/* {!isEditing || action === "view" ? (
                  <Select
                    className="selectfieldstyle outline_none"
                    aria-label="Default select example"
                    id="cash"
                    name="cash"
                    styles={reactSelectDriverDetails}
                    defaultValue={selectedOption}
                    onChange={(e) => {
                      let event = {
                        target: { name: "cash", value: e.value },
                      };
                      setSelectedOption(e.value);
                      handleshowhide(e);
                    }}
                    options={options}
                    components={{
                      DropdownIndicator,
                      IndicatorSeparator: () => null,
                    }}
                    isDisabled
                  />
                ) : ( */}
                <Select
                  aria-label="Default select example"
                  id="cashoutcycle"
                  name="cashoutcycle"
                  className={`selectfieldstyle outline_none ${formik.touched.cashoutcycle && formik.errors.cashoutcycle
                    ? "border-redss outline_none"
                    : ""
                    }`}
                  styles={reactSelectDriverDetails}
                  defaultValue={selectedOption}
                  onChange={(e) => {
                    let event = {
                      target: { name: "cashoutcycle", value: e.value },
                    };
                    formik.handleChange(event);

                    setSelectedOption(e.value);
                    handleshowhide(e);
                  }}
                  value={options?.filter((option) => {
                    return option.value === formik.values.cashoutcycle;
                  })}
                  options={options}
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                  isDisabled={!isEditing || action === "view"}
                />
                {/* )} */}
              </div>
            </div>
            {formik?.values?.cashoutcycle === "OneTimeDaily" && (
              <>
                <div className="d-flex align-items-center py-2">
                  <div className="col-2">
                    <label
                      className={`${formik.touched.cashouttime && formik.errors.cashouttime
                        ? "red_color fw_500"
                        : ""
                        }`}
                    >
                      Cashout time
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      type="time"
                      className={`border_radius_7px p-1 outline_none ${formik.touched.cashouttime && formik.errors.cashouttime
                        ? " border-red "
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="cashouttime"
                      name="cashouttime"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cashouttime}
                    />
                  </div>
                </div>
              </>
            )}

            {formik?.values?.cashoutcycle === "TwoTimesDaily" && (
              <>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-2">
                    <label
                      className={`${formik.touched.cashouttime1 &&
                        formik.errors.cashouttime1
                        ? "red_color fw_500"
                        : ""
                        }`}
                    >
                      Cashout time -1
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      type="time"
                      className={`border_radius_7px p-1 outline_none ${formik.touched.cashouttime1 &&
                        formik.errors.cashouttime1
                        ? " border-red "
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="cashouttime1"
                      name="cashouttime1"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cashouttime1}
                    />
                  </div>
                </div>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-2">
                    <label
                      className={`${formik.touched.cashouttime2 &&
                        formik.errors.cashouttime2
                        ? "red_color fw_500"
                        : ""
                        }`}
                    >
                      Cashout time -2
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      type="time"
                      className={`border_radius_7px p-1 outline_none ${formik.touched.cashouttime2 &&
                        formik.errors.cashouttime2
                        ? " border-red "
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="cashouttime2"
                      name="cashouttime2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cashouttime2}
                    />
                  </div>
                </div>
              </>
            )}

            {formik?.values?.cashoutcycle === "Weekly" && (
              <>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-2">
                    <label
                      className={`${formik.touched.cashoutday && formik.errors.cashoutday
                        ? "red_color fw_500"
                        : ""
                        }`}
                    >
                      Cashout Day
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      className={`border_radius_7px p-1 outline_none ${formik.touched.cashoutday && formik.errors.cashoutday
                        ? " border-red "
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="cashoutday"
                      name="cashoutday"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cashoutday}
                    />
                  </div>
                </div>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-2">
                    <label
                      className={`${formik.touched.cashoutdaytimes &&
                        formik.errors.cashoutdaytimes
                        ? "red_color fw_500"
                        : ""
                        }`}
                    >
                      Cashout time
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      type="time"
                      className={`border_radius_7px p-1 outline_none ${formik.touched.cashoutdaytimes &&
                        formik.errors.cashoutdaytimes
                        ? " border-red "
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="cashoutdaytimes"
                      name="cashoutdaytimes"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cashoutdaytimes}
                    />
                  </div>
                </div>
              </>
            )}

            {formik?.values?.cashoutcycle === "Monthly" && (
              <>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-2">
                    <label
                      className={`${formik.touched.defaultcashout &&
                        formik.errors.defaultcashout
                        ? "red_color fw_500"
                        : ""
                        }`}
                    >
                      Cashout Day (default)
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      className={`border_radius_7px p-1 outline_none ${formik.touched.defaultcashout &&
                        formik.errors.defaultcashout
                        ? " border-red "
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="defaultcashout"
                      name="defaultcashout"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.defaultcashout}
                    />
                  </div>
                </div>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-2">
                    <label
                      className={`${formik.touched.cashoutdefaulttimes &&
                        formik.errors.cashoutdefaulttimes
                        ? "red_color fw_500"
                        : ""
                        }`}
                    >
                      Cashout time
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      type="time"
                      className={`border_radius_7px outline_none p-1 ${formik.touched.cashoutdefaulttimes &&
                        formik.errors.cashoutdefaulttimes
                        ? " border-red "
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="cashoutdefaulttimes"
                      name="cashoutdefaulttimes"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cashoutdefaulttimes}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="col-6 d-flex justify-content-center">
              {firstErrorField && (
                <div className="red_color fs_13 fw_400">
                  {formik.errors[firstErrorField]}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <hr className="detailsline" />
    </>
  );
};

export default DepositDetails;
