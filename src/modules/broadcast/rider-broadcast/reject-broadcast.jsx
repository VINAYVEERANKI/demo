import React from 'react'
import { useLocation, useParams } from 'react-router'
import Broadcastdetails from '../../../components/broadcast/broadcastdetails'

const RejectRiderBroadcast = () => {
  const params=useParams();
  const location = useLocation();
  return (
    <>
    <Broadcastdetails params={params} location={location} type={"Rider"}/>
  </>
  )
}

export default RejectRiderBroadcast;