import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../manage-zone-components.css";
import errorToast from "../../utilits/errorToast";
import { deletedIntraZoneListAction, deletintrazoneDrpdwnAction } from "../../../redux/actions/manageZones/deletedIntraZoneAction";
import ZonesPassword from "../manage-zone-modal/zonesPassword";
import DeletedIntraZoneTable from "../deletedIntraZoneTable";
import ManageZonesFilter from "../manage-zones-filter/manage-zones-filter";
import DeletedIntrazoneFilter from "../manage-zones-filter/deleted-intrazone-filter";

const DeletedIntraZones = ({ params, zoneID, zoneName, is_editable }) => {
  const dispatch = useDispatch();
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [deletedIntraZoneObject, setDeletedintraZoneObject] = useState({});
  const [deletedIntraTable, setDeletedIntraTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState("");
  const [driverDropDownList, setDriverDropDownList] = useState({});
  const [changeUpdatePasswordshow, setchangeUpdatePasswordshow] =
    useState(false);
  const handlChangesUpdateShow = () => {
    setchangeUpdatePasswordshow(true);
  };
  const handleChangeUpdatePasswordClose = () =>
    setchangeUpdatePasswordshow(false);
  const [tableData, setTableData] = useState([]);
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
      deletedIntraZoneListAction(
        {
          main_zone_id: params?.id,
          search: {
            city_id: search?.city_id,
            city_name:search?.city_name,
            deleted_at: search?.deleted_at,
            deleted_by: search?.deleted_by,
            category: search?.category,
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, deletedIntraTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setError(false);
    setTableData([
      ...data?.data?.data?.local_defined_cities,
      ...data?.data?.data?.outstation_defined_cities,
      ...data?.data?.data?.special_zones,
      ...data?.data?.data?.toll_zones,
    ]);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
  };
  const handleFilterClose = () => {
    setShowFilter(false);
  };
  const buttonList = [
    <>
       <button
         className="tertiary_bg border_radius_5px border_none px-3 py-1 d-flex align-items-center ms-3"
         type="button"
         onClick={() => {
  // setShowFilter(!showFilter);

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
 
  const handleFetchDropDownList = () => {
   dispatch(
    deletintrazoneDrpdwnAction(
      onDropDownListSuccess,
      onDropDownListError
    )
   )
 };
 const onDropDownListSuccess = (data) => {
  console.log(data);
  console.log(data?.data, "fasklada");
  setShowFilter(!showFilter);

  setDriverDropDownList({
    main_zone_id: [...new Set(data?.data?.toll_zones?.map((item) => item.toll_zone_code))].map(
      (id) => ({ main_zone_id: id })
    ),
    city_name: [...new Set(data?.data?.toll_zones?.map((item) => item.city_name))].map(
      (city_name) => ({ city_name: city_name })
    ),
    category: [...new Set(data?.data?.toll_zones?.map((item) => item.category))].map(
      (category) => ({ category: category })
    ),
    deleted_at: [...new Set(data?.data?.toll_zones?.map((item) => item.deleted_at))].map(
      (deleted_at) => ({ deleted_at: deleted_at })
    ),
    deleted_by: [...new Set(data?.data?.toll_zones?.map((item) => item?.DeletedBy?.user_name))].map(
      (deleted_by) => ({ deleted_by: deleted_by })
    ),
  })
 }


 const onDropDownListError = (data) => {
  console.log(data,'hhhh');
  console.log(data?.data);
};
  return (
    <>
      <DeletedIntraZoneTable
        loading={loading}
        error={error}
        is_editable={is_editable}
        setDeletedintraZoneObject={setDeletedintraZoneObject}
        handlChangesUpdateShow={handlChangesUpdateShow}
        setType={setType}
        tableList={tableData}
        numberOfFilters={numberOfFilters}
        handleSearch={handleSearch}
        search={search}
        driverDropDownList={driverDropDownList}
        type={type}
        buttonList={buttonList}
      />
      {/* <div className="deleted_intra_zone"> */}
        {showFilter ? (
          <DeletedIntrazoneFilter  
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
      {/* </div> */}
     

      <ZonesPassword
        changeUpdatePasswordshow={changeUpdatePasswordshow}
        handleChangeUpdatePasswordClose={handleChangeUpdatePasswordClose}
        type={type}
        params={params}
        zoneObject={deletedIntraZoneObject}
        reloadTable={deletedIntraTable}
        setReloadTable={setDeletedIntraTable}
        title={
          type === "RestoreDeletedZone"
            ? "Are you sure you want to Restore this zone/city?"
            : type === "DeleteIntraZonePermanently"
            ? "Are you sure you want to delete this zone/city permanently?"
            : ""
        }
        title_color={
          type === "DeleteIntraZonePermanently" ? `red_color` : `primary_color`
        }
        zoneID={zoneID}
        zoneName={zoneName}
      />
    </>
  );
};

export default DeletedIntraZones;
