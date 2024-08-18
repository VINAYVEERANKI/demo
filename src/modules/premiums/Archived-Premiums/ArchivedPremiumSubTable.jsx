import React from 'react'
import { useLocation, useParams } from "react-router";
import ArchivedViewTable from '../../../components/premiums/tables/ArchivedSubTable';

const ArchivedPremiumViewTable = () => {
    const location = useLocation();
    const params = useParams();
    return (
      <div>
        <ArchivedViewTable location={location} params={params}/>
      </div>
    );
  };

export default ArchivedPremiumViewTable