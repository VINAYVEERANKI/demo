import React from "react";
import Modal from "react-bootstrap/Modal";
import Okaybtn from "../../utilits/buttons/okaybtn";

const CashTransactionSuccessModal = ({
  show,
  handleSuccessMessageModalClose,
  title,
  title_color = "primary_color",
  driverData,
  formik,
  type,
  switchAmount,
}) => {
  console.log(type, "kasdlakd");
  const subSectionData = [
    {
      title: "Estimated Current Balance",
      values:
        formik?.values?.costtype === "+"
          ? driverData?.current_balance +
            parseInt(formik?.values.transactionamt, 10)
          : driverData?.current_balance -
            parseInt(formik?.values.transactionamt, 10),
      display: type === "current_balance" ? true : false,
    },
    {
      title: "Transaction Amount",
      values: switchAmount,
      display: type === "Switch" || type === "Schedule" ? true : false,
    },
  ];
  return (
    <>
      {/* <DriverFinanaceMainTable refresh={refresh}/> */}
      <Modal
        show={show}
        centered
        keyboard={false}
        backdrop={"static"}
        handleSuccessMessageModalClose
      >
        <Modal.Body>
          <div className="d-flex justify-content-center mt-3">
            <span className={`fs_20 ${title_color} fw_500 text-center`}>
              {title}
            </span>
          </div>
          {subSectionData
            ?.filter((item) => item?.display === true)
            ?.map((items) => {
              return (
                <div className="d-flex justify-content-center pt-3">
                  <div className="raven_color fw_400">{items.title}</div>
                  <div className="ps-4">{items.values}</div>
                </div>
              );
            })}
          <div className="d-flex justify-content-center">
            <Okaybtn
              okayFn={() => {
                handleSuccessMessageModalClose();
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CashTransactionSuccessModal;
