import React, { useState } from "react";
import { capitalizeFirstLetter } from "../helper";
import ErrorMessagemodal from "../modals/errorMessageModal";
import LoadAndError from "../utilits/loadAndError";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import "./manage-zone-components.css";

const IntraZoneTable = ({
  tableHeading = "",
  loading = false,
  error = false,
  tableList = [],
  setIntraType = "",
  setEditId = {},
  setActionType = "",
  setShowMap = false,
  setType = "",
  handlChangesUpdateShow,
  headingClassName = "outstation_zone_head_container",
  is_editable = false,
  intraZoneType = "",
  intraZoneDeleteType = "",
}) => {
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageClose = () => setErrorMessageShow(false);
  const handleErrorMessageShow = () => setErrorMessageShow(true);

  // const handleAddBtnFn = () => {
  //   if (intraZoneType === "outstation") {
  //     if (tableList?.length < 26) {
  //       setIntraType(intraZoneType);
  //       setActionType("create");
  //       setEditId(null);
  //       setShowMap(true);
  //     } else if (tableList?.length >= 27) {
  //       handleErrorMessageShow();
  //     }
  //   } else if (intraZoneType === "local") {
  //     if (tableList?.length < 26) {
  //       setIntraType(intraZoneType);
  //       setActionType("create");
  //       setEditId(null);
  //       setShowMap(true);
  //     } else if (tableList?.length >= 27) {
  //       handleErrorMessageShow();
  //     }
  //   } else {
  //     if (tableList?.length < 25) {
  //       setIntraType(intraZoneType);
  //       setActionType("create");
  //       setEditId(null);
  //       setShowMap(true);
  //     } else {
  //       handleErrorMessageShow();
  //     }
  //   }
  // };
  const handleAddBtnFn = () => {
    const limit =
      intraZoneType === "outstation" || intraZoneType === "local" ? 26 : 25;

    if (tableList?.length < limit) {
      setIntraType(intraZoneType);
      setActionType("create");
      setEditId(null);
      setShowMap(true);
    } else {
      handleErrorMessageShow();
    }
  };

  return (
    <>
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title={`${capitalizeFirstLetter(
          intraZoneType
        )} zone cannot be created as 25 cities have already been created. Please delete a zone before adding a new one.`}
      />
      <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 px-sm-5 mt-4">
        <div className="d-flex justify-content-between">
          <span className="pt-2">
            <span className="cement_color fs_16 fw_500">{tableHeading}</span>
            <span className="fs_12 disabled_color fw_500">(25 Cities Max)</span>
          </span>
          {is_editable === true ? (
            <button
              type="button"
              onClick={() => {
                handleAddBtnFn();
              }}
              className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center"
            >
              <i className="ri-add-fill" />
              <span className="fs_14 fw_500 primary_color ps-1">
                Add New City
              </span>
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="manage_zone_local_table_scroll mt-2 manage_zone_local_table ">
          <table className=" w-100 text-nowrap">
            <thead className="">
              <tr className={`${headingClassName} fs_16 fw_500 primary_color`}>
                <th className="py-2 px-3">ID</th>
                <th>Name</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              <LoadAndError
                loader={loading}
                error={error}
                status={tableList?.length === 0}
              >
                {loading && <LoadingSpinnerTable />}
                {tableList?.map((item, index) => (
                  <>
                    <tr key={item?.id} className="bottom_border align-items-center">
                      <td className="py-2 px-2">
                        <span className="fs_14 fw_500 disabled_color px-1">
                          {item?.local_zone_code ??
                            item?.outstation_zone_code ??
                            item?.special_zone_code ??
                            item?.toll_zone_code ??
                            "--"}
                        </span>
                      </td>
                      <td>
                        <span className="fs_14 fw_500 disabled_color px-1">
                          {item?.city_name ? item?.city_name : "--"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`py-2 px-1 ${
                            item?.city_status === "Invalid"
                              ? "fs_14 fw_500 red_color"
                              : "fs_14 fw_500 green_color"
                          } fw_600`}
                        >
                          {item?.city_status ? item?.city_status : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="d-flex justify-content-center align-items-center gap-3 px-1">
                          {is_editable === true ? (
                            <>
                              <button
                                onClick={() => {
                                  setIntraType(intraZoneType);
                                  setEditId(item);
                                  setActionType("edit");
                                  setShowMap(true);
                                }}
                                type="button"
                                className="blue_color_bg border_none fs_14 px-2 white_color border_radius_3px"
                              >
                                Update
                              </button>
                              <i
                                className="ri-delete-bin-7-fill primary_color cursor_pointer"
                                onClick={() => {
                                  setEditId(item);
                                  setType(intraZoneDeleteType);
                                  handlChangesUpdateShow();
                                }}
                              />
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                setIntraType(intraZoneType);
                                setEditId(item);
                                setActionType("view");
                                setShowMap(true);
                              }}
                              type="button"
                              className="blue_color_bg border_none fs_14 px-2 white_color border_radius_3px"
                            >
                              View
                            </button>
                          )}
                        </span>
                      </td>
                    </tr>
                  </>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
        {/* <div className="manage_zone_local_table mt-2 table_container">
          <div className={`${headingClassName} fs_16 fw_500 primary_color p-2`}>
            <div className={`row gx-0`}>
              <div className="col-3">
                <span>ID</span>
              </div>
              <div className="col-3">
                <span>Name</span>
              </div>
              <div className="col-3">
                <span>Status</span>
              </div>
              <div className="col-3"></div>
            </div>
          </div>

          <div className="manage_zone_local_table_scroll">
            <LoadAndError
              loader={loading}
              error={error}
              status={tableList?.length === 0}
            >
              {loading && <LoadingSpinnerTable />}
              {tableList?.map((item, index) => (
                <div
                  className={`${index === 0 ? "mt-2" : ""} row gx-0`}
                  key={item?.id}
                >
                  <div className="col-3">
                    <span className="fs_14 fw_500 disabled_color ps-1">
                      {item?.local_zone_code ??
                        item?.outstation_zone_code ??
                        item?.special_zone_code ??
                        item?.toll_zone_code ??
                        "--"}
                    </span>
                  </div>
                  <div className="col-3">
                    <span className="fs_14 fw_500 disabled_color">
                      {item?.city_name ? item?.city_name : "--"}
                    </span>
                  </div>
                  <div className="col-3">
                    <span
                      className={`py-2 ${
                        item?.city_status === "Invalid"
                          ? "fs_14 fw_500 red_color"
                          : "fs_14 fw_500 green_color"
                      } fw_600`}
                    >
                      {item?.city_status ? item?.city_status : "--"}
                    </span>
                  </div>
                  <div className="col-3">
                    {" "}
                    <span className="d-flex justify-content-center align-items-center gap-1">
                      {is_editable === true ? (
                        <>
                          <button
                            onClick={() => {
                              setIntraType(intraZoneType);
                              setEditId(item);
                              setActionType("edit");
                              setShowMap(true);
                            }}
                            type="button"
                            className="blue_color_bg border_none fs_14 px-2 white_color border_radius_3px"
                          >
                            Update
                          </button>
                          <i
                            className="ri-delete-bin-7-fill primary_color cursor_pointer"
                            onClick={() => {
                              setEditId(item);
                              setType(intraZoneDeleteType);
                              handlChangesUpdateShow();
                            }}
                          />
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setIntraType(intraZoneType);
                            setEditId(item);
                            setActionType("view");
                            setShowMap(true);
                          }}
                          type="button"
                          className="blue_color_bg border_none fs_14 px-2 white_color border_radius_3px"
                        >
                          View
                        </button>
                      )}
                    </span>
                  </div>
                  <hr className="my-2" />
                </div>
              ))}
            </LoadAndError>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default IntraZoneTable;
