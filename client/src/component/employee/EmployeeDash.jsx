import React, { useState } from 'react'
import { Outlet, Link, Navigate } from 'react-router-dom';
import '../../styles/employee/EmployeeDash.css'
import Navbar from '../navbar/Navbar';
import { AiOutlineMail } from "react-icons/ai";

import '../../styles/teamlead/TeamleadDash.css'
import { IoHomeOutline } from "react-icons/io5";
import { SlInfo, SlNote } from "react-icons/sl";
import { CgNotes } from "react-icons/cg";
import { RiProjectorLine } from "react-icons/ri";

function EmployeeDash() { 
  const [show,setShow]=useState(false)
  const [showLeave,setShowLeave]=useState(false)
  const [divColor,setDivColor]=useState('home')
  const [showMail,setShowMail]=useState(false)

  function handleAttendance(){
    setShow(!show)
    setDivColor("attendance")
    setShowLeave(false)
 
  }
  function handleHome(){
    setDivColor("home")
  }
  function handleLeave(){
    setShowLeave(!showLeave)
    setShow(false)
    setDivColor("leave")
  }
  function handleProject(){
    setDivColor("project")
  }
  function handleTeam(){
    setDivColor("team")
  }
  function handleDivChange(val){
    setDivColor(val)
  }
  function handleInbox(){
    setDivColor('email')
    setShowMail(!showMail)
  }
  return (
    <div  className='das_containner'>
      <div className='das_containner1'>
      <Navbar/>
      </div>
      <div className='das_containner2'>
      <div className='das_con_sidebar'>

<nav>
 <div className='das_con_sidebar_main'>
  <div className='das_con_sidebar_title'>
    <div>EMPLOYEE DASHBOARD</div>

  </div>
    <div className={`das_con_sidebar_1 ${divColor=="home"?"true":""}`} onClick={handleHome} >
      <Link  className='tdash_link'  s style={{ textDecoration: 'none' }}  to="/employee/home" >
       <p ><IoHomeOutline /> HOME</p>
       </Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="attendance"?"true":""}`} onClick={handleAttendance} >
    <Link  className='tdash_link'  s style={{ textDecoration: 'none' }}  to="/employee/attendance" >
       <p ><SlNote /> ATTENDANCE</p>
       </Link>
    </div>


<div  className={`das_con_sidebar_1 ${divColor=="leave"?"true":""}`} onClick={handleLeave} >
<Link  className='tdash_link'  s style={{ textDecoration: 'none' }}  to="/employee/leave" >
       <p ><CgNotes /> LEAVE</p>
       </Link>
    </div>
    
    <div  className={`das_con_sidebar_1 ${divColor=="project"?"true":""}`} onClick={handleProject} >
      <Link  className='tdash_link' style={{ textDecoration: 'none' }} to="/employee/projects" >
       <p><RiProjectorLine/> PROJECTS</p></Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="team"?"true":""}`} onClick={handleTeam} >
      <Link  className='tdash_link' style={{ textDecoration: 'none' }} to="/employee/teams" >
       <p><RiProjectorLine/> TEAM MEMBERS</p></Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="email"?"true":""}`} onClick={handleInbox}  >
    <p><AiOutlineMail/> EMAIL</p>
    </div>
    {showMail?(
      <>
       <div  className={`das_con_sidebar_1 ${divColor=="inbox"?"true":""}`} onClick={()=>handleDivChange('inbox')}>
    <Link  className='tdash_link' style={{ textDecoration: 'none' }} to="/employee/inbox" >
    <p> INBOX</p></Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="compose"?"true":""}`}onClick={()=>handleDivChange('compose')}>
    <p>COMPOSE</p>
    </div>
      </>
    ):null}
   
  </div>       
</nav>
</div>
    {/* Dynamic Content Area */}
    <div className='das_con_outlet'>
      <Outlet />
    </div>
      </div>
  </div>
  )
}

export default EmployeeDash