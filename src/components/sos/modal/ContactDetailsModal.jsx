import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../../complaints/rider-complaints-components.css";
import { useSortableData } from "../../helper";
import SearchInputfield from "../../form/searchInputfield";
import errorToast from "../../utilits/errorToast";
import LoadAndError from "../../utilits/loadAndError";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import Select, { components } from "react-select";
import { localResponderListAction } from "../../../redux/actions/sos/localResponderSosAction";
import { useDispatch } from "react-redux";
import { couponMainZoneListAction } from "../../../redux/actions/riderCoupon/createCouponAction";
import {
  reactSelectDriverDetails,
} from "../../mui-styles/react-styles";
import DropDownIcon from "../../../assets/icons/dropdown-icon";

const ContactDetailsModal = ({
  contactSosModal,
  handleContactSosClose,
  responderDetails,
}) => {
  const dispatch = useDispatch();
  const options = [
    { value: "mumbai", label: "Mumbai" },
    { value: "bangalore", label: "Bangalore" },
    { value: "chennai", label: "Chennai" },
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const SosContactListTableHeading = [
    { title: "Responder ID", value: "responder_code" },
    { title: "Agency", value: "agency" },
    { title: "Responder Name", value: "responder_first_name" },
    { title: "Responder Phone Number", value: "responder_phone_number" },
  ];

  const Riderdetails = [
    { label: "Driver ID", value: responderDetails?.driver?.driver_id2 },
    { label: "Driver first name", value: responderDetails?.driver?.first_name },
    { label: "Driver last name", value: responderDetails?.driver?.last_name },
    {
      label: "Driver phone number",
      value: responderDetails?.driver?.phone_number,
    },
  ];

  const Driverdetails = [
    { label: "Rider ID", value: responderDetails?.rider?.rider_id2 },
    { label: "Rider first name", value: responderDetails?.rider?.first_name },
    { label: "Rider last name", value: responderDetails?.rider?.last_name },
    {
      label: "Rider phone number",
      value: responderDetails?.rider?.phone_number,
    },
  ];

  const [responderList, setResponderList] = useState([]);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [page, setPage] = useState(0);
  const [selectedZone, setSelectedZone] = useState([]);

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
  }, [page]);

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

  const [mainZonelist, setMainZonelist] = useState([]);
  useEffect(() => {
    dispatch(couponMainZoneListAction(onFetchSuccess, onFetchError));
  }, []);

  const onFetchSuccess = (data) => {
    const statusOption = data?.data?.map((item) => {
      return { label: item?.zone_name, value: item?.id };
    });
    setMainZonelist(statusOption);
  };

  const onFetchError = (data) => {
    console.log(data?.data);
  };

  const filteredList = selectedZone?.target?.name
    ? responderList?.filter(
        (item) => item?.ZoneName?.id === selectedZone?.target?.value
      )
    : responderList;

  const [activeSortIndex, setActiveSortIndex] = useState(null);

  const { items, requestSort, sortConfig } = useSortableData(filteredList);

  console.log(mainZonelist, "jhgjjk");

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };

  return (
    <Modal
      centered
      show={contactSosModal}
      onHide={handleContactSosClose}
      dialogClassName="sos_contact_details_container"
      contentClassName="border_radius_10px"
      backdropClassName="initiate_password_modal_backdrop"
      backdrop={"static"}
      keyboard={false}
    >
      <Modal.Body>
        <div className="px-2 pb-4">
          <div className="d-sm-flex justify-content-between align-items-center  mt-1 position-relative">
            <span className="fs_22 primary_color fw_600">
              {"Contact Details"}
            </span>

            <span className="d-flex align-items-sm-center justify-content-between gap-3">
              <span
                onClick={() => handleContactSosClose()}
                className="cursor_pointer"
              >
                <i className="ri-close-circle-fill primary_color fs_22" />
              </span>
            </span>
          </div>
          <div className="row g-0 mt-3">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <span className="details_heading fs_16 primary_color fw_500">
                Driver Details
              </span>
              <table className="fs_14 fw_500 mt-1">
                <tbody>
                  {Riderdetails?.map((item) => {
                    return (
                      <React.Fragment key={item?.label}>
                        <tr>
                          <td className={`secondary_color  pe-3 pt-1`}>
                            {item?.label}
                          </td>
                          <td>{item?.value ? item?.value : "--"}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <span className="details_heading primary_color fs_16 fw_500">
                Rider Details
              </span>
              <table className="fs_14 fw_500 mt-1">
                <tbody>
                  {Driverdetails?.map((item) => {
                    return (
                      <React.Fragment>
                        <tr>
                          <td className={`secondary_color  pe-3 pt-1`}>
                            {item?.label}
                          </td>
                          <td>{item?.value ? item?.value : "--"}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className=" d-flex gap-3 mt-4">
            <span className="fw_500 pt-1">Zone</span>
            <span>
              <Select
                className="zone_select"
                options={mainZonelist}
                styles={reactSelectDriverDetails}
                onChange={(selectedOption) => {
                  let event = {
                    target: {
                      name: selectedOption?.label,
                      value: selectedOption?.value,
                    },
                  };

                  setSelectedZone(event);
                }}
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
              />
            </span>
          </div>

          <div className="mt-4 local_responser_list position-relative">
            {loading && <LoadingSpinnerTable />}
            <table className="table">
              <thead className="table_heading">
                <tr className="orange_bg white_color">
                  {SosContactListTableHeading?.map((item, index) => {
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
                        colorName="white_color"
                        table_border_radius={index === 0 ? `first_list` : ""}
                        filter_icon="white_color"
                      />
                    );
                  })}
                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>

              <tbody className="light_blue_bg w-100">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={items?.length === 0}
                  errorMessage={"eww"}
                >
                  {items?.map((item, index) => (
                    <tr className={"local_responder_table_body text-nowrap"}>
                      <td>
                        <span className="secondary_color fs_14 fw_500 ps-2">
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
                          {item?.responder_first_name ? item?.responder_first_name + " " + item?.responder_last_name : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.responder_phone_number ?? "--"}
                        </span>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ContactDetailsModal;
