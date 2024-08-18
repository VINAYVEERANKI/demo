import React, { useEffect, useState } from "react";
import CouponLayout from "../../layout/couponLayout";
import Layout from "../../layout/layout";
import CreateDriverReferralModal from "./createDriverReferralModal";
import ReferralActiveMainPage from "../referralTable/activeMainTable";
import ReferralDeletedMainTable from "../referralTable/deletedMainTable";
import ReferralExpiredMainTable from "../referralTable/expiredMainTable";
import ReferralRejectMainTable from "../referralTable/rejectMainTable";
import ReferralReviewMainPage from "../referralTable/review-required";
import ReferralUsageHistoryMainTable from "../referralTable/usageHistoryMainTable";
import { clearReducerDriverReferralAction } from "../../../redux/actions/referrals/createreferralAction";
import { useDispatch } from "react-redux";
import * as referralAction from "../../../redux/actions/referrals/dropdownListAction";
import ReferralFilter from "../referralFilter";
import usePermissions from "../../usePermissionChecker";

const DriverReferralComponent = ({ location }) => {
  const dispatch = useDispatch();
  const [driverReferralTab, setDriverReferralTab] = useState("");
  const [createDriverRefShow, setCreateDriverRefShow] = useState(false);
  const handleCreateDriverRefClose = () => setCreateDriverRefShow(false);
  const handleCreateDriverRefShow = () => setCreateDriverRefShow(true);
  const [page, setPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  useEffect(() => {
    setDriverReferralTab(
      localStorage.getItem("driverReferralTab") ?? "ReviewRequired"
    );
    if (location?.pathname === "/driver-referral") {
      dispatch(clearReducerDriverReferralAction());
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

  const [driverReferralDropDownList, setDriverReferralDropDownList] = useState(
    {}
  );

  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    ReviewRequired: "driver_referrals_review_required",
    Active: "driver_referrals_active",
    Rejected: "driver_referrals_rejected",
    Deleted: "driver_referrals_deleted",
    Expired: "driver_referrals_expired",
    SenderHistory: "driver_referrals_usage_history",
    ReceiverHistory: "driver_referrals_usage_history",
  };
  const permission = pagePermissions[driverReferralTab];
  console.log(canRead(permission), "dadadsdadsdasd");

  const handleFetchDropDownList = () => {
    if (driverReferralTab === "ReviewRequired") {
      dispatch(
        referralAction?.dropDownListDriverReferralAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverReferralTab === "Active") {
      dispatch(
        referralAction?.dropDownListDriverReferralActiveAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverReferralTab === "Rejected") {
      dispatch(
        referralAction?.dropDownListDriverReferralRejectedAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverReferralTab === "Deleted") {
      dispatch(
        referralAction?.dropDownListDriverReferralDeletedAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (driverReferralTab === "Expired") {
      dispatch(
        referralAction?.dropDownListDriverReferralExpiredAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    } else if (
      driverReferralTab === "SenderHistory" ||
      driverReferralTab === "ReceiverHistory"
    ) {
      dispatch(
        referralAction?.dropDownListDriverReferralUsageAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      );
    }
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data);
    if (driverReferralTab === "ReviewRequired") {
      setDriverReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_code)
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
              ?.filter((coupon_code) => Boolean(coupon_code))
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
    } else if (driverReferralTab === "Active") {
      setDriverReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_code)
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
              ?.filter((coupon_code) => Boolean(coupon_code))
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
    } else if (driverReferralTab === "Rejected") {
      setDriverReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_code)
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
              ?.filter((coupon_code) => Boolean(coupon_code))
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
    } else if (driverReferralTab === "Deleted") {
      setDriverReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_code)
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
              ?.filter((coupon_code) => Boolean(coupon_code))
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
    } else if (driverReferralTab === "Expired") {
      setDriverReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_code)
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
              ?.filter((coupon_code) => Boolean(coupon_code))
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
      driverReferralTab === "SenderHistory" ||
      driverReferralTab === "ReceiverHistory"
    ) {
      setDriverReferralDropDownList({
        referral_id: [
          ...new Set(
            data?.data
              ?.map((item) => item.referral_code)
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
              ?.filter((coupon_code) => Boolean(coupon_code))
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
                driverReferralTab === "SenderHistory"
                  ? item?.sender_coupon_type
                  : driverReferralTab === "ReceiverHistory"
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
  console.log(driverReferralDropDownList);
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
    <>
      <CreateDriverReferralModal
        createDriverRefShow={createDriverRefShow}
        handleCreateDriverRefClose={handleCreateDriverRefClose}
      />
      <CouponLayout
        mainHeading="Driver Referral"
        navBarList={navBarList}
        couponTab={driverReferralTab}
        setCouponTab={setDriverReferralTab}
        createName="Create New Referral"
        onClickFn={() => handleCreateDriverRefShow()}
        localStorageitem="driverReferralTab"
        buttons={buttonList}
        onTabChange={() => {
          handleSearch("");
          setShowFilter(false);
        }}
        maintype={"driverReferral"}
      >
        <div className="position-relative">
          {showFilter ? (
            <div className="filter_container position-absolute">
              <ReferralFilter
                filter={handleSearch}
                search={search}
                handleFilterClose={handleFilterClose}
                referralDropDownList={driverReferralDropDownList}
                type={driverReferralTab}
              />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="">
          {driverReferralTab === "ReviewRequired" && (
            <ReferralReviewMainPage type={"driverReferral"} search={search} />
          )}
          {driverReferralTab === "Active" && (
            <ReferralActiveMainPage type={"driverReferral"} search={search} />
          )}
          {driverReferralTab === "Rejected" && (
            <ReferralRejectMainTable type={"driverReferral"} search={search} />
          )}
          {driverReferralTab === "Deleted" && (
            <ReferralDeletedMainTable type={"driverReferral"} search={search} />
          )}
          {driverReferralTab === "Expired" && (
            <ReferralExpiredMainTable type={"driverReferral"} search={search} />
          )}
          {driverReferralTab === "SenderHistory" && (
            <ReferralUsageHistoryMainTable
              tableType={"SenderHistory"}
              type={"driverReferral"}
              search={search}
            />
          )}
          {driverReferralTab === "ReceiverHistory" && (
            <ReferralUsageHistoryMainTable
              tableType={"ReceiverHistory"}
              type={"driverReferral"}
              search={search}
            />
          )}
        </div>
      </CouponLayout>
    </>
  );
};
export default DriverReferralComponent;
