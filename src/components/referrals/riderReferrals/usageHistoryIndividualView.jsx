import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  driverRefRecevierUsageHistoryAction,
  riderRefRecevierFindOneUsageHisAction,
} from "../../../redux/actions/referrals/receiverHistoryAction";
import {
  driverRefSenderUsageHistoryAction,
  riderRefSenderFindOneUsageHistoryAction,
} from "../../../redux/actions/referrals/senderHistoryAction";
import ReceiverHistoryIndividualTable from "../../similarTables/referrals&Coupons/recieverHistoryTable";
import UsageHistoryIndividualTable from "../../similarTables/referrals&Coupons/usageHistoryIndividualTable";
import errorToast from "../../utilits/errorToast";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { useExpiryDate } from "../../helper";

const RiderReferralusageHistoryView = ({
  params,
  referralType = "",
  coupon_type,
  type = "",
  referral_classification,
}) => {
  const dispatch = useDispatch();

  console.log(coupon_type);

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [couponUsageDetails, setCouponUsageDetails] = useState({
    couponUsagedata: {},
    couponUsageTableData: [],
  });

  console.log(couponUsageDetails, "lsfasl");
  useEffect(() => {
    if (type === "driverReferral") {
      if (referralType === "senderReferral") {
        setLoading(true);
        dispatch(
          driverRefSenderUsageHistoryAction(
            {
              referral_id: params,
              search: {
                deposite_date: "",
                deposite_time: "",
              },
            },
            page,
            onSuccess,
            onError
          )
        );
      } else if (referralType === "receiverReferral") {
        setLoading(true);
        dispatch(
          driverRefRecevierUsageHistoryAction(
            {
              referral_id: params,
              search: {
                used_date: "",
              },
            },
            page,
            onSuccess,
            onError
          )
        );
      }
    } else {
      if (referralType === "senderReferral") {
        setLoading(true);
        dispatch(
          riderRefSenderFindOneUsageHistoryAction(
            {
              referral_id: params,
              search: {
                deposite_date: "",
                deposite_time: "",
              },
            },
            page,
            onSuccess,
            onError
          )
        );
      } else if (referralType === "receiverReferral") {
        setLoading(true);
        dispatch(
          riderRefRecevierFindOneUsageHisAction(
            {
              referral_id: params,
              search: {
                used_date: "",
              },
            },
            page,
            onSuccess,
            onError
          )
        );
      }
    }
  }, [page, search, referralType]);

  const onSuccess = (data) => {
    setError(false);
    setLoading(false);
    console.log(data);
    console.log(data?.data?.data);
    setCouponUsageDetails({
      couponUsagedata: data?.data?.data,
      couponUsageTableData:
        type === "driverReferral" && referralType === "senderReferral"
          ? data?.data?.data?.driver_referral_sender_usages
          : type === "driverReferral" && referralType === "receiverReferral"
          ? data?.data?.data?.driver_referral_reciver_usages
          : type === "riderReferral" && referralType === "senderReferral"
          ? data?.data?.data?.rider_referral_sender_usages
          : type === "riderReferral" && referralType === "receiverReferral"
          ? data?.data?.data?.rider_referral_reciver_usages
          : [],

      // referralType === "senderReferral"
      //   ? data?.data?.data?.rider_referral_sender_usages
      //   : data?.data?.data?.rider_referral_reciver_usages,
    });
  };
  const onError = (data) => {
    setLoading(false);
    setError(true);
    errorToast(data?.data?.data);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  console.log(couponUsageDetails?.couponUsagedata);
  const expiryDate = useExpiryDate(
    couponUsageDetails?.couponUsagedata?.coupon_life_span,
    couponUsageDetails?.couponUsagedata?.expiry_date,
    couponUsageDetails?.couponUsagedata?.expiry_time
  );

  const senderCouponDetails = [
    {
      label: "Referral ID",
      values:
        couponUsageDetails?.couponUsagedata?.referral_id ??
        couponUsageDetails?.couponUsagedata?.referral_code ??
        "--",
    },
    {
      label: "Referral Classification",
      values:
        couponUsageDetails?.couponUsagedata?.referral_classification ?? "--",
    },
    {
      label: "Coupon Type",
      values: couponUsageDetails?.couponUsagedata?.sender_coupon_type ?? "--",
    },
    {
      label: "Current Balance Deposit Amount (₹)*",
      values: couponUsageDetails?.couponUsagedata?.sender_cb_deposite_amount
        ? parseFloat(
            couponUsageDetails?.couponUsagedata?.sender_cb_deposite_amount
          ).toFixed(2)
        : "--",
    },
    {
      label: "Required Rides(Completed By Receiver)*",
      values:
        couponUsageDetails?.couponUsagedata
          ?.required_rides_completed_by_receiver ?? "--",
    },
    {
      label: "Accounts Availed",
      values: couponUsageDetails?.couponUsagedata?.accounts_availed ?? "--",
    },
    {
      label: "Coupon Exp",
      values: expiryDate ? expiryDate.join(", ") : "--",
    },
  ];

  const recieverCouponDetails = [
    {
      label: "Referral ID",
      values:
        couponUsageDetails?.couponUsagedata?.referral_id ??
        couponUsageDetails?.couponUsagedata?.referral_code ??
        "--",
    },
    {
      label: "Referral Classification",
      values:
        couponUsageDetails?.couponUsagedata?.referral_classification ?? "--",
    },
    {
      label: "Coupon Code",
      values: couponUsageDetails?.couponUsagedata?.coupon_code ?? "N/A",
    },
    {
      label: "Coupon Type",
      values: couponUsageDetails?.couponUsagedata?.receiver_coupon_type ?? "--",
    },

    {
      label: "Usage Limit Per Account",
      values:
        couponUsageDetails?.couponUsagedata?.usage_limit_per_account ?? "--",
    },
    {
      label: "Accounts Availed",
      values: couponUsageDetails?.couponUsagedata?.accounts_availed ?? "--",
    },
    {
      label: "Total Coupons Used",
      values: couponUsageDetails?.couponUsagedata?.total_coupon_used ?? "--",
    },
    {
      label: "Coupon Exp",
      values: expiryDate ? expiryDate.join(", ") : "--",
    },
  ];
  const couponUsageData = couponUsageDetails?.couponUsagedata;

  let label,
    values = [];

  if (coupon_type === "X%DiscountUpToY") {
    label = "% Discount";
    values = [
      {
        label: label,
        values: couponUsageData?.discount
          ? `${parseFloat(couponUsageData.discount).toFixed(2)} %`
          : "--",
      },
      {
        label: "Max Amount In Rs (₹)",
        values: couponUsageData?.max_amount_in_rs
          ? parseFloat(couponUsageData.max_amount_in_rs).toFixed(2)
          : "--",
      },
    ];
  } else if (coupon_type === "X%CashbackUpToY") {
    label = "% Cashback";
    values = [
      {
        label: label,
        values: couponUsageData?.cashback
          ? `${parseFloat(couponUsageData.cashback).toFixed(2)} %`
          : "--",
      },
      {
        label: "Max Cashback In Rs (₹)",
        values: couponUsageData?.max_amount_in_rs
          ? parseFloat(couponUsageData.max_amount_in_rs).toFixed(2)
          : "--",
      },
    ];
  } else if (coupon_type === "XAmountOff") {
    label = "Amount Off";
    values = [
      {
        label: label,
        values: couponUsageData?.discount
          ? `${parseFloat(couponUsageData.discount).toFixed(2)} %`
          : "--",
      },
    ];
  }

  recieverCouponDetails.splice(4, 0, ...values);

  const recieverCouponDtoDDetails = [
    {
      label: "Referral ID",
      values:
        couponUsageDetails?.couponUsagedata?.referral_id ??
        couponUsageDetails?.couponUsagedata?.referral_code ??
        "--",
    },
    {
      label: "Referral Classification",
      values:
        couponUsageDetails?.couponUsagedata?.referral_classification ?? "--",
    },
    {
      label: "Coupon Type",
      values: couponUsageDetails?.couponUsagedata?.receiver_coupon_type ?? "--",
    },
    {
      label: "Current Balance Deposit Amount (₹)*",
      values: couponUsageDetails?.couponUsagedata?.receiver_cb_deposite_amount
        ? parseFloat(
            couponUsageDetails?.couponUsagedata?.receiver_cb_deposite_amount
          ).toFixed(2)
        : "--",
    },
    {
      label: "Accounts Availed",
      values: couponUsageDetails?.couponUsagedata?.accounts_availed ?? "--",
    },
    {
      label: "Coupon Exp",
      values: expiryDate ? expiryDate.join(", ") : "--",
    },
  ];

  const couponDataFn = () => {
    if (referralType === "senderReferral") {
      return senderCouponDetails;
    } else if (
      referralType === "receiverReferral" &&
      referral_classification !== "DriverToDriverReferral" &&
      coupon_type !== "CurrentBalanceDeposit"
    ) {
      return recieverCouponDetails;
    } else if (
      referralType === "receiverReferral" &&
      (referral_classification === "DriverToDriverReferral" ||
        (referral_classification === "RiderToRiderReferral" &&
          coupon_type === "CurrentBalanceDeposit"))
    ) {
      return recieverCouponDtoDDetails;
    }
  };

  const couponDetails = couponDataFn();

  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <div className="row mt-2">
            {Array.from(
              { length: Math.ceil(couponDetails?.length / 3) },
              (_, i) => (
                <div
                  className={`col-12 col-md-6 ${
                    referralType === "senderReferral" ? "col-lg-4 col-md-6 col-12" : "col-lg-4 col-md-6 col-12"
                  }  fs_15`}
                  key={i}
                >
                  {couponDetails?.slice(i * 3, i * 3 + 3)?.map((item) => (
                    <div className="d-flex mb-2" key={item.label}>
                      <div
                        className="secondary_color fw_500"
                        style={{
                          width: `${
                            referralType === "senderReferral"
                              ? "290px"
                              : "190px"
                          }`,
                        }}
                      >
                        {item?.label}
                      </div>
                      <div
                        className="flex-grow-1 text-start primary_color fw_500"
                        style={{ width: "150px" }}
                      >
                        {item?.values}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
          {(referralType === "senderReferral" ||
            (coupon_type === "CurrentBalanceDeposit" &&
              referral_classification === "DriverToDriverReferral" &&
              type === "driverReferral") ||
            (coupon_type === "CurrentBalanceDeposit" &&
              referral_classification === "RiderToRiderReferral" &&
              type === "riderReferral")) && (
            <UsageHistoryIndividualTable
              tableData={couponUsageDetails?.couponUsageTableData}
              // cb_amount={
              //   couponUsageDetails?.couponUsagedata?.cb_deposite_amount
              //     ? parseFloat(
              //         couponUsageDetails?.couponUsagedata?.cb_deposite_amount
              //       ).toFixed(2)
              //     : "--"
              // }
              cb_amount={
                referralType === "senderReferral"
                  ? couponUsageDetails?.couponUsagedata
                      ?.sender_cb_deposite_amount
                  : couponUsageDetails?.couponUsagedata
                      ?.receiver_cb_deposite_amount
              }
              driver_rating={couponUsageDetails?.couponUsagedata?.driver_rating}
              type={type}
              loading={loading}
              coupon_type={coupon_type}
              referral_classification={referral_classification}
            />
          )}
          {referralType === "receiverReferral" &&
            referral_classification !== "DriverToDriverReferral" &&
            coupon_type !== "CurrentBalanceDeposit" && (
              <ReceiverHistoryIndividualTable
                tableData={couponUsageDetails?.couponUsageTableData}
                // cb_amount={
                //   couponUsageDetails?.couponUsagedata
                //     ?.receiver_cb_deposite_amount
                // }
                // type="rider"
                issueDate={couponUsageDetails?.couponUsagedata?.approved_at}
              />
            )}
        </>
      )}
    </>
  );
};

export default RiderReferralusageHistoryView;
