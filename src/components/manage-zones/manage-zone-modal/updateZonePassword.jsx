import React, { useState } from "react";
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
import { useNavigate } from "react-router";
import {
  addMainZoneAction,
  editMainZoneAction,
} from "../../../redux/actions/manageZones/manageZoneAction";
import {
  addLocalZoneAction,
  updateLocalZoneAction,
} from "../../../redux/actions/manageZones/localZoneAction";
import {
  addSpecialZoneAction,
  updateSpecialZoneAction,
} from "../../../redux/actions/manageZones/specialZoneAction";
import {
  addOutstationZoneAction,
  updateOutstationZoneAction,
} from "../../../redux/actions/manageZones/outstationZoneAction";
import {
  addTollZoneAction,
  updateTollZoneAction,
} from "../../../redux/actions/manageZones/tollsZoneAction";
import {
  addblockZoneAction,
  updateblockZoneAction,
} from "../../../redux/actions/manageZones/blockedZoneAction";

function UpdateZonesPassword({
  changeUpdatePasswordshow,
  handleChangeUpdatePasswordClose,
  type,
  action,
  intraZoneType,
  formik,
  params,
  onExit,
  intraZoneId,
  title = "Are you sure you want to make changes?",
  zoneID = "",
  zoneName = "",
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // ramu added
  const [editZoneID, setEditZoneID] = useState("");
  const [editZoneName, setEditZoneName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateFn = () => {
    if (type === "AddMainZone") {
      navigate("/manage-zone");
    } else if (type === "AddBlockZone") {
      navigate("/blocked-zone");
    }
  };

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    navigateFn();
    setSuccessMessageShow(false);
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
      if (type === "AddMainZone") {
        setLoading(true);
        dispatch(
          addMainZoneAction(
            {
              zone_name: formik?.values.zone_name,
              outstation_oneway_limit: +formik?.values.outstation_oneway_limit,
              zone_notes: formik?.values.zone_notes,
              password: values?.ConfirmPassword,
              coordinates: formik?.values.coordinates,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "EditMainZone") {
        setLoading(true);
        dispatch(
          editMainZoneAction(
            {
              main_zone_id: params?.id,
              zone_name: formik?.values?.zone_name,
              outstation_oneway_limit: +formik?.values?.outstation_oneway_limit,
              zone_notes: formik?.values.zone_notes,
              password: values?.ConfirmPassword,
              coordinates: formik?.values?.coordinates,
            },
            onSuccess,
            onError
          )
        );
      } else if (intraZoneType === "local") {
        if (action === "create") {
          setLoading(true);
          dispatch(
            addLocalZoneAction(
              {
                main_zone_id: params.id,
                category: "LocalDefinedCity",
                city_name: formik?.values.zone_name,
                coordinates: formik?.values.coordinates,
                password: values?.ConfirmPassword,
              },
              onIntraZoneUpdateSuccess,
              onIntraZoneUpdateError
            )
          );
        } else if (action === "edit") {
          setLoading(true);
          dispatch(
            updateLocalZoneAction(
              {
                main_zone_id: params.id,
                local_city_id: intraZoneId,
                city_name: formik?.values.zone_name,
                coordinates: formik?.values.coordinates,
                password: values?.ConfirmPassword,
              },
              onIntraZoneUpdateSuccess,
              onIntraZoneUpdateError
            )
          );
        }
      } else if (intraZoneType === "special") {
        if (action === "create") {
          setLoading(true);
          dispatch(
            addSpecialZoneAction(
              {
                main_zone_id: params.id,
                category: "SpecialZone",
                city_name: formik?.values.zone_name,
                coordinates: formik?.values.coordinates,
                password: values?.ConfirmPassword,
              },
              onIntraZoneUpdateSuccess,
              onIntraZoneUpdateError
            )
          );
        } else if (action === "edit") {
          setLoading(true);
          dispatch(
            updateSpecialZoneAction(
              {
                main_zone_id: params?.id,
                special_city_id: intraZoneId,
                city_name: formik?.values?.zone_name,
                coordinates: formik?.values?.coordinates,
                password: values?.ConfirmPassword,
              },
              onIntraZoneUpdateSuccess,
              onIntraZoneUpdateError
            )
          );
        }
      } else if (intraZoneType === "outstation") {
        if (action === "create") {
          setLoading(true);
          dispatch(
            addOutstationZoneAction(
              {
                main_zone_id: params?.id,
                category: "OutstationDefinedCity",
                city_name: formik?.values?.zone_name,
                coordinates: formik?.values?.coordinates,
                password: values?.ConfirmPassword,
              },
              onIntraZoneUpdateSuccess,
              onIntraZoneUpdateError
            )
          );
        } else if (action === "edit") {
          setLoading(true);
          dispatch(
            updateOutstationZoneAction(
              {
                main_zone_id: params?.id,
                outstation_city_id: intraZoneId,
                city_name: formik?.values?.zone_name,
                coordinates: formik?.values.coordinates,
                password: values?.ConfirmPassword,
              },
              onIntraZoneUpdateSuccess,
              onIntraZoneUpdateError
            )
          );
        }
      } else if (intraZoneType === "toll") {
        if (action === "create") {
          setLoading(true);
          dispatch(
            addTollZoneAction(
              {
                main_zone_id: params.id,
                category: "TollZone",
                city_name: formik?.values.zone_name,
                coordinates: formik?.values.coordinates,
                password: values?.ConfirmPassword,
              },
              onIntraZoneUpdateSuccess,
              onIntraZoneUpdateError
            )
          );
        } else if (action === "edit") {
          setLoading(true);
          dispatch(
            updateTollZoneAction(
              {
                main_zone_id: params?.id,
                toll_city_id: intraZoneId,
                city_name: formik?.values?.zone_name,
                coordinates: formik?.values?.coordinates,
                password: values?.ConfirmPassword,
              },
              onIntraZoneUpdateSuccess,
              onIntraZoneUpdateError
            )
          );
        }
      } else if (type === "AddBlockZone") {
        setLoading(true);
        dispatch(
          addblockZoneAction(
            {
              zone_name: formik?.values.zone_name,
              blocked_reason: formik?.values.blocked_reason,
              coordinates: formik?.values.coordinates,
              password: values?.ConfirmPassword,
            },
            onSuccess,
            onError
          )
        );
      } else if (type === "EditBlockZone") {
        setLoading(true);
        dispatch(
          updateblockZoneAction(
            {
              main_zone_id: params?.id,
              zone_name: formik?.values.zone_name,
              blocked_reason: formik?.values.blocked_reason,
              coordinates: formik?.values.coordinates,
              password: values?.ConfirmPassword,
            },
            onSuccess,
            onError
          )
        );
      }
    },
  });

  function onSuccess(data) {
    setLoading(false);
    // ramu added
    setEditZoneName(data?.data?.zone_name);
    formikUpdatePass?.resetForm();
    handleChangeUpdatePasswordClose();
    handleSuccessMessageShow();
    successToast(data?.message);
  }
  function onError(data) {
    console.log(data);
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
  }
  function onIntraZoneUpdateSuccess(data) {
    console.log(data, "kdaldasdad");
    setLoading(false);
    successToast(data.message);
    onExit();
    formikUpdatePass?.resetForm();
    formik?.resetForm();
    handleChangeUpdatePasswordClose();
    handleSuccessMessageShow();
  }
  function onIntraZoneUpdateError(data) {
    setLoading(false);
    errorToast(data?.data?.data);
    setError(data?.data?.data);
  }

  console.log(editZoneName, "kdaldasdad");

  // const data = [
  //   { id: 1, label: "Zone ID", value: zoneID ? zoneID : "--" },
  //   { id: 2, label: "Zone Name", value: zoneName ? zoneName : "--" },
  // ];

  
  // ramu added
  const data = [
    { id: 1, label: "Zone ID", value: zoneID ?? "--" },
    {
      id: 2,
      label: "Zone Name",
      value: editZoneName ? editZoneName : zoneName ? zoneName : "--",
    },
  ];

  const description = (
    <div className="fs_15 fw_600 mt-3">
      {data?.map((item) => (
        <React.Fragment key={item?.id}>
          {" "}
          <div className="row gx-0">
            <div className="col-6">
              <div className="text-start ">
                <span className="primary_color fs_16 text-nowrap">
                  {item?.label}
                </span>
              </div>
            </div>
            {/* <div className="col-1">
              <span className="ps-3 secondary_color"></span>
            </div> */}
            <div className="col-6">
              <div className="text-start text-nowrap">
                <span className="secondary_color fs_16 ps-4">
                  :{item?.value}
                </span>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  // const Title = useMemo(() => {
  //   if (action === "create") {
  //    return `Zone/City created successfully!`;
  //   } else {
  //    return `Zone/City updated successfully!`;
  //   }
  // }, [action]);

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          type === "AddMainZone" || action === "create"
            ? `Zone/City added successfully!`
            : `Zone/City updated successfully!`
        }
        subsection={
          type === "AddMainZone" || action === "create" ? false : true
        }
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
          <div className="px-4">
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <span className="fs_23 primary_color fw_600 text-center">
                  {title}
                </span>
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
              <div className="red_color fw_500 ps-5">{error}</div>
              <div className="d-flex justify-content-between mt-4 px-5 mb-3">
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

export default UpdateZonesPassword;
