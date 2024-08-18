import React from "react";

const RentalPriceRow = ({
  index,
  fieldPrefix,
  fieldName,
  formik,
  editedIndex,
  isEditing,
  isEditableRow,
  edittttt,
}) => {
  const fullFieldName = `${fieldPrefix}[${index}].${fieldName}`;

  console.log(fullFieldName, "asdddssdasdsdad");

  return (
    <>
      {isEditableRow && edittttt === "true" ? (
        <>
          <input
            type="text"
            name={fullFieldName}
            value={formik.values?.[fieldPrefix]?.[index]?.[fieldName] || ""}
            onChange={formik.handleChange}
            // disabled={editedIndex !== index || !isEditing}
            onBlur={formik.handleBlur}
            className={
              formik.errors?.[fieldPrefix]?.[index]?.[fieldName] &&
              formik.touched?.[fieldPrefix]?.[index]?.[fieldName]
                ? "price_input_error text-center"
                : `text-center ${"ridetype_input"}`
            }
          />
          {formik.errors?.[fieldPrefix]?.[index]?.[fieldName] &&
            formik.touched?.[fieldPrefix]?.[index]?.[fieldName] && (
              <div className="red_color fs_10 fw_500">
                {formik.errors?.[fieldPrefix]?.[index]?.[fieldName]}
              </div>
            )}
        </>
      ) : (
        <>
          <input
            type="text"
            name={fullFieldName}
            value={formik.values?.[fieldPrefix]?.[index]?.[fieldName] || ""}
            onChange={formik.handleChange}
            disabled={editedIndex !== index || !isEditing}
            onBlur={formik.handleBlur}
            className={
              formik.errors?.[fieldPrefix]?.[index]?.[fieldName] &&
              formik.touched?.[fieldPrefix]?.[index]?.[fieldName]
                ? "price_input_error text-center"
                : `text-center ${
                    editedIndex !== index || !isEditing
                      ? "ridetype_input_disabled"
                      : "ridetype_input"
                  }`
            }
          />
          {formik.errors?.[fieldPrefix]?.[index]?.[fieldName] &&
            formik.touched?.[fieldPrefix]?.[index]?.[fieldName] && (
              <div className="red_color fs_10 fw_500">
                {formik.errors?.[fieldPrefix]?.[index]?.[fieldName]}
              </div>
            )}
        </>
      )}
    </>
  );
};

export default RentalPriceRow;
