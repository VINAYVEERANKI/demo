import React from "react";
import ViewEditNotification from "../../components/nse/Rider-View-Edit-Notification";
import { useLocation, useParams } from "react-router";

const MotificationSmsdriver = () => {
  const params = useParams();

  return (
    <div>
      <ViewEditNotification params={params} type={"Driver"} />
    </div>
  );
};

export default MotificationSmsdriver;
