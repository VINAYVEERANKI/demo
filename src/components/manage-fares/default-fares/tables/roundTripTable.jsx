import React, { useEffect, useState } from "react";
import "./tables.css";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import usePermissions from "../../../usePermissionChecker";
import { useDispatch } from "react-redux";
import { RoundTripFareValueAction } from "../../../../redux/actions/defaultFareAction";
import FaresInputTable from "../../faresInputTable";
import PackageInputForm from "../../packageInputForm";

const RoundTripTable = () => {
  const { canWrite } = usePermissions();

  const [loading, setLoading] = useState(false);
  const [roundTripTable, setRoundTripTable] = useState(false);
  const dispatch = useDispatch();
  const [roundTripPriceList, setRoundTripPriceList] = useState([]);
  useEffect(() => {
    setLoading(true);
    dispatch(RoundTripFareValueAction(onSuccess, onError));
  }, [roundTripTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setRoundTripPriceList(data?.data);
  };

  const onError = (data) => {
    setLoading(false);
    console.log(data?.data);
  };

  console.log(roundTripPriceList, "asdjjda");

  const keyOrderForRoundTripPriceList = [
    "base_fare",
    "per_km_fare",
    "per_extra_km_fare",
    "per_extra_time_fare",
    "night_allowance",
    "driver_allowance",
    "waiting_fee",
    "booking_fee",
    "cancellation_fee",
  ];
  const [editingStatus, setEditingStatus] = useState({});
  return (
    <>
     
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <PackageInputForm
            faresData={roundTripPriceList}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object?.values(editingStatus).some((value) =>
              Object?.values(value).includes(true)
            )}
            tableType="RoundTripPackageTable"
            mainType={"RoundTripDefaultFare"}
            reload={roundTripTable}
            setReload={setRoundTripTable}
            is_pricing_heading={false}
          />

          <FaresInputTable
            faresData={roundTripPriceList}
            keyOrder={keyOrderForRoundTripPriceList}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object.values(editingStatus).some((value) =>
              Object.values(value).includes(true)
            )}
            tableType="RoundTripTable"
            mainType={"RoundTripDefaultFare"}
            reload={roundTripTable}
            setReload={setRoundTripTable}
          />
        </>
      )}
    </>
  );
};

export default RoundTripTable;
