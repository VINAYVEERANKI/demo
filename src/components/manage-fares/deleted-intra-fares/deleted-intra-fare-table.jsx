import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { capitalizeFirstLetter } from "../../helper";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import * as deletedIntraFareAction from "../../../redux/actions/deletedIntrafareAction";
import errorToast from "../../utilits/errorToast";

const DeletedIntraFareTable = ({ params, tableType, location }) => {
  const paramsId = params?.split("&");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [FaresLocalList, setFaresLocalList] = useState([]);
  console.log(location?.state?.fare);
  useEffect(() => {
    setLoading(true);
    if (tableType === "LocalFare") {
      if (location?.state?.fare === "Archived") {
        dispatch(
          deletedIntraFareAction.archiveddeletedIntraFaresLocalListAction(
            {
              main_zone_id: paramsId[0],
              search: {
                city_name: "",
                local_zone_code: "",
                city_status: "",
              },
            },
            page,
            onFetchListSuccess,
            onFetchListError
          )
        );
      } else {
        dispatch(
          deletedIntraFareAction.deletedIntraFaresLocalListAction(
            {
              main_zone_id: paramsId[0],
              search: {
                city_name: "",
                local_zone_code: "",
                city_status: "",
              },
            },
            page,
            onFetchListSuccess,
            onFetchListError
          )
        );
      }
    } else if (tableType === "SpecialFare") {
      if (location?.state?.fare === "Archived") {
        dispatch(
          deletedIntraFareAction.archiveddeletedIntraFaresSpecialListAction(
            {
              main_zone_id: paramsId[0],
              search: {
                id: "",
                city_name: "",
              },
            },
            page,
            onFetchListSuccess,
            onFetchListError
          )
        );
      } else {
        dispatch(
          deletedIntraFareAction.deletedIntraFaresSpecialListAction(
            {
              main_zone_id: paramsId[0],
              search: {
                id: "",
                city_name: "",
              },
            },
            page,
            onFetchListSuccess,
            onFetchListError
          )
        );
      }
    } else if (tableType === "TollFare") {
      if (location?.state?.fare === "Archived") {
        dispatch(
          deletedIntraFareAction.archiveddeletedIntraFaresTollsListAction(
            {
              main_zone_id: paramsId[0],
              search: {
                id: "",
                city_name: "",
              },
            },
            page,
            onFetchListSuccess,
            onFetchListError
          )
        );
      } else {
        dispatch(
          deletedIntraFareAction.deletedIntraFaresTollsListAction(
            {
              main_zone_id: paramsId[0],
              search: {
                id: "",
                city_name: "",
              },
            },
            page,
            onFetchListSuccess,
            onFetchListError
          )
        );
      }
    } else if (tableType === "onewayTripFare") {
      if (location?.state?.fare === "Archived") {
        dispatch(
          deletedIntraFareAction.archiveddeletedIntraFaresOnewayListAction(
            {
              main_zone_id: paramsId[0],
              search: {
                id: "",
                city_name: "",
              },
            },
            page,
            onFetchListSuccess,
            onFetchListError
          )
        );
      } else {
        dispatch(
          deletedIntraFareAction.deletedIntraFaresOnewayListAction(
            {
              main_zone_id: paramsId[0],
              search: {
                id: "",
                city_name: "",
              },
            },
            page,
            onFetchListSuccess,
            onFetchListError
          )
        );
      }
    }
  }, []);
  const onFetchListSuccess = (data) => {
    setLoading(false);
    setError(false);
    setFaresLocalList(data?.data?.data);
  };
  const onFetchListError = (data) => {
    setLoading(false);
    console.log(data?.data);
    setError(true);
    errorToast(data?.data?.data);
  };

  const navigateFn = (category, id) => {
    if (category === "LocalDefinedCity") {
      return `/deleted-intra-fares/local/view/${paramsId[0]}&${paramsId[1]}&${id}`;
    } else if (category === "OutstationDefinedCity") {
      return `/deleted-intra-fares/oneway/view/${paramsId[0]}&${paramsId[1]}&${id}`;
    } else if (category === "SpecialZone") {
      return `/deleted-intra-fares/special/view/${paramsId[0]}&${paramsId[1]}&${id}`;
    } else if (category === "TollZone") {
      return `/deleted-intra-fares/tolls/view/${paramsId[0]}&${paramsId[1]}&${id}`;
    }
  };
  return (
    <div className=" mt-3 local_zones_table_container  table_container">
      {loading && <LoadingSpinnerTable />}
      <table className="pale_blue_bg   manage_fares_local_zones_table_container w-100 text-nowrap">
        <thead className=" w-100  pale_blue_bg ">
          <tr className="  text-start  fs_14 border-none  text-nowrap primary_color fw_600">
            <th className="   text-nowrap ps-3  py-2 " scope="col">
              Zone ID
            </th>
            {/* <th className="text-nowrap ps-4" scope="col ">
              Zone Name
            </th> */}
            <th className="text-nowrap ps-4" scope="col">
              {tableType === "onewayTripFare"
                ? "Drop-Off Location"
                : "City Name"}
            </th>

            <th className="text-nowrap ps-4" scope="col">
              Deleted At
            </th>
            <th className="text-nowrap ps-4" scope="col">
              Deleted By
            </th>

            <th></th>
          </tr>
        </thead>
        <tbody className="light_blue_bg">
          <LoadAndError
            loader={loading}
            error={error}
            status={FaresLocalList?.length === 0}
          >
            {FaresLocalList?.map((item) => {
              return (
                <tr key={item?.id} className=" secondary_color fw_500 ">
                  <td className=" pb-2 pt-2 ps-3">
                    {item?.local_zone_code ??
                      item?.outstation_zone_code ??
                      item?.special_zone_code ??
                      item?.toll_zone_code ??
                      "--"}
                  </td>
                  {/* <td className=" pb-2 pt-2 ps-4">
                    {" "}
                    {paramsId[1] ? capitalizeFirstLetter(paramsId[1]) : "--"}
                  </td> */}
                  <td className=" pb-2 pt-2 ps-4 w_20">
                    {" "}
                    {item?.city_name
                      ? capitalizeFirstLetter(item?.city_name)
                      : "--"}
                  </td>
                  <td className="pb-2 pt-2 ps-4">
                    {item?.deleted_at
                      ? moment(item?.deleted_at).format("DD-MM-YYYY ")
                      : "--"}
                  </td>

                  <td className="pb-2 pt-2 ps-4">
                    {" "}
                    {item?.DeletedBy?.user_name
                      ? item?.DeletedBy?.user_name
                      : "--"}
                  </td>

                  <td className="pb-2 pt-2 ps-4">
                    <button
                      className="fs_14 blue_color_bg border_radius view_btn  px-3 white_color border_none"
                      onClick={() => {
                        navigate(`${navigateFn(item?.category, item?.id)}`, {
                          state: {
                            edit: false,
                            is_deleted_intra_fare: true,
                            city_name: item?.city_name,
                            fare: location?.state?.fare,
                            zoneId: item?.local_zone_code,
                            deletedAt: item?.deleted_at,
                            deletedBy: item?.DeletedBy?.user_name,
                          },
                        });
                      }}
                    >
                      {
                        tableType === "LocalFare" ?"View More":"View"
                      }
                      
                    </button>
                  </td>
                </tr>
              );
            })}
          </LoadAndError>
        </tbody>
      </table>
    </div>
  );
};

export default DeletedIntraFareTable;
