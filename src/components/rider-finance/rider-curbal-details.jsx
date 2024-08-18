import React, { useState, useEffect } from "react";
import InnerLayout from "../layout/innerLayout";
import {
  navigationFn,
  removeUnderScore,
  riderNavigateFn,
  useSortableData,
} from "../helper";
import errorToast from "../utilits/errorToast";
import { useDispatch } from "react-redux";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import SearchInputfield from "../form/searchInputfield";
import * as riderFinanceAction from "../../redux/actions/riderFinance/riderFinanceAction";
import { useLocation, useParams } from "react-router";
import LoadAndError from "../utilits/loadAndError";
import TablePaginations from "../utilits/pagination";
import moment from "moment";
import { NavLink } from "react-router-dom";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const RiderCurrentBalanceDetails = () => {
  const params = useParams();
  console.log(params.id, "paramsid");

  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [riderViewData, setRiderViewData] = useState([]);
  console.log(riderViewData, "hvhgchgchg");
  const [search, setSearch] = useState({ value: "" });
  const [error, setError] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData();
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(
      riderFinanceAction.riderFinanceViewAction(
        {
          rider_id: params.id,
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, setRiderViewData]);

  const onSuccess = (data) => {
    setError(false);
    setLoading(false);
    console.log(data);
    console.log(data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setRiderViewData(data?.data);
  };

  const onError = (data) => {
    errorToast(data?.data?.data);
    setErrorMessage(data?.data);
    setError(true);
    setLoading(false);
  };

  console.log(riderViewData, "riderViewData");

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  const sidebarTableData = [
    {
      label: "Rider ID",
      value: riderViewData.rider_id2,
      navLink: true,
      link: riderNavigateFn(riderViewData, riderViewData?.id),
    },
    { label: "First Name", value: riderViewData.first_name },
    { label: "Last Name", value: riderViewData.last_name },
    { label: "Phone Number", value: riderViewData.phone_number },
    { label: "Current Balance", value: riderViewData?.current_balance },
  ];
  const tableHeading = [
    { title: "Transaction Date", value: "" },
    { title: "Booking Id", value: "booking_id_2" },
    { title: "Booking Classification", value: "booking_classification" },
    { title: "Transaction Type", value: "transaction_type" },
    { title: "Transaction ID", value: "transaction_id" },
    { title: "Razorpay Order ID", value: "razorpay_order_id" },
    { title: "Rider Payment Status", value: "payment_status" },
    { title: "Amount(₹)", value: "" },
    { title: "Current Balance(₹)", value: "current_balance" },
  ];
  return (
    <>
      <InnerLayout
        mainHeading="Current Balance"
        navigateEnable={true}
        heading_classname={"ms-0"}
      >
        <div className="row mt-2">
          {Array.from(
            { length: Math.ceil(sidebarTableData?.length / 3) },
            (_, i) => (
              <div className={`col-lg-3  fs_15`} key={i}>
                {sidebarTableData?.slice(i * 3, i * 3 + 3)?.map((item) => (
                  <div className="d-flex mb-2" key={item.label}>
                    <div
                      className="secondary_color fw_500"
                      style={{ width: "180px" }}
                    >
                      {item?.label}
                    </div>

                    <div
                      className="flex-grow-1 text-start primary_color ms-4 fw_500"
                      style={{
                        width: "150px",
                        color: item?.value < 0 ? "red" : "primary_color",
                      }}
                    >
                      {item?.navLink ? (
                        <NavLink
                          className={" primary_color ms-4 fw_500"}
                          to={item?.link}
                        >
                          {item?.value}
                        </NavLink>
                      ) : (
                        item?.value
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        <div className="row mt-3">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table text-nowrap">
              <thead>
                <tr className="pale_blue_bg">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>

                  {tableHeading.map((item, index) => {
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
                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>
              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={
                    riderViewData?.bookings?.length === 0 &&
                    riderViewData?.rider_referral_reciver_usages?.length ===
                      0 &&
                    riderViewData?.rider_referral_sender_usages?.length === 0
                  }
                  errorMessage={errorMessage}
                >
                  {riderViewData?.bookings?.map((item) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">
                            <input
                              type="checkbox"
                              className="manage_fare_checkbox ms-2"
                              onChange={checkboxChecker}
                            />
                          </th>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {moment(item?.createdAt).format(
                                "DD-MM-YYYY    HH:mm"
                              )}
                            </span>
                          </td>
                          <td>
                            <NavLink
                              className={"secondary_color fs_14 fw_500"}
                              to={navigationFn(
                                item?.booking_classification,
                                item?.id
                              )}
                            >
                              {item?.booking_id_2 ?? "--"}
                            </NavLink>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.booking_classification
                                ? removeUnderScore(item?.booking_classification)
                                : "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.rider_payment?.transaction_type ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.rider_payment?.transaction_id ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.rider_payment?.razorpay_order_id ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.rider_payment?.payment_status ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <th className={`${styles.last_list} transparent_bg`}></th>
                        </tr>
                      </>
                    );
                  })}
                  {riderViewData?.rider_referral_reciver_usages?.map((item) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">
                            <input
                              type="checkbox"
                              className="manage_fare_checkbox ms-2"
                              onChange={checkboxChecker}
                            />
                          </th>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {moment(item?.used_date).format(
                                "DD-MM-YYYY    HH:mm"
                              )}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.riderReferral?.referral_id ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.transaction_type ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span
                              className={`secondary_color fs_14 fw_500 ${
                                item?.riderReferral
                                  ?.receiver_cb_deposite_amount < 0
                                  ? "error_color"
                                  : ""
                              }`}
                            >
                              {item?.riderReferral
                                ?.receiver_cb_deposite_amount ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item.current_balance ?? "--"}
                            </span>
                          </td>
                          <th className={`${styles.last_list} transparent_bg`}></th>
                        </tr>
                      </>
                    );
                  })}
                  {riderViewData?.rider_referral_sender_usages?.map((item) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">
                            <input
                              type="checkbox"
                              className="manage_fare_checkbox ms-2"
                              onChange={checkboxChecker}
                            />
                          </th>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {moment(item?.deposite_date).format(
                                "DD-MM-YYYY    HH:mm"
                              )}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.riderReferral?.referral_id ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.transaction_type ?? "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              --
                            </span>
                          </td>
                          <td>
                            <span
                              className={`secondary_color fs_14 fw_500 ${
                                item?.riderReferral?.sender_cb_deposite_amount <
                                0
                                  ? "error_color"
                                  : ""
                              }`}
                            >
                              {item?.riderReferral?.sender_cb_deposite_amount ??
                                "--"}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item.current_balance ?? "--"}
                            </span>
                          </td>
                          <th className={`${styles.last_list} transparent_bg`}></th>
                        </tr>
                      </>
                    );
                  })}
                </LoadAndError>
              </tbody>
            </table>
          </div>
        </div>
        <TablePaginations
          paginate={handlePagination}
          currentPage={page}
          pageData={pageData}
        />
      </InnerLayout>
    </>
  );
};

export default RiderCurrentBalanceDetails;
