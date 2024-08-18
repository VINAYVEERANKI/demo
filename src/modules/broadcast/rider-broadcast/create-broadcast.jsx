import React from "react";
import RiderBroadcastdetails from "../../../components/broadcast/broadcastdetails";
import { useLocation } from "react-router";

const CreateRiderbroadcast = () => {
  const location = useLocation();
 
  return (
    <>
      <RiderBroadcastdetails location={location} type={"Rider"}/>
    </>
  );
};

export default CreateRiderbroadcast;
