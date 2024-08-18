import React from 'react'
import "../../components/toggle-switch/switch.css"

const Switch = () => {
  return (
    <div>
        
         
        <input className='input-switch' type="checkbox" id="demo"/>
        <span className="inactive"></span>
        <label className="label-switch" for="demo"></label>
        <span className="active ms-2"></span>
    </div>
  )
}

export default Switch