import React, { useEffect, useState } from "react";
import RiderCouponsActive from "./riderCouponTable/activeCouponTable";
import RiderCouponsDeleted from "./riderCouponTable/deleteCouponTable";
import RiderCouponsExpired from "./riderCouponTable/expiredCouponTable";
import RiderCouponsRejected from "./riderCouponTable/rejectedCouponTable";
import RiderReviewRequired from "./riderCouponTable/reviewReqCouponTable";
import RiderCouponUsageHistory from "./riderCouponTable/usageAgeHistory";
import CouponLayout from "../../layout/couponLayout";
import CreateNewCouponModal from "./modals/create-new-coupon-modal";
import "../../../modules/coupons/coupons.css";
import "../../../components/coupons/filterComponent/couponFilter.css";
import { clearReducerRiderCouponAction } from "../../../redux/actions/riderCoupon/clearCouponAction";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import * as riderCouponAction from "../../../redux/actions/riderCoupon/dropdownListAction";
import RiderCouponFilter from "../filterComponent/riderCouponFilter";
import { couponMainZoneListAction } from "../../../redux/actions/riderCoupon/createCouponAction";
import usePermissions from "../../usePermissionChecker";

const RiderCouponsComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [couponTab, setCouponTab] = useState("");
  const [createCouponShow, setCreateCouponShow] = useState(false);
  const handleCreateCouponClose = () => setCreateCouponShow(false);
  const handleCreateCouponShow = () => setCreateCouponShow(true);
  const [page, setPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const navBarList = [
    { label: "Review Required", value: "ReviewRequired" },
    { label: "Active", value: "Active" },
    { label: "Rejected", value: "Rejected" },
    { label: "Deleted", value: "Deleted" },
    { label: "Expired", value: "Expired" },
    { label: "Coupon Usage History", value: "CouponUsageHistory" },
  ];
  console.log(couponTab);

  useEffect(() => {
    setCouponTab(localStorage.getItem("CouponTab") ?? "ReviewRequired");
    if (location?.pathname === "/rider-coupons") {
      dispatch(clearReducerRiderCouponAction());
    }
  }, []);

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
  const [mainZoneList, setMainZoneList] = useState([]);
  const [totalList, setTotalList] = useState([]);
  useEffect(() => {
    dispatch(couponMainZoneListAction(onZoneListSuccess, onZoneListError));
  }, []);

  const onZoneListSuccess = (data) => {
    setMainZoneList(data?.data);
    setTotalList(
      data?.data?.map((item) => {
        return { zone_name: item?.zone_name, id: item?.id };
      })
    );
    console.log(data);
  };
  const onZoneListError = (data) => {
    console.log(data);
  };

  const option = {
    zone_name: "All",
    id: totalList
      ?.filter((item) => {
        return item.zone_name !== "All";
      })
      .map((item) => {
        return item?.zone_name;
      }),
  };

  useEffect(() => {
    const mzonelist = totalList.filter((item) => item.zone_name !== "All");
    mzonelist.push(option);
    setMainZoneList(mzonelist);
  }, [totalList]);

  console.log(mainZoneList,"vhghgcghvghvh");

  const [riderCouponDropDownList, setRiderCouponDropDownList] = useState({});
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    ReviewRequired: "rider_coupons_review_required",
    Active: "rider_coupons_active",
    Rejected: "rider_coupons_rejected",
    Deleted: "rider_coupons_deleted",
    Expired: "rider_coupons_expired",
    CouponUsageHistory: "rider_coupons_usage_history",
  };
  const permission = pagePermissions[couponTab];
  console.log(canRead(permission), "dadadsdadsdasd");

  const handleFetchDropDownList = () => {
    if (couponTab === "ReviewRequired") {
      dispatch(
        riderCouponAction?.dropDownListRiderCouponAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (couponTab === "Active") {
      dispatch(
        riderCouponAction?.dropDownListRiderCouponActiveAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (couponTab === "Rejected") {
      dispatch(
        riderCouponAction?.dropDownListRiderCouponRejectedAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (couponTab === "Deleted") {
      dispatch(
        riderCouponAction?.dropDownListRiderCouponDeletedAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (couponTab === "Expired") {
      dispatch(
        riderCouponAction?.dropDownListRiderCouponExpiredAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (couponTab === "CouponUsageHistory") {
      dispatch(
        riderCouponAction?.dropDownListRiderCouponUsageAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data);
    if (couponTab === "ReviewRequired") {
      setRiderCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_id)
              ?.filter((coupon_id) => Boolean(coupon_id))
          ),
        ].map((id) => ({ coupon_id: id })),
        coupon_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification)
              ?.filter((coupon_classification) =>
                Boolean(coupon_classification)
              )
          ),
        ].map((coupon_classification) => ({
          coupon_classification: coupon_classification,
        })),
        zone_name: mainZoneList,
        // zone: [...new Set(data?.data?.map((item) => item.ZoneName))],
        coupon_classification_details: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification_details)
              ?.filter((coupon_classification_details) =>
                Boolean(coupon_classification_details)
              )
          ),
        ].map((coupon_classification_details) => ({
          coupon_classification_details: coupon_classification_details,
        })),
        coupon_code: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
              ?.filter((coupon_code) => Boolean(coupon_code))
          ),
        ].map((coupon_code) => ({ coupon_code: coupon_code })),
        coupon_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_title)
              ?.filter((coupon_title) => Boolean(coupon_title))
          ),
        ].map((coupon_title) => ({ coupon_title: coupon_title })),
        created_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.created_at)
              ?.filter((created_at) => Boolean(created_at))
          ),
        ].map((created_at) => ({ created_at: created_at })),

        created_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.createdBy?.user_name)
              ?.filter((created_by) => Boolean(created_by))
          ),
        ].map((created_by) => ({
          created_by: created_by,
        })),
        coupon_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_status)
              ?.filter((coupon_status) => Boolean(coupon_status))
          ),
        ].map((coupon_status) => ({ coupon_status: coupon_status })),
        campaign_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.campaign_status)
              ?.filter((campaign_status) => Boolean(campaign_status))
          ),
        ].map((campaign_status) => ({ campaign_status: campaign_status })),
      });
    } else if (couponTab === "Active") {
      setRiderCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_id)
              ?.filter((coupon_id) => Boolean(coupon_id))
          ),
        ].map((id) => ({ coupon_id: id })),
        coupon_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification)
              ?.filter((coupon_classification) =>
                Boolean(coupon_classification)
              )
          ),
        ].map((coupon_classification) => ({
          coupon_classification: coupon_classification,
        })),
        coupon_classification_details: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification_details)
              ?.filter((coupon_classification_details) =>
                Boolean(coupon_classification_details)
              )
          ),
        ].map((coupon_classification_details) => ({
          coupon_classification_details: coupon_classification_details,
        })),
        zone_name: mainZoneList,
        coupon_code: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
              ?.filter((coupon_code) => Boolean(coupon_code))
          ),
        ].map((coupon_code) => ({ coupon_code: coupon_code })),
        coupon_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_title)
              ?.filter((coupon_title) => Boolean(coupon_title))
          ),
        ].map((coupon_title) => ({ coupon_title: coupon_title })),
        // created_at: [
        //   ...new Set(data?.data?.map((item) => item.created_at)?.filter((created_at) => Boolean(created_at))),
        // ].map((created_at) => ({ created_at: created_at })),

        // created_by: [
        //   ...new Set(data?.data?.map((item) => item?.createdBy?.user_name)),
        // ].map((created_by) => ({
        //   created_by: created_by,
        // })),
        coupon_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_status)
              ?.filter((coupon_status) => Boolean(coupon_status))
          ),
        ].map((coupon_status) => ({ coupon_status: coupon_status })),
        campaign_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.campaign_status)
              ?.filter((campaign_status) => Boolean(campaign_status))
          ),
        ].map((campaign_status) => ({ campaign_status: campaign_status })),
        start_date: [
          ...new Set(
            data?.data
              ?.map((item) => item.start_date)
              ?.filter((start_date) => Boolean(start_date))
          ),
        ].map((start_date) => ({ start_date: start_date })),
        expiry_date: [
          ...new Set(
            data?.data
              ?.map((item) => item.expiry_date)
              ?.filter((expiry_date) => Boolean(expiry_date))
          ),
        ].map((expiry_date) => ({ expiry_date: expiry_date })),
      });
    } else if (couponTab === "Rejected") {
      setRiderCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_id)
              ?.filter((coupon_id) => Boolean(coupon_id))
          ),
        ].map((id) => ({ coupon_id: id })),
        coupon_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification)
              ?.filter((coupon_classification) =>
                Boolean(coupon_classification)
              )
          ),
        ].map((coupon_classification) => ({
          coupon_classification: coupon_classification,
        })),
        coupon_classification_details: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification_details)
              ?.filter((coupon_classification_details) =>
                Boolean(coupon_classification_details)
              )
          ),
        ].map((coupon_classification_details) => ({
          coupon_classification_details: coupon_classification_details,
        })),
        zone_name: mainZoneList,
        coupon_code: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
              ?.filter((coupon_code) => Boolean(coupon_code))
          ),
        ].map((coupon_code) => ({ coupon_code: coupon_code })),
        coupon_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_title)
              ?.filter((coupon_title) => Boolean(coupon_title))
          ),
        ].map((coupon_title) => ({ coupon_title: coupon_title })),
        coupon_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_status)
              ?.filter((coupon_status) => Boolean(coupon_status))
          ),
        ].map((coupon_status) => ({ coupon_status: coupon_status })),
        rejected_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.rejected_at)
              ?.filter((rejected_at) => Boolean(rejected_at))
          ),
        ].map((rejected_at) => ({ rejected_at: rejected_at })),
        rejected_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.rejectedBy?.user_name)
              ?.filter((rejected_by) => Boolean(rejected_by))
          ),
        ].map((rejected_by) => ({ rejected_by: rejected_by })),
      });
    } else if (couponTab === "Deleted") {
      setRiderCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_id)
              ?.filter((coupon_id) => Boolean(coupon_id))
          ),
        ].map((id) => ({ coupon_id: id })),
        coupon_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification)
              ?.filter((coupon_classification) =>
                Boolean(coupon_classification)
              )
          ),
        ].map((coupon_classification) => ({
          coupon_classification: coupon_classification,
        })),
        coupon_classification_details: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification_details)
              ?.filter((coupon_classification_details) =>
                Boolean(coupon_classification_details)
              )
          ),
        ].map((coupon_classification_details) => ({
          coupon_classification_details: coupon_classification_details,
        })),
        zone_name: mainZoneList,
        coupon_code: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
              ?.filter((coupon_code) => Boolean(coupon_code))
          ),
        ].map((coupon_code) => ({ coupon_code: coupon_code })),
        coupon_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_title)
              ?.filter((coupon_title) => Boolean(coupon_title))
          ),
        ].map((coupon_title) => ({ coupon_title: coupon_title })),
        coupon_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_status)
              ?.filter((coupon_status) => Boolean(coupon_status))
          ),
        ].map((coupon_status) => ({ coupon_status: coupon_status })),
        deleted_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.deleted_at)
              ?.filter((deleted_at) => Boolean(deleted_at))
          ),
        ].map((deleted_at) => ({ deleted_at: deleted_at })),
        deleted_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.deletedBy?.user_name)
              ?.filter((deleted_by) => Boolean(deleted_by))
          ),
        ].map((deleted_by) => ({ deleted_by: deleted_by })),
      });
    } else if (couponTab === "Expired") {
      setRiderCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_id)
              ?.filter((coupon_id) => Boolean(coupon_id))
          ),
        ].map((id) => ({ coupon_id: id })),
        coupon_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification)
              ?.filter((coupon_classification) =>
                Boolean(coupon_classification)
              )
          ),
        ].map((coupon_classification) => ({
          coupon_classification: coupon_classification,
        })),
        coupon_classification_details: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification_details)
              ?.filter((coupon_classification_details) =>
                Boolean(coupon_classification_details)
              )
          ),
        ].map((coupon_classification_details) => ({
          coupon_classification_details: coupon_classification_details,
        })),
        zone_name: mainZoneList,
        coupon_code: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
              ?.filter((coupon_code) => Boolean(coupon_code))
          ),
        ].map((coupon_code) => ({ coupon_code: coupon_code })),
        coupon_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_title)
              ?.filter((coupon_title) => Boolean(coupon_title))
          ),
        ].map((coupon_title) => ({ coupon_title: coupon_title })),
        coupon_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_status)
              ?.filter((coupon_status) => Boolean(coupon_status))
          ),
        ].map((coupon_status) => ({ coupon_status: coupon_status })),
        expired_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.expired_at)
              ?.filter((expired_at) => Boolean(expired_at))
          ),
        ].map((expired_at) => ({ expired_at: expired_at })),
      });
    } else if (couponTab === "CouponUsageHistory") {
      setRiderCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_id)
              ?.filter((coupon_id) => Boolean(coupon_id))
          ),
        ].map((id) => ({ coupon_id: id })),
        coupon_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification)
              ?.filter((coupon_classification) =>
                Boolean(coupon_classification)
              )
          ),
        ].map((coupon_classification) => ({
          coupon_classification: coupon_classification,
        })),
        coupon_classification_details: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_classification_details)
              ?.filter((coupon_classification_details) =>
                Boolean(coupon_classification_details)
              )
          ),
        ].map((coupon_classification_details) => ({
          coupon_classification_details: coupon_classification_details,
        })),
        // item?.ZoneName?.map((user) => user?.zone_name)}
        // zone_name: mainZoneList,
        coupon_code: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
              ?.filter((coupon_code) => Boolean(coupon_code))
          ),
        ].map((coupon_code) => ({ coupon_code: coupon_code })),
        coupon_title: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_title)
              ?.filter((coupon_title) => Boolean(coupon_title))
          ),
        ].map((coupon_title) => ({ coupon_title: coupon_title })),
        coupon_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_status)
              ?.filter((coupon_status) => Boolean(coupon_status))
          ),
        ].map((coupon_status) => ({ coupon_status: coupon_status })),
        coupon_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_type)
              ?.filter((coupon_type) => Boolean(coupon_type))
          ),
        ].map((coupon_type) => ({ coupon_type: coupon_type })),
      });
    }
  };
  console.log(riderCouponDropDownList);
  const onDropDownListError = (data) => {
    console.log(data?.data);
  };
  console.log(search);

  const buttonList = [
    <>
      {canRead(permission) && (
        <div className="d-flex justify-content-end">
          <button
            className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
            type="button"
            onClick={() => {
              handleFetchDropDownList();
            }}
          >
            <i className="ri-filter-3-line primary_color pe-2" />
            <span className={`fs_14 fw_600 primary_color ps-1`}>
              Add Filter
            </span>
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
        </div>
      )}
    </>,
  ];
  console.log(search);

  return (
    <div className="position-relative">
      <CreateNewCouponModal
        createCouponShow={createCouponShow}
        handleCreateCouponClose={handleCreateCouponClose}
      />
      <CouponLayout
        navBarList={navBarList}
        couponTab={couponTab}
        setCouponTab={setCouponTab}
        createName="Create New Coupon"
        onClickFn={() => handleCreateCouponShow()}
        mainHeading="Rider Coupons"
        localStorageitem="CouponTab"
        buttons={buttonList}
        onTabChange={() => {
          handleSearch("");
          setShowFilter(false);
        }}
        maintype={"riderCoupon"}
      >
        <div className="position-relative">
          {showFilter ? (
            <div className="filter_container position-absolute">
              <RiderCouponFilter
                filter={handleSearch}
                search={search}
                handleFilterClose={handleFilterClose}
                riderCouponDropDownList={riderCouponDropDownList}
                type={couponTab}
              />
            </div>
          ) : (
            <></>
          )}
          {couponTab === "ReviewRequired" && (
            <RiderReviewRequired search={search} />
          )}
          {couponTab === "Active" && <RiderCouponsActive search={search} />}
          {couponTab === "Rejected" && <RiderCouponsRejected search={search} />}
          {couponTab === "Deleted" && <RiderCouponsDeleted search={search} />}
          {couponTab === "Expired" && <RiderCouponsExpired search={search} />}
          {couponTab === "CouponUsageHistory" && (
            <RiderCouponUsageHistory search={search} />
          )}
        </div>
      </CouponLayout>
    </div>
  );
};

export default RiderCouponsComponent;
