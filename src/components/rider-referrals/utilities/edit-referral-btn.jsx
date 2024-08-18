import React from "react";

const EditReferralBtn = ({
  saveLaterBtn = () => {},
  saveViewBtn = () => {},
  resetBtn = () => {},
  is_editable,
  viewBtn = () => {},
  saveAndView = true,
  backBtn = () => {},
  backButton = false,
  ApproveButton = false,
  approveBtn = () => {},
  rejectBtn = () => {},
  viewBtnText = "",
  saveForLater = true,
  deleteBtnFn = () => {},
  DeleteButton = false,
  loading = false,
  saveAndViewText = "Save & View Broadcast",
}) => {
  return (
    <>
      {is_editable === false ? (
        <div className="d-flex gap-4 justify-content-end mt-4">
          <button
            className="px-5 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
            type="button"
            onClick={viewBtn}
          >
            {viewBtnText}
          </button>
        </div>
      ) : (
        <>
          {/* <div className=" d-lg-block d-none"> */}
            <div className="d-flex gap-4 justify-content-end mt-4 text-nowrap">
              {backButton && (
                <button
                  className="px-4 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-1 align-item-center"
                  type="button"
                  onClick={backBtn}
                >
                  <i className="ri-arrow-left-line primary_color fw_600" />
                  Go Back
                </button>
              )}
              <button
                className="px-4 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
                type="button"
                onClick={resetBtn}
              >
                Reset
              </button>
              {saveForLater && (
                <button
                  className="px-4 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
                  type="submit"
                  onClick={saveLaterBtn}
                  disabled={loading}
                >
                  {"Save For Later"}
                </button>
              )}

              {saveAndView && (
                <button
                  className="px-3 py-1 primary_border primary_bg white_color border_radius_3px fs_18  d-flex gap-2 align-item-center"
                  type="submit"
                  onClick={saveViewBtn}
                  // disabled={loading}
                >
                  {/* {loading ? <SpinnerLoading /> :  */}
                  {saveAndViewText}
                </button>
              )}
              {ApproveButton && (
                <button
                  className="light_green_bg border_none border_radius_3px white_color fs_18 px-5"
                  type="submit"
                  onClick={approveBtn}
                >
                  Approve
                </button>
              )}
              {ApproveButton && (
                <button
                  className="fs_18 fw_500 background_none  error_border primary_border red_color border_radius_3px px-5 py-1"
                  type="button"
                  onClick={rejectBtn}
                >
                  Reject
                </button>
              )}
              {DeleteButton && (
                <button
                  className="fs_18 fw_500 background_none  error_border primary_border red_color border_radius_3px px-5 py-1"
                  type="button"
                  onClick={deleteBtnFn}
                >
                  Delete
                </button>
              )}
            </div>
          {/* </div> */}
          {/* <div className="d-block d-lg-none text-center align-items-center">
            <div className="row d-flex justify-content-center g-0 mt-4 text-nowrap">
              <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                {backButton && (
                  <button
                    className="w-90 px-4 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 align-item-center"
                    type="button"
                    onClick={backBtn}
                  >
                    <i className="ri-arrow-left-line primary_color fw_600" />
                    Go Back
                  </button>
                )}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                <button
                  className="px-4 w-90 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 align-item-center"
                  type="button"
                  onClick={resetBtn}
                >
                  Reset
                </button>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                {saveForLater && (
                  <button
                    className="px-4 w-90 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 align-item-center"
                    type="submit"
                    onClick={saveLaterBtn}
                    disabled={loading}
                  >
                    {"Save For Later"}
                  </button>
                )}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                {saveAndView && (
                  <button
                    className="px-3 w-90 py-1 primary_border primary_bg white_color border_radius_3px fs_18 align-item-center"
                    type="submit"
                    onClick={saveViewBtn}
                  >
                    {saveAndViewText}
                  </button>
                )}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                {ApproveButton && (
                  <button
                    className="w-90 light_green_bg border_none border_radius_3px white_color fs_18 px-5"
                    type="submit"
                    onClick={approveBtn}
                  >
                    Approve
                  </button>
                )}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                {ApproveButton && (
                  <button
                    className="w-90 fs_18 fw_500 background_none  error_border primary_border red_color border_radius_3px px-5 py-1"
                    type="button"
                    onClick={rejectBtn}
                  >
                    Reject
                  </button>
                )}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                {DeleteButton && (
                  <button
                    className="w-90 fs_18 fw_500 background_none  error_border primary_border red_color border_radius_3px px-5 py-1"
                    type="button"
                    onClick={deleteBtnFn}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div> */}
        </>
      )}
    </>
  );
};

export default EditReferralBtn;
