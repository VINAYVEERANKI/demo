import { GoogleMap, InfoWindowF, PolygonF } from "@react-google-maps/api";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { mapStyle, polygonStyle } from "./maphelper";
import MapToolbar from "./toolbar";
const StaticMap = ({
  // action = "",
  error = "",
  is_editable = false,
  newPoly = {},
  polyData = [],
  // handleViewZone = () => { },
  isLoaded = false,
  loadError = false,
  onPencilClick = () => { },
  onFullScreenClick = () => { },
  center = {
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  },
  zoneTypeName = "",
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [zonesSelect, SetZonesSelect] = useState("null");
  const [mapCenter, setMapCenter] = useState(center);
  const [visibility, setVisibility] = useState([]);
  useEffect(() => {
    if (zoneTypeName === "AddMainZone" || zoneTypeName === "EditMainZone") {
      visibility.length === 0 && setVisibility(["Z"])
    } else {
      visibility.length === 0 && setVisibility(["B"])
    }
    setMapCenter(center);
  }, [center]);

  function handleViewZone(value) {
    setVisibility(["Z", "L", "O", "B", "T", "S"]);
  }

  return (
    <div
      className={`${error ? "newmap_container__error" : "input_border"
        } border_radius_7px `}
    >
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
              disableDefaultUI: true,
              fullscreenControlOptions: {
                position: window.google?.maps.ControlPosition.BOTTOM_LEFT,
              },
            }}
            center={mapCenter}
            mapContainerClassName={`newmap_view__container`}
            onTilesLoaded={() => setMapCenter(null)}
          >
            {polyData.map((item, index) => (
              <React.Fragment key={index}>
                {(selectedId === item.id ||
                  item.id.startsWith(zonesSelect)) && visibility.includes(item.id[0]) && (
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
                  }}
                  options={polygonStyle(item.id[0], visibility)}
                  paths={item.coord}
                  editable={false}
                  draggable={false}
                />
              </React.Fragment>
            ))}
            {selectedId === newPoly.id && (
              <InfoWindowF
                position={newPoly.coord[0]}
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
                    ZoneID:{newPoly.id}
                  </h5>{" "}
                  <span className="fw_600 text-center"> {newPoly.name}</span>
                </div>
              </InfoWindowF>
            )}
            {newPoly?.coord?.length > 0 && (
              <PolygonF
                onMouseDown={() => {
                  setSelectedId(newPoly.id);
                }}
                options={{
                  fillOpacity: 0.3,
                  fillColor: "#0060FF66",
                  strokeColor: "#0060FF",
                  strokeWeight: 2,
                }}
                paths={newPoly.coord}
                editable={false}
                draggable={false}
              />
            )}
            <MapToolbar
              handleViewZone={handleViewZone}
              handleZonesSelect={(value) => {
                SetZonesSelect(value);
              }}
              handleCurrZone={(value) => {
                setSelectedId(value);
              }}
              is_editable={is_editable}
              onPencilClick={onPencilClick}
              onFullScreenClick={onFullScreenClick}
              isEditable={false}
              zoneTypeName={zoneTypeName}
            />
          </GoogleMap>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default StaticMap;
