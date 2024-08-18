import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import driverImage from "../../../assets/images/profileimage.png";
import CancellationDetails from "./modals/cancellation-details";
import "../../../components/manage-bookings/manage-bookingsComponents.css";
import "../../../modules/manage-bookings/manageBookings.css";
import AccidentReportModal from "./modals/accident-report-modal";
import DriverRequestedCancelModal from "./modals/driver-requested-cancel-modal";
import RiderRequestedCancelModal from "./modals/rider-requested-cancel-modal";
import EndTripModal from "./modals/end-trip-modal";
import TripDetails from "./trip-information/trip-details";
import { tripInvoiceAction } from "../../../redux/actions/invoiceAction";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import { BlobProvider } from "@react-pdf/renderer";
import RiderInvoicePdf from "../../invoices/rider-invoice/rider-invoice-pdf";
import DetailedInvoicePdf from "../../invoices/detailed-invoice/detailed-invoice-pdf";
import useDisplayToggle from "../../useDisplayToggle";
import { driverNavigateFn, riderNavigateFn } from "../../helper";
import { manageDriverVehicleTypeListAction } from "../../../redux/actions/manageDriversAction";
import DownloadIcon from "../../../assets/icons/download-icon";
import ArrowDownIcon from "../../../assets/icons/arrowDownIcon";
import MoreIcon from "../../../assets/icons/more-icon";

const TripInformation = ({
  bookingData,
  bookingTable,
  setBookingTable,
  type = "",
}) => {
  const dispatch = useDispatch();

  const [downloadInvoiceShow, setDownloadInvoiceShow] = useState(false);

  const [cancellationDetailsShow, setcancellationDetailsShow] = useState(false);
  const handleCancellationDetailsClose = () =>
    setcancellationDetailsShow(false);
  const handleCancellationDetailsShow = () => setcancellationDetailsShow(true);

  const [disableBtn, setDisableBtn] = useState({
    afterOtp: false,
    beforeOtp: false,
  });
  useEffect(() => {
    if (bookingData?.tripInformation?.StartOtp === false) {
      setDisableBtn({
        afterOtp: true,
        beforeOtp: false,
      });
    } else if (bookingData?.tripInformation?.StartOtp === true) {
      setDisableBtn({
        afterOtp: false,
        beforeOtp: true,
      });
    }
  }, [bookingData?.tripInformation?.StartOtp]);

  const [cancelRequest, setCancelRequest] = useState("");

  const [riderRequestedCancelShow, setRiderRequestedCancelShow] =
    useState(false);
  const handleRiderRequestedCancelClose = () =>
    setRiderRequestedCancelShow(false);
  const handleRiderRequestedCancelShow = () =>
    setRiderRequestedCancelShow(true);

  const [accidentReportShow, setAccidentReportShow] = useState(false);
  const handleAccidentReportShow = () => setAccidentReportShow(true);
  const handleAccidentReportClose = () => setAccidentReportShow(false);

  const [driverRequestedCancelShow, setDriverRequestedCancelShow] =
    useState(false);
  const handleDriverRequestedCancelClose = () =>
    setDriverRequestedCancelShow(false);
  const handleDriverRequestedCancelShow = () =>
    setDriverRequestedCancelShow(true);

  const [endTripModalShow, setEndTripModalShow] = useState(false);
  const handleEndTripModalClose = () => setEndTripModalShow(false);
  const handleEndTripModalShow = () => setEndTripModalShow(true);

  const [ongoingBookingOptionShow, setOngoingBookingOptionShow] =
    useState(false);
  const CharacterHidder = (value, type = "mobile") => {
    if (type === "email") {
      let sliced = value.split("@");
      return sliced[0].substring(0, 2) + "****" + "@" + sliced[1];
    } else {
      return value.substring(0, 2) + "*******" + value.substring(7, 9);
    }
  };

  const [vehicleTypeLoading, setVehicleTypeLoading] = useState(false);
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  const riderData = bookingData?.tripInformation?.rider;

  const riderDetails = [
    {
      label: "Rider ID",
      value: riderData?.rider_id2 ? riderData?.rider_id2 : "--",
      navigation: true,
      link: riderNavigateFn(riderData, riderData?.id),
    },
    {
      label: "First Name",
      value: riderData?.first_name ? riderData?.first_name : "--",
      navigation: false,
    },
    {
      label: "Rider Email ID",
      value: riderData?.email
        ? CharacterHidder(riderData?.email, "email")
        : "--",
      navigation: false,
    },
    {
      label: "Rider Phone Number",
      value: riderData?.phone_number
        ? "+91" + CharacterHidder(riderData?.phone_number)
        : "--",
      navigation: false,
    },
  ];

  const driverData = bookingData?.tripInformation?.driver;

  const driverDetails = [
    {
      label: "Driver ID",
      value: driverData?.driver_id2 ? driverData?.driver_id2 : "--",
      navigation: true,
      link: driverNavigateFn(driverData, driverData?.id),
    },
    {
      label: "Driver First Name",
      value: driverData?.first_name ? driverData?.first_name : "--",
      navigation: false,
    },
    {
      label: "Driver Email ID",
      value: driverData?.email ? driverData?.email : "--",
      navigation: false,
    },
    {
      label: "Driver Phone Number",
      value: driverData?.phone_number ? "+91" + driverData?.phone_number : "--",
      navigation: false,
    },
  ];

  const vehicleData = bookingData?.tripInformation?.driver?.vehicle_details;

  useEffect(() => {
    setVehicleTypeLoading(true);
    if (driverData?.id)
      dispatch(
        manageDriverVehicleTypeListAction(driverData?.id, onSuccess, onError)
      );
  }, []);

  const onSuccess = (data) => {
    setVehicleTypeLoading(false);
    const vehicleMake = data?.data?.vehicleMake?.find(
      (item) => item?.id === vehicleData?.vehicle_make
    )?.vehicle_make;
    setVehicleMake(vehicleMake);

    const vehicleModel = data?.data?.vehicleModel?.find(
      (item) => item?.id === vehicleData?.vehicle_model
    )?.vehicle_model;
    setVehicleModel(vehicleModel);
  };
  const onError = (data) => {
    setVehicleTypeLoading(false);
  };
  const vehicleDetails = [
    {
      label: " Vehicle ID",
      value: bookingData?.tripInformation?.vehicle_type?.vehicle_type_id2
        ? bookingData?.tripInformation?.vehicle_type?.vehicle_type_id2
        : "--",
      navigation: true,
    },
    {
      label: "Vehicle Number",
      value: vehicleData?.vehicle_registration_number
        ? vehicleData?.vehicle_registration_number
        : "--",
      navigation: false,
    },
    {
      label: "Vehicle Make",
      value: vehicleMake ?? "--",
      navigation: false,
    },
    {
      label: "Vehicle Model",
      value: vehicleModel ?? "--",
      navigation: false,
    },
  ];
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  function downloadInvoiceBtn() {
    if (downloadInvoiceShow === true) {
      setDownloadInvoiceShow(false);
    }
    setInvoiceLoading(true);
    if (bookingData?.tripInformation?.invoice?.id)
      dispatch(
        tripInvoiceAction(
          {
            invoice_id: bookingData?.tripInformation?.invoice?.id,
          },
          onFetchSuccess,
          onFetchError
        )
      );
  }

  const onFetchSuccess = (data) => {
    if (downloadInvoiceShow === false) {
      setDownloadInvoiceShow(true);
    }
    setInvoiceData(data?.data);
    setInvoiceLoading(false);
  };

  const onFetchError = (data) => {
    setInvoiceLoading(false);
    // errorToast(data?.data?.data);
    errorToast("something went wrong in invoice");
  };
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setOngoingBookingOptionShow,
  });
  return (
    <>
      <CancellationDetails
        cancellationDetailsShow={cancellationDetailsShow}
        handleCancellationDetailsClose={handleCancellationDetailsClose}
        cancelledBookingData={bookingData}
      />

      <AccidentReportModal
        accidentReportShow={accidentReportShow}
        handleAccidentReportClose={handleAccidentReportClose}
        ongoingBookingData={bookingData}
        ongoingTable={bookingTable}
        setOngoingTable={setBookingTable}
      />

      <DriverRequestedCancelModal
        driverRequestedCancelShow={driverRequestedCancelShow}
        handleDriverRequestedCancelClose={handleDriverRequestedCancelClose}
        ongoingBookingData={bookingData}
        ongoingTable={bookingTable}
        setOngoingTable={setBookingTable}
        cancelRequest={cancelRequest}
      />
      <RiderRequestedCancelModal
        riderRequestedCancelShow={riderRequestedCancelShow}
        handleRiderRequestedCancelClose={handleRiderRequestedCancelClose}
        ongoingBookingData={bookingData}
        ongoingTable={bookingTable}
        setOngoingTable={setBookingTable}
      />

      <EndTripModal
        endTripModalShow={endTripModalShow}
        handleEndTripModalClose={handleEndTripModalClose}
        ongoingBookingData={bookingData}
        ongoingTable={bookingTable}
        setOngoingTable={setBookingTable}
      />

      <div className="mt-5 ms-sm-4 ms-2">
        <div className="row g-0">
          <div className="col-lg-8 col-12">
            <>
              <span className="fs_14 fw_600 primary_color heading_border_bottom">
                Rider details
              </span>
            </>
            {riderDetails?.map((user) => {
              return (
                <div className="d-flex" key={user?.label}>
                  <div className="col-4">
                    <span className="fs_14 fw_600 primary_color">
                      {user?.label}
                    </span>
                  </div>
                  <div className="col-8">
                    {user?.navigation === true ? (
                      <NavLink
                        className="fs_14 fw_600 primary_color"
                        // to={`/rider-history/${bookingData?.tripInformation?.rider_id}`}
                        to={user?.link}
                      >
                        {user?.value}
                      </NavLink>
                    ) : (
                      <span className="fs_14 fw_600 secondary_color ps-2">
                        {user?.value}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-8 mt-sm-4 py-2">
            <div className="d-flex align-items-center gap-2 me-5 ">
              <div className="position-relative">
                <span className="">
                  {downloadInvoiceShow ? (
                    <div className="ongoing_bookings_download_invoice  border_radius_10px ">
                      <ul className="menu_list px-3 mb-0 primary_color fs_14 fw_600 text-start">
                        <>
                          <li className=" cursor_pointer border-bottom mb-1 text-nowrap py-1">
                            <BlobProvider
                              document={
                                !invoiceLoading && invoiceData ? (
                                  <RiderInvoicePdf item={invoiceData} />
                                ) : (
                                  <div>Loading document...</div>
                                )
                              }
                            >
                              {({ url, loading }) => {
                                return loading ||
                                  invoiceLoading ||
                                  invoiceData == null ? (
                                  "loading document ..."
                                ) : (
                                  <a
                                    href={url}
                                    target="_blank"
                                    className={`background_none border_none primary_color fs_14 text-decoration-none fw_600 cursor_pointer`}
                                  >
                                    Rider Invoice
                                  </a>
                                );
                              }}
                            </BlobProvider>
                          </li>
                          <li className=" cursor_pointer  pb-1 mb-1 text-nowrap py-1">
                            <BlobProvider
                              document={
                                !invoiceLoading && invoiceData ? (
                                  <DetailedInvoicePdf item={invoiceData} />
                                ) : (
                                  <div>Loading document...</div>
                                )
                              }
                            >
                              {({ url, loading }) => {
                                return loading ||
                                  invoiceLoading ||
                                  invoiceData === null ? (
                                  "loading document ..."
                                ) : (
                                  <a
                                    href={url}
                                    target="_blank"
                                    className={`background_none border_none primary_color fs_14 text-decoration-none fw_600 cursor_pointer`}
                                  >
                                    Combined Invoice
                                  </a>
                                );
                              }}
                            </BlobProvider>
                          </li>
                        </>
                      </ul>
                    </div>
                  ) : null}
                </span>
              </div>

              <div className="input_border border_radius px-xxl-2 w_90">
                <div
                  className=" d-flex justify-content-between align-items-center px-2 cursor_pointer"
                  onClick={() => downloadInvoiceBtn()}
                >
                  <div>
                    <DownloadIcon fill="#687284" className={"me-2 mb-1"} />
                  </div>
                  <div className="secondary_color fs_14 fw_600 d-flex align-items-center text-nowrap download_invoice">
                    Download Invoice
                  </div>
                  <div>
                    <ArrowDownIcon
                      fill="#687284"
                      width={28}
                      height={24}
                      className={"pb-1"}
                    />
                  </div>
                </div>
              </div>

              <div className="position-relative">
                <span className="pe-2">
                  {ongoingBookingOptionShow ? (
                    <div ref={insideClickRef}>
                      {type === "Accident_Bookings" ||
                      type === "Completed_Bookings" ? (
                        <>
                          <div className="ongoing_bookings_menu_option px-1 border_radius_10px">
                            <ul className="menu_list p-1 pt-3 mb-0 primary_color fs_12 fw_600 ">
                              <li className="pb-1 cursor_pointer w-100">
                                <button
                                  className={`background_none border_none primary_color fs_14 fw_600  cursor_pointer`}
                                >
                                  details
                                </button>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : type === "Adjusted_Bookings" ? (
                        <></>
                      ) : type === "Cancelled_Bookings" ? (
                        <>
                          <div className="cancelled_bookings_menu_option px-1 border_radius_10px">
                            <ul className="menu_list p-3 mb-0 primary_color fs_12 fw_600 text-center">
                              <li className="pb-1 cursor_pointer">
                                <button
                                  className={`background_none border_none primary_color fs_12 fw_600 cursor_pointer`}
                                  onClick={() => {
                                    handleCancellationDetailsShow();
                                  }}
                                >
                                  View Cancellation Details
                                </button>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : type === "Ongoing_Bookings" ? (
                        <>
                          <div className="ongoing_bookings_menu_option px-1 border_radius_10px">
                            <ul className="menu_list p-2 pt-3 mb-0 primary_color fs_14 fw_600 text-nowrap">
                              <li className="pb-1 cursor_pointer">
                                <button
                                  className={`${
                                    disableBtn.beforeOtp
                                      ? "disabled_color"
                                      : "primary_color"
                                  } background_none border_none  fs_14 fw_600 cursor_pointer`}
                                  onClick={() => {
                                    setCancelRequest("driverRequest");
                                    handleDriverRequestedCancelShow();
                                  }}
                                  disabled={disableBtn.beforeOtp}
                                >
                                  Driver Requested Cancellation
                                </button>
                              </li>
                              <hr className="list_underline m-1" />
                              <li className="pt-1 cursor_pointer">
                                {" "}
                                <button
                                  className={`background_none border_none ${
                                    disableBtn.beforeOtp
                                      ? "disabled_color"
                                      : "primary_color"
                                  } fs_14 fw_600 cursor_pointer`}
                                  onClick={() => {
                                    setCancelRequest("riderRequest");
                                    handleRiderRequestedCancelShow();
                                  }}
                                  disabled={disableBtn.beforeOtp}
                                >
                                  Rider Requested Cancellation
                                </button>
                              </li>
                              <hr className="list_underline m-1" />
                              <li className="pt-1 ">
                                <button
                                  className={`background_none border_none  ${
                                    disableBtn.afterOtp
                                      ? "disabled_color"
                                      : "primary_color"
                                  } fs_14 fw_600 cursor_pointer`}
                                  type="button"
                                  onClick={() => {
                                    handleEndTripModalShow();
                                  }}
                                  disabled={disableBtn.afterOtp}
                                >
                                  End Trip
                                </button>
                              </li>
                              <hr className="list_underline m-1" />

                              <li className="pt-1 cursor_pointer">
                                <button
                                  className="background_none border_none primary_color fs_14 fw_600 cursor_pointer"
                                  type="button"
                                  onClick={() => {
                                    handleAccidentReportShow();
                                  }}
                                >
                                  Accident
                                </button>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : null}
                  <span
                    onClick={() => {
                      setOngoingBookingOptionShow(!ongoingBookingOptionShow);
                    }}
                    ref={onClickRef}
                  >
                    <MoreIcon
                      className={
                        "orange_yellow_bg p-1 cursor_pointer rounded-2"
                      }
                      height={27}
                      width={27}
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-xxl-flex">
          <div className="col-xxl-6 col-12">
            <div className="mt-3">
              <span className="fs_14 fw_600 primary_color heading_border_bottom">
                Driver Details
              </span>
            </div>
            <div className="row g-0">
              <div className="col-lg-2 col-12">
                <img
                  className="border_radius_10px mt-2"
                  src={
                    bookingData?.tripInformation?.driver?.profile_pic?.photo
                      ? bookingData?.tripInformation?.driver?.profile_pic?.photo
                      : driverImage
                  }
                  width={70}
                  height={70}
                  alt="icon"
                />
              </div>
              <div className="col-lg-10 col-12 py-1">
                {driverDetails?.map((user) => {
                  return (
                    <div className="row ms-sm-3 g-0" key={user?.label}>
                      <div className="col-6">
                        <span className="fs_14 fw_600 primary_color">
                          {user?.label}
                        </span>
                      </div>
                      <div className="col-6">
                        {user?.navigation ? (
                          <NavLink
                            className="fs_14 fw_600 primary_color"
                            to={user?.link}
                            state={{
                              id: bookingData?.tripInformation?.driver?.id,
                            }}
                          >
                            {user?.value}
                          </NavLink>
                        ) : (
                          <span className="fs_14 fw_600 secondary_color">
                            {user?.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-12">
            <div className="mt-3">
              <span className="fs_14 fw_600 primary_color heading_border_bottom">
                Vehicle Details
              </span>
            </div>

            <div className="row g-0">
              <div className="col-lg-2 col-12">
                <img
                  className="border_radius_10px mt-2"
                  src={
                    bookingData?.tripInformation?.driver?.vehicle_type?.image
                      ? bookingData?.tripInformation?.driver?.vehicle_type
                          ?.image
                      : driverImage
                  }
                  width={60}
                  height={60}
                />
              </div>
              <div className="col-lg-10 col-12 py-1">
                {vehicleDetails?.map((user) => {
                  return (
                    <div className="row ms-sm-2 g-0" key={user?.label}>
                      <div className="col-6">
                        <span className="fs_14 fw_600 primary_color">
                          {user?.label}
                        </span>
                      </div>
                      <div className="col-6">
                        {user?.navigation ? (
                          <a href="" className="fs_14 fw_600 primary_color">
                            {user?.value}
                          </a>
                        ) : (
                          <span className="fs_14 fw_600 secondary_color">
                            {user?.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <TripDetails bookingData={bookingData} />
      </div>
    </>
  );
};

export default TripInformation;
