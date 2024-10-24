import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import axios from 'axios';
import moment from 'moment';
import DatePickerComponent from './DatePickerComponent';
function TodayAttendance() {
  const {  teamMembers,TodayAttendance,setTodayAttendance,setAttendanceData,AttendanceData,employeeData }=useContext(EmployeeContext)
  const [popup,setPopup]=useState(false)
  const [message,setMessage]=useState("")
  const [currentItem,setCurrentItem]=useState()
  const [ isOpen,setIsOpen]=useState(false)


  async function getTodayAttendanceData(){
    try {
      const response = await axios.get(`/attendance/today/dev`);
      const employees = response.data
      const filtered = employees.filter(employee => 
        teamMembers.includes(employee.employeeId)
  
      );
      setTodayAttendance(filtered)
      console.log("filtered",employees)
      console.log(teamMembers)
      
      
    } catch (err) {

      console.log(err)
      console.log(err)
    }
  }

useEffect(() => {
  getTodayAttendanceData()
}, [ ])


function handlePopup(item){
  setCurrentItem(item)
  setPopup(true)
}
  
  return (
    <div>
      {popup?(
        <>
        <div className='e_leavereq_pop'>
          <div className='e_leavereq_pop_1'>
            <div className='e_leavereq_pop_2'>
                <h5 style={{marginBottom:"2rem"}}>Work Details</h5>
                <p>{currentItem.workDetails}</p>
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
          Today Attendance
        </div>
        <div className='outlet_div232'>
         <DatePickerComponent/>
        </div>
       
        
      </div>
      <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>S1.No</th>
            <th>Employee</th>
            <th>Check In</th>
            <th >Check Out</th>
            <th>Hours Worked</th>
            <th>Detail</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {TodayAttendance.map((item, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.employeeId}</td>
              <td>{moment(item.checkInTime).format('h:mm A')}</td>
              <td>
                {item.checkOutTime?(
                  <>
                  {moment(item.checkOutTime).format('h:mm A')}
                  </>
                ):
                <>
                <p>Working</p>
                </>
                }
              </td>
              <td>
                {item.totalHoursWorked?(
                  <>
                  {Math.floor(item.totalHoursWorked)}:{Math.floor((item.totalHoursWorked % 1) * 60)}
                  </>
                ):<>
                {((new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })) - new Date(item.checkInTime)) / 3600000).toFixed(2)}
               
                </>}
              </td>
              <td> {item.workDetails && item.workDetails.length > 3 ? (<p onClick={()=>handlePopup(item)}>{item.workDetails.slice(0, 3)}...</p>) : (
          item.workDetails || "No details available"
        )}</td> 
              <td><p  className={`table_status Approved`}>Present</p></td> 
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
    </div>
  )
}

export default TodayAttendance