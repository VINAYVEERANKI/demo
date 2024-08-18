import React from "react";
import ViewEditNotification from "../../components/nse/Rider-View-Edit-Notification";
import { useLocation, useParams } from "react-router";

const NotificationSms = () => {
  const params = useParams();
  return (
    <div>
      <ViewEditNotification params={params} type={"Rider"} />
    </div>
  );
};

export default NotificationSms;
