import React, { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import axios from 'axios';
import moment from 'moment';
import FlowerButton from '../button/FlowerButton';
import StartButton from '../button/StartButton';
import ShiningText from '../text/ShiningText';
import '../../styles/employee/EmployeeAttendance.css'
import { toast } from 'react-toastify';
function EAttendance() {
  const { AttendanceData, employeeData, setAttendanceData } = useContext(EmployeeContext);
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [currentItem, setCurrentItem] = useState();
  const [isCheckingIn, setIsCheckingIn] = useState(false); // New state to manage duplicate calls
  const [currentPage, setCurrentPage] = useState(1);
  const [checkoutPop,setCheckoutPop]= useState()
  const [workDetails, setWorkDetails] = useState('');

  const handleChange = (e) => {
    setWorkDetails(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheckOut(workDetails)
  };

  const handleCancel = () => {
    setWorkDetails('');
    setCheckoutPop(false)
  };

  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = AttendanceData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(AttendanceData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  async function handleStart(e) {
    if (isCheckingIn) return; // Prevent further calls if already checking in
    setIsCheckingIn(true); // Set checking-in state to true

    try {
      const response = await axios.post(`/attendance/checkin`, {
        employeeId: employeeData.employeeId
      });
      console.log(response.data);
      setIsCheckingIn(false); // Reset checking-in state
      getAttendanceData(); // Refresh attendance data after successful check-in
    } catch (err) {
      toast(err.response.data.message)
      console.log(err.response.data);
      setIsCheckingIn(false); 
      
    }
  }

 
  async function getAttendanceData() {
    try {
      const response = await axios.get(`/attendance/${employeeData.employeeId}`);
      console.log(response.data);
      setAttendanceData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAttendanceData();
  }, []);

  async function handleCheckOut(workDetails) {
    try {
      const response = await axios.post(`/attendance/checkout`, {
        employeeId: employeeData.employeeId,
        workDetails: workDetails
      });
      console.log(response.data);
      setCheckoutPop(false)
      getAttendanceData();


    } catch (err) {
      console.log(err);
    }
  }

  function handlePopup(item) {
    setPopup(true);
    setCurrentItem(item);
  }

  function handleTextAreaChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div>
      {popup && (
        <div className='e_leavereq_pop'>
          <div className='e_leavereq_pop_1'>
            <div className='e_leavereq_pop_2'>
              <h5 style={{ marginBottom: "2rem" }}>Work Details</h5>
              <p>{currentItem.workDetails ? currentItem.workDetails : ""}</p>
            </div>
            <div className='e_leavereq_pop_3'>
              <button className='e_leavereq_pop_33' onClick={() => setPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
          {checkoutPop ?(
        <div className='e_leavereq_pop'>
        <div className='e_leavereq_pop_1'>
        <form onSubmit={handleSubmit} className="co-form-content">
        <h2 className="co-form-title">Work Details</h2>
        <textarea
          placeholder="Describe your work details here..."
          value={workDetails}
          onChange={handleChange}
          className="co-work-details-textarea"
          rows="6"
        />
        <div className="co-form-buttons">
          <button type="submit" className="co-submit-button">Submit</button>
          <button type="button" onClick={handleCancel} className="co-cancel-button">Cancel</button>
        </div>
      </form>
        </div>
      </div>
      ):null}

      <div className='outlet_title'>
        <div>
          <ShiningText text="attendance" />
        </div>
        <div className='outlet_title2'>
          <button onClick={handleStart} disabled={isCheckingIn}><StartButton /></button>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours Worked</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={index}>
                <td>{item.checkInTime.split('T')[0]}</td>
                <td>{moment(item.checkInTime).format('h:mm A')}</td>
                <td>
                  {item.checkOutTime ? (
                    moment(item.checkOutTime).format('h:mm A')
                  ) : (
                    <button className='checkout_btnn' onClick={() => setCheckoutPop(true) }>Check out</button>
                  )}
                </td>
                <td>
                  {item.totalHoursWorked ? (
                    `${Math.floor(item.totalHoursWorked)}:${Math.floor((item.totalHoursWorked % 1) * 60)}`
                  ) : (
                    `${((new Date() - new Date(item.checkInTime)) / 3600000).toFixed(2)}`
                  )}
                </td>
                <td>
                  {item.workDetails && item.workDetails.length > 3 ? (
                    <p onClick={() => handlePopup(item)}>{item.workDetails.slice(0, 3)}...</p>
                  ) : (
                    item.workDetails || "No details available"
                  )}
                </td>
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
  );
}

export default EAttendance;
