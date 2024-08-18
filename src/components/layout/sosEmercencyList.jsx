import React, { useEffect, useRef, useState } from "react";
import {
  driverPendSOSListAction,
  riderPendSOSListAction,
} from "../../redux/actions/sos/pendingSosAction";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { socket } from "../../redux/config";
import useDisplayToggle from "../useDisplayToggle";

const SOSEmercencyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sosButton, setSosButton] = useState(false);
  const [riderSoslist, setRiderSoslist] = useState([]);
  const [driverSosList, setDriverSosList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [riderPending, setRiderPending] = useState([]);
  const [driverPending, setDriverPending] = useState([]);
  let page;
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    dispatch(
      riderPendSOSListAction(
        {
          search: {},
        },
        page,
        onRiderSuccess,
        onRiderError
      )
    );
    dispatch(
      driverPendSOSListAction(
        {
          search: {},
        },
        page,
        onDriverSuccess,
        onDriverError
      )
    );
  }, [riderPending, driverPending, location.pathname]);

  const onRiderSuccess = (data) => {
    setLoading(false);
    setRiderSoslist(data?.data?.data);
  };
  const onRiderError = (data) => {
    setLoading(false);
  };

  const onDriverSuccess = (data) => {
    setLoading(false);
    setDriverSosList(data?.data?.data);
  };
  const onDriverError = (data) => {
    setLoading(false);
  };

  console.log(driverPending, "asjdakd");

  useEffect(() => {
    socket.on("rider_inprogress_sos", (data) => {
      setRiderPending(data);
    });
    socket.on("driver_inprogress_sos", (data) => {
      setDriverPending(data);
    });
  }, [socket]);

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    setPermissions(JSON.parse(localStorage.getItem("permissions")));
  }, []);
  console.log(permissions, "jhghjgjk");

  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setSosButton,
  });

  return (
    <>
      {permissions?.inprogress_driver_sos?.read ||
      permissions?.inprogress_driver_sos?.write ||
      permissions?.inprogress_rider_sos?.read ||
      permissions?.inprogress_rider_sos?.write ? (
        <>
          {riderSoslist?.length === 0 && driverSosList?.length === 0 ? null : (
            <div
              onClick={() => setSosButton(!sosButton)}
              className="position-relative"
              ref={onClickRef}
            >
              <span className="red_bg white_color fs_14 fw_500 px-2 py-1 border_radius_5px cursor_pointer">
                SOS
              </span>
              {sosButton ? (
                <div
                  className="position-absolute end-0  disabled_bg_color px-3 py-2 d-flex flex-column mt-2 border_radius_5px"
                  ref={insideClickRef}
                >
                  {riderSoslist?.length > 0 ? (
                    <button
                      className="cursor_pointer text-nowrap border_none background_none mt-1 fs_14 fw_500 primary_color"
                      onClick={() => {
                        navigate(`/sos/pending-create-rider-sos`);
                      }}
                    >
                      Rider SOS{" "}
                      <span className="red_color">{riderSoslist?.length}</span>
                    </button>
                  ) : null}
                  {driverSosList?.length > 0 ? (
                    <button
                      className="cursor_pointer text-nowrap border_none background_none mt-1 fs_14 fw_500 primary_color"
                      onClick={() => {
                        navigate(`/sos/pending-create-driver-sos`);
                      }}
                    >
                      Driver SOS{" "}
                      <span className="red_color">{driverSosList?.length}</span>
                    </button>
                  ) : null}
                  {/* {riderSoslist?.length === 0 &&
                    driverSosList?.length === 0 && (
                      <div>
                        <span className="text-nowrap fs_14 fw_500 primary_color">
                          No SOS Emergency
                        </span>
                      </div>
                    )} */}
                </div>
              ) : null}
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default SOSEmercencyList;
