import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import axios from 'axios';
import moment from 'moment';
import { IoMdSearch } from "react-icons/io";
import ShiningText from '../text/ShiningText';
import * as XLSX from 'xlsx';
import '../../styles/teamlead/TEmployeeAttendance.css'
import excelpng from '../../images/excelpng.png'
function AEmployeeAttendance() {
  const { teamMembers,allEmployeesData, particularEmployeeAttendance,setParticularEmployeeAttendance,AttendanceData,employeeData }=useContext(EmployeeContext)
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
      console.log("allParticularEmployeeAttendance",allParticularEmployeeAttendance)

 
      
    } catch (err) {
        setAllParticularEmployeeAttendance(false)

      console.log(err)
    }
  }






const handleAttendanceDownload = (data) => {
  // Group attendance data by month
  const monthlyData = {};

  data.forEach((record) => {
    const checkInDate = new Date(record.checkInTime);
    const monthYear = `${checkInDate.getFullYear()}-${checkInDate.getMonth() + 1}`;

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { daysWorked: new Set(), totalHours: 0 };
    }

    // Track unique days worked and accumulate total hours directly from totalHoursWorked field
    monthlyData[monthYear].daysWorked.add(checkInDate.toDateString());
    monthlyData[monthYear].totalHours += record.totalHoursWorked || 0;
  });

  // Convert to rows for Excel
  const rows = [
    ["Month-Year", "Days Worked", "Total Hours"]
  ];

  for (const [monthYear, data] of Object.entries(monthlyData)) {
    rows.push([
      monthYear,
      data.daysWorked.size,
      data.totalHours.toFixed(2)  // Format total hours to 2 decimal places if needed
    ]);
  }

  // Create worksheet and workbook
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

  // Generate and download Excel file
  XLSX.writeFile(workbook, `attendance_report.xlsx`);
};

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
        <div>
          <button className='download_data_btn' onClick={()=>{handleAttendanceDownload(allParticularEmployeeAttendance)}}>download <img src={excelpng} alt="" /></button>
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

export default AEmployeeAttendance