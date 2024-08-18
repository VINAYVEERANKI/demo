import React from "react";
import DashboardInnerLayout from "../../../layout/dashboardInnerLayout";
import SelectField from "../../../form/selectField";

const AnalysisDriverMetrics = () => {
  return (
    <DashboardInnerLayout heading={"Driver Metrics"}>
      <div>
        <SelectField label={"Data Range"} />
      </div>
    </DashboardInnerLayout>
  );
};

export default AnalysisDriverMetrics;
