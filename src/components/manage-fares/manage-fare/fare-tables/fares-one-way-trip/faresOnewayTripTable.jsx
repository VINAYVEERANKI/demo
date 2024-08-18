import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { FaresOneWaytripListAction } from "../../../../../redux/actions/manageFaresAction";
import { getNewPath, useSortableData } from "../../../../helper";
import LoadAndError from "../../../../utilits/loadAndError";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import { archivedOneWaytripListAction } from "../../../../../redux/actions/archiveFaresAction";

const FaresOnewayTripTable = ({ paramsId, location }) => {
  const currentPath = window?.location?.pathname;
  const newPath = getNewPath(currentPath);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_archived_fare =
    location?.state?.fare === "archivedFare" ? true : false;
  const is_editable = location?.state?.edit;
  const [loading, setLoading] = useState(false);
  const [oneWayTripList, setOneWayTripList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const handleSearch = (value) => {
    setNumberOfFilters(0);
    setSearch(value);
    for (let key in value) {
      if (value[key]) {
        setNumberOfFilters((prev) => prev + 1);
      }
    }

    setPage(0);
  };

  useEffect(() => {
    setLoading(true);
    {
      is_archived_fare
        ? dispatch(
            archivedOneWaytripListAction(
              {
                main_zone_id: paramsId[0],
                search: {
                  id: "",
                  city_name: "",
                },
              },
              page,
              onSuccess,
              onError
            )
          )
        : dispatch(
            FaresOneWaytripListAction(
              {
                main_zone_id: paramsId[0],
                search: {
                  id: "",
                  city_name: "",
                },
              },
              page,
              onSuccess,
              onError
            )
          );
    }
  }, []);
  const onSuccess = (data) => {
    setLoading(false);
    setOneWayTripList(data?.data?.data);
  };
  const onError = (data) => {
    setLoading(false);
    setError(true);
    console.log(data?.data);
  };

  const { items, requestSort, sortConfig } = useSortableData(oneWayTripList);
  return (
    <>
      <div className=" mt-3 local_zones_table_container table_container">
        {loading && <LoadingSpinnerTable />}
        <table className="manage_fares_local_zones_table_container w-100 text-nowrap">
          <thead className="w-100  pale_blue_bg ">
            <tr className="text-start  fs_14 border-none  text-nowrap primary_color fw_600">
              <th className="text-nowrap ps-3  py-2" scope="col">
                Zone
              </th>

              <th className="text-nowrap ps-4" scope="col">
                Drop-Off Location
              </th>
              <th className="text-nowrap ps-4" scope="col">
                {is_archived_fare ? "Archived on" : "Created on"}
              </th>
              <th className="text-nowrap ps-4" scope="col">
                {is_archived_fare ? "Archived by" : "Created by"}
              </th>
              <th className="text-nowrap ps-4" scope="col">
                Last Updated At
              </th>

              <th className="ps-4" scope="col">
                Last Updated By
              </th>

              <th></th>
              {is_archived_fare || is_editable === false ? <></> : <th></th>}
            </tr>
          </thead>
          <tbody>
            <LoadAndError
              loader={loading}
              error={error}
              status={oneWayTripList.length === 0}
            >
              {items?.map((item, index) => {
                return (
                  <tr key={item?.id} className="secondary_color fw_500 ">
                    <td className=" pb-2 pt-2 ps-3">{paramsId[1] ?? "--"}</td>
                    <td className=" pb-2 pt-2 ps-4">
                      {" "}
                      {item?.city_name ? item?.city_name : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {is_archived_fare
                        ? item?.archived_on
                          ? moment(item?.archived_on).format("DD-MM-YYYY ")
                          : "--"
                        : item?.created_at
                        ? moment(item?.created_at).format("DD-MM-YYYY ")
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {is_archived_fare
                        ? item?.archivedBy?.user_name
                          ? item?.archivedBy?.user_name
                          : "--"
                        : item?.createdBy?.user_name
                        ? item?.createdBy?.user_name
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {item?.oneWayOutStationFare?.updated_on
                        ? moment(item?.oneWayOutStationFare?.updated_on).format(
                            "DD-MM-YYYY"
                          )
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {" "}
                      {item?.oneWayOutStationFare?.updatedBy?.user_name
                        ? item?.oneWayOutStationFare?.updatedBy?.user_name
                        : "--"}
                    </td>

                    <td className="pb-2 pt-2 ps-4">
                      <button
                        className="fs_14 blue_color_bg  border_radius view_btn  px-3 white_color border_none"
                        onClick={() => {
                          navigate(
                            is_archived_fare
                              ? `/archived-oneway-trip-fares/view/${paramsId[0]}&${paramsId[1]}&${item?.id}`
                              : `${newPath}view/${paramsId[0]}&${paramsId[1]}&${item?.id}`,
                            {
                              state: {
                                edit: false,
                                is_archived_fare: is_archived_fare,
                                city_name: item?.city_name,
                              },
                            }
                          );
                        }}
                      >
                        View
                      </button>
                    </td>
                    {is_archived_fare || is_editable === false ? (
                      <></>
                    ) : (
                      <td className="pb-2 pt-2 ps-2">
                        <button
                          className="border_none primary_bg  px-3 white_color border_radius"
                          onClick={() => {
                            navigate(
                              `${newPath}edit/${paramsId[0]}&${paramsId[1]}&${item?.id}`,
                              {
                                state: {
                                  edit: true,
                                  city_name: item?.city_name,
                                },
                              }
                            );
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </LoadAndError>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FaresOnewayTripTable;
