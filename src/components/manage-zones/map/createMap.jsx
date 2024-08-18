import React, { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  GoogleMap,
  DrawingManagerF,
  PolygonF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useRef } from "react";
import {
  // isOutsideInnerChecker,
  isOutsideMainChecker,
  isSelfIntersected,
  // isWithInMaxLength,
  mapStyle,
  polygonStyle,
  zoneStyles,
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
import "./map.css";
import CloseIcon from "../../../assets/icons/close-icon";
function CreateMap({
  // is_editable = false,
  show = false,
  latlng = "",
  closeModal = () => {},
  zoneType = "Z",
  action = "view",
  editZone = {},
  mapData = [],
  innerZoneData = [],
  name = "",
  formik = {},
  isLoaded = false,
  loadError = false,
  error = "",
  handleError = () => {},
  handleMapCenter = () => {},
  center = {
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  },
  zoneTypeName = "",
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [polyData, setPolyData] = useState(mapData);
  const [undoData, setUndoData] = useState([]);
  const [redoData, setRedoData] = useState([]);
  const [currPoly, setCurrPoly] = useState({});
  const [visibility, setVisibility] = useState([]);
  const [zonesSelect, SetZonesSelect] = useState("$");
  const mapRef = useRef();
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const searchBox = useRef();
  const drawingManagerRef = useRef();
  const drawingManagerOptions = {
    polygonOptions: zoneStyles.currentZone,
    drawingControl: false,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [
        window.google?.maps?.drawing?.OverlayType?.POLYGON,
        window.google?.maps?.drawing?.OverlayType?.POLYLINE,
      ],
    },
  };
  useEffect(() => {
    //block and mainZone
    // create && view
    // edit && view
    //view

    if (action === "edit" && editZone?.id && !currPoly.id) {
      zoneType === "Z"
        ? visibility.length === 0 && setVisibility(["Z"])
        : visibility.length === 0 && setVisibility(["B"]);
      setCurrPoly(editZone);
      setUndoData([editZone]);
      handleMapCenter(editZone.coord[0]);
      setSelectedId(editZone.id);
    }
    if (action === "create") {
      zoneType === "Z"
        ? visibility.length === 0 && setVisibility(["Z"])
        : visibility.length === 0 && setVisibility(["B"]);
      if (currPoly.id) {
        handleMapCenter(
          currPoly.id
            ? currPoly.coord[0]
            : {
                lat: 12.349928594850034,
                lng: 76.54419729957652,
              }
        );
      }
    }
    if (action === "view") {
      zoneType === "Z"
        ? visibility.length === 0 && setVisibility(["Z"])
        : visibility.length === 0 && setVisibility(["B"]);
      // zoneType === "B" && setVisibility(["B"]);
      if (editZone?.id && !currPoly.id) {
        handleMapCenter(editZone?.coord[0]);
        setCurrPoly(editZone);
        setSelectedId(editZone.id);
      } else if (currPoly.id) {
        handleMapCenter(currPoly?.coord[0]);
      }
    }
    // if (action === "edit" && editZone?.id && !currPoly.id) {
    //   setCurrPoly(editZone);
    //   setUndoData([editZone]);
    //   handleMapCenter(editZone.coord[0]);
    //   setSelectedId(editZone.id);
    // }
    // else if (action === "view") {
    //   if (is_editable && editZone?.id && !currPoly.id) {
    //     handleMapCenter(editZone?.coord[0]);
    //     setCurrPoly(editZone);
    //     setSelectedId(editZone.id);
    //   }
    //   else if (!is_editable && editZone?.id && !currPoly.id) {
    //     handleMapCenter(editZone?.coord[0]);
    //     setCurrPoly(editZone);
    //     setSelectedId(editZone.id);
    //     // setVisibility(["Z",]);
    //   }
    // }
    // else if (action === "create") {
    //   handleMapCenter(
    //     currPoly.id
    //       ? currPoly.coord[0]
    //       : {
    //         lat: 12.349928594850034,
    //         lng: 76.54419729957652,
    //       }
    //   );
    //   setVisibility(["Z",]);
    // }
    setPolyData([...mapData, ...innerZoneData]);
  }, [show]);
  const mainZoneList = useMemo(
    () =>
      mapData
        .filter((item) => !item.id.startsWith("B"))
        .map((item) => {
          return {
            coord: item.coord.map((item) => [item.lat, item.lng]),
            id: item.id,
          };
        }),
    [polyData]
  );
  const blockedZoneList = useMemo(
    () =>
      mapData
        .filter((item) => item.id.startsWith("B"))
        .map((item) => {
          return {
            coord: item.coord.map((item) => [item.lat, item.lng]),
            id: item.id,
          };
        }),
    [polyData]
  );
  // const innerZoneList = useMemo(
  //   () =>
  //     innerZoneData.map((item) => {
  //       return {
  //         coord: item.coord.map((item) => [item.lat, item.lng]),
  //         id: item.id,
  //       };
  //     }),
  //   [polyData]
  // );
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
      errorChecker(keyLessBounds); //detects all the errors
    } else {
      handleError("Should be a polygon");
      drawingManagerRef.current.setDrawingMode("polygon");
      $polyEvent.setMap(null);
    }
  };
  const newPolygonAdder = ($polyEvent, bounds) => {
    const newPolygon = {
      id: "NEW ZONE",
      coord: bounds,
    };
    setCurrPoly(newPolygon);
    setUndoData([...undoData, newPolygon]);
    $polyEvent.setMap(null);
  };
  function errorChecker(keyLessBounds) {
    // visibility.length === 0 && setVisibility(["Z", "L", "O", "B", "T", "S"]);
    const isSelfIntersecting = isSelfIntersected(keyLessBounds);
    if (zoneType === "Z") {
      const isInsideMain = isInsideMainChecker(keyLessBounds, mainZoneList);
      const isOutsideMain = isOutsideMainChecker(keyLessBounds, mainZoneList);
      const overlaps = overLapChecker(keyLessBounds, mainZoneList);
      // const isInnerZoneSafe = isOutsideInnerChecker(
      //   keyLessBounds,
      //   innerZoneList
      // );
      handleError(
        overlaps.length > 0
          ? "overlaps with another zone"
          : isSelfIntersecting
          ? "should not self intersect"
          : isInsideMain
          ? `Main Zone  cannot be inside another main zone ${
              action === "edit" ? "or outstation" : ""
            }`
          : isOutsideMain
          ? `Another main zone ${
              action === "edit" ? "or outstation" : ""
            } cannot be inside`
          : ""
      );
    } else if (zoneType === "B") {
      const overlaps = overLapChecker(keyLessBounds, blockedZoneList);
      const isInsideMain = isInsideMainChecker(keyLessBounds, blockedZoneList);
      const isOutsideMain = isOutsideMainChecker(
        keyLessBounds,
        blockedZoneList
      );
      handleError(
        isSelfIntersecting
          ? "should not self intersect"
          : overlaps.length > 0
          ? "cannot overlap with another blocked zone"
          : isInsideMain
          ? "blocked zone  cannot be inside another blocked zone"
          : isOutsideMain
          ? "Another blocked zone cannot be inside"
          : ""
      );
    }
  }
  const undoPolygon = () => {
    if (undoData.length > 1) {
      const previousPoly = [...undoData];
      const removedPoly = previousPoly.pop();
      setCurrPoly(previousPoly[previousPoly.length - 1]);
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
      setCurrPoly(removedPoly);
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
    const changed = isChanged(coordinates, currPoly.coord);
    let latestPoly = { ...currPoly };
    latestPoly.coord = coordinates;
    setCurrPoly(latestPoly);
    if (changed) {
      setUndoData([...undoData, latestPoly]);
      setRedoData([]);
    }
    const keyLessBounds = latLangKeyRemover(coordinates);
    errorChecker(keyLessBounds);
  }, [currPoly]);
  const onDeletePolygon = () => {
    setCurrPoly({});
    setUndoData([]);
    setRedoData([]);
    handleError("");
    // drawingManagerRef.current.setDrawingMode(null);
  };
  const onLoadPolygon = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEditPolygon),
        path.addListener("insert_at", onEditPolygon),
        path.addListener("remove_at", onEditPolygon)
      );
    },
    [onEditPolygon, show]
  );
  const onUnmount = useCallback(() => {
    console.log("unmounted");
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
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
  /********Submit and exist**********/
  function onSubmit() {
    if (!error && currPoly.id) {
      onExit();
    }
  }
  const onExit = () => {
    if (currPoly.id) {
      const data = latLangKeyRemover(currPoly.coord);
      data.push(data[0]);
      formik.setFieldValue(name, data);
    }
    formik.setFieldValue(latlng, currPoly.coord ?? []);
    handleMapCenter(
      currPoly.id
        ? currPoly.coord[0]
        : {
            lat: 12.349928594850034,
            lng: 76.54419729957652,
          }
    );
    closeModal();
  };
  function handleViewZone() {
    setVisibility(["Z", "L", "O", "B", "T", "S"]);
  }
  return (
    <Modal
      centered
      show={show}
      // onHide={onExit}<Modal
      size={"xl"}
      backdropClassName="localZone_backdrop"
      dialogClassName="localZone_container"
      contentClassName="localZone_card_radius"
      style={{ padding: "0px" }}
      backdrop={"static"}
      keyboard={false}
    >
      <Modal.Body bsPrefix="newmap_modal__body">
        <div className="d-flex justify-content-between pb-1 px-3 pt-3">
          <h5
            className={` fs_16 fw_500 mb-0 ${
              error ? "red_color" : "cement_color"
            }`}
          >
            Draw Zone On Map
          </h5>
          <button
            className="border_none background_none"
            onClick={() => {
              onExit();
            }}
          >
            <CloseIcon
              fill="white"
              className={`primary_bg fs_21 rounded-5 fw_500 p-1`}
              width={20}
              height={20}
            />
          </button>
        </div>
        {loadError ? (
          <div>Failed to load google map.Try refreshing the page</div>
        ) : isLoaded ? (
          <>
            <GoogleMap
              zoom={10}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                styles: mapStyle,
                fullscreenControlOptions: {
                  position: window.google?.maps.ControlPosition.BOTTOM_LEFT,
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
                error ? "newmap_container__error" : "newmap_container__border"
              }`}
              onTilesLoaded={() => handleMapCenter(null)}
            >
              <DrawingManagerF
                onLoad={onLoadDrawingManager}
                onPolygonComplete={onPolyComplete}
                options={drawingManagerOptions}
              />
              {selectedId === currPoly.id && (
                <InfoWindowF
                  onCloseClick={() => {
                    setSelectedId(null);
                  }}
                  position={currPoly.coord[0]}
                  options={{ disableAutoPan: true }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      opacity: 0.75,
                      padding: 4,
                    }}
                  >
                    <h5 style={{ fontSize: 12, fontColor: `#08233B` }}>
                      ZoneID:{currPoly.id}
                    </h5>{" "}
                    <span className="fw_600 text-center"> {currPoly.name}</span>
                  </div>
                </InfoWindowF>
              )}
              {currPoly.id && (
                <PolygonF
                  onLoad={(event) => onLoadPolygon(event)}
                  onMouseUp={(event) => {
                    onEditPolygon(event);
                  }}
                  onMouseDown={() => {
                    setSelectedId(currPoly.id);
                  }}
                  options={{
                    fillOpacity: 0.3,
                    fillColor: "#0060FF33",
                    strokeColor: "#0060FF",
                    strokeWeight: 2,
                  }}
                  paths={currPoly.coord}
                  editable={action !== "view"}
                  draggable={false}
                  onUnmount={onUnmount}
                />
              )}
              {polyData.map((item, index) => (
                <React.Fragment key={index}>
                  {(selectedId === item.id ||
                    item.id.startsWith(zonesSelect)) && (
                    <InfoWindowF
                      onCloseClick={() => {
                        setSelectedId(null);
                      }}
                      // onLoad={(event) => onLoadInfo(event, index)}
                      // onDomReady={() =>
                      //   console.log(infoWindowRefs.current[index])
                      // }
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
                        <h5 style={{ fontSize: 12, fontColor: `#08233B` }}>
                          ZoneID:{item.id}
                        </h5>{" "}
                        <span className="fw_600 text-center"> {item.name}</span>
                      </div>
                    </InfoWindowF>
                  )}
                  <PolygonF
                    key={index}
                    onMouseDown={() => {
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
              {
                <MapToolbar
                  handleViewZone={handleViewZone}
                  handleZonesSelect={(value) => {
                    SetZonesSelect(value);
                  }}
                  handleCurrZone={(value) => {
                    setSelectedId(value);
                  }}
                  redoData={redoData}
                  currPoly={currPoly}
                  redoPolygon={redoPolygon}
                  undoPolygon={undoPolygon}
                  action={action}
                  undoData={undoData}
                  onLoadSearchBox={onLoadSearchBox}
                  onPlaceChanged={onPlaceChanged}
                  onDeletePolygon={onDeletePolygon}
                  drawingManagerRef={drawingManagerRef}
                  zoneTypeName={zoneTypeName}
                />
              }
            </GoogleMap>
          </>
        ) : (
          <div>Loading...</div>
        )}{" "}
        {error && (
          <div className="text-center translate-middle newmap_error rounded-1 position-absolute px-3">
            <span className="red_color mb-2 fw_600 fs_14">Error! {error}!</span>
          </div>
        )}
        {action !== "view" && currPoly.id && isLoaded && (
          <button
            disabled={error}
            className={`${
              error ? "disabled_color_bg" : "primary_bg"
            }  newmap_done__btn position-absolute  rounded-1 border-0 text-white fs_14 px-4 py-1 lh-sm`}
            onClick={() => {
              onSubmit();
            }}
          >
            DONE
          </button>
        )}
      </Modal.Body>
    </Modal>
  );
}
export default CreateMap;
