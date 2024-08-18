import React, { useRef } from "react";
import Sidebar from "./sidebar";
import { useState } from "react";
import menuIcon from "../../assets/icons/menu-icon.svg";
import SOSEmercencyList from "./sosEmercencyList";
import LogoutModal from "./LogoutModal";
import toggleIcon from "../../assets/icons/menu.svg";
import ResetAdminPasswordModal from "./resetAdminPassword";
import useDisplayToggle from "../useDisplayToggle";

const Layout = ({ children }) => {
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);

  const [resetPasswordshow, setResetPasswordShow] = useState(false);
  const handleResetPasswordClose = () => setResetPasswordShow(false);
  const handleResetPasswordShow = () => {
    setResetPasswordShow(true);
  };

  const [logoutModalshow, setLogoutModalShow] = useState(false);
  const handleLogoutModalClose = () => setLogoutModalShow(false);
  const handleLogoutModalShow = () => {
    setLogoutModalShow(true);
  };

  const [logoutPopup, setLogoutPopup] = useState(false);

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const handleSidebarClose = () => {
    setSideBarOpen(false);
  };

  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setLogoutPopup,
  });

  return (
    <>
      <ResetAdminPasswordModal
        resetPasswordshow={resetPasswordshow}
        handleResetPasswordClose={handleResetPasswordClose}
      />
      <LogoutModal
        logoutModalshow={logoutModalshow}
        handleLogoutModalClose={handleLogoutModalClose}
      />
      <div className="d-flex">
        <Sidebar
          sideBarOpen={sideBarOpen}
          handleSidebarClose={handleSidebarClose}
        />
        <div
          className="d-flex justify-content-between justify-content-lg-end px-2 
        align-items-center logout_container  
        position-fixed  white_bg "
        >
          <div
            onClick={() => setSideBarOpen(!sideBarOpen)}
            className={`menu_icon_container`}
          >
            <img src={menuIcon} alt="menu_icon" />
          </div>
          <div className="d-flex gap-3 align-items-center">
            <SOSEmercencyList />
            <div
              className="pe-4 fs_16 fw_600 position-relative cursor_pointer"
              onClick={() => setLogoutPopup(!logoutPopup)}
              ref={onClickRef}
            >
              <img src={toggleIcon} width={15} height={15} alt="icon" />
            </div>
            {logoutPopup ? (
              <>
                <div
                  className="rider_more_option_container white_bg border_radius_7px mt-4 me-3"
                  ref={insideClickRef}
                >
                  <ul className="menu_list p-2 mb-0 primary_color fs_16 fw_600 text-end">
                    <li className="">
                      <button
                        className={
                          "background_none border_none primary_color fs_16 fw_600 cursor_pointer"
                        }
                        type="button"
                        onClick={() => {
                          handleLogoutModalShow();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                    <hr className="list_underline m-1" />
                    <li className="">
                      <button
                        className={
                          "background_none border_none primary_color fs_16 fw_600 cursor_pointer"
                        }
                        type="button"
                        onClick={() => {
                          handleResetPasswordShow();
                        }}
                      >
                        Reset Password
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="main_layout_container ms-auto">
          <div className="mt-4 pt-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
