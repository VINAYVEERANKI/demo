import React, { useState } from "react";
import CouponLayout from "../../../components/layout/couponLayout";
import { useEffect } from "react";
import CreateBroadCastModal from "../../../components/broadcast/riderBroadcast/riderBroadcastModal";
import RiderBroadcastTable from "../../../components/broadcast/riderBroadcast/riderBroadcastTable";
import RiderBroadcastFilter from "../../../components/broadcast/riderBroadcast/riderBroadcastFilter";
import RiderBroadcastMainLayout from "../../../components/broadcast/riderBroadcast/riderBroadcastMainLayout";

const RiderBroadcast = () => {
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
         className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
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
   
 };
 const onDropDownListSuccess = (data) => {
  console.log(data?.data, "fasklada");
  setShowFilter(!showFilter);
  if (broadCastTab === "ReviewRequired") {
    setDriverDropDownList({
    });
  } 
};
  return (
    <>
      {/* <CreateBroadCastModal
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
      {showFilter ? (
          <RiderBroadcastFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            driverDropDownList={driverDropDownList}
            type={broadCastTab}
            setShowFilter={setShowFilter}
          />
        ) : (
          <></>
        )}
        {broadCastTab === "ReviewRequired" && (
          <RiderBroadcastTable type={"reviewRequired"} />
        )}
        {broadCastTab === "Active" && <RiderBroadcastTable type={"active"} />}
        {broadCastTab === "Rejected" && (
          <RiderBroadcastTable type={"rejected"} />
        )}
        {broadCastTab === "Deleted" && <RiderBroadcastTable type={"deleted"} />}
        {broadCastTab === "Expired" && <RiderBroadcastTable type={"expired"} />}
      </CouponLayout> */}
      <RiderBroadcastMainLayout/>
    </>
  );
};

export default RiderBroadcast;