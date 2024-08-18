import React, { useEffect, useState } from 'react'
import CreateBroadCastModal from './riderBroadcastModal';
import CouponLayout from '../../layout/couponLayout';
import RiderBroadcastFilter from './riderBroadcastFilter';
import RiderBroadcastTable from './riderBroadcastTable';
import { useDispatch } from 'react-redux';
import { rideBroadcastRevreqDrpdwnAction } from '../../../redux/actions/broadcast/pendandCreateBroadcastAction';
import { rideBroadcastActiveDrpdwnApi } from '../../../redux/apis/broadcast/activeBroadcastApi';
import { rideBroadcastActiveDrpdwnAction } from '../../../redux/actions/broadcast/activeBroadcastAction';
import { rideBroadcastRejectDrpdwnAction } from '../../../redux/actions/broadcast/rejectbroadcastAction';
import { rideBroadcastDeleteDrpdwnAction } from '../../../redux/actions/broadcast/deletedBroadcastAction';
import { rideBroadcastExpiredDrpdwnAction } from '../../../redux/actions/broadcast/expiredBroadcastAction';

const RiderBroadcastMainLayout = () => {
    const dispatch = useDispatch();

    const [createBroadCastShow, setCreateBroadCastShow] = useState(false);
    const handleCreateBroadCastClose = () => setCreateBroadCastShow(false);
    const handleCreateBroadCastShow = () => setCreateBroadCastShow(true);
    const [page, setPage] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState({ value: "" });
    const [numberOfFilters, setNumberOfFilters] = useState(0);
    const [driverDropDownList, setDriverDropDownList] = useState({});
    const [broadCastTab, setBroadCastTab] = useState("");
    useEffect(() => {
      setBroadCastTab(localStorage.getItem("broadCastTab") ?? "ReviewRequired");
    }, []);
  
    const navBarList = [
      { label: "Review Required", value: "ReviewRequired" },
      { label: "Active", value: "Active" },
      { label: "Rejected", value: "Rejected" },
      { label: "Deleted", value: "Deleted" },
      { label: "Expired", value: "Expired" },
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
     
      const handleFetchDropDownList = () => {
        if (broadCastTab === "ReviewRequired") {
            dispatch(
                rideBroadcastRevreqDrpdwnAction(
                onDropDownListSuccess,
                onDropDownListError
              )
            );
          }
          else if (broadCastTab === "Active"){
            dispatch(
                rideBroadcastActiveDrpdwnAction(
                    onDropDownListSuccess,
                onDropDownListError
                )
            )
          }
          else if (broadCastTab==="Rejected"){
            dispatch(
              rideBroadcastRejectDrpdwnAction(
                onDropDownListSuccess,
                onDropDownListError
              )
            )
          }
          else if (broadCastTab === "Deleted"){
            dispatch(
              rideBroadcastDeleteDrpdwnAction(
                onDropDownListSuccess,
                onDropDownListError
              )
            )
          }
          else if (broadCastTab === "Expired"){
            dispatch(
              rideBroadcastExpiredDrpdwnAction(
                onDropDownListSuccess,
                onDropDownListError
              )
            )
          }
     };
     const onDropDownListSuccess = (data) => {
      console.log(data?.data, "fasklada");
      setShowFilter(!showFilter);
      if (broadCastTab === "ReviewRequired") {
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
              // campaign_status: [
              //   ...new Set(data?.data?.map((item) => item.campaign_status)),
              // ].map((campaign_status) => ({ campaign_status: campaign_status })),
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
      else if (broadCastTab === "Active"){
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
          approved_at: [
            ...new Set(data?.data?.map((item) => item.approved_at)),
          ].map((approved_at) => ({ approved_at: approved_at })),
          approved_by: [
            ...new Set(data?.data?.map((item) => item.approvedBy?.user_name)),
          ].map((approved_by) => ({ approved_by: approved_by })),
          zone_name: [
            ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name))),
          ].map((zone_name) => ({ zone_name: zone_name })),
        })
      }
      else if (broadCastTab === "Rejected"){
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
          rejected_at: [
            ...new Set(data?.data?.map((item) => item.rejected_at)),
          ].map((rejected_at) => ({ rejected_at: rejected_at })),
          rejected_by: [
            ...new Set(data?.data?.map((item) => item.rejectedBy?.user_name)),
          ].map((rejected_by) => ({ rejected_by: rejected_by })),
          zone_name: [
            ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name)
            )),
          ].map((zone_name) => ({ zone_name: zone_name })),
        })
      }
      else if (broadCastTab === "Deleted"){
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

          zone_name: [
            ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name)
            )),
          ].map((zone_name) => ({ zone_name: zone_name })),
          deleted_at: [
            ...new Set(data?.data?.map((item) => item.deleted_at)),
          ].map((deleted_at) => ({ deleted_at: deleted_at })),
          deleted_by: [
            ...new Set(data?.data?.map((item) => item.deletedBy?.user_name)),
          ].map((deleted_by) => ({ deleted_by: deleted_by })),
        })
      }
      else if (broadCastTab === "Expired"){
       setDriverDropDownList({
        broadcast_code: [
          ...new Set(
            data?.data
              ?.map((item) => item.broadcast_code)
              ?.filter((broadcast_code) => Boolean(broadcast_code))
          ),
        ].map((broadcast_code) => ({ broadcast_code: broadcast_code })),
        zone_name: [
          ...new Set(data?.data?.map((item) => item?.ZoneName?.map((item)=>item?.zone_name))),
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
    <CreateBroadCastModal
      createBroadCastShow={createBroadCastShow}
      handleCreateBroadCastClose={handleCreateBroadCastClose}
    />
    <CouponLayout
      navBarList={navBarList}
      createName={"Create New Broadcast"}
      couponTab={broadCastTab}
      setCouponTab={setBroadCastTab}
      localStorageitem={"broadCastTab"}
      onClickFn={handleCreateBroadCastShow}
      maintype={"riderBroadcast"}
      mainHeading={"Rider Broadcast"}
      buttons={buttonList}
    >
    <div className="position-relative">
    {showFilter ? (
        <div className="filter_container position-absolute">
        <RiderBroadcastFilter
          filter={handleSearch}
          search={search}
          handleFilterClose={handleFilterClose}
          driverDropDownList={driverDropDownList}
          broadCastTab={broadCastTab}
          setShowFilter={setShowFilter}
        />
        </div>
      ) : (
        <></>
      )}
    </div>
   
      {broadCastTab === "ReviewRequired" && (
        <RiderBroadcastTable type={"reviewRequired"} search={search} />
      )}
      {broadCastTab === "Active" && <RiderBroadcastTable type={"active"} search={search} />}
      {broadCastTab === "Rejected" && (
        <RiderBroadcastTable type={"rejected"} search={search} />
      )}
      {broadCastTab === "Deleted" && <RiderBroadcastTable type={"deleted"} search={search} />}
      {broadCastTab === "Expired" && <RiderBroadcastTable type={"expired"} search={search} />}
    </CouponLayout>
  </>
  )
}

export default RiderBroadcastMainLayout
