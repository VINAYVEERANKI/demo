import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import * as riderAction from "../../redux/actions/manageRidersAction";
import errorToast from "../utilits/errorToast";
import RiderSidebar from "./sidebar";
import InnerLayout from "../layout/innerLayout";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import ErrorPageComponent from "../errorPageComponent";
import RideHistoryTable from "../similarTables/rideHistoryTable";

const RiderHistoryComponent = ({ type = "" }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [riderTable, setRiderTable] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [riderData, setriderData] = useState({
    riderDetails: {},
    riderHistoryTable: [],
  });

  const handleFilterClose = () => {
    setShowFilter(false);
  };
  const handleFilterOpen = () => {
    setShowFilter(true);
  };

  const handleSearch = (value) => {
    setNumberOfFilters(0);
    setSearch(value);
    for (let key in value) {
      if (value[key]) {
        setNumberOfFilters((prev) => prev + 1);
      }
    }

    setPage(0);
  };

  useEffect(() => {
    if (type === "manageRiders") {
      setLoading(true);
      dispatch(
        riderAction.riderViewAction(
          {
            id: params?.id,
            search: {
              booking_id: "",
              booking_classification: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "blockedRiders") {
      setLoading(true);
      dispatch(
        riderAction.blockedRiderViewAction(
          {
            id: params?.id,
            search: {
              booking_id: "",
              booking_id_2: "",
              booking_classification: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "deletedRiders") {
      setLoading(true);
      dispatch(
        riderAction.deletedRiderViewAction(
          {
            rider_id: params?.id,
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
    } else if (type === "permanentlyDeletedRiders") {
      setLoading(true);
      dispatch(
        riderAction.permanentlyDelRiderViewAction(
          {
            rider_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search, riderTable]);

  const onSuccess = (data) => {
    setriderData({
      riderDetails: data?.data?.Rider_Details,
      riderHistoryTable: data?.data?.Ride_History,
    });

    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "--") if (page > 0) setPage((prev) => prev - 1);
  }
  const statusList = [];

  if (type === "manageRiders") {
    statusList?.push({
      backGroundColor: `${
        riderData?.riderDetails?.rider_status === true
          ? "active_container"
          : "inactive_container"
      }`,
      value:
        riderData?.riderDetails?.rider_status === true ? "Active" : "Inactive",
    });
  }

  if (type === "blockedRiders") {
    statusList?.push({
      backGroundColor: `blocked_active_container`,
      value: "Blocked",
    });
  }
  if (type === "deletedRiders") {
    statusList?.push(
      {
        backGroundColor:
          riderData?.riderDetails?.rider_status === true
            ? "active_container"
            : "inactive_container",
        value:
          riderData?.riderDetails?.rider_status === true
            ? "Active"
            : "Inactive",
      },
      { backGroundColor: "inactive_container", value: "Deleted" }
    );
  }
console.log(riderData?.riderDetails?.rider_status);
  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : error === true ? (
        <ErrorPageComponent />
      ) : (
        <InnerLayout
          navigateEnable={true}
          mainHeading={`Rider ID - ${riderData?.riderDetails?.rider_id2}`}
          statusList={statusList}
          loading={loading}
        >
          <hr className="hr_line_color" />
          <div className="mt-5">
            <div className="row">
              <div className="col-xl-3 col-lg-5 col-12">
                <RiderSidebar
                  riderSidebarData={riderData?.riderDetails}
                  riderTable={riderTable}
                  setRiderTable={setRiderTable}
                  type={type}
                />
              </div>

              <div className="col-xl-9 col-lg-7 col-12">
                <RideHistoryTable
                  rideData={riderData?.riderHistoryTable}
                  loading={loading}
                  error={error}
                  handlePagination={handlePagination}
                  page={page}
                  pageData={pageData}
                />
              </div>
            </div>
          </div>
        </InnerLayout>
      )}
    </>
  );
};

export default RiderHistoryComponent;
