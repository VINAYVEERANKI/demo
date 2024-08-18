import React, { useEffect, useState } from "react";
import DuesDetails from "./DuesDetails";
import DepositDetails from "./DepositDetails";
import InnerLayout from "../../layout/innerLayout";
import { useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import errorToast from "../../utilits/errorToast";
import { defaultPremiumDuedepositAction, managePremiumDuedepositAction, archivedPremiumDuedepositAction } from "../../../redux/actions/premiumaction/defaultPremiumAction";

const PremDueanddepoDetails = ({ params, premiumtype, managePremiumType }) => {
  console.log(premiumtype, "lajdhka");
  console.log(managePremiumType, "managePremiumType");
  const [reload, setReload] = useState(false);

  const [isDisable, setIsDisable] = useState(false);

  const action = params?.action;
  console.log(params, "akjdask");

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState([]);
  const [defaultDuedepositData, setDefaultDuedepositData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (managePremiumType === "defaultPremium") {
      setLoading(true);
      dispatch(
        defaultPremiumDuedepositAction(
          { ride_type_id: params?.ride_type_id, premium_type: premiumtype },
          onSuccess,
          onError
        )
      );
    } else if (managePremiumType === "managePremium") {
      setLoading(true);
      dispatch(
        managePremiumDuedepositAction(
          { ride_type_id: params?.ride_type_id, premium_type: premiumtype },
          onSuccess,
          onError
        )
      );
    } else if (managePremiumType === "archivedPremium") {
      setLoading(true);
      dispatch(
        archivedPremiumDuedepositAction(
          { ride_type_id: params?.ride_type_id, premium_type: premiumtype },
          onSuccess,
          onError
        )
      );
    }

  }, []);
  console.log(defaultDuedepositData, "ffff");

  const onSuccess = (data) => {
    console.log(data, "data");
    setDefaultDuedepositData(data?.data);
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    console.log(data, "data");
    errorToast(data?.data);
    setErrorMessage(data?.data);
    setError(true);
    setLoading(false);
  };

  return (
    <>
      <InnerLayout
        mainHeading=""
        navigateEnable={false}
        layoutClassname="inner_layout_container"
      >
        <DuesDetails
          action={action}
          premiumtype={premiumtype}
          defaultDuedepositData={defaultDuedepositData}
          params={params}
          setReload={setReload}
          reload={reload}
          managePremiumType={managePremiumType}
          setIsDisable={setIsDisable}
          isDisable={isDisable}
        />
        <DepositDetails
          action={action}
          premiumtype={premiumtype}
          defaultDuedepositData={defaultDuedepositData}
          params={params}
          setReload={setReload}
          reload={reload}
          managePremiumType={managePremiumType}
          setIsDisable={setIsDisable}
          isDisable={isDisable}
        />
      </InnerLayout>
    </>
  );
};

export default PremDueanddepoDetails;
