import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowRightIcon from "../../../../../assets/icons/arrow-right-icon.svg";
import { useDispatch } from "react-redux";
import { FaresOneWaytripAction } from "../../../../../redux/actions/manageFaresAction";
import errorToast from "../../../../utilits/errorToast";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import { useNavigate } from "react-router";
import { archivedOneWaytripAction } from "../../../../../redux/actions/archiveFaresAction";
import { roundTripstyles } from "../../../../mui-styles/mui-styles";
import {
  archdelIntraFareIndAction,
  deletedIntraFareIndividualAction,
} from "../../../../../redux/actions/deletedIntrafareAction";
import ManageFareModuleCard from "../../../manageFareModuleCard";
import FaresInputTable from "../../../faresInputTable";

const FaresonewayTripEdit = ({ params, location, fare }) => {
  const [priceModule1, setPriceModule1] = useState([]);
  const [priceModule2, setPriceModule2] = useState([]);

  const dispatch = useDispatch();
  const paramsData = params?.split("&");
  const navigate = useNavigate();
  const is_editable = location?.state?.edit;

  const is_archived_fare = location?.state?.is_archived_fare;
  console.log(is_archived_fare);
  const [loading, setLoading] = useState(false);
  const [currentModule, setCurrentModule] = useState("");
  const [oneWayTable, setOneWayTable] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (is_archived_fare === true) {
      dispatch(
        archivedOneWaytripAction(
          {
            main_zone_id: paramsData[0],
            city_zone_id: paramsData[2],
          },
          onFetchSuccess,
          onFetchError
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
            onFetchSuccess,
            onFetchError
          )
        );
      } else {
        dispatch(
          deletedIntraFareIndividualAction(
            {
              main_zone_id: paramsData[0],
              delete_zone_id: paramsData[2],
            },
            onFetchSuccess,
            onFetchError
          )
        );
      }
    } else {
      dispatch(
        FaresOneWaytripAction(
          {
            main_zone_id: paramsData[0],
            city_zone_id: paramsData[2],
          },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [oneWayTable]);

  const onFetchSuccess = (data) => {
    setLoading(false);
    setPriceModule1(data?.data?.pricing_module_1);
    setPriceModule2(data?.data?.pricing_module_2);
  };
  const onFetchError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
  };

  console.log(priceModule2, "fgbbgfbgb");

  useEffect(() => {
    setCurrentModule(
      priceModule1?.map?.((item) => item?.active_pricing_module)?.[0]
    );
  }, [priceModule1]);

  const [editingStatus, setEditingStatus] = useState({});

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
    "per_min_fare",
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
    "per_min_fare",
  ];

  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
          <div className="d-flex align-items-center mb-4">
            <button
              className="back_icon ps-0 "
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="ri-arrow-left-s-line fs_23 fw_700 primary_color"></i>
            </button>
            <span className="primary_color fs_18 fw_600">{`${location?.state?.city_name} outstation`}</span>{" "}
          </div>

          <div className="d-flex mt-3">
            <div>
              <TextField
                size="small"
                style={{ width: "100%" }}
                sx={roundTripstyles.select}
                variant="outlined"
                label="Zone"
                InputLabelProps={{
                  style: { color: "#687284", fontWeight: "500" },
                  shrink: true,
                }}
                disabled
                value={paramsData[1] ?? "--"}
              />
            </div>

            <div className="d-flex align-items-center me-4 ms-4">
              <img src={ArrowRightIcon} alt="icon" />
            </div>

            <div>
              <TextField
                size="small"
                style={{ width: "100%" }}
                sx={roundTripstyles.select}
                variant="outlined"
                label="Drop-Off Location"
                InputLabelProps={{
                  style: { color: "#687284", fontWeight: "500" },
                  shrink: true,
                }}
                value={
                  priceModule1?.map?.((item) => item?.drop_off_location)?.[0] ??
                  "--"
                }
                disabled
              />
            </div>
          </div>

          <ManageFareModuleCard
            is_editable={is_editable}
            localPriceModule1={priceModule1?.map((item) => item)?.[0]}
            mainType={"OneWayManageFare"}
            tableType="ModuleChangeTable"
            reload={oneWayTable}
            setReload={setOneWayTable}
            mainZoneId={paramsData?.[0]}
            subZoneId={paramsData?.[2]}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object?.values(editingStatus).some((value) =>
              Object?.values(value).includes(true)
            )}
          />

          <div className="d-flex gap-2 mt-3">
            <button
              className={`${
                currentModule === "PriceModule1"
                  ? "primary_color"
                  : "disabled_color"
              } fw_600 border_none background_none`}
              onClick={() => {
                setCurrentModule("PriceModule1");
                // setDisablebtn(currentModule !== "PriceModule1" && false);
              }}
            >
              Pricing Module - 1{" "}
              {priceModule1?.map?.(
                (item) => item?.active_pricing_module
              )?.[0] === "PriceModule1"
                ? "(Active)"
                : ""}
            </button>

            <span>|</span>
            <button
              className={`${
                currentModule === "PriceModule2"
                  ? "primary_color"
                  : "disabled_color"
              } fw_600 border_none background_none`}
              onClick={() => {
                setCurrentModule("PriceModule2");
                // setDisablebtn(currentModule !== "PriceModule2" && false);
              }}
            >
              Pricing Module - 2{" "}
              {priceModule1?.map?.(
                (item) => item?.active_pricing_module
              )?.[0] === "PriceModule2"
                ? "(Active)"
                : ""}
            </button>
          </div>
          {currentModule === "PriceModule1" ? (
            <FaresInputTable
              faresData={priceModule1}
              keyOrder={keyOrderForPriceModule1}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="PriceModule1"
              mainType={"OneWayManageFare"}
              reload={oneWayTable}
              setReload={setOneWayTable}
              mainZoneId={paramsData?.[0]}
              subZoneId={paramsData?.[2]}
              manageZareEdit={
                priceModule1?.map?.((item) => item?.active_pricing_module)?.[0]
              }
              is_editable={is_editable}
            />
          ) : (
            <FaresInputTable
              faresData={priceModule2}
              keyOrder={keyOrderForPriceModule2}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="PriceModule2"
              mainType={"OneWayManageFare"}
              reload={oneWayTable}
              setReload={setOneWayTable}
              mainZoneId={paramsData?.[0]}
              subZoneId={paramsData?.[2]}
              manageZareEdit={
                priceModule1?.map?.((item) => item?.active_pricing_module)?.[0]
              }
              is_editable={is_editable}
            />
          )}
        </>
      )}
    </>
  );
};

export default FaresonewayTripEdit;
