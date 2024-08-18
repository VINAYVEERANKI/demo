import React, { useEffect, useRef, useState } from "react";
import "./invoice.css";
import InvoiceDropdown from "./invoice-dropdown";
import SearchInputfield from "../form/searchInputfield";
import {
  insertSpaces,
  navigationFn,
  useSortableData,
} from "../helper";
import * as tripinvoiceActions from "../../redux/actions/invoiceAction";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import LoadAndError from "../utilits/loadAndError";
import { useDispatch } from "react-redux";
import errorToast from "../utilits/errorToast";
import moment from "moment";
import TablePaginations from "../utilits/pagination";
import InnerLayout from "../layout/innerLayout";
import { NavLink } from "react-router-dom";
import InvoiceFilter from "./invoiceFilter";
import useDisplayToggle from "../useDisplayToggle";

const TripInvoiceTable = () => {
  const [filterList, setFilterList] = useState([]);
  const [checkList, setCheckList] = useState();

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState({ value: "" });
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfFilters, setNumberOfFilters] = useState(0);

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(invoiceList);
  console.log(invoiceList, "ifslfalkf");

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
      tripinvoiceActions?.tripInvoiceListAction(
        {
          search: {
            id: "",
            driver_invoice_code: search?.driver_invoice_code ?? "",
            comride_invoice_code: search?.comride_invoice_code ?? "",
            booking_type: search?.booking_type ?? "",
            booking_id: search?.booking_id ?? "",
            driver_id: search?.driver_id ?? "",
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
    setInvoiceList(data?.data?.data);
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

  const handleCheckbox = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setFilterList((oldArray) => [...oldArray, name]);
    } else {
      setFilterList((oldArray) => oldArray.filter((item) => item !== name));
    }
  };

  const [downloadInvoiceShow, setDownloadInvoiceShow] = useState(null);
  const [invoiceDropDownList, setInvoiceDropDownList] = useState({});

  const [dataLoading, setDataLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const bookingType = [
    { booking_type: "LocalTrip" },
    { booking_type: "RentalTrip" },
    { booking_type: "OneWayOutstation" },
    { booking_type: "RoundTripOutstation" },
  ];

  const toggle = (index) => {
    if (downloadInvoiceShow === index) {
      setDownloadInvoiceShow(null);
    } else {
      setDownloadInvoiceShow(index);
    }
  };

  const handleDropDownClick = (values) => {
    setDataLoading(true);
    const invoiceIndex = invoiceList?.findIndex((item) => item.id === values);
    toggle(invoiceIndex);
    dispatch(
      tripinvoiceActions?.tripInvoiceAction(
        {
          invoice_id: values,
        },
        onFetchSuccess,
        onFetchError
      )
    );
  };

  const onFetchSuccess = (data) => {
    setDataLoading(false);
    setInvoiceData(data?.data);
  };

  const onFetchError = (data) => {
    setDataLoading(false);
    errorToast(data?.data?.data);
  };

  const handleFetchDropDownList = () => {
    dispatch(
      tripinvoiceActions.tripInvoicedropdownListAction(
        onDropDownListSuccess,
        onDropDownListError
      )
    );
  };

  const onDropDownListSuccess = (data) => {
    setShowFilter(!showFilter);
    setInvoiceDropDownList({
      booking_id: [
        ...new Set(data?.data?.map((item) => item?.booking?.booking_id_2)),
      ].map((booking_id) => ({
        booking_id: booking_id,
      })),

      driver_invoice_code: [
        ...new Set(data?.data?.map((item) => item.driver_invoice_code)),
      ].map((id) => ({ driver_invoice_code: id })),

      comride_invoice_code: [
        ...new Set(data?.data?.map((item) => item.comride_invoice_code)),
      ].map((comride_invoice_code) => ({
        comride_invoice_code: comride_invoice_code,
      })),
      booking_type: bookingType
        ?.map((item) => item?.booking_type)
        .map((booking_type) => ({ booking_type: booking_type })),
      driver_id: [
        ...new Set(data?.data?.map((item) => item?.booking?.driver_id2)),
      ].map((driver_id) => ({
        driver_id: driver_id,
      })),
    });
  };

  const onDropDownListError = (data) => {
    console.log(data?.data);
  };

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
    </>,
  ];

  const tableHeading = [
    { title: "Booking ID", value: "booking.booking_id_2" },
    { title: "Booked At", value: "createdAt" },
    { title: "Comride Invoice", value: "comride_invoice_code" },
    { title: "Driver Invoice", value: "driver_invoice_code" },
    { title: "Driver ID", value: "booking.driver_id2" },
    {
      title: "Booking Type",
      value: "booking.booking_type",
    },
    { title: "Final Fare(₹)", search: false },
    { title: "Total Taxable Fare(₹)", search: false },
    { title: "TDS(₹)", search: false },
    {
      title: "Total SGST(₹)",
      search: false,
    },
    {
      title: "Total CGST(₹)",
      search: false,
    },
    {
      title: "Total IGST(₹)",
      search: false,
    },
  ];

  return (
    <>
      <InnerLayout
        mainHeading="Trip Invoices"
        navigateEnable={false}
        backBtnClassName={"ms-4"}
        buttons={buttonList}
      >
        {showFilter ? (
          <InvoiceFilter
            filter={handleSearch}
            search={search}
            handleFilterClose={handleFilterClose}
            invoiceDropDownList={invoiceDropDownList}
          />
        ) : (
          <></>
        )}

        <div className="table_container">
          {loading && <LoadingSpinnerTable />}
          <table className="table text-nowrap">
            <thead>
              <tr className="pale_blue_bg text-nowrap">
                <th scope="col" className="ongoing_heading_first_list">
                  <input
                    type="checkbox"
                    className="manage_fare_checkbox_row ms-2 d-flex align-items-center"
                    id="mastercheck"
                  />
                </th>

                {tableHeading?.map((item, index) => {
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
                      search={item?.search}
                    />
                  );
                })}
                <th className="ongoing_heading_last_list"></th>
              </tr>
            </thead>
            <tbody className="light_blue_bg">
              <LoadAndError
                loader={loading}
                error={error}
                status={invoiceList?.length === 0}
              >
                {items?.map((item, index) => (
                  <tr
                    key={index}
                    className={item?.id === checkList ? "light_blue_bg" : null}
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
                      <NavLink
                        className=" secondary_color"
                        to={navigationFn(
                          item?.booking?.booking_classification,
                          item?.booking_id
                        )}
                        // target='_blank'
                      >
                        <span className="secondary_color  fs_14 fw_500">
                          {item?.booking?.booking_id_2
                            ? item?.booking?.booking_id_2
                            : "--"}
                        </span>
                      </NavLink>
                    </td>
                    <td>
                      <span className="secondary_color  fs_14 fw_500">
                        {item?.booking?.createdAt
                          ? moment(item?.booking?.createdAt).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color  fs_14 fw_500">
                        {item?.comride_invoice_code ?? "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color  fs_14 fw_500">
                        {item?.driver_invoice_code ?? "--"}
                      </span>
                    </td>

                    <td>
                      <span className="secondary_color  fs_14 fw_500">
                        {item?.booking?.driver_id2
                          ? item?.booking?.driver_id2
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className={"secondary_color  fs_14 fw_500"}>
                        {item?.booking?.booking_type
                          ? insertSpaces(item?.booking?.booking_type)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color  fs_14 fw_500 text-nowrap">
                        {item?.booking?.rider_billing?.final_fare !== null
                          ? parseFloat(
                              item?.booking?.rider_billing?.final_fare
                            ).toFixed(2)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color  fs_14 fw_500 text-nowrap">
                        {item?.booking?.rider_billing?.total_taxes !== null
                          ? parseFloat(
                              item?.booking?.rider_billing?.total_taxes
                            ).toFixed(2)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className={"secondary_color  fs_14 fw_500"}>
                        {item?.booking?.driver_billing?.tds !== null
                          ? parseFloat(
                              item?.booking?.driver_billing?.tds
                            ).toFixed(2)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color  fs_14 fw_500 text-nowrap">
                        {item?.booking?.rider_billing?.total_sgst !== null
                          ? parseFloat(
                              item?.booking?.rider_billing?.total_sgst
                            ).toFixed(2)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color  fs_14 fw_500 text-nowrap">
                        {item?.booking?.rider_billing?.total_cgst !== null
                          ? parseFloat(
                              item?.booking?.rider_billing?.total_cgst
                            ).toFixed(2)
                          : "--"}
                      </span>
                    </td>
                    <td>
                      <span className="secondary_color  fs_14 fw_500 text-nowrap">
                        {item?.booking?.rider_billing?.total_igst !== null
                          ? parseFloat(
                              item?.booking?.rider_billing?.total_igst
                            ).toFixed(2)
                          : "--"}
                      </span>
                    </td>

                    <td className="position-relative">
                      <button
                        className="border_none background_none p-1"
                        onClick={() => {
                          handleDropDownClick(item?.id);
                        }}
                      >
                        <i className="ri-more-2-fill fs_20   fw_700  cursor_pointer"></i>
                      </button>
                      <InvoiceDropdown
                        downloadInvoiceShow={downloadInvoiceShow}
                        index={index}
                        invoiceData={invoiceData}
                        dataLoading={dataLoading}
                      />
                    </td>
                  </tr>
                ))}
              </LoadAndError>
            </tbody>
          </table>
        </div>
        {invoiceList?.length === 0 ? (
          <></>
        ) : (
          <TablePaginations
            paginate={handlePagination}
            currentPage={page}
            pageData={pageData}
          />
        )}
      </InnerLayout>
    </>
  );
};

export default TripInvoiceTable;
