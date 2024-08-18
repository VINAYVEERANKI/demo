import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { couponUsageHistoryAllViewAction } from "../../../../redux/actions/riderCoupon/couponUsageAction";
import SearchInputfield from "../../../form/searchInputfield";
import {
  couponClassifyName,
  couponTypeName,
  statusColor,
  useSortableData,
} from "../../../helper";
import errorToast from "../../../utilits/errorToast";
import LoadAndError from "../../../utilits/loadAndError";

const RiderCouponUsageHistory = ({ search }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [couponUsageData, setCouponUsageData] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(
      couponUsageHistoryAllViewAction(
        {
          search: {
            id: "",
            coupon_id: search?.coupon_id ?? "",
            coupon_classification: search?.coupon_classification ?? "",
            // coupon_applicable_zone: "",
            coupon_type: search?.coupon_type ?? "",
            coupon_code: search?.coupon_code ?? "",
            coupon_title: search?.coupon_title ?? "",
            coupon_status: search?.coupon_status ?? "",
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
    setLoading(false);
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  const CouponTableHeading = [
    { title: "Coupon ID", value: "coupon_id" },
    { title: "Coupon Classification", value: "coupon_classification" },
    { title: "Zone", value: "coupon_applicable_zone" },
    { title: "Coupon Type", value: "coupon_code" },
    { title: "Coupon Code", value: "coupon_code" },
    { title: "Coupon Title", value: "coupon_title" },
    { title: "Accounts Applicable Limit", value: "account_applicable_limit" },
    { title: "Accounts Availed", value: "accounts_availed" },
    { title: "Coupon Status", value: "coupon_status" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(couponUsageData);

  return (
    <div>
      <div className="mt-2">
        <div className=" table_container">
          <table className="table  ">
            <thead>
              <tr className="pale_blue_bg text-nowrap">
                <th scope="col" className="ongoing_heading_first_list">
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                    id="mastercheck"
                  />
                </th>
                {CouponTableHeading?.map((item, index) => {
                  const isActiveSortIndex = activeSortIndex === index;
                  return (
                    <SearchInputfield
                      title={item?.title}
                      requestSort={requestSort}
                      sortName={item?.value}
                      key={item?.title}
                      index={index}
                      isActiveSortIndex={isActiveSortIndex}
                      setActiveSortIndex={setActiveSortIndex}
                      sortConfig={sortConfig}
                    />
                  );
                })}

                <th className="ongoing_heading_last_list"></th>
              </tr>
            </thead>
            <tbody className="light_blue_bg text-nowrap">
              <LoadAndError
                loader={loading}
                error={error}
                status={couponUsageData?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item, id) => (
                  <tr key={id} className={"light_blue_bg text-nowrap"}>
                    <th scope="row">
                      <input
                        id={item?.id}
                        type="checkbox"
                        className="manage_fare_checkbox ms-2 "
                      />
                    </th>

                    <td>
                      <a className=" secondary_color">
                        <span className="secondary_color fs_14">
                          {item?.coupon_id ? item?.coupon_id : "--"}
                        </span>
                      </a>
                    </td>

                    <td>
                      <span className="secondary_color fs_14">
                        {item?.coupon_classification
                          ? couponClassifyName(item?.coupon_classification)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14">
                        {" "}
                        {item?.coupon_applicable_zone === null && "N/A"}
                        {item?.ZoneName?.length > 1
                          ? "All"
                          : item?.ZoneName?.map((user) => user?.zone_name)}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14">
                        {item?.coupon_type
                          ? couponTypeName(item?.coupon_type)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className={"secondary_color fs_14"}>
                        {item?.coupon_code ? item?.coupon_code : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14">
                        {item?.coupon_title ? item?.coupon_title : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14">
                        {item?.account_applicable_limit
                          ? item?.account_applicable_limit
                          : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14">
                        {item?.accounts_availed ? item?.accounts_availed : "--"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span
                        className={`${statusColor(item?.coupon_status)} fs_14`}
                      >
                        {item?.coupon_status ? item?.coupon_status : "--"}
                      </span>
                    </td>

                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_14 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={`/coupon-usage-history-view/${item?.id}`}
                        state={{
                          edit: false,
                          coupon_id: item?.coupon_id,
                          coupon_code: item?.coupon_code,
                          coupon_title: item?.coupon_title,
                          couponClassification: item?.coupon_classification,
                          couponType: item?.coupon_type,
                          couponClassificationDetails:
                            item?.coupon_classification_details,
                          status: item?.coupon_status,
                        }}
                      >
                        View
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default RiderCouponUsageHistory;
