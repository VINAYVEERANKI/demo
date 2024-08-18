import React, { useEffect, useState } from "react";
import InnerLayout from "../../layout/innerLayout";
import {
  driverNavigateFn,
  removeUnderScore,
  useSortableData,
} from "../../helper";
import { useDispatch } from "react-redux";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import SearchInputfield from "../../form/searchInputfield";
import TablePaginations from "../../utilits/pagination";
import {
  driFinSucesCashoutTransHisFindOneAction
} from "../../../redux/actions/driverFinanceAction/successfulCashout";
import errorToast from "../../utilits/errorToast";
import { useParams } from "react-router";
import LoadAndError from "../../utilits/loadAndError";
import moment from "moment";
import { NavLink } from "react-router-dom";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const SuccessfulCashoutDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [driverData, setDriverData] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [error, setError] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(
    "driverFinanceDataList"
  );
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [driverFinanceDataList, setDriverFinanceDataList] = useState([]);
  const sidebarTableData = [
    {
      label: "Driver ID",
      value: driverFinanceDataList.driver_id2,
      navLink: true,
      link: driverNavigateFn(driverFinanceDataList, driverFinanceDataList?.id),
    },
    { label: "First Name", value: driverFinanceDataList.first_name },
    { label: "Last Name", value: driverFinanceDataList.last_name },
    { label: "Phone Number", value: driverFinanceDataList.phone_number },
    {
      label: "Driver Type",
      value: driverFinanceDataList.driver_type
        ? removeUnderScore(driverFinanceDataList.driver_type)
        : "--",
    },

    // { label: "Current Balance", value: driverFinanceDataList.current_balance },
    {
      label: "Current Balance",
      value: driverFinanceDataList.current_balance,
      style: {
        color: driverFinanceDataList.current_balance < 0 ? "error_color" : "",
      },
    },
    {
      label: "Cashout Balance",
      value: driverFinanceDataList.cashout_balance
        ? driverFinanceDataList.cashout_balance
        : "--",
    },
  ];
  const tableHeading = [
    { title: "Transaction Date & Time ", value: "" },
    { title: "Transaction ID", value: "" },
    { title: "Razorpay Order ID", value: "" },
    { title: "Amount(₹)", value: "" },
  ];
  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }

  console.log(driverFinanceDataList, "skdjfhlskf");
  useEffect(() => {
    setLoading(true);
    dispatch(
      driFinSucesCashoutTransHisFindOneAction(
        {
          driver_id: params.id,
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, setDriverFinanceDataList]);

  console.log(params.id, "akjsdkas");
  const onSuccess = (data) => {
    setDriverFinanceDataList(data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
    console.log(data, "kkkkk");
  };

  const onError = (data) => {
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }
  return (
    <>
      <InnerLayout
        mainHeading="Successful Cashout"
        navigateEnable={true}
        heading_classname={"ms-1"}
      >
        <div className="row mt-2">
          {Array.from(
            { length: Math.ceil(sidebarTableData?.length / 3) },
            (_, i) => (
              <div className={`col-lg-3  fs_15`} key={i}>
                {sidebarTableData?.slice(i * 4, i * 4 + 4)?.map((item) => (
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
                        color: item.value < 0 ? "red" : "",
                      }}
                    >
                      {item?.navLink ? (
                        <NavLink className={"primary_color"} to={item?.link}>
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
                      className="manage_fare_checkbox ms-2"
                      onChange={checkboxChecker}
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
              {/* <tbody className="light_blue_bg">
              <LoadAndError
                loader={loading}
                error={error}
                status={driverList?.length === 0}
                errorMessage={errorMessage}
              >
                {items?.map((item) => (
                  <tr
                    key={item?.id}
                    className={item?.id === checkList ? "light_blue_bg" : null}
                  >
                    <th scope="row">
                      <input
                        id={item?.id}
                        type="checkbox"
                        checked={checkList === item?.id}
                        className="manage_fare_checkbox ms-2"
                        onChange={checkboxChecker}
                      />
                    </th>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                      R-001
                      </span>
                    </td>   
                  </tr>
                ))}
              </LoadAndError>
            </tbody> */}
              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={driverFinanceDataList.driver_cashout_histories?.length === 0}
                  errorMessage={errorMessage}
                >
                  {/* {items?.map((item) => (
                  <tr  
                  >
                  
                    <th scope="row">
                     
                    </th>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                      12/12/2022,12:21 PM
                      </span>
                    </td>  
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                      3838283293829
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                      {item?.razorpay_order_id ? item?.razorpay_order_id : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color fs_14 fw_500">
                      1700.00
                      </span>
                    </td> 
                <th className={`${styles.last_list} transparent_bg`}></th>
                  </tr> 
                  ))} */}
                  {driverFinanceDataList.driver_cashout_histories?.map(
                    (item) => (
                      <tr>
                        <th scope="row">
                          <input
                            type="checkbox"
                            className="manage_fare_checkbox ms-2"
                            onChange={checkboxChecker}
                          />
                        </th>
                        {/* <td>
                    <span className="secondary_color fs_14 fw_500">
                    {item?.deposite_date}
                    </span>
                    </td> */}
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.createdAt
                              ? moment(item?.deposite_date).format(
                                  "DD-MM-YYYY,HH:MM"
                                )
                              : "--"}
                          </span>
                        </td>

                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.transaction_id ? item?.transaction_id : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.razorpay_order_id
                              ? item?.razorpay_order_id
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.cashout_amount ? item?.cashout_amount : "--"}
                          </span>
                        </td>

                        <th className={`${styles.last_list} transparent_bg`}></th>
                      </tr>
                    )
                  )}
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

export default SuccessfulCashoutDetails;
