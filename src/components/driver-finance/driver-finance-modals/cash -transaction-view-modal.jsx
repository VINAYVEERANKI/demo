import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import RefundDetails from "../../refund/refund-details";
import moment from "moment";
import useDisplayToggle from "../../useDisplayToggle";
import { NavLink } from "react-router-dom";
import { driverNavigateFn } from "../../helper";
const CashTransactionViewModal = ({ show, handleClose, transHistory }) => {
  console.log(transHistory, "skfdhd");
  const [transHistoryDetails, setTransHistoryDetails] = useState(false);
  const transactionData = [
    {
      label: "Driver ID",
      values: transHistory?.driver?.driver_id2 ?? "--",
      navLink: true,
      link: driverNavigateFn(transHistory?.driver, transHistory?.driver?.id),
    },
    {
      label: "First Name",
      values: transHistory?.driver?.first_name
        ? transHistory?.driver?.first_name
        : "--",
    },
    {
      label: "Last Name",
      values: transHistory?.driver?.last_name
        ? transHistory?.driver?.last_name
        : "--",
    },
    {
      label: "Phone Number",
      values: transHistory?.driver?.phone_number
        ? transHistory?.driver?.phone_number
        : "--",
    },
    { label: "Current Balance(₹)", values: "--" },
    {
      label: "Transaction ID",
      values: transHistory?.transaction_id
        ? transHistory?.transaction_id
        : "--",
    },
    {
      label: "Transaction Amount(₹)",
      values: transHistory?.transaction_amount
        ? transHistory?.transaction_amount
        : "--",
    },
    {
      label: "Notes*",
      values: transHistory?.notes ? transHistory?.notes : "--",
    },
  ];
  const transHistoryDetailsData = [
    {
      label: "Created at",
      values: transHistory?.createdAt
        ? moment(transHistory?.createdAt).format("DD-MM-YYYY,hh:mm A")
        : "--",
    },
    {
      label: "Created by",
      values: transHistory?.CreatedBy?.user_name
        ? transHistory?.CreatedBy?.user_name
        : "--",
    },
  ];
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setTransHistoryDetails,
  });
  return (
    <>
      <Modal show={show} centered backdrop={"static"} keyboard={false}>
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="primary_color fs_18 pt-1 fw_500 ms-2">
              <span>TRSID012345</span>
            </div>
            <div onClick={() => handleClose()} className="cursor_pointer">
              <i className="ri-close-circle-fill primary_color fs_20"></i>
            </div>
          </div>
          <hr className="light_grey_bg mt-2 mb-1" />
          <div
            className="light_blue_color details_text fs_16 fw_500 cursor_pointer position-relative d-flex justify-content-end pe-4"
            onClick={() => setTransHistoryDetails(!transHistoryDetails)}
            ref={onClickRef}
          >
            Details
          </div>
          {transHistoryDetails ? (
            <>
              <div
                className="cancelled_refund_details_container border white_bg border_radius mt-2 py-2"
                ref={insideClickRef}
              >
                {/* <div className='ps-2'>Details</div> */}
                <table>
                  <tbody>
                    {transHistoryDetailsData.map((items) => {
                      return (
                        <tr className="">
                          <td className="secondary_color text-nowrap fw_600 fs_12 text-start ps-2">
                            {" "}
                            {items.label}
                          </td>
                          <td className="ps-2 pe-1 secondary_color fs_12 fw_600 text-nowrap">
                            :
                          </td>
                          <td className="primary_color fs_14 fw_600 text-start text-nowrap">
                            {items.values}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
          {/* {transHistoryDetails ? (
            <>
              <div className="cancelled_refund_details_container border white_bg border_radius mt-2" >
                {transHistoryDetailsData.map((items)=>{
                  return(
                    <div className='dflex'>
                    <div>{items.label}</div>
                    <div>{items.values}</div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : null} */}
          <div className="row gx-0">
            {transactionData?.map((item) => {
              return (
                <>
                  <div className="col-6">
                    <span className="secondary_color fw_400 fs_15 ps-sm-4">
                      {item?.label}
                    </span>
                  </div>

                  <div className="col-6">
                    <span className="cement_color text-start fw_400 fs_15">
                      {item?.navLink ? (
                        <NavLink className={"cement_color"} to={item?.link}>
                          {item?.values}
                        </NavLink>
                      ) : (
                        item?.values
                      )}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CashTransactionViewModal;
