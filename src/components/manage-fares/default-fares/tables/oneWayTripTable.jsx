import React, { useEffect, useState } from "react";
import "./tables.css";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import { useDispatch } from "react-redux";
import { OnewayTripFareValueAction } from "../../../../redux/actions/defaultFareAction";
import FaresInputTable from "../../faresInputTable";
import PackageInputForm from "../../packageInputForm";

const OneWayTripTable = () => {
  const [loading, setLoading] = useState(false);
  const [oneWayTable, setOneWayTable] = useState(false);
  const dispatch = useDispatch();
  const [priceModule1, setPriceModule1] = useState([]);
  const [priceModule2, setPriceModule2] = useState([]);
  useEffect(() => {
    setLoading(true);
    dispatch(OnewayTripFareValueAction(onSuccess, onError));
  }, [oneWayTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setPriceModule1(data?.data?.pricing_module_1);
    setPriceModule2(data?.data?.pricing_module_2);
  };

  const onError = (data) => {
    setLoading(false);
    console.log(data?.data);
  };

  console.log(priceModule1, "dasdsada");
  console.log(priceModule2, "dasdsada");

  console.log();
  const keyOrderForPriceModule1 = [
    "base_fare",
    "per_km_fare",
    "per_extra_km_fare",
    "per_extra_time_fare",
    "night_allowance",
    "driver_allowance",
    "waiting_fee",
    "booking_fee",
    "cancellation_fee",
    // "per_min_fare",
  ];

  const keyOrderForPriceModule2 = [
    "base_fare",
    "per_km_fare",
    "remaining_time_fare",
    "per_extra_km_fare",
    "per_extra_time_fare",
    "night_allowance",
    "driver_allowance",
    "waiting_fee",
    "booking_fee",
    "cancellation_fee",
    // "per_min_fare",
  ];

  const [editingStatus, setEditingStatus] = useState({});

  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <PackageInputForm
            faresData={priceModule1}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object?.values(editingStatus).some((value) =>
              Object?.values(value).includes(true)
            )}
            tableType="packageDeatils1"
            mainType={"oneWayDefaultFare"}
            reload={oneWayTable}
            setReload={setOneWayTable}
            module_heading="Pricing Module - 1"
          />

          <FaresInputTable
            faresData={priceModule1}
            keyOrder={keyOrderForPriceModule1}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object.values(editingStatus).some((value) =>
              Object.values(value).includes(true)
            )}
            tableType="priceModule1"
            mainType={"oneWayDefaultFare"}
            reload={oneWayTable}
            setReload={setOneWayTable}
          />

          <PackageInputForm
            faresData={priceModule2}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object?.values(editingStatus).some((value) =>
              Object?.values(value).includes(true)
            )}
            tableType="packageDeatils2"
            mainType={"oneWayDefaultFare"}
            reload={oneWayTable}
            setReload={setOneWayTable}
            module_heading="Pricing Module - 2"
          />

          <FaresInputTable
            faresData={priceModule2}
            keyOrder={keyOrderForPriceModule2}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object.values(editingStatus).some((value) =>
              Object.values(value).includes(true)
            )}
            tableType="priceModule2"
            mainType={"oneWayDefaultFare"}
            reload={oneWayTable}
            setReload={setOneWayTable}
          />
        </>
      )}
    </>
  );
};

export default OneWayTripTable;
