import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { components } from "react-select";
import {
  reactSelectAddLocalResponser,
  reactSelectAddLocalResponserError,
  reactSelectCountryCode,
  reactSelectCountryCodeError,
} from "../../mui-styles/react-styles";
import DropDownIcon from "../../../assets/icons/dropdown-icon";
import "../../complaints/rider-complaints-components.css"
import LocalRespPasswordModal from "./responderPasswordModal";
import { countryCodeData } from "../countryCodeData";
import { useDispatch } from "react-redux";
import { couponMainZoneListAction } from "../../../redux/actions/riderCoupon/createCouponAction";
import ModalHeading from "../../utilits/buttons/modal-header";

const LocalResponderModal = ({
  localResponder,
  handleLocalResponderClose,
  localResponderObject = {},
  action = "",
  responderTable,
  setResponderTable,
  actionType,
  setActionType,
}) => {
  console.log(localResponderObject);
  const dispatch = useDispatch();
  const [mainZonelist, setMainZonelist] = useState([]);
  useEffect(() => {
    dispatch(couponMainZoneListAction(onFetchSuccess, onFetchError));
  }, []);

  const onFetchSuccess = (data) => {
    const statusOption = data?.data?.map((item) => {
      return { label: item?.zone_name, value: item?.id };
    });
    setMainZonelist(statusOption);
  };

  const onFetchError = (data) => {
    console.log(data?.data);
  };

  const [responderpasswordShow, setResponderpasswordShow] = useState(false);
  const handleRespPasswordShow = () => setResponderpasswordShow(true);
  const handleRespPasswordClose = () => setResponderpasswordShow(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      zone: localResponderObject?.ZoneName?.id ?? "" ?? "",
      agency: localResponderObject?.agency ?? "" ?? "",
      responderFirstName:
        localResponderObject?.responder_first_name ?? "" ?? "",
      responderLastName: localResponderObject?.responder_last_name ?? "" ?? "",
      phoneNumberType:
        action === "view" || action === "edit"
          ? localResponderObject?.phone_number_type ?? ""
          : "",
      countryCode:
        action === "view" || action === "edit"
          ? localResponderObject?.country_code ?? ""
          : 91,
      mobileNumber:
        action === "view" || action === "edit"
          ? localResponderObject?.responder_phone_number ?? ""
          : "",
      landlineNumber:
        action === "view" || action === "edit"
          ? localResponderObject?.responder_phone_number ?? ""
          : "",
    },

    validationSchema: Yup.object({
      zone: Yup.string().required("Please fill all the above fields*"),
      agency: Yup.string().required("Please fill all the above fields*"),
      responderFirstName: Yup.string().required(
        "Please fill all the above fields*"
      ),
      responderLastName: Yup.string().required(
        "Please fill all the above fields*"
      ),
      phoneNumberType: Yup.string().required(
        "Please fill all the above fields*"
      ),
      countryCode: Yup.string().when("phoneNumberType", {
        is: (val) => val?.includes("Mobile_Phone"),
        then: Yup.string().required("Please fill all the above fields*"),
        otherwise: Yup.string(),
      }),
      mobileNumber: Yup.string().when("phoneNumberType", {
        is: (val) => val?.includes("Mobile_Phone"),
        then: Yup.string()
          //   .matches(phoneRegex, "Invalid phone number")
          .required("Please fill all the above fields*"),
        otherwise: Yup.string(),
      }),
      landlineNumber: Yup.string().when("phoneNumberType", {
        is: (val) => val?.includes("Landline_Phone"),
        then: Yup.string().required("Please fill all the above fields*"),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values,"values");
      handleRespPasswordShow();
      resetForm();
    },
  });

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon />
      </components.DropdownIndicator>
    );
  };
  const phoneNumberType = [
    { value: "Mobile_Phone", label: "Mobile Phone" },
    { value: "Landline_Phone", label: "Landline Phone" },
  ];

  const options = countryCodeData?.map((item) => ({
    value: item.dial_code,
    label: item.label,
  }));

  return (
    <>
      <LocalRespPasswordModal
        responderpasswordShow={responderpasswordShow}
        handleRespPasswordClose={handleRespPasswordClose}
        handleLocalResponderClose={handleLocalResponderClose}
        action={action}
        formik={formik}
        id={localResponderObject?.id}
        actionType={actionType}
        responderTable={responderTable}
        setResponderTable={setResponderTable}
        title={`Are you sure you want to ${
          action === "create" ? "add a local responder ?" : "make changes ?"
        }`}
      />
      <Modal
        centered
        show={localResponder}
        onHide={handleLocalResponderClose}
        dialogClassName="add_local_responser_container"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <>
            <ModalHeading
              title={`${action === "create" ? "Add a" : ""} Local Responder`}
              statusShow={false}
              closeFn={handleLocalResponderClose}
            />

            <hr className="light_grey_bg my-1" />
            <div className="px-2">
              <form onSubmit={formik.handleSubmit}>
                <table className="w-100">
                  <tbody>
                    <tr>
                      <td className="w_40">
                        <span className="fs_16 secondary_color">
                          Responder ID
                        </span>
                      </td>
                      <td className="fw_500">
                        {localResponderObject?.responder_code ?? "--"}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="w_40  ">
                        <label
                          className={
                            formik.errors.zone && formik.touched.zone
                              ? `fs_16 red_color `
                              : `fs_16 secondary_color `
                          }
                          htmlFor="zone"
                        >
                          Zone
                        </label>
                      </td>

                      <td>
                        <Select
                          id="zone"
                          instanceId="zone"
                          options={mainZonelist}
                          placeholder="Select the Zone"
                          styles={
                            formik.errors.zone && formik.touched.zone
                              ? reactSelectAddLocalResponserError
                              : reactSelectAddLocalResponser
                          }
                          name="zone"
                          value={mainZonelist.filter((option) => {
                            return option?.value === formik.values.zone;
                          })}
                          onChange={(selectedOption) => {
                            let event = {
                              target: {
                                name: "zone",
                                value: selectedOption.value,
                              },
                            };
                            formik.handleChange(event);
                          }}
                          components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator,
                          }}
                          isDisabled={action === "view"}
                        />
                      </td>
                    </tr>
                    <tr className="r">
                      <td className="w_40">
                        <label
                          className={
                            formik.errors.agency && formik.touched.agency
                              ? `fs_16 red_color `
                              : `fs_16 secondary_color `
                          }
                          htmlFor="agency"
                        >
                          Agency
                        </label>
                      </td>
                      <td>
                        <input
                          id="agency"
                          className={
                            formik.errors.agency && formik.touched.agency
                              ? `w-100 error_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input my-2`
                              : `w-100 primary_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input my-2`
                          }
                          placeholder="Enter 'Agency'"
                          name="agency"
                          value={formik.values.agency}
                          onChange={formik.handleChange}
                          disabled={action === "view"}
                        />
                      </td>
                    </tr>
                    <tr className="">
                      <td className="w_40  ">
                        <label
                          className={
                            formik.errors.responderFirstName &&
                            formik.touched.responderFirstName
                              ? `fs_16 red_color `
                              : `fs_16 secondary_color `
                          }
                          htmlFor="responderFirstName"
                        >
                          Responder First Name
                        </label>
                      </td>
                      <td>
                        <input
                          id="responderFirstName"
                          className={
                            formik.errors.responderFirstName &&
                            formik.touched.responderFirstName
                              ? `w-100 error_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input my-2`
                              : `w-100 primary_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input my-2`
                          }
                          placeholder="Enter 'Responder First Name'"
                          name="responderFirstName"
                          value={formik.values.responderFirstName}
                          onChange={formik.handleChange}
                          disabled={action === "view"}
                        />
                      </td>
                    </tr>
                    <tr className="">
                      <td className="w_40  ">
                        <label
                          className={
                            formik.errors.responderLastName &&
                            formik.touched.responderLastName
                              ? `fs_16 red_color `
                              : `fs_16 secondary_color `
                          }
                          htmlFor="responderLastName"
                        >
                          Responder Last Name
                        </label>
                      </td>
                      <td>
                        <input
                          id="responderLastName"
                          className={
                            formik.errors.responderLastName &&
                            formik.touched.responderLastName
                              ? `w-100 error_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input my-2`
                              : `w-100 primary_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input my-2`
                          }
                          placeholder="Select 'Responder Last Name'"
                          name="responderLastName"
                          value={formik.values.responderLastName}
                          onChange={formik.handleChange}
                          disabled={action === "view"}
                        />
                      </td>
                    </tr>

                    <tr className="">
                      <td className="w_40">
                        <span
                          className={
                            formik.errors.phoneNumberType &&
                            formik.touched.phoneNumberType
                              ? "red_color  fw_400 "
                              : "secondary_color  fw_400"
                          }
                        >
                          Phone Number Type
                        </span>
                      </td>
                      <td>
                        <Select
                          id="phoneNumberType"
                          instanceId="phoneNumberType"
                          options={phoneNumberType}
                          placeholder="Select Refund Type"
                          styles={
                            formik.errors.phoneNumberType &&
                            formik.touched.phoneNumberType
                              ? reactSelectAddLocalResponserError
                              : reactSelectAddLocalResponser
                          }
                          name="phoneNumberType"
                          value={phoneNumberType.filter((option) => {
                            return (
                              option.value === formik.values.phoneNumberType
                            );
                          })}
                          onChange={(selectedOption) => {
                            let event = {
                              target: {
                                name: "phoneNumberType",
                                value: selectedOption.value,
                              },
                            };
                            formik.handleChange(event);
                          }}
                          components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator,
                          }}
                          isDisabled={action === "view"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w_40" style={{ verticalAlign: "top" }}>
                        <div
                          className={
                            (formik.errors.countryCode &&
                              formik.touched.countryCode) ||
                            (formik.errors.mobileNumber &&
                              formik.touched.mobileNumber) ||
                            (formik.errors.landlineNumber &&
                              formik.touched.landlineNumber)
                              ? `my-2 fs_16 red_color`
                              : `my-2 fs_16 secondary_color`
                          }
                        >
                          <span>Responder Phone Number</span>
                        </div>
                      </td>
                      <td>
                        {formik.values.phoneNumberType === "Mobile_Phone" ? (
                          <>
                            <div className="d-flex gap-2">
                              <Select
                                id="countryCode"
                                instanceId="countryCode"
                                // defaultInputValue={options?.label}
                                options={options}
                                styles={
                                  formik.errors.countryCode &&
                                  formik.touched.countryCode
                                    ? reactSelectCountryCodeError
                                    : reactSelectCountryCode
                                }
                                name="countryCode"
                                value={options?.filter((option) => {
                                  return (
                                    option.value == formik.values.countryCode
                                  );
                                })}
                                onChange={(selectedOption) => {
                                  let event = {
                                    target: {
                                      name: "countryCode",
                                      value: selectedOption.value,
                                    },
                                  };
                                  formik.handleChange(event);
                                }}
                                components={{
                                  IndicatorSeparator: () => null,
                                  DropdownIndicator,
                                }}
                                isDisabled={action === "view"}
                              />
                              <input
                                name="mobileNumber"
                                className={
                                  formik.errors.mobileNumber &&
                                  formik.touched.mobileNumber
                                    ? "w-100 error_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input mt-2"
                                    : "w-100 primary_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input mt-2"
                                }
                                value={formik.values.mobileNumber}
                                onChange={formik.handleChange}
                                placeholder="Select 'Responder Phone Number'"
                                disabled={action === "view"}
                              />
                            </div>
                            <div className="height_1rem">
                              {formik.errors.mobileNumber &&
                                formik.touched.mobileNumber && (
                                  <span className="dark_red_color d-flex justify-content-center text-nowrap fs_12 ">
                                    {formik.errors.mobileNumber}
                                  </span>
                                )}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {formik.values.phoneNumberType === "Landline_Phone" ? (
                          <>
                            <input
                              name="landlineNumber"
                              className={
                                formik.errors.landlineNumber &&
                                formik.touched.landlineNumber
                                  ? "w-100 error_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input mt-2"
                                  : "w-100 primary_border border_radius_5px primary_color fs_16 outline_none ps-2 add_local_responser_input mt-2"
                              }
                              value={formik.values.landlineNumber}
                              onChange={formik.handleChange}
                              placeholder="Select 'Responder Phone Number'"
                              disabled={action === "view"}
                            />
                            <div className="height_1rem">
                              {formik.errors.landlineNumber &&
                                formik.touched.landlineNumber && (
                                  <span className="dark_red_color d-flex justify-content-center text-nowrap fs_12">
                                    {formik.errors.landlineNumber}
                                  </span>
                                )}
                            </div>
                          </>
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div
                  className={`d-flex justify-content-end mt-2 gap-3 align-items-center`}
                >
                  {formik.errors.phoneNumberType &&
                    formik.touched.phoneNumberType && (
                      <div className="dark_red_color d-flex justify-content-center fs_14">
                        {formik.errors.phoneNumberType}
                      </div>
                    )}
                  {action === "create" ? (
                    <>
                      {" "}
                      <button
                        className={`red_color white_bg  fs_16 px-3  error_border border_radius_3px d-flex align-items-center gap-2`}
                        type="button"
                        onClick={() => handleLocalResponderClose()}
                      >
                        <i className="ri-close-circle-fill red_color" /> Cancel
                      </button>
                      <button
                        className={`white_color primary_bg fs_16 px-4  border_radius_3px  primary_border`}
                        type="submit"
                      >
                        Create
                      </button>
                    </>
                  ) : action === "edit" ? (
                    <>
                      {" "}
                      <button
                        className={`primary_color primary_border white_bg fs_16 px-4  border_radius_3px fw_500 `}
                        type="button"
                        onClick={() => {
                          formik?.resetForm();
                        }}
                      >
                        Reset
                      </button>
                      <button
                        className={`white_color primary_bg fs_16 px-4  border_radius_3px  primary_border`}
                        type="submit"
                      >
                        Update
                      </button>
                      <button
                        className={`red_color white_bg fs_16 px-4  border_radius_3px  error_border fw_500`}
                        type="button"
                        onClick={() => {
                          handleRespPasswordShow();

                          setActionType("delete");
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </form>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LocalResponderModal;
