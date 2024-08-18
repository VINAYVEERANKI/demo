import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  driverRefRecevierUsageHistoryListAction,
  riderRefRecevierFindAllUsageHisAction,
} from "../../../redux/actions/referrals/receiverHistoryAction";
import {
  riderRefSenderFindAllUsageHistoryAction,
  driverRefSenderUsageHistoryListAction,
} from "../../../redux/actions/referrals/senderHistoryAction";
import SearchInputfield from "../../form/searchInputfield";
import { insertSpaces, statusColor, useSortableData } from "../../helper";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import TablePaginations from "../../utilits/pagination";

const ReferralUsageHistoryMainTable = ({
  tableType = "",
  type = "",
  search,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [usageHistoryData, setUsageHistoryData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (type === "driverReferral") {
      if (tableType === "ReceiverHistory") {
        setLoading(true);
        dispatch(
          driverRefRecevierUsageHistoryListAction(
            {
              search: {
                id: "",
                referral_code: search?.referral_id ?? "",
                referral_classification: search?.referral_classification ?? "",
                receiver_coupon_type: search?.coupon_type ?? "",
                coupon_code: search?.coupon_code ?? "",
                coupon_title: search?.coupon_title ?? "",
                referral_status: search?.referral_status ?? "",
                created_by: search?.created_by ?? "",
              },
            },
            page,
            onSuccess,
            onError
          )
        );
      } else if (tableType === "SenderHistory") {
        setLoading(true);
        dispatch(
          driverRefSenderUsageHistoryListAction(
            {
              search: {
                id: "",
                referral_code: search?.referral_id ?? "",
                referral_classification: search?.referral_classification ?? "",
                sender_coupon_type: search?.coupon_type ?? "",
                coupon_code: search?.coupon_code ?? "",
                coupon_title: search?.coupon_title ?? "",
                referral_status: search?.referral_status ?? "",
                created_by: search?.created_by ?? "",
              },
            },
            page,
            onSuccess,
            onError
          )
        );
      }
    } else {
      if (tableType === "ReceiverHistory") {
        setLoading(true);
        dispatch(
          riderRefRecevierFindAllUsageHisAction(
            {
              search: {
                id: "",
                referral_id: search?.referral_id ?? "",
                referral_classification: search?.referral_classification ?? "",
                receiver_coupon_type: search?.coupon_type ?? "",
                coupon_code: search?.coupon_code ?? "",
                coupon_title: search?.coupon_title ?? "",
                referral_status: search?.referral_status ?? "",
                created_by: search?.created_by ?? "",
              },
            },
            page,
            onSuccess,
            onError
          )
        );
      } else if (tableType === "SenderHistory") {
        setLoading(true);
        dispatch(
          riderRefSenderFindAllUsageHistoryAction(
            {
              search: {
                id: "",
                referral_id: search?.referral_id ?? "",
                referral_classification: search?.referral_classification ?? "",
                sender_coupon_type: search?.coupon_type ?? "",
                coupon_code: search?.coupon_code ?? "",
                coupon_title: search?.coupon_title ?? "",
                referral_status: search?.referral_status ?? "",
                created_by: search?.created_by ?? "",
              },
            },
            page,
            onSuccess,
            onError
          )
        );
      }
    }
  }, [page, search, tableType]);

  const onSuccess = (data) => {
    setLoading(false);
    setError(false);
    setUsageHistoryData(data?.data?.data);
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

  const RiderReferraltableHeading = [
    {
      title: "Referral ID",
      value:
        type === "riderReferral"
          ? "referral_id"
          : type === "driverReferral"
          ? "referral_code"
          : "",
    },
    { title: "Referral Classification", value: "referral_classification" },
    {
      title: "Coupon Type",
      value:
        tableType === "SenderHistory"
          ? "sender_coupon_type"
          : "receiver_coupon_type",
    },
    { title: "Coupon Code", value: "coupon_code" },
    { title: "Coupon Title", value: "coupon_title" },
    { title: "Accounts Availed", value: "accounts_availed" },
    { title: "Referral Status", value: "referral_status" },

    { title: "Created By", value: "createdBy.user_name" },
  ];

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(usageHistoryData);

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
                {RiderReferraltableHeading?.map((item, index) => {
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
                status={usageHistoryData?.length === 0}
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
                        {item?.referral_id ?? item?.referral_code ?? "--"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.referral_classification
                          ? insertSpaces(item?.referral_classification)
                          : "--"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {tableType === "SenderHistory"
                          ? item?.sender_coupon_type
                          : item?.receiver_coupon_type ?? "N/A"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.coupon_code ?? "N/A"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className={`secondary_color fs_14 fw_500`}>
                        {item?.coupon_title ?? "N/A"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.accounts_availed ?? "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item?.referral_status
                        )} fs_14 fw_500`}
                      >
                        {item?.referral_status ?? "--"}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className={`secondary_color fs_14 fw_500`}>
                        {item?.createdBy?.user_name ?? "--"}
                      </span>
                    </td>

                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_14 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={
                          tableType === "SenderHistory"
                            ? `sender-history/view/${item?.id}`
                            : `reciever-history/view/${item?.id}`
                        }
                        state={{
                          referral_id: item?.referral_id ?? item?.referral_code,
                          referral_status: item?.referral_status,
                          coupon_type:
                            tableType === "SenderHistory"
                              ? item?.sender_coupon_type
                              : item?.receiver_coupon_type,
                          referral_classification:
                            item?.referral_classification,
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
      {usageHistoryData?.length === 0 ? (
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

export default ReferralUsageHistoryMainTable;
