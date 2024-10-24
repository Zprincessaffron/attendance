import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import axios from 'axios';
import moment from 'moment';
function EAttendance() {
  const { AttendanceData,employeeData,setAttendanceData  }=useContext(EmployeeContext)
  const [popup,setPopup]=useState(false)
  const [message,setMessage]=useState("")
  const [currentItem,setCurrentItem]=useState()

console.log(AttendanceData)


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Number of rows to display per page

  // Calculate the index of the first and last items for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Slice the data to only include the current page's rows
  const currentRows = AttendanceData.slice(indexOfFirstRow, indexOfLastRow);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const totalPages = Math.ceil(AttendanceData.length / rowsPerPage);

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
  async function getAttendanceData(){
    try {
      const response = await axios.get(`/attendance/${employeeData.employeeId}`)
      console.log(response.data)
      console.log(employeeData.employeeId)
      setAttendanceData(response.data)
      
      
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
    getAttendanceData()
    
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
    setCurrentItem(item)


  }
  function handleTextAreaChange(e){
    setMessage(e.target.value)
  }
  
  return (
    <div>
      {popup?(
        <>
        <div className='e_leavereq_pop'>
          <div className='e_leavereq_pop_1'>
            <div className='e_leavereq_pop_2'>
                <h5 style={{marginBottom:"2rem"}}>Work Details</h5>
                <p>{currentItem.workDetails?currentItem.workDetails:""}</p>
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
          Attendance
        </div>
        <div className='outlet_title2'>
          <button onClick={handleStart}>Start</button>
        </div>
        
      </div>
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
          {currentRows.map((item, index) => (
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
                <button onClick={()=>handlePopup(item)}>Check out</button>
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
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"  
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  )
}

export default EAttendance