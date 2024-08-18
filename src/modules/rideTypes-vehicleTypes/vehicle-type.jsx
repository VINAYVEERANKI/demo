import React, { useEffect, useState } from "react";
import VehicleTypeModal from "../../components/rideType-vehicleType/vehicleType/vehicleTypeModal";
import Editbtn from "../../components/utilits/buttons/editbtn";
import Viewbtn from "../../components/utilits/buttons/viewbtn";
import SearchInputfield from "../../components/form/searchInputfield";
import { useDispatch } from "react-redux";
import {
  vehicleListAction,
  vehicleTypeDropdownListAction,
} from "../../redux/actions/vehicleTypeAction";
import errorToast from "../../components/utilits/errorToast";
import { removeUnderScore, useSortableData } from "../../components/helper";
import moment from "moment";
import LoadAndError from "../../components/utilits/loadAndError";
import TablePaginations from "../../components/utilits/pagination";
import VehicleTypeFilter from "./VehicleTypeFilter";
import usePermissions from "../../components/usePermissionChecker";

const VehicleType = () => {
  const { canRead, canWrite } = usePermissions();

  console.log(canRead("vehicle_types"));

  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  const [vehicleTypeView, setVehicleTypeView] = useState({});
  const [action, setAction] = useState("");
  const [vehicleTypeTable, setVehicleTypeTable] = useState(false);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [vehicleTypeObject, setVehicleTypeObject] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [vehicleTypeID, setVehicleTypeID] = useState("");
  const [detailsVehicleType, setDetailsVehicleType] = useState(false);
  const [vehicleTypeDropdwn, setVehicleTypeDropdwn] = useState({});

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
      vehicleListAction(
        {
          search: {
            vehicle_type_id2: search?.vehicle_type_id2 ?? "",
            vehicle_make: search?.vehicle_make ?? "",
            vehicle_model: search?.vehicle_model ?? "",
            ride_type: search?.ride_type ?? "",
            updated_at: search?.updated_at ?? "",
            updated_by: search?.updated_by ?? "",
            vehicle_color: search?.vehicle_color ?? "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, vehicleTypeTable]);

  const onSuccess = (data) => {
    setVehicleTypeList(data?.data?.data);
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
      vehicleTypeDropdownListAction(onDropDownListSuccess, onDropDownListError)
    );
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    console.log(data?.data);
    setVehicleTypeDropdwn({
      vehicle_type_id2: [
        ...new Set(
          data?.data
            ?.map((item) => item?.vehicle_type_id2)
            ?.filter((vehicle_type_id2) => Boolean(vehicle_type_id2))
        ),
      ].map((vehicle_type_id2) => ({ vehicle_type_id2: vehicle_type_id2 })),
      vehicle_make: [
        ...new Set(data?.data?.map((item) => item?.vehicle_make)),
      ].map((vehicle_make) => ({ vehicle_make: vehicle_make })),
      vehicle_model: [
        ...new Set(data?.data?.map((item) => item?.vehicle_model)),
      ].map((vehicle_model) => ({ vehicle_model: vehicle_model })),
      ride_type: [
        ...new Set(data?.data?.map((item) => item?.ride_type?.ride_type)),
      ].map((ride_type) => ({ ride_type: ride_type })),
      updated_at: [...new Set(data?.data?.map((item) => item?.updated_at))].map(
        (updated_at) => ({
          updated_at: updated_at,
        })
      ),
      updated_by: [
        ...new Set(data?.data?.map((item) => item?.UpdatedBy?.user_name)),
      ].map((updated_by) => ({ updated_by: updated_by })),
      vehicle_color: [
        ...new Set(data?.data?.map((item) => item?.vehicle_color)),
      ].map((vehicle_color) => ({
        vehicle_color: vehicle_color,
      })),
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
  console.log(vehicleTypeList);

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const { items, requestSort, sortConfig } = useSortableData(vehicleTypeList);
  const tableHeadingList = [
    { title: "Vehicle ID", value: "vehicle_type_id2" },
    { title: "Vehicle Make", value: "vehicle_make" },
    { title: "Vehicle Model", value: "vehicle_model" },
    { title: "Vehicle Colour", value: "vehicle_color" },
    { title: "Ride Type", value: "ride_type.ride_type" },
    { title: "Last updated at", value: "updated_at" },
    { title: "Last updated By", value: "UpdatedBy.user_name" },
  ];

  const [vehicleTypeModal, setVehicleTypeModal] = useState(false);
  const handlevehicleTypeModal = () => setVehicleTypeModal(true);
  const handleVehicleTypeClose = () => setVehicleTypeModal(false);

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

  return (
    <>
      <VehicleTypeModal
        vehicleTypeModal={vehicleTypeModal}
        handleVehicleTypeClose={handleVehicleTypeClose}
        vehicleTypeTable={vehicleTypeTable}
        setVehicleTypeTable={setVehicleTypeTable}
        setVehicleTypeView={setVehicleTypeView}
        vehicleTypeView={vehicleTypeView}
        vehicleTypeID={vehicleTypeID}
        type={action}
        setDetailsVehicleType={setDetailsVehicleType}
        detailsVehicleType={detailsVehicleType}
      />

      <>
        <div className="ride_type_source_container p-3 pb-4 mx-3 my-4">
          <div className="d-flex justify-content-between pt-3">
            <div>
              <span className="fs_26 primary_color fw_600">Vehicle Types</span>
            </div>
            <div className=" d-flex justify-content-center">
              <div>
                {canWrite("ride_types") && (
                  <button
                    className="tertiary_bg border_none border_radius_5px py-1 mt-1"
                    onClick={() => {
                      setAction("createVehicleType");
                      setVehicleTypeView({});
                      handlevehicleTypeModal();
                    }}
                  >
                    <span className="d-flex align-items-center fs_14 py-1  fw_500">
                      <i className="ri-add-line primary_color fs_14 fw_500"></i>
                      Add New Vehicle Type
                    </span>
                  </button>
                )}
              </div>
              <div className="pt-1">{buttonList}</div>
            </div>
          </div>
          {showFilter ? (
            <>
              <VehicleTypeFilter
                filter={handleSearch}
                search={search}
                handleFilterClose={handleFilterClose}
                vehicleTypeDropdwn={vehicleTypeDropdwn}
              />
            </>
          ) : (
            <></>
          )}

          <div className="mt-4 table_container">
            <table className="table text-nowrap ">
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
                  status={vehicleTypeList?.length === 0}
                >
                  {items.map((item) => (
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
                          {item?.vehicle_type_id2
                            ? item?.vehicle_type_id2
                            : "--"}
                        </span>
                      </td>

                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.vehicle_make
                            ? removeUnderScore(item?.vehicle_make)
                            : "--"}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.vehicle_model
                            ? removeUnderScore(
                                item?.vehicle_model?.vehicle_model
                              )
                            : "--"}
                        </span>
                      </td>

                      <td>
                        {" "}
                        <span className="secondary_color fs_14">
                          {item?.vehicle_color
                            ? removeUnderScore(
                                item?.vehicle_color?.vehicle_color
                              )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <div>
                          <img
                            src={item?.ride_type?.image}
                            height={30}
                            width={40}
                            className="border_radius_3px"
                          />
                          <span className="secondary_color fs_14 ps-2">
                            {item?.ride_type?.ride_type
                              ? item?.ride_type?.ride_type
                              : "--"}
                          </span>
                        </div>
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

                      <td className=" px-2">
                        <Viewbtn
                          viewfn={() => {
                            setAction("viewVehicleType");
                            setVehicleTypeID(item?.id);
                            handlevehicleTypeModal();
                            // handleVehicleTypeViewShow();
                            // setVehicleTypeObject(item);
                          }}
                        />
                        {canWrite("vehicle_types") === false ? (
                          <></>
                        ) : (
                          <Editbtn
                            editFn={() => {
                              // handleVehicleTypeEditShow();
                              // setVehicleTypeObject(item);
                              setAction("editVehicleType");
                              setVehicleTypeID(item?.id);
                              handlevehicleTypeModal();
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
          {vehicleTypeList?.length === 0 ? (
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
    </>
  );
};

export default VehicleType;
