import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  deletedIntraFaresLocalIndividListAction,
  archiveddeletedIntraFaresLocalIndividListAction,
} from "../../../redux/actions/deletedIntrafareAction";
import { capitalizeFirstLetter } from "../../helper";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";

const DeletedLocalFaresTable = ({ params, location }) => {
  const paramsId = params?.split("&");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [FaresLocalIndiviList, setFaresLocalIndiviList] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (location?.state?.fare === "Archived") {
      dispatch(
        archiveddeletedIntraFaresLocalIndividListAction(
          {
            main_zone_id: paramsId[0],
            archived_zone_id: paramsId[2],
            search: {
              id: "",
              pick_up_location: "",
              drop_off_location: "",
            },
          },
          page,
          onFetchListSuccess,
          onFetchListError
        )
      );
    } else {
      dispatch(
        deletedIntraFaresLocalIndividListAction(
          {
            main_zone_id: paramsId[0],
            delete_zone_id: paramsId[2],
            search: {
              id: "",
              pick_up_location: "",
              drop_off_location: "",
            },
          },
          page,
          onFetchListSuccess,
          onFetchListError
        )
      );
    }
  }, []);
  const onFetchListSuccess = (data) => {
    setLoading(false);
    setError(false);
    setFaresLocalIndiviList(data?.data?.data);
  };
  const onFetchListError = (data) => {
    setLoading(false);
    console.log(data?.data);
    setError(true);
    errorToast(data?.data?.data);
  };
  return (
    <>
      <div className="d-flex align-items-center mt-2">
        <button
          className="back_icon ps-0 "
          onClick={() => {
            navigate(-1);
          }}
        >
          <i className="ri-arrow-left-s-line fs_23 fw_700 primary_color"></i>
        </button>
        <span className="primary_color fs_18 fw_600 ">
          {location?.state?.city_name + "  " + "City"}
        </span>{" "}
      </div>
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

              <th className="text-nowrap ps-4" scope="col ">
                Pickup Location
              </th>
              <th className="text-nowrap ps-4" scope="col ">
                Drop-Off Location
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
              status={FaresLocalIndiviList?.length === 0}
            >
              {FaresLocalIndiviList?.map((item) => {
                return (
                  <tr key={item?.id} className=" secondary_color fw_500 ">
                    <td className=" pb-2 pt-2 ps-3">
                      {location?.state?.zoneId ?? "--"}
                    </td>
                    {/* <td className=" pb-2 pt-2 ps-4">
                      {" "}
                      {paramsId[1] ? capitalizeFirstLetter(paramsId[1]) : "--"}
                    </td> */}
                    <td className=" pb-2 pt-2 ps-4">
                      {" "}
                      {item?.pick_up_location
                        ? capitalizeFirstLetter(item?.pick_up_location)
                        : "--"}
                    </td>
                    <td className=" pb-2 pt-2 ps-4">
                      {" "}
                      {item?.drop_off_location
                        ? capitalizeFirstLetter(item?.drop_off_location)
                        : "--"}
                    </td>
                    <td className="pb-2 pt-2 ps-4">
                      {location?.state?.deletedAt
                        ? moment(location?.state?.deletedAt).format(
                            "DD-MM-YYYY "
                          )
                        : "--"}
                    </td>

                    <td className="pb-2 pt-2 ps-4">
                      {" "}
                      {location?.state?.deletedBy
                        ? location?.state?.deletedBy
                        : "--"}
                    </td>

                    <td className="pb-2 pt-2 ps-4">
                      <button
                        className="fs_14 blue_color_bg  border_radius view_btn  px-3 white_color border_none"
                        onClick={() => {
                          navigate(`/deleted-intra-fares/local-fares/view/${paramsId[0]}&${paramsId[1]}&${item?.id}`, {
                            state: {
                              edit: false,
                              is_deleted_intra_fare: true,
                              city_name: item?.city_name,
                            },
                          });
                        }}
                      >
                        View
                      </button>
                    </td>
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

export default DeletedLocalFaresTable;
