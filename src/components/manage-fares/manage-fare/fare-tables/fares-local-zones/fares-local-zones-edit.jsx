import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ArrowRightIcon from "../../../../../assets/icons/arrow-right-icon.svg";
import {
  archdelIntraFareIndAction,
  deletedIntraFareIndividualAction,
} from "../../../../../redux/actions/deletedIntrafareAction";
import { FaresLocalZonesAction } from "../../../../../redux/actions/manageFaresAction";
import { localZonestyles } from "../../../../mui-styles/mui-styles";
import errorToast from "../../../../utilits/errorToast";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";

import { ArchivedLocalFaresAction } from "../../../../../redux/actions/archiveFaresAction";
import "../../manageFaresTables.css";
import FaresInputTable from "../../../faresInputTable";
import ManageFareModuleCard from "../../../manageFareModuleCard";

const ManageFaresLocalZonesEdit = ({ params, fare, status, location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paramsData = params?.split("&");
  const is_editable = location?.state?.edit;
  const is_archived_fare = location?.state?.is_archived_fare;
  const [currentModule, setCurrentModule] = useState("");

  const [loading, setLoading] = useState(false);
  const [localFareTable, setLocalFareTable] = useState(false);

  const [localPriceModule1, setLocalPriceModule1] = useState([]);
  const [localPriceModule2, setLocalPriceModule2] = useState([]);

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (fare === "deletedIntraFares") {
      if (status === "Archived") {
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
    } else if (is_archived_fare === true) {
      dispatch(
        ArchivedLocalFaresAction(
          {
            main_zone_id: paramsData[0],
            local_zone_id: paramsData[2],
          },
          onSuccess,
          onError
        )
      );
    } else {
      dispatch(
        FaresLocalZonesAction(
          {
            main_zone_id: paramsData[0],
            local_zone_id: paramsData[2],
          },
          onSuccess,
          onError
        )
      );
    }
  }, [localFareTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setErrorMessage(false);
    setLocalPriceModule1(data?.data?.pricing_module_1);
    setLocalPriceModule2(data?.data?.pricing_module_2);
    console.log(data, "adsasdadsd");
  };
  const onError = (data) => {
    setLoading(false);
    setErrorMessage(true);
    errorToast(data?.data?.data);
    console.log(data, "asdadadad");
  };

  console.log(localPriceModule1, "adadas");

  useEffect(() => {
    setCurrentModule(localPriceModule1?.active_pricing_module);
  }, [localPriceModule1?.active_pricing_module]);

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

  console.log(localPriceModule1, "asjkdhasjkd");

  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : errorMessage ? (
        <div className="fs_sm_13 fs_20 position-absolute top-50 start-50 translate-middle primary_color">
          No fares for this zone
        </div>
      ) : (
        <>
          <div className="d-flex align-items-center">
            <button
              className="back_icon ps-0 "
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="ri-arrow-left-s-line fs_30 fw_700 primary_color"></i>
            </button>
            <span className="primary_color fs_20 fw_600 ">Local Zones</span>{" "}
          </div>
          <div className="d-flex mt-3">
            <div>
              <TextField
                size="small"
                style={{ width: "100%" }}
                sx={localZonestyles.select}
                variant="outlined"
                label="Pickup Location"
                InputLabelProps={{
                  style: { color: "#687284", fontWeight: "500" },
                  shrink: true,
                }}
                value={
                  localPriceModule1?.pick_up_location
                    ? localPriceModule1?.pick_up_location
                    : "--"
                }
                disabled
              />
            </div>

            <div className="d-flex align-items-center me-4 ms-4">
              <img src={ArrowRightIcon} alt="icon" />
            </div>

            <div>
              <TextField
                size="small"
                style={{ width: "100%" }}
                sx={localZonestyles.select}
                variant="outlined"
                label="Drop-Off Location"
                InputLabelProps={{
                  style: { color: "#687284", fontWeight: "500" },
                  shrink: true,
                }}
                value={
                  localPriceModule1?.drop_off_location
                    ? localPriceModule1?.drop_off_location
                    : "--"
                }
                disabled
              />
            </div>
          </div>

          <ManageFareModuleCard
            is_editable={is_editable}
            localPriceModule1={localPriceModule1}
            mainType={"LocalManageFare"}
            tableType="ModuleChangeTable"
            reload={localFareTable}
            setReload={setLocalFareTable}
            mainZoneId={paramsData?.[0]}
            subZoneId={paramsData?.[2]}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object?.values(editingStatus).some((value) =>
              Object?.values(value).includes(true)
            )}
          />

          <>
            <div className="d-flex gap-2 mt-3">
              <button
                className={`${
                  currentModule === "PriceModule1"
                    ? "primary_color"
                    : "disabled_color"
                } fw_600 border_none background_none`}
                onClick={() => {
                  setCurrentModule("PriceModule1");
                }}
              >
                Pricing Module - 1{" "}
                {localPriceModule1?.active_pricing_module === "PriceModule1"
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
                }}
              >
                Pricing Module - 2{" "}
                {localPriceModule1?.active_pricing_module === "PriceModule2"
                  ? "(Active)"
                  : ""}
              </button>
            </div>
            {currentModule === "PriceModule1" ? (
              <FaresInputTable
                faresData={localPriceModule1?.manage_fares}
                keyOrder={keyOrderForPriceModule1}
                editingStatus={editingStatus}
                setEditingStatus={setEditingStatus}
                disableTable={Object.values(editingStatus).some((value) =>
                  Object.values(value).includes(true)
                )}
                tableType="PriceModule1"
                mainType={"LocalManageFare"}
                reload={localFareTable}
                setReload={setLocalFareTable}
                subZoneId={paramsData?.[2]}
                manageZareEdit={localPriceModule1?.active_pricing_module}
                is_editable={is_editable}
              />
            ) : (
              <FaresInputTable
                faresData={localPriceModule2?.manage_fares}
                keyOrder={keyOrderForPriceModule2}
                editingStatus={editingStatus}
                setEditingStatus={setEditingStatus}
                disableTable={Object.values(editingStatus).some((value) =>
                  Object.values(value).includes(true)
                )}
                tableType="PriceModule2"
                mainType={"LocalManageFare"}
                reload={localFareTable}
                setReload={setLocalFareTable}
                subZoneId={paramsData?.[2]}
                manageZareEdit={localPriceModule1?.active_pricing_module}
                is_editable={is_editable}
              />
            )}
          </>
        </>
      )}
    </>
  );
};

export default ManageFaresLocalZonesEdit;
