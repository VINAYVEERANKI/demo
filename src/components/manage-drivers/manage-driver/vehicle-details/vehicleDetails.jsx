import React, { useEffect, useMemo, useState } from "react";
import defaultImage from "../../../../assets/images/default-image.png";
import DetailsSelectField from "../../../form/detailsSelectField";
import DetailsInputField from "../../../form/detailsInputField";
import SpinnerLoading from "../../../utilits/spinnerLoading";
import { useDispatch } from "react-redux";
import { manageDriverVehicleTypeListAction } from "../../../../redux/actions/manageDriversAction";
import Select, { components } from "react-select";
import DropDownIcon from "../../../../assets/icons/dropdown-icon";
import {
  reactSelectDriverDetails,
  reactSelectDriverDetailsDisabled,
  reactSelectDriverDetailsError,
} from "../../../mui-styles/react-styles";

const VehicleDetailsEdit = ({
  vehicleData,
  formik,
  loading,
  driverDetails,
  vehicleDetailsDisabled,
  setProfileEditDisabled,
  setVehicleEditable,
  vehicleEditable,
  dropDownValue,
  setDropDownValue,
  dropDownOpen,
  setDropDownOpen,
  dropDowRideType,
  setDropDownRideType,
  type,
  selectedRideType,
  setSelectedRideType,
  rideTypeOptions,
  filteredRideTypeOption
}) => {

  console.log(rideTypeOptions, "kajdshkada");
  console.log(filteredRideTypeOption, "kajdshkada");

  const vehicleRegYear = [
    {
      label: "2003",
      value: "2003",
    },
    {
      label: "2023",
      value: "2023",
    },
  ];
  const vehicleFuel = [
    {
      label: "petrol",
      value: "petrol",
    },
    {
      label: "diesel",
      value: "diesel",
    },
  ];
  const vehicleACNonAc = [
    {
      label: "ac",
      value: "ac",
    },
    {
      label: "nonAc",
      value: "nonAc",
    },
  ];
  const vehicleFitNess = [
    {
      label: "N/A",
      value: "N/A",
    },
    {
      label: "Yes",
      value: "Yes",
    },
    {
      label: "No",
      value: "No",
    },
  ];

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };

  const dispatch = useDispatch();
  const [vehicleModelOptions, setVehicleModelOptions] = useState([]);
  const [vehicleColorOptions, setVehicleColorOptions] = useState([]);
  const [vehicleMakeOptions, setVehicleMakeOptions] = useState([]);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  useEffect(() => {
    dispatch(
      manageDriverVehicleTypeListAction(onRideTypeSuccess, onRideTypeError)
    );
  }, []);

  const onRideTypeSuccess = (data) => {
    console.log(data, "dsfsdsasd");
    setVehicleTypeList(data?.data);
  };

  const onRideTypeError = (data) => {
    console.log(data);
  };
  useEffect(() => {
    if (vehicleTypeList?.vehicleModel) {
      const vehicleModelOptions = Object?.values(
        vehicleTypeList?.vehicleModel
      )?.map((item) => {
        return { value: item.id, label: item.vehicle_model };
      });
      setVehicleModelOptions(vehicleModelOptions);
    }
    if (vehicleTypeList?.vehicleMake) {
      const vehicleMakeOptions = Object?.values(
        vehicleTypeList?.vehicleMake
      )?.map((item) => {
        return { value: item.id, label: item.vehicle_make };
      });
      setVehicleMakeOptions(vehicleMakeOptions);
    }
    if (vehicleTypeList?.vehicleColor) {
      const vehicleColorOptions = Object?.values(
        vehicleTypeList?.vehicleColor
      )?.map((item) => {
        return { value: item.id, label: item.vehicle_color };
      });
      setVehicleColorOptions(vehicleColorOptions);
    }
  }, [vehicleTypeList]);

  const filteredVehicleMakeOptions = vehicleMakeOptions.reduce(
    (result, item) => {
      if (!result.some((obj) => obj.label === item.label)) {
        result.push(item);
      }
      return result;
    },
    []
  );

  const BookingTypeCheckbox = (e) => {
    const { checked, name } = e.target;
    const copy = [...dropDownValue];
    if (e.target.checked) {
      formik.setFieldValue("bookingType", [
        ...formik.values.bookingType,
        e.target.name,
      ]);
      copy.push(name);
      setDropDownValue(copy);
    } else {
      formik.setFieldValue(
        "bookingType",
        formik.values.bookingType.filter((item) => item !== e.target.name)
      );
      let index = dropDownValue.indexOf(name);
      if (index > -1) {
        copy.splice(index, 1);
        setDropDownValue(copy);
      }
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRideType((prevSelectedRideType) => {
        if (Array.isArray(prevSelectedRideType)) {
          return [...prevSelectedRideType, value];
        }
        return [value];
      });
    } else {
      setSelectedRideType((prevSelectedRideType) => {
        if (Array.isArray(prevSelectedRideType)) {
          return prevSelectedRideType.filter((option) => option !== value);
        }
        return [];
      });
    }

    const selectedRideTypeIds = checked
      ? [...formik.values.rideTypeApplicable, value]
      : formik.values.rideTypeApplicable.filter((option) => option !== value);

    formik.setFieldValue("rideTypeApplicable", selectedRideTypeIds);
  };

  const handleReset = () => {
    setSelectedRideType(driverDetails?.vehicle_details?.ride_type_applicable);
  };

  const [selectedVehicleMake, setSelectedVehicleMake] = useState(null);
  const filterMake = vehicleMakeOptions?.filter((item) => {
    return item.label === selectedVehicleMake?.label;
  });

  const vehicleMakeModalOption = vehicleModelOptions?.filter((option) => {
    const filter = filterMake?.find((item) => {
      return item?.value === option?.value;
    });
    return filter;
  });

  const filterMakeOption = vehicleMakeModalOption?.reduce((result, item) => {
    if (!result?.some((obj) => obj?.label === item?.label)) {
      result?.push(item);
    }
    return result;
  }, []);

  const vehicleMakeColorOption = vehicleColorOptions?.filter((option) => {
    const filter = filterMake?.find((item) => {
      return item?.value === option?.value;
    });
    return filter;
  });

  const filterColorOption = vehicleMakeColorOption?.reduce((result, item) => {
    if (!result?.some((obj) => obj?.label === item?.label)) {
      result?.push(item);
    }
    return result;
  }, []);

  console.log(driverDetails, "sdkfhkjssd");


  return (
    <div>
      <div className="d-flex justify-content-between">
        <img
          src={
            driverDetails?.vehicle_photos?.front_photo
              ? driverDetails?.vehicle_photos?.front_photo
              : defaultImage
          }
          width={100}
          height={100}
          className="border_radius"
          alt="profile pic"
        />
        {vehicleData?.state?.edit &&
        type !== "deletedDrivers" &&
        type !== "permanentlyDeletedDrivers" ? (
          <form onSubmit={formik.handleSubmit}>
            {vehicleEditable === false ? (
              <div className="me-3">
                <button
                  className={
                    vehicleDetailsDisabled
                      ? "light_grey_bg  fw_700 px-3 py-1 border_radius_5px me-2 border_none fs_14"
                      : "primary_bg white_color px-3 py-1 border_radius_5px me-2 border_none fs_14"
                  }
                  onClick={() => {
                    setVehicleEditable(!vehicleEditable);
                    setProfileEditDisabled(true);
                    setDropDownOpen(false);
                    setDropDownRideType(false);
                  }}
                  disabled={vehicleDetailsDisabled}
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="d-flex gap-3 me-3">
                <button
                  type="button"
                  className="white_bg red_color reset_btn px-3 fs_14 border_radius_5px py-1"
                  onClick={() => {
                    formik.resetForm();
                    setSelectedRideType(
                      driverDetails?.vehicle_details?.ride_type_applicable
                    );
                    setDropDownValue(
                      driverDetails?.vehicle_details?.booking_type
                    );
                  }}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setDropDownOpen(false);
                    setDropDownRideType(false);
                  }}
                  className="fs_14 border_none dark_green_bg border_radius_5px px-3  white_color py-1"
                >
                  <span>{loading ? <SpinnerLoading /> : "Save"}</span>
                </button>
              </div>
            )}
          </form>
        ) : null}
      </div>
      <div className="row mt-1">
        <div className="col-xl-4">
          {/* <DetailsSelectField
            placeholder={""}
            option={vehicleMakeOptions}
            itemName="vehicleMake"
            formikValue={formik.values.vehicleMake}
            formik={formik}
            formikError={formik.errors.vehicleMake}
            formikTouched={formik.touched.vehicleMake}
            isDisabled={vehicleEditable === false}
            label={"vehicle Make"}
            first_col="col-7"
            second_col="col-5"
          /> */}

          <div className="row my-1 gx-0 align-items-center">
            <div className={`col-7`}>
              <label
                className={`${
                  formik.errors.vehicleMake && formik.touched.vehicleMake
                    ? "fs_14 red_color fw_500"
                    : "fs_14 disabled_color fw_500"
                }`}
              >
                vehicle Make
              </label>
            </div>
            <div className={`col-5`}>
              <Select
                isDisabled={vehicleEditable === false}
                // getOptionLabel={hideOption}
                instanceId={"vehicleMake"}
                id={"vehicleMake"}
                options={filteredVehicleMakeOptions}
                // isLoading={loading}
                // placeholder={placeholder}
                // menuIsOpen={menuIsopen}
                styles={
                  formik.errors.vehicleMake && formik.touched.vehicleMake
                    ? reactSelectDriverDetailsError
                    : (vehicleEditable === false) === false
                    ? reactSelectDriverDetails
                    : reactSelectDriverDetailsDisabled
                }
                name={"vehicleMake"}
                value={filteredVehicleMakeOptions.filter((option) => {
                  return option.value === formik.values.vehicleMake;
                })}
                onChange={(selectedOption) => {
                  let event = {
                    target: {
                      name: "vehicleMake",
                      value: selectedOption.value,
                    },
                  };

                  formik.handleChange(event);
                  setSelectedVehicleMake(selectedOption);
                  formik.setFieldValue("vehicleModel", "");
                  formik.setFieldValue("vehicleColor", "");
                }}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
          {/* <DetailsSelectField
            placeholder={""}
            option={vehicleModelOptions}
            itemName="vehicleModel"
            formikValue={formik.values.vehicleModel}
            formik={formik}
            formikError={formik.errors.vehicleModel}
            formikTouched={formik.touched.vehicleModel}
            isDisabled={vehicleEditable === false}
            label={"vehicle Modal"}
            first_col="col-7"
            second_col="col-5"
          /> */}

          <div className="row my-1 gx-0 align-items-center">
            <div className={`col-7`}>
              <label
                className={`${
                  formik.errors.vehicleModel && formik.touched.vehicleModel
                    ? "fs_14 red_color fw_500"
                    : "fs_14 disabled_color fw_500"
                }`}
              >
                vehicle Modal
              </label>
            </div>
            <div className={`col-5`}>
              <Select
                isDisabled={vehicleEditable === false}
                // getOptionLabel={hideOption}`
                instanceId={"vehicleModel"}
                id={"vehicleModel"}
                options={filterMakeOption}
                // isLoading={loading}
                // placeholder={placeholder}
                // menuIsOpen={menuIsopen}
                styles={
                  formik.errors.vehicleModel && formik.touched.vehicleModel
                    ? reactSelectDriverDetailsError
                    : (vehicleEditable === false) === false
                    ? reactSelectDriverDetails
                    : reactSelectDriverDetailsDisabled
                }
                name={"vehicleModel"}
                value={vehicleModelOptions.filter((option) => {
                  return option.value === formik.values.vehicleModel;
                })}
                onChange={(selectedOption) => {
                  let event = {
                    target: {
                      name: "vehicleModel",
                      value: selectedOption.value,
                    },
                  };

                  formik.handleChange(event);
                }}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
          <DetailsSelectField
            placeholder={""}
            option={vehicleRegYear}
            itemName="vehicleRegistrationYear"
            formikValue={formik.values.vehicleRegistrationYear}
            formik={formik}
            formikError={formik.errors.vehicleRegistrationYear}
            formikTouched={formik.touched.vehicleRegistrationYear}
            isDisabled={vehicleEditable === false}
            label={"Vehicle Registration Year"}
            first_col="col-7"
            second_col="col-5"
          />

          {/* <DetailsSelectField
            placeholder={""}
            option={vehicleColorOptions}
            itemName="vehicleColor"
            formikValue={formik.values.vehicleColor}
            formik={formik}
            formikError={formik.errors.vehicleColor}
            formikTouched={formik.touched.vehicleColor}
            isDisabled={vehicleEditable === false}
            label={"Vehicle Color"}
            first_col="col-7"
            second_col="col-5"
          /> */}
          <div className="row my-1 gx-0 align-items-center">
            <div className={`col-7`}>
              <label
                className={`${
                  formik.errors.vehicleColor && formik.touched.vehicleColor
                    ? "fs_14 red_color fw_500"
                    : "fs_14 disabled_color fw_500"
                }`}
              >
                vehicle Color
              </label>
            </div>
            <div className={`col-5`}>
              <Select
                isDisabled={vehicleEditable === false}
                // getOptionLabel={hideOption}
                instanceId={"vehicleColor"}
                id={"vehicleColor"}
                options={filterColorOption}
                // isLoading={loading}
                // placeholder={placeholder}
                // menuIsOpen={menuIsopen}
                styles={
                  formik.errors.vehicleColor && formik.touched.vehicleColor
                    ? reactSelectDriverDetailsError
                    : (vehicleEditable === false) === false
                    ? reactSelectDriverDetails
                    : reactSelectDriverDetailsDisabled
                }
                name={"vehicleColor"}
                value={vehicleColorOptions.filter((option) => {
                  return option.value === formik.values.vehicleColor;
                })}
                onChange={(selectedOption) => {
                  let event = {
                    target: {
                      name: "vehicleColor",
                      value: selectedOption.value,
                    },
                  };

                  formik.handleChange(event);
                }}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <DetailsSelectField
            placeholder={""}
            option={vehicleFuel}
            itemName="vehicleFuel"
            formikValue={formik.values.vehicleFuel}
            formik={formik}
            formikError={formik.errors.vehicleFuel}
            formikTouched={formik.touched.vehicleFuel}
            isDisabled={vehicleEditable === false}
            label={"Vehicle Fuel"}
            first_col="col-7"
            second_col="col-5"
          />
          <DetailsInputField
            label={"Vehicle Registration Number"}
            formik={formik}
            itemName={"vehicleRegistrationNo"}
            inputValue={formik.values.vehicleRegistrationNo}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.vehicleRegistrationNo}
            formikTouched={formik.touched.vehicleRegistrationNo}
            disabled={vehicleEditable === false}
            placeholder=""
            first_col="col-7"
            second_col="col-5"
          />
          <DetailsSelectField
            placeholder={""}
            option={vehicleACNonAc}
            itemName="acNonAc"
            formikValue={formik.values.acNonAc}
            formik={formik}
            formikError={formik.errors.acNonAc}
            formikTouched={formik.touched.acNonAc}
            isDisabled={vehicleEditable === false}
            label={"AC/Non-AC"}
            first_col="col-7"
            second_col="col-5"
          />
          <DetailsInputField
            label={"Km During Registration"}
            formik={formik}
            itemName={"kmDuringRegistraton"}
            inputValue={formik.values.kmDuringRegistraton}
            onChangeFn={formik.handleChange}
            onBlurFn={formik.handleBlur}
            formikError={formik.errors.kmDuringRegistraton}
            formikTouched={formik.touched.kmDuringRegistraton}
            disabled={vehicleEditable === false}
            placeholder=""
            first_col="col-7"
            second_col="col-5"
          />
        </div>
        <div className="col-xl-4">
          <DetailsSelectField
            placeholder={""}
            option={vehicleFitNess}
            itemName="fitnessTestPassed"
            formikValue={formik.values.fitnessTestPassed}
            formik={formik}
            formikError={formik.errors.fitnessTestPassed}
            formikTouched={formik.touched.fitnessTestPassed}
            isDisabled={vehicleEditable === false}
            label={"Fitness Test Passed?"}
            first_col="col-xl-5 col-7"
            second_col="col-xl-7 col-5"
          />
          {/* <div className="row my-1 gx-0 align-items-center position-relative">
            <div className="col-xl-5 col-7">
              <span
                className={
                  formik.errors.names && formik.touched.names
                    ? "red_color fs_16 fw_500"
                    : "disabled_color fs_16 fw_500"
                }
              >
                Booking Types
              </span>
            </div>
            <div className="col-xl-7 col-5">
              <div
                title={dropDownValue}
                onClick={() => {
                  if (vehicleEditable === false) {
                    setDropDownOpen(false);
                  } else if (vehicleEditable) {
                    setDropDownOpen(!dropDownOpen);
                  }

                  setDropDownRideType(false);
                }}
              >
                <input
                  className={
                    vehicleEditable === false
                      ? "background_none outline_none border_none primary_color fs_16 fw_500 ps-2"
                      : formik.errors.bookingType && formik.touched.bookingType
                      ? "w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2  outline_none fs_16 p-1 primary_color fw_500"
                      : "w-100 coupon_placeholder_rideType_text pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 fw_500 registration_input primary_color white_bg"
                  }
                  value={dropDownValue}
                  disabled
                />
                {vehicleEditable === false ? null : dropDownOpen ? (
                  <div className="vehicle_details_dropdown_icon">
                    <i className="ri-arrow-up-s-fill fs_18 fw_700" />
                  </div>
                ) : (
                  <div className="vehicle_details_dropdown_icon">
                    <i className="ri-arrow-down-s-fill fs_18 fw_700" />
                  </div>
                )}
              </div>
              {dropDownOpen ? (
                <div className="dropDown_vehicleDetails_container me-2 border_radius_5px mt-1 p-1">
                  {check?.map((item, index) => (
                    <div className="mx-2 d-flex align-items-center">
                      <input
                        style={{ zoom: "1.5" }}
                        type="Checkbox"
                        id={item.name}
                        checked={dropDownValue?.includes(item.name)}
                        name={item.name}
                        onChange={(e) => BookingTypeCheckbox(e)}
                      />
                      <label
                        className="ps-2 fs_16 fw_500 primary_color"
                        htmlFor={item.name}
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                  <div className="d-flex justify-content-end align-items-center gap-3 mx-2 mt-1 mb-1">
                    <button
                      className=" disabled_color_bg border_none border_radius_5px white_color py-0 px-3 "
                      type="button"
                      onClick={() => {
                        setDropDownValue(
                          driverDetails?.vehicle_details?.booking_type
                        );
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="green_color_bg border_none border_radius_5px white_color py-0 px-3 "
                      type="button"
                      onClick={() => {
                        setDropDownOpen(false);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div> */}
          <DetailsSelectField
            placeholder={""}
            option={filteredRideTypeOption}
            itemName="rideType"
            formikValue={formik.values.rideType}
            formik={formik}
            formikError={formik.errors.rideType}
            formikTouched={formik.touched.rideType}
            isDisabled={vehicleEditable === false}
            label={"Ride Type (Default)"}
            first_col="col-xl-5 col-7"
            second_col="col-xl-7 col-5"
          />

          <div className="row my-1 gx-0 align-items-center position-relative">
            <div className="col-xl-5 col-7">
              <span
                className={
                  formik.errors.names && formik.touched.names
                    ? "red_color fs_16 fw_500"
                    : "disabled_color fs_16 fw_500"
                }
              >
                Ride Type (Applicable)
              </span>
            </div>
            <div className="col-xl-7 col-5">
              {/* <div
                title={rideTypeApplicableValue}
                onClick={() => {
                  if (vehicleEditable === false) {
                    setDropDownRideType(false);
                  } else if (vehicleEditable) {
                    setDropDownRideType(!dropDowRideType);
                  }

                  setDropDownOpen(false);
                }}
              >
                <input
                  className={
                    vehicleEditable === false
                      ? "background_none outline_none border_none primary_color fs_16 fw_500 ps-2"
                      : formik.errors.bookingType && formik.touched.bookingType
                      ? "w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2  outline_none fs_16 p-1 primary_color fw_500"
                      : "w-100 coupon_placeholder_rideType_text pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 fw_500 registration_input primary_color white_bg"
                  }
                  value={rideTypeApplicableValue}
                  disabled
                />
                {vehicleEditable === false ? null : dropDowRideType ? (
                  <div className="vehicle_details_dropdown_icon">
                    <i className="ri-arrow-up-s-fill fs_18 fw_700" />
                  </div>
                ) : (
                  <div className="vehicle_details_dropdown_icon">
                    <i className="ri-arrow-down-s-fill fs_18 fw_700" />
                  </div>
                )}
              </div>
                */}

              <div className="dropdown">
                <input
                  type="text"
                  value={selectedRideType
                    ?.map((option) => {
                      const rideTypeOption = rideTypeOptions?.find(
                        (item) => item.value === option
                      );
                      return rideTypeOption ? rideTypeOption.label : "";
                    })
                    .filter((label) => label !== "")
                    .join(", ")}
                  readOnly
                  placeholder="Selected values"
                  onClick={() => {
                    if (vehicleEditable === false) {
                      setDropDownRideType(false);
                    } else if (vehicleEditable) {
                      setDropDownRideType(!dropDowRideType);
                    }
                    setDropDownOpen(false);
                  }}
                  className={
                    vehicleEditable === false
                      ? "background_none outline_none border_none primary_color fs_16 fw_500 ps-2"
                      : formik.errors.rideTypeApplicable &&
                        formik.touched.rideTypeApplicable
                      ? "w-100 coupon_placeholder_rideType_text error_border pe-4 ps-2  outline_none fs_16 p-1 primary_color fw_500"
                      : "w-100 coupon_placeholder_rideType_text pe-4 ps-2 border_radius_3px outline_none fs_16 p-1 fw_500 registration_input primary_color white_bg"
                  }
                />

                {dropDowRideType ? (
                  <div className="dropDown_vehicleDetails_container  border_radius_5px mt-1 p-1 w-100">
                    {filteredRideTypeOption?.map((option) => (
                      <div key={option.value} className="d-flex gap-2 ps-2">
                        <input
                          type="checkbox"
                          value={option.value}
                          name="rideTypeApplicable"
                          checked={selectedRideType?.includes(option.value)}
                          onChange={handleCheckboxChange}
                          id={option.value}
                        />
                        <label htmlFor={option.value}>{option.label}</label>
                      </div>
                    ))}
                    <div className="d-flex justify-content-end gap-3 pe-3 py-2">
                      <button
                        onClick={() => setDropDownRideType(!dropDowRideType)}
                        className="green_color_bg border_none border_radius_5px white_color py-0 px-3 "
                      >
                        Apply
                      </button>
                      <button
                        onClick={handleReset}
                        className=" disabled_color_bg border_none border_radius_5px white_color py-0 px-3 "
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsEdit;

export const check = [
  { id: 1, name: "Local" },
  { id: 2, name: `Rental` },
  { id: 3, name: "Outstation Oneway" },
  { id: 3, name: "Outstation Round" },
];

// export const RideTypeApplicable = [
//   { id: 1, name: "Bike" },
//   { id: 2, name: `Mini` },
//   { id: 3, name: "Sedan" },
//   { id: 3, name: "Premium Sedan" },
//   { id: 3, name: "Luxury" },
// ];
