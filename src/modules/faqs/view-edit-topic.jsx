import React from "react";
import InnerLayout from "../../components/layout/innerLayout";
import { useLocation, useParams } from "react-router";
import FaqTopicEditTable from "../../components/FAQs/faqTopicEditTable";

const ViewEditTopic = () => {
  const params = useParams();
  const location = useLocation();

  console.log(params);
  return (
    <>
 
      <FaqTopicEditTable params={params} location={location} />
    </>
  );
};

export default ViewEditTopic;
