import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInputField from "../../form/passwordInputField";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import SuccessMessagemodal from "../../modals/successMessageModal";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";
import SpinnerLoading from "../../utilits/spinnerLoading";
import {
  addArchiveZoneAction,
  restoreArchiveZoneAction,
} from "../../../redux/actions/manageZones/archiveZoneAction";
import { useNavigate } from "react-router";
import {
  deleteLocalIntraZonePermanentlyAction,
  deleteOutstationIntraZonePermanentlyAction,
  deleteSpecialIntraZonePermanentlyAction,
  deleteTollIntraZonePermanentlyAction,
  restoreDeletedLocalIntraZoneAction,
  restoreDeletedOutstationIntraZoneAction,
  restoreDeletedSpecialIntraZoneAction,
  restoreDeletedTollIntraZoneAction,
} from "../../../redux/actions/manageZones/deletedIntraZoneAction";
import { unblockZoneAction } from "../../../redux/actions/manageZones/blockedZoneAction";
import { deleteLocalZoneAction } from "../../../redux/actions/manageZones/localZoneAction";
import { deleteOutstationZoneAction } from "../../../redux/actions/manageZones/outstationZoneAction";
import { deleteTollZoneAction } from "../../../redux/actions/manageZones/tollsZoneAction";
import { deleteSpecialZoneAction } from "../../../redux/actions/manageZones/specialZoneAction";
import { capitalizeFirstLetter } from "../../helper";
import ErrorMessagemodal from "./errorMessageModal";

function ZonesPassword({
  changeUpdatePasswordshow,
  handleChangeUpdatePasswordClose,
  type,
  params,
  zoneObject = {},
  reloadTable,
  setReloadTable,
  title = "Are you sure you want to make changes?",
  title_color = "primary_color",
  zoneID = "",
  zoneName = "",
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const handleErrorMessageShow = () => {
    setErrorMessageShow(true);
  };
  const handleErrorMessageClose = () => {
    setErrorMessageShow(false);
  };

  function navigationFn() {
    if (type === "AddArchiveZone") {
      navigate("/manage-zone");
    } else if (type === "RestoreArchiveZone") {
      navigate("/archived-zone");
    } else if (type === "UnBlockZone") {
      navigate("/blocked-zone");
    }
  }

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    navigationFn();
    setSuccessMessageShow(false);
    setReloadTable(!reloadTable);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formikUpdatePass = useFormik({
    initialValues: {
      ConfirmPassword: ``,
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim(),
    }),
    onSubmit: (values) => {
      const deleteIntraZoneData = {
        main_zone_id: params?.id,
        delete_zone_id: zoneObject?.id,
        password: values?.ConfirmPassword,
      };
      const restoreIntraZoneData = {
        main_zone_id: params?.id,
        restore_zone_id: zoneObject?.id,
        password: values?.ConfirmPassword,
      };
      if (type === "AddArchiveZone") {
        setLoading(true);
        dispatch(
          addArchiveZoneAction(
            {
              main_zone_id: params?.id,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (type === "RestoreDeletedZone") {
        if (zoneObject?.category === "LocalDefinedCity") {
          setLoading(true);
          dispatch(
            restoreDeletedLocalIntraZoneAction(
              restoreIntraZoneData,
              onSubmitSuccess,
              onSubmitError
            )
          );
        } else if (zoneObject?.category === "OutstationDefinedCity") {
          setLoading(true);
          dispatch(
            restoreDeletedOutstationIntraZoneAction(
              restoreIntraZoneData,
              onSubmitSuccess,
              onSubmitError
            )
          );
        } else if (zoneObject?.category === "SpecialZone") {
          setLoading(true);
          dispatch(
            restoreDeletedSpecialIntraZoneAction(
              restoreIntraZoneData,
              onSubmitSuccess,
              onSubmitError
            )
          );
        } else if (zoneObject?.category === "TollZone") {
          setLoading(true);
          dispatch(
            restoreDeletedTollIntraZoneAction(
              restoreIntraZoneData,
              onSubmitSuccess,
              onSubmitError
            )
          );
        }
      } else if (type === "DeleteIntraZonePermanently") {
        if (zoneObject?.category === "LocalDefinedCity") {
          setLoading(true);
          dispatch(
            deleteLocalIntraZonePermanentlyAction(
              deleteIntraZoneData,
              onSubmitSuccess,
              onSubmitError
            )
          );
        } else if (zoneObject?.category === "OutstationDefinedCity") {
          setLoading(true);
          dispatch(
            deleteOutstationIntraZonePermanentlyAction(
              deleteIntraZoneData,
              onSubmitSuccess,
              onSubmitError
            )
          );
        } else if (zoneObject?.category === "SpecialZone") {
          setLoading(true);
          dispatch(
            deleteSpecialIntraZonePermanentlyAction(
              deleteIntraZoneData,
              onSubmitSuccess,
              onSubmitError
            )
          );
        } else if (zoneObject?.category === "TollZone") {
          setLoading(true);
          dispatch(
            deleteTollIntraZonePermanentlyAction(
              deleteIntraZoneData,
              onSubmitSuccess,
              onSubmitError
            )
          );
        }
      } else if (type === "UnBlockZone") {
        setLoading(true);
        dispatch(
          unblockZoneAction(
            {
              main_zone_id: zoneObject?.id,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (type === "RestoreArchiveZone") {
        setLoading(true);
        dispatch(
          restoreArchiveZoneAction(
            {
              main_zone_id: zoneObject?.id,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (type === "DeleteLocalZone") {
        setLoading(true);
        dispatch(
          deleteLocalZoneAction(
            {
              main_zone_id: params?.id,
              local_city_id: zoneObject?.id,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (type === "DeleteOutstationZone") {
        setLoading(true);
        dispatch(
          deleteOutstationZoneAction(
            {
              main_zone_id: params?.id,
              outstation_city_id: zoneObject?.id,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (type === "DeleteTollsZone") {
        setLoading(true);
        dispatch(
          deleteTollZoneAction(
            {
              main_zone_id: params?.id,
              toll_city_id: zoneObject?.id,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      } else if (type === "DeleteSpecialZone") {
        setLoading(true);
        dispatch(
          deleteSpecialZoneAction(
            {
              main_zone_id: params?.id,
              special_city_id: zoneObject?.id,
              password: values?.ConfirmPassword,
            },
            onSubmitSuccess,
            onSubmitError
          )
        );
      }
    },
  });

  const onSubmitSuccess = (data) => {
    setLoading(false);
    handleChangeUpdatePasswordClose();
    successToast(type === "RestoreDeletedZone" ? data?.message : data?.data);
    handleSuccessMessageShow();
    formikUpdatePass?.resetForm();
  };
  const onSubmitError = (data) => {
    console.log(data);
    setLoading(false);
    setErrorMessage(data?.data?.data);
    errorToast(data?.data?.data);
    console.log(errorMessage);
    // if(type === "RestoreDeletedZone"){
    // if(errorMessage.startsWith("This zone cannot")){
    // handleErrorMessageShow()
    // }
    // else {
    //   setError(data?.data?.data);
    // }

    // }else{
    setError(data?.data?.data);
    // }
  };
  const [zoneType, setZoneType] = useState({
    ZoneId: "",
    zoneName: "",
  });
  const [messageTitle, setMessageTitle] = useState("");

  useEffect(() => {
    if (type === "AddArchiveZone") {
      setZoneType({
        ZoneId: zoneID ? zoneID : "--",
        zoneName: zoneName ? zoneName : "--",
      });
      setMessageTitle(`${zoneName} Zone has been archived Successfully!`);
    } else if (type === "RestoreDeletedZone") {
      setZoneType({
        ZoneId:
          zoneObject?.category === "LocalDefinedCity"
            ? zoneID + "-" + zoneObject?.local_zone_code
            : zoneObject?.category === "OutstationDefinedCity"
            ? zoneID + "-" + zoneObject?.outstation_zone_code
            : zoneObject?.category === "SpecialZone"
            ? zoneID + "-" + zoneObject?.special_zone_code
            : zoneObject?.category === "TollZone"
            ? zoneID + "-" + zoneObject?.toll_zone_code
            : "--",
        zoneName: zoneObject?.city_name
          ? // zoneName + "-" +
            capitalizeFirstLetter(zoneObject?.city_name)
          : "--",
      });
      setMessageTitle(
        `${zoneObject?.city_name}  has been restored Successfully!`
      );
    } else if (type === "DeleteIntraZonePermanently") {
      setZoneType({
        ZoneId:
          zoneObject?.category === "LocalDefinedCity"
            ? zoneID + "-" + zoneObject?.local_zone_code
            : zoneObject?.category === "OutstationDefinedCity"
            ? zoneID + "-" + zoneObject?.outstation_zone_code
            : zoneObject?.category === "SpecialZone"
            ? zoneID + "-" + zoneObject?.special_zone_code
            : zoneObject?.category === "TollZone"
            ? zoneID + "-" + zoneObject?.toll_zone_code
            : "--",
        zoneName: zoneObject?.city_name
          ? //  zoneName + "-" +
            zoneObject?.city_name + " " + `(${zoneObject?.category})`
          : "--",
      });
      setMessageTitle(
        `${zoneObject?.city_name}  has been deleted permanently!`
      );
    } else if (type === "DeleteLocalZone") {
      setZoneType({
        ZoneId: zoneID + "-" + zoneObject?.local_zone_code,
        zoneName: zoneObject?.city_name
          ? //  zoneName + "-" +
            capitalizeFirstLetter(zoneObject?.city_name)
          : "--",
      });
      setMessageTitle(
        `${zoneObject?.city_name}  has been deleted Successfully!`
      );
    } else if (type === "RestoreArchiveZone") {
      setZoneType({
        ZoneId: zoneObject?.zoneCode ? zoneObject?.zoneCode : "--",
        zoneName: zoneObject?.zoneName
          ? capitalizeFirstLetter(zoneObject?.zoneName)
          : "--",
      });
      setMessageTitle(
        `${zoneObject?.zoneName}  has been restored Successfully!`
      );
    } else if (type === "DeleteOutstationZone") {
      setZoneType({
        ZoneId: zoneID + "-" + zoneObject?.outstation_zone_code,
        zoneName: zoneObject?.city_name
          ? zoneName + "-" + zoneObject?.city_name
          : "--",
      });
      setMessageTitle(
        `${zoneObject?.city_name}  has been deleted Successfully!`
      );
    } else if (type === "DeleteTollsZone") {
      setZoneType({
        ZoneId: zoneObject?.toll_zone_code
          ? zoneID + "-" + zoneObject?.toll_zone_code
          : "--",
        zoneName: zoneObject?.city_name
          ? zoneName + "-" + zoneObject?.city_name
          : "--",
      });
      setMessageTitle(
        `${zoneObject?.city_name}  has been deleted Successfully!`
      );
    } else if (type === "DeleteSpecialZone") {
      setZoneType({
        ZoneId: zoneObject?.special_zone_code
          ? zoneID + "-" + zoneObject?.special_zone_code
          : "--",
        zoneName: zoneObject?.city_name
          ? //  zoneName + "-" +
            zoneObject?.city_name
          : "--",
      });
      setMessageTitle(
        `${zoneObject?.city_name}  has been deleted Successfully!`
      );
    } else if (type === "UnBlockZone") {
      setZoneType({
        ZoneId: zoneObject?.zoneCode ? zoneObject?.zoneCode : "--",
        zoneName: zoneObject?.zoneName
          ? capitalizeFirstLetter(zoneObject?.zoneName)
          : "--",
      });
      setMessageTitle(
        `${zoneObject?.zoneName}  has been unblocked Successfully!`
      );
    }
  }, [type, zoneObject]);

  const data = [
    {
      label: "Zone ID",
      value: zoneType?.ZoneId ? zoneType?.ZoneId : "--",
    },
    {
      label: "zone Name",
      value: zoneType?.zoneName ? zoneType?.zoneName : "--",
    },
  ];

  const description = (
    <div className="fs_15 fw_600 mt-3 mx-4">
      {data?.map((item) => (
        <React.Fragment key={item?.value}>
          {" "}
          <div className="row gx-0">
            <div className="col-5">
              <div className="text-start ps-2">
                <span className="primary_color fs_16 text-nowrap">
                  {item?.label}
                </span>
              </div>
            </div>
            <div className="col-1">
              <span className="ps-3 secondary_color">:</span>
            </div>
            <div className="col-6">
              <div className="text-start text-nowrap">
                <span className="secondary_color fs_16 ps-2">
                  {item?.value}
                </span>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <>
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={handleErrorMessageClose}
        title={`Zone cannot be restored`}
        description={error}
      />
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={messageTitle}
        title_color={
          messageTitle?.includes("deleted") ? "red_color" : "primary_color"
        }
        subsection={true}
        description={description}
      />
      <Modal
        centered
        backdrop={"static"}
        keyboard={false}
        show={changeUpdatePasswordshow}
        onHide={handleChangeUpdatePasswordClose}
        dialogClassName="change_update_password_container"
        contentClassName="change_update_password_card"
        backdropClassName="create_password_modal_backdrop"
      >
        <Modal.Body>
          <div className="px-sm-4">
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center flex-column align-items-center mb-3">
                <span className={`fs_21 ${title_color} fw_600 text-center`}>
                  {title}
                </span>

                <div className="mt-3 text-start">
                  <span className="primary_color fw_600">ID:</span>
                  <span className="secondary_color fw_600 ps-2">
                    {zoneType?.ZoneId ? zoneType?.ZoneId : "--"}
                  </span>
                </div>
                <div className="text-start">
                  <span className="primary_color fw_600">Name:</span>
                  <span className="secondary_color fw_600 ps-2">
                    {zoneType?.zoneName ? zoneType?.zoneName : "--"}
                  </span>
                </div>
              </div>
              <PasswordInputField
                itemName={"ConfirmPassword"}
                inputValue={formikUpdatePass.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formikUpdatePass.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formikUpdatePass.handleBlur}
                formikError={formikUpdatePass.errors.ConfirmPassword}
                formikTouched={formikUpdatePass.touched.ConfirmPassword}
                error={error}
              />
              <div className="red_color fw_500 ms-sm-5">
                <span>{error}</span>
              </div>
              <div className="d-flex justify-content-sm-between justify-content-center gap-sm-0 gap-3 mt-4 px-sm-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    handleChangeUpdatePasswordClose();
                    setLoading(false);
                    setError(false);
                    formikUpdatePass?.resetForm();
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                  type="sumbit"
                  disabled={loading}
                >
                  {loading ? (
                    <SpinnerLoading />
                  ) : (
                    <span className=" fs_18 white_color ps-2">Proceed</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ZonesPassword;
