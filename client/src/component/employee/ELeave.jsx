import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import axios from 'axios';
import moment from 'moment';
function ELeave() {
  const { leaveData,setLeaveData,employeeData }=useContext(EmployeeContext)
  const [popup,setPopup]=useState(false)
  const [message,setMessage]=useState("")
  const [currentItem,setCurrentItem]=useState()
  const [leaveReason,setLeaveReason]=useState()


  const fetchData = async () => {
    try {
      const response = await axios.get(`/leave/get/${employeeData.employeeId}`);
      setLeaveData(response.data)
      console.log(response.data)
      
    } catch (err) {

      console.log(err)
    }

  };

  useEffect(() => {
   fetchData()
  
  }, [ ])



  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Number of rows to display per page

  // Calculate the index of the first and last items for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Slice the data to only include the current page's rows
  const currentRows = leaveData.slice(indexOfFirstRow, indexOfLastRow);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const totalPages = Math.ceil(leaveData.length / rowsPerPage);

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


  async function handleApply(){
    try {
      const response = await axios.post(`/leave/`,{
        employeeId: employeeData.employeeId,
        leaveReason: message
      });
      console.log(response.data)
      
    } catch (err) {

      console.log(err)
      console.log(err)
    }

  }
  function handlePopup(item){
    setLeaveReason(item)
    setPopup(true)
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
                <h5>Reason</h5>
                <p>
                {leaveReason.leaveReason}</p>
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
          <button onClick={handlePopup}>Apply</button>
        </div>
        
      </div>
      <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>S1.No</th>
              <th>Requested Date</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>status</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr key={index}>
              <td>{index+1}</td>
                <td>{item.requestDate.split('T')[0]}</td>
                <td>{item.fromDate.split('T')[0]}</td>
                <td>{item.toDate.split('T')[0]}</td>
                <td>
                <button className='table_button_view' onClick={()=>handlePopup(item)}>View</button></td>
                <td><p className={`table_status ${item.leaveStatus}`}>{item.leaveStatus}</p></td>
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

export default ELeave