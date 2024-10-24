import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import '../../styles/teamlead/TLeaveRequest.css'
import '../../styles/teamlead/TProject.css'
import { FaRegCalendar } from "react-icons/fa";
import '../../styles/teamlead/TTeammember.css'
import axios from 'axios';
import moment from 'moment';
import { MdOutlineCall } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";

function TTeammembers() {
  const { teamMembersData }=useContext(EmployeeContext)
  const [popup,setPopup]=useState(false)
  const [currentItem,setCurrentItem]=useState()


function handlePopup(item){
    setCurrentItem(item)
    setPopup(true)
}

  return (
    <div>
      {popup?(
        <>
        <div className='e_leavereq_pop'>
          <div className='e_team_pop_1'>
            <div className='e_team_pop_2'>
                <h5>Employee Detail</h5>
                <div className='t_team_pop21'>
                <div >
                  <span>name:</span> <span> {currentItem.name}</span>
                </div>
                <div >
                  <span>Employee Id:</span> <span> {currentItem.employeeId}</span>
                </div>
                <div>
                  <span>Joined Date:</span> <span> {currentItem.dateOfJoining.split('T')[0]}</span>
                </div>
                <div>
                  <span>role:</span> <span>{currentItem.role}</span>
                </div>
                <div>
                  <span>Department:</span> <span>{currentItem.department}</span>
                </div>
                <div>
                  <span>Gender:</span> <span>{currentItem.gender}</span>
                </div>
                <div>
                  <span>Phone:</span> <span>{currentItem.phone}</span>
                </div>
                <div>
                  <span>Email:</span> <span>{currentItem.email}</span>
                </div>
                <div>
                  <span>address:</span> <span>{currentItem.address}</span>
                </div>
                
                </div>
            </div>
            <div className='e_leavereq_pop_3'>
           
                         <button className='e_leavereq_pop_33' onClick={()=>setPopup(false)} >Close</button>

                 
             
            </div>
          </div>
        </div>
        </>
      ):null}

      <div className='outlet_title'>
        <div>
          Projects
        </div>
       
        
      </div>
      <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>S1.No</th>
            <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Mobile</th>
              <th>Joining Date</th>
              <th>Email</th>
              <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {teamMembersData.map((item, index) => (
            <tr onClick={()=>handlePopup(item)} key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.department}</td>
              <td className='table_member_phone'><span> <MdOutlineCall/></span> {item.phone.slice(0,7)}..</td>
              <td>{item.dateOfJoining.split("T")[0]}</td>
              <td className='table_member_mail'><span><IoMailOutline/></span>{item.email.slice(0,5)}...</td>
              <td ><p className={`table_member_gender ${item.gender}`} >{item.gender}</p></td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
    </div>
  )
}

export default TTeammembers