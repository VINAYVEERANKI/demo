import React, { useEffect, useState } from "react";
import CouponLayout from "../../layout/couponLayout";
import ReferralCreateModal from "./create-modal";
import ReferralReviewMainPage from "../referralTable/review-required";
import ReferralActiveMainPage from "../referralTable/activeMainTable";
import ReferralRejectMainTable from "../referralTable/rejectMainTable";
import ReferralDeletedMainTable from "../referralTable/deletedMainTable";
import ReferralExpiredMainTable from "../referralTable/expiredMainTable";
import ReferralUsageHistoryMainTable from "../referralTable/usageHistoryMainTable";
import { useDispatch } from "react-redux";
import { clearReducerRiderReferralAction } from "../../../redux/actions/referrals/createreferralAction";
import * as riderReferralAction from "../../../redux/actions/referrals/dropdownListAction";
import ReferralFilter from "../referralFilter";
import usePermissions from "../../usePermissionChecker";

const RiderReferralComponent = ({ location }) => {
  const dispatch = useDispatch();
  const [riderReferralTab, setRiderReferralTab] = useState("");
  const [createReferralShow, setCreateReferralShow] = useState(false);
  const handleCreateReferralClose = () => setCreateReferralShow(false);
  const handleCreateReferralShow = () => setCreateReferralShow(true);
  const [page, setPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  useEffect(() => {
    setRiderReferralTab(
      localStorage.getItem("riderReferralTab") ?? "ReviewRequired"
    );
    if (location?.pathname === "/rider-referral") {
      dispatch(clearReducerRiderReferralAction());
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
    { label: "Sender History", value: "SenderHistory" },
    { label: "Receiver History", value: "ReceiverHistory" },
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

  const [riderReferralDropDownList, setRiderReferralDropDownList] = useState(
    {}
  );

  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    ReviewRequired: "rider_referrals_review_required",
    Active: "rider_referrals_active",
    Rejected: "rider_coupons_rejected",
    Deleted: "rider_coupons_deleted",
    Expired: "rider_coupons_expired",
    SenderHistory: "rider_coupons_usage_history",
    ReceiverHistory:"rider_coupons_usage_history"
  };
  const permission = pagePermissions[riderReferralTab];

  const handleFetchDropDownList = () => {
    if (riderReferralTab === "ReviewRequired") {
      dispatch(
        riderReferralAction?.dropDownListRiderReferralAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (riderReferralTab === "Active") {
      dispatch(
        riderReferralAction?.dropDownListRiderReferralActiveAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (riderReferralTab === "Rejected") {
      dispatch(
        riderReferralAction?.dropDownListRiderReferralRejectedAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (riderReferralTab === "Deleted") {
      dispatch(
        riderReferralAction?.dropDownListRiderReferralDeletedAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (riderReferralTab === "Expired") {
      dispatch(
        riderReferralAction?.dropDownListRiderReferralExpiredAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (
      riderReferralTab === "SenderHistory" ||
      riderReferralTab === "ReceiverHistory"
    ) {
      dispatch(
        riderReferralAction?.dropDownListRiderReferralUsageAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data);
    if (riderReferralTab === "ReviewRequired") {
      setRiderReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_id)
              ?.filter((referral_id) => Boolean(referral_id))
          ),
        ].map((id) => ({ referral_id: id })),
        referral_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_classification)
              ?.filter((referral_classification) =>
                Boolean(referral_classification)
              )
          ),
        ].map((referral_classification) => ({
          referral_classification: referral_classification,
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
        referral_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_status)
              ?.filter((referral_status) => Boolean(referral_status))
          ),
        ].map((referral_status) => ({ referral_status: referral_status })),
        campaign_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.campaign_status)
              ?.filter((campaign_status) => Boolean(campaign_status))
          ),
        ].map((campaign_status) => ({ campaign_status: campaign_status })),
      });
    } else if (riderReferralTab === "Active") {
      setRiderReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_id)
              ?.filter((referral_id) => Boolean(referral_id))
          ),
        ].map((id) => ({ referral_id: id })),
        referral_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_classification)
              ?.filter((referral_classification) =>
                Boolean(referral_classification)
              )
          ),
        ].map((referral_classification) => ({
          referral_classification: referral_classification,
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
        referral_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_status)
              ?.filter((referral_status) => Boolean(referral_status))
          ),
        ].map((referral_status) => ({ referral_status: referral_status })),
        campaign_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.campaign_status)
              ?.filter((campaign_status) => Boolean(campaign_status))
          ),
        ].map((campaign_status) => ({ campaign_status: campaign_status })),
        approved_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.approved_at)
              ?.filter((approved_at) => Boolean(approved_at))
          ),
        ].map((approved_at) => ({ approved_at: approved_at })),
        approved_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.approvedBy?.user_name)
              ?.filter((approved_by) => Boolean(approved_by))
          ),
        ].map((approved_by) => ({ approved_by: approved_by })),
      });
    } else if (riderReferralTab === "Rejected") {
      setRiderReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_id)
              ?.filter((referral_id) => Boolean(referral_id))
          ),
        ].map((id) => ({ referral_id: id })),
        referral_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_classification)
              ?.filter((referral_classification) =>
                Boolean(referral_classification)
              )
          ),
        ].map((referral_classification) => ({
          referral_classification: referral_classification,
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
        referral_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_status)
              ?.filter((referral_status) => Boolean(referral_status))
          ),
        ].map((referral_status) => ({ referral_status: referral_status })),
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
    } else if (riderReferralTab === "Deleted") {
      setRiderReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_id)
              ?.filter((referral_id) => Boolean(referral_id))
          ),
        ].map((id) => ({ referral_id: id })),
        referral_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_classification)
              ?.filter((referral_classification) =>
                Boolean(referral_classification)
              )
          ),
        ].map((referral_classification) => ({
          referral_classification: referral_classification,
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
        referral_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_status)
              ?.filter((referral_status) => Boolean(referral_status))
          ),
        ].map((referral_status) => ({ referral_status: referral_status })),
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
    } else if (riderReferralTab === "Expired") {
      setRiderReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_id)
              ?.filter((referral_id) => Boolean(referral_id))
          ),
        ].map((id) => ({ referral_id: id })),
        referral_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_classification)
              ?.filter((referral_classification) =>
                Boolean(referral_classification)
              )
          ),
        ].map((referral_classification) => ({
          referral_classification: referral_classification,
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
        referral_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_status)
              ?.filter((referral_status) => Boolean(referral_status))
          ),
        ].map((referral_status) => ({ referral_status: referral_status })),
        expired_at: [
          ...new Set(
            data?.data
              ?.map((item) => item.expired_at)
              ?.filter((expired_at) => Boolean(expired_at))
          ),
        ].map((expired_at) => ({ expired_at: expired_at })),
      });
    } else if (
      riderReferralTab === "SenderHistory" ||
      riderReferralTab === "ReceiverHistory"
    ) {
      setRiderReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_id)
              ?.filter((referral_id) => Boolean(referral_id))
          ),
        ].map((id) => ({ referral_id: id })),
        referral_classification: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_classification)
              ?.filter((referral_classification) =>
                Boolean(referral_classification)
              )
          ),
        ].map((referral_classification) => ({
          referral_classification: referral_classification,
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
        referral_status: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_status)
              ?.filter((referral_status) => Boolean(referral_status))
          ),
        ].map((referral_status) => ({ referral_status: referral_status })),
        coupon_type: [
          ...new Set(
            data?.data
              ?.map((item) =>
                riderReferralTab === "SenderHistory"
                  ? item?.sender_coupon_type
                  : riderReferralTab === "ReceiverHistory"
                  ? item?.receiver_coupon_type
                  : ""
              )
              ?.filter((coupon_type) => Boolean(coupon_type))
          ),
        ].map((coupon_type) => ({
          coupon_type: coupon_type,
        })),
        created_by: [
          ...new Set(
            data?.data
              ?.map((item) => item?.createdBy?.user_name)
              ?.filter((created_by) => Boolean(created_by))
          ),
        ].map((created_by) => ({
          created_by: created_by,
        })),
      });
    }
  };
  console.log(riderReferralDropDownList);
  const onDropDownListError = (data) => {
    console.log(data?.data);
  };
  console.log(search);

  const buttonList = [
    <>{canRead(permission) && 
      <div className="d-flex justify-content-end">
        <button
          className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
          type="button"
          onClick={() => {
            handleFetchDropDownList();
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
      </div>}
    </>,
  ];
  console.log(search);

  return (
    <>
      <ReferralCreateModal
        createReferralShow={createReferralShow}
        handleCreateReferralClose={handleCreateReferralClose}
      />
      <CouponLayout
        mainHeading="Rider Referral"
        navBarList={navBarList}
        couponTab={riderReferralTab}
        setCouponTab={setRiderReferralTab}
        createName="Create New Referral"
        onClickFn={() => handleCreateReferralShow()}
        localStorageitem="riderReferralTab"
        buttons={buttonList}
        onTabChange={() => {
          handleSearch("");
          setShowFilter(false);
        }}
        maintype={"riderReferral"}
      >
        <div className="position-relative">
          {showFilter ? (
            <div className="filter_container position-absolute">
              <ReferralFilter
                filter={handleSearch}
                search={search}
                handleFilterClose={handleFilterClose}
                referralDropDownList={riderReferralDropDownList}
                type={riderReferralTab}
              />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="">
          {riderReferralTab === "ReviewRequired" && (
            <ReferralReviewMainPage type={"riderReferral"} search={search} />
          )}
          {riderReferralTab === "Active" && (
            <ReferralActiveMainPage type={"riderReferral"} search={search} />
          )}
          {riderReferralTab === "Rejected" && (
            <ReferralRejectMainTable type={"riderReferral"} search={search} />
          )}
          {riderReferralTab === "Deleted" && (
            <ReferralDeletedMainTable type={"riderReferral"} search={search} />
          )}
          {riderReferralTab === "Expired" && (
            <ReferralExpiredMainTable type={"riderReferral"} search={search} />
          )}
          {riderReferralTab === "SenderHistory" && (
            <ReferralUsageHistoryMainTable
              tableType={"SenderHistory"}
              type={"riderReferral"}
              search={search}
            />
          )}
          {riderReferralTab === "ReceiverHistory" && (
            <ReferralUsageHistoryMainTable
              tableType={"ReceiverHistory"}
              type={"riderReferral"}
              search={search}
            />
          )}
        </div>
      </CouponLayout>
    </>
  );
};
export default RiderReferralComponent;
