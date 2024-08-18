import React, { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import {
  GoogleMap,
  DrawingManagerF,
  PolygonF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useRef } from "react";
import {
  isOutsideMainChecker,
  isSelfIntersected,
  mapStyle,
  polygonStyle,
} from "./maphelper";
import {
  isChanged,
  isInsideMainChecker,
  latLangKeyRemover,
  overLapChecker,
} from "./maphelper";
import { useCallback } from "react";
import { useEffect } from "react";
import MapToolbar from "./toolbar";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { mainZoneViewAction } from "../../../redux/actions/manageZones/manageZoneAction";
import errorToast from "../../utilits/errorToast";
import UpdateZonesPassword from "../manage-zone-modal/updateZonePassword";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import ModalHeading from "../../utilits/buttons/modal-header";
import { removeUnderScore } from "../../helper";
import Savebtn from "../../utilits/buttons/savebtn";
function IntraCreateMap({
  show = false,
  closeModal = () => {},
  action = "view",
  zoneEdit = null,
  mapData = [],
  isLoaded = false,
  intraZoneType = "",
  loadError = false,
  zoneID,
  zoneName,
  is_editable = true,
  archived = false,
  blockedListData = [],
}) {
  const params = useParams();
  const dispatch = useDispatch();
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => setchangeUpdatePasswordshow(true);
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const [error, setError] = useState("");
  const [center, setCenter] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [visibility, setVisibility] = useState([]);
  const [zonesSelect, SetZonesSelect] = useState(null);
  const [polyData, setPolyData] = useState([]);
  const [intraList, setIntraList] = useState([]);
  const [undoData, setUndoData] = useState([]);
  const [redoData, setRedoData] = useState([]);
  const [newPoly, setNewPoly] = useState({});
  const mapRef = useRef();
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const searchBox = useRef();
  const drawingManagerRef = useRef();
  const drawingManagerOptions = {
    polygonOptions: {
      fillOpacity: 0.3,
      fillColor: "#0060FF33",
      strokeColor: "#0060FF",
      strokeWeight: 2,
    },
    drawingControl: false,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [
        window.google?.maps?.drawing?.OverlayType?.POLYGON,
        window.google?.maps?.drawing?.OverlayType?.POLYLINE,
      ],
    },
  };
  console.log(blockedListData);
  useEffect(() => {
    if (archived && zoneEdit?.id) {
      setPolyData(mapData.filter((item) => item?.uuid !== zoneEdit?.id));
      const editPoly = mapData.filter((item) => item?.uuid === zoneEdit?.id);
      setNewPoly(editPoly[0]);
      setCenter(editPoly[0].coord[0]);
    } else {
      dispatch(
        mainZoneViewAction(
          { main_zone_id: params.id },
          onViewSucess,
          onViewError
        )
      );
    }
    initZoneVisibility();
  }, [show]);

  function initZoneVisibility() {
    if (intraZoneType === "local") {
      setVisibility(["Z", "L"]);
    } else if (intraZoneType === "special") {
      setVisibility(["Z", "S"]);
    } else if (intraZoneType === "toll") {
      setVisibility(["Z", "T"]);
    } else if (intraZoneType === "outstation") {
      setVisibility(["Z", "O"]);
    }
    // setVisibility(["Z", "L", "O", "B", "T", "S"]);
  }

  function onViewSucess(data) {
    if (
      intraZoneType === "local" ||
      intraZoneType === "special" ||
      intraZoneType === "toll"
    ) {
      const mainZone = {
        id: data.data.id,
        main_zone_code: data.data.main_zone_code,
        coordinates: data.data.coordinates,
        zone_name: data.data.zone_name,
      };
      const allData = [
        ...data.data.special_zones,
        ...data.data.toll_zones,
        ...data.data.local_defined_cities,
        ...blockedListData,
        mainZone,
      ]
        .filter((item) => item.city_name !== "local undefined city")
        .map((item) => {
          return {
            uuid: item.id,
            id:
              item.blocked_zone_code ??
              item.special_zone_code ??
              item.toll_zone_code ??
              item.local_zone_code ??
              item.main_zone_code,
            name: item.city_name ?? item.zone_name,
            coord: item.coordinates.map((item) => {
              return { lat: item[0], lng: item[1] };
            }),
          };
        });
      if (action === "edit" || action === "view") {
        setPolyData(allData.filter((item) => item?.uuid !== zoneEdit.id));
        setIntraList(
          allData
            .filter(
              (item) =>
                item?.uuid !== zoneEdit?.id &&
                item?.id?.startsWith(intraZoneType[0].toLocaleUpperCase())
            )
            .map((item) => {
              return {
                coord: item.coord.map((item) => [item.lat, item.lng]),
                id: item.id,
              };
            })
        );
        const editPoly = allData.filter((item) => item.uuid === zoneEdit.id);
        editPoly[0].coord.pop();
        setNewPoly(editPoly[0]);
        setUndoData(editPoly);
        setCenter(editPoly[0].coord[0]);
      } else if (action == "create") {
        setPolyData(allData);
        setIntraList(
          allData
            .filter((item) =>
              item?.id?.startsWith(intraZoneType[0].toLocaleUpperCase())
            )
            .map((item) => {
              return {
                id: item.id,
                coord: item.coord.map((item) => [item.lat, item.lng]),
              };
            })
        );
        setCenter(
          mainZone.coordinates.map((item) => {
            return { lat: item[0], lng: item[1] };
          })[0]
        );
      }
    } else if (intraZoneType === "outstation") {
      const mainZone = {
        id: data.data.id,
        main_zone_code: data.data.main_zone_code,
        coordinates: data.data.coordinates,
        zone_name: data.data.zone_name,
      };
      const allData = [
        ...data.data.outstation_defined_cities,
        ...blockedListData,
        mainZone,
      ]
        .filter((item) => item.city_name !== "outstation undefined city")
        .map((item) => {
          return {
            uuid: item.id,
            id:
              item.outstation_zone_code ??
              item.main_zone_code ??
              item.blocked_zone_code,
            name: item.city_name ?? item.zone_name,
            coord: item.coordinates.map((item) => {
              return { lat: item[0], lng: item[1] };
            }),
          };
        });
      if (action === "edit" || action === "view") {
        setPolyData(allData.filter((item) => item.uuid !== zoneEdit.id));
        const editPoly = allData.filter((item) => item.uuid === zoneEdit.id);
        editPoly[0].coord.pop();
        setNewPoly(editPoly[0]);
        setUndoData(editPoly);
        setCenter(editPoly[0].coord[0]);
      } else if (action === "create") {
        setCenter(
          mainZone.coordinates.map((item) => {
            return { lat: item[0], lng: item[1] };
          })[0]
        );
        setPolyData(allData);
      }
    }
  }

  function onViewError(data) {
    errorToast("failed to load map data");
    console.log(data);
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      zone_name: zoneEdit?.city_name ?? "",
      coordinates: zoneEdit?.coordinates ?? [],
    },
    validationSchema: Yup.object({
      zone_name: Yup.string().trim().required("Please enter zone name"),
      coordinates: Yup.array().min(1, "Please draw zone"),
    }),
    onSubmit: (values) => {
      console.log(values);
      if (
        JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
      ) {
        handlChangesUpdateShow();
      }
    },
  });
  const mainZoneList = useMemo(
    () =>
      polyData
        .filter((item) => item.id.startsWith("Z"))
        .map((item) => {
          return {
            coord: item.coord.map((item) => [item.lat, item.lng]),
            id: item.id,
          };
        }),
    [mapData]
  );
  const mainOutZoneList = useMemo(
    () =>
      polyData
        .filter((item) => item.id.startsWith("Z") || item.id.startsWith("O"))
        .map((item) => {
          return {
            coord: item.coord.map((item) => [item.lat, item.lng]),
            id: item.id,
          };
        }),
    [mapData]
  );
  function idGen() {
    return intraZoneType[0] + Math.floor(100000 + Math.random() * 900000);
  }
  const onLoadMap = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const onLoadDrawingManager = useCallback((drawingManager) => {
    drawingManagerRef.current = drawingManager;
  }, []);
  const onPolyComplete = ($polyEvent) => {
    drawingManagerRef.current.setDrawingMode(null); //Disable drawing mode
    const bounds = $polyEvent
      .getPath()
      .getArray()
      .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() })); // getting the coordinated
    if (bounds.length >= 3) {
      //checks whether its a polygon
      newPolygonAdder($polyEvent, bounds); //stores newly created polygon
      const keyLessBounds = latLangKeyRemover(bounds); //coordinates without lat,lng keys
      let formikCoord = [...keyLessBounds];
      formikCoord.push(keyLessBounds[0]);
      formik.setFieldValue("coordinates", formikCoord);
      errorChecker(keyLessBounds); //detects all the errors
    } else {
      setError("Should be a polygon");
      drawingManagerRef.current.setDrawingMode("polygon");
      $polyEvent.setMap(null);
    }
  };
  const newPolygonAdder = ($polyEvent, bounds) => {
    const newPolygon = {
      id: idGen(),
      coord: bounds,
    };
    setNewPoly(newPolygon);
    setUndoData([...undoData, newPolygon]);
    $polyEvent.setMap(null);
  };
  function errorChecker(keyLessBounds) {
    const isSelfIntersecting = isSelfIntersected(keyLessBounds);
    const isInsideMain = isInsideMainChecker(keyLessBounds, mainZoneList);
    const isInsideSame = isInsideMainChecker(keyLessBounds, intraList);
    const isOutsideMain = isOutsideMainChecker(keyLessBounds, intraList);
    const overlaps = overLapChecker(keyLessBounds, intraList);
    if (
      intraZoneType === "local" ||
      intraZoneType === "special" ||
      intraZoneType === "toll"
    ) {
      setError(
        overlaps.length > 0
          ? "overlaps with another zone"
          : isSelfIntersecting
          ? "should not self intersect"
          : !isInsideMain
          ? `${intraZoneType} zone should be inside main zone`
          : isInsideSame
          ? `${intraZoneType} zone should not be inside another ${intraZoneType}  zone`
          : isOutsideMain
          ? `${intraZoneType} zone should not contain another ${intraZoneType}  zone`
          : ""
      );
    } else if (intraZoneType === "outstation") {
      const overlaps = overLapChecker(keyLessBounds, mainOutZoneList);
      const isInsideMain = isInsideMainChecker(keyLessBounds, mainOutZoneList);
      const isOutsideMain = isOutsideMainChecker(
        keyLessBounds,
        mainOutZoneList
      );
      let mainZoneIntersect = null;
      let outstationZoneIntersect = null;

      if ((overlaps?.[0]?.id).startsWith("ZID")) {
        mainZoneIntersect = true;
      } else if ((overlaps?.[0]?.id).startsWith("OZID")) {
        outstationZoneIntersect = true;
      } else {
        mainZoneIntersect = false;
        outstationZoneIntersect = false;
      }
      setError(
        overlaps.length > 0 && mainZoneIntersect
          ? `overlaps with main zone ${
              overlaps?.[0]?.id ? `(${overlaps?.[0]?.id})` : ""
            }`
          : overlaps.length > 0 && outstationZoneIntersect
          ? `overlaps with Outstation zone ${
              overlaps?.[0]?.id ? `(${overlaps?.[0]?.id})` : ""
            }`
          : overlaps.length > 0
          ? "overlaps with another zone"
          : isSelfIntersecting
          ? "should not self intersect"
          : isInsideMain
          ? `${intraZoneType} zone should not be inside main zone`
          : isOutsideMain
          ? `${intraZoneType} zone should not contain another  zone`
          : ""
      );
    }
  }

  const undoPolygon = () => {
    if (undoData.length > 1) {
      const previousPoly = [...undoData];
      const removedPoly = previousPoly.pop();
      setNewPoly(previousPoly[previousPoly.length - 1]);
      setUndoData(previousPoly);
      setRedoData([removedPoly, ...redoData]);
      const keyLessBounds = latLangKeyRemover(
        previousPoly[previousPoly.length - 1].coord
      );
      errorChecker(keyLessBounds);
    }
  };
  const redoPolygon = () => {
    if (redoData.length > 0) {
      const previousPoly = [...redoData];
      const removedPoly = previousPoly.shift();
      setNewPoly(removedPoly);
      setUndoData([...undoData, removedPoly]);
      setRedoData(previousPoly);
      const keyLessBounds = latLangKeyRemover(removedPoly.coord);
      errorChecker(keyLessBounds);
    }
  };
  const onEditPolygon = useCallback(() => {
    const coordinates = polygonRef.current
      .getPath()
      .getArray()
      .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));
    const changed = isChanged(coordinates, newPoly.coord);
    let latestPoly = { ...newPoly };
    latestPoly.coord = coordinates;
    setNewPoly(latestPoly);
    if (changed) {
      setUndoData([...undoData, latestPoly]);
      setRedoData([]);
    }
    const keyLessBounds = latLangKeyRemover(coordinates);
    let formikCoord = [...keyLessBounds];
    formikCoord.push(keyLessBounds[0]);
    formik.setFieldValue("coordinates", formikCoord);
    errorChecker(keyLessBounds);
  }, [newPoly]);
  const onDeletePolygon = () => {
    setNewPoly({});
    setUndoData([]);
    setRedoData([]);
    setError("");
    drawingManagerRef.current.setDrawingMode(null);
  };
  const onLoadPolygon = useCallback(
    (polygon) => {
      if (action === "edit" || action === "create") {
        polygonRef.current = polygon;
        const path = polygon.getPath();
        listenersRef.current.push(
          path.addListener("set_at", onEditPolygon),
          path.addListener("insert_at", onEditPolygon),
          path.addListener("remove_at", onEditPolygon)
        );
      }
    },
    [onEditPolygon, show]
  );
  const onUnmount = useCallback(() => {
    // console.log("unmounted");
    if (action === "edit" || action === "create") {
      listenersRef.current.forEach((lis) => lis.remove());
      polygonRef.current = null;
    }
  }, []);
  /******Search box*********/
  const onLoadSearchBox = (ref) => (searchBox.current = ref);
  const onPlaceChanged = () => {
    const { geometry } = searchBox.current.getPlace();
    const bounds = new window.google.maps.LatLngBounds();
    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }
    mapRef.current.fitBounds(bounds);
  };
  const onExit = () => {
    setNewPoly({});
    setUndoData([]);
    setRedoData([]);
    setPolyData([]);
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
    setError("");
    closeModal();
  };
  function handleViewZone(value) {
    console.log(value);
    setVisibility(["Z", "L", "O", "B", "T", "S"]);
  }
  console.log("====================================");
  console.log(polyData);
  console.log("====================================");
  console.log(formik.values.coordinates);

  return (
    <>
      <UpdateZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        intraZoneType={intraZoneType}
        action={action}
        formik={formik}
        onExit={onExit}
        params={params}
        intraZoneId={zoneEdit?.id}
        title={
          action === "create"
            ? `Are you sure you want to add zone/city ?`
            : `Are you sure you want to make changes ?`
        }
        zoneID={
          zoneID +
          `-${
            zoneEdit?.local_zone_code ??
            zoneEdit?.outstation_zone_code ??
            zoneEdit?.special_zone_code ??
            zoneEdit?.toll_zone_code
          }`
        }
        zoneName={zoneName + `-${zoneEdit?.city_name}`}
      />
      <Modal
        centered
        show={show}
        // onHide={onExit}
        size={"xl"}
        backdropClassName="localZone_backdrop"
        dialogClassName="localZone_container"
        contentClassName="localZone_card_radius"
        style={{ padding: "0px" }}
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body bsPrefix="newmap_modal__body">
          <div className="p-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="px-2">
                <ModalHeading
                  title={
                    action === "create"
                      ? "Draw Zone On Map"
                      : `${removeUnderScore(
                          zoneEdit?.city_name
                        )} City (${zoneID}-${
                          zoneEdit?.local_zone_code ??
                          zoneEdit?.special_zone_code ??
                          zoneEdit?.toll_zone_code ??
                          zoneEdit?.outstation_zone_code
                        })`
                  }
                  title_text={`fs_18 fw_600 mb-0 ${
                    error ? "red_color" : "cement_color"
                  }`}
                  closeFn={() => {
                    onExit();
                  }}
                  statusShow={false}
                />
              </div>

              <div className="mt-3">
                <>
                  {" "}
                  <div className="row mb-2">
                    <span className="col-sm-3  col-4 cement_color text-sm-end text-center fw_500">
                      Category :
                    </span>
                    <span className="col-sm-3 col-6  px-0 primary_color fw_600 text-capitalize">
                      {intraZoneType}- Defined city
                    </span>
                  </div>
                  <div className="row mb-2">
                    <span className="col-sm-3 col-4 cement_color text-sm-end text-center fw_500">
                      Zone Id :
                    </span>{" "}
                    <span className="col-sm-3 col-4 px-0 primary_color fw_600">
                      {zoneID ? zoneID : "--"}
                    </span>
                  </div>
                  <div className="row mb-2">
                    <span className="col-sm-3 col-5 cement_color text-sm-end  fw_500">
                      Zone Name :
                    </span>
                    <span className="col-sm-3 col-4 px-0 primary_color fw_600">
                      {zoneName}
                    </span>
                  </div>
                  <div className="row mb-3">
                    <span className="col-3  cement_color text-sm-end fw_500">
                      Name* :
                    </span>
                    <div className="col-sm-9 col-8 pe-sm-4 ps-sm-0 ps-2">
                      <input
                        name="zone_name"
                        value={formik.values.zone_name}
                        placeholder="Enter city name "
                        className={`${
                          formik.errors.zone_name && formik.touched.zone_name
                            ? "error_border_dark w-100  border_radius_7px outline_none ps-2 p-1 fs_16 fw_500 primary_color"
                            : "input_border_dark w-100  border_radius_7px outline_none ps-2 p-1 fs_16 fw_500 primary_color"
                        }`}
                        onChange={formik.handleChange}
                        disabled={is_editable === false}
                      />{" "}
                      {formik.errors.zone_name && formik.touched.zone_name && (
                        <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                          {formik.errors.zone_name}
                        </span>
                      )}
                    </div>
                  </div>
                </>
                <div className={"row"}>
                  <span className="col-sm-2 cement_color text-sm-end fw_500">
                    Map* :
                  </span>
                  <div
                    className={`px-0 position-relative  col-sm-10 ps-sm-0  ps-2 pe-sm-4 pe-2`}
                  >
                    {loadError ? (
                      <div>
                        Failed to load google map.Try refreshing the page
                      </div>
                    ) : isLoaded ? (
                      <>
                        <GoogleMap
                          zoom={10}
                          options={{
                            mapTypeControl: false,
                            streetViewControl: false,
                            styles: mapStyle,
                            fullscreenControlOptions: {
                              position:
                                window.google?.maps.ControlPosition.BOTTOM_LEFT,
                            },
                            restriction: {
                              latLngBounds: {
                                north: 35.504475,
                                south: 6.753515,
                                west: 68.162386,
                                east: 97.395956,
                              },
                            },
                          }}
                          center={center}
                          onLoad={onLoadMap}
                          mapContainerClassName={`newmap_container ${
                            error
                              ? "newmap_container__error"
                              : "newmap_container__border"
                          }`}
                          onTilesLoaded={() => setCenter(null)}
                        >
                          <DrawingManagerF
                            onLoad={onLoadDrawingManager}
                            onPolygonComplete={onPolyComplete}
                            options={drawingManagerOptions}
                          />
                          {newPoly.id && (
                            <PolygonF
                              onLoad={(event) => onLoadPolygon(event)}
                              onMouseUp={(event) => {
                                onEditPolygon(event);
                              }}
                              // onMouseDown={() => {

                              //   // setSelectedId(newPoly.id);
                              // }}
                              options={{
                                fillOpacity: 0.3,
                                fillColor: "#0060FF33",
                                strokeColor: "#0060FF",
                                strokeWeight: 2,
                              }}
                              paths={newPoly.coord}
                              editable={action !== "view"}
                              draggable={false}
                              onUnmount={onUnmount}
                            />
                          )}
                          {polyData.map((item, index) => (
                            <React.Fragment key={index}>
                              {(selectedId == item.id ||
                                item.id.startsWith(zonesSelect)) && (
                                <InfoWindowF
                                  position={item.coord[0]}
                                  options={{ disableAutoPan: true }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: "white",
                                      opacity: 0.75,
                                      padding: 4,
                                    }}
                                  >
                                    <h5
                                      style={{
                                        fontSize: 12,
                                        fontColor: `#08233B`,
                                      }}
                                    >
                                      ZoneID:{item.id} <br />
                                    </h5>
                                    <span className="fw_600 text-center">
                                      {" "}
                                      {item.name}
                                    </span>
                                  </div>
                                </InfoWindowF>
                              )}
                              <PolygonF
                                key={item.id}
                                onMouseDown={(e) => {
                                  setSelectedId(item.id);
                                  SetZonesSelect("XXX");
                                }}
                                options={polygonStyle(item.id[0], visibility)}
                                paths={item.coord}
                                editable={false}
                                draggable={false}
                              />
                            </React.Fragment>
                          ))}
                          <MapToolbar
                            handleViewZone={handleViewZone}
                            type={"local"}
                            handleZonesSelect={(value) => {
                              SetZonesSelect(value);
                            }}
                            redoData={redoData}
                            currPoly={newPoly}
                            redoPolygon={redoPolygon}
                            undoPolygon={undoPolygon}
                            action={action}
                            undoData={undoData}
                            onLoadSearchBox={onLoadSearchBox}
                            onPlaceChanged={onPlaceChanged}
                            onDeletePolygon={onDeletePolygon}
                            drawingManagerRef={drawingManagerRef}
                            intraZoneType={intraZoneType}
                          />
                        </GoogleMap>
                      </>
                    ) : (
                      <div>Loading...</div>
                    )}{" "}
                    {error && (
                      <div className="text-center translate-middle newmap_error rounded-1 position-absolute px-3">
                        <span className="red_color mb-2 fw_600 fs_14">
                          Error! {error}!
                        </span>
                      </div>
                    )}
                    {formik.errors.coordinates &&
                      formik.touched.coordinates && (
                        <span className="text-danger mt-1 fs_14 d-flex align-items-center mx-2 fw_600">
                          {formik.errors.coordinates}
                        </span>
                      )}
                  </div>
                </div>
              </div>
              <div className="w-100 d-flex justify-content-end mb-2">
                {action !== "view" && isLoaded && (
                  <div className="d-flex m-3 mb-2">
                    <Cancelbtn
                      cancelFn={() => {
                        onExit();
                      }}
                    />
                    <Savebtn
                      disabled={error}
                      btnClassName={
                        error ? "disabled_color_bg px-5" : "light_green_bg px-5"
                      }
                      type="submit"
                    />
                  </div>
                )}{" "}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default IntraCreateMap;
