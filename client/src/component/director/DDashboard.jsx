import React, { useState } from 'react'
import { Outlet, Link, Navigate } from 'react-router-dom';
import '../../styles/employee/EmployeeDash.css'
import Navbar from '../navbar/Navbar';
import '../../styles/teamlead/TeamleadDash.css'
import { IoHomeOutline } from "react-icons/io5";
import { SlNote } from "react-icons/sl";
import { CgNotes } from "react-icons/cg";
import { RiProjectorLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

function DDashboard() { 
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
    <div>DIRECTOR DASHBOARD</div>

  </div>
    <div className={`das_con_sidebar_1 ${divColor=="home"?"true":""}`} onClick={handleHome} >
      <Link  className='tdash_link'  s style={{ textDecoration: 'none' }}  to="/director/home" >
       <p ><IoHomeOutline /> HOME</p>
       </Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="attendance"?"true":""}`} onClick={handleAttendance} >
      <span>
      <p ><SlNote />ATTENDANCE</p>
      </span>
    </div>
     {show ?(
      <>
       <div  className={`das_con_sidebar_1 ${divColor=="todayattendance"?"true":""}`} onClick={()=>{handleDivChange("todayattendance")}} >
      <Link  className='tdash_link' style={{ textDecoration: 'none' }}  to="/director/todayattendance"> 
      <span>
      TODAY ATTENDANCE
      </span>
      </Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="eattendance"?"true":""}`}  onClick={()=>{handleDivChange("eattendance")}} >
    <Link  className='tdash_link' style={{ textDecoration: 'none' }}  to="/director/employeeattendance"> 
      <span>
      EMPLOYEE ATTENDANCE
      </span>
      </Link>
    </div>
      </>
     ):null}

<div  className={`das_con_sidebar_1 ${divColor=="leave"?"true":""}`} onClick={handleLeave} >
      <span>
      <p ><CgNotes />LEAVE</p>
      </span>
    </div>
     {showLeave ?(
      <>
       <div  className={`das_con_sidebar_1 ${divColor=="leaverequest"?"true":""}`} onClick={()=>{handleDivChange("leaverequest")}} >
       <Link  className='tdash_link' style={{ textDecoration: 'none' }}  to="/director/leaverequest"> 
      <span>
      LEAVE REQUESTS
      </span>
      </Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="eleave"?"true":""}`} onClick={()=>{handleDivChange("eleave")}} >
    <Link  className='tdash_link' style={{ textDecoration: 'none' }}  to="/director/employeeleave"> 
      <span>
      EMPLOYEE LEAVE
      </span>
      </Link>
    </div>
      </>
     ):null}
    <div  className={`das_con_sidebar_1 ${divColor=="project"?"true":""}`} onClick={handleProject} >
      <Link  className='tdash_link' style={{ textDecoration: 'none' }} to="/director/project" >
       <p><RiProjectorLine/> PROJECTS</p></Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="team"?"true":""}`} onClick={handleTeam} >
      <Link  className='tdash_link' style={{ textDecoration: 'none' }} to="/director/team" >
       <p><RiProjectorLine/> TEAM LEADERS</p></Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="profile"?"true":""}`} onClick={()=>{handleDivChange("profile")}} >
      <Link  className='tdash_link' style={{ textDecoration: 'none' }} to="/director/profile" >
       <p><RiProjectorLine/> PROFILE</p></Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="email"?"true":""}`} onClick={handleInbox}  >
    <p><AiOutlineMail/> EMAIL</p>
    </div>
    {showMail?(
      <>
       <div  className={`das_con_sidebar_1 ${divColor=="inbox"?"true":""}`} onClick={()=>handleDivChange('inbox')}>
    <Link  className='tdash_link' style={{ textDecoration: 'none' }} to="/director/inbox" >
    <p> INBOX</p></Link>
    </div>
    <div  className={`das_con_sidebar_1 ${divColor=="compose"?"true":""}`}onClick={()=>handleDivChange('compose')}>
    <Link  className='tdash_link' style={{ textDecoration: 'none' }} to="/director/compose" >
    <p> Compose</p></Link>
    
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

export default DDashboard