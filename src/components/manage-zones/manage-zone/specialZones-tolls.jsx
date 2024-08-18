import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../manage-zone-components.css";
import errorToast from "../../utilits/errorToast";
import { specialZonesListAction } from "../../../redux/actions/manageZones/specialZoneAction";
import { tollZonesListAction } from "../../../redux/actions/manageZones/tollsZoneAction";
import IntraCreateMap from "../map/intraCreateMap";
import ZonesPassword from "../manage-zone-modal/zonesPassword";
import IntraZoneTable from "../intraZoneTable";

const SpecialZonesAndTolls = ({
  params,
  isLoaded = false,
  loadError = "",
  zoneID = "",
  zoneName = "",
  is_editable = false,
  blockedListData = [],
}) => {
  console.log(zoneID);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [actionType, setActionType] = useState("view");
  const [intraType, setIntraType] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [editId, setEditId] = useState(null);
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);

  const [specialTable, setSpecialTable] = useState(false);
  const [specialZoneList, setSpecialZoneList] = useState([]);
  const [tollsTable, setTollsTable] = useState(false);
  const [specialZoneLoading, setSpecialZoneLoading] = useState(false);
  const [specialZoneError, setSpecialZoneError] = useState(false);
  const [tollsZoneList, setTollsZoneList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSpecialZoneLoading(true);
    dispatch(
      specialZonesListAction(
        params?.id,
        onSpecialZoneSuccess,
        onSpecialZoneError
      )
    );
  }, [showMap, specialTable]);

  const onSpecialZoneSuccess = (data) => {
    setSpecialZoneList(data?.data);

    setSpecialZoneError(false);
    setSpecialZoneLoading(false);
  };
  const onSpecialZoneError = (data) => {
    errorToast(data?.data?.data);
    setSpecialZoneError(true);
    setSpecialZoneLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(tollZonesListAction(params?.id, onSuccess, onError));
  }, [showMap, tollsTable]);

  const onSuccess = (data) => {
    setTollsZoneList(data?.data);
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  return (
    <>
      <div className="row gx-5">
        <IntraZoneTable
          tableHeading="Special Zones"
          loading={specialZoneLoading}
          error={specialZoneError}
          tableList={specialZoneList}
          setIntraType={setIntraType}
          setEditId={setEditId}
          setActionType={setActionType}
          setShowMap={setShowMap}
          setType={setType}
          handlChangesUpdateShow={handlChangesUpdateShow}
          headingClassName={"special_zone_head_container"}
          is_editable={is_editable}
          intraZoneType={"special"}
          intraZoneDeleteType={"DeleteSpecialZone"}
        />
        <IntraZoneTable
          tableHeading="Toll Zones"
          loading={loading}
          error={error}
          tableList={tollsZoneList}
          setIntraType={setIntraType}
          setEditId={setEditId}
          setActionType={setActionType}
          setShowMap={setShowMap}
          setType={setType}
          handlChangesUpdateShow={handlChangesUpdateShow}
          headingClassName={"tools_zone_head_container"}
          is_editable={is_editable}
          intraZoneType={"toll"}
          intraZoneDeleteType={"DeleteTollsZone"}
        />

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
          zoneID={zoneID}
          zoneName={zoneName}
          is_editable={is_editable}
        />
        <ZonesPassword
          changeUpdatePasswordshow={changeUpdatePasswordshow}
          handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
          type={type}
          zoneObject={editId}
          params={params}
          reloadTable={
            type === "DeleteSpecialZone"
              ? specialTable
              : type === "DeleteTollsZone"
              ? tollsTable
              : ""
          }
          setReloadTable={
            type === "DeleteSpecialZone"
              ? setSpecialTable
              : type === "DeleteTollsZone"
              ? setTollsTable
              : ""
          }
          title={`Are you sure you want to delete this zone/ city?`}
          title_color="red_color"
          zoneID={zoneID}
          zoneName={zoneName}
        />
      </div>
    </>
  );
};
export default SpecialZonesAndTolls;
