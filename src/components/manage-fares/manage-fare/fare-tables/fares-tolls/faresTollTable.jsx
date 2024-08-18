import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "../../manageFaresTables.css";
import { archivedTollsListAction } from "../../../../../redux/actions/archiveFaresAction";
import { FaresTollsListAction } from "../../../../../redux/actions/manageFaresAction";
import { getNewPath, useSortableData } from "../../../../helper";
import errorToast from "../../../../utilits/errorToast";
import LoadAndError from "../../../../utilits/loadAndError";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";

const FaresTollTable = ({ paramsId, location }) => {
  const currentPath = window?.location?.pathname;
  const newPath = getNewPath(currentPath);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_archived_fare =
    location?.state?.fare === "archivedFare" ? true : false;
  const is_editable = location?.state?.edit;
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [TollsZoneList, setTollsZoneList] = useState([]);
  const [loading, setLoading] = useState(false);
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
      location?.state?.fare === "archivedFare"
        ? dispatch(
            archivedTollsListAction(
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
            FaresTollsListAction(
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
  }, [page, search]);

  const onSuccess = (data) => {
    setTollsZoneList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
  };
  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  const { items, requestSort, sortConfig } = useSortableData(TollsZoneList);
  return (
    <>
      <div className=" mt-3 local_zones_table_container table_container">
        {loading && <LoadingSpinnerTable />}
        <table className="pale_blue_bg manage_fares_local_zones_table_container w-100 text-nowrap table">
          <thead className="w-100 pale_blue_bg py-1 text-start fs_14 border-none text-nowrap primary_color fw_600">
            <th className="text-nowrap ps-3 py-2" scope="col">
              Toll Zone
            </th>
            <th className="text-nowrap ps-4 py-1" scope="col">
              {is_archived_fare ? "Archived on" : "Created on"}
            </th>
            <th className="text-nowrap ps-4 py-1" scope="col">
              {is_archived_fare ? "Archived by" : "Created by"}
            </th>
            <th className="text-nowrap ps-4 py-1" scope="col">
              Last Updated At
            </th>

            <th className="ps-4 py-1" scope="col">
              Last Updated By
            </th>

            <th></th>
            {is_archived_fare || is_editable === false ? <></> : <th></th>}
          </thead>
          <tbody className="light_blue_bg">
            <LoadAndError
              loader={loading}
              error={error}
              status={TollsZoneList.length === 0}
            >
              {items?.map((item) => {
                return (
                  <tr key={item?.id} className=" secondary_color fw_500 ">
                    <td className=" pb-2 pt-2 ps-3">
                      {item?.city_name ? item?.city_name : "--"}
                    </td>

                    <td className="pb-2 pt-2 ps-4">
                      {" "}
                      {is_archived_fare
                        ? item?.archived_on
                          ? moment(item?.archived_on).format("DD-MM-YYYY ")
                          : "--"
                        : item?.created_at
                        ? moment(item?.created_at).format("DD-MM-YYYY ")
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {" "}
                      {is_archived_fare
                        ? item?.archivedBy?.user_name
                          ? item?.archivedBy?.user_name
                          : "--"
                        : item?.createdBy?.user_name
                        ? item?.createdBy?.user_name
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {item?.fare_updated_on
                        ? moment(item?.fare_updated_on).format("DD-MM-YYYY ")
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {item?.fareUpdatedBy?.user_name
                        ? item?.fareUpdatedBy?.user_name
                        : "--"}
                    </td>

                    <td className="pb-2 pt-2 ps-4">
                      <button
                        className="fs_14 blue_color_bg  border_radius view_btn  px-3 white_color border_none"
                        onClick={() => {
                          navigate(
                            is_archived_fare === true
                              ? `/archived-toll-fares/view/${paramsId[0]}&${paramsId[1]}&${item?.id}`
                              : `${newPath}view/${paramsId[0]}&${paramsId[1]}&${item?.id}`,
                            {
                              state: {
                                edit: false,
                                city_name: item?.city_name,
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

export default FaresTollTable;
