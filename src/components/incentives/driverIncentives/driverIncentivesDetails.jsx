import React, { useEffect } from "react";
import DriverIncentivesSideBar from "./driverIncentivesSideBar";
import InnerLayout from "../../layout/innerLayout";
import "../incentives.css";
import DriverIncentivesForm from "./driverIncentivesForm";
import { useState } from "react";
import errorToast from "../../utilits/errorToast";
import { useDispatch } from "react-redux";
import { driverIncentivePendingAction } from "../../../redux/actions/incentives/pendingIncentivesAction";
import { driverIncentiveRejectedAction } from "../../../redux/actions/incentives/rejectedIncentivesAction";
import { driverIncentiveActiveAction } from "../../../redux/actions/incentives/activeIncentivesAction";
import { driverIncentiveDeletedAction } from "../../../redux/actions/incentives/deletedIncentivesAction";
import { driverIncentiveExpiredAction } from "../../../redux/actions/incentives/expiredIncentivesAction";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { insertSpaces } from "../../helper";
import { useNavigate } from "react-router";
import LeavePagemodal from "../../modals/leaveModal";
import { incentiveMainZoneListAction } from "../../../redux/actions/incentives/dropDownListAction";

const DriverIncentivesDetails = ({ location, params, is_editable, type }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [incentiveData, setIncentiveData] = useState({});
  const [reloadtable, setReloadtable] = useState(false);
  const dispatch = useDispatch();
  const status = location?.state?.status;
  const Createvalues = location?.state;
  console.log(Createvalues, "values");
  const [navigateBack, setNavigateBack] = useState(false);
  const navigate = useNavigate();

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
  }, [status, reloadtable]);

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
      value: Createvalues?.userType ? Createvalues?.userType : "--",
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
      value: Createvalues?.incentive_applicable_zone_name
        ? Createvalues?.incentive_applicable_zone_name
        : "--",
      display: true,
    },
    {
      label: "Driver Default Ride Type*",
      value: Createvalues?.ride_type ? Createvalues?.ride_type : "--",
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

  console.log(incentiveData, "asass");

  function sidebarFn() {
    if (type === "createIncentive") {
      return sideBarData;
    } else {
      return viewEditsideBarData;
    }
  }

  const incentiveSideBar = sidebarFn();

  const naviagteBackFn = () => {
    if (navigateBack === true) {
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
      {fetchLoading ? (
        <LoadingSpinnerTable />
      ) : (
        <InnerLayout
          mainHeading={
            type === "createIncentive"
              ? `Create New Incentive`
              : `${
                  incentiveData?.incentive_classification
                    ? insertSpaces(incentiveData?.incentive_classification)
                    : "--"
                } - ${incentiveData?.incentive_code}`
          }
          navigateEnable={false}
          naviagteLeave={true}
          navigateFn={naviagteBackFn}
        >
          <div className="row gx-0">
            <div className="col-lg-3">
              <DriverIncentivesSideBar data={incentiveSideBar} />
            </div>
            <div className="col-lg-9">
              <DriverIncentivesForm
                setNavigateBack={setNavigateBack}
                location={location}
                incentiveData={incentiveData}
                is_editable={is_editable}
                status={status}
                type={type}
                id={params?.id}
                reloadtable={reloadtable}
                setReloadtable={setReloadtable}
              />
            </div>
          </div>
        </InnerLayout>
      )}
    </>
  );
};

export default DriverIncentivesDetails;
