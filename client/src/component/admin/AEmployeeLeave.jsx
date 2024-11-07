import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import axios from 'axios';
import moment from 'moment';
import { IoMdSearch } from "react-icons/io";
import ShiningText from '../text/ShiningText';
function AEmployeeLeave() {
  const { particularEmployeeAttendance,setParticularEmployeeAttendance,AttendanceData,employeeData,teamMembers,allEmployeesData }=useContext(EmployeeContext)
  const [popup,setPopup]=useState(false)
  const [message,setMessage]=useState("")
  const [currentItem,setCurrentItem]=useState()
  const [ allParticularEmployeeLeave, setAllParticularEmployeeLeave]=useState([])
  const [isOpen,setIsOpen]=useState(false)
  const [selectedId, setSelectedId] = useState('');
  const [leaveReason,setLeaveReason]=useState();
 
  async function getTodayAttendanceData(){
    try {
        
      const response = await axios.get(`/leave/get/${selectedId}`);
      setAllParticularEmployeeLeave(response.data)
      console.log(response.data)

 
      
    } catch (err) {
      setAllParticularEmployeeLeave(false)

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

  useEffect(() => {
    const calculateTotalHoursWorked = () => {
      const currTime = new Date().toLocaleTimeString;
      console.log(currTime)
    };

    calculateTotalHoursWorked();
    
  }, []);
 
  function handlePopup(item){
    setLeaveReason(item)
    setPopup(true)

  }
  function handleTextAreaChange(e){
    setMessage(e.target.value)
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
};

const handleSelect = (id) => {
    setSelectedId(id);
    setIsOpen(false);
};
async function handleUpdateLeave(val) {
  try {
    await axios.put(`/leave/update/${leaveReason._id}`, { leaveStatus: val });
    setPopup(false)
  } catch (err) {
    console.log(err)
  }
}
  return (
    <div>
      {popup?(
        <>
        <div className='e_leavereq_pop'>
          <div className='e_leavereq_pop_1'>
          <h5 style={{ fontWeight: "400", letterSpacing: "0.5px", fontSize: "1.5rem" }}>Reason</h5>
              <div className="popup-content">
                <p><strong>Leave Type:</strong> {leaveReason.leaveType}</p>
                <p><strong>Leave Reason:</strong> {leaveReason.leaveReason}</p>
                <p><strong>Status:</strong> {leaveReason.leaveStatus}</p>
                <p><strong>Request Date:</strong> {new Date(leaveReason.requestDate).toLocaleDateString()}</p>
                <p><strong>From Date:</strong> {new Date(leaveReason.fromDate).toLocaleDateString()}</p>
                <p><strong>To Date:</strong> {new Date(leaveReason.toDate).toLocaleDateString()}</p>
              </div>
            <div className='e_leavereq_pop_3'>
               {leaveReason.leaveStatus == "Pending"?(
                <>
                <button className='e_leavereq_pop_31' onClick={()=>handleUpdateLeave("Approved")} >Approve</button>
                <button className='e_leavereq_pop_32' onClick={()=>handleUpdateLeave("Rejected")}>Reject</button>
         <button className='e_leavereq_pop_33' onClick={()=>setPopup(false)} >Close</button>
  
                </>
               ):(
                <>
                         <button className='e_leavereq_pop_33' onClick={()=>setPopup(false)} >Close</button>

                 
                </>
               )}
            </div>
          </div>
        </div>
        </>
      ):null}

      <div className='outlet_title'>
        <div>
          <ShiningText text="Employee Leave"/>
        </div>
        <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedId || 'Select'}
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    {allEmployeesData.map((e, index) => (
                        <li key={index} onClick={() => handleSelect(e.employeeId)}>
                            {e.employeeId}
                        </li>
                    ))}
                </ul>
            )}
            <button className='dropdown_button' onClick={getTodayAttendanceData}><IoMdSearch/></button>
        </div>
        
      </div>
      {allParticularEmployeeLeave.length>0?(
        <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
            <th>Employee Id</th>
              <th>Requested Date</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
              <>
              {allParticularEmployeeLeave.map((item, index) => (
              <tr key={index}>
                <td>{item.employeeId}</td>
                <td>{item.requestDate.split('T')[0]}</td>
                <td>{item.fromDate.split('T')[0]}</td>
                <td>{item.toDate.split('T')[0]}</td>
                <td>
                <button className='table_button_view' onClick={()=>handlePopup(item)}>View</button></td>
                
                <td><p className={`table_status ${item.leaveStatus}`}>{item.leaveStatus}</p></td>
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

export default AEmployeeLeave