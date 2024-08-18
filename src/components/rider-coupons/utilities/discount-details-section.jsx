import React from "react";

const DiscountDetailsSection = ({ broadcastData, couponData }) => {
  console.log(broadcastData);

  return (
    <div className="mt-3">
      <span className="text_underline fs_16 fw_500 primary_color">
        Discount Details*
      </span>
      <table className="fs_12 fw_500 mt-2">
        {couponData?.couponClassification === "PaymentMethod" && (
          <tr>
            <td className="secondary_color">Payment Method</td>
            <td className="primary_color ps-2">
              {broadcastData?.paymentMethod
                ? broadcastData?.paymentMethod
                : "--"}
            </td>
          </tr>
        )}
        {couponData?.couponClassification === "BookingDestination" && (
          <>
            <tr>
              <td className="secondary_color">Booking Destination Type</td>
              <td className="primary_color ps-2">
                {broadcastData?.bookingDestinationType
                  ? broadcastData?.bookingDestinationType
                  : "--"}
              </td>
            </tr>
            <tr>
              <td className="secondary_color">Booking Destination</td>
              {broadcastData?.bookingDestinationType === "Special Zone" && (
                <td className="primary_color ps-2">
                  {broadcastData?.B_D_sepical_zone
                    ? broadcastData?.B_D_sepical_zone
                    : "--"}
                </td>
              )}
              {broadcastData?.bookingDestinationType ===
                "Local Defined City" && (
                <td className="primary_color ps-2">
                  {broadcastData?.local_defined_city
                    ? broadcastData?.local_defined_city
                    : "--"}
                </td>
              )}
              {broadcastData?.bookingDestinationType ===
                "Outstation Defined City" && (
                <td className="primary_color ps-2">
                  {broadcastData?.outstation_defined_city
                    ? broadcastData?.outstation_defined_city
                    : "--"}
                </td>
              )}
            </tr>
          </>
        )}
        {couponData?.couponClassification ===
          "PickupToDropoff" && (
          <>
            <tr>
              <td className="secondary_color">Pickup Location Type</td>
              <td className="primary_color ps-2">
                {broadcastData?.pickUpLocationType
                  ? broadcastData?.pickUpLocationType
                  : "--"}
              </td>
            </tr>
            <tr>
              <td className="secondary_color">Pickup Location </td>
              <td className="primary_color ps-2">
                {broadcastData?.pickupLocation
                  ? broadcastData?.pickupLocation
                  : "--"}
              </td>
            </tr>
            <tr>
              <td className="secondary_color">Drop-Off Location Type</td>
              <td className="primary_color ps-2">
                {broadcastData?.dropOffLocationType
                  ? broadcastData?.dropOffLocationType
                  : "--"}
              </td>
            </tr>
            <tr>
              <td className="secondary_color">Drop-Off Location</td>
              <td className="primary_color ps-2">
                {broadcastData?.dropOffLocation
                  ? broadcastData?.dropOffLocation
                  : "--"}
              </td>
            </tr>
          </>
        )}
        {couponData?.couponClassification === "RentalPackage" &&
          couponData?.couponClassificationDetails === "Milestone" && (
            <>
              <tr>
                <td className="secondary_color">Rental Package Milestone*</td>
                <td className="primary_color ps-2">
                  {broadcastData?.rentalPackageMilestone
                    ? broadcastData?.rentalPackageMilestone
                    : "--"}
                </td>
              </tr>
            </>
          )}
        {couponData?.couponClassification === "BookingDistance" &&
          couponData?.couponClassificationDetails === "Milestone" && (
            <>
              <tr>
                <td className="secondary_color">
                  Booking Distance Milestone (Km)*
                </td>
                <td className="primary_color ps-2">
                  {broadcastData?.bookingDistanceMilestone
                    ? broadcastData?.bookingDistanceMilestone
                    : "--"}
                </td>
              </tr>
            </>
          )}
        {couponData?.couponClassification === "RentalPackage" &&
          couponData?.couponClassificationDetails === "Rental" && (
            <>
              <tr>
                <td className="secondary_color">
                  Rental Package Range - Start
                </td>
                <td className="primary_color ps-2">
                  {broadcastData?.R_P_range_start
                    ? broadcastData?.R_P_range_start
                    : "--"}
                </td>
              </tr>
              <tr>
                <td className="secondary_color">Rental Package Range - End</td>
                <td className="primary_color ps-2">
                  {broadcastData?.R_P_range_end
                    ? broadcastData?.R_P_range_end
                    : "--"}
                </td>
              </tr>
            </>
          )}

        {couponData?.couponClassification === "BookingDistance" &&
          couponData?.couponClassificationDetails === "Rental" && (
            <>
              <tr>
                <td className="secondary_color">
                  Booking Distance Range (Km) Start
                </td>
                <td className="primary_color ps-2">
                  {broadcastData?.B_D_range_start
                    ? broadcastData?.B_D_range_start
                    : "--"}
                </td>
              </tr>
              <tr>
                <td className="secondary_color">
                  Booking Distance Range (Km) End
                </td>
                <td className="primary_color ps-2">
                  {broadcastData?.B_D_range_end
                    ? broadcastData?.B_D_range_end
                    : "--"}
                </td>
              </tr>
            </>
          )}
        {couponData?.couponClassification === "OutstationPackageDistance" &&
          couponData?.couponClassificationDetails === "Milestone" && (
            <>
              <tr>
                <td className="secondary_color">
                  Outstation Package Milestone (Km)*
                </td>
                <td className="primary_color ps-2">
                  {broadcastData?.outstationPackageMilestone
                    ? broadcastData?.outstationPackageMilestone
                    : "--"}
                </td>
              </tr>
            </>
          )}
        {couponData?.couponClassification === "OutstationPackageDistance" &&
          couponData?.couponClassificationDetails === "Rental" && (
            <>
              <tr>
                <td className="secondary_color">
                  Rental Package Range - Start
                </td>
                <td className="primary_color ps-2">
                  {broadcastData?.O_P_D_range_start
                    ? broadcastData?.O_P_D_range_start
                    : "--"}
                </td>
              </tr>
              <tr>
                <td className="secondary_color">
                  Rental Package Range - End
                </td>
                <td className="primary_color ps-2">
                  {broadcastData?.O_P_D_range_end
                    ? broadcastData?.O_P_D_range_end
                    : "--"}
                </td>
              </tr>
            </>
          )}
        <tr>
          <td className="secondary_color">Coupon Code</td>
          <td className="primary_color ps-2">
            {broadcastData?.coupounCode ? broadcastData?.coupounCode : "--"}
          </td>
        </tr>
        <tr>
          <td className="secondary_color">Coupon Title</td>
          <td className="primary_color ps-2">
            {broadcastData?.couponTitle ? broadcastData?.couponTitle : "--"}
          </td>
        </tr>
        <tr>
          <td className="secondary_color">
            Coupon Description <br />
            (for admins reference)
          </td>
          <td className="primary_color ps-2">
            {" "}
            {broadcastData?.couponDescription
              ? broadcastData?.couponDescription
              : "--"}
          </td>
        </tr>
        <tr>
          <td className="secondary_color">Total Usage Limit</td>
          <td className="primary_color ps-2">10000</td>
        </tr>
        <tr>
          <td className="secondary_color">Usage Limit Per Account</td>
          <td className="primary_color ps-2">
            {" "}
            {broadcastData?.usageLimitPerAccount
              ? broadcastData?.usageLimitPerAccount
              : "--"}
          </td>
        </tr>
        <tr>
          <td className="secondary_color">Coupon Life Span(Days)*</td>
          <td className="primary_color ps-2">--</td>
        </tr>
        {couponData.couponType === "XAmountOff" && (
          <tr>
            <td className="secondary_color">Amount Off (₹)</td>
            <td className="primary_color ps-2">
              {broadcastData?.amountOff ? broadcastData?.amountOff : "--"}
            </td>
          </tr>
        )}
        {couponData.couponType === "X%DiscountUpToY" && (
          <>
            <tr>
              <td className="secondary_color">% Discount</td>
              <td className="primary_color ps-2">
                {broadcastData?.discount ? broadcastData?.discount : "--"}
              </td>
            </tr>
            <tr>
              <td className="secondary_color">Max Discount In Rs</td>
              <td className="primary_color ps-2">
                {broadcastData?.maxAmountInRs
                  ? broadcastData?.maxAmountInRs
                  : "--"}
              </td>
            </tr>
          </>
        )}
        {couponData.couponType === "X%CashbackUpToY" && (
          <>
            <tr>
              <td className="secondary_color">% Cashback</td>
              <td className="primary_color ps-2">
                {broadcastData?.cashback ? broadcastData?.cashback : "--"}
              </td>
            </tr>
            <tr>
              <td className="secondary_color">Max Cashback In Rs</td>
              <td className="primary_color ps-2">
                {broadcastData?.maxCashbackInRs
                  ? broadcastData?.maxCashbackInRs
                  : "--"}
              </td>
            </tr>
          </>
        )}

        <tr>
          <td className="secondary_color">Booking Type</td>
          <td className="primary_color ps-2">
            {/* {broadcastData?.bookingType
            ? broadcastData?.bookingType
            : "--"} */}
            --
          </td>
        </tr>
        <tr>
          <td className="secondary_color">Ride Type</td>
          <td className="primary_color ps-2">
            {/* {broadcastData?.rideType ? broadcastData?.rideType : "--"} */}
            --
          </td>
        </tr>
      </table>
    </div>
  );
};

export default DiscountDetailsSection;
