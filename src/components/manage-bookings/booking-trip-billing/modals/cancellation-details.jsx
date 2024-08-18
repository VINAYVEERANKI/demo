import React from "react";
import Modal from "react-bootstrap/Modal";
import "../../manage-bookingsComponents.css";
import Okaybtn from "../../../utilits/buttons/okaybtn";
import moment from "moment";

const CancellationDetails = ({
  cancellationDetailsShow,
  handleCancellationDetailsClose,
  cancelledBookingData,
}) => {
  const cancelDetails = [
    {
      label: "Cancelled at",
      value: cancelledBookingData?.tripInformation?.cancelled_at
        ? moment(cancelledBookingData?.tripInformation?.cancelled_at).format(
            "DD-MM-YYYY   , HH:mm"
          )
        : "--",
      textarea: false,
    },
    {
      label: "Cancelled by",
      value: cancelledBookingData?.tripInformation?.cancelled_by
        ? cancelledBookingData?.tripInformation?.cancelled_by
        : "--",
      textarea: false,
    },
    {
      label: "Reason",
      value: cancelledBookingData?.tripInformation?.cancellation_reason
        ? cancelledBookingData?.tripInformation?.cancellation_reason
        : "--",
      textarea: true,
    },
  ];
  return (
    <>
      <Modal
        centered
        show={cancellationDetailsShow}
        onHide={handleCancellationDetailsClose}
        dialogClassName="cancellationDetails_width"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <form>
            <span className="primary_color fs_22 fw_500 d-flex justify-content-center mt-1 mb-5">
              Cancellation details
            </span>

            <>
              {cancelDetails?.map((items) => (
                <React.Fragment key={items?.label}>
                  {" "}
                  <div className="row gx-0">
                    <div className="col-3">
                      <span className="primary_color fw_500 ps-4">
                        {items?.label}
                      </span>
                    </div>
                    <div className="col-1">
                      <span className="ps-3 secondary_color">:</span>
                    </div>
                    <div className="col-8">
                      {items?.textarea === true ? (
                        <textarea
                          rows={3}
                          className="resize_none col-11 input_border border_radius_3px mt-1 text-start secondary_color fw_500 fs_14 outline_none ps-2 py-1"
                          placeholder="Expected shorter wait time."
                          value={items.value}
                          disabled
                        ></textarea>
                      ) : (
                        <span className="secondary_color text-start">
                          {items.value}
                        </span>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
            <Okaybtn okayFn={handleCancellationDetailsClose} />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CancellationDetails;
