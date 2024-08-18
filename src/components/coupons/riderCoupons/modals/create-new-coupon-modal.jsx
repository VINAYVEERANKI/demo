import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../coupon-component.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { components } from "react-select";
import DropDownIcon from "../../../../assets/icons/dropdown-icon";
import {
  reactSelectCoupon,
  reactSelectCouponError,
  reactSelectCouponDisabled,
} from "../../../mui-styles/react-styles";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { couponMainZoneListAction } from "../../../../redux/actions/riderCoupon/createCouponAction";

const CreateNewCouponModal = ({
  createCouponShow,
  handleCreateCouponClose,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loadinng, setLoadinng] = useState(false);
  const [mainZonelist, setMainZonelist] = useState([]);

  useEffect(() => {
    setLoadinng(true);
    dispatch(couponMainZoneListAction(onFetchSuccess, onFetchError));
  }, [createCouponShow]);

  const onFetchSuccess = (data) => {
    setLoadinng(false);
    const statusOption = data?.data?.map((item) => {
      return { label: item?.zone_name, value: item?.id };
    });

    const objData = data?.data?.map((item) => ({
      label: item?.zone_name,
      value: item?.id,
    }));
    const allIds = objData?.map((item) => item?.value);
    setMainZonelist([{ label: "All", value: allIds }, ...objData]);
  };

  console.log(mainZonelist);

  const onFetchError = () => {
    setLoadinng(false);
  };

  const formikCreate = useFormik({
    enableReinitialize: true,
    initialValues: {
      couponClassification: "",
      couponClassificationDetails: "",
      couponApplicableZone: [],
      couponType: "",
    },

    validationSchema: Yup.object().shape({
      couponClassification: Yup.string().required(
        "Note: Please Complete All The Above Fields"
      ),

      couponClassificationDetails: Yup.string().when("couponClassification", {
        is: (val) =>
          val?.includes("BookingDistance") || val?.includes("RentalPackage"),

        then: Yup.string().required("Atleast one is required"),
        otherwise: Yup.string(),
      }),
      couponApplicableZone: Yup.mixed().when("couponClassification", {
        is: (val) =>
          val?.includes("General") ||
          val?.includes("PaymentMethod") ||
          val?.includes("BookingDestination") ||
          val?.includes("PickupToDropoff") ||
          val?.includes("BookingDistance") ||
          val?.includes("RentalPackage") ||
          val?.includes("OutstationPackageDistance"),

        then: Yup.mixed().test(
          "at-least-one-required",
          "Atleast one is required",
          function (value) {
            if (typeof value === "string" && value.length > 0) {
              return true;
            }
            if (Array.isArray(value) && value.length > 0) {
              return true;
            }
            return false;
          }
        ),
        otherwise: Yup.mixed(),
      }),
      couponType: Yup.string().when("couponClassification", {
        is: (val) =>
          val?.includes("General") ||
          val?.includes("NewAccount") ||
          val?.includes("PaymentMethod") ||
          val?.includes("BookingDestination") ||
          val?.includes("PickupToDropoff") ||
          val?.includes("BookingDistance") ||
          val?.includes("RentalPackage") ||
          val?.includes("OutstationPackageDistance"),

        then: Yup.string().required("Atleast one is required"),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handleCreateCouponClose();
      navigate("/create-new-coupon", {
        state: values,
      });
      // resetForm();
    },
  });

  // console.log(formikCreate.values);
  // console.log(formikCreate.errors);

  // const option = {
  //   label: "All",
  //   value: mainZonelist
  //     ?.filter((item) => {
  //       return item.label !== "All";
  //     })
  //     .map((item) => {
  //       return item?.value;
  //     }),
  //   isDisabled:
  //     formikCreate.values.couponClassification === "BookingDestination" ||
  //     formikCreate.values.couponClassification === "PickupToDropoff",
  // };
  // useEffect(() => {
  //   const mzonelist = mainZonelist.filter((item) => item.label !== "All");
  //   mzonelist.push(option);
  //   setMainZonelist(mzonelist);
  // }, [formikCreate.values.couponClassification]);

  console.log(mainZonelist);
  console.log(formikCreate.values.couponClassification);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };
  const couponClassification = [
    { value: "General", label: "General" },
    { value: "NewAccount", label: "New Account" },
    { value: "NewAccountLifeSpan", label: "New Account (Life Span)" },
    { value: "PaymentMethod", label: "Payment Method" },
    { value: "BookingDestination", label: "Booking Destination" },
    {
      value: "PickupToDropoff",
      label: "Pickup Location To Drop-Off Location",
    },
    { value: "BookingDistance", label: "Booking Distance" },
    { value: "RentalPackage", label: "Rental Package" },
    {
      value: "OutstationPackageDistance",
      label: "Outstation Package Duration",
    },
  ];
  const couponClassificationDetails = [
    {
      value: "Milestone",
      label: "Milestone",
      isDisabled:
        formikCreate.values.couponClassification ===
        "OutstationPackageDistance",
    },
    { value: "Range", label: "Range" },
    { value: "N/A", label: "N/A", isDisabled: true },
  ];

  const couponType = [
    { value: "X%DiscountUpToY", label: "X%DiscountUpToY" },
    { value: "XAmountOff", label: "XAmountOff" },
    { value: "X%CashbackUpToY", label: "X%CashbackUpToY" },
    { value: "N/A", label: "N/A", isDisabled: true },
  ];

  console.log(formikCreate?.values?.couponApplicableZone);
  //   console.log(mainZonelist);
  //   const value = mainZonelist?.map((item) => item.value)
  //   console.log(value);

  //   const zonevalue = mainZonelist?.filter((item) => item.value == formikCreate.values.couponApplicableZone)
  // console.log(zonevalue);

  return (
    <>
      <Modal
        centered
        show={createCouponShow}
        onHide={handleCreateCouponClose}
        dialogClassName="create_coupon_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_coupon_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs_23 fw_500">Create New Coupon</span>
            <span className="" onClick={() => handleCreateCouponClose()}>
              <i className="ri-close-circle-fill fs_26" />
            </span>
          </div>
          <hr className="my-0 disabled_color" />

          <form onSubmit={formikCreate.handleSubmit}>
            <div className="d-flex flex-column mx-5 px-3 mt-3">
              <label className="fs_16 fw_500 raven_color">User Type*</label>
              <input
                className="border_radius_5px coupon_input_border p-1 ps-2 fs_16 fw_500 raven_color"
                value="Rider"
                disabled
              />
            </div>

            <div className="mt-3 mx-5 px-3">
              <label
                className={
                  formikCreate.errors.couponClassification &&
                  formikCreate.touched.couponClassification
                    ? "fs_16 fw_500 red_color"
                    : "fs_16 fw_500 raven_color"
                }
              >
                Coupon Classification*
              </label>
              <Select
                id="couponClassification"
                instanceId="couponClassification"
                options={couponClassification}
                placeholder="Select Refund Type"
                styles={
                  formikCreate.errors.couponClassification &&
                  formikCreate.touched.couponClassification
                    ? reactSelectCouponError
                    : reactSelectCoupon
                }
                name="couponClassification"
                value={couponClassification.filter((option) => {
                  return (
                    option.value === formikCreate.values.couponClassification
                  );
                })}
                onChange={(selectedOption) => {
                  let event = {
                    target: {
                      name: "couponClassification",
                      value: selectedOption.value,
                    },
                  };

                  formikCreate.handleChange(event);

                  formikCreate.setFieldValue(
                    "couponClassificationDetails",
                    "N/A"
                  );

                  formikCreate.setFieldValue("couponType", "");
                  if (selectedOption.value === "BookingDistance") {
                    formikCreate.setFieldValue(
                      "couponClassificationDetails",
                      ""
                    );
                  } else if (selectedOption.value === "RentalPackage") {
                    formikCreate.setFieldValue(
                      "couponClassificationDetails",
                      ""
                    );
                  } else if (
                    selectedOption.value === "OutstationPackageDistance"
                  ) {
                    formikCreate.setFieldValue(
                      "couponClassificationDetails",
                      ""
                    );
                  }
                  if (selectedOption.value === "NewAccount") {
                    formikCreate.setFieldValue("couponApplicableZone", "");
                  }
                  if (selectedOption.value === "NewAccountLifeSpan") {
                    formikCreate.setFieldValue("couponApplicableZone", "");
                  }
                  // {
                  //   selectedOption.value === "BookingDistance" &&
                  //     formikCreate.setFieldValue(
                  //       "couponClassificationDetails",
                  //       ""
                  //     );
                  // }
                  // {
                  //   selectedOption.value === "RentalPackage" &&
                  //     formikCreate.setFieldValue(
                  //       "couponClassificationDetails",
                  //       ""
                  //     );
                  // }
                  // {
                  //   selectedOption.value === "OutstationPackageDistance" &&
                  //     formikCreate.setFieldValue(
                  //       "couponClassificationDetails",
                  //       ""
                  //     );
                  // }
                  // {
                  //   selectedOption.value === "NewAccount"
                  //     ? formikCreate.setFieldValue(
                  //         "couponApplicableZone",
                  //         "N/A"
                  //       )
                  //     : formikCreate.setFieldValue("couponApplicableZone", []);
                  // }
                }}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator,
                }}
              />
            </div>

            <>
              <div className="mt-3 mx-5 px-3">
                <label
                  className={
                    formikCreate.errors.couponClassificationDetails &&
                    formikCreate.touched.couponClassificationDetails
                      ? "red_color  fs_16 fw_500"
                      : "fs_16 fw_500 raven_color"
                  }
                >
                  Coupon Classification Details*
                </label>

                <div className="">
                  <Select
                    id="couponClassificationDetails"
                    instanceId="couponClassificationDetails"
                    options={couponClassificationDetails}
                    isDisabled={
                      formikCreate.values.couponClassification === "" ||
                      formikCreate.values.couponClassification === "General" ||
                      formikCreate.values.couponClassification ===
                        "NewAccount" ||
                      formikCreate.values.couponClassification ===
                        "NewAccountLifeSpan" ||
                      formikCreate.values.couponClassification ===
                        "PaymentMethod" ||
                      formikCreate.values.couponClassification ===
                        "BookingDestination" ||
                      formikCreate.values.couponClassification ===
                        "PickupToDropoff"
                    }
                    placeholder="Select coupon classification details"
                    styles={
                      formikCreate.errors.couponClassificationDetails &&
                      formikCreate.touched.couponClassificationDetails
                        ? reactSelectCouponError
                        : formikCreate.values.couponClassification === "" ||
                          formikCreate.values.couponClassification ===
                            "General" ||
                          formikCreate.values.couponClassification ===
                            "NewAccount" ||
                          formikCreate.values.couponClassification ===
                            "NewAccountLifeSpan" ||
                          formikCreate.values.couponClassification ===
                            "PaymentMethod" ||
                          formikCreate.values.couponClassification ===
                            "BookingDestination" ||
                          formikCreate.values.couponClassification ===
                            "PickupToDropoff"
                        ? reactSelectCouponDisabled
                        : reactSelectCoupon
                    }
                    name="couponClassificationDetails"
                    onBlur={formikCreate.handleBlur}
                    value={couponClassificationDetails.filter((option) => {
                      return (
                        option.value ===
                        formikCreate.values.couponClassificationDetails
                      );
                    })}
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "couponClassificationDetails",
                          value: selectedOption.value,
                        },
                      };
                      formikCreate.handleChange(event);
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                    }}
                  />
                </div>
              </div>
              <div className="mt-3 mx-5 px-3">
                <label
                  className={
                    formikCreate.errors.couponApplicableZone &&
                    formikCreate.touched.couponApplicableZone
                      ? "red_color  fs_16 fw_500"
                      : "fs_16 fw_500 raven_color"
                  }
                >
                  Coupon Applicable Zone*
                </label>

                <div className="">
                  <Select
                    id="couponApplicableZone"
                    instanceId="couponApplicableZone"
                    options={mainZonelist}
                    isDisabled={
                      formikCreate.values.couponClassification === "" ||
                      formikCreate.values.couponClassification ===
                        "NewAccount" ||
                      formikCreate.values.couponClassification ===
                        "NewAccountLifeSpan"
                    }
                    placeholder="Select coupon classification details"
                    styles={
                      formikCreate.errors.couponApplicableZone &&
                      formikCreate.touched.couponApplicableZone
                        ? reactSelectCouponError
                        : formikCreate.values.couponClassification === "" ||
                          formikCreate.values.couponClassification ===
                            "NewAccount" ||
                          formikCreate.values.couponClassification ===
                            "NewAccountLifeSpan"
                        ? reactSelectCouponDisabled
                        : reactSelectCoupon
                    }
                    name="couponApplicableZone"
                    onBlur={formikCreate.handleBlur}
                    value={mainZonelist.filter((option) => {
                      return (
                        option.value == formikCreate.values.couponApplicableZone
                      );
                    })}
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "couponApplicableZone",
                          value:
                            selectedOption.label === "All"
                              ? selectedOption.value
                              : [selectedOption.value],
                        },
                      };
                      formikCreate.handleChange(event);
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                    }}
                  />
                </div>
              </div>
              <div className="mt-3 mx-5 px-3">
                <label
                  className={
                    formikCreate.errors.couponType &&
                    formikCreate.touched.couponType
                      ? "red_color  fs_16 fw_500"
                      : "fs_16 fw_500 raven_color"
                  }
                >
                  Coupon Type*
                </label>

                <div className="">
                  <Select
                    id="couponType"
                    instanceId="couponType"
                    options={couponType}
                    isDisabled={formikCreate.values.couponClassification === ""}
                    placeholder="Select coupon classification details"
                    styles={
                      formikCreate.errors.couponType &&
                      formikCreate.touched.couponType
                        ? reactSelectCouponError
                        : formikCreate.values.couponClassification === ""
                        ? reactSelectCouponDisabled
                        : reactSelectCoupon
                    }
                    name="couponType"
                    onBlur={formikCreate.handleBlur}
                    value={couponType.filter((option) => {
                      return option.value === formikCreate.values.couponType;
                    })}
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "couponType",
                          value: selectedOption.value,
                        },
                      };
                      formikCreate.handleChange(event);
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                    }}
                  />
                </div>
              </div>
            </>

            <div className="error_mes_height">
              {formikCreate.errors.couponClassification &&
                formikCreate.touched.couponClassification && (
                  <span className="dark_red_color d-flex justify-content-center  fs_16">
                    {formikCreate.errors.couponClassification}
                  </span>
                )}
            </div>

            <div className="d-flex justify-content-center mt-2">
              <button
                type="submit"
                className="primary_bg border_radius_5px px-4 py-1 white_color"
              >
                Proceed
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateNewCouponModal;
