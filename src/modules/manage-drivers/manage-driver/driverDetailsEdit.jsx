import React, { useEffect, useState } from "react";
import { BalanceStatus } from "../../../components/helper";
import DriversDocumentsTable from "../../../components/manage-drivers/manageDriversTable/driversDocumentsTable";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styles from "./manage-driver.module.css";
import DriverProfileTop from "../../../components/manage-drivers/driverProfileTop";
import InnerLayout from "../../../components/layout/innerLayout";
import UpdateSuccessModal from "../../../components/manage-drivers/manageDriverModals/updateSuccessModal";
import DriverBookingHistoryTable from "../../../components/similarTables/driverBookingHistoryTable";
import DriverPremiumHistoryTable from "../../../components/similarTables/driverPremiumHistoryTable";
import driverImage from "../../../assets/images/profileimage.png";
import { reactSelectVehicleDetails } from "../../../components/mui-styles/react-styles";
import DropDownIcon from "../../../assets/icons/dropdown-icon";
import Select, { components } from "react-select";
import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import * as driverAction from "../../../redux/actions/manageDriversAction";
import MultiSelectField from "../../../components/form/multiSelectField";
import VehicleDocumentsTable from "../../../components/manage-drivers/manageDriversTable/vehicleDocumentsTable";
import { useDispatch } from "react-redux";
import errorToast from "../../../components/utilits/errorToast";
import { Form } from "react-bootstrap";
import moment from "moment";
import successToast from "../../../components/utilits/successToast";
import LoadingSpinnerTable from "../../../components/utilits/loadingSpinnerTable";

const DriverDetailsFindOneEdit = ({ type, profileData }) => {
  const statusList = [];
  const params = useParams();
  const dispatch = useDispatch();
  const [updateSuccessModal, setUpdateSuccessModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });

  const [driverTable, setDriverTable] = useState(false);
  var activeTab = "";
  if (localStorage.getItem("manageDriverActiveTab"))
    activeTab = localStorage.getItem("manageDriverActiveTab");
  else activeTab = "Bookings History";

  const [driverTab, setDriverTab] = useState(activeTab);
  const [selectedOption, setSelectedOption] = useState(null);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [mainZonelist, setMainZonelist] = useState([]);
  const [vehicleModelList, setvehicleModelList] = useState([]);
  const [vehicleColorList, setvehicleColorList] = useState([]);
  const [rideTypeList, setRideTypeList] = useState([]);

  useEffect(() => {
    dispatch(
      driverAction.manageDriverRideTypeListAction(
        params?.id,
        onRideTypeSuccess,
        onRideTypeError
      )
    );
    dispatch(
      driverAction.manageDriverVehicleTypeListAction(
        params?.id,
        onVehicleTypeSuccess,
        onVehicleTypeError
      )
    );
    dispatch(
      driverAction.manageDriverMainZoneListAction(onFetchSuccess, onFetchError)
    );
  }, []);

  const onRideTypeSuccess = (data) => {
    let transformedRideArray = data?.data?.map((obj) => {
      return {
        label: obj.ride_type,
        value: obj.id,
      };
    });
    setRideTypeList(transformedRideArray);
  };

  const onRideTypeError = (data) => {};

  const onFetchSuccess = (data) => {
    setMainZonelist(data?.data);
  };

  const onFetchError = (data) => {};

  const onVehicleTypeSuccess = (data) => {
    let transformedArray = data?.data.map((obj) => {
      return {
        label: obj.vehicle_make,
        value: obj.vehicle_make,
        id: obj.id,
      };
    });
    setVehicleTypeList(transformedArray);
  };
  const onVehicleTypeError = (data) => {};
  const zoneOption = mainZonelist
    ? Object.values(mainZonelist)?.map((item) => {
        return { value: item?.id, label: item?.zone_name };
      })
    : null;

  const getModalColorFnc = (id) => {
    dispatch(
      driverAction.VehicleTypeModelColorListAction(
        id,
        onModalSuccess,
        onModalError
      )
    );
  };
  const onModalSuccess = (data) => {
    let transformedModelArray = data?.data?.vehicleModel?.map((obj) => {
      return {
        label: obj.vehicle_model,
        value: obj.vehicle_model,
        id: obj.id,
      };
    });
    setvehicleModelList(transformedModelArray);
    let transformedColorArray = data?.data?.vehicleColor?.map((obj) => {
      return {
        label: obj.vehicle_color,
        value: obj.vehicle_color,
        id: obj.id,
      };
    });
    setvehicleColorList(transformedColorArray);
  };
  const onModalError = () => {};

  const currentYear = new Date().getFullYear();
  const pastYears = currentYear - 20;
  const pastYearsList = [];
  for (let year = currentYear; year >= pastYears; year--) {
    pastYearsList.push({ label: year.toString(), value: year.toString() });
  }

  const vehicleFuelOptions = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
  ];
  const vehicleACOptions = [
    { value: "yes", label: "AC" },
    { value: "no", label: "Non-AC" },
  ];
  const fitnessTestPassedOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "N/A", label: "N/A" },
  ];
  const rideTypeOptions = [
    { value: "premium_sedan", label: "Premium Sedan" },
    { value: "bike", label: "bike" },
    { value: "auto", label: "Auto" },
    { value: "mini", label: "Mini" },
    { value: "SUV", label: "SUV" },
  ];

  const [driverData, setDriverData] = useState({
    driverDetails: {},
    rideHistoryTable: {},
    premiumHistory: {},
  });

  const driverTabData = [
    "Bookings History",
    "Premium History",
    "Driver Details",
    "Vehicle Details",
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: driverData?.driverDetails?.first_name,
      registered_zone: driverData?.driverDetails?.registered_zone_name?.id,
      vehicle_make:
        driverData?.driverDetails?.vehicle_details?.vehicle_make ?? "",
      vehicle_model:
        driverData?.driverDetails?.vehicle_details?.vehicle_model ?? "",
      vehicle_registration_year:
        driverData?.driverDetails?.vehicle_details?.vehicle_registration_year ??
        "",
      vehicle_registration_number:
        driverData?.driverDetails?.vehicle_details
          ?.vehicle_registration_number ?? "",
      vehicle_colour:
        driverData?.driverDetails?.vehicle_details?.vehicle_colour ?? "",
      vehicle_fuel:
        driverData?.driverDetails?.vehicle_details?.vehicle_fuel ?? "",
      ac: driverData?.driverDetails?.vehicle_details?.ac ?? "",
      fitness_test_passed:
        driverData?.driverDetails?.vehicle_details?.fitness_test_passed ?? "",
      km_during_registration:
        driverData?.driverDetails?.vehicle_details?.km_during_registration ??
        "200",
      ride_type_defualt:
        driverData.driverDetails?.vehicle_details?.ride_type_defualt ?? "",
      ride_type_applicable:
        driverData.driverDetails?.vehicle_details?.ride_type_applicable ?? "",
    },

    onSubmit: (values) => {
      setIsEditing(false);
      handleDetailsPremiumPasswordModal();
    },
  });

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "--") if (page > 0) setPage((prev) => prev - 1);
  }

  useEffect(() => {
    if (type === "manageDrivers") {
      setLoading(true);
      dispatch(
        driverAction.driverViewAction(
          {
            driver_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
            sort_by_ride_history: "",
            sort_order_ride_history: "",
            sort_by_premium_history: "",
            sort_order_premium_history: "",
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "rejectApplication") {
      setLoading(true);
      dispatch(
        rejectedApplicantViewAction(
          {
            driver_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "blockedDrivers") {
      setLoading(true);
      dispatch(
        blockedApplicantViewAction(
          {
            driver_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "bannedApplication") {
      setLoading(true);
      dispatch(
        bannedApplicantViewAction(
          {
            driver_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "expiredDocuments") {
      setLoading(true);
      dispatch(
        expiredApplicantViewAction(
          {
            driver_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "pendingRideHistory") {
      setLoading(true);
      dispatch(
        pendingApplicantViewAction(
          {
            driver_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "deletedDriverRideHistory") {
      setLoading(true);
      dispatch(
        deleteDriverViewAction(
          {
            driver_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "permanentlyDeletedDriverRideHistory") {
      setLoading(true);
      dispatch(
        permdeleteDriverViewAction(
          {
            driver_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, driverTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setError(false);
    setDriverData({
      driverDetails: data?.data?.Driver_Profile,
      rideHistoryTable: data?.data?.Ride_History,
      premiumHistory: data?.data?.Premium_History,
    });
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
  };

  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
  };

  const driverDetailsInitialValues = {
    first_name: driverData?.driverDetails?.first_name,
    last_name: driverData?.driverDetails?.last_name,
    dob: moment(driverData?.driverDetails?.dob, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    ),
    registered_zone: {
      label: driverData?.driverDetails?.registered_zone_name?.zone_name,
      value: driverData?.driverDetails?.registered_zone_name?.id,
    },
    phone_number: driverData?.driverDetails?.phone_number,
    email: driverData?.driverDetails?.email,
    driver_type: driverData?.driverDetails?.driver_type,
    admin_comments: driverData?.driverDetails?.admin_comments,

    vehicle_make: driverData.driverDetails?.vehicle_details?.vehicle_make,
    vehicle_model: driverData.driverDetails?.vehicle_details?.vehicle_model,
    vehicle_registration_year:
      driverData.driverDetails?.vehicle_details?.vehicle_registration_year,
    vehicle_colour: driverData.driverDetails?.vehicle_details?.vehicle_colour,
    vehicle_fuel: driverData.driverDetails?.vehicle_details?.vehicle_fuel,
    vehicle_registration_number:
      driverData.driverDetails?.vehicle_details?.vehicle_registration_number,
    ac: driverData.driverDetails?.vehicle_details?.ac,
    km_during_registration:
      driverData.driverDetails?.vehicle_details?.km_during_registration,
    ride_type_defualt:
      driverData.driverDetails?.vehicle_details?.ride_type_defualt,
    fitness_test_passed:
      driverData.driverDetails?.vehicle_details?.fitness_test_passed,
    // booking_type: driverData.driverDetails?.vehicle_details?.bookingType,
    ride_type_applicable:
      driverData.driverDetails?.vehicle_details?.ride_type_applicable,
  };

  useEffect(() => {
    if (formik?.values?.vehicle_make) {
      getModalColorFnc(driverData?.driverDetails?.vehicle_id);
    }
  }, [driverData, formik?.values?.vehicle_make]);

  const onSubmitFnc = (type, values) => {
    if (type === "Driver Details") {
      setLoading(true);
      dispatch(
        driverAction.driverProfileEditAction(
          driverData?.driverDetails?.id,
          {
            first_name: values?.first_name,
            last_name: values?.last_name,
            gender: values?.gender,
            dob: values?.dob,
            email: values?.email,
            registered_zone: formik?.values?.registered_zone ?? "",
            phone_number: values?.phone_number,
            driver_type: values?.driver_type,
            admin_comments: values?.admin_comments,
          },
          onDriverSuccess,
          onDriverError
        )
      );
    } else if (type === "Vehicle Details") {
      setLoading(true);
      dispatch(
        driverAction.driverVehicleEditAction(
          driverData?.driverDetails?.id,
          {
            vehicle_make: formik?.values?.vehicle_make,
            vehicle_model: formik?.values?.vehicle_model,
            vehicle_registration_year:
              formik?.values?.vehicle_registration_year,
            vehicle_colour: formik?.values?.vehicle_colour,
            vehicle_fuel: formik?.values?.vehicle_fuel,
            vehicle_registration_number: values?.vehicle_registration_number,
            ac: formik?.values?.ac,
            km_during_registration: values?.km_during_registration,
            ride_type_defualt: formik?.values?.ride_type_defualt,
            fitness_test_passed: formik?.values?.fitness_test_passed,
            ride_type_applicable: formik?.values?.ride_type_applicable,
          },
          onDriverSuccess,
          onDriverError
        )
      );
    }
  };

  const onDriverSuccess = (data) => {
    setLoading(false);
    successToast(data?.message);
  };
  const onDriverError = (data) => {
    setLoading(false);
    errorToast(data?.message);
  };

  return (
    <InnerLayout
      mainHeading={` Driver ID - ${
        driverData?.driverDetails?.driver_id2
          ? driverData?.driverDetails?.driver_id2
          : "--"
      }`}
      statusList={statusList}
      backBtnClassName="ms-3"
    >
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <DriverProfileTop
            profileData={profileData}
            driverData={driverData}
            driverTable={driverTable}
            setDriverTable={setDriverTable}
            type={type}
          />

          <div className="d-flex gap-4">
            {driverTabData?.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setDriverTab(item);
                    localStorage.setItem("manageDriverActiveTab", item);
                  }}
                  key={index}
                  className={`mb-3 fw_500 py-2 cursor_pointer ${
                    item === driverTab
                      ? `light_blue_color border_bottom_blue`
                      : `secondary_color`
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div
            className={`${
              (driverTab === "Driver Details" ||
                driverTab === "Vehicle Details") &&
              `p-3`
            } rounded-2`}
            style={{
              boxShadow:
                (driverTab === "Driver Details" ||
                  driverTab === "Vehicle Details") &&
                "0px 3px 6px 4px #00000029",
            }}
          >
            <Formik
              initialValues={driverDetailsInitialValues}
              enableReinitialize={true}
            >
              {({ resetForm, values, errors }) => {
                return (
                  <Form>
                    {driverTab === "Bookings History" ? (
                      <DriverBookingHistoryTable
                        rideData={driverData?.rideHistoryTable}
                        loading={loading}
                        error={error}
                        handlePagination={handlePagination}
                        page={page}
                        pageData={pageData}
                      />
                    ) : driverTab === "Premium History" ? (
                      <DriverPremiumHistoryTable
                        driverPremiumData={driverData?.premiumHistory}
                        loading={loading}
                        error={error}
                        handlePagination={handlePagination}
                        page={page}
                        pageData={pageData}
                      />
                    ) : driverTab === "Driver Details" ? (
                      <table className="d-flex col-12 fs_13 gap-3">
                        <tbody itemScope="col" className="col-3">
                          <tr>
                            <td className={`disabled_color py-1`}>
                              First Name
                            </td>
                            <td>
                              <Field
                                className={`border_68728480 outline_none rounded-1`}
                                style={{
                                  width: "fit-content",
                                  minWidth: "50px",
                                }}
                                type="text"
                                name="first_name"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>Last Name</td>
                            <td>
                              <Field
                                className={`border_68728480 outline_none rounded-1`}
                                style={{
                                  width: "fit-content",
                                  minWidth: "50px",
                                }}
                                type="text"
                                name="last_name"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>Gender</td>
                            <td>{driverData?.driverDetails?.gender ?? "--"}</td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>DOB</td>
                            <td>
                              <Field
                                className={`border_68728480 outline_none rounded-1 w-100`}
                                type="date"
                                name="dob"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Referral Code
                            </td>
                            <td>
                              {driverData?.driverDetails?.referral_code ?? "--"}
                            </td>
                          </tr>
                          <tr className="w-100">
                            <td className={`disabled_color py-1`}>
                              Registered Zone
                            </td>
                            <td>
                              <Select
                                instanceId={"registerd_zone"}
                                id={"registered_zone"}
                                options={zoneOption}
                                isLoading={loading}
                                placeholder={"Select..."}
                                styles={reactSelectVehicleDetails}
                                name={"registered_zone"}
                                value={zoneOption.filter((zoneOption) => {
                                  return (
                                    zoneOption.value ===
                                    formik.values.registered_zone
                                  );
                                })}
                                onChange={(selectedOption) => {
                                  let event = {
                                    target: {
                                      name: "registered_zone",
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
                            </td>
                          </tr>
                        </tbody>
                        <tbody itemScope="col" className="col-3">
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Phone Number
                            </td>
                            <td>
                              <Field
                                className={`border_68728480 outline_none rounded-1`}
                                style={{
                                  width: "fit-content",
                                  minWidth: "50px",
                                }}
                                type="text"
                                name={`phone_number`}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>Email ID</td>
                            <td>
                              <Field
                                className={`border_68728480 outline_none rounded-1`}
                                style={{
                                  width: "fit-content",
                                  minWidth: "50px",
                                }}
                                type="text"
                                name={`email`}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Current Balance
                            </td>
                            <td
                              className={`${BalanceStatus(
                                driverData?.driverDetails?.current_balance
                              )} `}
                            >
                              ₹{driverData?.driverDetails?.current_balance}
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Driver Type
                            </td>
                            <td>
                              <Field
                                className={`border_68728480 outline_none rounded-1`}
                                style={{
                                  width: "fit-content",
                                  minWidth: "50px",
                                }}
                                type="text"
                                name="driver_type"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Total Rides Cancelled
                            </td>
                            <td>
                              {driverData?.driverDetails
                                ?.rides_cancelled_count ?? "--"}
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Total Rides Denied
                            </td>
                            <td>
                              {driverData?.driverDetails?.rides_denied_count ??
                                "--"}
                            </td>
                          </tr>
                        </tbody>
                        <tbody itemScope="col" className="col-6">
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Account Blocked Count
                            </td>
                            <td>
                              {driverData?.driverDetails?.blocked_count ?? "--"}
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Application Rejected Count
                            </td>
                            <td>
                              {driverData?.driverDetails
                                ?.application_rejected_count ?? "--"}
                            </td>
                          </tr>
                          <tr>
                            <td className={`disabled_color py-1`}>
                              Admin Comments
                            </td>
                            <td>
                              <Field
                                className={`border_68728480 rounded-1 outline_none description_area`}
                                style={{ minWidth: "13rem" }}
                                rows={3}
                                type="textarea"
                                name="admin_comments"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      driverTab === "Vehicle Details" && (
                        <form>
                          <table className="d-flex col-12 fs_13 gap-3">
                            <tbody
                              itemScope="col"
                              className={`d-flex align-items-center col-1`}
                            >
                              <img src={driverImage} alt="image" width={80} />
                            </tbody>
                            <tbody itemScope="col" className="col-3">
                              <tr>
                                <td className={`disabled_color  py-1`}>
                                  Vehicle Make
                                </td>
                                <td className={`primary_color`}>
                                  <Select
                                    aria-label="Default select example"
                                    id="vehicle_make"
                                    name="vehicle_make"
                                    className={`selectfieldVehicleDetailsstyle outline_none ${
                                      formik.touched.vehicle_make &&
                                      formik.errors.vehicle_make
                                        ? "border-redss outline_none"
                                        : ""
                                    }`}
                                    isDisabled={
                                      !driverData?.driverDetails
                                        ?.registered_zone_name?.zone_name
                                    }
                                    styles={reactSelectVehicleDetails}
                                    defaultValue={selectedOption}
                                    onChange={(e) => {
                                      let event = {
                                        target: {
                                          name: "vehicle_make",
                                          value: e.value,
                                        },
                                      };
                                      formik.handleChange(event);
                                      getModalColorFnc(e.id);
                                      setSelectedOption(e.value);
                                      // handleshowhide(e);
                                    }}
                                    value={vehicleTypeList?.filter((option) => {
                                      return (
                                        option.value ===
                                        formik.values.vehicle_make
                                      );
                                    })}
                                    options={vehicleTypeList}
                                    components={{
                                      DropdownIndicator,
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={`disabled_color  py-1`}>
                                  Vehicle Model
                                </td>
                                <td className={`primary_color`}>
                                  <Select
                                    aria-label="Default select example"
                                    id="vehicle_model"
                                    name="vehicle_model"
                                    className={`selectfieldVehicleDetailsstyle outline_none ${
                                      formik.touched.vehicle_model &&
                                      formik.errors.vehicle_model
                                        ? "border-redss outline_none"
                                        : ""
                                    }`}
                                    styles={reactSelectVehicleDetails}
                                    defaultValue={selectedOption}
                                    isDisabled={
                                      formik?.values?.vehicleMake === ""
                                    }
                                    onChange={(e) => {
                                      let event = {
                                        target: {
                                          name: "vehicle_model",
                                          value: e.value,
                                        },
                                      };
                                      formik.handleChange(event);

                                      setSelectedOption(e.value);
                                      // handleshowhide(e);
                                    }}
                                    value={vehicleModelList?.filter(
                                      (option) => {
                                        return (
                                          option.value ===
                                          formik.values.vehicle_model
                                        );
                                      }
                                    )}
                                    options={vehicleModelList}
                                    components={{
                                      DropdownIndicator,
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={`disabled_color  py-1`}>
                                  Vehicle Registration Year
                                </td>
                                <td className={`primary_color`}>
                                  <Select
                                    aria-label="Default select example"
                                    id="vehicle_registration_year"
                                    name="vehicle_registration_year"
                                    className={`selectfieldVehicleDetailsstyle outline_none ${
                                      formik.touched
                                        .vehicle_registration_year &&
                                      formik.errors.vehicle_registration_year
                                        ? "border-redss outline_none"
                                        : ""
                                    }`}
                                    styles={reactSelectVehicleDetails}
                                    defaultValue={selectedOption}
                                    isDisabled={
                                      formik?.values?.vehicle_model === ""
                                    }
                                    onChange={(e) => {
                                      let event = {
                                        target: {
                                          name: "vehicle_registration_year",
                                          value: e.value,
                                        },
                                      };
                                      formik.handleChange(event);

                                      setSelectedOption(e.value);
                                      // handleshowhide(e);
                                    }}
                                    value={pastYearsList?.filter((option) => {
                                      return (
                                        option.value ===
                                        formik.values.vehicle_registration_year
                                      );
                                    })}
                                    options={pastYearsList}
                                    components={{
                                      DropdownIndicator,
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={`disabled_color  py-1`}>
                                  Vehicle Color
                                </td>
                                <td className={`primary_color`}>
                                  <Select
                                    aria-label="Default select example"
                                    id="vehicle_colour"
                                    name="vehicle_colour"
                                    className={`selectfieldVehicleDetailsstyle outline_none ${
                                      formik.touched.vehicle_colour &&
                                      formik.errors.vehicle_colour
                                        ? "border-redss outline_none"
                                        : ""
                                    }`}
                                    styles={reactSelectVehicleDetails}
                                    defaultValue={selectedOption}
                                    isDisabled={
                                      formik?.values?.vehicle_model === ""
                                    }
                                    onChange={(e) => {
                                      let event = {
                                        target: {
                                          name: "vehicle_colour",
                                          value: e.value,
                                        },
                                      };
                                      formik.handleChange(event);

                                      setSelectedOption(e.value);
                                      // handleshowhide(e);
                                    }}
                                    value={vehicleColorList?.filter(
                                      (option) => {
                                        return (
                                          option.value ===
                                          formik.values.vehicle_colour
                                        );
                                      }
                                    )}
                                    options={vehicleColorList}
                                    components={{
                                      DropdownIndicator,
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </td>
                              </tr>
                            </tbody>
                            <tbody itemScope="col" className="col-3">
                              <tr>
                                <td className={`disabled_color py-1`}>
                                  Vehicle Fuel
                                </td>
                                <td className={`primary_color`}>
                                  <Select
                                    aria-label="Default select example"
                                    id="vehicle_fuel"
                                    name="vehicle_fuel"
                                    className={`selectfieldVehicleDetailsstyle outline_none ${
                                      formik.touched.vehicle_fuel &&
                                      formik.errors.vehicle_fuel
                                        ? "border-redss outline_none"
                                        : ""
                                    }`}
                                    styles={reactSelectVehicleDetails}
                                    defaultValue={selectedOption}
                                    onChange={(e) => {
                                      let event = {
                                        target: {
                                          name: "vehicle_fuel",
                                          value: e.value,
                                        },
                                      };
                                      formik.handleChange(event);

                                      setSelectedOption(e.value);
                                      // handleshowhide(e);
                                    }}
                                    value={vehicleFuelOptions?.filter(
                                      (option) => {
                                        return (
                                          option.value ===
                                          formik.values.vehicle_fuel
                                        );
                                      }
                                    )}
                                    options={vehicleFuelOptions}
                                    components={{
                                      DropdownIndicator,
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={`disabled_color py-1`}>
                                  Vehicle Registration Number
                                </td>
                                <td className={`primary_color`}>
                                  <Field
                                    className={`border_68728480 outline_none rounded-1 p-1`}
                                    style={{
                                      width: "fit-content",
                                      minWidth: "50px",
                                    }}
                                    type="text"
                                    name="vehicle_registration_number"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={`disabled_color py-1`}>
                                  AC/Non-AC
                                </td>
                                <td className={`primary_color`}>
                                  <Select
                                    aria-label="Default select example"
                                    id="ac"
                                    name="ac"
                                    className={`selectfieldVehicleDetailsstyle outline_none ${
                                      formik.touched.ac && formik.errors.ac
                                        ? "border-redss outline_none"
                                        : ""
                                    }`}
                                    styles={reactSelectVehicleDetails}
                                    defaultValue={selectedOption}
                                    onChange={(e) => {
                                      let event = {
                                        target: {
                                          name: "ac",
                                          value: e.value,
                                        },
                                      };
                                      formik.handleChange(event);

                                      setSelectedOption(e.value);
                                      // handleshowhide(e);
                                    }}
                                    value={vehicleACOptions?.filter(
                                      (option) => {
                                        return (
                                          option.value === formik.values.ac
                                        );
                                      }
                                    )}
                                    options={vehicleACOptions}
                                    components={{
                                      DropdownIndicator,
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={`disabled_color py-1`}>
                                  Km During Registration
                                </td>
                                <td className={`primary_color`}>
                                  <Field
                                    className={`border_68728480 outline_none rounded-1 p-1`}
                                    style={{
                                      width: "fit-content",
                                      minWidth: "50px",
                                    }}
                                    type="text"
                                    name="km_during_registration"
                                  />
                                </td>
                              </tr>
                            </tbody>
                            <tbody itemScope="col" className="col-4">
                              <tr>
                                <td className={`disabled_color py-1`}>
                                  Fitness Test Passed?
                                </td>
                                <td className={`primary_color`}>
                                  <Select
                                    aria-label="Default select example"
                                    id="fitness_test_passed"
                                    name="fitness_test_passed"
                                    className={`selectfieldVehicleDetailsstyle outline_none ${
                                      formik.touched.fitness_test_passed &&
                                      formik.errors.fitness_test_passed
                                        ? "border-redss outline_none"
                                        : ""
                                    }`}
                                    styles={reactSelectVehicleDetails}
                                    defaultValue={selectedOption}
                                    onChange={(e) => {
                                      let event = {
                                        target: {
                                          name: "fitness_test_passed",
                                          value: e.value,
                                        },
                                      };
                                      formik.handleChange(event);

                                      setSelectedOption(e.value);
                                      // handleshowhide(e);
                                    }}
                                    value={fitnessTestPassedOptions?.filter(
                                      (option) => {
                                        return (
                                          option.value ===
                                          formik.values.fitness_test_passed
                                        );
                                      }
                                    )}
                                    options={fitnessTestPassedOptions}
                                    components={{
                                      DropdownIndicator,
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={`disabled_color py-1`}>
                                  Ride Type (Default)
                                </td>
                                <td className={`primary_color`}>
                                  <Select
                                    aria-label="Default select example"
                                    id="ride_type_defualt"
                                    name="ride_type_defualt"
                                    className={`selectfieldVehicleDetailsstyle outline_none ${
                                      formik.touched.ride_type_defualt &&
                                      formik.errors.ride_type_defualt
                                        ? "border-redss outline_none"
                                        : ""
                                    }`}
                                    styles={reactSelectVehicleDetails}
                                    onChange={(e) => {
                                      let event = {
                                        target: {
                                          name: "ride_type_defualt",
                                          value: e.value,
                                        },
                                      };
                                      formik.handleChange(event);

                                      setSelectedOption(e.value);
                                      // handleshowhide(e);
                                    }}
                                    value={rideTypeList?.filter((option) => {
                                      return (
                                        option.value ===
                                        formik.values.ride_type_defualt
                                      );
                                    })}
                                    options={rideTypeList}
                                    components={{
                                      DropdownIndicator,
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className={`disabled_color py-1`}>
                                  Ride Type (Applicable)
                                </td>
                                <td className={`primary_color`}>
                                  {/* Bike, Auto, Mini, Sedan, SUV, Premium-Sedan, Kaali-Peeli */}

                                  <MultiSelectField
                                    driver={true}
                                    label={false}
                                    placeholder="Select..."
                                    options={rideTypeList}
                                    itemName="ride_type_applicable"
                                    formikValue={
                                      formik.values.ride_type_applicable
                                    }
                                    formik={formik}
                                    formikError={
                                      formik.errors.ride_type_applicable
                                    }
                                    formikTouched={
                                      formik.touched.ride_type_applicable
                                    }
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </form>
                      )
                    )}

                    {driverTab === "Driver Details" ? (
                      <DriversDocumentsTable driverData={driverData} />
                    ) : (
                      driverTab === "Vehicle Details" && (
                        <VehicleDocumentsTable
                          driverData={driverData?.driverDetails}
                        />
                      )
                    )}
                    {(driverTab === "Driver Details" ||
                      driverTab === "Vehicle Details") && (
                      <div
                        className={`w-100 d-flex gap-4 align-items-center justify-content-end py-3`}
                      >
                        <button
                          style={{ height: "35px", maxWidth: "120px" }}
                          type="button"
                          onClick={() => {
                            formik.resetForm(), resetForm();
                          }}
                          className={`px-4 py-1 w-100 rounded-2 bg white secondary_color ${styles.border_687284}`}
                        >
                          Reset
                        </button>
                        <NavLink
                          style={{
                            height: "35px",
                            maxWidth: "120px",
                            textDecoration: "none",
                          }}
                          className={`px-4 py-1 w-100 rounded-2 bg white red_color text-center ${styles.border_red}`}
                          to={`/manage-drivers/driver-rideHistory/${driverData?.driverDetails?.id}`}
                          state={{
                            id: driverData?.driverDetails?.id,
                            edit: true,
                          }}
                        >
                          Cancel
                        </NavLink>
                        <button
                          onClick={() => onSubmitFnc(driverTab, values)}
                          type="button"
                          style={{ height: "35px", maxWidth: "120px" }}
                          className={`green_color_bg w-100 text-white border-0 py-1 px-4 rounded-2`}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </Form>
                );
              }}
            </Formik>
          </div>
          <UpdateSuccessModal
            tab={driverTab}
            show={updateSuccessModal}
            okayFn={() => navigate("/manage-drivers/driver-rideHistory/01")}
            onHide={() => setUpdateSuccessModal(false)}
          />
        </>
      )}
    </InnerLayout>
  );
};

export default DriverDetailsFindOneEdit;
