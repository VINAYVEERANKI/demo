import React, { useState } from "react";
import styles from "../manage-riders/ridersComponent.module.css";
import style from "../../modules/manage-admins/manage-admins.module.css";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import moment from "moment";
import LoadAndError from "../utilits/loadAndError";
import { formatAmount, navigationFn, removeUnderScore, useSortableData } from "../helper";
import TablePaginations from "../utilits/pagination";
import { NavLink } from "react-router-dom";
import SearchInputfield from "../form/searchInputfield";

const RideHistoryTable = ({
  rideData,
  loading,
  error,
  handlePagination,
  page,
  pageData,
  pendingList,
}) => {
  const { items, requestSort, sortConfig } = useSortableData(pendingList);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const tableHeading = [
    { title: "Booking ID", value: "booking_id_2" },
    { title: "Booking Classification", value: "booking_classification" },
    { title: "Start date & time", value: "start_date" },
    { title: "End date & time", value: "end_date" },
    { title: "Trip Duration", value: "trip_duration" },
    { title: "Final Fare(₹)", value: "final_fare" },
  ];


  console.log(rideData, "skfhaksf");
  return (
    <>
      <div className={`orange_color fs_16 fw_600 mb-2`}>Ride History</div>
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
                <span className="white_color fs_14 fw_500">Booking ID</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Driver Vehicle ID</span>
              </th>

              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500 ">
                  Booking Classification
                </span>
              </th>

              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 text-nowrap  d-flex align-items-center fw_500 ">
                  Start date & time
                </span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14  text-nowrap d-flex align-items-center fw_500">
                  End date & time
                </span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                {" "}
                <span className={`white_color fs_14 text-nowrap  d-flex align-items-center fw_500 transparent_bg`}>
                  Trip Duration
                </span>
              </th>
              <th scope="col" className={`${style.last_list} transparent_bg`}>
                <span className={`white_color fs_14 text-nowrap d-flex align-items-center fw_500`}>
                  Final Fare(₹)
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="light_blue_bg">
            <LoadAndError
              loader={loading}
              error={error}
              status={rideData?.data?.length === 0}
            >
              {rideData?.data?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <NavLink
                      className=" secondary_color"
                      to={navigationFn(
                        item?.booking_classification,
                        item?.booking_id
                      )}
                    // target='_blank'
                    >
                      <span className="secondary_color  fs_14 fw_500">
                        {item?.booking_id_2 ? item?.booking_id_2 : "--"}
                      </span>
                    </NavLink>
                  </td>

                  <td className="text-center">
                    <span className="secondary_color fs_14 fw_500">
                      {item?.booking_classification
                        ? removeUnderScore(item?.booking_classification)
                        : "--"}
                    </span>
                  </td>

                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.start_date === null
                        ? "--"
                        : moment(item?.start_date).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.end_date === null
                        ? "--"
                        : moment(item?.end_date).format("DD-MM-YYYY HH:mm:ss")}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.trip_duration ? item?.trip_duration : "--"}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.final_fare ? formatAmount(item?.final_fare) : "--"}
                    </span>
                  </td>
                </tr>
              ))}
            </LoadAndError>
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

export default RideHistoryTable;
