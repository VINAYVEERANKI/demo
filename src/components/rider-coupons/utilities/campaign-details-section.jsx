import React from "react";

const CampaignDetailsSection = ({broadcastData}) => {
  return (
    <div className="mt-3">
      <span className="text_underline fs_16 fw_500 primary_color">
        Campaign Details*
      </span>
      <table className="fs_12 fw_500 mt-2">
        <tr>
          <td className="secondary_color">Activation At</td>
          <td className="primary_color ps-4">
            {" "}
            {broadcastData?.startDate ? broadcastData?.startDate : "--"},{" "}
            {broadcastData?.startTime ? broadcastData?.startTime : "--"}
          </td>
        </tr>
        <tr>
          <td className="secondary_color">Expiry At</td>
          <td className="primary_color ps-4">
            {broadcastData?.expiryDate ? broadcastData?.expiryDate : "--"},{" "}
            {broadcastData?.expiryTime ? broadcastData?.expiryTime : "--"}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CampaignDetailsSection;
