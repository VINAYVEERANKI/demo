import React, { useEffect, useState } from "react";
import "../../manageDriversComponents.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import SuccessMessagemodal from "../../../modals/successMessageModal";
import successToast from "../../../utilits/successToast";
import errorToast from "../../../utilits/errorToast";
import { driverProfileEditAction } from "../../../../redux/actions/manageDriversAction";
import { useDispatch } from "react-redux";
import DriverProfileDocumentEdit from "./profileDocument";

const DriversProfileDocument = ({
  profileData,
  driverDetails,
  profileEditDisabled,
  setProfileEditDisabled,
  setVehicleDetailsDisabled,
  driverData,
  setDriverData,
  type,
  setIs_approve
}) => {

  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    setDriverData(!driverData);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);
  const [loading, setLoading] = useState(false);

  console.log(driverDetails, "ajksdkasda");


  const formikField = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: driverDetails?.first_name ? driverDetails?.first_name : "",
      lastName: driverDetails?.last_name ? driverDetails?.last_name : "",
      DOB: driverDetails?.dob
        ? moment(driverDetails?.dob).format("YYYY-MM-DD")
        : "",
      phoneNumber: driverDetails?.phone_number
        ? driverDetails?.phone_number
        : "",
      emailId: driverDetails?.email ? driverDetails?.email : "",
      gender: driverDetails?.gender ? driverDetails?.gender : "",
      registeredZone: driverDetails?.registered_zone
        ? driverDetails?.registered_zone
        : "",
      adminComments: driverDetails?.admin_comments
        ? driverDetails?.admin_comments
        : "",
      driverType: driverDetails?.driver_type ? driverDetails?.driver_type : "",
      action: "saveChanged",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().trim().required("Required"),
      lastName: Yup.string().trim().required("Required"),
      DOB: Yup.string()
        .test("DOB", "must be above 18 years", (value) => {
          return moment().diff(moment(value), "years") >= 18;
        })
        .trim()
        .required("Required"),
      phoneNumber: Yup.string().trim().required("Required"),
      emailId: Yup.string()
        .email("must be valid email")
        .trim()
        .required("Required"),
      adminComments: Yup.string().trim().required("Required"),
      gender: Yup.string().trim().required("Required"),
      registeredZone: Yup.string().trim().required("Required"),
      driverType: Yup.string().trim().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(
        driverProfileEditAction(
          driverDetails?.id,
          {
            first_name: values?.firstName,
            last_name: values?.lastName,
            gender: values?.gender,
            dob: values?.DOB,
            email: values?.emailId,
            registered_zone: values?.registeredZone,
            phone_number: values?.phoneNumber,
            driver_type: values?.driverType,
            admin_comments: values?.adminComments,
          },
          onSuccess,
          onError
        )
      );
    },
  });

  useEffect(() => {
    const hasEmptyValues = Object.values(formikField?.values).some(
      (value) => value === "" || value === null || value === undefined
    );

    if (hasEmptyValues) {
      setIs_approve(true);
    } else {
      setIs_approve(false);
    }
  }, [formikField.values]);

  function ChangeMadeSuccessFull() {
    if (
      JSON.stringify(formikField.initialValues) !==
      JSON.stringify(formikField.values)
    ) {
      handleSuccessMessageShow();
    }
  }
  const onSuccess = (data) => {
    console.log(data, "sdfsdfsfd");
    setLoading(false);
    if (
      JSON.stringify(formikField.initialValues) !==
      JSON.stringify(formikField.values)
    ) {
      successToast(data?.data);
    }
    ChangeMadeSuccessFull();
    setEditable(!editable);
    setProfileEditDisabled(false);
    setVehicleDetailsDisabled(false);
  };
  const onError = (data) => {
    setLoading(false);
    setDriverData(false);
    errorToast(data?.data?.data);
  };


  console.log(editable, "ajdhjdsadda");

  return (
    <div className="mt-2 ">
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Changes made Successfully!`}
      />
      <DriverProfileDocumentEdit
        setEditable={setEditable}
        editable={editable}
        profileData={profileData}
        formik={formikField}
        profileEditDisabled={profileEditDisabled}
        setProfileEditDisabled={setProfileEditDisabled}
        driverDetails={driverDetails}
        setVehicleDetailsDisabled={setVehicleDetailsDisabled}
        loading={loading}
        type={type}
      />
    </div>
  );
};

export default DriversProfileDocument;
