import React from "react";

const TableSortField = ({
  show,
  title,
  sortOrder,
  onClick,
  sortColumn,
  filter_icon = "primary_color",
}) => {
  const isAscending = sortOrder === "ASCE";

//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortOrder, setSortOrder] = useState("DESC");

//   const handleSortClick = (columnValue) => {
//     if (columnValue === sortColumn) {
//       setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
//     } else {
//       setSortColumn(columnValue);
//       setSortOrder("ASC");
//     }
//   };


  return (
    <th scope="col" onClick={onClick}>
      <span className="dropdown d-flex align-items-center text-nowrap">
        <span className={`primary_color fs_14 fw_500`}>{title}</span>
        {show && (
          <span className="ml-1">
            {isAscending ? (
              <span className="sort-arrow">
                <i className={`ri-arrow-up-line ${filter_icon}`}></i>
              </span>
            ) : (
              <span className="sort-arrow">
                <i className={`ri-arrow-down-line ${filter_icon}`}></i>
              </span>
            )}
          </span>
        )}
      </span>
    </th>
  );
};

export default TableSortField;
