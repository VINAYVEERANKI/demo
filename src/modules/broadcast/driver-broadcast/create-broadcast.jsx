import React from "react";
import { useLocation } from "react-router";
import Broadcastdetails from "../../../components/broadcast/broadcastdetails";

const CreateDriverbroadcast = () => {
  const location = useLocation();
 
  return (
    <>
      <Broadcastdetails location={location} type={"Driver"}/>
      </>
  );
};

export default CreateDriverbroadcast;
