import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import '../../styles/teamlead/TLeaveRequest.css'
import axios from 'axios';
import moment from 'moment';
import ShiningText from '../text/ShiningText';
function TLeaveRequest() {
  const { TodayAttendance, setTodayAttendance, setAttendanceData, AttendanceData, employeeData, teamMembers } = useContext(EmployeeContext)
  const [popup, setPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [currentItem, setCurrentItem] = useState()
  const [leaveRequest, setLeaveRequest] = useState([])
  const [leaveReason, setLeaveReason] = useState()
  console.log(employeeData)

  async function getLeaveRequest() {
    try {
      const response = await axios.get(`/leave/fromdev`);
      const employees = response.data
      const filtered = employees.filter(employee =>
        teamMembers.includes(employee.employeeId)

      );
      setLeaveRequest(filtered)

    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }
  useEffect(() => {
    getLeaveRequest()
  }, [])

  function handlePopup(item) {
    setLeaveReason(item)
    setPopup(true)
  }
  async function handleUpdateLeave(val) {
    try {
      await axios.put(`/leave/update/${leaveReason._id}`, { leaveStatus: val });
      setPopup(false)
      getLeaveRequest()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      {popup ? (
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
                {leaveReason.leaveStatus == "Pending" ? (
                  <>
                    <button className='e_leavereq_pop_31' onClick={() => handleUpdateLeave("Approved")} >Approve</button>
                    <button className='e_leavereq_pop_32' onClick={() => handleUpdateLeave("Rejected")}>Reject</button>
                    <button className='e_leavereq_pop_33' onClick={() => setPopup(false)} >Close</button>

                  </>
                ) : (
                  <>
                    <button className='e_leavereq_pop_33' onClick={() => setPopup(false)} >Close</button>


                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className='outlet_title'>
        <div>
          <ShiningText text="Leave Request" />
        </div>


      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S1.No</th>
              <th>Employee Id</th>
              <th>Requested Date</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequest.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.employeeId}</td>
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


      </div>
    </div>
  )
}

export default TLeaveRequest