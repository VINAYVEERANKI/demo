import React, { useEffect, useState } from "react";
import CouponLayout from "../../../components/layout/couponLayout";
import { clearReducerDriverCouponAction } from "../../../redux/actions/riderCoupon/clearCouponAction";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import DriverIncentiveCreateModal from "../../../components/incentives/driverIncentives/createModal";
import DriverIncentiveHistoryTable from "../../../components/incentives/driverIncentives/driverIncentiveTable/incentiveHistoryTable";
import DriverIncentActAndRevReqTable from "../../../components/incentives/driverIncentives/driverIncentiveTable/activeAndRevReqTable";
import DriverIncentiveTable from "../../../components/incentives/driverIncentives/driverIncentiveTable/driverIncentiveTable";
import DriverIncentiveFilter from "../../../components/incentives/driverIncentives/driverIncentiveFilter/driverIncentiveFilter";
import { driIncentiveExpireDrpdwnAction } from "../../../redux/actions/incentives/expiredIncentivesAction";
import { driIncentiveRejectDrpdwnAction } from "../../../redux/actions/incentives/rejectedIncentivesAction";
import { driIncentiveDeleteDrpdwnAction } from "../../../redux/actions/incentives/deletedIncentivesAction";
import { driIncentiveRevreqDrpdwnAction } from "../../../redux/actions/incentives/pendingIncentivesAction";
import { driIncentiveActiveDrpdwnAction } from "../../../redux/actions/incentives/activeIncentivesAction";
import { driIncentiveUsghisDrpdwnAction } from "../../../redux/actions/incentives/useageHisIncentivesAction";

const DriverIncentives = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [driverIncentiveTab, setDriverIncentiveTab] = useState("");
  const [createIncentiveShow, setCreateCouponShow] = useState(false);
  const handleCreateIncentiveClose = () => setCreateCouponShow(false);
  const handleCreateIncentiveShow = () => setCreateCouponShow(true);
  const [page, setPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [driverDropDownList, setDriverDropDownList] = useState({});

  useEffect(() => {
    setDriverIncentiveTab(
      localStorage.getItem("DriverIncentiveTab") ?? "ReviewRequired"
    );
    if (location?.pathname === "/driver-coupons") {
      dispatch(clearReducerDriverCouponAction());
    }
  }, []);

  const navBarList = [
    {
      label: "Review Required",
      value: "ReviewRequired",
    },
    { label: "Active", value: "Active" },
    { label: "Rejected", value: "Rejected" },
    { label: "Deleted", value: "Deleted" },
    { label: "Expired", value: "Expired" },
    { label: "Incentive History", value: "IncentiveHistory" },
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
 const handleFilterClose = () => {
  setShowFilter(false);
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
const handleFetchDropDownList = () => {
  if(driverIncentiveTab === "Expired"){
    dispatch(
      driIncentiveExpireDrpdwnAction(
      onDropDownListSuccess,
      onDropDownListError
      )
    )
  }
  else if (driverIncentiveTab  === "Rejected"){
    dispatch(
      driIncentiveRejectDrpdwnAction(
      onDropDownListSuccess,
      onDropDownListError
      )
    )
  }
  else if (driverIncentiveTab === "Deleted"){
    dispatch(
      driIncentiveDeleteDrpdwnAction(
        onDropDownListSuccess,
        onDropDownListError
      )
    )
  }
  else if (driverIncentiveTab === "ReviewRequired"){
    dispatch(
      driIncentiveRevreqDrpdwnAction(
        onDropDownListSuccess,
        onDropDownListError
      )
    )
  }
  else if (driverIncentiveTab === "Active"){
    dispatch(
      driIncentiveActiveDrpdwnAction(
        onDropDownListSuccess,
        onDropDownListError
      )
      )
  }
  else if (driverIncentiveTab === "IncentiveHistory"){
    dispatch(
      driIncentiveUsghisDrpdwnAction(
      onDropDownListSuccess,
      onDropDownListError
      )
    )
  }
};

const onDropDownListSuccess = (data) => {
  console.log(data?.data, "fasklada");
  setShowFilter(!showFilter);
  if (driverIncentiveTab === "Expired") {
    setDriverDropDownList({
      incentive_code: [
        ...new Set(
          data?.data
            ?.map((item) => item.incentive_code)
            ?.filter((incentive_code) => Boolean(incentive_code))
        ),
      ].map((incentive_code) => ({ incentive_code: incentive_code })),
      incentive_coupon_type: [
        ...new Set(data?.data?.map((item) => item.incentive_coupon_type)),
      ].map((incentive_coupon_type) => ({ incentive_coupon_type: incentive_coupon_type })),
      // incentive_applicable_zone: [
      //   ...new Set(data?.data?.map((item) => item.incentive_applicable_zone)),
      // ].map((incentive_applicable_zone) => ({ incentive_applicable_zone: incentive_applicable_zone })),
      incentive_classification: [
        ...new Set(data?.data?.map((item) => item.incentive_classification)),
      ].map((incentive_classification) => ({ incentive_classification: incentive_classification })),
      campaign_period: [
        ...new Set(data?.data?.map((item) => item.campaign_period)),
      ].map((campaign_period) => ({ campaign_period: campaign_period })),
      driver_default_ride_type: [
        ...new Set(data?.data?.map((item) => item.driver_default_ride_type)),
      ].map((driver_default_ride_type) => ({ driver_default_ride_type: driver_default_ride_type })),
      incentive_status: [
        ...new Set(data?.data?.map((item) => item.incentive_status)),
      ].map((incentive_status) => ({ incentive_status: incentive_status })),
      expired_at: [
        ...new Set(data?.data?.map((item) => item.expired_at)),
      ].map((expired_at) => ({ expired_at: expired_at })),
      zone_name: [
        ...new Set(data?.data?.map((item) => item?.ZoneName?.zone_name)),
      ].map((zone_name) => ({ zone_name: zone_name })),
      // campaign_dates: [
      //   ...new Set(data?.data?.map((item) => item?.campaign_dates?.campaign_status)),
      // ].map((campaign_dates) => ({ campaign_dates: campaign_dates })),
    });
  } 
  else if (driverIncentiveTab === "Rejected"){
    setDriverDropDownList({
      incentive_code: [
        ...new Set(
          data?.data
            ?.map((item) => item.incentive_code)
            ?.filter((incentive_code) => Boolean(incentive_code))
        ),
      ].map((incentive_code) => ({ incentive_code: incentive_code })),
      incentive_coupon_type: [
        ...new Set(data?.data?.map((item) => item.incentive_coupon_type)),
      ].map((incentive_coupon_type) => ({ incentive_coupon_type: incentive_coupon_type })),
      // incentive_applicable_zone: [
      //   ...new Set(data?.data?.map((item) => item.incentive_applicable_zone)),
      // ].map((incentive_applicable_zone) => ({ incentive_applicable_zone: incentive_applicable_zone })),
      zone_name: [
        ...new Set(data?.data?.map((item) => item?.ZoneName?.zone_name)),
      ].map((zone_name) => ({ zone_name: zone_name })),
      incentive_classification: [
        ...new Set(data?.data?.map((item) => item.incentive_classification)),
      ].map((incentive_classification) => ({ incentive_classification: incentive_classification })),
      campaign_period: [
        ...new Set(data?.data?.map((item) => item.campaign_period)),
      ].map((campaign_period) => ({ campaign_period: campaign_period })),
      driver_default_ride_type: [
        ...new Set(data?.data?.map((item) => item.driver_default_ride_type)),
      ].map((driver_default_ride_type) => ({ driver_default_ride_type: driver_default_ride_type })),
      incentive_status: [
        ...new Set(data?.data?.map((item) => item.incentive_status)),
      ].map((incentive_status) => ({ incentive_status: incentive_status })),
      rejected_at: [
        ...new Set(data?.data?.map((item) => item.rejected_at)),
      ].map((rejected_at) => ({ rejected_at: rejected_at })),
      rejectedBy: [
        ...new Set(data?.data?.map((item) => item.rejectedBy?.user_name)),
      ].map((rejectedBy) => ({ rejectedBy: rejectedBy })),
      
    });
  }
  else if (driverIncentiveTab === "Deleted"){
    setDriverDropDownList({
      incentive_code: [
        ...new Set(
          data?.data
            ?.map((item) => item.incentive_code)
            ?.filter((incentive_code) => Boolean(incentive_code))
        ),
      ].map((incentive_code) => ({ incentive_code: incentive_code })),
      incentive_coupon_type: [
        ...new Set(data?.data?.map((item) => item.incentive_coupon_type)),
      ].map((incentive_coupon_type) => ({ incentive_coupon_type: incentive_coupon_type })),
      // incentive_applicable_zone: [
      //   ...new Set(data?.data?.map((item) => item.incentive_applicable_zone)),
      // ].map((incentive_applicable_zone) => ({ incentive_applicable_zone: incentive_applicable_zone })),
      zone_name: [
        ...new Set(data?.data?.map((item) => item?.ZoneName?.zone_name)),
      ].map((zone_name) => ({ zone_name: zone_name })),
      incentive_classification: [
        ...new Set(data?.data?.map((item) => item.incentive_classification)),
      ].map((incentive_classification) => ({ incentive_classification: incentive_classification })),
      campaign_period: [
        ...new Set(data?.data?.map((item) => item.campaign_period)),
      ].map((campaign_period) => ({ campaign_period: campaign_period })),
      driver_default_ride_type: [
        ...new Set(data?.data?.map((item) => item.driver_default_ride_type)),
      ].map((driver_default_ride_type) => ({ driver_default_ride_type: driver_default_ride_type })),
      incentive_status: [
        ...new Set(data?.data?.map((item) => item.incentive_status)),
      ].map((incentive_status) => ({ incentive_status: incentive_status })),
      deleted_at: [
        ...new Set(data?.data?.map((item) => item.deleted_at)),
      ].map((deleted_at) => ({ deleted_at: deleted_at })),
      rejectedBy: [
        ...new Set(data?.data?.map((item) => item.rejectedBy?.user_name)),
      ].map((rejectedBy) => ({ rejectedBy: rejectedBy })),
      
    });
  }
  else if (driverIncentiveTab === "ReviewRequired"){
    setDriverDropDownList({
      incentive_code: [
        ...new Set(
          data?.data
            ?.map((item) => item.incentive_code)
            ?.filter((incentive_code) => Boolean(incentive_code))
        ),
      ].map((incentive_code) => ({ incentive_code: incentive_code })),
      incentive_coupon_type: [
        ...new Set(data?.data?.map((item) => item.incentive_coupon_type)),
      ].map((incentive_coupon_type) => ({ incentive_coupon_type: incentive_coupon_type })),
      incentive_classification: [
        ...new Set(data?.data?.map((item) => item.incentive_classification)),
      ].map((incentive_classification) => ({ incentive_classification: incentive_classification })),
      campaign_period: [
        ...new Set(data?.data?.map((item) => item.campaign_period)),
      ].map((campaign_period) => ({ campaign_period: campaign_period })),
      driver_default_ride_type: [
        ...new Set(data?.data?.map((item) => item.driver_default_ride_type)),
      ].map((driver_default_ride_type) => ({ driver_default_ride_type: driver_default_ride_type })),
      incentive_status: [
        ...new Set(data?.data?.map((item) => item.incentive_status)),
      ].map((incentive_status) => ({ incentive_status: incentive_status })),
      approved_at: [
        ...new Set(data?.data?.map((item) => item.approved_at)),
      ].map((approved_at) => ({ approved_at: approved_at })),
      zone_name: [
        ...new Set(data?.data?.map((item) => item?.ZoneName?.zone_name)),
      ].map((zone_name) => ({ zone_name: zone_name })),
    });
  }
  else if(driverIncentiveTab === "Active"){
    setDriverDropDownList({
      incentive_code: [
        ...new Set(
          data?.data
            ?.map((item) => item.incentive_code)
            ?.filter((incentive_code) => Boolean(incentive_code))
        ),
      ].map((incentive_code) => ({ incentive_code: incentive_code })),
      incentive_coupon_type: [
        ...new Set(data?.data?.map((item) => item.incentive_coupon_type)),
      ].map((incentive_coupon_type) => ({ incentive_coupon_type: incentive_coupon_type })),
      // incentive_applicable_zone: [
      //   ...new Set(data?.data?.map((item) => item.incentive_applicable_zone)),
      // ].map((incentive_applicable_zone) => ({ incentive_applicable_zone: incentive_applicable_zone })),
      zone_name: [
        ...new Set(data?.data?.map((item) => item?.ZoneName?.zone_name)),
      ].map((zone_name) => ({ zone_name: zone_name })),
      incentive_classification: [
        ...new Set(data?.data?.map((item) => item.incentive_classification)),
      ].map((incentive_classification) => ({ incentive_classification: incentive_classification })),
      campaign_period: [
        ...new Set(data?.data?.map((item) => item.campaign_period)),
      ].map((campaign_period) => ({ campaign_period: campaign_period })),
      driver_default_ride_type: [
        ...new Set(data?.data?.map((item) => item.driver_default_ride_type)),
      ].map((driver_default_ride_type) => ({ driver_default_ride_type: driver_default_ride_type })),
      incentive_status: [
        ...new Set(data?.data?.map((item) => item.incentive_status)),
      ].map((incentive_status) => ({ incentive_status: incentive_status })),
      approved_at: [
        ...new Set(data?.data?.map((item) => item.approved_at)),
      ].map((approved_at) => ({ approved_at: approved_at })),
      approved_by: [
        ...new Set(data?.data?.map((item) => item.approved_by?.user_name)),
      ].map((approved_by) => ({ approved_by: approved_by })),
      
    });
  }
  else if(driverIncentiveTab === "IncentiveHistory"){
    setDriverDropDownList({
      incentive_code: [
        ...new Set(
          data?.data
            ?.map((item) => item.incentive_code)
            ?.filter((incentive_code) => Boolean(incentive_code))
        ),
      ].map((incentive_code) => ({ incentive_code: incentive_code })),
      incentive_coupon_type: [
        ...new Set(data?.data?.map((item) => item.incentive_coupon_type)),
      ].map((incentive_coupon_type) => ({ incentive_coupon_type: incentive_coupon_type })),
      // incentive_applicable_zone: [
      //   ...new Set(data?.data?.map((item) => item.incentive_applicable_zone)),
      // ].map((incentive_applicable_zone) => ({ incentive_applicable_zone: incentive_applicable_zone })),
      incentive_classification: [
        ...new Set(data?.data?.map((item) => item.incentive_classification)),
      ].map((incentive_classification) => ({ incentive_classification: incentive_classification })),
      campaign_period: [
        ...new Set(data?.data?.map((item) => item.campaign_period)),
      ].map((campaign_period) => ({ campaign_period: campaign_period })),
      driver_default_ride_type: [
        ...new Set(data?.data?.map((item) => item.driver_default_ride_type)),
      ].map((driver_default_ride_type) => ({ driver_default_ride_type: driver_default_ride_type })),
      incentive_status: [
        ...new Set(data?.data?.map((item) => item.incentive_status)),
      ].map((incentive_status) => ({ incentive_status: incentive_status })),
      zone_name: [
        ...new Set(data?.data?.map((item) => item?.ZoneName?.zone_name)),
      ].map((zone_name) => ({ zone_name: zone_name })),
      approved_by: [
        ...new Set(data?.data?.map((item) => item.approved_by?.user_name)),
      ].map((approved_by) => ({ approved_by: approved_by })),
    });
  }
};

const onDropDownListError = (data) => {
  console.log(data?.data);
};

  return (
    <>
      <DriverIncentiveCreateModal
        createIncentiveShow={createIncentiveShow}
        handleCreateIncentiveClose={handleCreateIncentiveClose}
      />
      <CouponLayout
        navBarList={navBarList}
        couponTab={driverIncentiveTab}
        setCouponTab={setDriverIncentiveTab}
        createName="Create New Incentive"
        onClickFn={() => handleCreateIncentiveShow()}
        mainHeading="Driver Incentive"
        localStorageitem="DriverIncentiveTab"
        maintype={"driverIncentives"}
        buttons={buttonList}
      >
       <div className="position-relative">
    {showFilter ? (
        <div className="filter_container position-absolute">
        <DriverIncentiveFilter
          filter={handleSearch}
          search={search}
          handleFilterClose={handleFilterClose}
          driverDropDownList={driverDropDownList}
          driverIncentiveTab={driverIncentiveTab}
          setShowFilter={setShowFilter}
        />
        </div>
      ) : (
        <></>
      )}
    </div>
        {driverIncentiveTab === "ReviewRequired" && (
          <DriverIncentActAndRevReqTable type={"reviewRequired"} search={search} />
        )}
        {driverIncentiveTab === "Active" && <DriverIncentActAndRevReqTable type={"active"} search={search} />}
        {driverIncentiveTab === "Rejected" && <DriverIncentiveTable type={"rejected"} search={search} />}
        {driverIncentiveTab === "Deleted" && <DriverIncentiveTable type={"deleted"} search={search} />}
        {driverIncentiveTab === "Expired" && <DriverIncentiveTable type={"expired"} search={search} />}
        {driverIncentiveTab === "IncentiveHistory" && (<DriverIncentiveHistoryTable search={search} />)}
      </CouponLayout>
    </>
  );
};

export default DriverIncentives;
