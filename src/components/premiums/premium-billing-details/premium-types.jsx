import React, { useEffect, useState } from "react";
import Premium1235Table from "./premium1235Table";
import PremDueanddepoDetails from "../prem-dueanddepo-details/prem-dueanddepo-details";
import "../../premiums/premium.css";
import InnerLayout from "../../layout/innerLayout";
import { useParams } from "react-router";
import { Switch } from "@material-ui/core";
import PremiumModule4 from "./PremiumModule4";
import Subscription from "../subscriptions/subscription";
import errorToast from "../../utilits/errorToast";
import {
  defaultPremiumFiveAction,
  defaultPremiumOneAction,
  defaultPremiumThreeAction,
  defaultPremiumTwoAction,
  managePremiumFiveAction,
  managePremiumOneAction,
  managePremiumThreeAction,
  managePremiumTwoAction,
  archivedPremiumFiveAction,
  archivedPremiumOneAction,
  archivedPremiumThreeAction,
  archivedPremiumTwoAction,
} from "../../../redux/actions/premiumaction/defaultPremiumAction";
import { useDispatch } from "react-redux";
import DetailsPremiumPasswordModal from "../detailsPasswordModal";
import PremiumSetting from "../premium-setting/premium-setting";
import { formatPremiumType } from "../../helper";
const PremiumTypes = ({
  premiumtype,
  topNavbarList,
  managePremiumType,
  setPremiumSubTab,
}) => {
  console.log(premiumtype, "typsdadsadcassae");
  const premiumbillingsubhead = [
    { label: "Local", value: "LocalTrip" },
    { label: "Rental", value: "RentalTrip" },
    { label: "One-Way Trip(Outstation)", value: "OneWayOutstation" },
    { label: "Round Trip(Outstation)", value: "RoundTripOutstation" },
  ];
  // console.log(type, "type");
  const dispatch = useDispatch();
  const params = useParams();
  const action = params?.action;
  console.log(params, "dfsfsfsfds");
  const [selectedComponent, setSelectedComponent] = useState(
    "PremiumBillingDetails"
  );
  const [activeTab, setActiveTab] = useState("LocalTrip");
  console.log(activeTab, "active");
  useEffect(() => {
    setActiveTab("LocalTrip");
    setSelectedComponent("PremiumBillingDetails");
  }, [premiumtype]);

  const [editMode, setEditMode] = useState(null);
  const [reload, setReload] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMeassage, setErrorMeassage] = useState("");

  const [statusValue, setStatusValue] = useState(false);
  const [statusChangeShow, setstatusChangeShowShow] = useState(false);
  const handleStatusChangeClose = () => setstatusChangeShowShow(false);
  const handleStatusChangeShow = () => setstatusChangeShowShow(true);

  const handleLabelClick = (value) => {
    localStorage.setItem("premiumTab", value);
    setSelectedComponent(value);
  };
  const getClassName = (value) => {
    return selectedComponent === value ? "Active" : "inactive";
  };

  const subHeadingfunc = (label) => {
    return activeTab === label ? "buttonactive" : "buttoninactive";
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const [premiumData, setPremiumData] = useState({
    Local: {},
    Rental: {},
    Oneway: {},
    RoundTrip: {},
  });

  useEffect(() => {
    const premiumData = {
      zone_id: params?.zoneId,
      ride_type_id: params?.ride_type_id,
    };

    if (managePremiumType === "defaultPremium") {
      if (premiumtype === "Premium1") {
        setLoading(true);
        dispatch(
          defaultPremiumOneAction(
            {
              rideType_id: params?.ride_type_id,
            },
            onSuccess,
            onError
          )
        );
      } else if (premiumtype === "Premium2") {
        setLoading(true);
        dispatch(
          defaultPremiumTwoAction(
            {
              rideType_id: params?.ride_type_id,
            },
            onSuccess,
            onError
          )
        );
      } else if (premiumtype === "Premium3") {
        setLoading(true);
        dispatch(
          defaultPremiumThreeAction(
            {
              rideType_id: params?.ride_type_id,
            },
            onSuccess,
            onError
          )
        );
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(
          defaultPremiumFiveAction(
            {
              rideType_id: params?.ride_type_id,
            },
            onSuccess,
            onError
          )
        );
      }
    } else if (managePremiumType === "managePremium") {
      if (premiumtype === "Premium1") {
        setLoading(true);
        dispatch(managePremiumOneAction(premiumData, onSuccess, onError));
      } else if (premiumtype === "Premium2") {
        setLoading(true);
        dispatch(managePremiumTwoAction(premiumData, onSuccess, onError));
      } else if (premiumtype === "Premium3") {
        setLoading(true);
        dispatch(managePremiumThreeAction(premiumData, onSuccess, onError));
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(managePremiumFiveAction(premiumData, onSuccess, onError));
      }
    } else if (managePremiumType === "archivedPremium") {
      if (premiumtype === "Premium1") {
        setLoading(true);
        dispatch(archivedPremiumOneAction(premiumData, onSuccess, onError));
      } else if (premiumtype === "Premium2") {
        setLoading(true);
        dispatch(archivedPremiumTwoAction(premiumData, onSuccess, onError));
      } else if (premiumtype === "Premium3") {
        setLoading(true);
        dispatch(archivedPremiumThreeAction(premiumData, onSuccess, onError));
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(archivedPremiumFiveAction(premiumData, onSuccess, onError));
      }
    }
  }, [premiumtype, reload]);
  console.log(premiumData, "ffff");

  const onSuccess = (data) => {
    console.log(data, "aksjdhkdj");

    const updatedData = {
      Local: {},
      Rental: {},
      Oneway: {},
      RoundTrip: {},
    };

    data?.data?.forEach((item) => {
      const { booking_type, ...restData } = item;
      // Create a new object that includes both data and booking_type
      const newData = { ...restData, booking_type };

      switch (booking_type) {
        case "LocalTrip":
          updatedData.Local = newData;
          break;
        case "RentalTrip":
          updatedData.Rental = newData;
          break;
        case "OneWayOutstation":
          updatedData.Oneway = newData;
          break;
        case "RoundTripOutstation":
          updatedData.RoundTrip = newData;
          break;
        default:
          // Handle any other cases if necessary
          break;
      }
    });

    setPremiumData(updatedData);
    setError(false);
    setLoading(false);
  };

  const onError = (data) => {
    // console.log(data,"data");
    errorToast(data?.data);
    // setErrorMessage(data?.data);
    setError(true);
    setLoading(false);
  };

  return (
    <>
      <DetailsPremiumPasswordModal
        detailsPremiumPasswordModal={statusChangeShow}
        handleDetailsPremiumPWClose={handleStatusChangeClose}
        title={`${
          premiumtype === "Premium5"
            ? `${
                statusValue
                  ? "Are you sure you want to disable Premium-5?"
                  : "Are you sure you want to enable Premium-5?"
              }`
            : `${
                statusValue
                  ? "Are you sure you want to disable Premium-4?"
                  : "Are you sure you want to enable Premium-4?"
              }`
        }`}
        type={"statusChange"}
        premiumtype={premiumtype}
        rideTypeId={params?.ride_type_id}
        zoneId={params?.zoneId}
        managePremiumType={managePremiumType}
        statusValue={statusValue}
        setStatusValue={setStatusValue}
        reload={reload}
        setReload={setReload}
      />
      <div className="row">
        <div className=" col-7 d-flex justify-content-end pb-4">
          <span className="primarydark_color fw_600 fs_24 border-bottom-underline pb-2">
            {formatPremiumType(premiumtype)}
          </span>
        </div>
        <div className="col-4">
          {(premiumtype === "Premium5" || premiumtype === "Premium4") && (
            <div className="d-flex justify-content-end">
              <div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <div className="d-flex align-items-center me-2">
                    <span
                      className={
                        statusValue
                          ? "disabled_color fs_14 fw_600 ms-1"
                          : "green_color fs_14 fw_500 ms-1"
                      }
                    >
                      Disable
                    </span>

                    <Switch
                      onChange={handleStatusChangeShow}
                      checked={statusValue}
                      offColor="#F600003"
                      offHandleColor="#ed0b0b"
                      onColor="#70ad47"
                      onHandleColor="#00ab2e"
                      handleDiameter={25}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="none"
                      activeBoxShadow="none"
                      height={13}
                      width={43}
                      className="react-switch"
                      id="material-switch"
                    />
                    <span
                      className={
                        statusValue
                          ? "green_color fs_14 fw_500 ms-1"
                          : "disabled_color fs_14 fw_600 ms-1"
                      }
                    >
                      Enable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        {premiumtype === "Premium1" || premiumtype === "Premium2" ? (
          <div>
            <div className="gap-2">
              <div className="tab-container text-nowrap">
                {topNavbarList
                  .filter(
                    (item) =>
                      item.value === "PremiumBillingDetails" ||
                      item?.value === "PremiumSettings"
                  )
                  .map((item, index) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setPremiumSubTab(item?.value);
                        localStorage.setItem("premiumTab", item.value);
                        setSelectedComponent(item.value);
                      }}
                      className={getClassName(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
              <div>
                {/* <InnerLayout> */}

                {/* <InnerLayout
                  navigateEnable={false}
                  layoutClassname="pt-3 inner_layout_container"
                > */}
                <>
                  <div className="row">
                    {selectedComponent === "PremiumBillingDetails" && (
                      <>
                        <div className="tab-container text-nowrap">
                          {premiumbillingsubhead.map((item) => {
                            return (
                              <label
                                key={item.label}
                                className={`px-3 mt-3 pb-1  fs_16 ${subHeadingfunc(
                                  item.value
                                )}`}
                                onClick={() => setActiveTab(item.value)}
                              >
                                {" "}
                                {item.label}
                              </label>
                            );
                          })}
                        </div>
                        {activeTab === "LocalTrip" && (
                          <div>
                            <Premium1235Table
                              loading={loading}
                              setLoading={setLoading}
                              type={"defaultPremiumLocal"}
                              premiumtype={premiumtype}
                              premiumData={premiumData?.Local}
                              action={action}
                              bookingType={activeTab}
                              reload={reload}
                              setReload={setReload}
                              managePremiumType={managePremiumType}
                              setStatusValue={setStatusValue}
                            />
                          </div>
                        )}
                        {activeTab === "RentalTrip" && (
                          <div>
                            <Premium1235Table
                              loading={loading}
                              setLoading={setLoading}
                              type={"defaultPremiumRental"}
                              premiumtype={premiumtype}
                              premiumData={premiumData?.Rental}
                              action={action}
                              bookingType={activeTab}
                              reload={reload}
                              setReload={setReload}
                              managePremiumType={managePremiumType}
                              setStatusValue={setStatusValue}
                            />
                          </div>
                        )}
                        {activeTab === "OneWayOutstation" && (
                          <div>
                            <Premium1235Table
                              loading={loading}
                              setLoading={setLoading}
                              type={"defaultPremiumOneway"}
                              premiumtype={premiumtype}
                              premiumData={premiumData?.Oneway}
                              action={action}
                              bookingType={activeTab}
                              reload={reload}
                              setReload={setReload}
                              managePremiumType={managePremiumType}
                              setStatusValue={setStatusValue}
                            />
                          </div>
                        )}
                        {activeTab === "RoundTripOutstation" && (
                          <div>
                            <Premium1235Table
                              loading={loading}
                              setLoading={setLoading}
                              type={"defaultPremiumRoundtrip"}
                              premiumtype={premiumtype}
                              premiumData={premiumData?.RoundTrip}
                              action={action}
                              bookingType={activeTab}
                              reload={reload}
                              setReload={setReload}
                              managePremiumType={managePremiumType}
                              setStatusValue={setStatusValue}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* {selectedComponent === "DuesDepositDetails" && (
                      <div>
                        <PremDueanddepoDetails />
                      </div>
                    )} */}
                </>
                {/* </InnerLayout> */}
              </div>
            </div>
            {selectedComponent === "PremiumSettings" && (
              <div>
                <PremiumSetting />
              </div>
            )}
          </div>
        ) : premiumtype === "Premium3" || premiumtype === "Premium5" ? (
          <>
            <div>
              <div className="gap-2">
                <div className="tab-container text-nowrap">
                  {topNavbarList
                    ?.filter((item) =>
                      premiumtype === "Premium3"
                        ? item.value !== "Subscriptions"
                        : item
                    )
                    ?.map((item, index) => (
                      <button
                        key={item.value}
                        onClick={() => handleLabelClick(item.value)}
                        className={getClassName(item.value)}
                      >
                        {item.label}
                      </button>
                    ))}
                </div>
                <div>
                  {selectedComponent === "PremiumBillingDetails" && (
                    <InnerLayout
                      navigateEnable={false}
                      layoutClassname="pt-3 inner_layout_container"
                    >
                      <>
                        <div className="row">
                          <div className="tab-container text-nowrap">
                            {premiumbillingsubhead.map((item) => {
                              return (
                                <>
                                  <label
                                    key={item.label}
                                    className={`px-3 mt-3 pb-1  fs_16 ${subHeadingfunc(
                                      item.value
                                    )}`}
                                    onClick={() => setActiveTab(item.value)}
                                  >
                                    {" "}
                                    {item.label}
                                  </label>
                                </>
                              );
                            })}
                          </div>

                          {activeTab === "LocalTrip" && (
                            <div>
                              <Premium1235Table
                                loading={loading}
                                setLoading={setLoading}
                                type={"defaultPremiumLocal"}
                                premiumtype={premiumtype}
                                premiumData={premiumData?.Local}
                                action={action}
                                bookingType={activeTab}
                                reload={reload}
                                setReload={setReload}
                                managePremiumType={managePremiumType}
                                setStatusValue={setStatusValue}
                              />
                            </div>
                          )}
                          {activeTab === "RentalTrip" && (
                            <div>
                              <Premium1235Table
                                loading={loading}
                                setLoading={setLoading}
                                type={"defaultPremiumRental"}
                                premiumtype={premiumtype}
                                premiumData={premiumData?.Rental}
                                action={action}
                                bookingType={activeTab}
                                reload={reload}
                                setReload={setReload}
                                managePremiumType={managePremiumType}
                                setStatusValue={setStatusValue}
                              />
                            </div>
                          )}
                          {activeTab === "OneWayOutstation" && (
                            <div>
                              <Premium1235Table
                                loading={loading}
                                setLoading={setLoading}
                                type={"defaultPremiumOneway"}
                                premiumtype={premiumtype}
                                premiumData={premiumData?.Oneway}
                                action={action}
                                bookingType={activeTab}
                                reload={reload}
                                setReload={setReload}
                                managePremiumType={managePremiumType}
                                setStatusValue={setStatusValue}
                              />
                            </div>
                          )}
                          {activeTab === "RoundTripOutstation" && (
                            <div>
                              <Premium1235Table
                                loading={loading}
                                setLoading={setLoading}
                                type={"defaultPremiumRoundtrip"}
                                premiumtype={premiumtype}
                                premiumData={premiumData?.RoundTrip}
                                action={action}
                                bookingType={activeTab}
                                reload={reload}
                                setReload={setReload}
                                managePremiumType={managePremiumType}
                                setStatusValue={setStatusValue}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    </InnerLayout>
                  )}

                  {selectedComponent === "DuesDepositDetails" && (
                    <div>
                      <PremDueanddepoDetails
                        params={params}
                        premiumtype={premiumtype}
                        managePremiumType={managePremiumType}
                      />
                    </div>
                  )}

                  {selectedComponent === "PremiumSettings" && (
                    <div>
                      <PremiumSetting />
                    </div>
                  )}
                  {selectedComponent === "Subscriptions" &&
                    premiumtype === "Premium5" && (
                      <div>
                        <Subscription
                          params={params}
                          action={action}
                          managePremiumType={managePremiumType}
                          premiumtype={premiumtype}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </>
        ) : premiumtype === "Premium4" ? (
          <>
            <div>
              <div className="gap-2">
                <div className="tab-container text-nowrap">
                  {topNavbarList.map((item, index) => (
                    <button
                      key={item.value}
                      onClick={() => handleLabelClick(item.value)}
                      className={getClassName(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div>
                  {selectedComponent === "PremiumBillingDetails" && (
                    <InnerLayout
                      navigateEnable={false}
                      layoutClassname="pt-3 inner_layout_container"
                    >
                      <div className="row">
                        <div className="tab-container text-nowrap mb-3">
                          {premiumbillingsubhead.map((item) => {
                            return (
                              <>
                                <label
                                  key={item.label}
                                  className={`px-4 mt-3 pb-1  fs_16 ${subHeadingfunc(
                                    item.value
                                  )}`}
                                  onClick={() => setActiveTab(item.value)}
                                >
                                  {" "}
                                  {item.label}
                                </label>
                              </>
                            );
                          })}
                        </div>
                        {activeTab === "LocalTrip" && (
                          <div>
                            <PremiumModule4
                              loading={loading}
                              setLoading={setLoading}
                              type={"defaultPremiumLocal"}
                              action={action}
                              bookingType={activeTab}
                              managePremiumType={managePremiumType}
                              premiumtype={premiumtype}
                              reload={reload}
                              setReload={setReload}
                              setStatusValue={setStatusValue}
                            />
                          </div>
                        )}
                        {activeTab === "RentalTrip" && (
                          <div>
                            <PremiumModule4
                              loading={loading}
                              setLoading={setLoading}
                              type={"defaultPremiumRental"}
                              action={action}
                              bookingType={activeTab}
                              managePremiumType={managePremiumType}
                              premiumtype={premiumtype}
                              reload={reload}
                              setReload={setReload}
                              setStatusValue={setStatusValue}
                            />
                          </div>
                        )}
                        {activeTab === "OneWayOutstation" && (
                          <div>
                            <PremiumModule4
                              loading={loading}
                              setLoading={setLoading}
                              type={"defaultPremiumOneway"}
                              action={action}
                              bookingType={activeTab}
                              managePremiumType={managePremiumType}
                              premiumtype={premiumtype}
                              reload={reload}
                              setReload={setReload}
                              setStatusValue={setStatusValue}
                            />
                          </div>
                        )}
                        {activeTab === "RoundTripOutstation" && (
                          <div>
                            <PremiumModule4
                              loading={loading}
                              setLoading={setLoading}
                              type={"defaultPremiumRoundtrip"}
                              action={action}
                              bookingType={activeTab}
                              managePremiumType={managePremiumType}
                              premiumtype={premiumtype}
                              reload={reload}
                              setReload={setReload}
                              setStatusValue={setStatusValue}
                            />
                          </div>
                        )}
                      </div>
                    </InnerLayout>
                  )}

                  {selectedComponent === "DuesDepositDetails" && (
                    <div>
                      <PremDueanddepoDetails
                        params={params}
                        premiumtype={premiumtype}
                        managePremiumType={managePremiumType}
                      />
                    </div>
                  )}

                  {selectedComponent === "PremiumSettings" && (
                    <div>
                      <PremiumSetting />
                    </div>
                  )}

                  {selectedComponent === "Subscriptions" && (
                    <div>
                      <Subscription
                        params={params}
                        action={action}
                        managePremiumType={managePremiumType}
                        premiumtype={premiumtype}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PremiumTypes;
