import React from "react";
import "../../../components/coupons/riderCoupons/coupon-component.css";

const CouponSidebar = ({ sideBarData, moreZone, zoneName }) => {
  return (
    <div>
      <table className="fs_14 fw_500">
        <tbody>
          {sideBarData?.map((item, index) => {
            return (
              <React.Fragment key={item?.label}>
                {item?.heading && (
                  <tr className="">
                    <td
                      className="fs_16 primary_color fw_500 text_underline pt-3 pb-2"
                      colSpan="2"
                    >
                      {item?.heading}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="secondary_color pe-2 w-50">{item?.label}</td>
                  <td
                    className={`primary_color position-relative d-flex align-items-center`}
                  >
                    {item?.value}
                    {item?.label === "Coupon Applicable Zone"
                      ? moreZone === true && (
                          <div className="position-absolute moreZone_container mt-2 p-2">
                            <span>{zoneName.join(", ")}</span>
                            {/* <div>
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                              kjhjghcvkulhlkhnlkhljkhlskc sdjbkjfb
                              sjdfkjsbfjdsbf sdkjfbsjfb sdkfjlfbls sjdfbljfb
                            </div> */}
                          </div>
                        )
                      : ""}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default CouponSidebar;
