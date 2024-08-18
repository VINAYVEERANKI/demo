import React, { useEffect, useState } from "react";
import "../premium.css";
import Premium4Table from "./premium4Table";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  defaultPremiumFourViewAction,
  managePremiumFourAction,
  archivedPremiumFourAction,
} from "../../../redux/actions/premiumaction/defaultPremiumAction";
import errorToast from "../../utilits/errorToast";
import PremiumModule from "./PremiumModuleComponent";
import SpinnerLoading from "../../utilits/spinnerLoading";

const PremiumModule4 = ({
  type,
  action,
  bookingType,
  managePremiumType,
  premiumtype,
  reload,
  setReload,
  setStatusValue,
  loading,
  setLoading,
}) => {
  console.log(bookingType, "adsasf");
  console.log(managePremiumType, "kdsjdhsakj");
  console.log(premiumtype, "kdsjdhsakj");
  const params = useParams();
  // const action = params?.action;
  console.log(action, "action");
  console.log(params, "parsdsfsams");
  // const [isEditing, setIsEditing] = useState(false);

  const moduleList = [
    { label: "Module 1", value: "PriceModule1" },
    { label: "Module 2", value: "PriceModule2" },
  ];

  const subHeadingfunc = (label) => {
    return activeTab === label ? "moduleactive" : "moduledeactive";
  };
  const [errorMessage, setErrorMessage] = useState([]);
  const dispatch = useDispatch();
  const [premiumData4, setPremiumData4] = useState([]);
  const [premium4Module1, setPremium4Module1] = useState({
    Local: {},
    Rental: {},
    Oneway: {},
    RoundTrip: {},
  });
  const [premium4Module2, setPremium4Module2] = useState({
    Local: {},
    Rental: {},
    Oneway: {},
    RoundTrip: {},
  });

  const [activeTab, setActiveTab] = useState("PriceModule1");

  useEffect(() => {
    setActiveTab(premium4Module1?.Local?.active_pricing_module);
    setStatusValue(
      premium4Module1?.Local?.status === "Inactive" ? false : true
    );
  }, [
    premium4Module1?.Local?.active_pricing_module,
    premium4Module1?.Local?.status,
  ]);

  const [search, setSearch] = useState({ value: "" });
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (managePremiumType === "defaultPremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          defaultPremiumFourViewAction(
            {
              rideType_id: params?.ride_type_id,
            },
            onSuccess,
            onError
          )
        );
      }
    } else if (managePremiumType === "managePremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          managePremiumFourAction(
            {
              zone_id: params?.zoneId,
              ride_type_id: params?.ride_type_id,
            },
            onSuccess,
            onError
          )
        );
      }
    } else if (managePremiumType === "archivedPremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          archivedPremiumFourAction(
            {
              zone_id: params?.zoneId,
              ride_type_id: params?.ride_type_id,
            },
            onSuccess,
            onError
          )
        );
      }
    }
  }, [bookingType, reload]);
  console.log(premium4Module1, "premiumFourData");
  console.log(premium4Module2, "premiumFourData");

  const onSuccess = (data) => {
    setLoading(false);
    console.log(data, "dadadasd");

    const updatedData1 = {
      Local: {},
      Rental: {},
      Oneway: {},
      RoundTrip: {},
    };

    data?.data?.PriceModuleOne?.forEach((item) => {
      const { booking_type, ...restData } = item;
      // Create a new object that includes both data and booking_type
      const newData = { ...restData, booking_type };

      switch (booking_type) {
        case "LocalTrip":
          updatedData1.Local = newData;
          break;
        case "RentalTrip":
          updatedData1.Rental = newData;
          break;
        case "OneWayOutstation":
          updatedData1.Oneway = newData;
          break;
        case "RoundTripOutstation":
          updatedData1.RoundTrip = newData;
          break;
        default:
          // Handle any other cases if necessary
          break;
      }
    });
    setPremium4Module1(updatedData1);

    const updatedData2 = {
      Local: {},
      Rental: {},
      Oneway: {},
      RoundTrip: {},
    };

    data?.data?.PriceModuleTwo?.forEach((item) => {
      const { booking_type, ...restData } = item;
      // Create a new object that includes both data and booking_type
      const newData = { ...restData, booking_type };

      switch (booking_type) {
        case "LocalTrip":
          updatedData2.Local = newData;
          break;
        case "RentalTrip":
          updatedData2.Rental = newData;
          break;
        case "OneWayOutstation":
          updatedData2.Oneway = newData;
          break;
        case "RoundTripOutstation":
          updatedData2.RoundTrip = newData;
          break;
        default:
          // Handle any other cases if necessary
          break;
      }
    });
    setPremium4Module2(updatedData2);
    setPremiumData4(data?.data);
    // console.log(data,"data");
    setError(false);
  };
  const onError = (data) => {
    console.log("jhgjh");
    // console.log(data,"data");
    errorToast(data?.data);
    setErrorMessage(data?.data);
    setError(true);
    setLoading(false);
  };
  console.log(premium4Module1, "zkchkjxcz", bookingType);
  console.log(premium4Module2?.Local?.active_pricing_module, "zkchkjxcz");

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <SpinnerLoading />
        </div>
      ) : (
        <React.Fragment>
          <div>
            <PremiumModule
              action={action}
              premiumData={
                bookingType === "LocalTrip"
                  ? premium4Module1?.Local
                  : bookingType === "RentalTrip"
                  ? premium4Module1?.Rental
                  : bookingType === "OneWayOutstation"
                  ? premium4Module1?.Oneway
                  : bookingType === "RoundTripOutstation" &&
                    premium4Module1?.RoundTrip
              }
              params={params}
              reload={reload}
              setReload={setReload}
              premiumtype={premiumtype}
              managePremiumType={managePremiumType}
            />
          </div>
          <div className="row mt-3 g-0 ps-2">
            <div className="">
              {moduleList.map((item) => {
                return (
                  <label
                    key={item.label}
                    className={`px-5 py-2 fs_16 ${subHeadingfunc(item.value)}`}
                    onClick={() => setActiveTab(item.value)}
                  >
                    {" "}
                    {item.label}
                  </label>
                );
              })}
            </div>
            <div className="row g-0">
              {activeTab === "PriceModule1" && (
                <>
                  {bookingType === "LocalTrip" ? (
                    <Premium4Table
                      type={type}
                      params={params}
                      action={action}
                      premiumData={premium4Module1?.Local}
                      premiumtype={premiumtype}
                      bookingType={bookingType}
                      reload={reload}
                      setReload={setReload}
                      moduleType={activeTab}
                      is_editable={
                        premium4Module1?.Local?.active_pricing_module ===
                        "PriceModule1"
                          ? true
                          : false
                      }
                      managePremiumType={managePremiumType}
                    />
                  ) : bookingType === "RentalTrip" ? (
                    <Premium4Table
                      type={type}
                      params={params}
                      action={action}
                      premiumData={premium4Module1?.Rental}
                      premiumtype={premiumtype}
                      bookingType={bookingType}
                      reload={reload}
                      setReload={setReload}
                      moduleType={activeTab}
                      is_editable={
                        premium4Module1?.Rental?.active_pricing_module ===
                        "PriceModule1"
                          ? true
                          : false
                      }
                      managePremiumType={managePremiumType}
                    />
                  ) : bookingType === "OneWayOutstation" ? (
                    <Premium4Table
                      type={type}
                      params={params}
                      action={action}
                      premiumData={premium4Module1?.Oneway}
                      premiumtype={premiumtype}
                      bookingType={bookingType}
                      reload={reload}
                      setReload={setReload}
                      moduleType={activeTab}
                      is_editable={
                        premium4Module1?.Oneway?.active_pricing_module ===
                        "PriceModule1"
                          ? true
                          : false
                      }
                      managePremiumType={managePremiumType}
                    />
                  ) : bookingType === "RoundTripOutstation" ? (
                    <Premium4Table
                      type={type}
                      params={params}
                      action={action}
                      premiumData={premium4Module1?.RoundTrip}
                      premiumtype={premiumtype}
                      bookingType={bookingType}
                      reload={reload}
                      setReload={setReload}
                      moduleType={activeTab}
                      is_editable={
                        premium4Module1?.RoundTrip?.active_pricing_module ===
                        "PriceModule1"
                          ? true
                          : false
                      }
                      managePremiumType={managePremiumType}
                    />
                  ) : null}
                </>
              )}

              {activeTab === "PriceModule2" && (
                <div>
                  <>
                    {bookingType === "LocalTrip" ? (
                      <Premium4Table
                        type={type}
                        params={params}
                        action={action}
                        premiumData={premium4Module2?.Local}
                        premiumtype={premiumtype}
                        bookingType={bookingType}
                        reload={reload}
                        setReload={setReload}
                        moduleType={activeTab}
                        is_editable={
                          premium4Module2?.Local?.active_pricing_module ===
                          "PriceModule2"
                            ? true
                            : false
                        }
                        managePremiumType={managePremiumType}
                      />
                    ) : bookingType === "RentalTrip" ? (
                      <Premium4Table
                        type={type}
                        params={params}
                        action={action}
                        premiumData={premium4Module2?.Rental}
                        premiumtype={premiumtype}
                        bookingType={bookingType}
                        reload={reload}
                        setReload={setReload}
                        moduleType={activeTab}
                        is_editable={
                          premium4Module2?.Rental?.active_pricing_module ===
                          "PriceModule2"
                            ? true
                            : false
                        }
                        managePremiumType={managePremiumType}
                      />
                    ) : bookingType === "OneWayOutstation" ? (
                      <Premium4Table
                        type={type}
                        params={params}
                        action={action}
                        premiumData={premium4Module2?.Oneway}
                        premiumtype={premiumtype}
                        bookingType={bookingType}
                        reload={reload}
                        setReload={setReload}
                        moduleType={activeTab}
                        is_editable={
                          premium4Module2?.Oneway?.active_pricing_module ===
                          "PriceModule2"
                            ? true
                            : false
                        }
                        managePremiumType={managePremiumType}
                      />
                    ) : bookingType === "RoundTripOutstation" ? (
                      <Premium4Table
                        type={type}
                        params={params}
                        action={action}
                        premiumData={premium4Module2?.RoundTrip}
                        premiumtype={premiumtype}
                        bookingType={bookingType}
                        reload={reload}
                        setReload={setReload}
                        moduleType={activeTab}
                        is_editable={
                          premium4Module2?.RoundTrip?.active_pricing_module ===
                          "PriceModule2"
                            ? true
                            : false
                        }
                        managePremiumType={managePremiumType}
                      />
                    ) : null}
                  </>
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default PremiumModule4;
