import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaresRoundTripAction } from "../../../../../redux/actions/manageFaresAction";
import errorToast from "../../../../utilits/errorToast";
import { useLocation, useNavigate } from "react-router";
import LoadingSpinnerTable from "../../../../utilits/loadingSpinnerTable";
import { roundTripstyles } from "../../../../mui-styles/mui-styles";
import { archivedRoundTripAction } from "../../../../../redux/actions/archiveFaresAction";
import FaresInputTable from "../../../faresInputTable";
import ManageFareModuleCard from "../../../manageFareModuleCard";

const FaresRoundTripEdit = ({ params }) => {
  const dispatch = useDispatch();
  const paramsData = params?.split("&");
  const navigate = useNavigate();
  const location = useLocation();
  const is_editable = location?.state?.edit;
  const is_archived_fare = location?.state?.is_archived_fare;
  const [loading, setLoading] = useState(false);
  const [roundTripPrice, setRoundTripPrice] = useState([]);
  const [roundTripTable, setRoundTripTable] = useState(false);

  useEffect(() => {
    setLoading(true);
    {
      is_archived_fare
        ? dispatch(
            archivedRoundTripAction(
              {
                main_zone_id: paramsData[0],
                city_zone_id: paramsData[2],
              },
              onSuccess,
              onError
            )
          )
        : dispatch(
            FaresRoundTripAction(
              {
                main_zone_id: paramsData[0],
                city_zone_id: paramsData[2],
              },
              onSuccess,
              onError
            )
          );
    }
  }, [roundTripTable]);
  const onSuccess = (data) => {
    setLoading(false);
    setRoundTripPrice(data?.data);
  };
  const onError = (data) => {
    setLoading(false);
    errorToast(data?.data?.data);
  };

  console.log(roundTripPrice, "JGjhgjad");



  const [editingStatus, setEditingStatus] = useState({});

  const keyOrderForRoundTrip1 = [
    "base_fare",
    "per_km_fare",
    "per_extra_km_fare",
    "per_extra_time_fare",
    "night_allowance",
    "driver_allowance",
    "waiting_fee",
    "booking_fee",
    "cancellation_fee",
  ];

  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : (
        <>
       
          <div className="d-flex align-items-center ">
            <button
              className="back_icon ps-0 "
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="ri-arrow-left-s-line fs_30 fw_700 primary_color"></i>
            </button>
            <span className="primary_color fs_20 fw_600 ">Round Trip</span>{" "}
          </div>

          <div className="mt-3">
            <TextField
              size="small"
              style={{ width: "20%" }}
              sx={roundTripstyles.select}
              variant="outlined"
              label="Zone"
              InputLabelProps={{
                style: { color: "#687284", fontWeight: "500" },
                shrink: true,
              }}
              value={paramsData[1] ? paramsData[1] : "--"}
              disabled
            />
          </div>

          <ManageFareModuleCard
            is_editable={is_editable}
            localPriceModule1={roundTripPrice?.map((item) => item)?.[0]}
            mainType={"RoundTripManageFare"}
            tableType="ModuleChangeTable"
            reload={roundTripTable}
            setReload={setRoundTripTable}
            mainZoneId={paramsData?.[0]}
            subZoneId={paramsData?.[2]}
            editingStatus={editingStatus}
            setEditingStatus={setEditingStatus}
            disableTable={Object?.values(editingStatus).some((value) =>
              Object?.values(value).includes(true)
            )}
          />
          {/* <div className="mt-3">
            <div className="card pricing_module_card">
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="d-flex flex-column ">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="fs_16 primary_color fw_500 text-nowrap">
                          Min Package Distance (Kms)
                        </span>
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className={
                            formik.errors.Distance && formik.touched.Distance
                              ? `  oneWay_manage_zone_input_error ms-md-4 mt-md-0 mt-1  py-1 background_none`
                              : ` oneWay_manage_zone_input ms-md-4 mt-md-0 mt-1  py-1 background_none `
                          }
                          placeholder=""
                          name="Distance"
                          value={formik.values.Distance}
                          onChange={formik.handleChange}
                          disabled={edit === false}
                        />

                        <div
                          className={`login_form_error_container text-md-end mb-1`}
                        >
                          {formik.errors.Distance &&
                            formik.touched.Distance && (
                              <span
                                className="text-danger fw_500  error_color_bg border_radius_3px px-1  ms-md-4 mt-md-0 mt-1 "
                                style={{ fontSize: "12px" }}
                              >
                                {formik.errors.Distance}
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <span className="fs_16 primary_color fw_500 text-nowrap">
                          Min Package Time (Hrs)
                        </span>
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className={
                            formik.errors.Hours && formik.touched.Hours
                              ? `  oneWay_manage_zone_input_error ms-md-4 mt-md-0 mt-1 py-1  background_none`
                              : ` oneWay_manage_zone_input ms-md-4 mt-md-0 mt-1 py-1  background_none `
                          }
                          placeholder=""
                          name="Hours"
                          value={formik.values.Hours}
                          onChange={formik.handleChange}
                          disabled={edit === false}
                        />

                        <div
                          className={`login_form_error_container text-md-end mb-1`}
                        >
                          {formik.errors.Hours && formik.touched.Hours && (
                            <span
                              className="text-danger fw_500  error_color_bg border_radius_3px px-1  ms-md-4 mt-md-0 mt-1 "
                              style={{ fontSize: "12px" }}
                            >
                              {formik.errors.Hours}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {is_editable ? (
                      <div className="d-flex justify-content-end  mt-3 ">
                        {edit ? (
                          <div>
                            <button
                              onClick={() => {
                                formik.resetForm();
                                setEdit(false);
                                setDisableBtn(false);
                              }}
                              type="button"
                              className="ms-3 fs_14 cancel_btn border_radius white_bg primary_color px-2"
                            >
                              Cancel
                            </button>
                            <button
                              className="ms-3 fs_14 reset_btn border_radius_3px white_bg red_color py-0 px-2 "
                              type="reset"
                              onClick={formik.resetForm}
                            >
                              Reset
                            </button>
                            <button
                              className="ms-3 fs_14 save_Btn border_radius dark_green_bg white_color px-3 border_none"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEdit(!edit);
                              setDisableBtn(true);
                            }}
                            className={
                              disableBtn
                                ? "px-3 edit_btn  light_grey_bg   fw_700 fs_14 border_radius_3px border_none"
                                : "px-3 edit_btn primary_bg  white_color fs_14 border_radius_3px border_none"
                            }
                            disabled={disableBtn}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div> */}

          <div>
            <FaresInputTable
              faresData={roundTripPrice}
              keyOrder={keyOrderForRoundTrip1}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="RoundTripManageTable"
              mainType={"RoundTripManageFare"}
              reload={roundTripTable}
              setReload={setRoundTripTable}
              mainZoneId={paramsData?.[0]}
              subZoneId={paramsData?.[2]}
              is_editable={is_editable}
            />
          </div>
        </>
      )}
    </>
  );
};

export default FaresRoundTripEdit;
