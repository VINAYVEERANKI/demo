import React from "react";
import LeftIcon from "../../assets/icons/left-icon";
import RightIcon from "../../assets/icons/right-icon";

const TablePaginations = ({
  currentPage,
  pageData,
  paginate,
  limit = 15,
  handleChange,
}) => {
  return (
    <div className="adminuser_table_pagination__container rounded-4 white_shade_bg py-2  w-100">
      <div className="fn-Roboto ms-auto align-items-center justify-content-end gap-2 d-flex fs_13 fw_500 me-0 pe-1 me-sm-4 pe-sm-2 darker_grey_color">
        <span className="fs_16">
          {/* <input
            onChange={(e) => {
              handleChange(e);
            }}
          /> */}
          {currentPage + 1} / {pageData?.noOfPages}
          {/*  : `${currentPage+1} / ${pageData?.noOfPages} `} */}
        </span>
        <div className="d-flex align-items-center gap-4 ">
          <span
            onClick={() => {
              paginate("-");
            }}
            className={`cursor_pointer`}
          >
            <LeftIcon fill="#707070" width={23} height={23} />
          </span>
          <span
            onClick={() => {
              paginate("+");
              // handleChange();
            }}
            className="mt-1 cursor_pointer"
          >
            <RightIcon fill="#707070" width={21} height={21} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TablePaginations;
