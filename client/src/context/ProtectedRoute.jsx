import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { EmployeeContext } from './EmployeeContext';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const { employeeData } =  useContext(EmployeeContext)
  console.log(employeeData)
  
  useEffect(() => {
    try {
        const token =  localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        // Extract relevant information from the token
        const { employeeId, role, department, name } = decodedToken;
        setUserRole(decodedToken.accessCode)
    } catch (error) {
        
    }
  }, [ ])
  const [userRole,setUserRole]=useState()

  

  // If userRole is in allowedRoles, allow access; otherwise, redirect to login
  return allowedRoles.includes(userRole) ? <Outlet /> : <div>hello</div>;
};

export default ProtectedRoute;