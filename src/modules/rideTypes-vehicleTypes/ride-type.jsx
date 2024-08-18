import React, { useEffect, useState } from "react";
import RideTypeModal from "../../components/rideType-vehicleType/rideType/rideTypeModal";
import Editbtn from "../../components/utilits/buttons/editbtn";
import Viewbtn from "../../components/utilits/buttons/viewbtn";
import "../rideTypes-vehicleTypes/rideType-vehicleType.css";
import SearchInputfield from "../../components/form/searchInputfield";
import {
  rideTypeListAction,
  rideTypeDropdownListAction,
} from "../../redux/actions/rideTypeAction";
import errorToast from "../../components/utilits/errorToast";
import { useDispatch } from "react-redux";
import moment from "moment";
import TablePaginations from "../../components/utilits/pagination";
import LoadAndError from "../../components/utilits/loadAndError";
import { useSortableData } from "../../components/helper";
import RideTypeFilter from "./RideTypeFilter";
import usePermissions from "../../components/usePermissionChecker";

const RideType = () => {
  const { canRead, canWrite } = usePermissions();

  console.log(canRead("ride_types"));
  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }
  const [rideTypeView, setRideTypeView] = useState({});
  const [isCreating, setIsCreating] = useState(null);
  const [adminTable, setAdminTable] = useState(false);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [rideTypeList, setRideTypeList] = useState([]);
  const [rideTypeID, setRideTypeID] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [action, setAction] = useState("");

  const [rideTypeDropdwn, setRideTypeDropdwn] = useState({});

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
    setLoading(true);
    dispatch(
      rideTypeListAction(
        {
          search: {
            ridetype_id2: search?.ridetype_id2 ?? "",
            ride_type: search?.ride_type ?? "",
            created_by: search?.created_by ?? "",
            updated_by: search?.updated_by ?? "",
            comride_seating_capacity: search?.comride_seating_capacity ?? "",
            created_at: search?.created_at ?? "",
            updated_at: search?.updated_at ?? "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, adminTable]);

  const onSuccess = (data) => {
    
    setRideTypeList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const handleFetchDropDownList = () => {
    dispatch(
      rideTypeDropdownListAction(onDropDownListSuccess, onDropDownListError)
    );
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data?.data);
    setRideTypeDropdwn({
      ridetype_id2: [
        ...new Set(
          data?.data
            ?.map((item) => item?.ridetype_id2)
            ?.filter((ridetype_id2) => Boolean(ridetype_id2))
        ),
      ].map((ridetype_id2) => ({ ridetype_id2: ridetype_id2 })),
      ride_type: [...new Set(data?.data?.map((item) => item?.ride_type))].map(
        (ride_type) => ({ ride_type: ride_type })
      ),
      created_by: [
        ...new Set(data?.data?.map((item) => item?.created_by?.user_name)),
      ].map((created_by) => ({ created_by: created_by })),
      updated_by: [
        ...new Set(data?.data?.map((item) => item?.updated_by?.user_name)),
      ].map((updated_by) => ({ updated_by: updated_by })),
      comride_seating_capacity: [
        ...new Set(data?.data?.map((item) => item?.comride_seating_capacity)),
      ].map((comride_seating_capacity) => ({
        comride_seating_capacity: comride_seating_capacity,
      })),
      created_at: [...new Set(data?.data?.map((item) => item?.created_at))].map(
        (created_at) => ({ created_at: created_at })
      ),
      updated_at: [...new Set(data?.data?.map((item) => item?.updated_at))].map(
        (updated_at) => ({
          updated_at: updated_at,
        })
      ),
    });
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  const [detailsRideType, setDetailsRideType] = useState(false);
  const [rideTypeModal, setRideTypeModal] = useState(false);
  const handleRideTypeModalClose = () => {
    setRideTypeModal(false);
    setDetailsRideType(false);
  };
  const handleRideTypeModal = () => setRideTypeModal(true);

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(rideTypeList);

  const tableHeadingList = [
    { title: "ID", value: "ridetype_id2" },
    { title: "Ride Type", value: "ride_type" },
    { title: "Seating Capacity", value: "comride_seating_capacity" },
    { title: "Created at", value: "created_at" },
    { title: "Created by", value: "CreatedBy.user_name" },
    { title: "Last updated at", value: "updated_at" },
    { title: "Last updated By", value: "UpdatedBy.user_name" },
  ];

  const buttonList = [
    <>
      <button
        className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
        type="button"
        onClick={() => {
          handleFetchDropDownList();
        }}
      >
        <i className="ri-filter-3-line primary_color pe-2" />
        <span className={`fs_14 fw_600 primary_color py-1 ps-1`}>
          Add Filter
        </span>
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
    </>,
  ];

  console.log(action, "xvsdv");

  return (
    <div>
      <RideTypeModal
        isCreating={isCreating}
        rideTypeModal={rideTypeModal}
        handleRideTypeModalClose={handleRideTypeModalClose}
        adminTable={adminTable}
        setAdminTable={setAdminTable}
        type={action}
        rideTypeID={rideTypeID}
        rideTypeView={action === "CreateRideType" ? {} : rideTypeView}
        setRideTypeView={setRideTypeView}
        setDetailsRideType={setDetailsRideType}
        detailsRideType={detailsRideType}
      />

      <>
        <div className="ride_type_source_container p-3 pb-4 mx-3 my-4">
          <div className="d-flex justify-content-between pt-3">
            <div>
              <span className="fs_26 primary_color fw_600">Ride Types</span>
            </div>
            <div className=" d-flex justify-content-center">
              <div>
                {
                  canWrite("ride_types") && (
                    <button
                      type="button"
                      className="tertiary_bg border_none border_radius_5px py-1 mt-1"
                      onClick={() => {
                        setIsCreating(true);
                        setAction("CreateRideType");
                        setRideTypeView({});
                        handleRideTypeModal();
                      }}
                    >
                      <span className="d-flex align-items-center fs_14 py-1  fw_600">
                        <i className="ri-add-line primary_color fs_14 fw_600"></i>
                        Add Ride Type
                      </span>
                    </button>
                  )}
              </div>
              <div className="pt-1">{buttonList}</div>
            </div>
          </div>
          {showFilter ? (
            <>
              <RideTypeFilter
                filter={handleSearch}
                search={search}
                handleFilterClose={handleFilterClose}
                rideTypeDropdwn={rideTypeDropdwn}
              />
            </>
          ) : (
            <></>
          )}

          <div className="mt-4 table_container">
            <table className="table text-nowrap">
              <thead>
                <tr className="pale_blue_bg ">
                  <th scope="col" className="ongoing_heading_first_list">
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                      id="mastercheck"
                    />
                  </th>

                  {tableHeadingList?.map((item, index) => {
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
                      />
                    );
                  })}
                  <th className="ongoing_heading_last_list"></th>
                </tr>
              </thead>
              <tbody className="light_blue_bg ">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={rideTypeList?.length === 0}
                >
                  {items?.map((item) => (
                    <tr key={item.ID} className={"light_blue_bg"}>
                      <th scope="row">
                        <input
                          id={item.ID}
                          type="checkbox"
                          className="manage_fare_checkbox ms-2 "
                        />
                      </th>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.ridetype_id2 ? item?.ridetype_id2 : "--"}
                        </span>
                      </td>

                      <td>
                        <div>
                          <img
                            src={item?.image}
                            height={30}
                            width={40}
                            className="border_radius_3px"
                          />

                          <span className="secondary_color fs_14 ps-2">
                            {item?.ride_type ? item?.ride_type : "--"}
                          </span>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.comride_seating_capacity
                            ? item?.comride_seating_capacity
                            : "--"}
                        </span>
                      </td>

                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.created_at
                            ? moment(item?.created_at).format(
                              "MM-DD-YYYY HH:mm"
                            )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className={"secondary_color fs_14"}>
                          {item?.CreatedBy?.user_name ?? "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14 text-nowrap">
                          {item?.updated_at
                            ? moment(item?.updated_at).format(
                              "MM-DD-YYYY HH:mm"
                            )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14 text-nowrap">
                          {item?.UpdatedBy?.user_name ?? "--"}
                        </span>
                      </td>

                      <td className="">
                        <Viewbtn
                          viewfn={() => {
                            setIsCreating(false);
                            setAction("viewRideType");
                            handleRideTypeModal();
                            setRideTypeID(item?.id);
                          }}
                        />
                        {
                          canWrite("ride_types") === false ? (
                            <></>
                          ) : (
                            <Editbtn
                              editFn={() => {
                                setIsCreating(false);
                                setAction("editRideType");
                                handleRideTypeModal();
                                setRideTypeID(item?.id);
                              }}
                            />
                          )}
                      </td>
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>
          </div>
          {rideTypeList?.length === 0 ? (
            <></>
          ) : (
            <TablePaginations
              paginate={handlePagination}
              currentPage={page}
              pageData={pageData}
            />
          )}
        </div>
      </>
    </div>
  );
};

export default RideType;
