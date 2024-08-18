import React, { useMemo, useState } from "react";
import {
  GoogleMap,
  DrawingManagerF,
  PolygonF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRef } from "react";
import { libraries } from "../../modules/manage-zone/main-page";
import {
  isOutsideMainChecker,
  isSelfIntersected,
  isWithInMaxLength,
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
const DynamicMap = (
  show = false,
  closeModal = () => { },
  zoneType = "M",
  action = "view",
  id = null,
  mapData = []
) => {
  const [error, setError] = useState("");
  const [center, setCenter] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [zoneStyle, setZoneStyle] = useState(zoneStyles.currentZone);
  const [polyData, setPolyData] = useState(mapData);
  const [undoData, setUndoData] = useState([]);
  const [redoData, setRedoData] = useState([]);
  const [newPoly, setNewPoly] = useState({});
  const mapRef = useRef();
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const searchBox = useRef();
  const drawingManagerRef = useRef();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB8W0Fdu5rDH9x-wN4C4Fy09pw1qUWxj1o",
    libraries,
  });
  const drawingManagerOptions = {
    polygonOptions: zoneStyle,
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
    if (action === "edit" && id?.id) {
      setNewPoly(id);
      setUndoData([id]);
      setCurrentId(id.id);
      setCenter(id.coord[0]);
    } else if (action === "view" && id?.id) {
      setCenter(id.coord[0]);
      setSelectedId(id.id);
    } else {
      setCenter({
        lat: 12.349928594850034,
        lng: 76.54419729957652,
      });
    }
    setPolyData(mapData);
  }, [show]);
  const mainZoneList = useMemo(
    () =>
      polyData
        .filter((item) => item.id.startsWith("M"))
        .map((item) => {
          return {
            coord: item.coord.map((item) => [item.lat, item.lng]),
            id: item.id,
          };
        }),
    [mapData]
  );
  const keyLessPolyData = useMemo(
    () =>
      polyData
        .filter((item) => item.id !== id)
        .map((item) => {
          return {
            coord: item.coord.map((item) => [item.lat, item.lng]),
            id: item.id,
          };
        }),
    [mapData]
  );
  function idGen() {
    return zoneType + Math.floor(100000 + Math.random() * 900000);
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
      errorChecker(keyLessBounds, keyLessPolyData); //detects all the errors
    } else {
      setError("Should be a polygon");
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
    setCurrentId(newPolygon.id);
  };
  function errorChecker(keyLessBounds, keyLessPolyData) {
    const isSelfIntersecting = isSelfIntersected(keyLessBounds);
    const isInsideMain = isInsideMainChecker(keyLessBounds, mainZoneList);
    const isOutsideMain = isOutsideMainChecker(keyLessBounds, mainZoneList);
    const overlaps = overLapChecker(keyLessBounds, keyLessPolyData);
    if (zoneType === "M") {
      setError(
        overlaps.length > 0
          ? "overlaps with another zone"
          : isSelfIntersecting
            ? "should not self intersect"
            : isInsideMain
              ? "Main Zone cannot be inside another main zone"
              : isOutsideMain
                ? "Another main zone cannot be inside"
                : ""
      );
    } else if (zoneType === "B" || zoneType === "T") {
    } else if (zoneType === "L" || zoneType === "S") {
      const isLengthMax = isWithInMaxLength(keyLessBounds, 100);
      setError(
        overlaps.length > 0
          ? "overlaps with another zone"
          : isSelfIntersecting
            ? "should not self intersect"
            : isLengthMax
              ? "Exceeds max length"
              : ""
      );
    } else if (zoneType === "O") {
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
      errorChecker(keyLessBounds, keyLessPolyData);
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
      errorChecker(keyLessBounds, keyLessPolyData);
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
    errorChecker(keyLessBounds, keyLessPolyData);
  }, [newPoly]);
  const onDeletePolygon = () => {
    setNewPoly({});
    setUndoData([]);
    setRedoData([]);
    setError("");
    setCurrentId(null);
    drawingManagerRef.current.setDrawingMode(null);
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
    if (!error && newPoly.id) {
      let data = [...polyData];
      data.push(newPoly);
      localStorage.setItem("map_data", JSON.stringify(data));
      onExit();
    } else {
      if (newPoly.id) {
        alert(error);
      } else {
        alert("create a polygon first");
      }
    }
  }
  const onExit = () => {
    console.log("exit running");
    setNewPoly({});
    setUndoData([]);
    setRedoData([]);
    setCurrentId(null);
    setError("");
    // listenersRef.current.forEach((lis) => lis.remove());
    // polygonRef.current = null;
    closeModal();
  };

  console.log(mapData);
  return (
    <>
      <div className="d-flex justify-content-between pb-1 px-3 pt-3">
        <h5
          className={` fs_16 fw_500 mb-0 ${error ? "red_color" : "cement_color"
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
          <i className="ri-close-line  fs_16 white_color primary_bg fw_500 close_icon_container "></i>
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
            }}
            center={center}
            onLoad={onLoadMap}
            mapContainerClassName={`newmap_container ${error ? "newmap_container__error" : "newmap_container__border"
              }`}
            onTilesLoaded={() => setCenter(null)}
          >
            <DrawingManagerF
              onLoad={onLoadDrawingManager}
              onPolygonComplete={onPolyComplete}
              options={drawingManagerOptions}
            />
            {polyData.length > 0 &&
              polyData.map((item, index) => (
                <React.Fragment key={index}>
                  {selectedId === item.id && (
                    <InfoWindowF
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
                        </h5>
                      </div>
                    </InfoWindowF>
                  )}
                  <PolygonF
                    key={index}
                    // onLoad={(event) => onLoadPolygon(event, item.id)}
                    // onMouseUp={() => {
                    //   if (action === "edit") {
                    //     onEditPolygon(index, item.id);
                    //   }
                    // }}
                    onMouseDown={() => {
                      setSelectedId(item.id);
                    }}
                    options={polygonStyle(item.id[0])}
                    paths={item.coord}
                    // editable={currentId === item.id}
                    editable={false}
                    draggable={false}
                  // onUnmount={onUnmount}
                  />
                </React.Fragment>
              ))}
            {newPoly.id && action !== "view" && (
              <PolygonF
                onLoad={(event) => onLoadPolygon(event)}
                onMouseUp={(event) => {
                  onEditPolygon(event);
                }}
                onMouseDown={() => {
                  setSelectedId(newPoly.id);
                }}
                options={{
                  fillOpacity: 0.3,
                  fillColor: "#0060FF33",
                  strokeColor: "#0060FF",
                  strokeWeight: 2,
                }}
                paths={newPoly.coord}
                editable={true}
                draggable={false}
                onUnmount={onUnmount}
              />
            )}
            <MapToolbar
              redoData={redoData}
              newPoly={newPoly}
              redoPolygon={redoPolygon}
              undoPolygon={undoPolygon}
              action={action}
              undoData={undoData}
              onLoadSearchBox={onLoadSearchBox}
              onPlaceChanged={onPlaceChanged}
              onDeletePolygon={onDeletePolygon}
              drawingManagerRef={drawingManagerRef}
            />
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
      {action !== "view" && newPoly.id && isLoaded && (
        <button
          disabled={error}
          className={`${error ? "disabled_color_bg" : "primary_bg"
            }  newmap_done__btn position-absolute  rounded-1 border-0 text-white fs_14 px-4 py-1 lh-sm`}
          onClick={() => {
            onSubmit();
          }}
        >
          DONE
        </button>
      )}
    </>
  );
};

export default DynamicMap;
