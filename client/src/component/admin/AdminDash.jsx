import React from 'react'
import { Link,Outlet } from 'react-router-dom'
function AdminDash() {
  return (
    <div  style={{ display: 'flex', height: '100vh' }}>

    {/* Static Sidebar */}

    <div className='ad_sidebar'>
            <div className='ad_sidebar01'>

      <h2 className='heading_ad'>HEYRAM INFRASTRUCTURE</h2>
      <nav>
       <ul className='ad_ul' >
          <li  >
            <Link  style={{ textDecoration: 'none' }} className={`link ${selectedNav == "job"?"true":""}`}  to="/admindashboard/jobs" >
            <span><BsBag/></span> <p >Jobs</p></Link>
          </li>
          <li >
            <Link style={{ textDecoration: 'none' }}  className={`link ${selectedNav == "intern"?"true":""}`} to="/admindashboard/internships">
            <span>
              <MdOutlineSchool/>
            </span>
            <span>
            Internships
            </span>
            </Link>
          </li>
          <li >
            <Link style={{ textDecoration: 'none' }} className={`link ${selectedNav == "clients"?"true":""}`}  to="/admindashboard/clients" >
            <span><IoPeopleOutline/> </span>
            <span>Clients</span>
            </Link>
          </li>
          <li >
            <Link style={{ textDecoration: 'none' }} className={`link ${selectedNav == "queries"?"true":""}`} to="/admindashboard/queries" >
            <span><IoIosHelpCircleOutline/></span> <span>Queries</span></Link>
          </li>
         
        </ul> 
             
      </nav>
      </div>
    </div>

    {/* Dynamic Content Area */}
    <div className='ad_outlet'>
      <Outlet />
    </div>
  </div>
  )
}

export default AdminDash