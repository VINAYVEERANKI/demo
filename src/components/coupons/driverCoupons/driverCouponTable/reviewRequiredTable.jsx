import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { reviewReqDriverCouponListAction } from "../../../../redux/actions/driverCouponAction";
import SearchInputfield from "../../../form/searchInputfield";
import {
  couponClassifyName,
  statusColor,
  useSortableData,
} from "../../../helper";
import errorToast from "../../../utilits/errorToast";
import LoadAndError from "../../../utilits/loadAndError";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import TablePaginations from "../../../utilits/pagination";
import usePermissions from "../../../usePermissionChecker";

const DriverCouponReviewReqTable = ({ search }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [pendingCouponData, setPendingCouponData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { canRead, canWrite } = usePermissions();
  const storedPermissions = JSON.parse(localStorage.getItem("permissions"));
  console.log(storedPermissions?.driver_coupons_review_required, "sdlfhskjfhsd");

  useEffect(() => {
    setLoading(true);
    dispatch(
      reviewReqDriverCouponListAction(
        {
          search: {
            id: "",
            coupon_code: search?.coupon_id ?? "",
            coupon_classification: search?.coupon_classification ?? "",
            coupon_type: search?.coupon_type ?? "",
            created_by: search?.created_by ?? "",
            coupon_status: search?.coupon_status ?? "",
            campaign_status: search?.campaign_status ?? "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search]);
  const onSuccess = (data) => {
    setLoading(false);
    setError(false);
    setPendingCouponData(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
  };
  const onError = (data) => {
    setLoading(false);
    setError(true);
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  const CouponTableHeading = [
    { title: "Coupon ID", value: "coupon_code" },
    { title: "Coupon Classification", value: "coupon_classification" },
    { title: "Coupon Type", value: "coupon_type" },
    { title: "Deposit Amount (₹)", value: "cb_deposite_amount" },
    {
      title: "Required Rides (Completed)",
      value: "required_rides_completed_by_receiver",
    },
    { title: "Created At", value: "created_at" },
    { title: "Created By", value: "createdBy?.user_name" },
    { title: "Coupon Status", value: "coupon_status" },
    { title: "Campaign Status", value: "campaign_status" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(pendingCouponData);

  return (
    <>
      <div className="mt-2">
        <div className=" table_container">
          {loading && <LoadingSpinnerTable />}
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
                status={pendingCouponData?.length === 0}
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
                      <span className="secondary_color fs_14 fw_500">
                        {item?.coupon_code ?? "--"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.coupon_classification
                          ? couponClassifyName(item.coupon_classification)
                          : "--"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {item?.coupon_type ?? "N/A"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.cb_deposite_amount
                          ? parseFloat(item?.cb_deposite_amount).toFixed(2)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.required_rides_completed_by_receiver ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item.created_at
                          ? moment(item?.created_at).format("DD-MM-YYYY,HH:mm")
                          : "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className={`secondary_color fs_14 fw_500`}>
                        {item?.createdBy?.user_name ?? "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item.coupon_status
                        )} fs_14 fw_500`}
                      >
                        {item?.coupon_status ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${statusColor(
                          item.campaign_status ?? "--"
                        )} fs_14 fw_500`}
                      >
                        {item?.campaign_status ?? "--"}
                      </span>
                    </td>
                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_14 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={`/driver-coupons/review-required/view/${item?.id}`}
                        state={{
                          edit: false,
                          coupon_id: item?.coupon_code,
                          coupon_status: item?.coupon_status,
                          status: "reviewRequired",
                        }}
                      >
                        View
                      </NavLink>
                      {canWrite("driver_coupons_review_required") && (
                        <NavLink
                          className="border_none border_radius text-decoration-none primary_bg white_color py-1 fs_14 px-3 view_text"
                          to={`/driver-coupons/review-required/edit/${item?.id}`}
                          state={{
                            edit: true,
                            coupon_id: item?.coupon_code,
                            coupon_status: item?.coupon_status,
                            status: "reviewRequired",
                          }}
                        >
                          Edit
                        </NavLink>
                      )}
                    </td>
                  </tr>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
      </div>
      {pendingCouponData?.length === 0 ? (
        <></>
      ) : (
        <TablePaginations
          paginate={handlePagination}
          currentPage={page}
          pageData={pageData}
        />
      )}
    </>
  );
};

export default DriverCouponReviewReqTable;
