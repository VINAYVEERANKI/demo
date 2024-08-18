import { Autocomplete } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import refershIcon from "../../../assets/icons/refresh-icon.svg";
import "./map.css";
import EditIcon from "../../../assets/icons/edit-icon";
import FullScreenIcon from "../../../assets/icons/fullscreen-icon";
import PlusIcon from "../../../assets/icons/plus-icon";

export default function MapToolbar({
  onFullScreenClick = () => {},
  is_editable = false,
  onPencilClick = () => {},
  redoPolygon = () => {},
  onLoadSearchBox = () => {},
  onPlaceChanged = () => {},
  onDeletePolygon = () => {},
  drawingManagerRef = {},
  action = "view",
  undoData = [],
  currPoly = {},
  undoPolygon = () => {},
  redoData = [],
  isEditable = true,
  handleZonesSelect = () => {},
  handleCurrZone = () => {},
  type = "default",
  title = "View Zones",
  handleViewZone = () => {},
  zoneTypeName = "",
  intraZoneType = "",
}) {
  const [open, setOpen] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const AddMainZoneList = [
    // { label: "Current zone", value: "$" },
    { label: "Other Main Zones", value: "Z", backgroundColor: "#000000" },
    { label: "Blocked Zones", value: "B", backgroundColor: "#F8442754" },
  ];

  const EditMainZoneList = [
    // { label: "Current Zone", value: "$" },
    { label: "Main Zones", value: "Z", backgroundColor: "#000000" },
    {
      label: "Local (Defined Cities)",
      value: "L",
      backgroundColor: "#00CBE966",
    },
    { label: "Special Zones", value: "S", backgroundColor: "#FFE60096" },
    { label: "Toll", value: "T", backgroundColor: "#9A00FF73" },
    {
      label: "Outstation (Defined Cities)",
      value: "O",
      backgroundColor: "#3BE81A",
    },
    { label: "Blocked Zones", value: "B", backgroundColor: "#F8442754" },
  ];
  const intraZoneList = [
    // { label: "Current Zone", value: "$" },
    { label: "Main Zones", value: "Z", backgroundColor: "#000000" },
    {
      label: "Local (Defined Cities)",
      value: "L",
      backgroundColor: "#00CBE966",
    },
    { label: "Special Zones", value: "S", backgroundColor: "#FFE60096" },
    { label: "Toll", value: "T", backgroundColor: "#9A00FF73" },
    { label: "Blocked Zones", value: "B", backgroundColor: "#F8442754" },
  ];
  const OutstationZoneList = [
    // { label: "Current Zone", value: "$" },
    { label: "Main Zone", value: "Z", backgroundColor: "#000000" },
    {
      label: "Outstation (Defined Cities)",
      value: "O",
      backgroundColor: "#3BE81A",
    },
    { label: "Blocked Zones", value: "B", backgroundColor: "#F8442754" },
  ];
  const BLockedZoneList = [
    // { label: "Current Zone", value: "$" },
    { label: "Main Zone", value: "Z", backgroundColor: "#000000" },
    { label: "Blocked Zones", value: "B", backgroundColor: "#F8442754" },
  ];

  // const ZoneList = () => {
  //   if (zoneTypeName === "AddMainZone") {
  //     return AddMainZoneList;
  //   } else if (zoneTypeName === "EditMainZone") {
  //     return EditMainZoneList;
  //   } else if (intraZoneType === "outstation") {
  //     return OutstationZoneList;
  //   } else if (zoneTypeName === "BlockedMainZone") {
  //     return BLockedZoneList;
  //   } else {
  //     return intraZoneList;
  //   }
  // };

  // const ZoneListData = ZoneList();
  const ZoneListData = useMemo(() => {
    if (zoneTypeName === "AddMainZone") {
      return AddMainZoneList;
    } else if (zoneTypeName === "EditMainZone") {
      return EditMainZoneList;
    } else if (intraZoneType === "outstation") {
      return OutstationZoneList;
    } else if (zoneTypeName === "BlockedMainZone") {
      return BLockedZoneList;
    } else {
      return intraZoneList;
    }
  }, [zoneTypeName, intraZoneType]);

  console.log(zoneTypeName, "asdjakdda");

  return (
    <>
      <div className="newmap__toolbar position-absolute d-flex flex-column flex-sm-row  align-items-start  gap-3">
        {" "}
        {isEditable ? (
          <>
            <Autocomplete
              onLoad={onLoadSearchBox}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="search"
                placeholder="Search the location"
                className="newmap_search__input border_radius_3px fs_15 primary_color fw_700"
              />
            </Autocomplete>
            {currPoly.id && action !== "view" && (
              <button
                type="button"
                title="undo"
                disabled={undoData.length === 1}
                onClick={undoPolygon}
                className={`bg-white rounded-1  ${
                  undoData.length === 1
                    ? "disabled_color disabled_border"
                    : "primary_color newmap_reload__btn"
                }  p-0 lh-sm d-flex align-items-center newmap_mini__btn`}
              >
                <span className={`mx-auto fw_600`}>U</span>{" "}
              </button>
            )}
            {currPoly.id && action !== "view" && (
              <button
                type="button"
                title="redo"
                disabled={redoData.length === 0}
                onClick={redoPolygon}
                className={`${
                  redoData.length === 0
                    ? "disabled_color disabled_border"
                    : "primary_color newmap_reload__btn"
                } bg-white rounded-1  p-0 lh-sm d-flex align-items-center newmap_mini__btn`}
              >
                <span className={`mx-auto  fw_600`}>R</span>{" "}
              </button>
            )}
            {currPoly?.id && action === "create" && (
              <button
                type="button"
                onClick={() => {
                  setDrawing(false);
                  onDeletePolygon();
                }}
                className="bg-white rounded-1  newmap_reload__btn p-0 lh-sm d-flex align-items-center justify-content-center newmap_mini__btn"
              >
                <img
                  width={20}
                  height={20}
                  src={refershIcon}
                  className="mx-auto"
                  alt="icon"
                />
              </button>
            )}
            {!currPoly?.id && action === "create" && (
              <button
                type="button"
                className="primary_bg border-0 pb-1 rounded-1 newmap_mini__btn "
                onClick={() => {
                  drawingManagerRef.current.setDrawingMode("polygon");
                  setDrawing(true);
                  // setError(null);
                }}
              >
                <EditIcon fill={drawing ? "#989898" : "white"} />
              </button>
            )}
          </>
        ) : (
          <>
            {is_editable ? (
              <button
                type="button"
                className="primary_bg border-0 rounded-1 text-white pb-1 newmap_mini__btn"
                onClick={onPencilClick}
              >
                <EditIcon fill={"white"} />
              </button>
            ) : (
              <></>
            )}

            <button
              type="button"
              className="primary_bg border-0 rounded-1 pb-1 newmap_mini__btn"
              onClick={onFullScreenClick}
            >
              <FullScreenIcon fill={"white"} />
            </button>
          </>
        )}
      </div>
      <div
        className={`${
          isEditable
            ? `${
                type === "local" ? "newmap_local__viewzone" : "newmap__viewzone"
              }`
            : "end-0 mt-3"
        } ${
          open ? "pt-2" : "newmap_blue__border py-1"
        } bg-white position-absolute px-3 me-5  rounded-1`}
      >
        <div className="d-flex justify-content-between align-items-center">
          <span className={`light_blue_color fw_500 ${open ? "" : "mx-4"}`}>
            {title}
          </span>{" "}
          <button
            type="button"
            className="bg-transparent lh-1 border-0 fw_600 light_blue_color"
            onClick={() => {
              setOpen(!open);
              handleViewZone(open);
            }}
          >
            {open ? (
              <div style={{ rotate: "45deg" }}>
                <PlusIcon height={24} width={24} />
              </div>
            ) : (
              <PlusIcon />
            )}
          </button>
        </div>
        {open && (
          <ul className="newmap_viewzone__list list-unstyled mt-2 fs_14 secondary_color pe-4 fw_500">
            <li
              onClick={() => {
                handleCurrZone(currPoly.id ?? "");
                handleZonesSelect("$");
              }}
              className="newmap_viewzone_list__item gap-2 d-flex align-items-center"
            >
              <div
                className="newmap_viewzone_list__color"
                style={{ backgroundColor: "#0060ff" }}
              ></div>{" "}
              <span>Current zone</span>{" "}
            </li>
            {ZoneListData?.map((item) => {
              return (
                <React.Fragment key={item?.label}>
                  <li
                    onClick={() => handleZonesSelect(item?.value)}
                    className="newmap_viewzone_list__item gap-2 d-flex align-items-center"
                  >
                    <div
                      className="newmap_viewzone_list__color"
                      style={{ backgroundColor: item?.backgroundColor }}
                    ></div>{" "}
                    <span>{item?.label}</span>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
