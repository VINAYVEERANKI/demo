import React from "react";
import InnerLayout from "../../layout/innerLayout";
import BroadcastForm from "../../broadcast/broadcastForm";
import DriverIncentivesSideBar from "./driverIncentivesSideBar";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { driverIncentivePendingAction } from "../../../redux/actions/incentives/pendingIncentivesAction";
import { driverIncentiveActiveAction } from "../../../redux/actions/incentives/activeIncentivesAction";
import { driverIncentiveRejectedAction } from "../../../redux/actions/incentives/rejectedIncentivesAction";
import { driverIncentiveDeletedAction } from "../../../redux/actions/incentives/deletedIncentivesAction";
import { driverIncentiveExpiredAction } from "../../../redux/actions/incentives/expiredIncentivesAction";
import errorToast from "../../utilits/errorToast";
import LeavePagemodal from "../../modals/leaveModal";
import { useNavigate } from "react-router";
import { incentiveMainZoneListAction } from "../../../redux/actions/incentives/dropDownListAction";

const DriverIncentiveBroadcast = ({ location, params }) => {
  const status = location?.state?.status;
  const type = location?.state?.type;
  const Createvalues = location?.state;
  console.log(Createvalues, "values");
  const navigate = useNavigate();
  console.log(location, "masbdasj");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [incentiveData, setIncentiveData] = useState({});
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const [initialBackBtn, setInitialBackBtn] = useState(false);

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  useEffect(() => {
    const id = {
      incentive_id: params?.id,
    };
    if (status === "PendingReview" || status === "ReviewPendingUpdated") {
      setFetchLoading(true);
      dispatch(driverIncentivePendingAction(id, onFetchSuccess, onFetchError));
    } else if (status === "Active") {
      setFetchLoading(true);
      dispatch(driverIncentiveActiveAction(id, onFetchSuccess, onFetchError));
    } else if (status === "Rejected") {
      setFetchLoading(true);
      dispatch(driverIncentiveRejectedAction(id, onFetchSuccess, onFetchError));
    } else if (status === "Deleted") {
      setFetchLoading(true);
      dispatch(driverIncentiveDeletedAction(id, onFetchSuccess, onFetchError));
    } else if (status === "Expired") {
      setFetchLoading(true);
      dispatch(driverIncentiveExpiredAction(id, onFetchSuccess, onFetchError));
    }
  }, [status, reload]);
  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    setIncentiveData(data?.data);
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    errorToast(data?.data?.data);
  };

  console.log(incentiveData, "incentiveData");

  const [mainZonelist, setMainZonelist] = useState([]);
  useEffect(() => {
    dispatch(incentiveMainZoneListAction(onZoneSuccess, onZoneError));
  }, []);

  const onZoneSuccess = (data) => {
    setMainZonelist(data?.data);
  };

  const onZoneError = (data) => {
    console.log(data?.data);
  };

  const zoneName = mainZonelist?.find(
    (item) => item?.id === incentiveData?.incentive_applicable_zone
  )?.zone_name;

  const sideBarData = [
    {
      label: "Incentive ID",
      value: Createvalues?.incentive_code ? Createvalues?.incentive_code : "--",
      display: true,
    },
    {
      label: "User Type",
      value: Createvalues?.user_type ? Createvalues?.user_type : "--",
      display: true,
    },
    {
      label: "Incentive Classification",
      value: Createvalues?.incentive_classification
        ? Createvalues?.incentive_classification
        : "--",
      display: true,
    },
    {
      label: "Incentive Applicable Zone",
      value: Createvalues?.incentive_applicable_zone
        ? Createvalues?.incentive_applicable_zone
        : "--",
      display: true,
    },
    {
      label: "Driver Default Ride Type*",
      value: Createvalues?.driver_default_ride_type
        ? Createvalues?.driver_default_ride_type
        : "--",
      display: true,
    },
    {
      label: "Incentive Coupon Type",
      value: Createvalues?.incentive_coupon_type
        ? Createvalues?.incentive_coupon_type
        : "--",
      display: true,
    },
  ];

  const viewEditsideBarData = [
    {
      label: "Incentive ID",
      value: incentiveData?.incentive_code
        ? incentiveData?.incentive_code
        : "--",
      display: true,
    },
    {
      label: "User Type",
      value: incentiveData?.user_type ? incentiveData?.user_type : "--",
      display: true,
    },
    {
      label: "Incentive Classification",
      value: incentiveData?.incentive_classification
        ? incentiveData?.incentive_classification
        : "--",
      display: true,
    },
    {
      label: "Incentive Applicable Zone",
      value: zoneName ?? "--",
      display: true,
    },
    {
      label: "Driver Default Ride Type*",
      value: incentiveData?.DefaultRideTypeName?.ride_type
        ? incentiveData?.DefaultRideTypeName?.ride_type
        : "--",
      display: true,
    },
    {
      label: "Incentive Coupon Type",
      value: incentiveData?.incentive_coupon_type
        ? incentiveData?.incentive_coupon_type
        : "--",
      display: true,
    },
    {
      label: "Incentive Status",
      value: incentiveData?.incentive_status
        ? incentiveData?.incentive_status
        : "--",
      display: true,
    },
  ];

  function sidebarFn() {
    if (type === "createIncentive") {
      return sideBarData;
    } else {
      return viewEditsideBarData;
    }
  }

  const incentiveSideBar = sidebarFn();

  const naviagteBackFn = () => {
    if (initialBackBtn === true) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        link={-1}
        subsection={true}
      />
      <InnerLayout
        mainHeading={`Create New Incentive`}
        navigateEnable={false}
        naviagteLeave={true}
        navigateFn={naviagteBackFn}
      >
        <div className="row gx-0">
          <div className="col-lg-3">
            <DriverIncentivesSideBar data={incentiveSideBar} />
          </div>
          <div className="col-lg-9">
            <BroadcastForm
              location={location}
              type={"driverIncentives"}
              incentiveData={incentiveData}
              status={status}
              id={params?.id}
              incentiveType={type}
              initialBackBtn={initialBackBtn}
              setInitialBackBtn={setInitialBackBtn}
              reload={reload}
              setReload={setReload}
            />
          </div>
        </div>
      </InnerLayout>
    </>
  );
};

export default DriverIncentiveBroadcast;
