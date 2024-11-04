import React, { useContext } from 'react'
import './PlusButton.css'
import { FaPlus } from "react-icons/fa";
import { EmployeeContext } from '../../context/EmployeeContext';
function PlusButton() {
  const { showEmailBox,setShowEmailBox } = useContext(EmployeeContext)


  return (
   <div className='plus_btn_main'>
     <button className='plus_button'  onClick={()=>setShowEmailBox(!showEmailBox)}>
    <FaPlus/>
    <div className="star-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        version="1.1"
        style={{
          shapeRendering: "geometricPrecision",
          textRendering: "geometricPrecision",
          imageRendering: "optimizeQuality",
          fillRule: "evenodd",
          clipRule: "evenodd",
        }}
        viewBox="0 0 784.11 815.53"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="Layer_x0020_1">
          <path
            className="fil0"
            d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
          />
        </g>
      </svg>
    </div>
    {[2, 3, 4, 5, 6].map((i) => (
      <div key={i} className={`star-${i}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          version="1.1"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "optimizeQuality",
            fillRule: "evenodd",
            clipRule: "evenodd",
          }}
          viewBox="0 0 784.11 815.53"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="Layer_x0020_1">
            <path
              className="fil0"
              d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            />
          </g>
        </svg>
      </div>
    ))}
  </button>
   </div>


  )
}

export default PlusButton