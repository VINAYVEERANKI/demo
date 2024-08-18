import React, { useEffect, useMemo, useState } from "react";
import InnerLayout from "../layout/innerLayout";
import BroadcastForm from "./broadcastForm";
import { useDispatch } from "react-redux";
import * as reviewReqBroadcastAction from "../../redux/actions/broadcast/pendandCreateBroadcastAction";
import * as activeBroadcastAction from "../../redux/actions/broadcast/activeBroadcastAction";
import * as rejectBroadcastAction from "../../redux/actions/broadcast/rejectbroadcastAction";
import * as deletedBroadcastAction from "../../redux/actions/broadcast/deletedBroadcastAction";
import * as expiredBroadcastAction from "../../redux/actions/broadcast/expiredBroadcastAction";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import BroadcastSidebar from "./sidebar";
import ObjValueFormatterFn from "../objValueFormatterFn";
import {
  insertSpaces,
  useExpiryDate,
} from "../helper";
import { useNavigate } from "react-router";
import LeavePagemodal from "../modals/leaveModal";

const Broadcastdetails = ({ params, location, type = "" }) => {
  const navigate = useNavigate();
  const [initialBackBtn, setInitialBackBtn] = useState(false);

  const dispatch = useDispatch();

  const [fetchLoading, setFetchLoading] = useState(false);
  const [broadcastData, setBroadcastData] = useState({});
  const [reload, setReload] = useState(false);
  const status = location?.state?.status;
  console.log(location?.state);
  console.log(
    location?.state?.zoneList
      ?.filter(
        (item) => item?.value === location?.state?.broadcast_applicable_zone
      )
      ?.map((item) => item?.label)
      ?.join(", ")
  );

  useEffect(() => {
    const broadcastID = {
      broadcast_id: params?.id,
    };
    if (type === "Rider") {
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        setFetchLoading(true);
        dispatch(
          reviewReqBroadcastAction?.reviewReqRiderBroadCastAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (status === "Active") {
        setFetchLoading(true);
        dispatch(
          activeBroadcastAction?.activeRiderBroadCastFindOneAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (status === "Rejected") {
        setFetchLoading(true);
        dispatch(
          rejectBroadcastAction?.riderBroadCastRejectFindOneAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (status === "Deleted") {
        setFetchLoading(true);
        dispatch(
          deletedBroadcastAction?.riderBroadCastDeleteFindOneAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (status === "Expired") {
        setFetchLoading(true);
        dispatch(
          expiredBroadcastAction?.riderBroadCastExpiredFindOneAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      }
    } else if (type === "Driver") {
      if (status === "PendingReview" || status === "ReviewPendingUpdated") {
        setFetchLoading(true);
        dispatch(
          reviewReqBroadcastAction?.reviewReqDriverBroadCastAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (status === "Active") {
        setFetchLoading(true);
        dispatch(
          activeBroadcastAction?.activeDriverBroadCastFindOneAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (status === "Rejected") {
        setFetchLoading(true);
        dispatch(
          rejectBroadcastAction?.driverBroadCastRejectFindOneAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (status === "Deleted") {
        setFetchLoading(true);
        dispatch(
          deletedBroadcastAction?.driverBroadCastDeleteFindOneAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (status === "Expired") {
        setFetchLoading(true);
        dispatch(
          expiredBroadcastAction?.driverBroadCastExpiredFindOneAction(
            broadcastID,
            onFetchSuccess,
            onFetchError
          )
        );
      }
    }
  }, [reload, params?.id]);

  const onFetchSuccess = (data) => {
    setFetchLoading(false);
    setBroadcastData(data?.data);
    console.log(data);
  };
  const onFetchError = (data) => {
    setFetchLoading(false);
    console.log(data);
  };

  console.log(broadcastData, "broadcastData");

  const rideType = useMemo(() => {
    if (location?.state?.driver_type) {
      if (status === "create") {
        return location.state.driver_type.join(", ");
      } else {
        return ObjValueFormatterFn(location.state.driver_type);
      }
    }
  }, [location?.state?.driver_type, status]);

  const sideBarData = [
    { label: "Broadcast ID", value: broadcastData?.broadcast_code ?? "--" },
    { label: "User Type", value: type ? type : "--" },
    {
      label: `Broadcast Applicable Zone`,
      value:
        status === "create"
          ? location?.state?.broadcast_applicable_zone?.length > 1
            ? "All"
            : location?.state?.broadcast_applicable_zone?.length === 1
            ? location?.state?.zone_name
            : "--"
          : location?.state?.zoneList?.length > 1
          ? "All"
          : location?.state?.zoneList?.length === 1
          ? location?.state?.zoneList?.find((item) =>
              location?.state?.broadcast_applicable_zone?.includes(item?.id)
            ).zone_name
          : "--",
    },
    {
      label: "Broadcast Status",
      value: broadcastData?.broadcast_status
        ? insertSpaces(broadcastData?.broadcast_status)
        : "--",
    },
  ];
  if (type === "Driver") {
    sideBarData?.splice(3, 0, {
      label: "Driver Default Ride Type*",
      value: location?.state?.driver_default_ride_type
        ? location?.state?.ride_type?.join(", ")
        : "--",
    });
    sideBarData?.splice(2, 0, {
      label: "Broadcast Driver Type",
      value: rideType ?? "--",
    });
  }

  // const riderReferralCreatedData = useSelector(
  //   (store) => store.createRiderReferralReducer
  // );

  console.log(location?.state, "dfafsfds");
  const expiryDate = useExpiryDate(
    null,
    broadcastData?.expiry_date,
    broadcastData?.expiry_time
  );

  console.log(expiryDate, "expirydate ");

  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const Onnavigatebtn = () => {
    if (initialBackBtn === true) {
      handleLeavePageShow();
    } else {
      navigate(-1);
    }
  };

  console.log(initialBackBtn, "setmodal");
  console.log(broadcastData?.broadcast_code, "ghcdhsgcdshc");

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
          naviagteLeave={true}
          navigateEnable={false}
          mainHeading={
            status === "create"
              ? "Create/ Review Broadcast"
              : `${type ?? "--"} Broadcast - (${
                  broadcastData?.broadcast_code ?? "--"
                })`
          }
          navigateFn={Onnavigatebtn}
          expiryDateShow={true}
          expiryDate={
            fetchLoading
              ? "--"
              : status !== "create"
              ? `Broadcast Expiry : ${expiryDate}`
              : null
          }
        >
          <div className="row">
            <div className="col-lg-4 col-12">
              <BroadcastSidebar sideBarData={sideBarData} />
            </div>
            <div className="col-lg-7 col-12">
              <BroadcastForm
                zone={location?.state?.broadcast_applicable_zone}
                location={location}
                fetchLoading={fetchLoading}
                reload={reload}
                setReload={setReload}
                broadcastData={broadcastData}
                status={status}
                params={params}
                type={type}
                initialBackBtn={initialBackBtn}
                setInitialBackBtn={setInitialBackBtn}
              />
            </div>
          </div>
        </InnerLayout>
      )}
    </>
  );
};

export default Broadcastdetails;
