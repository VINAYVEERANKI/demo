import React from "react";
import { useState } from "react";
import "../premium.css";
import { reactSelectDriverDetails } from "../../mui-styles/react-styles";
import Select, { components } from "react-select";
import DropDownIcon from "../../../assets/icons/dropdown-icon";
import { useFormik } from "formik";
import * as Yup from "yup";
import DetailsPremiumPasswordModal from "../detailsPasswordModal";

const options = [
  { value: "PriceModule1", label: "Module 1" },
  { value: "PriceModule2", label: "Module 2" },
];
const PremiumModule = ({
  action,
  premiumData,
  params,
  reload,
  setReload,
  premiumtype,
  managePremiumType,
  activeTab,
}) => {
  console.log(premiumData, "asjkdgasjk");
  const [isEditing, setIsEditing] = useState(false);
  const [select, setSelect] = useState("");
  const [showhide, setShowhide] = useState("PriceModule1");

  const handleshowhide = (event) => {
    const getuser = event.value;
    setShowhide(getuser);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption, "akjdak");

  const [detailsPremiumPasswordModal, setDetailsPremiumPasswordModal] =
    useState(false);
  const handleDetailsPremiumPWClose = () => {
    setDetailsPremiumPasswordModal(false);
  };
  const handleDetailsPremiumPasswordModal = () =>
    setDetailsPremiumPasswordModal(true);


    console.log(premiumData, "ljkllklk");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      premiummodule: premiumData?.active_pricing_module ?? "",
      Stage1income: premiumData?.stage1_income ?? "",
      Stage2income: premiumData?.stage2_income ?? "",
      Stage3income: premiumData?.stage3_income ?? "",
      stage1bookings: premiumData?.stage1_booking ?? "",
      stage2bookings: premiumData?.stage2_booking ?? "",
      stage3bookings: premiumData?.stage3_booking ?? "",
    },
    validationSchema: Yup.object().shape({
      premiummodule: Yup.string().required(
        "Note: Please Complete All The Above Fields"
      ),
      Stage1income:
        selectedOption === "PriceModule1"
          ? Yup.string().required("Stage1 Income is required")
          : Yup.string(),
      Stage2income:
        selectedOption === "PriceModule1"
          ? Yup.string().required("Stage2 Income is required")
          : Yup.string(),
      Stage3income:
        selectedOption === "PriceModule1"
          ? Yup.string().required("Stage3 Income is required")
          : Yup.string(),
      stage1bookings:
        selectedOption === "PriceModule2"
          ? Yup.string().required("Stage1 Bookings is required")
          : Yup.string(),
      stage2bookings:
        selectedOption === "PriceModule2"
          ? Yup.string().required("Stage2 Bookings is required")
          : Yup.string(),
      stage3bookings:
        selectedOption === "PriceModule2"
          ? Yup.string().required("Stage3 Bookings is required")
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
  };

  const handleCancel = () => {
    formik.resetForm();
    setShowhide(premiumData?.active_pricing_module)
    setIsEditing(false);
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };

  console.log(managePremiumType, "lsdfl");

  return (
    <>
      <DetailsPremiumPasswordModal
        detailsPremiumPasswordModal={detailsPremiumPasswordModal}
        handleDetailsPremiumPWClose={handleDetailsPremiumPWClose}
        title={"Are you sure you want to Update"}
        setIsEditing={setIsEditing}
        params={params}
        formik={formik}
        type={"PricingModule"}
        setReload={setReload}
        reload={reload}
        premiumtype={premiumtype}
        managePremiumType={managePremiumType}
      />
      <div className="premium_modborder col-4 py-3 px-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="fs_14 primary_color">
            <div className="d-flex align-items-center py-2">
              <div className="col-5">
                <label
                  className={`${formik.touched.premiummodule && formik.errors.premiummodule
                      ? "red_color fw_500"
                      : ""
                    }`}
                >
                  Premium Module
                </label>
              </div>
              <div className="col-7">
                <Select
                  aria-label="Default select example"
                  id="premiummodule"
                  name="premiummodule"
                  className={`selectfieldstyle outline_none ${formik.touched.premiummodule && formik.errors.premiummodule
                      ? "border-redss outline_none"
                      : ""
                    }`}
                  styles={reactSelectDriverDetails}
                  // defaultValue={selectedOption}
                  onChange={(e) => {
                    let event = {
                      target: { name: "premiummodule", value: e.value },
                    };
                    formik.handleChange(event);

                    setSelectedOption(e.value);
                    handleshowhide(e);
                  }}
                  value={options?.filter((option) => {
                    return option.value === formik.values.premiummodule;
                  })}
                  options={options}
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                  isDisabled={!isEditing || action === "view"}
                />
              </div>
            </div>

            {showhide === "PriceModule1" && (
              <>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-5">
                    <label
                      className={`${formik.touched.Stage1income &&
                          formik.errors.Stage1income
                          ? "red_color fw_500"
                          : ""
                        }`}
                    >
                      Stage 1 Income
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      className={`border_radius_7px p-1 outline_none ${formik.touched.Stage1income &&
                          formik.errors.Stage1income
                          ? " border-red "
                          : !isEditing || action === "view"
                            ? "disabled_bg_color  disabled_border"
                            : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="Stage1income"
                      name="Stage1income"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Stage1income}
                    />
                  </div>
                </div>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-5">
                    <label
                      className={`${formik.touched.Stage2income &&
                          formik.errors.Stage2income
                          ? "red_color fw_500"
                          : ""
                        }`}
                    >
                      Stage 2 Income
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      className={`border_radius_7px p-1 outline_none ${formik.touched.Stage2income &&
                          formik.errors.Stage2income
                          ? " border-red "
                          : !isEditing || action === "view"
                            ? "disabled_bg_color  disabled_border"
                            : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="Stage2income"
                      name="Stage2income"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Stage2income}
                    />
                  </div>
                </div>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-5">
                    <label
                      className={`${formik.touched.Stage3income &&
                          formik.errors.Stage3income
                          ? "red_color fw_500"
                          : ""
                        }`}
                    >
                      Stage 3 Income
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      className={`border_radius_7px p-1 outline_none ${formik.touched.Stage3income &&
                          formik.errors.Stage3income
                          ? " border-red "
                          : !isEditing || action === "view"
                            ? "disabled_bg_color  disabled_border"
                            : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="Stage3income"
                      name="Stage3income"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Stage3income}
                    />
                  </div>
                </div>
              </>
            )}

            {showhide === "PriceModule2" && (
              <>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-5">
                    <label
                      className={`${formik.touched.stage1bookings &&
                          formik.errors.stage1bookings
                          ? "red_color fw_500"
                          : ""
                        }`}
                    >
                      Stage 1 Bookings
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      className={`border_radius_7px p-1 outline_none  ${formik.touched.stage1bookings &&
                          formik.errors.stage1bookings
                          ? " border-red "
                          : !isEditing || action === "view"
                            ? "disabled_bg_color  disabled_border"
                            : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="stage1bookings"
                      name="stage1bookings"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.stage1bookings}
                    />
                  </div>
                </div>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-5">
                    <label
                      className={`${formik.touched.stage2bookings &&
                          formik.errors.stage2bookings
                          ? "red_color fw_500"
                          : ""
                        }`}
                    >
                      Stage 2 Bookings
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      className={`border_radius_7px p-1 outline_none ${formik.touched.stage2bookings &&
                          formik.errors.stage2bookings
                          ? " border-red "
                          : !isEditing || action === "view"
                            ? "disabled_bg_color  disabled_border"
                            : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="stage2bookings"
                      name="stage2bookings"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.stage2bookings}
                    />
                  </div>
                </div>
                <div className=" d-flex align-items-center py-2">
                  <div className="col-5">
                    <label
                      className={`${formik.touched.stage3bookings &&
                          formik.errors.stage3bookings
                          ? "red_color fw_500"
                          : ""
                        }`}
                    >
                      Stage 3 Bookings
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      className={`border_radius_7px p-1 outline_none ${formik.touched.stage3bookings &&
                          formik.errors.stage3bookings
                          ? " border-red "
                          : !isEditing || action === "view"
                            ? "disabled_bg_color  disabled_border"
                            : "primary_color primary_border"
                        }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="stage3bookings"
                      name="stage3bookings"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.stage3bookings}
                    />
                  </div>
                </div>
              </>
            )}
            <div className=" d-flex align-items-center mt-2">
              <div className="col-5"></div>
              <div className="col-7 pe-3">
                {action === "view" ? null : (
                  <>
                    {!isEditing ? (
                      <div className=" d-flex justify-content-end">
                        <button
                          className="border-0 primary_bg white_color px-3 fs_15 border_radius_5px"
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className=" d-flex justify-content-end gap-2">
                          <button
                            className="fs_14 cancel_btn border_radius white_bg primary_color px-2 "
                            type="reset"
                            onClick={() => {
                              handleCancel();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="fs_14  border_radius white_bg red_color error_border px-2 "
                            type="reset"
                            onClick={() => {
                              formik.resetForm();
                              setShowhide(premiumData?.active_pricing_module)
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
            </div>
            <div className="col-2"></div>
            <div className="col-10 d-flex justify-content-center">
              {firstErrorField && (
                <div className="red_color fs_13 fw_400 mt-2">
                  {formik.errors[firstErrorField]}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PremiumModule;
