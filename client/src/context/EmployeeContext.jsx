import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

// Create the context
export const EmployeeContext = createContext();

// 2. Create the Provider Component
export const EmployeeProvider = ({ children }) => {
  const [AttendanceData, setAttendanceData] = useState([]); 
  const [employeeData,setEmployeeData]=useState([])
  const [leaveData,setLeaveData]=useState([])
  const [allEmployeesData, setAllEmployeesData] = useState([])
  const [ projectData,setProjectData ]=useState([])
  const [ TodayAttendance,setTodayAttendance ]=useState([])
  const [ particularEmployeeAttendance,setParticularEmployeeAttendance ]=useState([])
  const [ teamMembers,setTeamMembers ]=useState([])
  const [ projects,setProjects ]=useState([])
  const [teamMembersData,setTeamMembersData]=useState([])
  const [loading,setLoading]=useState(true)
  const [pickedDate,setPickedDate]=useState()
  const [showEmailBox,setShowEmailBox]=useState(false)
  const [activeProjects,setActiveProjects]=useState([])
  const [myDetail,setMydetail]=useState([])
  const [pendingLeave,setPendingLeave]= useState([])
  const [thisMonthAttendance,setThisMonthAttendance]= useState([])


  useEffect(() => {
    try {
        const token =  localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        // Extract relevant information from the token
        const { employeeId, role, department, name } = decodedToken;
        setEmployeeData(decodedToken)
    } catch (error) {
        
    }
  }, [ ])
  

  return (
    <EmployeeContext.Provider value={{ thisMonthAttendance,setThisMonthAttendance,pendingLeave,setPendingLeave,myDetail,setMydetail,activeProjects,setActiveProjects,showEmailBox,setShowEmailBox, allEmployeesData, setAllEmployeesData,pickedDate,setPickedDate,loading,setLoading,teamMembersData,setTeamMembersData,projects,setProjects,teamMembers,setTeamMembers,particularEmployeeAttendance,setParticularEmployeeAttendance,TodayAttendance,setTodayAttendance,projectData,setProjectData,leaveData,setLeaveData,AttendanceData, setAttendanceData, employeeData,setEmployeeData }}>
      {children}
    </EmployeeContext.Provider>
  );
};