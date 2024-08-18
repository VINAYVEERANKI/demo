import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaresRoundTripListAction } from "../../../../../redux/actions/manageFaresAction";
import { getNewPath, useSortableData } from "../../../../helper";
import moment from "moment";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import LoadAndError from "../../../../utilits/loadAndError";
import { useNavigate } from "react-router";
import { archivedRoundTripListAction } from "../../../../../redux/actions/archiveFaresAction";
import errorToast from "../../../../utilits/errorToast";
const FaresRoundTripTable = ({ paramsId, location }) => {
  const currentPath = window?.location?.pathname;
  const newPath = getNewPath(currentPath);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_archived_fare =
    location?.state?.fare === "archivedFare" ? true : false;
  const is_editable = location?.state?.edit;
  const [loading, setLoading] = useState(false);
  const [roundTripList, setRoundTripList] = useState([]);
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
            archivedRoundTripListAction(
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
            FaresRoundTripListAction(
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
    setError(false);
    setRoundTripList(data?.data?.data);
  };
  const onError = (data) => {
    setLoading(false);
    setError(true);
    errorToast(data?.data?.data);
  };

  const { items, requestSort, sortConfig } = useSortableData(roundTripList);

  console.log(roundTripList);
  return (
    <>
      <div className=" mt-3 local_zones_table_container table_container">
        {loading && <LoadingSpinnerTable />}
        <table className="manage_fares_local_zones_table_container w-100 text-nowrap">
          <thead className=" w-100  pale_blue_bg ">
            <tr className="  text-start  fs_14 border-none  text-nowrap primary_color fw_600">
              <th className="   text-nowrap ps-3  py-2" scope="col">
                Zone
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
              status={roundTripList.length === 0}
            >
              {items?.map((item) => {
                return (
                  <tr key={item?.id} className=" secondary_color fw_500 ">
                    <td className=" pb-2 pt-2 ps-3">{paramsId[1] ?? "--"}</td>

                    <td className="pb-2 pt-2 ps-4">
                      {is_archived_fare
                        ? item?.archived_on
                          ? moment(item?.archived_on).format("DD-MM-YYYY ")
                          : "--"
                        : item?.created_on
                        ? moment(item?.created_on).format("DD-MM-YYYY ")
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
                      {item?.roundTripOutStationFare?.updated_on
                        ? moment(
                            item?.roundTripOutStationFare?.updated_on
                          ).format("DD-MM-YYYY ")
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {item?.roundTripOutStationFare?.updatedBy?.user_name
                        ? item?.roundTripOutStationFare?.updatedBy?.user_name
                        : "--"}
                    </td>

                    <td className="pb-2 pt-2 ps-4">
                      <button
                        className="fs_14 blue_color_bg  border_radius view_btn  px-3 white_color border_none"
                        onClick={() => {
                          navigate(
                            is_archived_fare
                              ? `/archived-round-trip-fares/view/${paramsId[0]}&${paramsId[1]}&${item?.id}`
                              : `${newPath}view/${paramsId[0]}&${paramsId[1]}&${item?.id}`,
                            {
                              state: {
                                edit: false,
                                is_archived_fare: is_archived_fare,
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
                          className="    border_none primary_bg  px-3 white_color border_radius"
                          onClick={() => {
                            navigate(
                              `${newPath}edit/${paramsId[0]}&${paramsId[1]}&${item?.id}`,
                              { state: { edit: true } }
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

export default FaresRoundTripTable;
