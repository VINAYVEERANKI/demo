import React, { useState, useEffect } from "react";
import InnerLayout from "../../layout/innerLayout";
import LoadAndError from "../../utilits/loadAndError";
import errorToast from "../../utilits/errorToast";
import SearchInputfield from "../../form/searchInputfield";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { useDispatch } from "react-redux";
import { formatAmount, formatDateTime, useSortableData } from "../../helper";
import { NavLink } from "react-router-dom";
import TablePaginations from "../../utilits/pagination";
import { driverPremiumListAction } from "../../../redux/actions/manageDriversAction";
import PremiumMenuOption from "./menuOption";
import TableSortField from "../../form/tableSortField";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const CurrentBalance = ({ params }) => {
  const dispatch = useDispatch();
  const [invoiceDetails, setInvoiceDetails] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [loading, setLoading] = useState(false);
  const [premiumList, setPremiumList] = useState([]);
  const [reload, setReload] = useState(false);

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [error, setError] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    dispatch(
      driverPremiumListAction(
        {
          pageNo: page,
          driver_id: params?.id,
          sort_by: sortColumn,
          sort_order: sortOrder,
        },
        onFetchSuccess,
        onFetchError
      )
    );
    setSelectedRowIndex(null);
    setInvoiceDetails(false);
  }, [reload, sortOrder, sortColumn, page]);

  const onFetchSuccess = (data) => {
    setLoading(false);
    setPremiumList(data?.data?.data);
    setError(false);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    console.log(data, "ksjfsa");
    console.log(data);
  };
  const onFetchError = (data) => {
    setLoading(false);
    setError(true);
    setErrorMessage(data?.data?.message);
    errorToast(data?.data?.message);
    console.log(data, "ksjfsa");
    console.log(data);
  };

  console.log(premiumList, "sfafaada");

  // const { items, requestSort, sortConfig } = useSortableData(
  //   premiumList?.driver_premium_histories
  // );

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
  const handlePageChange = (event) => {
    setPage(Number(event.target.value) - 1);
    setCurrentPage(page);
  };

  const auto_renewal_status = premiumList?.driver_premium_histories?.find(
    (item) => item?.status === "Active"
  )?.auto_renewal;

  const sidebarTableData = [
    {
      label: "Driver ID",
      value: premiumList?.driver_id2 ?? "--",
    },
    { label: "First Name", value: premiumList?.first_name ?? "--" },
    { label: "Last Name", value: premiumList?.last_name ?? "--" },
    {
      label: "Phone Number",
      value: premiumList?.phone_number
        ? `+91 ${premiumList?.phone_number}`
        : "--",
    },
    { label: "Premium Type", value: premiumList?.driver_type ?? "--" },
    {
      label: "Auto Renewable",
      value: auto_renewal_status === true ? "Yes" : "No",
    },
  ];

  const tableHeading = [
    { title: "Reference Id", value: "premium_code" },
    { title: "Premium", value: "premium_type" },
    { title: "Validity", value: "validity" },
    { title: "status", value: "status" },
    { title: "Created By", value: "created_by" },
    { title: "Transaction Date", value: "transaction_date" },
    { title: "Start Date", value: "start_date" },
    { title: "Expiry Date", value: "expiry_date" },
    { title: "Transaction Mode", value: "transaction_mode" },
    { title: "Payment Status", value: "payment_status" },
    { title: "Auto Renewal", value: "auto_renewal" },
    { title: "Next billing Date", value: "next_billing_date" },
    { title: "Transaction ID", value: "transaction_id" },
    { title: "Updated Date", value: "updatedAt" },
    { title: "Updated By", value: "updated_by" },
    { title: "Amount", value: "amount" },
  ];

  return (
    <>
      <InnerLayout
        mainHeading="Current Balance"
        navigateEnable={true}
        heading_classname={""}
      >
        <div className="row mt-2">
          {Array.from(
            { length: Math.ceil(sidebarTableData?.length / 3) },
            (_, i) => (
              <div className={`col-lg-3  fs_15`} key={i}>
                {sidebarTableData?.slice(i * 3, i * 3 + 3)?.map((item, j) => (
                  <div className="d-flex mb-2" key={j}>
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

        <div className="row mt-3 text-nowrap">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table">
              <thead>
                <tr className="pale_blue_bg">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>

                  {tableHeading.map((item, index) => (
                    <TableSortField
                      key={index}
                      show={item.value === sortColumn ? true : false}
                      title={item.title}
                      sortColumn={sortColumn}
                      sortOrder={sortColumn === item.value ? sortOrder : ""}
                      // onClick={() => handleSortClick(item.value)}
                      onClick={() => {
                        if (item.value === sortColumn) {
                          setSortOrder(sortOrder === "ASCE" ? "DESC" : "ASCE");
                        } else {
                          setSortColumn(item.value);
                          setSortOrder("ASCE");
                        }
                      }}
                    />
                  ))}
                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>
              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={premiumList?.driver_premium_histories?.length === 0}
                  errorMessage={errorMessage}
                >
                  {premiumList?.driver_premium_histories?.map((item, index) => (
                    <tr key={item?.id}>
                      <th scope="row">
                        <input
                          type="checkbox"
                          className="manage_fare_checkbox ms-2"
                          onChange={checkboxChecker}
                        />
                      </th>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.premium_code ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.premium_type ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.validity ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.status ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.created_by ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {formatDateTime(item?.transaction_date)}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {formatDateTime(item?.start_date)}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {formatDateTime(item?.expiry_date)}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.transaction_mode ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.payment_status ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.auto_renewal === true ? "Yes" : "No"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {formatDateTime(item?.next_billing_date)}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.transaction_id ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {formatDateTime(item?.updatedAt)}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.updated_by ?? "--"}
                      </td>
                      <td className={"secondary_color fs_14 fw_500"}>
                        {item?.amount ? formatAmount(item?.amount) : "--"}
                      </td>
                      {item?.status != "Halted" ? (
                        <td className=" position-relative">
                          <button
                            className="border_none background_none"
                            onClick={() => {
                              if (selectedRowIndex === index) {
                                setInvoiceDetails(!invoiceDetails);
                              } else {
                                setSelectedRowIndex(index);
                                setInvoiceDetails(true);
                              }
                            }}
                          >
                            <i className="ri-more-2-fill fs_14 fw_700 cursor_pointer secondary_color"></i>
                          </button>
                        </td>
                      ) : (
                        <td></td>
                      )}

                      {invoiceDetails && selectedRowIndex === index && (
                        <>
                          <div className="position-absolute">
                            <PremiumMenuOption
                              item={item}
                              reload={reload}
                              setReload={setReload}
                            />
                          </div>
                        </>
                      )}
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>
          </div>
        </div>
        {premiumList?.driver_premium_histories?.length === 0 ? (
          <></>
        ) : (
          <TablePaginations
            paginate={handlePagination}
            handleChange={handlePageChange}
            currentPage={page}
            pageData={pageData}
          />
        )}
      </InnerLayout>
    </>
  );
};

export default CurrentBalance;
