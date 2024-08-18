import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  RentalFareValueAction,
  defaultRideTypeListAction,
} from "../../../../redux/actions/defaultFareAction";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";
import { rentalStyles } from "../../../mui-styles/mui-styles";
import usePermissions from "../../../usePermissionChecker";
import errorToast from "../../../utilits/errorToast";
import FaresInputTable from "../../faresInputTable";

const RentalTable = () => {
  const { canWrite } = usePermissions();
  const [rideType, setRideType] = useState("");
  const [rentalDefaultTable, setRentalDefaultTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [rentalPriceList, setrentalPriceList] = useState([]);

  const [rideTypeList, setRideTypeList] = useState([]);
  useEffect(() => {
    dispatch(defaultRideTypeListAction(onFetchListSuccess, onFetchListError));
  }, []);

  const onFetchListSuccess = (data) => {
    setRideTypeList(data?.data);
    setRideType(filteredRideTypeList.map((item) => item)?.[0]);
  };
  const onFetchListError = (data) => {
    errorToast(data?.data);
  };

  const filteredRideTypeList = rideTypeList
    ? rideTypeList?.filter((item) => item !== "")
    : "";
  console.log(filteredRideTypeList.map((item) => item)?.[0], "ssasdasdsa");

  useEffect(() => {
    setLoading(true);
    dispatch(
      RentalFareValueAction(
        {
          ride_type: rideType ?? filteredRideTypeList.map((item) => item)?.[0],
        },
        onSuccess,
        onError
      )
    );
  }, [rideType, rentalDefaultTable]);
  const onSuccess = (data) => {
    setLoading(false);
    setrentalPriceList(data?.data);
  };

  const onError = (data) => {
    setLoading(false);
    console.log(data?.data);
  };
  const handleChange = (event) => {
    setRideType(event.target.value);
  };

  const keyOrderForRental = [
    "package_km",
    "base_fare",
    "per_extra_km_fare",
    "per_extra_time_fare",
    "waiting_fee",
    "booking_fee",
    "cancellation_fee",
  ];
  const [editingStatus, setEditingStatus] = useState({});

  return (
    <div className="mt-4">
      <TextField
        size="small"
        style={{ width: "20%" }}
        sx={rentalStyles.select}
        variant="outlined"
        select
        label="Ride Type"
        InputLabelProps={{ style: { color: "#687284", fontWeight: "500" } }}
        value={
          rideType ||
          (filteredRideTypeList.length > 0 ? filteredRideTypeList[0] : "")
        }
        onChange={(e) => {
          handleChange(e);
        }}
      >
        {filteredRideTypeList?.length > 0 ? (
          filteredRideTypeList?.map((rideType, index) => (
            <MenuItem
              key={index + 1}
              value={rideType}
              style={{ fontSize: "20px", fontWeight: "500" }}
            >
              {rideType}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            No ride types available
          </MenuItem>
        )}
      </TextField>

      <>
        {loading ? (
          <LoadingSpinnerTable />
        ) : (
          <FaresInputTable
            faresData={rentalPriceList}
            keyOrder={keyOrderForRental}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object?.values(editingStatus)?.some((value) =>
              Object?.values(value)?.includes(true)
            )}
            tableType="rentalTable"
            mainType={"RentalDefaultFare"}
            reload={rentalDefaultTable}
            setReload={setRentalDefaultTable}
          />
        )}
      </>
    </div>
  );
};

export default RentalTable;
