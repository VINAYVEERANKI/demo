import React, { useState } from "react";
import CouponLayout from "../../../components/layout/couponLayout";
import { useEffect } from "react";
import DriverBroadcastTable from "../../../components/broadcast/driverBroadcast/driverBroadcastTable";
import CreateDriverBroadCastModal from "../../../components/broadcast/driverBroadcast/driverBroadcastModal";
import DriverBroadcastFilter from "../../../components/broadcast/driverBroadcast/driverBroadcastFilter";
import { driBroadcastRevreqDrpdwnAction } from "../../../redux/actions/broadcast/pendandCreateBroadcastAction";
import { useDispatch } from "react-redux";
import { driBroadcastActiveDrpdwnAction } from "../../../redux/actions/broadcast/activeBroadcastAction";
import { driBroadcastRejectDrpdwnAction } from "../../../redux/actions/broadcast/rejectbroadcastAction";
import { driBroadcastDeleteDrpdwnAction } from "../../../redux/actions/broadcast/deletedBroadcastAction";
import { driBroadcastExpireDrpdwnAction } from "../../../redux/actions/broadcast/expiredBroadcastAction";

const DriverBroadcast = () => {
  const dispatch = useDispatch();
  const [createBroadCastShow, setCreateBroadCastShow] = useState(false);
  const handleCreateBroadCastClose = () => setCreateBroadCastShow(false);
  const handleCreateBroadCastShow = () => setCreateBroadCastShow(true);
  const [driverbroadCastTab, setDriverBroadCastTab] = useState("");
  const [page, setPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [driverDropDownList, setDriverDropDownList] = useState({});
  useEffect(() => {
    setDriverBroadCastTab(localStorage.getItem("driverbroadCastTab") ?? "ReviewRequired");
  }, []);
  const navBarList = [
    { label: "Review Required", value: "ReviewRequired" },
    { label: "Active", value: "Active" },
    { label: "Rejected", value: "Rejected" },
    { label: "Deleted", value: "Deleted" },
    { label: "Expired", value: "Expired" },
  ];
  const buttonList = [
    <>
       <button
         className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3 ride_broadcast_filter_button"
         type="button"
         onClick={() => {
           handleFetchDropDownList();  /// API call function name
         }}
       >
         <i className="ri-filter-3-line primary_color pe-2" />
         <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
       </button>
 
       {numberOfFilters === 0 ? (
         <></>
       ) : (
         <div className={`position-relative p-1`}>
           <span
             className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
           >
             {numberOfFilters}
           </span>
         </div>
       )}
     </>
 ];
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

const handleFilterClose = () => {
  setShowFilter(false);
};
 const handleFetchDropDownList = () => {
  if (driverbroadCastTab === "ReviewRequired") {
    dispatch(
      driBroadcastRevreqDrpdwnAction(
        onDropDownListSuccess,
        onDropDownListError
      )
    );
  }
  else if (driverbroadCastTab === "Active"){
    dispatch(
      driBroadcastActiveDrpdwnAction(
        onDropDownListSuccess,
        onDropDownListError
      )
    )
  }
  else if (driverbroadCastTab === "Rejected"){
    dispatch(
      driBroadcastRejectDrpdwnAction(
        onDropDownListSuccess,
        onDropDownListError
      )
    )
  }
  else if (driverbroadCastTab === "Deleted"){
    dispatch(
      driBroadcastDeleteDrpdwnAction(
        onDropDownListSuccess,
        onDropDownListError
      )
    )
  }
  else if (driverbroadCastTab === "Expired"){
    dispatch(
      driBroadcastExpireDrpdwnAction(
        onDropDownListSuccess,
        onDropDownListError
        )
    )
  }
 };

 const onDropDownListSuccess = (data) => {
  console.log(data?.data, "fasklada");
  setShowFilter(!showFilter);
  if (driverbroadCastTab === "ReviewRequired") {
    setDriverDropDownList({
      broadcast_code: [
        ...new Set(
          data?.data
            ?.map((item) => item.broadcast_code)
            ?.filter((broadcast_code) => Boolean(broadcast_code))
        ),
      ].map((broadcast_code) => ({ broadcast_code: broadcast_code })),
      broadcast_status: [
        ...new Set(data?.data?.map((item) => item.broadcast_status)),
      ].map((broadcast_status) => ({ broadcast_status: broadcast_status })),
      notification_title: [
        ...new Set(data?.data?.map((item) => item.notification_title)),
      ].map((notification_title) => ({ notification_title: notification_title })),
      campaign_status: [
        ...new Set(data?.data?.map((item) => item.campaign_status)),
      ].map((campaign_status) => ({ campaign_status: campaign_status })),
      createdAt: [
        ...new Set(data?.data?.map((item) => item.createdAt)),
      ].map((createdAt) => ({ createdAt: createdAt })),
      createdBy: [
        ...new Set(data?.data?.map((item) => item.createdBy?.user_name)),
      ].map((createdBy) => ({ createdBy: createdBy })),
      zone_name: [
        ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name)
        )),
      ].map((zone_name) => ({ zone_name: zone_name })),
    });
  } 
else if (driverbroadCastTab === "Active"){
  setDriverDropDownList({
    broadcast_code: [
      ...new Set(
        data?.data
          ?.map((item) => item.broadcast_code)
          ?.filter((broadcast_code) => Boolean(broadcast_code))
      ),
    ].map((broadcast_code) => ({ broadcast_code: broadcast_code })),
    notification_title: [
      ...new Set(data?.data?.map((item) => item.notification_title)),
    ].map((notification_title) => ({ notification_title: notification_title })),
    campaign_status: [
      ...new Set(data?.data?.map((item) => item.campaign_status)),
    ].map((campaign_status) => ({ campaign_status: campaign_status })),
    approved_at: [
      ...new Set(data?.data?.map((item) => item.approved_at)),
    ].map((approved_at) => ({ approved_at: approved_at })),
    approvedBy: [
      ...new Set(data?.data?.map((item) => item.approvedBy?.user_name)),
    ].map((approvedBy) => ({ approvedBy: approvedBy })),
    zone_name: [
      ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name)
      )),
    ].map((zone_name) => ({ zone_name: zone_name })),
  })
}
else if (driverbroadCastTab === "Rejected"){
  setDriverDropDownList({
    broadcast_code: [
      ...new Set(
        data?.data
          ?.map((item) => item.broadcast_code)
          ?.filter((broadcast_code) => Boolean(broadcast_code))
      ),
    ].map((broadcast_code) => ({ broadcast_code: broadcast_code })),
    broadcast_status: [
      ...new Set(data?.data?.map((item) => item.broadcast_status)),
    ].map((broadcast_status) => ({ broadcast_status: broadcast_status })),
    notification_title: [
      ...new Set(data?.data?.map((item) => item.notification_title)),
    ].map((notification_title) => ({ notification_title: notification_title })),
    rejected_at: [
      ...new Set(data?.data?.map((item) => item.rejected_at)),
    ].map((rejected_at) => ({ rejected_at: rejected_at })),
    rejectedBy: [
      ...new Set(data?.data?.map((item) => item.rejectedBy?.user_name)),
    ].map((rejectedBy) => ({ rejectedBy: rejectedBy })),
     zone_name: [
        ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name)
        )),
      ].map((zone_name) => ({ zone_name: zone_name })),
  })
}
else if (driverbroadCastTab === "Deleted"){
  setDriverDropDownList({
    broadcast_code: [
      ...new Set(
        data?.data
          ?.map((item) => item.broadcast_code)
          ?.filter((broadcast_code) => Boolean(broadcast_code))
      ),
    ].map((broadcast_code) => ({ broadcast_code: broadcast_code })),
    zone_name: [
      ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name)
      )),
    ].map((zone_name) => ({ zone_name: zone_name })),
    notification_title: [
      ...new Set(data?.data?.map((item) => item.notification_title)),
    ].map((notification_title) => ({ notification_title: notification_title })),
    deleted_at: [
      ...new Set(data?.data?.map((item) => item.deleted_at)),
    ].map((deleted_at) => ({ deleted_at: deleted_at })),
    deletedBy: [
      ...new Set(data?.data?.map((item) => item.deletedBy?.user_name)),
    ].map((deletedBy) => ({ deletedBy: deletedBy })),
  })
}
else if (driverbroadCastTab === "Expired"){
  setDriverDropDownList({
    broadcast_code: [
      ...new Set(
        data?.data
          ?.map((item) => item.broadcast_code)
          ?.filter((broadcast_code) => Boolean(broadcast_code))
      ),
    ].map((broadcast_code) => ({ broadcast_code: broadcast_code })),
    zone_name: [
      ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name)
      )),
    ].map((zone_name) => ({ zone_name: zone_name })),
    notification_title: [
      ...new Set(data?.data?.map((item) => item.notification_title)),
    ].map((notification_title) => ({ notification_title: notification_title })),
    expired_at: [
      ...new Set(data?.data?.map((item) => item.expired_at)),
    ].map((expired_at) => ({ expired_at: expired_at })),
  })
}
};
const onDropDownListError = (data) => {
    console.log(data?.data);
  };

  return (
    <>
      <CreateDriverBroadCastModal
        createBroadCastShow={createBroadCastShow}
        handleCreateBroadCastClose={handleCreateBroadCastClose}
      />
      <CouponLayout
        navBarList={navBarList}
        createName={"Create New Broadcast"}
        couponTab={driverbroadCastTab}
        setCouponTab={setDriverBroadCastTab}
        localStorageitem={"driverbroadCastTab"}
        onClickFn={handleCreateBroadCastShow}
        maintype={"driverBroadcast"}
        mainHeading={"Driver Broadcast"}
        buttons={buttonList}
      >
       <div className="position-relative">
    {showFilter ? (
        <div className="filter_container position-absolute">
        <DriverBroadcastFilter
          filter={handleSearch}
          search={search}
          handleFilterClose={handleFilterClose}
          driverDropDownList={driverDropDownList}
          driverbroadCastTab={driverbroadCastTab}
          setShowFilter={setShowFilter}
        />
        </div>
      ) : (
        <></>
      )}
    </div>
        {driverbroadCastTab === "ReviewRequired" && (
          <DriverBroadcastTable type={"reviewRequired"} search={search} />
        )}
        {driverbroadCastTab === "Active" && (
          <DriverBroadcastTable type={"active"} search={search} />
        )} 
        {driverbroadCastTab === "Rejected" && (
          <DriverBroadcastTable type={"rejected"} search={search} />
        )}
        {driverbroadCastTab === "Deleted" && (
          <DriverBroadcastTable type={"deleted"} search={search} />
        )}
        {driverbroadCastTab === "Expired" && (
          <DriverBroadcastTable type={"expired"} search={search} />
        )}
      </CouponLayout>
    </>
  );
};

export default DriverBroadcast;
