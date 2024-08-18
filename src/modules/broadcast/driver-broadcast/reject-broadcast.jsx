import React from 'react'
import { useLocation, useParams } from 'react-router'
import Broadcastdetails from '../../../components/broadcast/broadcastdetails'

const RejectDriverBroadcast = () => {
  const params=useParams();
  const location = useLocation();
  return (  
    <> 
    <Broadcastdetails params={params} location={location} type={"Driver"}/>
    </>
  )
}

export default RejectDriverBroadcast;