import React from 'react'
import { useLocation, useParams } from "react-router";
import DriverIncentiveBroadcast from "../../../../components/incentives/driverIncentives/driverIncentiveBroadcast";

const DriverIncentiveDeletedbroadcast = () => {
  const location = useLocation();
  const params = useParams();
  return (
    <>
    <DriverIncentiveBroadcast location={location} params={params} />
  </>
  )
}

export default DriverIncentiveDeletedbroadcast;