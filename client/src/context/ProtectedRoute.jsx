import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { EmployeeContext } from './EmployeeContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { employeeData } =  useContext(EmployeeContext)
  const [userRole,setUserRole]=useState(employeeData.accessCode)
  

  // function funGetAccess(){
  //   setUserRole(employeeData.accessCode)
  // }
  // useEffect(() => {
  //   funGetAccess()
  // }, [])
  
  

  // If userRole is in allowedRoles, allow access; otherwise, redirect to login
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;