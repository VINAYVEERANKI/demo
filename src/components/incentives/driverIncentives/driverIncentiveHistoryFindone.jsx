import React, { useEffect, useState } from "react";
import errorToast from "../../utilits/errorToast";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { useDispatch } from "react-redux";
import { driverIncentiveUseageHisAction } from "../../../redux/actions/incentives/useageHisIncentivesAction";
import SearchInputfield from "../../form/searchInputfield";
import LoadAndError from "../../utilits/loadAndError";
import InnerLayout from "../../layout/innerLayout";
import { formatDateTime } from "../../helper";
import TablePaginations from "../../utilits/pagination";
import ObjValueFormatterFn from "../../objValueFormatterFn";
const DriverIncentiveHistoryFindoneView = ({ params }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [driverIncentiveHistory, setDriverIncentiveHistory] = useState({
    driverIncentiveHistorydata: {},
    driverIncentiveHistoryTableData: [],
  });
  useEffect(() => {
    setLoading(true);
    dispatch(
      driverIncentiveUseageHisAction(
        {
          incentive_id: params,
          search: {
            deposite_time: "",
            deposite_date: "",
            driver_id: "",
            driver_type: "",
            driver_default_ride_type: "",
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
    setDriverIncentiveHistory({
      driverIncentiveHistorydata: data.data?.data,
      driverIncentiveHistoryTableData:
        data.data.data.driver_incentive_usage_histories,
    });
  };
  const onError = (data) => {
    setLoading(false);
    setError(false);
    errorToast(data.data.data);
  };
  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  const incentiveHistoryDetails = [
    {
      label: "Incentive ID",
      values:
        driverIncentiveHistory?.driverIncentiveHistorydata?.incentive_code ??
        "--",
    },
    {
      label: "Incentive Classification",
      values:
        driverIncentiveHistory?.driverIncentiveHistorydata
          ?.incentive_classification ?? "--",
    },
    {
      label: "Incentive Applicable Zone",
      values:
        driverIncentiveHistory?.driverIncentiveHistorydata
          ?.incentive_applicable_zone ?? "--",
    },
    {
      label: "Driver Default Ride Type*",
      values:
        driverIncentiveHistory?.driverIncentiveHistorydata
          ?.driver_default_ride_type ?? "--",
    },
    {
      label: "Completed Bookings-Booking Type*",
      values: driverIncentiveHistory?.driverIncentiveHistorydata?.booking_type
        ? ObjValueFormatterFn(
            driverIncentiveHistory?.driverIncentiveHistorydata?.booking_type,
            false
          )
        : "--",
    },
    {
      label: "Driver",
      values:
        driverIncentiveHistory?.driverIncentiveHistorydata?.driver_type ?? "--",
    },
    {
      label: "Incentive Coupon Type",
      values:
        driverIncentiveHistory?.driverIncentiveHistorydata
          ?.incentive_coupon_type ?? "--",
    },
    {
      label: "Accounts Availed",
      values:
        driverIncentiveHistory?.driverIncentiveHistorydata?.accounts_availed ??
        "--",
    },
  ];
  const statusList = [];
  if (
    driverIncentiveHistory?.driverIncentiveHistorydata?.is_approved === true
  ) {
    statusList?.push({
      backGroundColor: "active_container",
      value: "Active",
    });
  } else if (
    driverIncentiveHistory?.driverIncentiveHistorydata?.is_deleted === true
  ) {
    statusList?.push({
      backGroundColor: "inactive_container",
      value: "Deleted",
    });
  } else if (
    driverIncentiveHistory?.driverIncentiveHistorydata?.is_expired === true
  ) {
    statusList?.push({
      backGroundColor: "inactive_container",
      value: "Expired",
    });
  }
  return (
    <div>
      <InnerLayout
        mainHeading={`${
          driverIncentiveHistory?.driverIncentiveHistorydata
            ?.incentive_classification
            ? driverIncentiveHistory?.driverIncentiveHistorydata
                ?.incentive_classification
            : "--"
        } - ${
          driverIncentiveHistory?.driverIncentiveHistorydata?.incentive_code ??
          "--"
        }`}
        statusList={statusList}
      >
        <div>
          {/* <div className="row mt-2">
      {incentiveHistory.map((item)=>{
        return(
          <>
          <div className="d-flex mb-2" key={item.label}>
                        <div
                          className="secondary_color fw_500"
                          style={{ width: "270px" }}
                        >
                          {item.label}
                        </div>
                        <div className="text-start primary_color fw_500">
                          {item.values}
                        </div>
                      </div>
          </>
        )
        })}
      </div> */}

          {/* <div className='d-flex'>
      {incentiveHistory.map((item)=>{return(
        <>
        <div className='d-flex'>
  <div>Title 1</div>
  <div>Value 1</div>
</div>
<div className='d-flex'>
  <div>Title 2</div>
  <div></div>
</div>
        </>
      )})}
          
</div> */}

          {/* <div className="row mt-2">
            {Array.from(
              { length: Math.ceil(incentiveHistory?.length / 3) },
              (_, i) => (
                <div
                  className={`col-12 col-md-6 fs_15`}
                  key={i}
                >
                  {incentiveHistory?.slice(i * 4, i * 4 + 4)?.map((item) => (
                    <div className="d-flex mb-2" key={item.label}>
                      <div
                        className="secondary_color fw_500"
                      >
                        {item?.label}
                      </div>
                      <div
                        className="flex-grow-1 text-start primary_color fw_500"
                      >
                        {item?.values}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div> */}

          <div className="row mt-2">
            {Array.from(
              { length: Math.ceil(incentiveHistoryDetails?.length / 3) },
              (_, i) => (
                <div className={`col-12 col-md-6  fs_15`} key={i}>
                  {incentiveHistoryDetails
                    ?.slice(i * 4, i * 4 + 4)
                    ?.map((item) => (
                      <div className="d-flex mb-2" key={item.label}>
                        <div
                          className="secondary_color fw_500"
                          style={{ width: "180px" }}
                        >
                          {item?.label}
                        </div>
                        <div
                          className="flex-grow-1 text-start primary_color ms-4 fw_500"
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
        </div>
        <div className="mt-2">
          <div className=" table_container">
            <table className="table">
              <thead>
                <tr className="pale_blue_bg text-nowrap">
                  {/* <th scope="col" className="ongoing_heading_first_list">
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                    id="mastercheck"
                  />
                </th> */}
                  <SearchInputfield title={"Deposit date"} />
                  <SearchInputfield title={"Deposit Time"} />
                  <SearchInputfield title={"Driver ID"} />
                  <SearchInputfield title={"Driver Type"} />
                  <SearchInputfield title={"Ride Type"} />
                  <SearchInputfield title={"Booking Details"} />
                  <SearchInputfield
                    title={"Current Balance Deposit Amount (₹)"}
                  />
                  <th className="ongoing_heading_last_list"></th>
                </tr>
              </thead>
              <tbody className="light_blue_bg text-nowrap">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={
                    driverIncentiveHistory?.driverIncentiveHistoryTableData
                      ?.length === 0
                  }
                >
                  {driverIncentiveHistory?.driverIncentiveHistoryTableData?.map(
                    (item, id) => (
                      <tr key={id} className={"light_blue_bg text-nowrap"}>
                        <td>
                          <a
                            className=" secondary_color"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.deposite_date ?? "--")}
                            </span>
                          </a>
                        </td>
                        <td>
                          <a
                            className=" secondary_color"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="secondary_color fs_14 fw_500">
                              {item?.deposite_time ?? "--"}
                              {/* {formatDateTime(item?.deposite_time ?? "--")} */}
                            </span>
                          </a>
                        </td>
                        <td>
                          <a
                            className=" secondary_color"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver?.driver_id2 ?? "--"}
                            </span>
                          </a>
                        </td>
                        <td>
                          <a
                            className=" secondary_color"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver?.driver_type ?? "--"}
                            </span>
                          </a>
                        </td>
                        <td>
                          <a
                            className=" secondary_color"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver_default_ride_type ?? "--"}
                            </span>
                          </a>
                        </td>
                        <td>
                          <a
                            className=" secondary_color"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver_default_ride_type ?? "--"}
                            </span>
                          </a>
                        </td>
                        <td>
                          <a
                            className=" secondary_color"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="secondary_color fs_14 fw_500">
                              {item?.driver_default_ride_type ?? "--"}
                            </span>
                          </a>
                        </td>
                      </tr>
                    )
                  )}
                  {/* {Array.isArray(driverIncentiveHistory) && driverIncentiveHistory.map((item, id) => (
  <tr key={id} className="light_blue_bg text-nowrap">
    <td>
      <a className="secondary_color" style={{ textDecoration: 'none' }}>
        <span className="secondary_color fs_14 fw_500">
          {item?.deposite_date ?? "--"}
        </span>
      </a>
    </td>
  </tr>
))} */}
                </LoadAndError>
              </tbody>
            </table>
          </div>
        </div>
        {driverIncentiveHistory?.length === 0 ? (
          <></>
        ) : (
          <TablePaginations
            paginate={handlePagination}
            currentPage={page}
            pageData={pageData}
          />
        )}
      </InnerLayout>
    </div>
  );
};

export default DriverIncentiveHistoryFindoneView;
