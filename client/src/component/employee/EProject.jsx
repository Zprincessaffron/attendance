import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import '../../styles/teamlead/TLeaveRequest.css'
import '../../styles/teamlead/TProject.css'
import { FaRegCalendar } from "react-icons/fa";

import axios from 'axios';
import moment from 'moment';
function EProject() {
  const {  projects }=useContext(EmployeeContext)
  const [popup,setPopup]=useState(false)
  const [currentItem,setCurrentItem]=useState()



function handlePopup(item){
    setCurrentItem(item)
    setPopup(true)
}
console.log(projects)

  return (
    <div>
      {popup?(
        <>
        <div className='e_leavereq_pop'>
          <div className='e_leavereq_pop_1'>
            <div className='e_leavereq_pop_2'>
                <h5>{currentItem.projectName}</h5>
                <div className='t_project_pop21'>
                <div >
                  <span>Created By:</span> <span>{currentItem.createdBy}</span>
                </div>
                <div >
                  <span>Created:</span> <span><FaRegCalendar/> {currentItem.createdDate.split('T')[0]}</span>
                </div>
               
                <div>
                  <span>Started:</span> <span><FaRegCalendar/> {currentItem.startDate.split('T')[0]}</span>
                </div>
                <div>
                  <span>Deadline:</span> <span><FaRegCalendar/> {currentItem.deadlineDate.split('T')[0]}</span>
                </div>
                <div>
                  <span>EndDate:</span> <span> {currentItem.endDate? ( <> <FaRegCalendar/> currentItem.endDate.split('T')[0] </>):"Not completed"}</span>
                </div>
                <div>
                  <span>Status:</span> <span>{currentItem.status}</span>
                </div>
                <div>
                  <span>Progress:</span> <span><div className="progress-bar-container">
                          <div
                            className="progress-bar"
                            style={{ width: `${currentItem.progress}%` }}
                          ></div>
                        </div></span>
                </div>
                <div>
                  <span>Team Members:</span> <span>{currentItem.teamMembers.join(', ')}</span>
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
              <th>Started</th>
              <th>Deadline</th>
              <th>Ended</th>
              <th>progress</th>
              <th>status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => (
            <tr key={index} onClick={()=>handlePopup(item)} >
              <td>{index+1}</td>
              <td>{item.projectName}</td>
                <td>{item.startDate.split('T')[0]}</td>
                <td>{item.deadlineDate.split('T')[0]}</td>
                <td>
                  {item.endDate?item.endDate.split("T")[0]:"-"}
                </td>
                <td>
                <div className="progress-bar-container">
                          <div
                            className="progress-bar"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                </td>
                <td><p className={`table_status ${item.status}`}>{item.status}</p></td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
    </div>
  )
}

export default EProject