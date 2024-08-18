import moment from "moment";
import React, { useState } from "react";
import LoadAndError from "../utilits/loadAndError";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import "./manage-zone-components.css";
import "../manage-admins/adminModals.css";
import ManageZonesFilter from "./manage-zones-filter/manage-zones-filter";
import { useDispatch } from "react-redux";
import { deletintrazoneDrpdwnAction } from "../../redux/actions/manageZones/deletedIntraZoneAction";

const DeletedIntraZoneTable = ({
  loading = false,
  error = { error },
  tableList = [],
  is_editable = false,
  setDeletedintraZoneObject,
  handlChangesUpdateShow,
  setType,
  numberOfFilters,
  handleSearch,
  search,
  type,
  buttonList,
}) => {
  const [driverDropDownList, setDriverDropDownList] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const handleFilterClose = () => {
    setShowFilter(false);
  };
//   const buttonList = [
//     <>
//        <button
//          className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
//          type="button"
//          onClick={() => {
//            handleFetchDropDownList();  /// API call function name
//          }}
//        >
//          <i className="ri-filter-3-line primary_color pe-2" />
//          <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
//        </button>
 
//        {numberOfFilters === 0 ? (
//          <></>
//        ) : (
//          <div className={`position-relative p-1`}>
//            <span
//              className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
//            >
//              {numberOfFilters}
//            </span>
//          </div>
//        )}
//      </>
//  ];
 
//   const handleFetchDropDownList = () => {
//    dispatch(
//     deletintrazoneDrpdwnAction(
//       onDropDownListSuccess,
//       onDropDownListError
//     )
//    )
//  };
//  const onDropDownListSuccess = (data) => {
//   console.log(data?.data, "fasklada");
//   setShowFilter(!showFilter);
//   setDriverDropDownList({

//   })
//  }
//  const onDropDownListError = (data) => {
//   console.log(data?.data);
// };
  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <div className="col-9">
        <div className="d-flex justify-content-between">
        <span className="fs_18 fw_500 cement_color">Deleted Intra Zones</span>
        <div>{buttonList}</div>
        </div>
        {/* {showFilter ? (
          <ManageZonesFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            driverDropDownList={driverDropDownList}
            type={type}
            setShowFilter={setShowFilter}
          />
        ) : (
          <></>
        )} */}
          <div className="manage_zone_local_table mt-2">
            <div className="deleted_zone_head_container fs_16 fw_500 primary_color text-nowrap">
              <div className={`row gx-0 py-2`}>
                <div className="col-1">
                  <span className="ps-2">ID</span>
                </div>
                <div className="col-2">
                  <span className="ps-2">Name</span>
                </div>
                <div className="col-2">
                  <span>Category</span>
                </div>
                <div className="col-2">
                  <span> Date</span>
                </div>
                <div className="col-2">
                  <span>By</span>
                </div>
                <div className="col-2"></div>
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
                    <div className="col-1">
                      <span className="ps-2 fs_14 fw_500 disabled_color">
                        {item?.local_zone_code ??
                          item?.outstation_zone_code ??
                          item?.special_zone_code ??
                          item?.toll_zone_code ??
                          "--"}
                      </span>
                    </div>
                    <div className="col-2">
                      <span className="fs_14 fw_500 disabled_color ps-2">
                        {item.city_name ? item.city_name : "--"}
                      </span>
                    </div>
                    <div className="col-2">
                      <span className="fs_14 fw_500 disabled_color">
                        {item?.category ? item?.category : "--"}
                      </span>
                    </div>
                    <div className="col-2">
                      <span className="fs_14 fw_500 disabled_color">
                        {item?.deleted_at === null
                          ? "--"
                          : moment(item?.deleted_at).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )}
                      </span>
                    </div>
                    <div className="col-2">
                      <span className="fs_14 fw_500 disabled_color">
                        {item?.DeletedBy?.user_name
                          ? item?.DeletedBy?.user_name
                          : "--"}
                      </span>
                    </div>
                    <div className="col-2">
                      {" "}
                      {is_editable === true ? (
                        <span className="d-flex justify-content-center align-items-center gap-3">
                          <button
                            className="blue_color_bg border_none fs_14 px-2 white_color border_radius_3px"
                            onClick={() => {
                              handlChangesUpdateShow();
                              setType("RestoreDeletedZone");
                              setDeletedintraZoneObject(item);
                            }}
                          >
                            Restore
                          </button>
                          <button
                            className="light_red_color error_border_dark border_radius_3px fw_500 background_none fs_14 px-2 text-nowrap"
                            onClick={() => {
                              handlChangesUpdateShow();
                              setType("DeleteIntraZonePermanently");
                              setDeletedintraZoneObject(item);
                            }}
                          >
                            Delete Permanently
                          </button>
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <hr className="my-2" />
                  </div>
                ))}
              </LoadAndError>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletedIntraZoneTable;
