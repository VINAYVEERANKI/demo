import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usageHistoryDriverCouponAction } from "../../../redux/actions/driverCouponAction";
import UsageHistoryIndividualTable from "../../similarTables/referrals&Coupons/usageHistoryIndividualTable";
import errorToast from "../../utilits/errorToast";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { useExpiryDate } from "../../helper";

const IndividualDriverCouponUsageDetails = ({ params, type }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    setLoading(true);
    dispatch(
      usageHistoryDriverCouponAction(
        {
          coupon_id: params,
          search: {
            id: "",
            deposite_date: "",
            deposite_time: "",
            driver_id: "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search]);
  const onSuccess = (data) => {
    setError(false);
    setLoading(false);
    console.log(data);
    console.log(data?.data?.data);
    setCouponUsageDetails({
      couponUsagedata: data?.data?.data,
      couponUsageTableData: data?.data?.data?.driver_coupon_usages,
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

  const expiryDate = useExpiryDate(
    couponUsageDetails?.couponUsagedata?.coupon_life_span,
    couponUsageDetails?.couponUsagedata?.expiry_date,
    couponUsageDetails?.couponUsagedata?.expiry_time
  );

  const individualCouponDetails = [
    {
      label: "Coupon ID",
      values: couponUsageDetails?.couponUsagedata?.coupon_code ?? "--",
    },
    {
      label: "User Type",
      values: couponUsageDetails?.couponUsagedata?.user_type ?? "--",
    },
    {
      label: "Coupon Classification",
      values:
        couponUsageDetails?.couponUsagedata?.coupon_classification ?? "--",
    },
    {
      label: "Coupon Type",
      values: couponUsageDetails?.couponUsagedata?.coupon_type ?? "--",
    },
    {
      label: "Current Balance Deposit Amount (₹)*",
      values: couponUsageDetails?.couponUsagedata?.cb_deposite_amount
        ? parseFloat(
            couponUsageDetails?.couponUsagedata?.cb_deposite_amount
          ).toFixed(2)
        : "--",
    },
    {
      label: "Required Rides (Completed)*",
      values:
        couponUsageDetails?.couponUsagedata
          ?.required_rides_completed_by_receiver ?? "--",
    },
    {
      label: "Accounts Availed",
      values:
        couponUsageDetails?.couponUsagedata?.total_accounts_availed ?? "--",
    },
    {
      label: "Coupon Exp",
      values: expiryDate ? expiryDate.join(", ") : "--",
    },
  ];
  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <div className="row mt-2">
            {Array.from(
              { length: Math.ceil(individualCouponDetails.length / 4) },
              (_, i) => (
                <div className="col-12 col-md-6 col-lg-4 fs_15" key={i}>
                  {individualCouponDetails
                    .slice(i * 4, i * 4 + 4)
                    .map((item) => (
                      <div className="d-flex mb-2" key={item.label}>
                        <div
                          className="secondary_color fw_500"
                          style={{ width: "270px" }}
                        >
                          {item.label}
                        </div>
                        <div className="flex-grow-1 text-start primary_color fw_500">
                          {item.values}
                        </div>
                      </div>
                    ))}
                </div>
              )
            )}
          </div>
          <UsageHistoryIndividualTable
            tableData={couponUsageDetails?.couponUsageTableData}
            cb_amount={
              couponUsageDetails?.couponUsagedata?.cb_deposite_amount
                ? parseFloat(
                    couponUsageDetails?.couponUsagedata?.cb_deposite_amount
                  ).toFixed(2)
                : "--"
            }
            type={type}
          />
        </>
      )}
    </>
  );
};

export default IndividualDriverCouponUsageDetails;
