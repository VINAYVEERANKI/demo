import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { localZonesListAction } from "../../../redux/actions/manageZones/localZoneAction";
import { outstationZonesListAction } from "../../../redux/actions/manageZones/outstationZoneAction";
import IntraCreateMap from "../map/intraCreateMap";
import errorToast from "../../utilits/errorToast";
import "../manage-zone-components.css";
import ZonesPassword from "../manage-zone-modal/zonesPassword";
import IntraZoneTable from "../intraZoneTable";

const LocalOustationDefinedCities = ({
  params,
  isLoaded = false,
  loadError = "",
  zoneID = "",
  zoneName = "",
  is_editable = false,
  blockedListData = [],
}) => {
  const dispatch = useDispatch();
  const [actionType, setActionType] = useState("view");
  const [type, setType] = useState("");
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const [intraType, setIntraType] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [editId, setEditId] = useState(null);
  /************************ */

  const [localZoneList, setLocalZoneList] = useState([]);
  const [localZoneTable, setLocalZoneTable] = useState(false);
  const [localZoneLoading, setLocalZoneLoading] = useState(false);
  const [localZoneError, setLocalZoneError] = useState(false);
  const [outstationZoneList, setOutstationZoneList] = useState([]);
  const [outstationZoneTable, setOutstationZoneTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLocalZoneLoading(true);
    dispatch(
      localZonesListAction(params?.id, onLocalZoneSuccess, onLocalZoneError)
    );
  }, [showMap, localZoneTable]);

  const onLocalZoneSuccess = (data) => {
    setLocalZoneLoading(false);
    setLocalZoneList(data?.data);
    setLocalZoneError(false);
  };
  const onLocalZoneError = (data) => {
    errorToast(data?.data?.data);
    setLocalZoneError(true);
    setLocalZoneLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(outstationZonesListAction(params?.id, onSuccess, onError));
  }, [showMap, outstationZoneTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setOutstationZoneList(data?.data);
    setError(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
  };

  return (
    <>
      <div className="row">
        <IntraZoneTable
          tableHeading="Local - Defined Cities"
          loading={localZoneLoading}
          error={localZoneError}
          tableList={localZoneList}
          setIntraType={setIntraType}
          setEditId={setEditId}
          setActionType={setActionType}
          setShowMap={setShowMap}
          setType={setType}
          handlChangesUpdateShow={handlChangesUpdateShow}
          headingClassName={"local_zone_head_container"}
          is_editable={is_editable}
          intraZoneType={"local"}
          intraZoneDeleteType={"DeleteLocalZone"}
        />

        <IntraZoneTable
          tableHeading="Outstation - Defined Cities"
          loading={loading}
          error={error}
          tableList={outstationZoneList}
          setIntraType={setIntraType}
          setEditId={setEditId}
          setActionType={setActionType}
          setShowMap={setShowMap}
          setType={setType}
          handlChangesUpdateShow={handlChangesUpdateShow}
          headingClassName={"outstation_zone_head_container"}
          is_editable={is_editable}
          intraZoneType={"outstation"}
          intraZoneDeleteType={"DeleteOutstationZone"}
        />
      </div>
      <IntraCreateMap
        blockedListData={blockedListData}
        isLoaded={isLoaded}
        loadError={loadError}
        zoneEdit={editId}
        show={showMap}
        action={actionType}
        name={"coordinates"}
        intraZoneType={intraType}
        closeModal={() => {
          setActionType("");
          setShowMap(false);
          setIntraType("");
        }}
        zoneID={
          zoneID
          // + `-${editId?.local_zone_code ?? editId?.outstation_zone_code}`
        }
        zoneName={
          zoneName
          // + `-${editId?.city_name}`
        }
        is_editable={is_editable}
      />
      <ZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        type={type}
        zoneObject={editId}
        params={params}
        reloadTable={
          type === "DeleteLocalZone"
            ? localZoneTable
            : type === "DeleteOutstationZone"
            ? outstationZoneTable
            : ""
        }
        setReloadTable={
          type === "DeleteLocalZone"
            ? setLocalZoneTable
            : type === "DeleteOutstationZone"
            ? setOutstationZoneTable
            : ""
        }
        zoneID={zoneID}
        zoneName={zoneName}
        title={"Are you sure you want to delete this zone/ city?"}
        title_color="red_color"
      />
    </>
  );
};

export default LocalOustationDefinedCities;
