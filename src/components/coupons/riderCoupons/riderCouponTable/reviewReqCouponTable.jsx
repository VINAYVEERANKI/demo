import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { pendingCouponAllViewAction } from "../../../../redux/actions/riderCoupon/createCouponAction";
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

const RiderReviewRequired = ({ search }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pendingCouponData, setPendingCouponData] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const { canRead, canWrite } = usePermissions();

  useEffect(() => {
    setLoading(true);
    dispatch(
      pendingCouponAllViewAction(
        {
          search: {
            id: "",
            coupon_id: search?.coupon_id,
            coupon_classification: search?.coupon_classification,
            coupon_classification_details:
              search?.coupon_classification_details,
            coupon_code: search?.coupon_code,
            coupon_title: search?.coupon_title,
            created_by: search?.created_by,
            created_at: search?.created_at,
            coupon_status: search?.coupon_status,
            campaign_status: search?.campaign_status,
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
    { title: "Incentive ID", value: "coupon_id" },
    { title: "Coupon Classification", value: "coupon_classification" },
    { title: "Zone", value: "coupon_applicable_zone" },
    { title: "Classification Details", value: "coupon_classification_details" },
    { title: "Coupon Code", value: "coupon_code" },
    { title: "Coupon Title", value: "coupon_title" },
    { title: "Created At", value: "created_at" },
    { title: "Created By", value: "createdBy?.user_name" },
    { title: "Coupon Status", value: "coupon_status" },
    { title: "Campaign Status", value: "campaign_status" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(pendingCouponData);

  return (
    <div>
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
                      <a className=" secondary_color">
                        <span className="secondary_color fs_14">
                          {item?.coupon_id}
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
                        {item?.ZoneName?.length === 0 && "--"}
                        {item?.ZoneName?.length > 1
                          ? "All"
                          : item?.ZoneName?.map((user) => user?.zone_name)}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14">
                        {item?.coupon_classification_details
                          ? item?.coupon_classification_details
                          : "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className={"secondary_color fs_14"}>
                        {item?.coupon_code}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="secondary_color fs_14">
                        {item?.coupon_title}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fs_14">
                        {item?.created_at
                          ? moment(item?.created_at).format("DD-MM-YYYY,HH:mm")
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14">
                        {item?.createdBy?.user_name}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(item?.coupon_status)} fs_14`}
                      >
                        {item?.coupon_status}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item?.campaign_status
                        )} fs_14`}
                      >
                        {item?.campaign_status ? item?.campaign_status : "--"}
                      </span>
                    </td>

                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_14 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={`/coupon-review-required/${item?.id}`}
                        state={{
                          edit: false,
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
                      {canWrite("rider_coupons_review_required") && (
                        <NavLink
                          className="border_none border_radius text-decoration-none primary_bg white_color py-1 fs_14 px-3 view_text"
                          to={`/coupon-review-required/${item?.id}`}
                          state={{
                            edit: true,
                            coupon_code: item?.coupon_code,
                            coupon_title: item?.coupon_title,
                            couponClassification: item?.coupon_classification,
                            couponType: item?.coupon_type,
                            couponClassificationDetails:
                              item?.coupon_classification_details,
                            status: item?.coupon_status,
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
    </div>
  );
};

export default RiderReviewRequired;
