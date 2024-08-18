import React, { useState } from "react";
import CreateMap from "../map/createMap";
import StaticMap from "../map/staticMap";
import "../manage-zone-components.css";

const ArchivedZoneDetailsView = ({
  isLoaded = false,
  loadError = "",
  polyData = [],
  center = {
    lat: 12.349928594850034,
    lng: 76.54419729957652,
  },
  archiveZonesData,
}) => {
  const [showMap, setShowMap] = useState(false);
  console.log(archiveZonesData?.zoneDetails);
  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <div className="col-lg-7">
          <div className="row">
            <div className="col-sm-3 text-sm-end">
              <span className="fs_16 secondary_color text-nowrap fw_500">Zone Name*</span>
            </div>
            <div className="col-sm-9">
              <input
                className="input_border_dark w-100  border_radius_7px outline_none ps-2 p-1 fs_16 fw_500 primary_color"
                placeholder="Enter zone name"
                value={
                  archiveZonesData?.zoneDetails?.zone_name ??
                  archiveZonesData?.zoneDetails?.zone_name
                }
                disabled
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-3 text-end">
              <span className="fs_16 secondary_color fw_500 ">Status*</span>
            </div>
            <div className="col-9">
              <span className=" ps-2 p-1 fs_16 fw_500 primary_color">
                Inactive
              </span>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-sm-3 text-sm-end">
              <span className="fs_16 secondary_color fw_500">Notes</span>
            </div>
            <div className="col-sm-9">
              <textarea
                className="w-100 input_border_dark border_radius_7px outline_none ps-2 p-1 fs_15 fw_500 primary_color manage_zone_note_textArea"
                name="zone_notes"
                // placeholder="Write about zone(optional)"
                value={
                  archiveZonesData?.zoneDetails?.zone_notes
                    ? archiveZonesData?.zoneDetails?.zone_notes
                    : ""
                }
                disabled
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3 text-sm-end">
              <span className="fs_16 secondary_color fw_500">Map*</span>
            </div>
            <div className="col-sm-9">
              <StaticMap
                onFullScreenClick={() => {
                  setShowMap(true);
                }}
                center={center}
                polyData={polyData}
                isLoaded={isLoaded}
                loadError={loadError}
                is_editable={false}
                zoneTypeName="EditMainZone"
              />

              {/* <div className="border_radius_7px input_border w-100 map_container"></div> */}
            </div>
          </div>
        </div>
      </div>
      <CreateMap
        center={center}
        isLoaded={isLoaded}
        loadError={loadError}
        mapData={polyData}
        show={showMap}
        formik={{ setFieldValue: () => { } }}
        action={"view"}
        closeModal={() => {
          setShowMap(false);
        }}
      />
    </>
  );
};
export default ArchivedZoneDetailsView;
