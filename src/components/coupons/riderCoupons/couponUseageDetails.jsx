import React, { useEffect, useState } from "react";
import SearchInputfield from "../../form/searchInputfield";
import {
  couponClassifyName,
  couponTypeName,
  navigationFn,
  riderNavigateFn,
  statusColor,
  useExpiryDate,
} from "../../helper";
import { couponUsageHistoryFindOneAction } from "../../../redux/actions/riderCoupon/couponUsageAction";
import errorToast from "../../utilits/errorToast";
import { useDispatch } from "react-redux";
import moment from "moment";
import { couponMainZoneListAction } from "../../../redux/actions/riderCoupon/createCouponAction";
import SpinnerLoading from "../../utilits/spinnerLoading";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { NavLink } from "react-router-dom";

const RiderCouponUseageDetails = ({ params }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [driverTable, setDriverTable] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [couponUsageData, setCouponUsageData] = useState();

  useEffect(() => {
    setLoading(true);
    dispatch(
      couponUsageHistoryFindOneAction(
        {
          coupon_id: params?.id,
          search: {
            id: "",
            used_at: "",
            used_time: "",
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
    setCouponUsageData(data?.data?.data);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  const [loadinng, setLoadinng] = useState(false);
  const [moreZone, setMoreZone] = useState(false);
  const [zonenameloading, setZoneNameLoading] = useState(false);
  const [mainZonelist, setMainZonelist] = useState([]);

  useEffect(() => {
    setZoneNameLoading(true);
    dispatch(couponMainZoneListAction(onFetchSuccess, onFetchError));
  }, []);

  const onFetchSuccess = (data) => {
    setZoneNameLoading(false);
    const statusOption = data?.data?.map((item) => {
      return { label: item?.zone_name, value: item?.id };
    });
    setMainZonelist(statusOption);
  };

  const onFetchError = () => {
    setZoneNameLoading(false);
  };

  const zoneName = mainZonelist
    ?.filter((item) =>
      couponUsageData?.coupon_applicable_zone?.includes(item.value)
    )
    ?.map((item) => item.label);

  console.log(couponUsageData);

  const expiryDate = useExpiryDate(
    couponUsageData?.coupon_life_span,
    couponUsageData?.expiry_date,
    couponUsageData?.expiry_time
  );

  console.log(couponUsageData?.rider_coupon_usages, "lskfnaslf");
  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <div className="row col-lg-10 col-12 mt-3">
            <div className="col-lg-4 col-12">
              <table className="fs_15 ">
                <tr>
                  <td className="secondary_color">Coupon ID</td>
                  <td className="ps-3 primary_color">
                    {couponUsageData?.coupon_id}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color">Coupon Classification</td>
                  <td className="ps-3 primary_color">
                    {couponUsageData?.coupon_classification
                      ? couponClassifyName(
                          couponUsageData?.coupon_classification
                        )
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color">Coupon Applicable Zone</td>
                  <td className="ps-3 primary_color position-relative d-flex align-items-center">
                    {zonenameloading ? (
                      <SpinnerLoading />
                    ) : zoneName?.length > 1 ? (
                      <span className="d-flex align-items-center gap-1">
                        All{" "}
                        <span>
                          <i
                            className="ri-information-fill cursor_pointer"
                            onClick={() => setMoreZone(!moreZone)}
                          />
                        </span>
                      </span>
                    ) : zoneName.length ? (
                      zoneName
                    ) : (
                      "N/A"
                    )}
                    {moreZone ? (
                      <div className="position-absolute moreZone_container mt-2 p-2">
                        <span>{zoneName.join(", ")}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color">
                    Coupon Classification Details
                  </td>
                  <td className="ps-3 primary_color">
                    {couponUsageData?.coupon_classification_details
                      ? couponUsageData?.coupon_classification_details
                      : "N/A"}
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-lg-3 col-12">
              <table className="fs_15 ">
                <tr>
                  <td className="secondary_color">Coupon Code</td>
                  <td className="ps-3 primary_color">
                    {couponUsageData?.coupon_code}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color">Coupon Type</td>
                  <td className="ps-3 primary_color">
                    {couponUsageData?.coupon_type
                      ? couponTypeName(couponUsageData?.coupon_type)
                      : "--"}
                  </td>
                </tr>
                {couponUsageData?.coupon_type === "X%DiscountUpToY" && (
                  <>
                    <tr>
                      <td className="secondary_color">% Discount</td>
                      <td className="ps-3 primary_color">
                        {couponUsageData?.discount}
                      </td>
                    </tr>
                    <tr>
                      <td className="secondary_color">Max Amount In Rs (₹)</td>
                      <td className="ps-3 primary_color">
                        {couponUsageData?.max_amount_in_rs}
                      </td>
                    </tr>
                  </>
                )}
                {couponUsageData?.coupon_type === "XAmountOff" && (
                  <>
                    <tr>
                      <td className="secondary_color">Amount Off</td>
                      <td className="ps-3 primary_color">
                        {couponUsageData?.amountoff
                          ? couponUsageData?.amountoff
                          : "--"}
                      </td>
                    </tr>
                  </>
                )}
                {couponUsageData?.coupon_type === "X%CashbackUpToY" && (
                  <>
                    <tr>
                      <td className="secondary_color">% Cashback</td>
                      <td className="ps-3 primary_color">
                        {couponUsageData?.cashback}
                      </td>
                    </tr>
                    <tr>
                      <td className="secondary_color">Max Amount In Rs (₹)</td>
                      <td className="ps-3 primary_color">
                        {couponUsageData?.max_cashback_in_rs}
                      </td>
                    </tr>
                  </>
                )}
              </table>
            </div>
            <div className="col-lg-4 col-12">
              <table className="fs_15 ">
                <tr>
                  <td className="secondary_color">Accounts Applicable Limit</td>
                  <td className="ps-3 primary_color">
                    {couponUsageData?.account_applicable_limit}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color">Usage Limit Per Account</td>
                  <td className="ps-3 primary_color">
                    {" "}
                    {couponUsageData?.usage_limit_per_account}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color">Accounts Availed</td>
                  <td className="ps-3 primary_color">
                    {couponUsageData?.accounts_availed
                      ? couponUsageData?.accounts_availed
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color">Total Coupons Used</td>
                  <td className="ps-3 primary_color">
                    {couponUsageData?.total_coupon_used
                      ? couponUsageData?.total_coupon_used
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td className="secondary_color">Coupon Exp </td>
                  <td className="ps-3 primary_color">
                    {expiryDate ? expiryDate.join(", ") : "--"}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="mt-5">
            <div className=" table_container">
              <table className="table  ">
                <thead>
                  <tr className="pale_blue_bg text-nowrap">
                    <SearchInputfield
                      title={"Used date"}
                      table_border_radius="ongoing_heading_first_list"
                      colorName="ps-3"
                    />
                    <SearchInputfield title={"Used Time"} />
                    <SearchInputfield title={"Rider ID"} />
                    <SearchInputfield title={"Booking ID"} />
                    <SearchInputfield title={"Booking Type"} />
                    <SearchInputfield title={"Ride Type"} />
                    <SearchInputfield title={"Rider Payment Method"} />
                    <SearchInputfield title={"Cashback Amount (₹)"} />
                    <SearchInputfield
                      title={"Final Booking Amount (₹)"}
                      table_border_radius="ongoing_heading_last_list"
                    />
                  </tr>
                </thead>
                <tbody className="light_blue_bg text-nowrap">
                  {couponUsageData?.rider_coupon_usages.map((item, id) => (
                    <tr key={id} className={"light_blue_bg text-nowrap"}>
                      <td>
                        <a className=" secondary_color">
                          <span className="secondary_color fs_14 ps-3">
                            {item?.used_at
                              ? moment(item?.used_at).format("DD-MM-YYYY")
                              : "--"}
                          </span>
                        </a>
                      </td>

                      <td>
                        <span className="secondary_color fs_14">
                          {item?.used_time ? item?.used_time : "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        {/* <a href="">
                          <span className="secondary_color fs_14">
                            {item?.booking?.rider_id_2
                              ? item?.booking?.rider_id_2
                              : "--"}
                          </span>
                        </a> */}
                        <NavLink
                          className="secondary_color fs_14"
                          to={riderNavigateFn(
                            item?.booking?.rider,
                            item?.booking?.rider?.id
                          )}
                        >
                          <span>
                            {item?.booking?.rider_id_2
                              ? item?.booking?.rider_id_2
                              : "--"}
                          </span>
                        </NavLink>
                      </td>

                      <td>
                        {/* <a href="">
                          <span className="secondary_color fs_14">
                            {item?.booking?.booking_id_2
                              ? item.booking?.booking_id_2
                              : "--"}
                          </span>
                        </a> */}
                        <NavLink
                          className="secondary_color fs_14"
                          to={navigationFn(
                            item?.booking?.booking_classification,
                            item?.booking?.id
                          )}
                        >
                          <span>
                            {item?.booking?.booking_id_2
                              ? item.booking?.booking_id_2
                              : "--"}
                          </span>
                        </NavLink>
                      </td>
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {item?.booking?.booking_type
                            ? item?.booking?.booking_type
                            : "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.booking?.ride_type
                            ? item?.booking?.ride_type
                            : "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.booking?.payment_method
                            ? item?.booking?.payment_method
                            : "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.booking?.rider_billing?.coupon_savings
                            ? item?.booking?.rider_billing?.coupon_savings
                            : "--"}
                        </span>
                      </td>

                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.booking?.rider_billing?.final_fare
                            ? item?.booking?.rider_billing?.final_fare
                            : "--"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RiderCouponUseageDetails;
