import React, { useEffect, useState } from "react";
import CreateDriverCouponsModal from "./createDriverCouponsModal";
import ActiveDriverCouponTable from "./driverCouponTable/activeCouponTable";
import DriverCouponUsageHistoryMainTable from "./driverCouponTable/couponUsageHistoryMainTable";
import DeletedDriverCouponTable from "./driverCouponTable/deletedCouponTable";
import ExpiredDriverCouponTable from "./driverCouponTable/expiredCouponTable";
import RejectedDriverCouponTable from "./driverCouponTable/rejectCouponTable";
import DriverCouponReviewReqTable from "./driverCouponTable/reviewRequiredTable";
import CouponLayout from "../../layout/couponLayout";
import { clearReducerDriverCouponAction } from "../../../redux/actions/riderCoupon/clearCouponAction";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import * as driverCouponAction from "../../../redux/actions/driverCouponAction";
import { couponMainZoneListAction } from "../../../redux/actions/riderCoupon/createCouponAction";
import DriverCouponFilter from "../filterComponent/driverCouponFilter";
import usePermissions from "../../usePermissionChecker";

const DriverCouponComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [driverCouponTab, setDriverCouponTab] = useState("");
  const [createCouponShow, setCreateCouponShow] = useState(false);
  const handleCreateCouponClose = () => setCreateCouponShow(false);
  const handleCreateCouponShow = () => setCreateCouponShow(true);
  const [page, setPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  useEffect(() => {
    setDriverCouponTab(
      localStorage.getItem("DriverCouponTab") ?? "ReviewRequired"
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
    { label: "Coupon Usage History", value: "CouponUsageHistory" },
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

  const [driverCouponDropDownList, setDriverCouponDropDownList] = useState({});
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    ReviewRequired: "driver_coupons_review_required",
    Active: "driver_coupons_active",
    Rejected: "driver_coupons_rejected",
    Deleted: "driver_coupons_deleted",
    Expired: "driver_coupons_expired",
    CouponUsageHistory: "driver_coupons_usage_history",
  };
  const permission = pagePermissions[driverCouponTab];
  console.log(canRead(permission), "dadadsdadsdasd");

  const handleFetchDropDownList = () => {
    if (driverCouponTab === "ReviewRequired") {
      dispatch(
        driverCouponAction?.dropDownListDriverCouponAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverCouponTab === "Active") {
      dispatch(
        driverCouponAction?.dropDownListDriverCouponActiveAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverCouponTab === "Rejected") {
      dispatch(
        driverCouponAction?.dropDownListDriverCouponRejectedAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverCouponTab === "Deleted") {
      dispatch(
        driverCouponAction?.dropDownListDriverCouponDeletedAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverCouponTab === "Expired") {
      dispatch(
        driverCouponAction?.dropDownListDriverCouponExpiredAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverCouponTab === "CouponUsageHistory") {
      dispatch(
        driverCouponAction?.dropDownListDriverCouponUsageAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data);
    if (driverCouponTab === "ReviewRequired") {
      setDriverCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
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
        coupon_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_type)
              ?.filter((coupon_type) => Boolean(coupon_type))
          ),
        ].map((coupon_type) => ({ coupon_type: coupon_type })),
        created_at: [
          ...new Set(data?.data?.map((item) => item.created_at)),
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
    } else if (driverCouponTab === "Active") {
      setDriverCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
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
        coupon_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_type)
              ?.filter((coupon_type) => Boolean(coupon_type))
          ),
        ].map((coupon_type) => ({
          coupon_type: coupon_type,
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
    } else if (driverCouponTab === "Rejected") {
      setDriverCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
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
        coupon_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_type)
              ?.filter((coupon_type) => Boolean(coupon_type))
          ),
        ].map((coupon_type) => ({
          coupon_type: coupon_type,
        })),

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
    } else if (driverCouponTab === "Deleted") {
      setDriverCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
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
        coupon_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_type)
              ?.filter((coupon_type) => Boolean(coupon_type))
          ),
        ].map((coupon_type) => ({
          coupon_type: coupon_type,
        })),
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
    } else if (driverCouponTab === "Expired") {
      setDriverCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
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
        coupon_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_type)
              ?.filter((coupon_type) => Boolean(coupon_type))
          ),
        ].map((coupon_type) => ({ coupon_type: coupon_type })),
        expired_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.expired_at)
              ?.filter((expired_at) => Boolean(expired_at))
          ),
        ].map((expired_at) => ({ expired_at: expired_at })),
      });
    } else if (driverCouponTab === "CouponUsageHistory") {
      setDriverCouponDropDownList({
        coupon_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_code)
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
        coupon_type: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_type)
              ?.filter((coupon_type) => Boolean(coupon_type))
          ),
        ].map((coupon_type) => ({ coupon_type: coupon_type })),
        coupon_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.coupon_status)
              ?.filter((coupon_status) => Boolean(coupon_status))
          ),
        ].map((coupon_status) => ({ coupon_status: coupon_status })),
      });
    }
  };
  console.log(driverCouponDropDownList);
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
      <CreateDriverCouponsModal
        createCouponShow={createCouponShow}
        handleCreateCouponClose={handleCreateCouponClose}
      />

      <CouponLayout
        navBarList={navBarList}
        couponTab={driverCouponTab}
        setCouponTab={setDriverCouponTab}
        createName="Create New Coupon"
        onClickFn={() => handleCreateCouponShow()}
        mainHeading="Driver Coupons"
        localStorageitem="DriverCouponTab"
        buttons={buttonList}
        onTabChange={() => {
          handleSearch("");
          setShowFilter(false);
        }}
        maintype={"driverCoupon"}
      >
        <div className="position-relative">
          {showFilter ? (
            <div className="filter_container position-absolute">
              <DriverCouponFilter
                filter={handleSearch}
                search={search}
                handleFilterClose={handleFilterClose}
                driverCouponDropDownList={driverCouponDropDownList}
                type={driverCouponTab}
              />
            </div>
          ) : (
            <></>
          )}
        </div>

        {driverCouponTab === "ReviewRequired" && (
          <DriverCouponReviewReqTable search={search} />
        )}
        {driverCouponTab === "Active" && (
          <ActiveDriverCouponTable search={search} />
        )}
        {driverCouponTab === "Rejected" && (
          <RejectedDriverCouponTable search={search} />
        )}
        {driverCouponTab === "Deleted" && (
          <DeletedDriverCouponTable search={search} />
        )}
        {driverCouponTab === "Expired" && (
          <ExpiredDriverCouponTable search={search} />
        )}
        {driverCouponTab === "CouponUsageHistory" && (
          <DriverCouponUsageHistoryMainTable search={search} />
        )}
      </CouponLayout>
    </div>
  );
};
export default DriverCouponComponent;
