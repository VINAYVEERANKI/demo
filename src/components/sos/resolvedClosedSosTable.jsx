import React, { useEffect, useState } from "react";
import SOSResolvedClosedView from "./resloved-closed-sos/rider-view-modal";
import SearchInputfield from "../form/searchInputfield";
import {
  driverResColsedSOSAction,
  driverResolvedClosedSOSListAction,
} from "../../redux/actions/sos/resolvedAndClosedSosAction";
import { useDispatch } from "react-redux";
import errorToast from "../utilits/errorToast";
import InnerLayout from "../layout/innerLayout";
import moment from "moment";
import { NavLink, useLocation } from "react-router-dom";
import { driverNavigateFn, navigationFn, riderNavigateFn } from "../helper";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import LoadAndError from "../utilits/loadAndError";
import usePermissions from "../usePermissionChecker";
import TablePaginations from "../utilits/pagination";
import styles from "../../modules/manage-admins/manage-admins.module.css"

const ResolvedClosedSosTable = ({ type }) => {
  const { canRead, canWrite } = usePermissions();
  const pagePermissions = {
    resloveClosedSos: "resloved_closed_sos",
  };
  // const permission = pagePermissions[type];
  const location = useLocation();
  const [resolvedSOSView, setResolvedSOSView] = useState(false);
  const handleResolvedSOSViewClose = () => setResolvedSOSView(false);
  const handleResolvedSOSViewShow = () => setResolvedSOSView(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [sosList, setSosList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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

  const [sosData, setSosData] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      driverResolvedClosedSOSListAction(
        {
          search: {
            sos_id2: "",
            booking_id_2: "",
            driver_id2: "",
            driver_first_name: "",
            rider_id2: "",
            rider_first_name: "",
            generated_at: "",
            sos_created_at: "",
            closed_at: "",
            resolved_at: "",
            resolved_by: "",
            closed_by: "",
          },
        },
        page,
        onSuccess,
        onError
      )
    );
  }, [page, search]);

  const onSuccess = (data) => {
    setLoading(false);
    setSosList(data?.data?.data);
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
    setErrorMessage(data?.data?.data);
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

  function sosViewModalFn(item) {
    dispatch(
      driverResColsedSOSAction(
        {
          sos_id: item?.id,
        },
        onFetchSuccess,
        onFetchError
      )
    );
  }

  const onFetchSuccess = (data) => {
    handleResolvedSOSViewShow();
    setLoading(false);
    setSosData(data?.data);
    console.log(data);
  };

  const onFetchError = (data) => {
    setLoading(false);
    console.log(data);
  };

  const buttonList = [
    <button className="border_none white_color red_bg fs_16 border_radius_7px d-flex align-items-center fw_600 p-1">
      SOS Emergency
    </button>,
  ];

  console.log(sosList, "sdjkfhlk");

  return (
    <>
      <InnerLayout
        mainHeading="Resolved/Closed SOS"
        navigateEnable={false}
        backBtnClassName="ms-4"
        // buttons={buttonList}
      >
        <div className="row  mt-3">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table">
              <thead>
                <tr className="pale_blue_bg">
                  <th scope="col" className={`${styles.first_list} transparent_bg`}>
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>
                  <SearchInputfield title={"SOS ID"} />
                  <SearchInputfield title={"Booking ID"} />
                  <SearchInputfield title={"Rider ID"} />
                  <SearchInputfield title={"Rider First Name"} />
                  <SearchInputfield title={"Driver ID"} />
                  <SearchInputfield title={"Driver First Name"} />

                  <SearchInputfield title={"Received/ Generated At"} />
                  <SearchInputfield title={"Status"} />
                  <SearchInputfield title={"Resolved/ Closed at"} />

                  <SearchInputfield title={"Resolved/Closed by"} />

                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>

              <tbody className="light_blue_bg ">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={sosList?.length === 0}
                  errorMessage={errorMessage}
                >
                  {sosList?.map((item) => (
                    <tr key={item?.id} className={"light_blue_bg text-nowrap"}>
                      <th scope="row">
                        <input
                          id={item?.id}
                          type="checkbox"
                          className="manage_fare_checkbox ms-2"
                        />
                      </th>

                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.sos_id2 ?? "--"}
                        </span>
                      </td>

                      <td>
                        <NavLink
                          className=" secondary_color"
                          to={navigationFn(
                            item?.booking?.booking_classification,
                            item?.booking?.id
                          )}
                        >
                          <span className="secondary_color  fs_14 fw_500">
                            {item?.booking?.booking_id_2 ?? "--"}
                          </span>
                        </NavLink>
                      </td>
                      <td>
                        <NavLink
                          className=" secondary_color"
                          to={
                            item?.rider
                              ? riderNavigateFn(item?.rider, item?.rider?.id)
                              : location?.pathname
                          }
                        >
                          <span className="secondary_color  fs_14 fw_500">
                            {item?.rider?.rider_id2 ?? "--"}
                          </span>
                        </NavLink>
                        {/* <a className="secondary_color fs_14 fw_500">
                          {item?.rider?.rider_id2 ?? "--"}
                        </a> */}
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.rider?.first_name ?? "--"}
                        </span>
                      </td>
                      <td>
                          <NavLink
                            className=" secondary_color"
                            to={
                              item?.driver
                                ? driverNavigateFn(item?.driver, item?.driver?.id)
                                : location?.pathname
                            }
                          >
                          <span className="secondary_color  fs_14 fw_500">
                            {item?.driver?.driver_id2 ?? "--"}
                          </span>
                        </NavLink>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver?.first_name ?? "--"}
                        </span>
                      </td>

                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.generated_at
                            ? moment(item?.generated_at).format(
                                "DD-MM-YYYY,HH:mm"
                              )
                            : item?.sos_created_at
                            ? moment(item?.sos_created_at).format(
                                "DD-MM-YYYY,HH:mm"
                              )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={` ${
                            item?.sos_status === "Resolved"
                              ? "green_color"
                              : "secondary_color"
                          }  fs_14 fw_500`}
                        >
                          {item?.sos_status ?? "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.resolved_at
                            ? moment(item?.resolved_at).format(
                                "DD-MM-YYYY,HH:mm"
                              )
                            : item?.closed_at
                            ? moment(item?.closed_at).format("DD-MM-YYYY,HH:mm")
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.ReslovedBy?.user_name ??
                            item?.ClosedBy?.user_name ??
                            "--"}
                        </span>
                      </td>

                      <td className="">
                        <button
                          className="border_none border_radius fs_14 me-3 fw_500 px-3 
                            white_color blue_color_bg"
                          onClick={() => {
                            sosViewModalFn(item);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>

            <SOSResolvedClosedView
              resolvedSOSView={resolvedSOSView}
              handleResolvedSOSViewClose={handleResolvedSOSViewClose}
              sosData={sosData}
            />
          </div>
        </div>
        {sosList?.length === 0 ? (
          <></>
        ) : (
          <TablePaginations
            paginate={handlePagination}
            handleChange={handlePageChange}
            currentPage={page}
            pageData={pageData}
          />
        )}
      </InnerLayout>
    </>
  );
};

export default ResolvedClosedSosTable;
