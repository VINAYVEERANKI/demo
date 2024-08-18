import React from 'react'

const EditModalbtn = ({editModalfn}) => {
  return (
    <div className="d-flex justify-content-end mt-4">
    <button
      type="button"
      className="white_color border_none px-5 me-1 py-1 fs_16 primary_bg border_radius_5px"
      onClick={() => {
       editModalfn()
      }}
    >
      Edit
    </button>
  </div>
  )
}

export default EditModalbtn