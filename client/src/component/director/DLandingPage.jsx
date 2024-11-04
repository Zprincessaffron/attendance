import React from 'react'
import '../../styles/director/DLandingPage.css'
function DLandingPage() {
  return (
    <div className='dlp_main'>
        <div className="dlp_div1" onClick={()=>{handleNavigate('development')}} >
            Development

        </div>
         <div className="dlp_div1" onClick={()=>{handleNavigate('digitalmarketing')}} >

            
        </div>
        <div className="dlp_div1" onClick={()=>{handleNavigate('sales')}} >
            
        </div>
    </div>
  )
}

export default DLandingPage