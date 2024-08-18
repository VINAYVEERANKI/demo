import React, { useState } from "react";

const SearchInputfield = ({
  title,
  search = true,
  colorName = "primary_color",
  dropDownColor = "admin_id_btn",
  requestSort,
  sortName,
  table_border_radius,
  filter_icon = "primary_color",
  index,
  isActiveSortIndex,
  setActiveSortIndex,
  sortConfig,
}) => {
  const isAscending =
    sortConfig &&
    sortConfig.direction === "ascending" &&
    sortConfig.key === sortName;
  const isDescending =
    sortConfig &&
    sortConfig.direction === "descending" &&
    sortConfig.key === sortName;

  return (
    <>
      {search ? (
        <th scope="col" className={`${table_border_radius} transparent_bg`}>
          <span
            className="d-flex  align-items-center cursor_pointer"
            onClick={() => {
              setActiveSortIndex(index);
              if (sortConfig && sortConfig.key === sortName) {
                requestSort(sortName, sortConfig.type);
              } else {
                requestSort(sortName);
              }
            }}
          >
            <span className={`${colorName} fs_14 fw_500 text-nowrap`}>
              {title}
            </span>
            {isActiveSortIndex && isAscending && (
              <span className="sort-arrow">
                <i className={`ri-arrow-up-line ${filter_icon}`}></i>
              </span>
            )}
            {isActiveSortIndex && isDescending && (
              <span className="sort-arrow">
                <i className={`ri-arrow-down-line ${filter_icon}`}></i>
              </span>
            )}
          </span>
        </th>
      ) : (
        <th scope="col">
          <span className="dropdown d-flex align-items-center text-nowrap">
            <span className={`${colorName} fs_14 fw_500`}>{title}</span>
          </span>
        </th>
      )}
    </>
  );
};

export default SearchInputfield;
