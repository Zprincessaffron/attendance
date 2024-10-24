import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/teamlead/DatePickerComponent.css'; // Import the custom CSS
import { EmployeeContext } from '../../context/EmployeeContext';
import axios from 'axios';

const DatePickerComponent = () => {
  const { setPickedDate,teamMembers,setTodayAttendance } = useContext(EmployeeContext)
  const [selectedDate, setSelectedDate] = useState(null);
  const [formatedDate,setFormatedDate]=useState()

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Separate function for handling the date change
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setFormatedDate(formattedDate)
    console.log('Selected Date:', formattedDate); // Optional: Log the formatted date
    setSelectedDate(date);
  };

  async function handleSearch(){
    try {
      const response = await axios.get(`/attendance/date/${formatedDate}`);
      const employees = response.data
      const filtered = employees.filter(employee => 
        teamMembers.includes(employee.employeeId)
  
      );
      setTodayAttendance(filtered)
     
      
      
    } catch (err) {
      setTodayAttendance(" ")

      console.log(err)
    }
  }
  return (
    <div className="datepicker-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange} // Use the handleDateChange function here
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY *"
        className="custom-date-input"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select" // Allows month and year dropdown
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default DatePickerComponent;
