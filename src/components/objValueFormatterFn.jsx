import React from "react";

const ObjValueFormatterFn = (values = {}, booleanValue = false) => {
  const keys = Object.entries(values)
    .filter(([_, value]) => value === true)
    .map(([key]) => key);

  if (keys.length === 0) {
    return "--";
  }
  return (
    <>
      {keys.map((key, index) => (
        <React.Fragment key={key}>
          {key}
          {index < keys.length - 1 && (
            <>
              <span className="fw_600 fs_16">
                {" ;"}
                {booleanValue ? <br /> : <></>}{" "}
              </span>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default ObjValueFormatterFn;
