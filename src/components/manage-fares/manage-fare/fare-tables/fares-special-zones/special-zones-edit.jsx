import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { archivedSpecialFaresAction } from "../../../../../redux/actions/archiveFaresAction";
import {
  archdelIntraFareIndAction,
  deletedIntraFareIndividualAction,
} from "../../../../../redux/actions/deletedIntrafareAction";
import { FaresSpecialZonesAction } from "../../../../../redux/actions/manageFaresAction";
import errorToast from "../../../../utilits/errorToast";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import FaresInputTable from "../../../faresInputTable";

const FaresSpecialZonesEdit = ({ params, location, fare }) => {
  const paramsData = params?.split("&");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_editable = location?.state?.edit;
  const is_archived_fare = location?.state?.is_archived_fare;
  console.log(is_archived_fare);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faresSpecialTable, setFaresSpecialTable] = useState(false);

  const [range1List, setRange1List] = useState([]);
  const [range2List, setRange2List] = useState([]);
  const [range3List, setRange3List] = useState([]);

  const [editingStatus, setEditingStatus] = useState({});

  useEffect(() => {
    setLoading(true);
    if (is_archived_fare === true) {
      dispatch(
        archivedSpecialFaresAction(
          {
            main_zone_id: paramsData[0],
            special_zone_id: paramsData[2],
          },
          onSuccess,
          onError
        )
      );
    } else if (fare === "deletedIntraFares") {
      if (location?.state?.fare === "Archived") {
        dispatch(
          archdelIntraFareIndAction(
            {
              main_zone_id: paramsData[0],
              archived_zone_id: paramsData[2],
            },
            onSuccess,
            onError
          )
        );
      } else {
        dispatch(
          deletedIntraFareIndividualAction(
            {
              main_zone_id: paramsData[0],
              delete_zone_id: paramsData[2],
            },
            onSuccess,
            onError
          )
        );
      }
    } else {
      dispatch(
        FaresSpecialZonesAction(
          {
            main_zone_id: paramsData[0],
            special_zone_id: paramsData[2],
          },
          onSuccess,
          onError
        )
      );
    }
  }, [faresSpecialTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setRange1List(data?.data?.range_0_to_10_km);
    setRange2List(data?.data?.range_11_to_25_km);
    setRange3List(data?.data?.range_26_more_km);

    setError(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
  };

  console.log(range1List, "addad");

  const keyOrderSpecialZone = [
    "base_fare",
    "per_km_fare",
    "per_min_fare",
    "parking_fee",
    "waiting_fee",
    "transport_hub_fee",
    "booking_fee",
    "cancellation_fee",
  ];

  return (
    <>
      <div className="d-flex align-items-center ">
        <button
          className="back_icon ps-0"
          onClick={() => {
            navigate(-1);
          }}
        >
          <i className="ri-arrow-left-s-line fs_23 fw_700 primary_color"></i>
        </button>
        <span className="primary_color fs_18 fw_600">{`${location?.state?.city_name} Special Zone`}</span>{" "}
      </div>
      <div className="scrollable_table_container px-2">
        {loading ? (
          <LoadingSpinnerTable />
        ) : (
          <>
            <div className="mt-4">
              ---
              <span className="orange_color fs_20 fw_500 ">
                Range : 0 Km - 10 Km
              </span>
            </div>
            <FaresInputTable
              faresData={range1List}
              keyOrder={keyOrderSpecialZone}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="0_km_to_10_km"
              mainType={"specialZoneManageFare"}
              reload={faresSpecialTable}
              setReload={setFaresSpecialTable}
              mainZoneId={paramsData?.[0]}
              subZoneId={paramsData?.[2]}
              is_editable={is_editable}
            />
            <div className="mt-4">
              ---
              <span className="orange_color fs_20 fw_500 ">
                Range : 11 Km - 25 Km
              </span>
            </div>
            <FaresInputTable
              faresData={range2List}
              keyOrder={keyOrderSpecialZone}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="11_km_to_25_km"
              mainType={"specialZoneManageFare"}
              reload={faresSpecialTable}
              setReload={setFaresSpecialTable}
              mainZoneId={paramsData?.[0]}
              subZoneId={paramsData?.[2]}
              is_editable={is_editable}
            />
            <div className="mt-4">
              ---
              <span className="orange_color fs_20 fw_500 ">Range : 26+ Km</span>
            </div>
            <FaresInputTable
              faresData={range3List}
              keyOrder={keyOrderSpecialZone}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="26_+_km"
              mainType={"specialZoneManageFare"}
              reload={faresSpecialTable}
              setReload={setFaresSpecialTable}
              mainZoneId={paramsData?.[0]}
              subZoneId={paramsData?.[2]}
              is_editable={is_editable}
            />
          </>
        )}
      </div>
    </>
  );
};

export default FaresSpecialZonesEdit;
