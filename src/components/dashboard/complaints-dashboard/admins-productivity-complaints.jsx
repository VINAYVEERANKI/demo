import React from 'react'

const AdminsProductivityComplaints = () => {
    return (
        <div>
            
            <div className="d-flex">
            <div className='primary_color'>
                Admins Productivity
            </div>
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
    )
}

export default AdminsProductivityComplaints