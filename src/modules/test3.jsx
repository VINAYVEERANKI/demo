import { React, useEffect, useRef, useState } from "react";
// import './modules/test3.css'
import "../../src/index.css";
import Select from "react-select";
import { useStyles } from "../components/mui-styles/mui-styles";
import { useFormik } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import Test2 from "./test2";
const Test3 = (
  filter,
  handleFilterClose,
  search,
  driverDropDownList = {},
  type = "",
  setShowFilter
) => {
  // const [dropDown, setDropDown] = useState('');
  // const options = [
  //   { value: 'option1', label: 'Login- OTP' },
  //   { value: 'option2', label: 'Login- Resend OTP' },
  //   { value: 'option3', label: 'Phone number update- OTP' },
  //   { value: 'option4', label: 'Phone number update - Resend OTP' },
  //   { value: 'option5', label: 'Email verification- OTP' },
  //   { value: 'option6', label: 'Email verification- Resend OTP' },
  //   { value: 'option7', label: 'Email update- OTP' },
  //   { value: 'option8', label: 'Email update- OTP' },
  // ];

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  const selectOptions = (key) =>
    Object.values(driverDropDownList[key] || {}).map((item) => ({
      value: item[key],
      label: item[key],
    }));
  const [error, setError] = useState(false);
  const initialValues = {
    driver_id2: search?.driver_id2 ?? "",
    first_name: search?.first_name ?? "",
    last_name: search?.last_name ?? "",
    email: search?.email ?? "",
    phone_number: search?.phone_number ?? "",
    blocked_by: search?.blocked_by ?? "",
    deleted_by: search?.deleted_by ?? "",
    permanently_deleted_on: search?.permanently_deleted_on ?? "",
    banned_at: search?.banned_at ?? "",
    expired_documents: search?.expired_documents ?? "",
    rejected_at: search?.rejected_at ?? "",
    type: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      const hasValues = Object.values(values).some((val) => Boolean(val));
      if (!hasValues) {
        console.log("Please fill out at least one field.");
        setError(true);
        return;
      }
      filter(values);
      handleFilterClose();
    },
  });

  const clearFilter = () => {
    formik.resetForm();
    filter("");
  };
  const classes = useStyles();

  const RenderSelectField = (name, label) => (
    <Autocomplete
      value={
        selectOptions(name).find(
          (option) => option.value === formik.values[name]
        ) || null
      }
      onChange={(event, newValue) => {
        formik.setFieldValue(name, newValue?.value || "");
        setError(false);
      }}
      clearIcon={null}
      style={{ width: "15rem" }}
      className={classes.autocomplete}
      options={selectOptions(name)}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
          className="dark_grey_color fw_500 fs_14"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={`Enter ${label}`}
        />
      )}
    />
  );
  const [click, setClick] = useState(false);
  const handleClick = () => {
    if (click) {
      setClick(false);
    } else {
      setClick(true);
    }
  };

  const [toggle, setToggle] = useState(false)
  
    const [selectedOption, setSelectedOption] = useState('');
  
    const selectOptionRef = useRef(null);

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleToggle = () => {
      setToggle((prevToggle) => !prevToggle);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectOptionRef.current && !selectOptionRef.current.contains(event.target)) {
          setToggle(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);


  return (
    <>
      {/* <div className='d-flex justify-content-between mt-4'>
      <div className='Test_3-Title-Color fs_20 ps-3 text_underline'>Incentive Time Slots</div>
      <div><button className='Create_New_Btn py-1 ps-1 pe-3 fs_20 border_radius_10px  me-3'>Create new time slots</button></div>
   </div>
   <div className='Test_3_Layout mx-4 mt-3'>
    <div className='fs_20 Test_3_Slot-Title py-2 ps-4'>Slot-1</div>
    <div className='row gx-0 '>
      <div className='col-xl-4  d-xl-flex justify-content-xl-end mt-5 pt-4'>
      <div className='d-sm-flex justify-content-sm-center'>
       <div>
        <div className='Test_3-Title-Color fs_20 mb-4'>Start Time*<input type='time' className='px-4 py-1 ms-lg-4 border_radius_10px '/></div>
        <div className='Test_3-Title-Color fs_20'>Expiry Time*<input type='time' className='px-4 py-1 ms-2 border_radius_10px ' /></div>
        </div>
      </div>
      </div>
      <div className=' col-xl-1 d-none  d-xl-block vertical-line mt-5'></div>

      <div className='col-xl-6  d-sm-flex gap-xl-3'>
        <div>
          <div className='Test_3-Title-Color fs_20 mt-5 mb-3'>Number Of Trips</div>
          <div>
            <input type='' className='border_radius_10px  Input_Box py-1 my-2  ms-4 text-center'/>
          </div>
          <div>
            <input type='' className='border_radius_10px  Input_Box py-1 my-2 ms-4 text-center'/>
          </div>
          <div>
            <input type='' className='border_radius_10px  Input_Box py-1 my-2 ms-4 text-center'/>
          </div>
          <div>
            <input type='' className='border_radius_10px  Input_Box py-1 my-2 ms-4 text-center'/>
          </div>
        </div>
        <div>
          <div className='Test_3-Title-Color fs_18 mt-5 mb-3 ms-3'>Amount (₹)</div>
          <div>
            <input type='' className='border_radius_10px  Input_Box py-1 my-2 ms-4 text-center'/>
          </div>
          <div>
            <input type='' className='border_radius_10px  Input_Box py-1 my-2 ms-4 text-center'/><button className='Test-3_Delet_Btn border_radius_10px  ms-2'>Delete</button>
          </div>
          <div>
            <input type='' className='border_radius_10px  Input_Box py-1 my-2 ms-4 text-center'/><button className='Test-3_Delet_Btn border_radius_10px  ms-2'>Delete</button>
          </div>
          <div>
            <input type='' className='border_radius_10px  Input_Box py-1 my-2 ms-4 text-center'/><button className='Test-3_Delet_Btn border_radius_10px  ms-2'>Delete</button>
          </div>
        </div>
      </div>

        <div className='row'>
        <div className='col-lg-4 col-8'></div>
      <div className='d-flex justify-content-center col-lg-6 mt-3 ms-5'>
      <div><button className='Test-3_Add-Button border_radius px-3 mb-3'>+ Add</button></div>
      </div>
      </div>
    </div>
   </div> */}
      {/* <div>
   <Select options={options} placeholder=""/>
   </div> */}
      {/* <div className='pt-4'>
   <select
  value={dropDown}
  onChange={(e) => setDropDown(e.target.value)}
>
  <option value="Sub-Classification"></option>
  {options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>
</div> */}
      {/* <div className='d-flex justify-content-center mt-5'>
<div class="container">
  <div class="row">
    <div class="col-12">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>A/d</th>
              <th>Ph No</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>abc</td>
              <td>abc</td>
              <td>abc</td>
              <td>abc</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

</div> */}

      {/* <div className='table-responsive table'>
  <div style={{minWidth: "40rem"}} className='d-flex g-0 mt-5 ms-5'>
    <div className='col-2'>Thead1</div>
    <div className='col-2'>Thead2</div>
    <div className='col-2'>Thead3</div>
    <div className='col-2'>Thead4</div>
    <div className='col-2'>Thead5</div>
    <div className='col-2'>Thead6</div>
  </div>
  <div style={{minWidth:"40rem"}} className='row g-0 ms-5'>
  <div className='col-2 '>Tbody1</div>
    <div className='col-2 '>Tbody2</div>
    <div className='col-2 '>Tbody3</div>
    <div className='col-2 '>Tbody4</div>
    <div className='col-2 '>Tbody5</div>
    <div className='col-2 '>Tbody6</div>
  </div>
</div> */}

      {/* <div className='row mt-5'>
  <div className='col-4'>
    <div className='row'>
      <div className='col-2'>
        <div className="row ">
          <div className='col-2'></div>
          <div className='col-2'></div>
          <div className='col-2'></div>
          <div className='col-2'></div>
          <div className='col-2'></div>
          <div className='col-2'></div>
        </div>
      </div>
      <div className='col-2'></div>
      <div className='col-2'></div>
      <div className='col-2'></div>
      <div className='col-2'></div>
      <div className='col-2'></div>
    </div>
  </div>
  <div className='col-4 '>Col-b</div>
  <div className='col-4 d-flex justify-content-center'>Col-c</div>
</div> */}

{/* <div className="row">
<div className="col-6"></div>
<div className="col-6">
  <div className="col-2"></div>
  <div className="col-2">
    <span className="d-flex justify-content-center align-items-center gap-2"><i class="ri-shopping-cart-fill"/>Cart</span>
  </div>
  <div className="col-2"></div>
</div>
</div> */}

      <div className="table_filter_container border_radius_7px p-3">
        <div className="d-flex add_filter_heading justify-content-between">
          <span className="text-start fs_20 fw_500 primary_color d-flex align-items-center ">
            <i className="ri-filter-3-line primary_color pe-2" /> Add Filter{" "}
          </span>
          <button
            className="border_none background_none"
            onClick={() => handleFilterClose()}
            type="button"
          >
            <i className="ri-close-line fs_21 white_color primary_bg fw_500 close_icon_container "></i>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("driver_id2", "Driver ID")}
          </div>
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("phone_number", "Phone Number")}
          </div>
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>
          <div className="mt-3 col-lg-6">
            {RenderSelectField("email", "Email ID")}
          </div>
          <span className="d-flex justify-content-start fs_14 fw_500 primary_color my-2 ps-5 ms-5">
            -(or)-
          </span>

          <div className="mt-3 d-lg-flex gap-3">
            {RenderSelectField("first_name", "First Name")}
            <div className="my-3 my-lg-0">
              {RenderSelectField("last_name", "Last Name Is")}
            </div>
            <div className="my-3 my-lg-0">
              {type === "blockedDrivers" ? (
                RenderSelectField("blocked_by", "Blocked By")
              ) : type === "deletedDrivers" ? (
                RenderSelectField("deleted_by", "Deleted By")
              ) : type === "permanentlyDeletedDrivers" ? (
                RenderSelectField(
                  "permanently_deleted_on",
                  "Permanently Deleted On"
                )
              ) : type === "bannedApplication" ? (
                RenderSelectField("banned_at", "Banned At")
              ) : type === "expiredDocuments" ? (
                RenderSelectField("expired_documents", "Expired Documents")
              ) : type === "rejectApplication" ? (
                RenderSelectField("rejected_at", "Rejected At")
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="red_color fs_14 fw_700">
            {error ? "Please fill out at least one field." : ""}
          </div>
          <div className="d-flex justify-content-lg-end gap-3 mt-4 ms-sm-0 ms-2">
            <button
              type="reset"
              className=" primary_border primary_color white_bg border_radius_3px fs_16 fw_500 py-1 px-sm-3"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
            <button
              type="submit"
              className="blue_color_bg border_none fs_16 fw_400 white_color border_radius_3px py-1 px-sm-3 px-2"
            >
              Apply Filter
            </button>
          </div>
        </form>
      </div>

      {/* <div>
      <button className="ms-3" onClick={handleToggle}>Add</button>
      {toggle && (
        <div ref={selectOptionRef} className="mt-5">
          <label htmlFor="selectOption">Select an option:</label>
          <select id="selectOption" value={selectedOption} onChange={handleChange}>
            <option value="">Select</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <p>Selected Option: {selectedOption}</p>
        </div>
      )}
      </div> */}

      {/* <div className="mt-5 ms-5">
      <button className="" onClick={()=>setToggle(!toggle)}>Add</button>
      <button className="" onClick={handleToggle}>Add</button>
      {toggle && (
      <div>
      <label htmlFor="selectOption">Select an option:</label>
      <select id="selectOption" value={selectedOption} onChange={handleChange}>
        <option value="">Select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <p>Selected Option: {selectedOption}</p>
      <button onClick={handleClear}>Clear</button>
      </div>
      )}
    </div> */}

   
      {/* <div className="mt-5">
        <button onClick= {handleClick} >Click</button>
        <Test2 show={click} onClickOutside={() => {setClick(false)}} />
      </div> */}
    </>
  );
};

export default Test3;
