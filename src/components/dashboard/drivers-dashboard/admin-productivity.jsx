import React, { useState } from "react";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import LoadAndError from "../../utilits/loadAndError";
import SearchInputfield from "../../form/searchInputfield";
import { useSortableData } from "../../helper";
import styles from "../../../modules/manage-admins/manage-admins.module.css"

const AdminProductivity = ({ type = "" }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const [checkList, setCheckList] = useState();
    const [activeSortIndex, setActiveSortIndex] = useState(null);
    const [driverFinanceDataList, setDriverFinanceDataList] = useState([]);
    const { items, requestSort, sortConfig } = useSortableData(
        driverFinanceDataList
    );

    const tableHeading = [
        { title: "Driver ID", value: "driver.driver_id2", display: true, },
        { title: "Zone", value: "registered_zone_name.zone_name", display: true },
        { title: "First Name", value: "driver.first_name", display: true },
        { title: "Last Name", value: "driver.last_name", display: true },
        { title: "Phone number", value: "phone_number", display: true },
        {
            title: "Amount(₹)",
            value: "transaction_amount",
            display: type === "CashTansactionsHistory" ? true : false,
        },
        {
            title: "Transaction ID",
            value: "transaction_id",
            display: type === "CashTansactionsHistory" ? true : false,
        },
        {
            title: "Transaction Date & Time",
            value: "created_at",
            display: type === "CashTansactionsHistory" ? true : false,
        },
        {
            title: "Created by",
            value: "CreatedBy.user_name",
            display: type === "CashTansactionsHistory" ? true : false,
        },
        {
            title: "Driver Type",
            value: "driver_type",
            display: type === "cashoutBalanceHistory" ? true : false,
        },
        {
            title: "Current Balance(₹)",
            value: "current_balance",
            display: type === "cashoutBalanceHistory" ? true : false,
        },
        {
            title: "Cashout Amount(₹)",
            value: "cashout_amount",
            display: type === "cashoutBalanceHistory" ? true : false,
        },
    ];


    function checkboxChecker(e) {
        if (checkList === e.target.id) {
            setCheckList("");
        } else {
            setCheckList(e.target.id);
        }
    }

    return (
        <div>
            <h4 className={`primary_color`}>Admin Productivity</h4>
            <div>
                {loading && <LoadingSpinnerTable />}
                <table className="table text-nowrap">
                    <thead>
                        <tr className="pale_blue_bg">
                            <th scope="col" className={`${styles.first_list} transparent_bg`}>
                                <input
                                    type="checkbox"
                                    className="manage_fare_checkbox_row ms-2"
                                    id="mastercheck"
                                />
                            </th>

                            {tableHeading
                                ?.filter((item) => item?.display === true)
                                .map((item, index) => {
                                    const isActiveSortIndex = activeSortIndex === index;
                                    return (
                                        <SearchInputfield
                                            title={item?.title}
                                            requestSort={requestSort}
                                            sortName={item?.value}
                                            key={item?.title}
                                            index={index}
                                            isActiveSortIndex={isActiveSortIndex}
                                            setActiveSortIndex={setActiveSortIndex}
                                            sortConfig={sortConfig}
                                        />
                                    );
                                })}
                            <th className={`${styles.last_list} transparent_bg`}></th>
                        </tr>
                    </thead>

                    {/* <tbody className="light_blue_bg">
                        <LoadAndError
                            loader={loading}
                            error={error}
                            // status={driverFinanceDataList?.length === 0}
                            errorMessage={errorMessage}
                        >
                            {items?.map((item) => (
                                <tr>
                                    <th scope="row">
                                        <input
                                            type="checkbox"
                                            className="manage_fare_checkbox ms-2"
                                            onChange={checkboxChecker}
                                        />
                                    </th>
                                    <td>
                                        <NavLink
                                            className={"secondary_color fs_14 fw_500"}
                                            to={driverNavigateFn(item?.driver, item?.driver?.id)}
                                        >
                                            {item?.driver?.driver_id2 ?? "--"}
                                        </NavLink>
                                    </td>
                                    <td>
                                        <span className="secondary_color fs_14 fw_500">
                                            {item?.driver?.registered_zone_name?.zone_name
                                                ? item?.driver?.registered_zone_name?.zone_name
                                                : "--"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="secondary_color fs_14 fw_500">
                                            {item?.driver.first_name
                                                ? item?.driver.first_name
                                                : "--"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="secondary_color fs_14 fw_500">
                                            {item?.driver.last_name
                                                ? item?.driver.last_name
                                                : "--"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="secondary_color fs_14 fw_500">
                                            {item?.driver.phone_number
                                                ? item?.driver.phone_number
                                                : "--"}
                                        </span>
                                    </td>
                                    {type === "CashTansactionsHistory" ? (
                                        <>
                                            <td>
                                                <span
                                                    className={`secondary_color fs_14 fw_500 ${item?.current_balance < 0 ? "error_color" : ""
                                                        }`}
                                                >
                                                    {item?.transaction_amount
                                                        ? item?.transaction_amount
                                                        : "--"}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="secondary_color fs_14 fw_500">
                                                    {item?.transaction_id
                                                        ? item?.transaction_id
                                                        : "--"}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="secondary_color fs_14 fw_500">
                                                    {item?.created_at
                                                        ? moment(item?.created_at).format(
                                                            "DD-MM-YYYY,HH:MM"
                                                        )
                                                        : "--"}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="secondary_color fs_14 fw_500">
                                                    {item?.CreatedBy.user_name
                                                        ? item?.CreatedBy.user_name
                                                        : "--"}
                                                </span>
                                            </td>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {type === "cashoutBalanceHistory" ? (
                                        <>
                                            <td>
                                                <span className="secondary_color fs_14 fw_500">
                                                    {item?.driver?.driver_type
                                                        ? removeUnderScore(item?.driver?.driver_type)
                                                        : "--"}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="secondary_color fs_14 fw_500">
                                                    {item?.driver?.current_balance
                                                        ? item?.driver?.current_balance
                                                        : "--"}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="secondary_color fs_14 fw_500">
                                                    {item?.cashout_amount
                                                        ? item?.cashout_amount
                                                        : "--"}
                                                </span>
                                            </td>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {type === "cashoutBalanceHistory" ? (
                                        <>
                                            <td className="">
                                                <NavLink
                                                    className="border_none border_radius fs_13 me-4 text-decoration-none fw_500 px-3 py-1 white_color blue_color_bg view_text"
                                                    to={`/driver-finance-cashout-balance-details/${item?.driver_id}`}
                                                >
                                                    View
                                                </NavLink>
                                            </td>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {type === "CashTansactionsHistory" ? (
                                        <>
                                            <td>
                                                <span
                                                    className="fw_500 border_none border_radius fs_13 text-decoration-none blue_color_bg white_color px-3 py-1 cursor_pointer"
                                                    // onClick={() => setShowNewModal(true)}
                                                    onClick={() => onClickFn(item?.id)}
                                                >
                                                    View
                                                </span>
                                            </td>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </tr>
                            ))}
                        </LoadAndError>
                    </tbody> */}
                </table>
            </div>
        </div>
    );
};

export default AdminProductivity;

