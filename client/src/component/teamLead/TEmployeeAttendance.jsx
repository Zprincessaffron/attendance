import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import axios from 'axios';
import moment from 'moment';
import { IoMdSearch } from "react-icons/io";
import ShiningText from '../text/ShiningText';

import '../../styles/teamlead/TEmployeeAttendance.css'
function TEmployeeAttendance() {
  const { teamMembers,particularEmployeeAttendance,setParticularEmployeeAttendance,AttendanceData,employeeData }=useContext(EmployeeContext)
  const [popup,setPopup]=useState(false)
  const [message,setMessage]=useState("")
  const [currentItem,setCurrentItem]=useState()
  const [ allParticularEmployeeAttendance, setAllParticularEmployeeAttendance]=useState([])
  const [isOpen,setIsOpen]=useState(false)
  const [selectedId, setSelectedId] = useState('');

  async function getTodayAttendanceData(){
    try { 
        
      const response = await axios.get(`/attendance/${selectedId}`);
      setAllParticularEmployeeAttendance(response.data)
      console.log(allParticularEmployeeAttendance)

 
      
    } catch (err) {
        setAllParticularEmployeeAttendance(false)

      console.log(err)
    }
  }





  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Number of rows to display per page

  // Calculate the index of the first and last items for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Slice the data to only include the current page's rows
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination

  async function handleStart(){
    try {
      const response = await axios.post(`/attendance/checkin`,{
        employeeId: employeeData.employeeId
      });
      console.log(response.data)
      
    } catch (err) {

      console.log(err)
      console.log(err)
    }
  }

  useEffect(() => {
    const calculateTotalHoursWorked = () => {
      const currTime = new Date().toLocaleTimeString;
      console.log(currTime)
    };

    calculateTotalHoursWorked();
    
  }, []);
  async function handleCheckOut(){
    try {
      const response = await axios.post(`/attendance/checkout`,{
        employeeId: employeeData.employeeId,
        workDetails: message
      });
      console.log(response.data)
      
    } catch (err) {

      console.log(err)
      console.log(err)
    }

  }
  function handlePopup(item){
    setPopup(true)

  }
  function handleTextAreaChange(e){
    setMessage(e.target.value)
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
};

function handlePopup(item){
  setCurrentItem(item)
  setPopup(true)
}
const handleSelect = (id) => {
  setSelectedId(id);
  setIsOpen(false);
};
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
        <ShiningText  text="employee attendance"/>
        </div>
        <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedId || 'Select'}
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {teamMembers.map((id, index) => (
                        <li key={index} onClick={() => handleSelect(id)}>
                            {id}
                        </li>
                    ))}
                </ul>
            )}
            <button className='dropdown_button' onClick={getTodayAttendanceData}><IoMdSearch/></button>
        </div>
        
      </div>
      {allParticularEmployeeAttendance.length>0?(
        <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th >Check Out</th>
              <th>Hours Worked</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
              <>
              {allParticularEmployeeAttendance.map((item, index) => (
              <tr key={index}>
                <td>{item.date.split('T')[0]}</td>
                <td>{moment(item.checkInTime).format('h:mm A')}</td>
                <td>
                  {item.checkOutTime?(
                    <>
                    {moment(item.checkOutTime).format('h:mm A')}
                    </>
                  ):
                  <>
                   <p>didnt checked out</p>
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
              </tr>
            ))}
              </>
          </tbody>
        </table>

      </div>
      ):null}
    </div>
  )
}

export default TEmployeeAttendance