import React, { useEffect, useState } from "react";
import "./tables.css";
import { useDispatch } from "react-redux";
import { localDefaultFareValueAction } from "../../../../redux/actions/defaultFareAction";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import FaresInputTable from "../../faresInputTable";

const LocalZonesTable = () => {
  // const { canWrite } = usePermissions();
  const [loading, setLoading] = useState(false);
  const [localFareTable, setLocalFareTable] = useState(false);
  const dispatch = useDispatch();
  const [priceModule1, setPriceModule1] = useState([]);
  const [priceModule2, setPriceModule2] = useState([]);
  useEffect(() => {
    setLoading(true);
    dispatch(localDefaultFareValueAction(onSuccess, onError));
  }, [localFareTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setPriceModule1(data?.data?.pricing_module_1);
    setPriceModule2(data?.data?.pricing_module_2);
  };

  const onError = (data) => {
    setLoading(false);
    console.log(data?.data);
  };
  const keyOrderForPriceModule1 = [
    "base_fare",
    "per_km_fare",
    "per_min_fare",
    "parking_fee",
    "waiting_fee",
    "transport_hub_fee",
    "booking_fee",
    "cancellation_fee",
  ];

  const keyOrderForPriceModule2 = [
    "base_fare",
    "base_km",
    "per_km_fare",
    "per_min_fare",
    "parking_fee",
    "waiting_fee",
    "transport_hub_fee",
    "booking_fee",
    "cancellation_fee",
  ];

  const [editingStatus, setEditingStatus] = useState({});
  console.log(priceModule1);
  console.log(editingStatus, "adbajskda");
  return (
    <>
      <div className="scrollable_table_container pe-3 ps-1">
        {loading ? (
          <LoadingSpinnerTable />
        ) : (
          <>
            <div>
              <span className="primary_color fs_20 fw_500 ">
                Pricing Module - 1
              </span>
            </div>
            <FaresInputTable
              faresData={priceModule1}
              keyOrder={keyOrderForPriceModule1}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="priceModule1"
              mainType={"localDefaultFare"}
              reload={localFareTable}
              setReload={setLocalFareTable}
            />
            <div className="mt-3">
              <span className="primary_color fs_20 fw_500 ">
                Pricing Module - 2
              </span>
            </div>
            <FaresInputTable
              faresData={priceModule2}
              keyOrder={keyOrderForPriceModule2}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="priceModule2"
              mainType={"localDefaultFare"}
              reload={localFareTable}
              setReload={setLocalFareTable}
            />
          </>
        )}
      </div>
    </>
  );
};

export default LocalZonesTable;
