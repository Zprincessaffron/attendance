import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import axios from 'axios';
import moment from 'moment';
import ShiningText from '../text/ShiningText';
import '../../styles/employee/ELeave.css'
function ELeave() {
  const { leaveData, setLeaveData, employeeData } = useContext(EmployeeContext)
  const [popup, setPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [currentItem, setCurrentItem] = useState()
  const [leaveReason, setLeaveReason] = useState()
  const [leaveType, setLeaveType] = useState("casual");
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [popupLeave, setPopupLeave] = useState(false)
  const handleDateChange = () => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diff = (end - start) / (1000 * 60 * 60 * 24) + 1; // Calculate total days
      setTotalLeaves(diff >= 0 ? diff : 0); // Ensure non-negative value
    }
  }
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

  }, [])



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

  async function handleStart() {
    try {
      const response = await axios.post(`/attendance/checkin`, {
        employeeId: employeeData.employeeId
      });
      console.log(response.data)

    } catch (err) {

      console.log(err)
      console.log(err)
    }
  }


  async function handleLeaveApply(e) {
    e.preventDefault()
    try {
      const response = await axios.post(`/leave/`, {
        employeeId: employeeData.employeeId,
        leaveReason: reason,
        fromDate: fromDate,
        toDate: toDate,
        leaveType
      });
      console.log(response.data)

    } catch (err) {

      console.log(err)
      console.log(err)
    }

  }
  function handlePopup(item) {
    setLeaveReason(item)
    setPopup(true)
  }
  function handleTextAreaChange(e) {
    setMessage(e.target.value)
  }
  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  return (
    <div>
      {popup ? (
        <>
          <div className='e_leavereq_pop'>
            <div className='e_leavereq_pop_1'>
              <div className='e_leavereq_pop_2'>
                <h5>Reason</h5>
                <p>
                  {leaveReason.leaveReason}</p>
              </div>
              <div className='e_leavereq_pop_3'>

                <button className='e_leavereq_pop_33' onClick={() => setPopup(false)} >Close</button>


              </div>
            </div>
          </div>

        </>
      ) : null}
      {popupLeave ? (
        <div className='apply_leave_form'>

          <div className="leave-form-container">
            <h1 className="leave-form-title">Apply for Leave</h1>
            <form className="leave-form">
              <div className="leave-form-group">
                <label htmlFor="leaveType">Leave Type:</label>
                <div class="continput">

                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="leaveType"
                        value="casual"
                        checked={leaveType === "casual"}
                        onChange={handleLeaveType}
                      />
                      <label>Casual Leave</label>
                      <div class="bullet">
                        <div class="line zero"></div>
                        <div class="line one"></div>
                        <div class="line two"></div>
                        <div class="line three"></div>
                        <div class="line four"></div>
                        <div class="line five"></div>
                        <div class="line six"></div>
                        <div class="line seven"></div>
                      </div>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="leaveType"
                        value="planned"
                        checked={leaveType === "planned"}
                        onChange={handleLeaveType}
                      />
                      <label>Planned Leave</label>
                      <div class="bullet">
                        <div class="line zero"></div>
                        <div class="line one"></div>
                        <div class="line two"></div>
                        <div class="line three"></div>
                        <div class="line four"></div>
                        <div class="line five"></div>
                        <div class="line six"></div>
                        <div class="line seven"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="leave-form-group">
                <label htmlFor="reason">Reason:</label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="leave-form-input"
                  rows="3"
                  placeholder="Reason for leave..."
                />
              </div>

              <div className="leave-form-group">
                <label htmlFor="fromDate">From Date:</label>
                <input
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    handleDateChange();
                  }}
                  className="leave-form-input"
                />
              </div>

              <div className="leave-form-group">
                <label htmlFor="toDate">To Date:</label>
                <input
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                    handleDateChange();
                  }}
                  className="leave-form-input"
                />
              </div>
              <div className='formbutton_divv'>
                <button type="submit" className="leave_apply_bottom_btn" onClick={handleLeaveApply}>
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Send</span>
                </button>
                <button className='leave_apply_bottom_btn cancel' onClick={()=>setPopupLeave(false)}>
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <div className='outlet_title'>
        <div>
          <ShiningText text="leave" />
        </div>
        <div className='outlet_title2'>
          <button className='leave_apply' onClick={() => setPopupLeave(true)}>
            <span class="circle1"></span>
            <span class="circle2"></span>
            <span class="circle3"></span>
            <span class="circle4"></span>
            <span class="circle5"></span>
            <span class="text">Apply</span>
          </button>
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
                <td>{index + 1}</td>
                <td>{item.requestDate.split('T')[0]}</td>
                <td>{item.fromDate.split('T')[0]}</td>
                <td>{item.toDate.split('T')[0]}</td>
                <td>
                  <button className='table_button_view' onClick={() => handlePopup(item)}>View</button></td>
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