import React, { useEffect, useState } from "react";
import "./tables.css";
import { useDispatch } from "react-redux";
import { specialZoneFareValueAction } from "../../../../redux/actions/defaultFareAction";
import errorToast from "../../../utilits/errorToast";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import FaresInputTable from "../../faresInputTable";

const SpecialZonesTable = () => {
  const [loading, setLoading] = useState(false);
  const [defaultFareTable, setDefaultFareTable] = useState(false);
  const dispatch = useDispatch();
  const [range1List, setRange1List] = useState([]);
  const [range2List, setRange2List] = useState([]);
  const [range3List, setRange3List] = useState([]);
  const [editingStatus, setEditingStatus] = useState({});
  useEffect(() => {
    setLoading(true);
    dispatch(specialZoneFareValueAction(onSuccess, onError));
  }, [defaultFareTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setRange1List(data?.data?.range_0_to_10_km);
    setRange2List(data?.data?.range_11_to_25_km);
    setRange3List(data?.data?.range_26_more_km);
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data?.data);
    errorToast(data?.data);
  };

  const keyOrder = [
    "base_fare",
    "per_km_fare",
    "per_min_fare",
    "parking_fee",
    "waiting_fee",
    "transport_hub_fee",
    "booking_fee",
    "cancellation_fee",
  ];
  console.log(loading);
  return (
    <div className="scrollable_table_container pe-3 ps-1">
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
            keyOrder={keyOrder}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object.values(editingStatus).some((value) =>
              Object.values(value).includes(true)
            )}
            tableType="0_km_to_10_km"
            mainType={"specialZoneDefaultFare"}
            reload={defaultFareTable}
            setReload={setDefaultFareTable}
          />
          <div className="mt-4">
            {" "}
            ---
            <span className="orange_color fs_20 fw_500 ">
              Range : 11 Km - 25 Km
            </span>
          </div>
          <FaresInputTable
            faresData={range2List}
            keyOrder={keyOrder}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object.values(editingStatus).some((value) =>
              Object.values(value).includes(true)
            )}
            tableType="11_km_to_25_km"
            mainType={"specialZoneDefaultFare"}
            reload={defaultFareTable}
            setReload={setDefaultFareTable}
          />
          <div className="mt-4">
            {" "}
            ---
            <span className="orange_color fs_20 fw_500 ">Range : 26+ Km</span>
          </div>
          <FaresInputTable
            faresData={range3List}
            keyOrder={keyOrder}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object.values(editingStatus).some((value) =>
              Object.values(value).includes(true)
            )}
            tableType="26_+_km"
            mainType={"specialZoneDefaultFare"}
            reload={defaultFareTable}
            setReload={setDefaultFareTable}
          />
        </>
      )}
    </div>
  );
};

export default SpecialZonesTable;
