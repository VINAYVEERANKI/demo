import React, { useEffect, useState } from "react";
import "./tables.css";
import { tollsFareValueAction } from "../../../../redux/actions/defaultFareAction";
import { useDispatch } from "react-redux";
import usePermissions from "../../../usePermissionChecker";
import FaresInputTable from "../../faresInputTable";
import LoadingSpinnerTable from "../../../utilits/loadingSpinnerTable";

const TollsTable = () => {
  const { canWrite } = usePermissions();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tollsDefaultTable, setTollsDefaultTable] = useState(false);
  const [tollsData, setTollsData] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(tollsFareValueAction(onSuccess, onError));
  }, [tollsDefaultTable]);
  const onSuccess = (data) => {
    setLoading(false);
    setTollsData(data?.data);
  };
  const onError = (data) => {
    setLoading(false);
    console.log(data?.data?.data);
  };

  const keyOrderForToll = ["toll_fare"];
  const [editingStatus, setEditingStatus] = useState({});

  return (
    <>
      <div className="scrollable_table_container pe-3 ps-1">
        {loading ? (
          <LoadingSpinnerTable />
        ) : (
          <>
            <FaresInputTable
              faresData={tollsData}
              keyOrder={keyOrderForToll}
              editingStatus={editingStatus}
              setEditingStatus={setEditingStatus}
              disableTable={Object.values(editingStatus).some((value) =>
                Object.values(value).includes(true)
              )}
              tableType="TollTable"
              mainType={"TollDefaultFare"}
              reload={tollsDefaultTable}
              setReload={setTollsDefaultTable}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TollsTable;
