import React, { useEffect, useRef, useState } from "react";
import FaresInputForm from "../components/manage-fares/faresInputForm";
import "../components/rideType.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
const Test2 = ({ show, onClickOutside }) => {
  // const [editable, setEditable] = useState({});
  // const data = [
  //   {
  //     pricing_module: "PriceModule1",
  //     ride_type: "Auto",
  //     fares_details: {
  //       base_fare: 12,
  //       booking_fee: 0,
  //       parking_fee: 12,
  //       per_km_fare: "",
  //       waiting_fee: 0,
  //       per_min_fare: 0,
  //       cancellation_fee: 0,
  //       transport_hub_fee: 0,
  //     },
  //     status: "Inactive",
  //   },
  //   {
  //     pricing_module: "PriceModule1",
  //     ride_type: "Suv",
  //     fares_details: {
  //       base_fare: 0,
  //       booking_fee: 0,
  //       parking_fee: 0,
  //       per_km_fare: 0,
  //       waiting_fee: 56,
  //       per_min_fare: 0,
  //       cancellation_fee: 0,
  //       transport_hub_fee: 0,
  //     },
  //     status: "Inactive",
  //   },
  //   {
  //     pricing_module: "PriceModule1",
  //     ride_type: "Mini",
  //     fares_details: {
  //       base_fare: 0,
  //       booking_fee: 0,
  //       parking_fee: 0,
  //       per_km_fare: 0,
  //       waiting_fee: 56,
  //       per_min_fare: 0,
  //       cancellation_fee: 0,
  //       transport_hub_fee: 0,
  //     },
  //     status: "Inactive",
  //   },
  //   {
  //     pricing_module: "PriceModule1",
  //     ride_type: "Sedan",
  //     fares_details: {
  //       base_fare: 0,
  //       booking_fee: 0,
  //       parking_fee: 0,
  //       per_km_fare: 0,
  //       waiting_fee: 56,
  //       per_min_fare: 0,
  //       cancellation_fee: 0,
  //       transport_hub_fee: 0,
  //     },
  //     status: "Inactive",
  //   },
  //   {
  //     pricing_module: "PriceModule1",
  //     ride_type: "Bike",
  //     fares_details: {
  //       base_fare: 0,
  //       booking_fee: 0,
  //       parking_fee: 0,
  //       per_km_fare: 0,
  //       waiting_fee: 56,
  //       per_min_fare: 0,
  //       cancellation_fee: 0,
  //       transport_hub_fee: 0,
  //     },
  //     status: "Inactive",
  //   },
  // ];
  // const disableItems = ["parking_fee", "transport_hub_fee", "booking_fee"];

  // const keyOrder = [
  //   "base_fare",
  //   "per_km_fare",
  //   "per_min_fare",
  //   "parking_fee",
  //   "waiting_fee",
  //   "transport_hub_fee",
  //   "booking_fee",
  //   "cancellation_fee",
  // ];
  // const ref = useRef(null);
  // const [selectedOption, setSelectedOption] = useState('');
  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  // const handleClear = () => {
  //   setSelectedOption('');
  // };
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       onClickOutside && onClickOutside();
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, [ onClickOutside ]);

  // if(!show)
  //   return null;
  const [dropDown, setDropDown] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
   <>
     {/* <div className="mx-5 mt-5 table_rideType d-flex">
      <div className="">
        <div className="d-flex pale_blue_bg ">
          <div className="py-3 px-3 fw_500 fs_14 input_width_fares">
            Ride Type
          </div>
          {keyOrder.map((key) => (
            <>
              <div
                className="py-3 fw_500 fs_14 input_width_fares text-nowrap"
                key={key}
              >
                {key}
              </div>
            </>
          ))}
        </div>

        <div className="mb-4">
          {data.map((item, idx) => {
            return (
              <FaresInputForm
                key={idx}
                item={item}
                disableItems={disableItems}
                keyOrder={keyOrder}
                editable={editable}
                setEditable={setEditable}
              />
            );
          })}
        </div>
      </div>
    </div> */}
    {/* <div ref={ref} >
    <label htmlFor="selectOption">Select an option:</label>
      <select id="selectOption" value={selectedOption} onChange={handleChange}>
        <option value="">Select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <p>Selected Option: {selectedOption}</p>
      <button onClick={handleClear}>Clear</button>
    </div>  */}

    <div className="mt-3 ms-2">
    <div
            className="  fs_16 fw_500 cursor_pointer "
            onClick={() => setDropDown(!dropDown)}
          >
            Transaction Date
          </div>
          {dropDown ? (
            <>
              <div
                className=" width_fit border box_shadow white_bg border_radius mt-2 py-2"
              >
               <div className="d-flex  ">
                <div className="ms-2">
                  <div>
                    <div><label className="secondary_color fs_12">From (Select start date)</label></div>
                    <input className="w-75 mt-2" type="date"/>
                  </div>
                </div>
                <div className=" ms-3" >
                <div>
                    <div><label className="secondary_color fs_12">To (Select end date)</label></div>
                    <input className="w-75 mt-2" type="date"/>
                  </div>
                </div>
               </div>
              </div>
            </>
          ) : null}
    </div>

   </>
  );
};

export default Test2;
