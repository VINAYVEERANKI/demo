import React, { useState } from "react";
import styles from "../manage-riders/ridersComponent.module.css";
import style from "../../modules/manage-admins/manage-admins.module.css";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import moment from "moment";
import LoadAndError from "../utilits/loadAndError";
import {
  formatAmount,
  navigationFn,
  removeUnderScore,
  useSortableData,
} from "../helper";
import TablePaginations from "../utilits/pagination";
import { NavLink } from "react-router-dom";
import SearchInputfield from "../form/searchInputfield";
import { useEffect } from "react";

const DriverPremiumHistoryTable = ({
  loading,
  setLoading,
  error,
  handlePagination,
  page,
  pageData,
  pendingList,
  driverPremiumData
}) => {
  const { items, requestSort, sortConfig } = useSortableData(pendingList);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  console.log(driverPremiumData);
//   useEffect(() => {
//     pageData && setLoading(false);
//   });
  return (
    <>
      <div className={`${styles.rider_history_table_container}`}>
        {loading && <LoadingSpinnerTable />}
        {/* {tableHeading.map((item, index) => {
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
                  })} */}
        <table className={`table manage_fare_list_navbar text-nowrap`}>
          <thead>
            <tr className={`orange_bg`}>
              <th scope="col" className={`${style.first_list} transparent_bg`}>
                <span className="white_color fs_14 fw_500">Premium Ref Id</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Premium Type</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Validity</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Status</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Created By</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">
                  Transaction Date
                </span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Start Date</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Expiry Date</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">
                  Transaction mode
                </span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Payment status</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Auto-renewal</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">
                  Next billing date
                </span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Transaction ID</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Updated date</span>
              </th>

              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500 ">Updated by</span>
              </th>
              <th scope="col" className={`${style.last_list} transparent_bg`}>
                <span
                  className={`white_color fs_14 text-nowrap d-flex align-items-center fw_500`}
                >
                  Amount(₹)
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="light_blue_bg">
            {/* <LoadAndError
              loader={loading}
              error={error}
              status={rideData?.data?.length === 0}
            > */}
            {driverPremiumData?.data?.map((item, index) => (
              <tr key={index}>
                <td>
                  <NavLink
                    className=" secondary_color"
                    to={navigationFn(item?.premium_ref_id)}
                    // target='_blank'
                  >
                    <span className="secondary_color  fs_14 fw_500">
                      {item?.premium_ref_id ? item?.premium_ref_id : "--"}
                    </span>
                  </NavLink>
                </td>

                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.premium_type ? item?.premium_type : "--"}
                  </span>
                </td>
                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.validity ? item?.validity : "--"}
                  </span>
                </td>
                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.status ? item?.status : "--"}
                  </span>
                </td>
                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.created_by ? item?.created_by : "--"}
                  </span>
                </td>
                <td>
                  <span className="secondary_color fs_14 fw_500">
                    {item?.transaction_date === null
                      ? "--"
                      : moment(item?.transaction_date).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                  </span>
                </td>
                <td>
                  <span className="secondary_color fs_14 fw_500">
                    {item?.start_date === null
                      ? "--"
                      : moment(item?.start_date).format("DD-MM-YYYY HH:mm:ss")}
                  </span>
                </td>
                <td>
                  <span className="secondary_color fs_14 fw_500">
                    {item?.expiry_date === null
                      ? "--"
                      : moment(item?.expiry_date).format("DD-MM-YYYY HH:mm:ss")}
                  </span>
                </td>

                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.transaction_mode ? item?.transaction_mode : "--"}
                  </span>
                </td>
                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.payment_status ? item?.payment_status : "--"}
                  </span>
                </td>
                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.auto_renewal ? item?.auto_renewal : "--"}
                  </span>
                </td>
                <td>
                  <span className="secondary_color fs_14 fw_500">
                    {item?.next_billing_date === null
                      ? "--"
                      : moment(item?.next_billing_date).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                  </span>
                </td>
                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.transaction_id ? item?.transaction_id : "--"}
                  </span>
                </td>
                <td>
                  <span className="secondary_color fs_14 fw_500">
                    {item?.update_date === null
                      ? "--"
                      : moment(item?.update_date).format("DD-MM-YYYY HH:mm:ss")}
                  </span>
                </td>
                <td>
                  <span className="secondary_color  fs_14 fw_500">
                    {item?.updated_by ? item?.updated_by : "--"}
                  </span>
                </td>

                <td>
                  <span className="secondary_color fs_14 fw_500">
                    {item?.amount ? formatAmount(item?.amount) : "--"}
                  </span>
                </td>
              </tr>
            ))}
            {/* </LoadAndError> */}
          </tbody>
        </table>
      </div>
      <div className="mt-5 pt-3">
        <TablePaginations
          paginate={handlePagination}
          currentPage={page}
          pageData={pageData}
        />
      </div>
    </>
  );
};

export default DriverPremiumHistoryTable;
