import React, { useEffect, useState } from "react";
import moment from "moment";
import SearchInputfield from "../../../form/searchInputfield";
import errorToast from "../../../utilits/errorToast";
import LoadAndError from "../../../utilits/loadAndError";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import TablePaginations from "../../../utilits/pagination";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { insertSpaces, statusColor, useSortableData } from "../../../helper";
import { driverIncentiveUseageHisListAction } from "../../../../redux/actions/incentives/useageHisIncentivesAction";

const DriverIncentiveHistoryTable = ({search}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  // const [search, setSearch] = useState({ value: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [incentiveData, setIncentiveData] = useState();
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(incentiveData);

useEffect(()=>{
setLoading(true);
dispatch(
  driverIncentiveUseageHisListAction(
    {
      "search":{
      "zone_name":search?.zone_name,
      "id":"",
      "incentive_code":search?.incentive_code,
      "incentive_classification":search?.incentive_classification,
      "driver_default_ride_type":search?.driver_default_ride_type,
      "incentive_coupon_type":search?.incentive_coupon_type,
      "campaign_period":"",
      "incentive_status":search?.incentive_status,
      "campaign_status": search?.campaign_status,
      "approved_by": search?.approved_by,
      }
  },
        page,
          // ()=>{},
          // ()=>{}
          onSuccess,
          onError
  )
)
},[page,search]);

const onSuccess = (data)=>{
  setError(false);
  setLoading(false);
  setIncentiveData(data.data.data);
  setPageData({
    noOfItems: data.data.count,
    noOfPages:data.data.pages,
  })
};

const onError = (data)=>{
  errorToast(data.data.data);
  setError(true);
  setLoading(false);
}

function handlePagination(type){
  if(type === "+"){
    if(page + 1 < pageData.noOfPages) setPage((prev)=>prev+1);
  }else if (type === "-") if (page>0) setPage ((prev)=>prev-1);
}
const tableHeading = [
  {title:"Incentive ID", value:"incentive_code"},
  {title:"Incentive Classification", value:"incentive_classification"},
  {title:"Zone", value:"ZoneName.zone_name"},
  {title:"Driver Default Ride Type", value:"driver_default_ride_type"},
  {title:"Incentive Coupon Type", value:"incentive_coupon_type"},
  {title:"Campaign Period", value:"campaign_period"},
  {title:"Accounts Availed", value:"accounts_availed"},
  {title:"Status", value:"incentive_status"},
];
// console.log(driverIncentiveUseageHisListAction);
  return (
    <div>
       <div className="mt-2">
        <div className=" table_container">
        <table className="table">
        <thead>
              <tr className="pale_blue_bg text-nowrap">
                <th scope="col" className="ongoing_heading_first_list">
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                    id="mastercheck"
                  />
                </th>
                {/* <SearchInputfield title={"Incentive ID"} />
                <SearchInputfield title={"Incentive Classification"} />
                <SearchInputfield title={"Zone"} />
                <SearchInputfield title={"Driver Default Ride Type"} />
                <SearchInputfield title={"Incentive Coupon Type"} />
                <SearchInputfield title={"Campaign Period"} />
                <SearchInputfield title={"Accounts Availed"} />
                <SearchInputfield title={"Status"} /> */}
                {tableHeading
                  .map((item, index) => {
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
                status={incentiveData?.length === 0}
              >
                {incentiveData?.map((item, id) => (
                  <tr key={id} className={"light_blue_bg text-nowrap"}>
                    <th scope="row">
                      <input
                        id={item?.id}
                        type="checkbox"
                        className="manage_fare_checkbox ms-2 "
                      />
                    </th>

                    <td>
                      <a className=" secondary_color" style={{ textDecoration: 'none' }}>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.incentive_code ?? "--"}
                        </span>
                      </a>
                    </td>

                    <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.incentive_classification
                          ? insertSpaces(item?.incentive_classification)
                          : "--"}
                      </span>
                    </td>

                    <td>
                      <span className={"secondary_color fs_14 fw_500"}>
                        {item?.ZoneName?.zone_name ?? "--"}
                      </span>
                    </td>

                    <td>
                    <span className="secondary_color fs_14 fw_500">
                        {item?.driver_default_ride_type
                          ? insertSpaces(item?.driver_default_ride_type)
                          : "--"}
                      </span>
                    </td>

                    <td>
                    <span className="secondary_color fs_14 fw_500">
                        {item?.incentive_coupon_type
                          ? insertSpaces(item?.incentive_coupon_type)
                          : "--"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <span className="secondary_color fs_14 fw_500">
                        {item?.campaign_period ? item?.campaign_period : "--"}
                      </span>
                    </td>
                   
                    <td>
                    <span className="secondary_color fs_14 fw_500">
                        {item?.accounts_availed
                          ? insertSpaces(item?.accounts_availed)
                          : "--"}
                      </span>
                    </td>

                    {/* <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.created_at || item?.approved_at
                          ? moment(
                              item?.created_at || item?.approved_at
                            ).format("DD-MM-YYYY,HH:mm")
                          : "--"}
                      </span>
                    </td> */}
                    {/* <td>
                      <span className="secondary_color fs_14 fw_500">
                        {item?.createdBy?.user_name ??
                          item?.approvedBy?.user_name ??
                          "--"}
                      </span>
                    </td> */}
                    {/* <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item?.incentive_status
                        )} fs_14 fw_500`}
                      >
                        {item?.incentive_status
                          ? insertSpaces(item?.incentive_status)
                          : "--"}
                      </span>
                    </td> */}
                    <td>
                      {" "}
                      <span
                        className={`${statusColor(
                          item?.incentive_status
                        )} fs_14 fw_500`}
                      >
                        {item?.incentive_status ? item?.incentive_status : "--"}
                      </span>
                    </td>

                    <td className="">
                      <NavLink
                        className="border_none border_radius fs_14  me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                        to={`/driver-incentive/usage-history/view/${item?.id}`}
                        state={{
                          edit: false,
                          referral_status: "reviewRequired",
                          referralID: item?.referral_id,
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
        {incentiveData?.length === 0 ? (
        <></>
      ) : (
        <TablePaginations
          paginate={handlePagination}
          currentPage={page}
          pageData={pageData}
        />
      )}
    </div>
  )
}

export default DriverIncentiveHistoryTable