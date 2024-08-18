import React from 'react'
import { useLocation, useParams } from 'react-router'
import Broadcastdetails from '../../../components/broadcast/broadcastdetails'

const ReviewReqDriverBroadcast = () => {
  const params=useParams();
  const location = useLocation();
  return (
    <>
    <Broadcastdetails params={params} location={location} type={"Driver"}/>
    </>
  )
}

export default ReviewReqDriverBroadcast