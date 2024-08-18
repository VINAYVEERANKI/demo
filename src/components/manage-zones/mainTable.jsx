import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ManageZonesListAction, managezoneDrpdwnAction } from "../../redux/actions/manageZones/manageZoneAction";
import InnerLayout from "../layout/innerLayout";
import CreateMap from "./map/createMap";
import errorToast from "../utilits/errorToast";
import LoadAndError from "../utilits/loadAndError";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import { blockZoneListAction, blockedzoneDrpdwnAction } from "../../redux/actions/manageZones/blockedZoneAction";
import { formatDateTime, insertSpaces, useSortableData } from "../helper";
import SearchInputfield from "../form/searchInputfield";
import { archiveZoneListAction, archivezoneDrpdwnAction } from "../../redux/actions/manageZones/archiveZoneAction";
import usePermissions from "../usePermissionChecker";
import ManageZonesFilter from "./manage-zones-filter/manage-zones-filter";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const ManageZoneMainTable = ({ type = "" }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    ManageZones: "manage_zones",
    ArchivedZones: "archived_zones",
    BlockedZones: "blocked_zones",
  };

  const permission = pagePermissions[type];
  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [zonesList, setZoneList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(zonesList);
  const [driverDropDownList, setDriverDropDownList] = useState({});
  const handleSearch = (value) => {
    setNumberOfFilters(0);
    setSearch(value);
    for (let key in value) {
      if (value[key]) {
        setNumberOfFilters((prev) => prev + 1);
      }
    }
    setPage(0);
  };
  useEffect(() => {
    localStorage.removeItem("Zonestab");
    if (type === "ManageZones") {
      setLoading(true);
      dispatch(
        ManageZonesListAction(
          {
            search: {
              main_zone_code: search?.main_zone_code,
              zone_name: search?.zone_name,
              zone_status: search?.zone_status,
              createdBy: search?.createdBy,
              created_on: search?.created_on,
              updated_by: search?.updated_by,
              updated_on: search?.updated_on,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "BlockedZones") {
      setLoading(true);
      dispatch(
        blockZoneListAction(
          {
            search: {
              blocked_zone_code: search?.main_zone_code,
              zone_name: search?.zone_name,
              blocked_at: search?.blocked_at,
              blocked_by: search?.blocked_by,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "ArchivedZones") {
      setLoading(true);
      dispatch(
        archiveZoneListAction(
          {
            search: {
              main_zone_code: search?.main_zone_code,
              zone_name: search?.zone_name,
              created_on: search?.created_on,
              created_by: search?.createdBy,
              archived_on: search?.archived_on,
              archived_by: search?.archived_by,
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, [page, search]);
  const tableHeading = [
    { title: "Zone ID", value: "main_zone_code", display: true },
    { title: "Zone Name", value: "zone_name", display: true },
    {
      title: "Status",
      value: "zone_status",
      display: type === "ManageZones" ? true : false,
    },
    {
      title: "Updated On",
      value: "updated_on",
      display: type === "ManageZones" ? true : false,
    },
    {
      title: "Updated By",
      value: "updatedBy.user_name,",
      display: type === "ManageZones" ? true : false,
    },
    {
      title: "Created On",
      value: "created_on",
      display:
        type === "ManageZones" || type === "ArchivedZones" ? true : false,
    },
    {
      title: "Created By",
      value: "createdBy.user_name",
      display:
        type === "ManageZones" || type === "ArchivedZones" ? true : false,
    },
    {
      title: "Blocked On",
      value: "blocked_at",
      display: type === "BlockedZones" ? true : false,
    },
    {
      title: "Blocked By",
      value: "blocked_by.user_name",
      display: type === "BlockedZones" ? true : false,
    },
    {
      title: "Archived On",
      value: "archived_on",
      display: type === "ArchivedZones" ? true : false,
    },
    {
      title: "Archived By",
      value: "archivedBy.user_name",
      display: type === "ArchivedZones" ? true : false,
    },
  ];

  const onSuccess = (data) => {
    setZoneList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
    setLoading(false);
  };
  const [actionType, setActionType] = useState("view");
  const [showMap, setShowMap] = useState(false);
  const [editId] = useState(null);
  const [mapData] = useState([]);

  const handleFilterClose = () => {
    setShowFilter(false);
  };
  const buttonList = [
    <>
      <button
        className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
        type="button"
        onClick={() => {
          handleFetchDropDownList();  /// API call function name
        }}
      >
        <i className="ri-filter-3-line primary_color pe-2" />
        <span className={`fs_14 fw_600 primary_color ps-1`}>Add Filter</span>
      </button>

      {numberOfFilters === 0 ? (
        <></>
      ) : (
        <div className={`position-relative p-1`}>
          <span
            className={`filter_number_container position-absolute  fw_700 fs_16 text-center  white_color`}
          >
            {numberOfFilters}
          </span>
        </div>
      )}
    </>
  ];
  if (type === "ManageZones") {
    buttonList?.push(
      canWrite(permission) && (
        <NavLink
          className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center text-decoration-none"
          to={"/manage-zone/create"}
        >
          <i className="ri-add-fill text-decoration-none primary_color" />
          <span className="fs_16 fw_600 primary_color ps-1">Add Zone</span>
        </NavLink>
      )
    );
  } else if (type === "BlockedZones") {
    buttonList?.push(
      canWrite(permission) && (
        <NavLink
          className="text-decoration-none tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center"
          to={`/block-zone/create`}
        >
          <i className="ri-add-fill primary_color" />
          <span className="fs_14 fw_600 primary_color ps-1">
            Add Block Zone
          </span>
        </NavLink>
      )
    );
  }

  const handleFetchDropDownList = () => {
    if (type === "ManageZones") {
      dispatch(
        managezoneDrpdwnAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      )
    }
    else if (type === "ArchivedZones") {
      dispatch(
        archivezoneDrpdwnAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      )
    }
    else if (type === "BlockedZones") {
      dispatch(
        blockedzoneDrpdwnAction(
          onDropDownListSuccess,
          onDropDownListError
        )
      )
    }
  };

  const onDropDownListSuccess = (data) => {
    console.log(data?.data, "fasklada");
    setShowFilter(!showFilter);
    if (type === "ManageZones") {
      setDriverDropDownList({
        main_zone_code: [...new Set(data?.data?.map((item) => item.main_zone_code))].map(
          (id) => ({ main_zone_code: id })
        ),
        zone_name: [...new Set(data?.data?.map((item) => item.zone_name))].map(
          (zone_name) => ({ zone_name: zone_name })
        ),
        zone_status: [...new Set(data?.data?.map((item) => item.zone_status))].map(
          (zone_status) => ({ zone_status: zone_status })
        ),
        created_on: [...new Set(data?.data?.map((item) => item.created_on))].map(
          (created_on) => ({ created_on: created_on })
        ),
        createdBy: [...new Set(data?.data?.map((item) => item?.createdBy?.user_name))].map(
          (createdBy) => ({ createdBy: createdBy })
        ),
        updated_on: [...new Set(data?.data?.map((item) => item.updated_on))].map(
          (updated_on) => ({ updated_on: updated_on })
        ),
        updated_by: [...new Set(data?.data?.map((item) => item.updatedBy))].map(
          (updated_by) => ({ updated_by: updated_by })
        ),
      });
    }
    else if (type === "ArchivedZones") {
      setDriverDropDownList({
        main_zone_code: [...new Set(data?.data?.map((item) => item.main_zone_code))].map(
          (id) => ({ main_zone_code: id })
        ),
        zone_name: [...new Set(data?.data?.map((item) => item.zone_name))].map(
          (zone_name) => ({ zone_name: zone_name })
        ),
        created_on: [...new Set(data?.data?.map((item) => item.created_on))].map(
          (created_on) => ({ created_on: created_on })
        ),
        createdBy: [...new Set(data?.data?.map((item) => item?.createdBy?.user_name))].map(
          (createdBy) => ({ createdBy: createdBy })
        ),
        archived_on: [...new Set(data?.data?.map((item) => item.archived_on))].map(
          (archived_on) => ({ archived_on: archived_on })
        ),
        archived_by: [...new Set(data?.data?.map((item) => item.archived_by))].map(
          (archived_by) => ({ archived_by: archived_by })
        ),
      })
    }
    else if (type === "BlockedZones") {
      setDriverDropDownList({
        main_zone_code: [...new Set(data?.data?.map((item) => item.main_zone_code))].map(
          (id) => ({ main_zone_code: id })
        ),
        zone_name: [...new Set(data?.data?.map((item) => item.zone_name))].map(
          (zone_name) => ({ zone_name: zone_name })
        ),
        blocked_at: [...new Set(data?.data?.map((item) => item.blocked_at))].map(
          (blocked_at) => ({ blocked_at: blocked_at })
        ),
        blocked_by: [...new Set(data?.data?.map((item) => item?.blocked_by?.user_name))].map(
          (blocked_by) => ({ blocked_by: blocked_by })
        ),
      })
    }
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };
  return (
    <>
      <InnerLayout
        navigateEnable={false}
        buttons={buttonList}
        mainHeading={type ? insertSpaces(type) : "--"}
        backBtnClassName="ms-4"
      >
        <CreateMap
          id={editId}
          mapData={mapData}
          show={showMap}
          action={actionType}
          closeModal={() => {
            setShowMap(false);
            setActionType("");
          }}
        />
        {showFilter ? (
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
        )}
        <div className="row">
          <div className="col-md-12 table_container text-nowrap">
            {loading && <LoadingSpinnerTable />}
            <table className="table">
              <thead>
                <tr className="primary_bg ">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>
                  {tableHeading
                    ?.filter((item) => item?.display === true)
                    .map((item, index) => {
                      const isActiveSortIndex = activeSortIndex === index;
                      return (
                        <SearchInputfield
                          title={item?.title}
                          requestSort={requestSort}
                          sortName={item?.value}
                          key={item?.title}
                          index={index}
                          isActiveSortIndex={isActiveSortIndex}
                          setActiveSortIndex={setActiveSortIndex}
                          sortConfig={sortConfig}
                          colorName={"white_color"}
                          filter_icon={"white_color"}
                        />
                      );
                    })}

                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>

              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={zonesList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {items?.map((item) => (
                    <tr
                      key={item?.id}
                      className={
                        item?.id === checkList ? "light_blue_bg" : null
                      }
                    >
                      <th scope="row">
                        <input
                          id={item.id}
                          type="checkbox"
                          className="manage_fare_checkbox ms-2"
                          checked={checkList === item?.id}
                          onChange={checkboxChecker}
                        />
                      </th>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {/* {item?.main_zone_code ? item?.main_zone_code : "--"} */}
                          {type === "ManageZones" || type === "ArchivedZones"
                            ? item?.main_zone_code
                              ? item?.main_zone_code
                              : "--"
                            : item?.blocked_zone_code
                              ? item?.blocked_zone_code
                              : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.zone_name ? item?.zone_name : "--"}
                        </span>
                      </td>
                      {type === "ManageZones" ? (
                        <>
                          <td>
                            <span
                              className={`${item?.zone_status === "Inactive"
                                ? "red_color"
                                : "green_color"
                                } fs_14 fw_500`}
                            >
                              {item?.zone_status ? item?.zone_status : "--"}
                            </span>
                          </td>

                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.updated_on)}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.updatedBy?.user_name
                                ? item?.updatedBy?.user_name
                                : "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {type === "ManageZones" || type === "ArchivedZones" ? (
                        <>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.created_on)}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.createdBy?.user_name
                                ? item?.createdBy?.user_name
                                : "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {type === "BlockedZones" ? (
                        <>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.blocked_at)}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.blockedBy?.user_name
                                ? item?.blockedBy?.user_name
                                : "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      {type === "ArchivedZones" ? (
                        <>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {formatDateTime(item?.archived_on)}
                            </span>
                          </td>
                          <td>
                            <span className="secondary_color fs_14 fw_500">
                              {item?.archivedBy?.user_name
                                ? item?.archivedBy?.user_name
                                : "--"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <></>
                      )}
                      <td className="">
                        <NavLink
                          className="border_none border_radius fs_13  py-1 me-3 fw_500 px-3 
                           white_color blue_color_bg text-decoration-none view_text"
                          to={`view/${item?.id}`}
                          state={{
                            zoneID: item?.main_zone_code,
                            zoneName: item?.zone_name,
                            updatedOn: item?.updated_on,
                            createdBy: item?.createdBy?.user_name,
                            updatedBy: item?.updatedBy?.user_name,
                            zoneStatus: item?.zone_status,
                            edit: false,
                          }}
                        >
                          View
                        </NavLink>
                        {
                          canWrite(permission) === false ? (
                            <></>
                          ) : (
                            <NavLink
                              className="border_none primary_bg text-decoration-none white_color px-4 border_radius  py-1 fs_14 fw_500  view_text"
                              to={`edit/${item?.id}`}
                              state={{
                                zoneID: item?.main_zone_code,
                                zoneName: item?.zone_name,
                                updatedOn: item?.updated_on,
                                createdBy: item?.createdBy?.user_name,
                                updatedBy: item?.updatedBy?.user_name,
                                zoneStatus: item?.zone_status,
                                edit: true,
                              }}
                            >
                              Edit
                            </NavLink>
                          )}
                      </td>
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>
          </div>
        </div>
      </InnerLayout>
    </>
  );
};

export default ManageZoneMainTable;
