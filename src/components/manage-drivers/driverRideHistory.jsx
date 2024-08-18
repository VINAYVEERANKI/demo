import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import * as driverAction from "../../redux/actions/manageDriversAction";
import errorToast from "../utilits/errorToast";
import InnerLayout from "../layout/innerLayout";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import { rejectedApplicantViewAction } from "../../redux/actions/rejectedApplicantAction";
import { blockedApplicantViewAction } from "../../redux/actions/manageDrivers/blockedApplicantAction";
import { bannedApplicantViewAction } from "../../redux/actions/manageDrivers/bannedApplicantAction";
import { expiredApplicantViewAction } from "../../redux/actions/expiredDocumentAction";
import { pendingApplicantViewAction } from "../../redux/actions/pendApplicantAction";
import {
  deleteDriverViewAction,
  permdeleteDriverViewAction,
} from "../../redux/actions/manageDrivers/deletedDriverAction";
import { insertSpaceUnderScore } from "../helper";
import DriverProfileTop from "./driverProfileTop";
import DriverBookingHistoryTable from "../similarTables/driverBookingHistoryTable";
import "./manageDriversComponents.css";
import DriverPremiumHistoryTable from "../similarTables/driverPremiumHistoryTable";
import DriverDetailsFindOne from "../similarTables/driverDetailsFindOne";
import VehicleDetailsFindOne from "../similarTables/vehicleDetailsFindOne";

const DriverRideHistory = ({ profileData, type }) => {
  const params = useParams();
  const dispatch = useDispatch();
  var activeTab = "";
  if (localStorage.getItem("manageDriverActiveTab"))
    activeTab = localStorage.getItem("manageDriverActiveTab");
  else activeTab = "Bookings History";

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [search, setSearch] = useState({ value: "" });
  const [driverTab, setDriverTab] = useState(activeTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [driverTable, setDriverTable] = useState(false);

  const [driverPremiumHistory, setDriverPremiumHistory] = useState();

  const [driverData, setDriverData] = useState({
    driverDetails: {},
    rideHistoryTable: {},
    premiumHistory: {},
  });

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
  const statusList = [];

  if (type === "manageDrivers") {
    statusList.push({
      value: "Active",
      backGroundColor: "active_container",
    });
  } else if (type === "blockedDrivers") {
    statusList.push({
      value: "Blocked",
      backGroundColor: "blocked_active_container",
    });
  } else if (type === "rejectApplication") {
    statusList.push({
      value: "Rejected",
      backGroundColor: "inactive_container",
    });
  } else if (type === "bannedApplication") {
    statusList.push({
      value: "Banned",
      backGroundColor: "inactive_container",
    });
  } else if (type === "expiredDocuments") {
    statusList.push({
      value: "Expired Documents",
      backGroundColor: "inactive_container",
    });
  } else if (type === "pendingRideHistory") {
    statusList.push(
      {
        value: driverData?.driverDetails?.doc_status
          ? insertSpaceUnderScore(driverData?.driverDetails?.doc_status)
          : "",
        backGroundColor:
          driverData?.driverDetails?.doc_status === "New_application"
            ? "new_application_conatiner"
            : "re_approval_conatiner",
      },
      {
        value: driverData?.driverDetails?.doc_details,
        backGroundColor:
          driverData?.driverDetails?.doc_details === "Complete"
            ? "active_container"
            : "inactive_container",
      }
    );
  } else if (type === "deletedDriverRideHistory") {
    statusList.push({
      backGroundColor: "inactive_container",
      value: "Deleted",
    });
  } else if (type === "permanentlyDeletedDriverRideHistory") {
    statusList.push({
      value: "Permanently Deleted",
      backGroundColor: "inactive_container",
    });
  }

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "--") if (page > 0) setPage((prev) => prev - 1);
  }

  const driverTabData = [
    "Bookings History",
    "Premium History",
    "Driver Details",
    "Vehicle Details",
  ];

  return (
    <>
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
          <div className={`row ms-3`}>
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
              className={`mt-sm-0 mt-5 rounded-2 ${
                (driverTab === "Driver Details" ||
                  driverTab === "Vehicle Details") &&
                `py-2`
              }`}
              style={{
                boxShadow:
                  (driverTab === "Driver Details" ||
                    driverTab === "Vehicle Details") &&
                  "0px 3px 6px 4px #00000029",
              }}
            >
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
                  loading={loading}
                  setLoading={setLoading}
                  error={error}
                  handlePagination={handlePagination}
                  page={page}
                  pageData={driverPremiumHistory}
                  driverPremiumData={driverData?.premiumHistory}
                />
              ) : driverTab === "Driver Details" ? (
                <DriverDetailsFindOne
                  driverData={driverData?.driverDetails}
                  loading={loading}
                  error={error}
                  handlePagination={handlePagination}
                  page={page}
                  pageData={pageData}
                  profileData={profileData}
                  driverId={params?.id}
                />
              ) : (
                <VehicleDetailsFindOne
                  driverData={driverData?.driverDetails}
                  loading={loading}
                  error={error}
                  handlePagination={handlePagination}
                  page={page}
                  pageData={pageData}
                  profileData={profileData}
                  driverId={params?.id}
                />
              )}
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default DriverRideHistory;
