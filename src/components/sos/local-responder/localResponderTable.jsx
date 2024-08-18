import React, { useEffect, useState } from "react";
import SearchInputfield from "../../form/searchInputfield";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import { useDispatch } from "react-redux";
import { localResponderListAction } from "../../../redux/actions/sos/localResponderSosAction";
import { useSortableData } from "../../helper";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import moment from "moment";
import LocalResponderModal from "./localResponderModal";
import usePermissions from "../../usePermissionChecker";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const LocalResponderTable = () => {
  const { canRead, canWrite } = usePermissions();

  console.log(canRead("local_responder"));

  const [action, setAction] = useState("");
  const [actionType, setActionType] = useState("");
  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  const [localResponderObject, setlocalResponderObject] = useState({});

  const [localResponder, setlocalResponder] = useState(false);
  const handleLocalResponderClose = () => setlocalResponder(false);
  const handleLocalResponderShow = () => setlocalResponder(true);

  const [responderTable, setResponderTable] = useState(false);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [responderList, setResponderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
      localResponderListAction(
        {
          search: {
            responder_id2: "",
            agency: "",
            zone_name: "",
            responder_first_name: "",
            responder_last_name: "",
            created_at: "",
            created_by: "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search, responderTable]);

  const onSuccess = (data) => {
    setLoading(false);
    setResponderList(data?.data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(true);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  function handlePagination(type) {
    if (type === "+") {
      if (page + 1 < pageData.noOfPages) setPage((prev) => prev + 1);
    } else if (type === "-") if (page > 0) setPage((prev) => prev - 1);
  }
  const handlePageChange = (event) => {
    setPage(Number(event.target.value) - 1);
    setCurrentPage(page);
  };

  const { items, requestSort, sortConfig } = useSortableData(responderList);

  return (
    <>
      <div className="rider_complaints_container  p-3 pb-4 mx-3 my-4">
        <div className="mx-3 d-sm-flex justify-content-sm-between mt-3 align-items-center">
          <span className="primary_color fs_26 fw_600 ">Local Responders</span>
          {canWrite("local_responder") && (
            <button
              className="mt-2 d-flex align-items-center tertiary_bg border_none border_radius_5px primary_color p-2 fw_600"
              type="button"
              onClick={() => {
                handleLocalResponderShow();
                setAction("create");
                setlocalResponderObject({});
              }}
            >
              <i className="ri-add-line pe-2" />
              Add Local Responder
            </button>
          )}
        </div>

        <div className="mt-3">
          <div className="row">
            <div className="col-md-12 table_container">
              {loading && <LoadingSpinnerTable />}
              <table className="table">
                <thead>
                  <tr className="orange_bg">
                    <th scope="col" className={`${styles.first_list} transparent_bg`}>
                      <input
                        type="checkbox"
                        className="manage_fare_checkbox_row ms-2"
                        id="mastercheck"
                      />
                    </th>
                    <SearchInputfield
                      title={"Responder ID"}
                      colorName="white_color"
                      filter_icon="white_color"
                    />
                    <SearchInputfield
                      title={"Agency"}
                      colorName="white_color"
                      filter_icon="white_color"
                    />
                    <SearchInputfield
                      title={"Zone"}
                      colorName="white_color"
                      filter_icon="white_color"
                    />
                    <SearchInputfield
                      title={"Responder First Name"}
                      colorName="white_color"
                      filter_icon="white_color"
                    />
                    <SearchInputfield
                      title={"Responder Last Name"}
                      colorName="white_color"
                      filter_icon="white_color"
                    />
                    <SearchInputfield
                      title={"Responder Phone Number"}
                      colorName="white_color"
                      filter_icon="white_color"
                    />
                    <SearchInputfield
                      title={"Created At"}
                      colorName="white_color"
                      filter_icon="white_color"
                    />
                    <SearchInputfield
                      title={"Created By"}
                      colorName="white_color"
                      filter_icon="white_color"
                    />
                    <th className={`${styles.last_list} transparent_bg`}></th>
                  </tr>
                </thead>
                <tbody className="white_bg text-nowrap">
                  <LoadAndError
                    loader={loading}
                    error={error}
                    status={responderList?.length === 0}
                  >
                    {responderList?.map((item) => (
                      <tr
                        key={item?.id}
                        className={
                          item?.id === checkList ? "grey_color_bg" : null
                        }
                      >
                        <th scope="row">
                          <input
                            id={item?.id}
                            type="checkbox"
                            checked={checkList === item?.id}
                            className="manage_fare_checkbox ms-2"
                            onChange={checkboxChecker}
                          />
                        </th>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.responder_code ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.agency ?? "--"}
                          </span>
                        </td>

                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.ZoneName?.zone_name ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.responder_first_name ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.responder_last_name ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.responder_phone_number ?? "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.created_at
                              ? moment(item?.created_at).format(
                                "DD-MM-YYYY, HH:mm"
                              )
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.createdBy?.user_name ?? "--"}
                          </span>
                        </td>

                        <td className="">
                          <button
                            className="border_none border_radius fs_14 me-3 fw_500 px-3 white_color blue_color_bg"
                            type="button"
                            onClick={() => {
                              handleLocalResponderShow();
                              setlocalResponderObject(item);
                              setAction("view");
                            }}
                          >
                            View
                          </button>
                          {
                            canWrite("local_responder") === false ? (
                              <></>
                            ) : (
                              <button
                                className="primary_bg white_color border_none border_radius boder_radius fs_14 me-3 fw_500 px-3"
                                type="button"
                                onClick={() => {
                                  handleLocalResponderShow();
                                  setlocalResponderObject(item);
                                  setAction("edit");
                                  setActionType(null);
                                }}
                              >
                                Edit
                              </button>
                            )}









                        </td>
                      </tr>
                    ))}
                  </LoadAndError>
                </tbody>
              </table>

              <LocalResponderModal
                localResponder={localResponder}
                handleLocalResponderClose={handleLocalResponderClose}
                localResponderObject={localResponderObject}
                action={action}
                responderTable={responderTable}
                setResponderTable={setResponderTable}
                actionType={actionType}
                setActionType={setActionType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalResponderTable;
