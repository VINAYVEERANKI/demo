import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { archivedRentalListAction } from "../../../../../redux/actions/archiveFaresAction";
import { RentalListAction } from "../../../../../redux/actions/manageFaresAction";
import LoadAndError from "../../../../utilits/loadAndError";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import { getNewPath } from "../../../../helper";

const FaresRentalTable = ({ paramsId, location }) => {
  const currentPath = window?.location?.pathname;
  const newPath = getNewPath(currentPath);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_archived_fare =
    location?.state?.fare === "archivedFare" ? true : false;
  const is_editable = location?.state?.edit;
  const [loading, setLoading] = useState(false);
  const [rentalList, setRentalList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  console.log(paramsId[0]);
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
            archivedRentalListAction(
              {
                main_zone_id: paramsId[0],
                search: {
                  id: "",
                  ride_type: "",
                },
              },
              page,
              onSuccess,
              onError
            )
          )
        : dispatch(
            RentalListAction(
              {
                main_zone_id: paramsId[0],
                search: {
                  ride_type: "",
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
    setRentalList(data?.data?.data);
  };
  const onError = (data) => {
    setLoading(false);
    setError(true);
  };


  return (
    <>
      <div className=" mt-3 local_zones_table_container table_container">
        {loading && <LoadingSpinnerTable />}
        <table className="     manage_fares_local_zones_table_container w-100 ">
          <thead className=" w-100  pale_blue_bg ">
            <tr className="  text-start  fs_14 border-none  text-nowrap primary_color fw_600">
              <th className="   text-nowrap ps-3  py-2" scope="col">
                Ride Type
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
          <tbody className="">
            <LoadAndError
              loader={loading}
              error={error}
              status={rentalList.length === 0}
            >
              {rentalList?.map((item) => {
                return (
                  <tr key={item?.id} className=" secondary_color fw_500 ">
                    <td className=" pb-2 pt-2 ps-3">
                      {item?.ride_type ? item?.ride_type : "--"}
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
                      {" "}
                      {item?.updated_on
                        ? moment(item?.updated_on).format("DD-MM-YYYY")
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {" "}
                      {item?.updatedBy?.user_name ?? "--"}
                    </td>

                    <td className="pb-2 pt-2 ps-4">
                      <button
                        className="fs_14 blue_color_bg  border_radius view_btn  px-3 white_color border_none"
                        onClick={() => {
                          navigate(
                            is_archived_fare
                              ? `/archived-rental-fares/view/${paramsId[0]}&${paramsId[1]}&${item?.id}`
                              : `${newPath}view/${paramsId[0]}&${paramsId[1]}&${item?.id}`,
                            {
                              state: {
                                edit: false,
                                ride_type: item?.ride_type,
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
                                  ride_type: item?.ride_type,
                                  ride_type_id: item?.ride_type_id,
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

export default FaresRentalTable;
